import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { DominoProvider, useDomino } from './context/DominoContext';
import ParticleCanvas from './components/Effects/ParticleCanvas';
import PoppingBubbles from './components/Effects/PoppingBubbles';
import FrontPage from './components/Hero/FrontPage';
import SoundToggle from './components/UI/SoundToggle';
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
  const wheelTimeoutRef = useRef(null);
  const scrollSettleTimeoutRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const isFrontPage = currentDomino === -1;

  // Dynamic Directional 3D Camera Transition when active stage changes
  useEffect(() => {
    if (!sectionContainerRef.current || prefersReducedMotion || isFrontPage) return;

    const startY = direction === 'backward' ? -45 : 45;
    const startRotateX = direction === 'backward' ? -7 : 7;

    gsap.fromTo(
      sectionContainerRef.current,
      { 
        opacity: 0, 
        y: startY, 
        rotateX: startRotateX, 
        scale: 0.94, 
        filter: 'blur(8px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1, 
        filter: 'blur(0px)', 
        duration: 0.7, 
        ease: 'power3.out' 
      }
    );
  }, [currentDomino, direction, prefersReducedMotion, isFrontPage]);

  // Creative Kinetic Scroll with 3D Tilt Physics and Momentum Navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return;
      if (Math.abs(e.deltaY) < 10) return;

      // Real-time kinetic 3D tilt reaction on scroll
      if (sectionContainerRef.current && !prefersReducedMotion) {
        const tiltAmount = Math.max(-18, Math.min(18, e.deltaY * 0.12));
        const yShift = Math.max(-20, Math.min(20, -e.deltaY * 0.15));

        gsap.to(sectionContainerRef.current, {
          y: yShift,
          rotateX: tiltAmount,
          duration: 0.18,
          overwrite: 'auto'
        });

        // Spring back if threshold not reached
        if (scrollSettleTimeoutRef.current) clearTimeout(scrollSettleTimeoutRef.current);
        scrollSettleTimeoutRef.current = setTimeout(() => {
          if (sectionContainerRef.current) {
            gsap.to(sectionContainerRef.current, {
              y: 0,
              rotateX: 0,
              duration: 0.5,
              ease: 'back.out(1.5)'
            });
          }
        }, 150);
      }

      if (Math.abs(e.deltaY) < 32) return;

      if (wheelTimeoutRef.current) return;
      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 700);

      if (e.deltaY > 0) {
        nextSection();
      } else if (e.deltaY < 0) {
        prevSection();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollSettleTimeoutRef.current) clearTimeout(scrollSettleTimeoutRef.current);
    };
  }, [isTransitioning, nextSection, prevSection, prefersReducedMotion]);

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
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          nextSection();
        } else {
          prevSection();
        }
      } else if (Math.abs(deltaX) > 50) {
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
        /* 2. THE 6 STAGES WITH SCATTERED POPPING BUBBLE SYSTEM */
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

          {/* Scattered Popping Bubbles Background & Stage Selector HUD */}
          <PoppingBubbles 
            activeStage={currentDomino} 
            onBubblePop={(idx) => goToSection(idx)}
            showBackgroundOrbs={true}
          />

          {/* Floating Level Map HUD (Top-Right) */}
          <LevelMap />

          {/* Floating Audio Controller (Top-Right) */}
          <div className={styles.floatingSound}>
            <SoundToggle />
          </div>

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
