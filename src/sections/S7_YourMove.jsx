import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { BRAND, DOMINO_SECTIONS } from '../data/content';
import MagneticButton from '../components/UI/MagneticButton';
import Domino from '../components/Domino/Domino';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S7_YourMove.module.css';

const S7_YourMove = ({ isActive, sectionIndex = 6 }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { playSuccess } = useSoundManager();

  const sectionData = DOMINO_SECTIONS[sectionIndex] || {};

  useGSAP(() => {
    if (isActive) {
      playSuccess();

      if (!prefersReducedMotion) {
        const tl = gsap.timeline();
        
        tl.fromTo(`.${styles.title}`,
          { opacity: 0, y: 30, letterSpacing: '0.2em' },
          { opacity: 1, y: 0, letterSpacing: '-0.02em', duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(`.${styles.solitaryDomino}`,
          { y: 80, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'elastic.out(1, 0.6)' },
          '-=0.6'
        )
        .fromTo(`.${styles.ctaWrapper}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(`.${styles.philosophyChain}`,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.2'
        );
      }
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleRegisterClick = () => {
    const targetUrl = BRAND.registrationUrl || 'https://registration.ecellsoa.com';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.ambientSpot}></div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.categoryPill}>THE FINAL DOMINO</span>
          <h1 className={styles.title} ref={textRef}>
            YOUR MOVE.
          </h1>
          <p className={styles.tagline}>
            "One small decision can start something much bigger."
          </p>
        </div>

        {/* Solitary Standing Domino */}
        <div className={styles.solitaryDomino}>
          <Domino 
            number="07"
            title="YOUR MOVE"
            tagline="Step into the chain"
            size="large"
            state="standing"
            glow={true}
            color={sectionData.color}
            glowColor={sectionData.glowColor}
          />
        </div>

        {/* Final CTA Button */}
        <div className={styles.ctaWrapper}>
          <MagneticButton 
            variant="primary" 
            size="large" 
            onClick={handleRegisterClick}
            aria-label="Join IEC-SOA Registration"
          >
            <span className={styles.btnContentWithLogo}>
              <img src="/iec-logo.png" alt="IEC Logo" className={styles.btnLogoImg} />
              <span>JOIN E-CELL →</span>
            </span>
          </MagneticButton>
          <span className={styles.ctaSubtext}>Official Innovation & Entrepreneurship Cell · ITER Orientation</span>
        </div>

        {/* Core Philosophy Chain */}
        <div className={styles.philosophyChain}>
          {sectionData.philosophy?.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className={styles.stepWord}>{step}</span>
              {idx < sectionData.philosophy.length - 1 && (
                <span className={styles.stepArrow}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default S7_YourMove;
