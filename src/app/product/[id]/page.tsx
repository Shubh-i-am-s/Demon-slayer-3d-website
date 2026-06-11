import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { products } from "@/lib/data";
import { ShoppingCart, Heart, ShieldCheck, Box, Globe, ChevronRight } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id) || products[0];

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link href="/" className={styles.crumb}>Home</Link>
        <ChevronRight size={14} className={styles.crumbIcon} />
        <Link href="/collections" className={styles.crumb}>Collections</Link>
        <ChevronRight size={14} className={styles.crumbIcon} />
        <span className={styles.activeCrumb}>{product.category}</span>
      </div>

      <div className={styles.productLayout}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            {product.isLimited && <span className={styles.badge}>Limited Edition</span>}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={styles.mainImage}
            />
          </div>
          {/* Mock Thumbnails */}
          <div className={styles.thumbnails}>
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className={styles.thumbnailContainer}>
                <Image
                  src={product.image}
                  alt={`View ${idx}`}
                  fill
                  className={styles.thumbnail}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.reviewCount}>(42 Reviews)</span>
          </div>

          <p className={styles.description}>
            A masterpiece of unparalleled craftsmanship. Every detail of the {product.name} has been sculpted with precision to bring this legendary figure to life. Designed for elite collectors who demand perfection.
          </p>

          <div className={styles.stockInfo}>
            <span className={styles.inStock}>In Stock - Ships within 48 hours</span>
          </div>

          <div className={styles.actions}>
            <Button size="lg" variant="primary" className={styles.addToCartBtn}>
              <ShoppingCart size={20} />
              Claim Your Masterpiece
            </Button>
            <button className={styles.wishlistBtn} aria-label="Add to Wishlist">
              <Heart size={24} />
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <ShieldCheck size={24} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <strong>Authentic Guarantee</strong>
                <span>Comes with certificate</span>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Box size={24} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <strong>Premium Packaging</strong>
                <span>Luxury collector's box</span>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Globe size={24} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <strong>Global Shipping</strong>
                <span>Fully insured transit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
