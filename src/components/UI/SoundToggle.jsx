import React from 'react';
import { useDomino } from '../../context/DominoContext';
import styles from './MagneticButton.module.css';

const SoundToggle = () => {
  const { soundEnabled, toggleSound } = useDomino();

  return (
    <button 
      onClick={toggleSound}
      className={styles.soundToggleBtn} 
      aria-label={soundEnabled ? "Mute audio" : "Enable ambient sound"}
      title={soundEnabled ? "Sound ON (Click to mute)" : "Sound OFF (Click to unmute)"}
    >
      <span className={styles.soundSubOrb} aria-hidden="true">
        {soundEnabled ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </span>
      <span className={styles.soundLabel}>
        {soundEnabled ? 'AUDIO ON' : 'MUTED'}
      </span>
    </button>
  );
};

export default SoundToggle;
