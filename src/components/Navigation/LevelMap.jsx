import React, { useState } from 'react';
import styles from './LevelMap.module.css';
import { useDomino } from '../../context/DominoContext';
import useSoundManager from '../../hooks/useSoundManager';

const NODES = [
  { 
    id: 0, 
    level: 1, 
    title: '01 INTRODUCTION', 
    zone: 'Grassland Zone', 
    activeZoneName: 'Emerald Meadows', 
    x: 10, 
    y: 74, 
    labelPos: 'bottom' 
  },
  { 
    id: 1, 
    level: 2, 
    title: '02 WHO WE ARE', 
    zone: 'Foundation Plains', 
    activeZoneName: 'Foundation Plains', 
    x: 23, 
    y: 66, 
    labelPos: 'bottom' 
  },
  { 
    id: 2, 
    level: 3, 
    title: '03 WHAT WE DO', 
    zone: 'Action Ascent', 
    activeZoneName: 'Action Ascent', 
    x: 36, 
    y: 44, 
    labelPos: 'bottom' 
  },
  { 
    id: 3, 
    level: 4, 
    title: '04 EVENTS', 
    zone: 'Catalyst Peak', 
    activeZoneName: 'Catalyst Peak', 
    x: 49, 
    y: 32, 
    labelPos: 'top' 
  },
  { 
    id: 4, 
    level: 5, 
    title: '05 TEAMS', 
    zone: 'Whispering Forest', 
    activeZoneName: 'Whispering Forest', 
    x: 62, 
    y: 58, 
    labelPos: 'bottom' 
  },
  { 
    id: 5, 
    level: 6, 
    title: '06 FOUNDERS', 
    zone: 'Genesis Valley', 
    activeZoneName: 'Genesis Valley', 
    x: 74, 
    y: 76, 
    labelPos: 'bottom' 
  },
  { 
    id: 6, 
    level: 7, 
    title: '07 YOUR MOVE', 
    zone: 'Citadel Summit', 
    activeZoneName: 'Citadel Summit', 
    x: 89, 
    y: 30, 
    labelPos: 'top', 
    isSummit: true 
  }
];

// SVG path segments matching the reference curve
const SEGMENTS = [
  "M 100 444 C 150 430, 180 415, 230 396",
  "M 230 396 C 285 375, 315 300, 360 264",
  "M 360 264 C 405 228, 445 192, 490 192",
  "M 490 192 C 540 192, 570 310, 620 348",
  "M 620 348 C 665 385, 695 456, 740 456",
  "M 740 456 C 790 456, 835 240, 890 180"
];

const FULL_PATH = "M 100 444 C 150 430, 180 415, 230 396 C 285 375, 315 300, 360 264 C 405 228, 445 192, 490 192 C 540 192, 570 310, 620 348 C 665 385, 695 456, 740 456 C 790 456, 835 240, 890 180";

// Lock icon matching the reference (white shackle arch + red pill body + white center dot)
const LockIcon = () => (
  <span className={styles.lockBadge} aria-hidden="true">
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path 
        d="M 4 7 V 4 C 4 2 5.8 0.5 8 0.5 C 10.2 0.5 12 2 12 4 V 7" 
        stroke="#ffffff" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
      />
      <rect x="1.5" y="6.5" width="13" height="10.5" rx="3.5" fill="#f04438" />
      <circle cx="8" cy="11.8" r="1.4" fill="#ffffff" />
    </svg>
  </span>
);

const LevelMap = () => {
  const { currentDomino, goToSection } = useDomino();
  const { playImpact, playClick } = useSoundManager();
  const [isFocused, setIsFocused] = useState(false);

  const activeNode = NODES[currentDomino] || NODES[0];

  const handleNodeClick = (index) => {
    playImpact(1.0, index);
    goToSection(index);
  };

  const toggleFocus = () => {
    playClick();
    setIsFocused((prev) => !prev);
  };

  return (
    <div className={`${styles.levelMapLayer} ${isFocused ? styles.focusedMode : ''}`}>
      {/* Top-Right Circular Control Button (Reference Replica) */}
      <button 
        className={styles.topRightControlBtn} 
        onClick={toggleFocus}
        title={isFocused ? "Return to Domino view" : "Inspect full Level Map in background"}
        aria-label={isFocused ? "Close full map view" : "Open full map view"}
      >
        {isFocused ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 4 20 12 6 20 6 4"></polygon>
          </svg>
        )}
      </button>

      {/* Focus Mode Title Header Banner */}
      {isFocused && (
        <div className={styles.focusHeaderBanner}>
          <span className={styles.focusHeaderBadge}>MAP VIEW</span>
          <span className={styles.focusHeaderText}>Click any milestone to jump directly</span>
        </div>
      )}

      {/* SVG Canvas for Winding Curved Track & Ambient Waves */}
      <div className={styles.svgTrackContainer}>
        <svg 
          viewBox="0 0 1000 600" 
          preserveAspectRatio="none" 
          className={styles.mapSvg}
        >
          <defs>
            {/* Glowing neon path filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient for completed track */}
            <linearGradient id="activeTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>

          {/* Ambient wave ribbons from the reference image */}
          <path 
            d="M 0 520 C 220 500, 380 390, 600 390 C 800 390, 880 470, 1000 450" 
            fill="none" 
            stroke="rgba(24, 46, 52, 0.45)" 
            strokeWidth="56" 
            strokeLinecap="round"
          />
          <path 
            d="M 0 380 C 280 340, 480 260, 720 330 C 860 370, 940 330, 1000 310" 
            fill="none" 
            stroke="rgba(20, 36, 44, 0.35)" 
            strokeWidth="42" 
            strokeLinecap="round"
          />

          {/* Base Unreached Track (Dark Slate Blue) */}
          <path 
            d={FULL_PATH} 
            fill="none" 
            stroke="#212838" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Illuminated Completed & Active Track Segments */}
          {SEGMENTS.map((segD, sIdx) => {
            const isCompleted = sIdx < currentDomino;
            if (!isCompleted) return null;

            return (
              <path 
                key={sIdx}
                d={segD} 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="7" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#neonGlow)"
              />
            );
          })}
        </svg>

        {/* The 7 Milestone Progression Nodes (Direct Reference Replication) */}
        {NODES.map((node, idx) => {
          const isCompleted = idx < currentDomino;
          const isCurrent = idx === currentDomino;
          const isLocked = idx > currentDomino;

          return (
            <div 
              key={node.id}
              className={`
                ${styles.mapNode} 
                ${isCurrent ? styles.activeNode : ''} 
                ${isCompleted ? styles.completedNode : ''} 
                ${isLocked ? styles.lockedNode : ''}
              `}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`
              }}
              onClick={() => handleNodeClick(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Milestone ${node.level}: ${node.zone} (${node.title})`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNodeClick(idx);
                }
              }}
            >
              {/* Concentric Pulsing Halo Rings for Active Node */}
              {isCurrent && (
                <>
                  <div className={styles.activePulseHalo}></div>
                  <div className={styles.activeOuterRing}></div>
                </>
              )}

              {/* Central Node Circle */}
              <div className={styles.nodeCircle}>
                <span className={styles.nodeNumber}>{node.level}</span>
                {isLocked && <LockIcon />}
              </div>

              {/* 3 Rating Stars underneath Active Node */}
              {isCurrent && (
                <div className={styles.ratingStars} aria-hidden="true">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelMap;
