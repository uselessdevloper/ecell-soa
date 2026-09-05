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
      <span className={styles.soundIcon}>
        {soundEnabled ? '🔊' : '🔇'}
      </span>
      <span className={styles.soundLabel}>
        {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
      </span>
    </button>
  );
};

export default SoundToggle;
