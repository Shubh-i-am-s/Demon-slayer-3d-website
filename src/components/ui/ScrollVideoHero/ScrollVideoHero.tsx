"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import styles from "./ScrollVideoHero.module.css";

const FRAME_COUNT = 294;

export const ScrollVideoHero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll within the 800vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to the scroll progress to make the animation buttery smooth 
  // even if the user has a chunky mouse wheel.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map smooth scroll progress (0 to 1) to frame index (1 to FRAME_COUNT)
  const currentFrame = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

  // Draw frame helper to handle 'object-fit: cover' behavior on canvas
  const drawFrame = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Adjust canvas resolution to match window and device pixel ratio to avoid blur
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const targetWidth = window.innerWidth * dpr;
    const targetHeight = window.innerHeight * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Improve image quality when stretching the frames
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Preload all 294 images so they are ready for high-speed scrolling
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits (001, 010, 100, etc.)
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/hero-demon-slayer/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = () => {
        // As soon as the first frame loads, draw it to prevent a black screen
        if (i === 1 && canvasRef.current) {
          drawFrame(img, canvasRef.current);
          setIsLoaded(true);
        }
      };
      
      // Keep them in order
      loadedImages[i - 1] = img;
    }
    
    // Save the array reference immediately so scroll can use available frames
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImages(loadedImages);
  }, []);

  // Initial draw when loaded
  useEffect(() => {
    if (isLoaded && canvasRef.current && images[0]) {
      drawFrame(images[0], canvasRef.current);
    }
  }, [isLoaded, images]);

  // Sync canvas draw with scroll and window resizing
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleResize = () => {
      const latestFrame = currentFrame.get();
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latestFrame) - 1));
      const img = images[frameIndex];
      
      if (canvasRef.current && img) {
        drawFrame(img, canvasRef.current);
      }
    };

    window.addEventListener("resize", handleResize);

    // Use framer-motion's onChange to trigger redraws smoothly
    const unsubscribe = currentFrame.on("change", (latestFrame) => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latestFrame) - 1));
      const img = images[frameIndex];
      
      if (canvasRef.current && img) {
        drawFrame(img, canvasRef.current);
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [currentFrame, images, isLoaded]);

  // Fade out the text overlay towards the very end of the scroll (last 20%)
  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.stickyWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay} />
        
        {/* Pass down children (the text/buttons) and wrap in motion div to animate opacity */}
        <motion.div style={{ opacity: contentOpacity }} className={styles.contentContainer}>
          {children}
        </motion.div>
      </div>
    </div>
  );
};
