import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import MagneticButton from '../components/UI/MagneticButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './S1_Introduction.module.css';

const S1_Introduction = ({ isActive, sectionIndex = 0 }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { triggerDomino } = useDomino();

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(`.${styles.eyebrow}`, { y: 24, opacity: 0, duration: 0.6 })
        .from(`.${styles.heroLine}`, { y: 60, opacity: 0, stagger: 0.14, duration: 0.85 }, '-=0.3')
        .from(`.${styles.heroPara}`, { y: 20, opacity: 0, duration: 0.65 }, '-=0.35')
        .from(`.${styles.dateBadge}`, { scale: 0.85, opacity: 0, duration: 0.55 }, '-=0.4')
        .from(`.${styles.ctaRow}`, { y: 20, opacity: 0, duration: 0.6 }, '-=0.35')
        .from(`.${styles.scrollHint}`, { opacity: 0, duration: 0.5 }, '-=0.2');
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleStart = () => triggerDomino(sectionIndex);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Ambient particle glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      {/* Grid lines decoration */}
      <div className={styles.gridLines} aria-hidden="true" />

      <div className={styles.heroBody}>
        {/* Eyebrow tag */}
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          INNOVATION &amp; ENTREPRENEURSHIP CELL · ITER, SOA
        </p>

        {/* Main Headline — massive like ecellsoa.in */}
        <h1 className={styles.headline} aria-label="Breaking Systems. Rewriting Innovation.">
          <span className={styles.heroLine}>BREAKING SYSTEMS.</span>
          <span className={styles.heroLine}>REWRITING</span>
          <span className={`${styles.heroLine} ${styles.heroLineAccent}`}>INNOVATION.</span>
        </h1>

        {/* Sub-tagline */}
        <p className={styles.heroPara}>
          Eastern India's flagship entrepreneurship club — uniting creators,
          founders, and doers to challenge limits and build the future.
        </p>

        {/* Event Date Badge */}
        <div className={styles.dateBadge}>
          <svg className={styles.dateBadgeIcon} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          ITER · Siksha 'O' Anusandhan University, Bhubaneswar
        </div>

        {/* CTA Buttons */}
        <div className={styles.ctaRow}>
          <MagneticButton
            variant="primary"
            size="large"
            onClick={handleStart}
            aria-label="Start the chain reaction"
          >
            START THE CHAIN →
          </MagneticButton>
          <button
            className={styles.secondaryBtn}
            onClick={handleStart}
            aria-label="Explore what we do"
          >
            EXPLORE IEC
          </button>
        </div>

        {/* Scroll hint */}
        <p className={styles.scrollHint}>
          <span className={styles.scrollChevron}>↓</span> SCROLL TO BEGIN
        </p>
      </div>
    </div>
  );
};

export default S1_Introduction;

