"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Button } from '../../ui/Button/Button';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Join the Collector's Circle.</h2>
          <p className={styles.newsletterSubtitle}>Get early access to limited editions and exclusive releases.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.newsletterInput}
              required 
            />
            <Button variant="primary" type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className={styles.mainFooter}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>COLLECTOR'S</span>
              <span className={styles.logoAccent}>REALM</span>
            </Link>
            <p className={styles.brandDesc}>
              Preserving legends through exceptional craftsmanship. The premier destination for premium anime collectibles.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><Link href="/collections" className={styles.link}>All Collections</Link></li>
              <li><Link href="/limited" className={styles.link}>Limited Editions</Link></li>
              <li><Link href="/new" className={styles.link}>New Arrivals</Link></li>
              <li><Link href="/exclusives" className={styles.link}>Collector Exclusives</Link></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/shipping" className={styles.link}>Shipping Policy</Link></li>
              <li><Link href="/returns" className={styles.link}>Return Policy</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/sustainability" className={styles.link}>Sustainability</Link></li>
              <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
              <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Collector's Realm. All rights reserved. Legends preserved.</p>
        </div>
      </div>
    </footer>
  );
};
