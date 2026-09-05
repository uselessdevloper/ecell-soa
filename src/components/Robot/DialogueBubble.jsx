import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './DialogueBubble.module.css';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import useSoundManager from '../../hooks/useSoundManager';

const DialogueBubble = ({ 
  text, 
  isVisible = true, 
  onClose,
  isSpeaking = false,
  onToggleVoice,
  isVoiceSupported = true
}) => {
  const prefersReducedMotion = useReducedMotion();
  const bubbleCardRef = useRef(null);

  // Smooth entrance pop when message appears or changes
  useEffect(() => {
    if (!text || !isVisible) return;

    if (!prefersReducedMotion && bubbleCardRef.current) {
      gsap.fromTo(bubbleCardRef.current,
        { opacity: 0, y: -6, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [text, isVisible, prefersReducedMotion]);

  if (!isVisible || !text) return null;

  return (
    <aside className={styles.bubbleWrapper} aria-live="polite" role="status">
      <div ref={bubbleCardRef} className={styles.bubbleCard}>
        {/* Header Bar */}
        <div className={styles.speakerHeader}>
          <div className={styles.headerLeft}>
            <span className={`${styles.pulsingLight} ${isSpeaking ? styles.pulsingSpeaking : ''}`}></span>
            <span className={styles.speakerLabel}>SPARKY · GUIDE</span>
          </div>

          <div className={styles.headerRight}>
            {isVoiceSupported && onToggleVoice && (
              <button 
                type="button"
                className={`${styles.voiceBtn} ${isSpeaking ? styles.speaking : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVoice();
                }}
                aria-label={isSpeaking ? "Stop Sparky's voice" : "Listen to Sparky speak this message"}
                title={isSpeaking ? "Click to stop voice" : "Listen to Sparky speak this message"}
              >
                {isSpeaking ? (
                  <span className={styles.speakingWave} aria-hidden="true">
                    <span className={styles.waveBar}></span>
                    <span className={styles.waveBar}></span>
                    <span className={styles.waveBar}></span>
                  </span>
                ) : (
                  <span className={styles.voiceIcon} aria-hidden="true">🔊</span>
                )}
                <span className={styles.voiceBtnText}>
                  {isSpeaking ? 'SPEAKING' : 'VOICE'}
                </span>
              </button>
            )}

            {onClose && (
              <button 
                className={styles.closeBtn} 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                aria-label="Dismiss guide message"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Message Body - All message shown at once */}
        <p className={styles.messageText}>
          {text}
        </p>
      </div>
    </aside>
  );
};

export default DialogueBubble;
