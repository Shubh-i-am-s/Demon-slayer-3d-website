import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import { products } from "@/lib/data";
import styles from "./page.module.css";

export default function Home() {
  const limitedProducts = products.filter(p => p.isLimited);
  const featuredProducts = products; // Using all for featured mockup

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/hero-bg.png"
            alt="Legendary Anime Sword"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Every Legend Deserves a <span className="text-gradient">Place in Your Collection.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Curated masterpieces for collectors who refuse to settle for ordinary.
          </p>
          <div className={styles.heroActions}>
            <Button size="lg" variant="primary">Explore Collection</Button>
            <Button size="lg" variant="outline">Limited Editions</Button>
          </div>
        </div>
      </section>

      {/* Motivational Copy Section */}
      <section className={styles.quoteSection}>
        <div className="glass-panel" style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)', textAlign: 'center', margin: '0 auto', maxWidth: '800px', borderRadius: 'var(--radius-lg)' }}>
          <h2 className={styles.quoteText}>"Set your heart ablaze for the collection you deserve."</h2>
        </div>
      </section>

      {/* Limited Edition Showcase */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Only a Few Legends Remain.</h2>
          <p className={styles.sectionSubtitle}>Exclusive releases with strictly limited stock. Once they are gone, they become history.</p>
          <div className={styles.countdownContainer}>
            <div className={styles.countdownBox}>
              <span className={styles.countdownNumber}>03</span>
              <span className={styles.countdownLabel}>Days</span>
            </div>
            <div className={styles.countdownBox}>
              <span className={styles.countdownNumber}>14</span>
              <span className={styles.countdownLabel}>Hours</span>
            </div>
            <div className={styles.countdownBox}>
              <span className={styles.countdownNumber}>45</span>
              <span className={styles.countdownLabel}>Mins</span>
            </div>
          </div>
        </div>
        <div className={styles.productGrid}>
          {limitedProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <h2 className={styles.storyTitle}>Greatness Is Remembered. <br/>Legends Are Displayed.</h2>
          <p className={styles.storyText}>
            Every statue represents a story, a journey, and a legacy. We bring together exceptional craftsmanship and iconic inspiration to create collectibles worthy of the most passionate fans. 
            <br/><br/>
            Collectors don't follow trends. They preserve legends.
          </p>
          <Button variant="secondary" size="lg" className={styles.storyBtn}>Discover Our Craft</Button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Collections</h2>
          <div className={styles.categories}>
            <span className={styles.categoryBadgeActive}>All</span>
            <span className={styles.categoryBadge}>Elite Swordsmen</span>
            <span className={styles.categoryBadge}>Mythical Heroes</span>
          </div>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
      
      {/* Collector Benefits */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Authentic Collectibles</h3>
            <p className={styles.benefitText}>Every piece comes with a certificate of authenticity and unique serial number.</p>
          </div>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Premium Packaging</h3>
            <p className={styles.benefitText}>Housed in luxury, protective casing to ensure pristine condition upon arrival.</p>
          </div>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Secure Global Shipping</h3>
            <p className={styles.benefitText}>Insured, tracked, and delivered securely anywhere in the world.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
