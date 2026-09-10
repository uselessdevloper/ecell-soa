import React, { useEffect, useRef } from 'react';
import { useDomino } from '../../context/DominoContext';
import { DOMINO_SECTIONS } from '../../data/content';
import useSoundManager from '../../hooks/useSoundManager';
import styles from './StageTransitionOverlay.module.css';

const StageTransitionOverlay = () => {
  const { isTransitioning, targetDomino } = useDomino();
  const { playImpact, playClick } = useSoundManager();
  const hasPlayedSoundRef = useRef(false);

  useEffect(() => {
    if (isTransitioning && !hasPlayedSoundRef.current) {
      hasPlayedSoundRef.current = true;
      try {
        if (targetDomino !== null && targetDomino >= 0) {
          playImpact(0.8, targetDomino);
        } else {
          playClick();
        }
      } catch {
        // audio fallback
      }
    } else if (!isTransitioning) {
      hasPlayedSoundRef.current = false;
    }
  }, [isTransitioning, targetDomino, playImpact, playClick]);

  if (!isTransitioning) return null;

  // Determine target stage title & accent color
  let stageLabel = 'MAIN HUB';
  let stageSub = 'SOA UNIVERSITY';
  let accentColor = '#00f0ff';
  let glowColor = 'rgba(0, 240, 255, 0.45)';

  if (targetDomino !== null && targetDomino >= 0 && targetDomino <= 5) {
    const sec = DOMINO_SECTIONS[targetDomino];
    stageLabel = `STAGE 0${targetDomino + 1} // ${sec?.title || 'EXPLORE'}`;
    stageSub = sec?.note || 'INNOVATION ECOSYSTEM';
    accentColor = sec?.color || '#a832ff';
    glowColor = sec?.glowColor || 'rgba(168, 50, 255, 0.45)';
  } else if (targetDomino === -1) {
    stageLabel = 'RETURNING TO HUB';
    stageSub = 'INNOVATION & ENTREPRENEURSHIP CELL';
  }

  return (
    <aside 
      className={styles.transitionOverlay}
      style={{
        '--target-accent': accentColor,
        '--target-glow': glowColor,
      }}
      aria-live="assertive"
      aria-label={`Transitioning to ${stageLabel}`}
    >
      {/* Background Cybernetic Glass Backdrop */}
      <div className={styles.backdropGlow} />
      <div className={styles.cyberGridLines} />

      {/* Central Animated Motion Lockup */}
      <div className={styles.centerLockup}>
        {/* Concentric Kinetic Cyber Orbitals */}
        <div className={styles.ringSystem}>
          {/* 1. Outer Segmented Tech Ring */}
          <div className={styles.outerTechRing} />

          {/* 2. Expanding Radar Sonic Shockwaves */}
          <div className={`${styles.sonicWave} ${styles.wave1}`} />
          <div className={`${styles.sonicWave} ${styles.wave2}`} />

          {/* 3. Counter-Rotating Violet Gradient Arc */}
          <div className={styles.innerGradientArc} />

          {/* 4. Core Emblem Housing */}
          <div className={styles.emblemContainer}>
            {/* Specular Shimmer Sweep Effect */}
            <div className={styles.shimmerSweep} />
            
            {/* Official E-Cell SOA Emblem */}
            <img 
              src="/iec-logo.png" 
              alt="E-Cell SOA" 
              className={styles.ecellLogoImg}
              draggable="false"
            />
          </div>
        </div>

        {/* Brand Typography & HUD Metadata */}
        <div className={styles.infoLockup}>
          <div className={styles.brandTitle}>
            <span className={styles.titleGradient}>E-CELL</span>
            <span className={styles.titleDot}>·</span>
            <span className={styles.titleWhite}>SOA</span>
          </div>

          <div className={styles.targetStageBadge}>
            <span className={styles.pulseDot} />
            <span className={styles.stageText}>{stageLabel}</span>
          </div>

          <div className={styles.subtext}>{stageSub}</div>

          {/* 1-Second Quantum Laser Charging Progress Bar */}
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StageTransitionOverlay;
