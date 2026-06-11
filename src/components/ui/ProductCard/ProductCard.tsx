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
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {isLimited && <span className={styles.badge}>Limited Edition</span>}
        {/* We'll use an img tag if we don't have Next.js image domain configured, but here we can just use img for simplicity in mock data if needed. Let's use next/image with unoptimized or standard img */}
        <img src={image} alt={name} className={styles.image} loading="lazy" />
        
        <div className={styles.overlay}>
          <div className={styles.actions}>
            <button className={styles.actionBtn} aria-label="Add to Wishlist">
              <Heart size={20} />
            </button>
            <Button variant="primary" size="sm" className={styles.quickAdd}>
              <ShoppingCart size={16} className={styles.cartIcon} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <div className={styles.info}>
        <span className={styles.category}>{category}</span>
        <Link href={`/product/${id}`} className={styles.nameLink}>
          <h3 className={styles.name}>{name}</h3>
        </Link>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};
