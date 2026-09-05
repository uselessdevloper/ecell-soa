import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import Domino from '../components/Domino/Domino';
import MagneticButton from '../components/UI/MagneticButton';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './S1_Introduction.module.css';

const S1_Introduction = ({ isActive, sectionIndex = 0 }) => {
  const containerRef = useRef(null);
  const dominoRef = useRef(null);
  const ctaRef = useRef(null);
  const { triggerDomino, dominoStates } = useDomino();
  const prefersReducedMotion = useReducedMotion();
  
  const content = DOMINO_SECTIONS[sectionIndex] || {
    title: 'INNOVATION & ENTREPRENEURSHIP CELL',
    subtitle: "ITER · Siksha 'O' Anusandhan",
    tagline: 'Where ideas find direction.'
  };

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      const tl = gsap.timeline();
      
      tl.from('.stagger-text', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.subtitle-text', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .from('.tagline-text', {
        opacity: 0,
        duration: 0.6
      }, '-=0.2')
      .from(dominoRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: 'back.out(1.4)'
      }, '-=0.2')
      .from(ctaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleClick = () => {
    triggerDomino(sectionIndex);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            <span className="stagger-text">INNOVATION &</span><br />
            <span className="stagger-text">ENTREPRENEURSHIP CELL</span>
          </h1>
          <p className={`subtitle-text ${styles.subtitle}`}>{content.subtitle}</p>
          <p className={`tagline-text ${styles.tagline}`}>"{content.tagline}"</p>
        </div>
        
        <div className={styles.dominoWrapper}>
          <div ref={dominoRef} className={styles.dominoContainer}>
            <Domino 
              number="01" 
              fullFaceLogo="/logo.png"
              size="logo" 
              state={dominoStates[sectionIndex]}
              glow={true} 
              color={content.color}
              glowColor={content.glowColor}
              onClick={handleClick}
            />
          </div>
          
          <div ref={ctaRef} className={styles.ctaWrapper}>
            <MagneticButton 
              variant="primary" 
              size="large" 
              onClick={handleClick}
              aria-label="Start the chain reaction"
            >
              START THE CHAIN →
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default S1_Introduction;
