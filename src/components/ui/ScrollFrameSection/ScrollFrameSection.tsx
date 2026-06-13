"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./ScrollFrameSection.module.css";

interface ScrollFrameSectionProps {
  children: React.ReactNode;
  framesPath: string;
  frameCount: number;
  enabled?: boolean;
}

export const ScrollFrameSection: React.FC<ScrollFrameSectionProps> = ({
  children,
  framesPath,
  frameCount,
  enabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll from when section top enters viewport top
  // to when section bottom exits viewport bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const currentFrame = useTransform(smoothProgress, [0, 1], [1, frameCount]);

  const drawFrame = useCallback((img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const targetWidth = Math.floor(window.innerWidth * dpr);
    const targetHeight = Math.floor(window.innerHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    if (!img.complete || img.naturalWidth === 0) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
    );
  }, []);

  // Preload all frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let firstFrameDrawn = false;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `${framesPath}/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!firstFrameDrawn && i === 1) {
          if (canvasRef.current) {
            drawFrame(img, canvasRef.current);
            firstFrameDrawn = true;
          }
          setIsLoaded(true);
        }
      };

      loadedImages[i - 1] = img;
    }

    setImages(loadedImages);
  }, [framesPath, frameCount, drawFrame]);

  // Subscribe to frame changes driven by scroll
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !enabled) return;

    const renderFrame = (latestFrame: number) => {
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(latestFrame) - 1));
      const img = images[frameIndex];
      if (canvasRef.current && img) {
        drawFrame(img, canvasRef.current);
      }
    };

    const handleResize = () => renderFrame(currentFrame.get());
    window.addEventListener("resize", handleResize);
    const unsubscribe = currentFrame.on("change", renderFrame);
    renderFrame(currentFrame.get());

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [currentFrame, images, isLoaded, enabled, frameCount, drawFrame]);

  // Draw first frame once loaded
  useEffect(() => {
    if (isLoaded && canvasRef.current && images[0] && enabled) {
      drawFrame(images[0], canvasRef.current);
    }
  }, [enabled, isLoaded, images, drawFrame]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${enabled ? styles.containerActive : ""}`}
    >
      {/* Sticky background canvas — stays in viewport while user scrolls through section */}
      {enabled && (
        <div className={styles.stickyBg} aria-hidden="true">
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.overlay} />
        </div>
      )}

      {/* Content flows normally — section header then full card grid, top to bottom */}
      <div className={`${styles.scrollContent} ${enabled ? styles.scrollContentActive : ""}`}>
        {children}
      </div>
    </div>
  );
};
