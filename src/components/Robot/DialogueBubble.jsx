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
  soundEnabled = true,
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
            <div className={styles.guideTitleGroup}>
              <span className={styles.guideBadge}>AI COMPANION</span>
              <span className={styles.speakerLabel}>SPARKY</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            {isVoiceSupported && onToggleVoice && (
              <button 
                type="button"
                className={`${styles.voiceBtn} ${isSpeaking ? styles.speaking : ''} ${!soundEnabled ? styles.muted : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVoice();
                }}
                aria-label={soundEnabled ? "Mute guide voice throughout website" : "Unmute guide voice throughout website"}
                title={soundEnabled ? "Voice ON · Click to mute" : "Voice MUTED · Click to unmute"}
              >
                {!soundEnabled ? (
                  <>
                    <span className={styles.voiceIcon} aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    </span>
                    <span className={styles.voiceBtnText}>MUTED</span>
                  </>
                ) : isSpeaking ? (
                  <>
                    <span className={styles.speakingWave} aria-hidden="true">
                      <span className={styles.waveBar}></span>
                      <span className={styles.waveBar}></span>
                      <span className={styles.waveBar}></span>
                    </span>
                    <span className={styles.voiceBtnText}>SPEAKING</span>
                  </>
                ) : (
                  <>
                    <span className={styles.voiceIcon} aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    </span>
                    <span className={styles.voiceBtnText}>VOICE</span>
                  </>
                )}
              </button>
            )}

            {onClose && (
              <button 
                type="button"
                className={styles.closeBtn} 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                aria-label="Dismiss guide message"
                title="Dismiss guide"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Message Body */}
        <p className={styles.messageText}>
          {text}
        </p>

        {/* Subtle Footer */}
        <div className={styles.cardFooter}>
          <span className={styles.footerHint}>
            <span className={styles.hintDot}>•</span> Click Sparky anytime to toggle
          </span>
        </div>
      </div>
    </aside>
  );
};

export default DialogueBubble;
