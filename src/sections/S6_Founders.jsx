import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S6_Founders.module.css';

const S6_Founders = ({ isActive, sectionIndex = 5 }) => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedFounderId, setSelectedFounderId] = useState(null);
  const { setRobotState, setRobotDialogue } = useDomino();
  const { playClick } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  const sectionData = DOMINO_SECTIONS[sectionIndex] || {};
  const founders = sectionData.founders || [];

  const filteredFounders = founders.filter((f) => {
    if (activeCategory === 'FOUNDERS') return f.category === 'ALUMNI FOUNDER' || f.category === 'HEALTH-TECH' || f.category === 'CLEANTECH';
    if (activeCategory === 'STARTUPS') return f.category === 'SUPPORTED STARTUP';
    return true;
  });

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      gsap.fromTo(`.${styles.header} > *`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
      );
      gsap.fromTo(`.${styles.founderCard}`,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.2)' },
        '-=0.3'
      );
    }
  }, { dependencies: [isActive, activeCategory, prefersReducedMotion], scope: containerRef });

  const handleFounderClick = (founder) => {
    playClick();
    setSelectedFounderId(founder.id);
    if (founder.dialogue) {
      setRobotDialogue(founder.dialogue);
    } else if (founder.fullDescription) {
      setRobotDialogue(founder.fullDescription);
    } else {
      setRobotDialogue(`Learning from ${founder.name} (${founder.role}) proves ideas can become real institutions.`);
    }
    setRobotState('talking');
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.header}>
        <span className={styles.categoryPill}>DOMINO 05 · ENTREPRENEURS & STARTUPS</span>
        <h2 className={styles.mainTitle}>FROM IDEA TO IMPACT</h2>
        <p className={styles.subtitle}>MEET THE BUILDERS & VENTURES</p>
      </div>

      {/* Real Stage Photo Showcase from public/ */}
      <div className={styles.stageHeroBanner} title="E-Cell SOA Founders & Mentors Conclave">
        <img 
          src="/founders-stage.jpg" 
          alt="Founders & Mentors on E-Cell SOA Stage" 
          className={styles.stageHeroImg} 
        />
        <div className={styles.stageHeroOverlay}>
          <span className={styles.stageHeroBadge}>LIVE STAGE // ITER CONCLAVE</span>
          <p className={styles.stageHeroCaption}>Founders, angel investors & alumni leaders shaping SOA entrepreneurs.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterPillsRow} role="tablist" aria-label="Founder and startup categories">
        {[
          { id: 'ALL', label: `ALL (${founders.length})` },
          { id: 'FOUNDERS', label: 'FOUNDERS (3)' },
          { id: 'STARTUPS', label: 'SUPPORTED STARTUPS (2)' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`${styles.filterPill} ${activeCategory === tab.id ? styles.filterPillActive : ''}`}
            onClick={() => {
              playClick();
              setActiveCategory(tab.id);
            }}
            role="tab"
            aria-selected={activeCategory === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.foundersGrid}>
        {filteredFounders.map((founder, idx) => {
          const isSelected = selectedFounderId === founder.id;
          const isStartup = founder.category === 'SUPPORTED STARTUP';

          return (
            <div 
              key={founder.id || idx} 
              className={`
                ${styles.founderCard} 
                ${isSelected ? styles.founderCardActive : ''} 
                ${isStartup ? styles.startupCard : ''}
              `}
              onClick={() => handleFounderClick(founder)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFounderClick(founder);
                }
              }}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.badgePill} ${isStartup ? styles.badgeStartup : styles.badgeFounder}`}>
                  {founder.category || 'VENTURE'}
                </span>
                {isStartup && <span className={styles.iecTag}>SUPPORTED BY IEC</span>}
              </div>

              <div className={styles.cardMain}>
                <div className={`${styles.avatarPill} ${isStartup ? styles.startupAvatar : ''}`}>
                  <span className={styles.initials}>{founder.initials}</span>
                </div>
                <div className={styles.infoCol}>
                  <h4 className={styles.founderName}>{founder.name}</h4>
                  <p className={styles.founderRole}>{founder.role}</p>
                </div>
              </div>

              <p className={styles.founderHighlight}>"{founder.highlight}"</p>

              {isSelected && founder.fullDescription && (
                <div className={styles.fullDescBox}>
                  <p>{founder.fullDescription}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default S6_Founders;
