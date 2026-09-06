import React, { useState } from 'react';
import styles from './LevelMap.module.css';
import { useDomino } from '../../context/DominoContext';
import useSoundManager from '../../hooks/useSoundManager';

const NODES = [
  { 
    id: 0, 
    level: 1, 
    title: '01 WHO WE ARE', 
    zone: 'Identity Hub', 
    activeZoneName: 'Identity Hub', 
    x: 10, 
    y: 72, 
    labelPos: 'bottom' 
  },
  { 
    id: 1, 
    level: 2, 
    title: '02 WHAT WE DO', 
    zone: 'Action Ascent', 
    activeZoneName: 'Action Ascent', 
    x: 26, 
    y: 52, 
    labelPos: 'bottom' 
  },
  { 
    id: 2, 
    level: 3, 
    title: '03 EVENTS', 
    zone: 'Catalyst Peak', 
    activeZoneName: 'Catalyst Peak', 
    x: 42, 
    y: 34, 
    labelPos: 'top' 
  },
  { 
    id: 3, 
    level: 4, 
    title: '04 TEAMS', 
    zone: 'Synergy Sphere', 
    activeZoneName: 'Synergy Sphere', 
    x: 58, 
    y: 56, 
    labelPos: 'bottom' 
  },
  { 
    id: 4, 
    level: 5, 
    title: '05 FOUNDERS', 
    zone: 'Genesis Valley', 
    activeZoneName: 'Genesis Valley', 
    x: 74, 
    y: 72, 
    labelPos: 'bottom' 
  },
  { 
    id: 5, 
    level: 6, 
    title: '06 YOUR MOVE', 
    zone: 'Citadel Summit', 
    activeZoneName: 'Citadel Summit', 
    x: 90, 
    y: 30, 
    labelPos: 'top', 
    isSummit: true 
  }
];

// SVG path segments matching the 6-stage curve
const SEGMENTS = [
  "M 100 432 C 160 410, 200 350, 260 312",
  "M 260 312 C 320 270, 360 204, 420 204",
  "M 420 204 C 480 204, 520 310, 580 336",
  "M 580 336 C 640 365, 680 432, 740 432",
  "M 740 432 C 800 432, 840 240, 900 180"
];

const FULL_PATH = "M 100 432 C 160 410, 200 350, 260 312 C 320 270, 360 204, 420 204 C 480 204, 520 310, 580 336 C 640 365, 680 432, 740 432 C 800 432, 840 240, 900 180";

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

      {/* Full Level Map (Only active in Focus / Map Mode to prevent obstructing stage content) */}
      {isFocused && (
        <>
          {/* Focus Mode Title Header Banner */}
          <div className={styles.focusHeaderBanner}>
            <span className={styles.focusHeaderBadge}>ROADMAP VIEW</span>
            <span className={styles.focusHeaderText}>Click any milestone to jump directly</span>
          </div>

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

            {/* The Milestone Progression Nodes */}
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

                  {/* Zone Label Tooltip */}
                  <div className={`${styles.nodeTooltip} ${node.labelPos === 'top' ? styles.tooltipTop : styles.tooltipBottom}`}>
                    <span className={styles.tooltipZone}>{isCurrent ? node.activeZoneName : node.zone}</span>
                    <span className={styles.tooltipTitle}>{node.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default LevelMap;
