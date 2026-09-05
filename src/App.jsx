import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { DominoProvider, useDomino } from './context/DominoContext';
import ParticleCanvas from './components/Effects/ParticleCanvas';
import SoundToggle from './components/UI/SoundToggle';
import ProgressIndicator from './components/Navigation/ProgressIndicator';
import NavControls from './components/Navigation/NavControls';
import LevelMap from './components/Navigation/LevelMap';
import Robot from './components/Robot/Robot';
import S1_Introduction from './sections/S1_Introduction';
import S2_WhoWeAre from './sections/S2_WhoWeAre';
import S3_WhatWeDo from './sections/S3_WhatWeDo';
import S4_Events from './sections/S4_Events';
import S5_Teams from './sections/S5_Teams';
import S6_Founders from './sections/S6_Founders';
import S7_YourMove from './sections/S7_YourMove';
import { DOMINO_SECTIONS } from './data/content';
import { useReducedMotion } from './hooks/useReducedMotion';
import styles from './App.module.css';

const SECTIONS = [
  S1_Introduction,
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
    burstTrigger, 
    robotState, 
    robotDialogue, 
    nextSection,
    prevSection,
    isTransitioning
  } = useDomino();

  const sectionContainerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const wheelTimeoutRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // GSAP Camera Transition when active section changes
  useEffect(() => {
    if (!sectionContainerRef.current || prefersReducedMotion) return;

    gsap.fromTo(
      sectionContainerRef.current,
      { opacity: 0, y: 30, scale: 0.94, filter: 'blur(6px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.68, ease: 'power3.out' }
    );
  }, [currentDomino, prefersReducedMotion]);

  // Scroll wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return;
      if (Math.abs(e.deltaY) < 40) return;

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
    return () => window.removeEventListener('wheel', handleWheel);
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
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      // Detect deliberate swipe (> 60px)
      if (Math.abs(deltaY) > 60 && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          nextSection();
        } else {
          prevSection();
        }
      } else if (Math.abs(deltaX) > 60) {
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

  const CurrentSectionComponent = SECTIONS[currentDomino] || S1_Introduction;
  const currentSectionData = DOMINO_SECTIONS[currentDomino] || DOMINO_SECTIONS[0];

  return (
    <div 
      className={styles.appWrapper}
      style={{
        '--ambient-accent': currentSectionData?.color || '#a832ff',
        '--ambient-accent-glow': currentSectionData?.glowColor || 'rgba(168, 50, 255, 0.35)',
        '--ambient-secondary': currentSectionData?.colorSecondary || '#00f0ff',
      }}
    >
      {/* Dynamic Cyber Particle Background */}
      <ParticleCanvas 
        burstTrigger={burstTrigger} 
        activeColor={currentSectionData?.color}
        activeColorSecondary={currentSectionData?.colorSecondary}
      />

      {/* Ambient Lighting & Cyber Grid */}
      <div className={styles.ambientGlows} aria-hidden="true">
        <div className={styles.orbTopLeft}></div>
        <div className={styles.orbBottomRight}></div>
        <div className={styles.cyberGrid}></div>
      </div>

      {/* Floating Level Map HUD (Top-Left) */}
      <LevelMap />

      {/* Floating Audio Controller (Top-Right) */}
      <div className={styles.floatingSound}>
        <SoundToggle />
      </div>

      {/* Main Dual-Hero Stage: Domino Left/Center, Robot Guide Right */}
      <main className={styles.mainStage}>
        <div className={styles.contentViewport} ref={sectionContainerRef}>
          <CurrentSectionComponent 
            isActive={true} 
            sectionIndex={currentDomino} 
          />
        </div>

        <aside className={styles.robotViewport} aria-label="Robot Companion">
          <Robot 
            state={robotState} 
            dialogue={robotDialogue}
          />
        </aside>
      </main>

      {/* Progress Domino Chain Indicator */}
      <ProgressIndicator total={7} />

      {/* Minimal Step Controls */}
      <NavControls />
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
