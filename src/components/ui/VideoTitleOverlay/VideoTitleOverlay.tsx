"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./VideoTitleOverlay.module.css";

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: "blur(8px)",
    transition: { duration: 0.7, ease: "easeIn" },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: EASE_CINEMATIC,
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_CINEMATIC },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

const dashVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 0.9,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

const titleLetters = ["D", "E", "M", "O", "N", " ", "S", "L", "A", "Y", "E", "R"];

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.4,
    rotateX: -90,
    filter: "blur(10px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + i * 0.07,
      duration: 0.85,
      ease: EASE_CINEMATIC,
    },
  }),
};

const redOVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.5 + 3 * 0.07,
      duration: 0.9,
      type: "spring",
      stiffness: 200,
      damping: 14,
    },
  },
};

const slashVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: 0.5 + 3 * 0.07 + 0.35,
      duration: 0.5,
      ease: EASE_CINEMATIC,
    },
  },
};

const collectionVariants: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.6em", scale: 1.2, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    letterSpacing: "0.28em",
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE_CINEMATIC, delay: 0.1 },
  },
};

const taglineWords = ["Exclusive", "Merchandise", "Awaits", "Beyond", "These", "Gates"];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 1.4 + i * 0.1,
      duration: 0.6,
      ease: EASE_CINEMATIC,
    },
  }),
};

const ctaGlowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_CINEMATIC, delay: 0.2 },
  },
};

const flashVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.35, 0],
    transition: { duration: 0.8, times: [0, 0.15, 1], delay: 0.45 },
  },
};

export const VideoTitleOverlay: React.FC = () => {
  return (
    <motion.div
      className={styles.overlay}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={styles.flash}
        variants={flashVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      />

      <motion.div
        className={styles.content}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1200 }}
      >
        {/* Journey line */}
        <motion.div className={styles.journeyLine} variants={fadeUpVariants}>
          <motion.span
            className={styles.journeyLineDecor}
            variants={lineVariants}
            style={{ originX: 1 }}
          />
          <motion.span
            className={styles.journeyText}
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, ease: EASE_CINEMATIC, delay: 0.3 }}
          >
            The Journey Continues
          </motion.span>
          <motion.span
            className={styles.journeyLineDecor}
            variants={lineVariants}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Welcome */}
        <motion.div className={styles.welcomeRow} variants={fadeUpVariants}>
          <motion.span
            className={styles.dash}
            variants={dashVariants}
            style={{ originX: 1 }}
            aria-hidden="true"
          />
          <motion.span
            className={styles.welcomeText}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 0.35 }}
          >
            Welcome to the
          </motion.span>
          <motion.span
            className={styles.dash}
            variants={dashVariants}
            style={{ originX: 0 }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Main title — letter stagger */}
        <motion.h1
          className={styles.mainTitle}
          aria-label="Demon Slayer"
          initial="hidden"
          animate="visible"
        >
          {titleLetters.map((char, i) => {
            if (char === "O") {
              return (
                <motion.span
                  key={`${char}-${i}`}
                  className={styles.redO}
                  variants={redOVariants}
                  animate={{
                    filter: [
                      "drop-shadow(0 0 8px rgba(139,0,0,0.4))",
                      "drop-shadow(0 0 24px rgba(196,30,58,0.95))",
                      "drop-shadow(0 0 8px rgba(139,0,0,0.4))",
                    ],
                  }}
                  transition={{
                    filter: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    },
                  }}
                >
                  O
                  <motion.span
                    className={styles.redOSlash}
                    variants={slashVariants}
                    style={{ originX: 0 }}
                    aria-hidden="true"
                  />
                </motion.span>
              );
            }

            if (char === " ") {
              return <span key={`space-${i}`} className={styles.titleSpace}>&nbsp;</span>;
            }

            return (
              <motion.span
                key={`${char}-${i}`}
                className={styles.titleLetter}
                custom={i}
                variants={letterVariants}
                style={{ display: "inline-block", transformOrigin: "bottom center" }}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Collection */}
        <motion.div className={styles.collectionRow} variants={fadeUpVariants}>
          <motion.span
            className={styles.dash}
            variants={dashVariants}
            style={{ originX: 1 }}
            aria-hidden="true"
          />
          <motion.span className={styles.collectionText} variants={collectionVariants}>
            Collection
          </motion.span>
          <motion.span
            className={styles.dash}
            variants={dashVariants}
            style={{ originX: 0 }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Tagline — word by word */}
        <motion.p className={styles.tagline} initial="hidden" animate="visible">
          {taglineWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              className={styles.taglineWord}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA */}
        <motion.div className={styles.ctaRow} variants={ctaGlowVariants}>
          <motion.span
            className={styles.ctaLineDecor}
            variants={lineVariants}
            style={{ originX: 1 }}
          />
          <motion.span
            className={styles.ctaText}
            animate={{
              filter: [
                "drop-shadow(0 0 8px rgba(212,175,55,0.3))",
                "drop-shadow(0 0 22px rgba(212,175,55,0.75))",
                "drop-shadow(0 0 8px rgba(212,175,55,0.3))",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            Enter Store →
          </motion.span>
          <motion.span
            className={styles.ctaLineDecor}
            variants={lineVariants}
            style={{ originX: 0 }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.ambientGlow}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.5, 0.3], scale: [0.6, 1.2, 1] }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
        aria-hidden="true"
      />
    </motion.div>
  );
};
