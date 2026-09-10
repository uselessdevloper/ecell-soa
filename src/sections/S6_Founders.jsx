import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S6_Founders.module.css';
import StageHeader from '../components/UI/StageHeader';

// SVG Icons for squircle badges
const SVG_ICONS = {
  burger: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  pulse: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  leaf: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  wand: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  ),
  battery: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
      <line x1="22" y1="11" x2="22" y2="13" />
      <line x1="6" y1="11" x2="10" y2="11" />
    </svg>
  ),
  podium: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
};

const IEC_STARTUPS = [
  {
    id: 'driev',
    name: 'driEV MOBILITY',
    role: 'AI-Driven EV Micro-Mobility',
    tagline: 'Smoother Rides · Greener Tomorrows',
    typeBadge: 'STARTUP FROM IEC',
    accent: '#00f59b',
    accentDark: '#059669',
    badgeBg: 'rgba(0, 245, 155, 0.12)',
    badgeBorder: 'rgba(0, 245, 155, 0.4)',
    iconKey: 'bolt',
    posterImage: '/driev-poster.jpg',
    positionLabel: 'LEFT WING',
    fullDescription: 'driEV is an AI-driven smart-city micro-mobility startup operating across Bhubaneswar. Through intelligent IoT telematics, mobile app booking, and battery-swap stations, driEV delivers clean, affordable transit. Accelerated with campus launchpad, student pilots, and promotional support by IEC-SOA.',
    tags: ['AI MICRO-MOBILITY', 'IEC ACCELERATED', 'CLEANER CITIES', 'CAMPUS FLEET'],
    metrics: ['100k+ Clean Kms', '50+ Stations', 'Supported by IEC', 'Zero Emissions'],
    quote: 'Accelerating the smart-city transition to sustainable electric transit.',
    dialogue: 'driEV is an AI-driven electric mobility platform accelerated by IEC-SOA, providing eco-friendly transit across Bhubaneswar and university campuses!'
  },
  {
    id: 'influcraft',
    name: 'INFLUCRAFT',
    role: 'AI Creator-Tech & SaaS Platform',
    tagline: 'Creators Today · Brands Tomorrow',
    typeBadge: 'STARTUP FROM IEC',
    accent: '#00e5ff',
    accentDark: '#0284c7',
    badgeBg: 'rgba(0, 229, 255, 0.12)',
    badgeBorder: 'rgba(0, 229, 255, 0.4)',
    iconKey: 'wand',
    posterImage: '/influcraft-poster.jpg',
    positionLabel: 'CENTER STAGE',
    fullDescription: 'InfluCraft is an AI-first SaaS platform engineered in Bhubaneswar to streamline brand-creator partnerships, campaign workflows, real-time engagement analytics, and automated escrow payouts. IEC-SOA spotlighted the venture across university pitching events and startup showcases.',
    tags: ['CREATOR TECH', 'AI PLATFORM', 'IEC SHOWCASED', 'COLLABS & GROWTH'],
    metrics: ['1,000+ Creators', 'AI Engine', 'Supported by IEC', 'Automated Escrow'],
    quote: 'Building the operating system for the next generation of digital creators.',
    dialogue: 'InfluCraft builds AI tools for digital creators and brands, showcased through IEC-SOA startup outreach and pitching events!'
  },
  {
    id: 'twentyfour',
    name: '24X7',
    role: 'AI For Every Hour · Developer Platform',
    tagline: 'AI for Every Hour · Possibilities for Everyone',
    typeBadge: 'PRE-INCUBATED IN IEC',
    accent: '#60a5fa',
    accentDark: '#3b82f6',
    badgeBg: 'rgba(96, 165, 250, 0.12)',
    badgeBorder: 'rgba(96, 165, 250, 0.4)',
    iconKey: 'clock',
    posterImage: '/twentyfour-ai-poster.jpg',
    positionLabel: 'RIGHT WING',
    fullDescription: '24X7 is an AI-first developer productivity and learning ecosystem pre-incubated at IEC-SOA. Designed to empower students round the clock with AI coding tools, cloud development pipelines, and collaborative workflows — turning late-night curiosity into scalable software.',
    tags: ['PRE-INCUBATED IN IEC', 'AI TOOLS', 'DEVELOPER ECOSYSTEM', 'BUILD & LEARN'],
    metrics: ['Pre-Incubated', '24/7 AI Tools', 'IEC Mentored', 'Student Builders'],
    quote: 'Smarter Tools, Brighter Tomorrow · Ideas Powered by AI Always.',
    dialogue: '24X7 is pre-incubated in IEC-SOA, bringing round-the-clock AI developer tools and creative platforms to student innovators!'
  }
];

