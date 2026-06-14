"use client";

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ParallaxImage } from '../ParallaxImage/ParallaxImage';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isLimited?: boolean;
  variant?: "default" | "large";
  /** Parallax scroll drift amount in px (default 40). Larger = more depth. */
  parallaxSpeed?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  isLimited,
  variant = "default",
  parallaxSpeed = 40,
}) => {
  // Mock rating and reviews for design
  const rating = 4.9;
  const reviews = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 200) + 50;
  }, [id]);

  return (
    <div className={clsx(styles.card, variant === "large" && styles.cardLarge)}>
      <div className={styles.cardHeader}>
        <span className={styles.scaleText}>1/4 ULTIMATE SCALE</span>
        {isLimited && <span className={styles.limitedBadge}>LIMITED</span>}
      </div>

      <div className={styles.imageContainer}>
        <ParallaxImage
          src={image}
          alt={name}
          speed={parallaxSpeed}
          initialScale={variant === "large" ? 1.12 : 1.18}
        />
      </div>
      
      <div className={styles.info}>
        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          <span className={styles.ratingValue}>{rating}</span>
          <span className={styles.reviews}>({reviews})</span>
        </div>
        <Link href={`/product/${id}`} className={styles.nameLink}>
          <h3 className={styles.name}>{name}</h3>
        </Link>
        <p className={styles.subtitle}>{category}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>PRICE</span>
          <span className={styles.price}>${Math.floor(price)}</span>
        </div>
        <Link href={`/product/${id}`} className={styles.showroomLink}>
          SHOWROOM
        </Link>
      </div>
    </div>
  );
};
