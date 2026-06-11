import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isLimited?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  isLimited,
}) => {
  // Mock rating for design
  const rating = 4.9;
  const reviews = Math.floor(Math.random() * 200) + 50;
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.scaleText}>1/4 ULTIMATE SCALE</span>
        {isLimited && <span className={styles.limitedBadge}>LIMITED</span>}
      </div>

      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
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
