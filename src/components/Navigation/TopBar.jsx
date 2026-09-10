import React, { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import { useDomino } from '../../context/DominoContext';
import { BRAND, DOMINO_SECTIONS } from '../../data/content';

const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentDomino } = useDomino();
  const currentSection = DOMINO_SECTIONS[currentDomino];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.topBar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <div className={styles.brandMark}>
          <span className={styles.dominoIcon}>⚀</span>
          <div className={styles.brandNames}>
            <span className={styles.brandTitle}>{BRAND.name}</span>
            <span className={styles.brandSubtitle}>{BRAND.institution}</span>
          </div>
        </div>
      </div>

      <div className={styles.sectionPill}>
        <span className={styles.pillIndex}>0{currentDomino + 1}</span>
        <span className={styles.pillDivider}>·</span>
        <span className={styles.pillTitle}>{currentSection?.title || 'ORIENTATION'}</span>
      </div>
    </header>
  );
};

export default TopBar;
