"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCardProps } from "../ProductCard/ProductCard";
import { AnimatedGrid } from "../AnimatedGrid/AnimatedGrid";
import { ScrollFrameSection } from "../ScrollFrameSection/ScrollFrameSection";
import { VideoTitleOverlay } from "../VideoTitleOverlay/VideoTitleOverlay";
import styles from "./FeaturedCollections.module.css";

const BG_FRAME_COUNT = 247;
const BG_FRAMES_PATH = "/card-demon-slayers";

const TITLE_OVERLAY_START_SEC = 4;

interface FeaturedCollectionsProps {
  products: ProductCardProps[];
  className?: string;
  children?: React.ReactNode;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  products,
  className,
  children,
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);


  // Watch for the section entering the viewport to trigger fullscreen video
  useEffect(() => {
    if (hasPlayed || isPlaying) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasPlayed, isPlaying]);

  // When overlay mounts, start the video and begin the skip-delay timer
  useEffect(() => {
    if (!isPlaying) return;

    // Lock body scroll while video plays
    document.body.style.overflow = "hidden";

    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || video.ended) return;

    if (video.currentTime >= TITLE_OVERLAY_START_SEC) {
      setShowTitleOverlay(true);
    }
  };

  const handleDismiss = () => {
    document.body.style.overflow = "";
    setShowTitleOverlay(false);
    setIsPlaying(false);
    setHasPlayed(true);
  };

  return (
    <div ref={containerRef} className={styles.sectionWrapper}>
      {/* Fullscreen video portal-style overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="fullscreen-overlay"
            className={styles.fullscreenOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              src="/Open-product-demonslyer.mp4"
              className={styles.fullscreenVideo}
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleDismiss}
            />

            <AnimatePresence>
              {showTitleOverlay && <VideoTitleOverlay key="video-title" />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollFrameSection
        framesPath={BG_FRAMES_PATH}
        frameCount={BG_FRAME_COUNT}
        enabled={hasPlayed}
      >
        {children}

        <AnimatePresence mode="wait">
          {hasPlayed ? (
            <motion.div
              key="products-grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={styles.gridContainer}
            >
              <AnimatedGrid products={products} className={className} />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className={styles.placeholder}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className={styles.placeholderText}>Loading Collection…</span>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollFrameSection>
    </div>
  );
};
