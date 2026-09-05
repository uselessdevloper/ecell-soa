import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import Domino from '../components/Domino/Domino';
import MagneticButton from '../components/UI/MagneticButton';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S5_Teams.module.css';

const S5_Teams = ({ isActive, sectionIndex = 4 }) => {
  const containerRef = useRef(null);
  const [converged, setConverged] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [youDominoState, setYouDominoState] = useState('standing');

  const { triggerDomino, setRobotState, setRobotDialogue } = useDomino();
  const { playImpact, playWhoosh, playClick } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  const sectionData = DOMINO_SECTIONS[sectionIndex] || {};
  const teams = sectionData.teams || [];

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      gsap.fromTo(`.${styles.header} > *`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
      );
      gsap.fromTo(`.${styles.teamCard}`,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'back.out(1.2)' },
        '-=0.3'
      );
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleTeamClick = (team) => {
    playClick();
    setActiveTeamId(team.id);
    setRobotDialogue(`Joining ${team.name} gives you: ${team.benefits.join(', ')}.`);
    setRobotState('pointing');
  };

  const handleConverge = () => {
    if (converged) return;
    playWhoosh();
    playImpact(0.9);
    setConverged(true);
    setRobotDialogue("Different strengths. Different paths. But together, we create the chain.");
    setRobotState('excited');

    if (!prefersReducedMotion) {
      gsap.fromTo(`.${styles.youArea}`,
        { scale: 0.6, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'back.out(1.5)' }
      );
    }
  };

  const handleYouClick = () => {
    playImpact(1.1);
    setYouDominoState('falling');
    setTimeout(() => {
      setYouDominoState('fallen');
      triggerDomino(sectionIndex);
    }, 600);
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.header}>
        <span className={styles.categoryPill}>DOMINO 05 · SIX PATHS</span>
        <h2 className={styles.mainTitle}>FIND YOUR PLACE.</h2>
        <h3 className={styles.subtitle}>ONE E-CELL. SIX PATHS.</h3>
        <p className={styles.tagline}>"Choose where you want to make your mark."</p>
      </div>

      {!converged ? (
        <div className={styles.branchingContainer}>
          {/* Central Hub */}
          <div className={styles.centerNode} onClick={handleConverge}>
            <div className={styles.hubCircle}>
              <span className={styles.hubTitle}>E-CELL</span>
              <span className={styles.hubSub}>CORE</span>
            </div>
          </div>

          {/* 6 Team Domino Cards */}
          <div className={styles.teamsGrid}>
            {teams.map((team, idx) => {
              const isSelected = activeTeamId === team.id;
              return (
                <div 
                  key={team.id || idx} 
                  className={`${styles.teamCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleTeamClick(team)}
                >
                  <div className={styles.teamHeader}>
                    <span className={styles.teamIndex}>0{idx + 1}</span>
                    <h4 className={styles.teamName}>{team.name}</h4>
                    <p className={styles.teamHeadline}>"{team.headline}"</p>
                  </div>

                  <div className={styles.benefitsList}>
                    {team.benefits.map((benefit, bIdx) => (
                      <span key={bIdx} className={styles.benefitBadge}>
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.convergeCta}>
            <MagneticButton 
              variant="primary" 
              size="medium" 
              onClick={handleConverge}
            >
              ALL PATHS CONVERGE INTO YOU →
            </MagneticButton>
          </div>
        </div>
      ) : (
        <div className={styles.youArea}>
          <div className={styles.youGlow}></div>
          <span className={styles.youSub}>THE CONVERGENCE</span>
          <h3 className={styles.youTitle}>YOU</h3>
          <p className={styles.youTagline}>Different paths. One chain.</p>

          <div className={styles.youDominoWrapper}>
            <Domino 
              number="05"
              title="YOU"
              tagline="Click to topple into Founders"
              size="large"
              state={youDominoState}
              glow={true}
              color={sectionData.color}
              glowColor={sectionData.glowColor}
              onClick={handleYouClick}
            />
          </div>

          <p className={styles.youHint}>
            Click the YOU domino to advance the story
          </p>
        </div>
      )}
    </section>
  );
};

export default S5_Teams;
