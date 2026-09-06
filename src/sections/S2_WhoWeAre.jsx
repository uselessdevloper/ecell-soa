import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import Domino from '../components/Domino/Domino';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './S2_WhoWeAre.module.css';

const CAPABILITIES = [
  'UX & MVP Product Design',
  'Investor Pitching & Grants',
  'E-Summit & Hackathons',
  'AI Pods & Engineering',
  'Creator SaaS Incubation',
  '50+ Funded Startups'
];

const S2_WhoWeAre = ({ isActive, sectionIndex = 0 }) => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const showcaseRef = useRef(null);
  const { triggerDomino, dominoStates } = useDomino();
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const content = DOMINO_SECTIONS[sectionIndex] || {
    number: '01',
    title: 'WHO WE ARE',
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.45)'
  };

  // Entrance timeline targeting each distinct component cleanly
  useGSAP(() => {
    if (isActive && !prefersReducedMotion && containerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(`.${styles.stageBadge}`, {
        opacity: 0,
        y: -12,
        duration: 0.45
      })
      .from(headingRef.current, {
        opacity: 0,
        y: 18,
        filter: 'blur(8px)',
        duration: 0.55
      }, '-=0.25')
      .from(`.${styles.boldStatement}`, {
        opacity: 0,
        y: 14,
        duration: 0.45
      }, '-=0.3')
      .from(`.${styles.goalGroup}`, {
        opacity: 0,
        x: -20,
        duration: 0.45
      }, '-=0.3')
      .from(`.${styles.capabilityTag}`, {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.35
      }, '-=0.25')
      .from(`.${styles.playfulSubtext}`, {
        opacity: 0,
        duration: 0.4
      }, '-=0.2')
      .from(showcaseRef.current, {
        opacity: 0,
        scale: 0.92,
        x: 35,
        duration: 0.65,
        ease: 'power3.out'
      }, '-=0.45');
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  // 3D Parallax tilt on mouse move over the showcase + colorful reveal
  const handleMouseMove = (e) => {
    setIsHovered(true);
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 16, y: px * 18 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    e?.stopPropagation?.();
    playImpact(1.0, sectionIndex);
    triggerDomino(sectionIndex);
  };

  const handleCapabilityClick = (cap) => {
    playImpact(0.8, sectionIndex);
  };

  return (
    <section className={styles.container} ref={containerRef} aria-label="Who We Are">
      <div className={styles.stageGrid}>
        {/* LEFT COLUMN: Clean, organized typography & info */}
        <div className={styles.leftColumn}>
          {/* Stage Badge */}
          <div className={styles.stageBadge}>
            <span className={styles.badgeDot} style={{ background: content.color || '#00f0ff' }}></span>
            <span className={styles.badgeText}>STAGE 01 // IDENTITY</span>
          </div>

          {/* Big Bold Headline */}
          <h2 ref={headingRef} className={styles.heroHeading}>
            WONDERING WHO WE ARE?
          </h2>

          {/* Core Mission Statement */}
          <p className={styles.boldStatement}>
            Most universities choose between classroom theory and real-world execution. We never really did.
          </p>

          {/* Goal Callout Box */}
          <div className={styles.goalGroup}>
            <span className={styles.goalLabel}>OUR GOAL IS SIMPLE</span>
            <div className={styles.handwrittenCallout}>
              Build stuff that is useful, beautiful and convertible.
            </div>
          </div>

          {/* Interactive Capabilities Grid */}
          <div className={styles.capabilitiesContainer}>
            <div className={styles.capabilitiesHeader}>
              OVER THE LAST FEW YEARS WE'VE WORKED ACROSS:
            </div>
            <div className={styles.capabilitiesGrid}>
              {CAPABILITIES.map((cap) => (
                <div 
                  key={cap.tag} 
                  className={styles.capabilityTag}
                  onClick={() => handleCapabilityClick(cap)}
                  title={`Explore ${cap.name}`}
                >
                  <span className={styles.tagText}>{cap.name}</span>
                  <span className={styles.diagonalArrow}>↗</span>
                </div>
              ))}
            </div>
          </div>

          {/* Playful Subtext */}
          <p className={styles.playfulSubtext}>
            Also, powered by caffeine, hackathon deadlines, and the unreasonable belief that any student can be a founder :)
          </p>
        </div>

        {/* RIGHT COLUMN: Interactive 3D Visual Showcase */}
        <div 
          className={styles.rightColumn}
          ref={showcaseRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={styles.visualShowcase}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out'
            }}
          >
            <div 
              className={styles.dominoCardContainer} 
              onClick={handleClick}
              role="button"
              tabIndex={0}
              title="Click photo to advance to next stage"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
            >
              {/* Luminous Ambient Halo Glow */}
              <div 
                className={styles.haloGlow} 
                style={{ 
                  background: `radial-gradient(circle, ${content.glowColor || 'rgba(0, 240, 255, 0.45)'} 0%, transparent 70%)` 
                }} 
              />
              
              {/* 3D Physical Domino Card with Photo (Black & White by default, colorful on hover) */}
              <div className={styles.dominoDisplayFrame}>
                <Domino 
                  number={content.number || "01"} 
                  title={content.title || "WHO WE ARE"}
                  fullFaceLogo="/who-we-are.jpg"
                  size="large" 
                  className={`${styles.expandedDomino} ${isHovered ? styles.cardActiveHover : ''}`}
                  state={dominoStates[sectionIndex] || 'standing'}
                  glow={true} 
                  color={content.color || "#00f0ff"}
                  glowColor={content.glowColor || "rgba(0, 240, 255, 0.55)"}
                />
              </div>

              {/* Action Pill Underneath */}
              <div className={styles.actionPill}>
                <span className={styles.actionTitle}>DOMINO 01 · WHO WE ARE</span>
                <span className={styles.actionPrompt}>Click photo or scroll to advance →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default S2_WhoWeAre;
