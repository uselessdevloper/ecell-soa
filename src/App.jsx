import React, { useRef, useEffect } from 'react';
import { DominoProvider, useDomino } from './context/DominoContext';
import ParticleCanvas from './components/Effects/ParticleCanvas';
import FrontPage from './components/Hero/FrontPage';
import LevelMap from './components/Navigation/LevelMap';
import Robot from './components/Robot/Robot';
import S2_WhoWeAre from './sections/S2_WhoWeAre';
import S3_WhatWeDo from './sections/S3_WhatWeDo';
import S4_Events from './sections/S4_Events';
import S5_Teams from './sections/S5_Teams';
import S6_Founders from './sections/S6_Founders';
import S7_YourMove from './sections/S7_YourMove';
import { DOMINO_SECTIONS } from './data/content';
import { useReducedMotion } from './hooks/useReducedMotion';
import useSoundManager from './hooks/useSoundManager';
import styles from './App.module.css';

const SECTIONS = [
  S2_WhoWeAre,
  S3_WhatWeDo,
  S4_Events,
  S5_Teams,
  S6_Founders,
  S7_YourMove
];

const MainApp = () => {
  const { 
    currentDomino, 
    direction,
    burstTrigger, 
    robotState, 
    robotDialogue, 
    goToSection,
    nextSection,
    prevSection,
    isTransitioning
  } = useDomino();

  const { playClick } = useSoundManager();
  const sectionContainerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const isFrontPage = currentDomino === -1;

  // Ultra-Smooth Scroll Navigation with Momentum Lock
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning || wheelLockRef.current) return;

      // Ignore micro trackpad tremors
      if (Math.abs(e.deltaY) < 28) return;

      wheelLockRef.current = true;
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 350);

      if (e.deltaY > 0) {
        nextSection();
      } else {
        prevSection();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isTransitioning, nextSection, prevSection]);

  // Touch swipe navigation
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
      const isCarouselTarget = e.target && e.target.closest && e.target.closest('[data-swipe-ignore="true"]');
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          nextSection();
        } else {
          prevSection();
        }
      } else if (Math.abs(deltaX) > 50 && !isCarouselTarget) {
        if (deltaX < 0) {
          nextSection();
        } else {
          prevSection();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isTransitioning, nextSection, prevSection]);

  // Keyboard navigation (Arrow keys, PageUp/PageDown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (isTransitioning) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, nextSection, prevSection]);

  const CurrentSectionComponent = SECTIONS[Math.max(0, currentDomino)] || S2_WhoWeAre;
  const currentSectionData = DOMINO_SECTIONS[Math.max(0, currentDomino)] || DOMINO_SECTIONS[0];

  return (
    <div 
      className={styles.appWrapper}
      style={{
        '--ambient-accent': currentSectionData?.color || '#a832ff',
        '--ambient-accent-glow': currentSectionData?.glowColor || 'rgba(168, 50, 255, 0.35)',
        '--ambient-secondary': currentSectionData?.colorSecondary || '#00f0ff',
      }}
    >
      {/* 1. FRONT PAGE HERO VIEW (When currentDomino is -1) */}
      {isFrontPage ? (
        <FrontPage 
          onEnter={() => goToSection(0)} 
          onSelectStage={(idx) => goToSection(idx)}
        />
      ) : (
        /* 2. THE 6 STAGES PRESENTATION */
        <>
          {/* Dynamic Cyber Particle Background */}
          <ParticleCanvas 
            burstTrigger={burstTrigger} 
            activeColor={currentSectionData?.color}
            activeColorSecondary={currentSectionData?.colorSecondary}
          />

          {/* Top-Left Floating Back Arrow Button */}
          <button 
            type="button" 
            className={styles.floatingBackButton}
            onClick={() => {
              playClick();
              goToSection(-1);
            }}
            title="Return to Home"
            aria-label="Return to Home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          {/* Floating Level Map HUD (Top-Right) */}
          <LevelMap />

          {/* Main Interactive Stage: Centered Domino Presentation */}
          <main className={styles.mainStage}>
            <div className={styles.contentViewport} ref={sectionContainerRef}>
              <CurrentSectionComponent 
                isActive={true} 
                sectionIndex={currentDomino} 
              />
            </div>
          </main>
        </>
      )}

      {/* Floating Small Corner Robot Guide (Right Bottom Corner - Present throughout) */}
      <aside className={styles.cornerRobotViewport} aria-label="Robot Companion">
        <Robot 
          state={robotState} 
          dialogue={robotDialogue}
        />
      </aside>
    </div>
  );
};

function App() {
  return (
    <DominoProvider>
      <MainApp />
    </DominoProvider>
  );
}

export default App;
