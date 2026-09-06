import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import MiniDomino from '../components/Domino/MiniDomino';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S3_WhatWeDo.module.css';

const S3_WhatWeDo = ({ isActive, sectionIndex = 2 }) => {
  const containerRef = useRef(null);
  const dominoRefs = useRef([]);
  const [fallingStates, setFallingStates] = useState(['standing', 'standing', 'standing']);
  const { triggerDomino } = useDomino();
  const { playImpact, playChainReaction } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();
  
  const content = DOMINO_SECTIONS[sectionIndex] || {
    title: 'WHAT WE DO',
    pillars: [
      { title: 'EVENTS', description: 'Create opportunities to participate, experiment and compete.', tag: 'COMPETE' },
      { title: 'MENTORSHIP', description: 'Learn from industry experts, alumni and startup founders.', tag: 'GUIDANCE' },
      { title: 'EXPOSURE', description: 'Discover internships, live projects and valuable collaborations.', tag: 'OPPORTUNITY' }
    ]
  };

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      const tl = gsap.timeline();
      
      tl.from('.fade-header', {
        y: -30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      })
      .from('.mini-domino-item', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.3)'
      }, '-=0.3')
      .from('.connector-line', {
        scaleX: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.inOut',
        transformOrigin: 'left center'
      }, '-=0.5');
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleSequentialFall = () => {
    if (prefersReducedMotion) {
      triggerDomino(sectionIndex);
      return;
    }

    playChainReaction(3);

    // Staggered domino falls
    setFallingStates(['falling', 'standing', 'standing']);

    setTimeout(() => {
      setFallingStates(['fallen', 'falling', 'standing']);
      playImpact(1.1);
    }, 200);

    setTimeout(() => {
      setFallingStates(['fallen', 'fallen', 'falling']);
      playImpact(1.3);
    }, 400);

    setTimeout(() => {
      setFallingStates(['fallen', 'fallen', 'fallen']);
      playImpact(1.5);
      triggerDomino(sectionIndex);
    }, 650);
  };

  const PILLAR_PHOTOS = [
    "/events-domino.jpg",
    "/copy-dsc-0120.jpg",
    "/exp-img-7878.jpg"
  ];

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <span className={`fade-header ${styles.sectionTag}`}>DOMINO 02 · THREE PILLARS</span>
        <h2 className={`fade-header ${styles.title}`}>WHAT WE DO</h2>
        <p className={`fade-header ${styles.tagline}`}>Three interconnected pillars propelling ideas into action.</p>
      </div>
      
      <div 
        className={styles.chainContainer} 
        onClick={handleSequentialFall}
        title="Click to trigger domino chain reaction and advance"
      >
        {content.pillars.map((item, index) => (
          <React.Fragment key={index}>
            <div 
              className={`mini-domino-item ${styles.dominoWrapper}`}
              ref={(el) => (dominoRefs.current[index] = el)}
            >
              <MiniDomino 
                number={`0${index + 1}`} 
                title={item.title} 
                description={item.description} 
                tags={[item.tag]}
                image={item.image || PILLAR_PHOTOS[index]}
                state={fallingStates[index]}
                isInteractive={true}
                color={content.color}
                glowColor={content.glowColor}
                onClick={handleSequentialFall}
              />
            </div>

            {index < content.pillars.length - 1 && (
              <div className={`connector-line ${styles.connector}`}>
                <div className={styles.energyPulse}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default S3_WhatWeDo;
