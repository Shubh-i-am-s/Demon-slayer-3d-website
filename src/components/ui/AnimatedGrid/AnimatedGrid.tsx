"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ProductCardProps } from '../ProductCard/ProductCard';
import { ProductCard } from '../ProductCard/ProductCard';

interface AnimatedGridProps {
  products: ProductCardProps[];
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Speed table — each card in the grid gets a different parallax depth so
 * the grid has a convincing multi-layer cinematic feel.
 *
 * The pattern repeats every 4 cards (one visual "row" of the 4-col grid):
 *   col-0: fast-rise   (speed 65)
 *   col-1: slow        (speed 25)
 *   col-2: medium      (speed 48)
 *   col-3: extra-fast  (speed 80)
 */
const SPEED_PATTERN = [65, 25, 48, 80];

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({ products, className }) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {products.map((product, index) => {
        const speed = SPEED_PATTERN[index % SPEED_PATTERN.length];
        return (
          <motion.div
            key={product.id}
            variants={itemVariants}
            style={{ willChange: "transform, opacity" }}
          >
            <ProductCard {...product} parallaxSpeed={speed} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
