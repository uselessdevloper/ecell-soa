import React, { useEffect } from 'react';
import styles from './NavControls.module.css';
import { useDomino } from '../../context/DominoContext';
import useSoundManager from '../../hooks/useSoundManager';

const NavControls = () => {
  const { currentDomino, prevSection, nextSection, isTransitioning } = useDomino();
  const { playClick } = useSoundManager();

  const canGoPrev = currentDomino > 0 && !isTransitioning;
  const canGoNext = currentDomino < 6 && !isTransitioning;

  const handlePrev = React.useCallback(() => {
    if (!canGoPrev) return;
    playClick();
    prevSection();
  }, [canGoPrev, playClick, prevSection]);

  const handleNext = React.useCallback(() => {
    if (!canGoNext) return;
    playClick();
    nextSection();
  }, [canGoNext, playClick, nextSection]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't hijack arrow keys if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoPrev, canGoNext, handlePrev, handleNext]);

  return (
    <div className={styles.navControls} aria-label="Step navigation">
      <button 
        className={styles.navBtn} 
        onClick={handlePrev} 
        disabled={!canGoPrev}
        aria-label="Previous domino section"
        title="Previous Section (← Left Arrow)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      <button 
        className={styles.navBtn} 
        onClick={handleNext} 
        disabled={!canGoNext}
        aria-label="Next domino section"
        title="Next Section (→ Right Arrow)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default NavControls;
