"use client";

import React, { useRef, useEffect } from "react";
import styles from "./ParallaxImage.module.css";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** How many px the image drifts vertically on scroll. Positive = slower (rises). Negative = faster (falls). */
  speed?: number;
  /** Scale the image slightly above its natural size so drift never shows a gap */
  initialScale?: number;
  className?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 40,
  initialScale = 1.18,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Lazy-import GSAP + ScrollTrigger on the client only
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Floating idle animation
        gsap.to(imgRef.current, {
          y: -8,
          duration: 2.8 + Math.random() * 1.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 1.5,
        });

        // Scroll-linked parallax on the wrapper
        gsap.fromTo(
          wrapperRef.current,
          { y: speed * 0.5 },
          {
            y: -speed * 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [speed]);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className ?? ""}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={styles.img}
        style={{ transform: `scale(${initialScale})` }}
        loading="lazy"
      />
    </div>
  );
};
