import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import Domino from '../components/Domino/Domino';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './S2_WhoWeAre.module.css';

const S2_WhoWeAre = ({ isActive, sectionIndex = 1 }) => {
  const containerRef = useRef(null);
  const dominoRef = useRef(null);
  const { triggerDomino, dominoStates } = useDomino();
  const prefersReducedMotion = useReducedMotion();
  
  const content = DOMINO_SECTIONS[sectionIndex] || {
    title: 'WHO WE ARE',
    tag: 'IEC-SOA',
    tagline: 'Built by students, for students.',
    subtagline: 'Think beyond the classroom.',
    keywords: ['THINK', 'CREATE', 'BUILD']
  };

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      const tl = gsap.timeline();
      
      tl.from(dominoRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.fade-text', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.keyword-badge', {
        scale: 0.7,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(1.5)'
      }, '-=0.2');
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleClick = () => {
    triggerDomino(sectionIndex);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.layoutGrid}>
        {/* Left / Center: Interactive Domino 02 */}
        <div className={styles.dominoArea}>
          <div ref={dominoRef}>
            <Domino 
              number="02" 
              fullFaceLogo="/who-we-are.jpg"
              size="photo" 
              state={dominoStates[sectionIndex]}
              glow={true} 
              color={content.color}
              glowColor={content.glowColor}
              onClick={handleClick}
            />
          </div>
          <div className={styles.clickHint} onClick={handleClick}>
            <span className={styles.hintDot}></span> Click domino to topple
          </div>
        </div>
        
        {/* Right Info Content */}
        <div className={styles.infoArea}>
          <div className={styles.headerGroup}>
            <span className={`fade-text ${styles.badge}`}>COMMUNITY</span>
            <h2 className={`fade-text ${styles.mainHeading}`}>BUILT BY STUDENTS,<br />FOR STUDENTS.</h2>
            <p className={`fade-text ${styles.subtagline}`}>"{content.subtagline}"</p>
          </div>

          <div className={styles.descriptionText}>
            <p className="fade-text">
              We bring together students, mentors, industry leaders, alumni, and fellow visionaries.
              Because an idea shouldn't have to stay just an idea.
            </p>
          </div>
          
          <div className={styles.keywords}>
            {content.keywords.map((word, idx) => (
              <div key={idx} className={`keyword-badge ${styles.keywordCard}`}>
                <span className={styles.keywordIndex}>0{idx + 1}</span>
                <span className={styles.keywordWord}>{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default S2_WhoWeAre;
