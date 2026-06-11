"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCardProps } from '../ProductCard/ProductCard';
import { ProductCard } from '../ProductCard/ProductCard';

interface AnimatedGridProps {
  products: ProductCardProps[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.85, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({ products, className }) => {
  return (
    <div className={className}>
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
        >
          <ProductCard {...product} />
        </motion.div>
      ))}
    </div>
  );
};