const S6_Founders = ({ isActive }) => {
  const containerRef = useRef(null);
  const [modalCard, setModalCard] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const { setRobotState, setRobotDialogue } = useDomino();
  const { playClick } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (isActive && !prefersReducedMotion && containerRef.current) {
      gsap.fromTo(`.${styles.startupLongCard}`,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: 'power3.out' }
      );
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleCardClick = (card) => {
    playClick();
    setModalCard(card);
    if (card.dialogue) {
      setRobotDialogue(card.dialogue);
      setRobotState('pointing');
    }
  };

  const closeModal = () => {
    playClick();
    setModalCard(null);
  };

  return (
    <section className={styles.section} ref={containerRef} aria-label="Startups from IEC">
      <div className={styles.ambientGlows} aria-hidden="true">
        <div className={styles.glowTopRight} />
        <div className={styles.glowBottomLeft} />
        <div className={styles.cyberGrid} />
      </div>

      <StageHeader
        title="STARTUPS FROM IEC"
        subtitle="Three high-impact student ventures born, pre-incubated & accelerated under IEC-SOA incubation."
      />

      {/* 3-Card Layout: Left (driEV) | Middle (InfluCraft) | Right (24X7) */}
      <div className={styles.threeCardsContainer}>
        {IEC_STARTUPS.map((card, cardIndex) => {
          const isHovered = hoveredCardId === card.id;
          const accent = card.accent || '#00f0ff';

          return (
            <article
              key={card.id}
              className={`${styles.startupLongCard} ${isHovered ? styles.cardActive : ''}`}
              style={{
                '--card-accent': accent,
                '--card-accent-dark': card.accentDark || accent,
                '--card-accent-20': `${accent}25`,
                '--card-accent-40': `${accent}55`,
                '--card-badge-bg': card.badgeBg || '#f8fafc',
                '--card-badge-border': card.badgeBorder || accent,
              }}
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${card.name}`}
            >
              {/* Full Medium-Long Image Display */}
              <div className={styles.fullPosterFrame}>
                <img 
                  src={card.posterImage} 
                  alt={`${card.name} official poster`} 
                  className={styles.fullPosterImg} 
                  loading="eager"
                  draggable="false"
                />
              </div>

              {/* Card Body & Details */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.name}</h3>
                <p className={styles.cardTagline}>{card.tagline}</p>
                <div className={styles.cardDivider} />
                <p className={styles.cardDescription}>{card.fullDescription}</p>
              </div>
            </article>
          );
        })}
      </div>

      {modalCard && (
        <div className={styles.modalBackdrop} onClick={closeModal} role="dialog" aria-modal="true">
          <div className={`${styles.modalCard} ${modalCard.posterImage ? styles.modalCardWithPoster : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={closeModal} aria-label="Close modal">
              ✕
            </button>

            <div className={styles.modalLayoutWrapper}>
              {modalCard.posterImage && (
                <div className={styles.modalPosterCol}>
                  <img 
                    src={modalCard.posterImage} 
                    alt={modalCard.name} 
                    className={styles.modalPosterImg}
                  />
                </div>
              )}

              <div className={styles.modalInfoCol}>
                {/* Classification Badges */}
                <div className={styles.modalBadgeRow}>
                  <span className={styles.modalBadgePrimary}>
                    {modalCard.typeBadge}
                  </span>
                  {modalCard.role && (
                    <span className={styles.modalBadgeSecondary}>
                      {modalCard.role}
                    </span>
                  )}
                </div>

                <h2 className={styles.modalTitle}>{modalCard.name}</h2>
                <div className={styles.modalRole}>{modalCard.role}</div>

                {/* Metrics Chips */}
                {modalCard.metrics && (
                  <div className={styles.modalMetricsRow}>
                    {modalCard.metrics.map((metric, mIdx) => (
                      <span key={mIdx} className={styles.metricChip}>
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                <p className={styles.modalDescription}>{modalCard.fullDescription}</p>

                {modalCard.quote && (
                  <blockquote className={styles.modalQuote}>
                    "{modalCard.quote}"
                  </blockquote>
                )}

                <div className={styles.modalActionRow}>
                  <button type="button" className={styles.modalPrimaryBtn} onClick={closeModal}>
                    Done Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default S6_Founders;
