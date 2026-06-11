"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', href: '/collections' },
    { name: 'Limited Editions', href: '/limited' },
    { name: 'New Arrivals', href: '/new' },
    { name: 'Our Story', href: '/story' },
  ];

  return (
    <header className={clsx(styles.header, { [styles.scrolled]: isScrolled })}>
      <div className={styles.container}>
        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>COLLECTOR'S</span>
          <span className={styles.logoAccent}>REALM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className={styles.icons}>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="User Account">
            <User size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Shopping Cart">
            <ShoppingCart size={20} />
            <span className={styles.cartBadge}>0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={clsx(styles.mobileMenu, { [styles.mobileMenuOpen]: isMobileMenuOpen })}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
