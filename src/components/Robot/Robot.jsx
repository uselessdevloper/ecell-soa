import React, { useEffect, useRef, useState } from 'react';
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
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const svgRef = useRef(null);
  const headRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const bodyRef = useRef(null);
  const antennaRef = useRef(null);
  const eyesGroupRef = useRef(null);
  const mouthRef = useRef(null);
  const coreRef = useRef(null);

  const { playRobotChirp } = useSoundManager();
  const { soundEnabled, setSoundEnabled } = useDomino();
  const { speak, stop, isSpeaking, isSupported: isVoiceSupported } = useRobotVoice();
  const prefersReducedMotion = useReducedMotion();

  // Re-open bubble whenever new dialogue arrives
  useEffect(() => {
    if (dialogue) {
      setIsBubbleOpen(true);
    }
  }, [dialogue]);

  // Voice narration: auto-speak if sound is enabled
  useEffect(() => {
    if (soundEnabled && dialogue && isBubbleOpen) {
      speak(dialogue);
    } else if (!soundEnabled) {
      stop();
    }
  }, [soundEnabled, dialogue, isBubbleOpen, speak, stop]);

  // Stop speech when unmounted
  useEffect(() => {
    return () => stop();
  }, [stop]);

  // Mouth animation synchronized with speech
  useEffect(() => {
    if (!mouthRef.current || prefersReducedMotion) return;

    if (isSpeaking) {
      const mouthTween = gsap.timeline({ repeat: -1, yoyo: true });
      mouthTween
        .to(mouthRef.current, {
          attr: { d: 'M 88 74 Q 100 86 112 74' },
          duration: 0.15,
          ease: 'power1.inOut'
        })
        .to(mouthRef.current, {
          attr: { d: 'M 91 75 Q 100 79 109 75' },
          duration: 0.13,
          ease: 'power1.inOut'
        });

      return () => {
        mouthTween.kill();
        const config = ROBOT_STATES[state] || ROBOT_STATES.idle;
        if (mouthRef.current) {
          if (config.mouthShape === 'talking' || config.mouthShape === 'open') {
            gsap.set(mouthRef.current, { attr: { d: 'M 88 74 Q 100 86 112 74' } });
          } else if (config.mouthShape === 'straight') {
            gsap.set(mouthRef.current, { attr: { d: 'M 93 75 L 107 75' } });
          } else {
            gsap.set(mouthRef.current, { attr: { d: 'M 90 75 Q 100 81 110 75' } });
          }
        }
      };
    }
  }, [isSpeaking, state, prefersReducedMotion]);

  // Core glow pulse while speaking
  useEffect(() => {
    if (!coreRef.current || prefersReducedMotion) return;

    if (isSpeaking) {
      gsap.to(coreRef.current, {
        opacity: 0.95,
        scale: 1.25,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(coreRef.current, {
        opacity: 0.6,
        scale: 1.0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [isSpeaking, prefersReducedMotion]);

  // Floating hover breathing
  useEffect(() => {
    if (prefersReducedMotion) return;

    const floatTween = gsap.to(svgRef.current, {
      y: -6,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    const corePulse = gsap.to(coreRef.current, {
      opacity: 0.6,
      scale: 1.15,
      transformOrigin: '50% 50%',
      duration: 1.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return () => {
      floatTween.kill();
      corePulse.kill();
    };
  }, [prefersReducedMotion]);

  // Handle state poses with exact shoulder pivot points
  useEffect(() => {
    const config = ROBOT_STATES[state] || ROBOT_STATES.idle;
    const elements = [headRef.current, leftArmRef.current, rightArmRef.current, bodyRef.current, antennaRef.current];
    elements.forEach(el => el && gsap.killTweensOf(el));

    if (prefersReducedMotion) return;

    gsap.set(elements, { clearProps: "transform" });

    if (config.head && headRef.current) gsap.to(headRef.current, { transformOrigin: '50% 90%', ...config.head });
    if (config.leftArm && leftArmRef.current) gsap.to(leftArmRef.current, { transformOrigin: '0px 0px', ...config.leftArm });
    if (config.rightArm && rightArmRef.current) gsap.to(rightArmRef.current, { transformOrigin: '0px 0px', ...config.rightArm });
    if (config.body && bodyRef.current) gsap.to(bodyRef.current, { transformOrigin: '50% 50%', ...config.body });
    if (config.antenna && antennaRef.current) gsap.to(antennaRef.current, { transformOrigin: '50% 100%', ...config.antenna });

    // Dynamic mouth expressions (if not currently speaking)
    if (mouthRef.current && !isSpeaking) {
      if (config.mouthShape === 'talking' || config.mouthShape === 'open') {
        gsap.to(mouthRef.current, { attr: { d: 'M 88 74 Q 100 86 112 74' }, duration: 0.25 });
      } else if (config.mouthShape === 'straight') {
        gsap.to(mouthRef.current, { attr: { d: 'M 93 75 L 107 75' }, duration: 0.25 });
      } else {
        gsap.to(mouthRef.current, { attr: { d: 'M 90 75 Q 100 81 110 75' }, duration: 0.25 });
      }
    }
  }, [state, isSpeaking, prefersReducedMotion]);

  // Eye movement tracking active content
  useEffect(() => {
    if (prefersReducedMotion || !eyesGroupRef.current) return;

    const lookX = state === 'pointing' || state === 'reacting' ? -7 : -3;
    const lookY = state === 'reacting' ? 3 : 1;

    gsap.to(eyesGroupRef.current, {
      x: lookX,
      y: lookY,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [state, prefersReducedMotion]);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stop();
    } else {
      if (!soundEnabled && setSoundEnabled) {
        setSoundEnabled(true);
      }
      if (dialogue) {
        speak(dialogue);
      }
    }
  };

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    stop();
  };

  const handleRobotInteract = () => {
    setIsBubbleOpen(true);
    playRobotChirp();

    if (!isSpeaking && dialogue) {
      if (!soundEnabled && setSoundEnabled) {
        setSoundEnabled(true);
      }
      speak(dialogue);
    }

    if (onRobotClick) onRobotClick();
  };

  const showBubble = Boolean(dialogue) && isBubbleOpen;

  return (
    <div className={`${styles.robotContainer} ${className}`} aria-label="Interactive Robot Guide">
      {/* 1. Speech Bubble sitting on top of the robot */}
      {showBubble && (
        <DialogueBubble 
          key={dialogue}
          text={dialogue} 
          isVisible={true} 
          isSpeaking={isSpeaking}
          onToggleVoice={handleToggleVoice}
          isVoiceSupported={isVoiceSupported}
          onClose={handleCloseBubble}
        />
      )}

      {/* 2. Downward Speech Pointer sitting on top of the robot's head and antenna */}
      {showBubble && (
        <div className={styles.pointerTail} aria-hidden="true">
          <svg width="22" height="13" viewBox="0 0 22 13" className={styles.pointerSvg}>
            <polygon points="0,0 22,0 11,13" fill="rgba(18, 9, 32, 0.95)" stroke="rgba(180, 77, 255, 0.5)" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="1" y1="0" x2="21" y2="0" stroke="rgba(18, 9, 32, 0.95)" strokeWidth="2.5" />
          </svg>
        </div>
      )}

      {/* 3. Interactive Robot Avatar */}
      <div 
        className={styles.robotClickTarget}
        onClick={handleRobotInteract}
        role="button"
        tabIndex={0}
        aria-label="Interact with Robot Guide"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRobotInteract();
          }
        }}
      >
        <svg 
          ref={svgRef} 
          className={styles.robotSvg} 
          viewBox="0 0 200 250" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#321e4a" />
              <stop offset="50%" stopColor="#231336" />
              <stop offset="100%" stopColor="#140922" />
            </linearGradient>

            <linearGradient id="limbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b2059" />
              <stop offset="100%" stopColor="#231338" />
            </linearGradient>
            
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g id="robot-master-group">
            {/* Torso / Body */}
            <g ref={bodyRef} id="body">
              <path 
                d="M 58 100 L 142 100 L 150 196 L 50 196 Z" 
                fill="url(#bodyGrad)" 
                stroke="#5d358a" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              
              {/* Shoulder Mounting Collars */}
              <circle cx="50" cy="114" r="10" fill="#140922" stroke="#5d358a" strokeWidth="2" />
              <circle cx="150" cy="114" r="10" fill="#140922" stroke="#5d358a" strokeWidth="2" />

              {/* Cyber Circuit Inlays */}
              <g stroke="#9b30ff" strokeWidth="1.5" opacity="0.4" fill="none">
                <path d="M 68 116 L 86 116 L 96 126" />
                <path d="M 132 136 L 114 136 L 104 146 L 104 168" />
                <circle cx="104" cy="168" r="2.5" fill="#ffb800" />
                <circle cx="86" cy="116" r="2" fill="#9b30ff" />
              </g>

              {/* Glowing Fusion Core */}
              <circle 
                ref={coreRef} 
                cx="100" 
                cy="144" 
                r="13" 
                fill="#9b30ff" 
                filter="url(#glowEffect)" 
              />
              <circle cx="100" cy="144" r="6" fill="#ffffff" opacity="0.9" />

              {/* Accent chassis bolts */}
              <circle cx="64" cy="108" r="2.5" fill="#ffb800" />
              <circle cx="136" cy="108" r="2.5" fill="#ffb800" />
              <circle cx="60" cy="188" r="2" fill="#4a2a6d" />
              <circle cx="140" cy="188" r="2" fill="#4a2a6d" />
            </g>

            {/* Left Arm Assembly (Anchored precisely to left shoulder at 50, 114) */}
            <g id="left-shoulder-anchor" transform="translate(50, 114)">
              <circle cx="0" cy="0" r="11" fill="#190e2b" stroke="#5d358a" strokeWidth="1.5" />
              <g ref={leftArmRef} id="left-arm">
                {/* Rotating Shoulder Ball */}
                <circle cx="0" cy="0" r="8.5" fill="#2d174d" stroke="#9b30ff" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3.5" fill="#ffb800" />

                {/* Upper Arm */}
                <rect x="-6.5" y="0" width="13" height="32" rx="6.5" fill="url(#limbGrad)" stroke="#4a2a6d" strokeWidth="1.5" />
                
                {/* Elbow Swivel */}
                <circle cx="0" cy="32" r="6" fill="#140922" stroke="#5d358a" strokeWidth="1.5" />
                <circle cx="0" cy="32" r="2.5" fill="#9b30ff" />

                {/* Forearm */}
                <rect x="-5.5" y="32" width="11" height="32" rx="5.5" fill="#2a1444" stroke="#4a2a6d" strokeWidth="1.2" />

                {/* Cuff Accent */}
                <rect x="-6" y="58" width="12" height="3" rx="1.5" fill="#ffb800" opacity="0.8" />

                {/* Hand Emitter */}
                <path d="M -5 66 Q 0 74 5 66" fill="none" stroke="#9b30ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#glowEffect)" />
                <circle cx="0" cy="69" r="2" fill="#00f0ff" />
              </g>
            </g>

            {/* Right Arm Assembly (Anchored precisely to right shoulder at 150, 114) */}
            <g id="right-shoulder-anchor" transform="translate(150, 114)">
              <circle cx="0" cy="0" r="11" fill="#190e2b" stroke="#5d358a" strokeWidth="1.5" />
              <g ref={rightArmRef} id="right-arm">
                {/* Rotating Shoulder Ball */}
                <circle cx="0" cy="0" r="8.5" fill="#2d174d" stroke="#9b30ff" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3.5" fill="#ffb800" />

                {/* Upper Arm */}
                <rect x="-6.5" y="0" width="13" height="32" rx="6.5" fill="url(#limbGrad)" stroke="#4a2a6d" strokeWidth="1.5" />
                
                {/* Elbow Swivel */}
                <circle cx="0" cy="32" r="6" fill="#140922" stroke="#5d358a" strokeWidth="1.5" />
                <circle cx="0" cy="32" r="2.5" fill="#9b30ff" />

                {/* Forearm */}
                <rect x="-5.5" y="32" width="11" height="32" rx="5.5" fill="#2a1444" stroke="#4a2a6d" strokeWidth="1.2" />

                {/* Cuff Accent */}
                <rect x="-6" y="58" width="12" height="3" rx="1.5" fill="#ffb800" opacity="0.8" />

                {/* Hand Emitter */}
                <path d="M -5 66 Q 0 74 5 66" fill="none" stroke="#9b30ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#glowEffect)" />
                <circle cx="0" cy="69" r="2" fill="#00f0ff" />
              </g>
            </g>

            {/* Head & Visor */}
            <g ref={headRef} id="head-group">
              {/* Neck */}
              <rect x="90" y="86" width="20" height="15" rx="3" fill="#140922" stroke="#4a2a6d" strokeWidth="1.5" />
              <line x1="92" y1="93" x2="108" y2="93" stroke="#9b30ff" strokeWidth="1.5" opacity="0.6" />
              
              {/* Antenna */}
              <g ref={antennaRef} id="antenna" transform="translate(100, 32)">
                <line x1="0" y1="0" x2="0" y2="-22" stroke="#683d99" strokeWidth="3" strokeLinecap="round" />
                <circle cx="0" cy="-22" r="5.5" fill="#ffb800" filter="url(#glowEffect)" />
                <circle cx="0" cy="-22" r="2.5" fill="#ffffff" />
              </g>

              {/* Helmet shell */}
              <rect 
                x="56" 
                y="30" 
                width="88" 
                height="62" 
                rx="22" 
                fill="url(#bodyGrad)" 
                stroke="#5d358a" 
                strokeWidth="2.5" 
              />
              
              {/* Dark Visor */}
              <rect x="64" y="40" width="72" height="42" rx="14" fill="#0c0516" stroke="#2a1444" strokeWidth="1.5" />
              
              {/* Glowing Visor Eyes */}
              <g ref={eyesGroupRef}>
                <circle cx="84" cy="56" r="9" fill="#9b30ff" filter="url(#glowEffect)" opacity="0.4" />
                <circle cx="84" cy="56" r="5" fill="#00f0ff" filter="url(#glowEffect)" />
                <circle cx="84" cy="56" r="2" fill="#ffffff" />
                
                <circle cx="116" cy="56" r="9" fill="#9b30ff" filter="url(#glowEffect)" opacity="0.4" />
                <circle cx="116" cy="56" r="5" fill="#00f0ff" filter="url(#glowEffect)" />
                <circle cx="116" cy="56" r="2" fill="#ffffff" />
              </g>

              {/* LED Mouth */}
              <path 
                ref={mouthRef} 
                d="M 90 75 Q 100 81 110 75" 
                fill="none" 
                stroke="#9b30ff" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                filter="url(#glowEffect)" 
              />
            </g>

            {/* Ground Shadow */}
            <ellipse cx="100" cy="235" rx="42" ry="7" fill="rgba(10, 6, 16, 0.6)" filter="url(#glowEffect)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Robot;
