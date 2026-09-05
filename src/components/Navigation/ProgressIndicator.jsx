import React from 'react';
import styles from './ProgressIndicator.module.css';
import { useDomino } from '../../context/DominoContext';
import useSoundManager from '../../hooks/useSoundManager';
import { DOMINO_SECTIONS } from '../../data/content';

const ProgressIndicator = ({ total = 7 }) => {
  const { currentDomino, goToSection } = useDomino();
  const { playClick, playImpact } = useSoundManager();

  const formattedCurrent = currentDomino + 1 < 10 ? `0${currentDomino + 1}` : currentDomino + 1;
  const formattedTotal = total < 10 ? `0${total}` : total;
  const activeSection = DOMINO_SECTIONS[currentDomino] || DOMINO_SECTIONS[0];

  const handleDotClick = (index) => {
    playClick();
    playImpact(1.0, index);
    goToSection(index);
  };

  return (
    <nav className={styles.progressContainer} aria-label="Domino chain progress">
      <div className={styles.textCount}>
        <span 
          className={styles.currentNum}
          style={{ color: activeSection?.color || 'var(--accent-secondary)' }}
        >
          {formattedCurrent}
        </span>
        <span className={styles.divider}>/</span>
        <span className={styles.totalNum}>{formattedTotal}</span>
      </div>

      <div className={styles.dotsWrapper}>
        {Array.from({ length: total }).map((_, index) => {
          const isCompleted = index < currentDomino;
          const isActive = index === currentDomino;
          const sec = DOMINO_SECTIONS[index] || {};

          let stateClass = '';
          if (isActive) stateClass = styles.active;
          else if (isCompleted) stateClass = styles.completed;

          return (
            <button
              key={index}
              className={`${styles.dot} ${stateClass}`}
              style={{
                '--step-color': sec.color || '#a832ff',
                '--step-glow': sec.glowColor || 'rgba(168, 50, 255, 0.4)',
              }}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to Domino ${index + 1} (${sec.note || ''})`}
              aria-current={isActive ? 'step' : undefined}
              title={`Jump to Domino 0${index + 1}: ${sec.title || ''} [Note: ${sec.note || ''}]`}
            >
              <span className={styles.dotInner}></span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ProgressIndicator;
