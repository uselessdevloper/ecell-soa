import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FrontPageStarfield from '../Effects/FrontPageStarfield';
import styles from './FrontPage.module.css';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FrontPage = ({ onEnter, onSelectStage }) => {
  const containerRef = useRef(null);
  const titleLockupRef = useRef(null);
  const cursiveRef = useRef(null);
  const subtitleRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Entrance animations for the hero elements
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(cursiveRef.current,
      { opacity: 0, y: 15, rotate: -8 },
      { opacity: 1, y: 0, rotate: -2, duration: 0.8, delay: 0.1 }
    )
    .fromTo(titleLockupRef.current, 
      { opacity: 0, y: 35, scale: 0.94, filter: 'blur(10px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.0 },
      '-=0.5'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.5'
    );

    return () => tl.kill();
  }, [prefersReducedMotion]);

  // Spacebar & Arrow trigger to enter the experience
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        if (onEnter) onEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter]);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      {/* 1. Chromatic Horizon Glow Line (Image 2 Horizon Style in Purple & White) */}
      <div className={styles.horizonGlowLine} aria-hidden="true" />

      {/* 2. Interactive 3D Scrolling Starfield & Particle Constellation (From bari.asia - Image 1) */}
      <FrontPageStarfield />

      {/* 3. Ambient Purple & White Glow Blooms Behind the Text */}
      <div className={styles.ambientCenterGlow} aria-hidden="true" />
      <div className={styles.ambientTopNebula} aria-hidden="true" />

      {/* Top Header Navigation */}
      <header className={styles.topNav}>
        <div 
          className={styles.brandGroup} 
          onClick={() => onSelectStage && onSelectStage(0)} 
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          title="IEC E-Cell Home"
        >
          <img 
            src="/ecell-logo.png" 
            alt="Innovation & Entrepreneurship Cell" 
            className={styles.brandLogoImg} 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </header>

      {/* Center Hero Display Lockup with E-Cell Theme Colors */}
      <main 
        className={styles.centerHero}
        onClick={onEnter}
        role="button"
        tabIndex={0}
        title="Click, scroll, or press Space to explore"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onEnter(); }}
      >
        {/* Sub-headline / Handwritten Callout */}
        <div ref={cursiveRef} className={styles.cursiveNote}>
          Driving Ideas Towards Impact
        </div>

        {/* Chunky Wordmark with Electric Cyan & Neon Magenta Dual Gradient */}
        <div ref={titleLockupRef} className={styles.titleLockup}>
          <span className={styles.heroWordCyan}>IEC</span>
          
          <div className={styles.heroBadgeCard}>
            <span className={styles.heroBadgeText}>E-CELL</span>
          </div>

          <span className={styles.heroWordMagenta}>SOA</span>
        </div>

        {/* Subtitle & Tagline from E-Cell Website */}
        <div ref={subtitleRef} className={styles.heroSubtitle}>
          From Sparks to Stars: IEC Welcomes You
        </div>
        <p className={styles.heroDescription}>
          Innovation & Entrepreneurship Cell · SOA University
        </p>
      </main>
    </div>
  );
};

export default FrontPage;
