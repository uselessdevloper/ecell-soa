import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from './Robot.module.css';
import { ROBOT_STATES } from './RobotStates';
import DialogueBubble from './DialogueBubble';
import useSoundManager from '../../hooks/useSoundManager';
import { useRobotVoice } from '../../hooks/useRobotVoice';
import { useDomino } from '../../context/DominoContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Robot = ({ 
  state = 'idle', 
  dialogue = null, 
  onRobotClick,
  className = '' 
}) => {
  // Never open automatically on scroll - only open when user clicks the robot
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const headWrapperRef = useRef(null);
  const mouthRef = useRef(null);
  const laserRef = useRef(null);
  const shadowRef = useRef(null);

  const { playRobotChirp } = useSoundManager();
  const { soundEnabled, setSoundEnabled, toggleSound } = useDomino();
  const { speak, stop, isSpeaking, isSupported: isVoiceSupported } = useRobotVoice();
  const prefersReducedMotion = useReducedMotion();

  // Voice narration: auto-speak if sound is enabled AND bubble is explicitly opened by user
  useEffect(() => {
    if (soundEnabled && dialogue && isBubbleOpen) {
      speak(dialogue);
    } else if (!soundEnabled || !isBubbleOpen) {
      stop();
    }
  }, [soundEnabled, dialogue, isBubbleOpen, speak, stop]);

  // Stop speech when unmounted
  useEffect(() => {
    return () => stop();
  }, [stop]);

  // Continuous floating levitation + shadow breathing
  useEffect(() => {
    if (prefersReducedMotion || !headWrapperRef.current) return;

    const floatTween = gsap.to(headWrapperRef.current, {
      y: -8,
      rotationZ: 1.2,
      rotationY: -2,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    const shadowTween = shadowRef.current ? gsap.to(shadowRef.current, {
      scaleX: 0.85,
      scaleY: 0.8,
      opacity: 0.35,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    }) : null;

    return () => {
      floatTween.kill();
      if (shadowTween) shadowTween.kill();
    };
  }, [prefersReducedMotion]);

  // Handle state poses (head tilt, perspective shift, pointer ray)
  useEffect(() => {
    const config = ROBOT_STATES[state] || ROBOT_STATES.idle;
    if (!headWrapperRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(headWrapperRef.current, { clearProps: 'transform' });
      return;
    }

    if (config.head) {
      gsap.to(headWrapperRef.current, {
        rotation: config.head.rotation || 0,
        rotationY: config.head.rotationY || 0,
        rotationX: config.head.rotationX || 0,
        x: config.head.x ? config.head.x * 0.7 : 0,
        scale: config.head.scale || 1,
        duration: config.head.duration || 0.6,
        ease: config.head.ease || 'power2.out'
      });
    }

    // Laser pointer visibility when pointing to domino cards
    if (laserRef.current) {
      if (config.laserVisible) {
        gsap.to(laserRef.current, { opacity: 1, scaleX: 1, duration: 0.4, ease: 'back.out(1.5)' });
      } else {
        gsap.to(laserRef.current, { opacity: 0, scaleX: 0.2, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [state, prefersReducedMotion]);

  // Dynamic speaking mouth animation synchronized with voice
  useEffect(() => {
    if (!mouthRef.current || prefersReducedMotion) return;

    if (isSpeaking) {
      const mouthTween = gsap.timeline({ repeat: -1, yoyo: true });
      mouthTween
        .to(mouthRef.current, {
          scaleY: 1.8,
          scaleX: 1.1,
          duration: 0.14,
          ease: 'power1.inOut',
          transformOrigin: '50% 50%'
        })
        .to(mouthRef.current, {
          scaleY: 0.7,
          scaleX: 0.95,
          duration: 0.12,
          ease: 'power1.inOut',
          transformOrigin: '50% 50%'
        });

      return () => {
        mouthTween.kill();
        gsap.set(mouthRef.current, { scaleY: 1, scaleX: 1 });
      };
    }
  }, [isSpeaking, prefersReducedMotion]);

  // 3D Mouse tracking tilt
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !headWrapperRef.current) return;
    const rect = headWrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const tiltX = (mouseY / rect.height) * -10;
    const tiltY = (mouseX / rect.width) * 14;

    gsap.to(headWrapperRef.current, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.35,
      ease: 'power1.out'
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion || !headWrapperRef.current) return;
    const config = ROBOT_STATES[state] || ROBOT_STATES.idle;
    gsap.to(headWrapperRef.current, {
      rotationX: config.head?.rotationX || 0,
      rotationY: config.head?.rotationY || 0,
      rotation: config.head?.rotation || 0,
      x: config.head?.x ? config.head.x * 0.7 : 0,
      scale: config.head?.scale || 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [state, prefersReducedMotion]);

  const handleToggleVoice = () => {
    if (soundEnabled) {
      stop();
      if (toggleSound) toggleSound();
    } else {
      if (toggleSound) toggleSound();
      if (dialogue && isBubbleOpen) {
        speak(dialogue);
      }
    }
  };

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    stop();
  };

  const handleRobotInteract = () => {
    if (isBubbleOpen) {
      setIsBubbleOpen(false);
      stop();
    } else {
      setIsBubbleOpen(true);
      playRobotChirp();

      if (soundEnabled && dialogue) {
        speak(dialogue);
      }
    }

    if (onRobotClick) onRobotClick();
  };

  const showBubble = Boolean(dialogue) && isBubbleOpen;

  return (
    <div className={`${styles.robotContainer} ${className}`} aria-label="Interactive IEC Robot Guide">
      {/* 1. Speech Bubble sitting in smart popover above corner robot */}
      {showBubble && (
        <div className={styles.speechWrapper}>
          <DialogueBubble 
            key={dialogue}
            text={dialogue} 
            isVisible={true} 
            isSpeaking={isSpeaking}
            soundEnabled={soundEnabled}
            onToggleVoice={handleToggleVoice}
            isVoiceSupported={isVoiceSupported}
            onClose={handleCloseBubble}
          />
          <div className={styles.pointerTail} aria-hidden="true">
            <svg width="22" height="11" viewBox="0 0 22 11" className={styles.pointerSvg}>
              <polygon points="0,0 22,0 11,11" fill="rgba(12, 6, 22, 0.98)" stroke="rgba(0, 240, 255, 0.35)" strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="1" y1="0" x2="21" y2="0" stroke="rgba(12, 6, 22, 0.98)" strokeWidth="3" />
            </svg>
          </div>
        </div>
      )}

      {/* 2. Interactive Small Corner Robot Avatar */}
      <div 
        className={styles.robotClickTarget}
        onClick={handleRobotInteract}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label="Interact with IEC Robot Companion"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRobotInteract();
          }
        }}
      >
        {/* Subtle Hover Hint Tooltip when guide is closed */}
        {!isBubbleOpen && (
          <div className={styles.robotHoverHint} aria-hidden="true">
            <span className={styles.hintDot}>•</span> Click to talk
          </div>
        )}

        <div ref={headWrapperRef} className={styles.headWrapper}>
          {/* Photorealistic 3D Robot Head with IEC glowing white eyes & scanlines */}
          <img 
            src="/iec-bot-head.png" 
            alt="IEC 3D Robot Companion" 
            className={styles.headImage}
            draggable={false}
          />

          {/* Dynamic SVG layer for speaking mouth animation & pointer targeting beam */}
          <svg 
            className={styles.visorOverlay} 
            viewBox="0 0 1011 728" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Directional targeting beam pointing left toward domino cards when pointing */}
            <g ref={laserRef} opacity="0" transform="translate(260, 420)">
              <line x1="0" y1="0" x2="-180" y2="28" stroke="#00f0ff" strokeWidth="3.5" strokeDasharray="8 6" filter="url(#cyanGlow)" />
              <circle cx="-180" cy="28" r="5" fill="#ffffff" filter="url(#cyanGlow)" />
              <circle cx="-180" cy="28" r="10" fill="none" stroke="#00f0ff" strokeWidth="1.5" opacity="0.8" />
            </g>

            {/* Speaking animation overlay on mouth */}
            {isSpeaking && (
              <g ref={mouthRef} className={styles.mouthGroup}>
                <path 
                  d="M 445 508 Q 504 544 563 508 Q 504 488 445 508 Z" 
                  fill="rgba(0, 240, 255, 0.9)" 
                  stroke="#ffffff" 
                  strokeWidth="3.5"
                  filter="url(#cyanGlow)"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Levitating Ground Drop Shadow */}
        <div ref={shadowRef} className={styles.levitationShadow} aria-hidden="true" />
      </div>
    </div>
  );
};

export default Robot;
