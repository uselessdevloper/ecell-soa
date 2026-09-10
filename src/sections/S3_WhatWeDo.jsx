import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import StageHeader from '../components/UI/StageHeader';
import styles from './S3_WhatWeDo.module.css';

// 6 Authentic Images provided by the user
const SHUTTER_IMAGES = [
  '/founders-stage.jpg',
  '/exp-img-7878.jpg',
  '/exp-dsc-0120.jpg',
  '/events-domino.jpg',
  '/exp-events-crowd.jpg',
  '/DSC07299.JPG'
];

// Typographic Pillars (Matching the reference layout with big, bold text)
const PILLARS_DATA = [
  {
    id: 'events',
    number: '01',
    title: 'EVENTS',
    tagline: 'COMPETITIONS · 36-HR BUILDATHONS · FLAGSHIP SUMMITS',
    desc: 'High-stakes arenas where student ideas are battle-tested before live angel investors and national leaders.',
    imageIndex: 0,
    dialogue: 'Our flagship events bring thousands together for intense hackathons, conclaves, and live pitch battles!'
  },
  {
    id: 'mentorship',
    number: '02',
    title: 'MENTORSHIP',
    tagline: 'ALUMNI FOUNDERS · 1-ON-1 ADVISORY · INDUSTRY TITANS',
    desc: 'Direct blueprints from leaders who built 130+ store nationwide QSR chains, UHI digital health, and biomaterials.',
    imageIndex: 2,
    dialogue: '1-on-1 mentorship from founders who walked ITER corridors and scaled nationwide companies!'
  },
  {
    id: 'exposure',
    number: '03',
    title: 'EXPOSURE',
    tagline: 'NATIONAL VC PIPELINE · ANGEL ROUNDS · INCUBATION',
    desc: 'Connecting campus innovators directly to corporate partnerships, venture capital funds, and ecosystem media.',
    imageIndex: 4,
    dialogue: 'We open boardroom doors — connecting student ventures directly with seed capital and national partners.'
  }
];

const S3_WhatWeDo = ({ isActive, sectionIndex = 1 }) => {
  const containerRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { triggerDomino, setRobotDialogue, setRobotState } = useDomino();
  const { playClick, playWhoosh, playImpact } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  // Automatic smooth camera shutter image reel
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Trigger subtle camera shutter flash
      setIsShutterFlashing(true);
      setTimeout(() => {
        setIsShutterFlashing(false);
      }, 180);

      setActiveImageIndex((prev) => (prev + 1) % SHUTTER_IMAGES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isActive]);

  useGSAP(() => {
    if (isActive && !prefersReducedMotion && containerRef.current) {
      gsap.fromTo(`.${styles.typographicRow}`,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
      );
      gsap.fromTo(`.${styles.rowDivider}`,
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.12, duration: 0.8, ease: 'power2.inOut', transformOrigin: 'left center' },
        '-=0.4'
      );
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleRowHover = (index) => {
    setHoveredIndex(index);
  };

  const handlePillarClick = (item, index) => {
    playImpact(1.0, sectionIndex);
    if (item.dialogue) {
      setRobotDialogue(item.dialogue);
      setRobotState('talking');
    }
  };

  const handleAdvance = () => {
    playWhoosh();
    triggerDomino(sectionIndex);
  };

  return (
    <section className={styles.section} ref={containerRef} aria-label="What We Do Pillars">
      {/* Background Camera Shutter Photo Reel */}
      <div className={styles.shutterCameraStage} aria-hidden="true">
        {SHUTTER_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`${styles.shutterSlide} ${i === activeImageIndex ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* Camera Vignette and Color Grading Tint */}
        <div className={styles.cameraVignette} />

        {/* Shutter Flash Light Pulse */}
        <div className={`${styles.shutterFlash} ${isShutterFlashing ? styles.shutterFlashActive : ''}`} />

        {/* Cinematic Camera Viewfinder HUD */}
        <div className={styles.viewfinderHud}>
          <div className={styles.hudTopLeft}>
            <span className={styles.recDot}>●</span>
            <span className={styles.recText}>REC 00:0{activeImageIndex + 1}:24</span>
          </div>
          <div className={styles.hudTopRight}>
            <span>ISO 400</span>
            <span>1/250s</span>
            <span>f/2.8</span>
          </div>
          <div className={styles.hudCenterCross}>
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="1.2">
              <line x1="20" y1="6" x2="20" y2="14" />
              <line x1="20" y1="26" x2="20" y2="34" />
              <line x1="6" y1="20" x2="14" y2="20" />
              <line x1="26" y1="20" x2="34" y2="20" />
              <circle cx="20" cy="20" r="2" fill="rgba(255, 255, 255, 0.4)" />
            </svg>
          </div>
          <div className={styles.hudBottomLeft}>FRAME 0{activeImageIndex + 1} / 06</div>
          <div className={styles.hudBottomRight}>IEC · LIVE APERTURE</div>
        </div>
      </div>

      {/* Centered Stage Header */}
      <StageHeader
        title="WHAT WE DO"
        subtitle="Three interconnected pillars propelling ideas into action."
      />

      {/* Foreground Stacked Typography matching User's Reference Layout */}
      <div className={styles.pillarsTypographyStack}>
        {PILLARS_DATA.map((item, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={item.id}
              className={`${styles.typographicRow} ${isHovered ? styles.rowHovered : ''}`}
              onMouseEnter={() => handleRowHover(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handlePillarClick(item, idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePillarClick(item, idx);
                }
              }}
            >
              <div className={styles.rowHeadlineArea}>
                <div className={styles.wordAndIndex}>
                  <span className={styles.rowNumber}>{item.number}</span>
                  <h2 className={styles.rowWord}>{item.title}</h2>
                </div>
                <span className={styles.rowTagline}>{item.tagline}</span>
              </div>

              <p className={styles.rowDesc}>{item.desc}</p>

              {/* Clean Horizontal Divider Line from reference image */}
              <div className={styles.rowDivider} />
            </div>
          );
        })}
      </div>

      {/* Advance Action */}
      <div className={styles.footerActionRow}>
        <button
          type="button"
          className={styles.exploreNextBtn}
          onClick={handleAdvance}
          aria-label="Advance to Next Stage"
        >
          <span>CONTINUE THE JOURNEY →</span>
        </button>
      </div>
    </section>
  );
};

export default S3_WhatWeDo;
