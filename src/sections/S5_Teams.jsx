import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S5_Teams.module.css';
import StageHeader from '../components/UI/StageHeader';

// Vintage Woodcut Ink Etchings for each wing
const WOODCUT_ILLUSTRATIONS = {
  technical: (
    <svg width="180" height="130" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Microprocessor Core */}
      <rect x="65" y="35" width="70" height="70" rx="4" stroke="#1c1917" strokeWidth="2.5" fill="#f5ede0" />
      <rect x="75" y="45" width="50" height="50" rx="2" stroke="#1c1917" strokeWidth="1.8" />
      <rect x="85" y="55" width="30" height="30" fill="#1c1917" />
      <circle cx="100" cy="70" r="7" fill="#f5ede0" stroke="#1c1917" strokeWidth="2" />

      {/* Radiating Circuit Lines & Woodcut Nodes */}
      <path d="M 65 50 L 30 50 M 65 70 L 20 70 M 65 90 L 30 90" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      <path d="M 135 50 L 170 50 M 135 70 L 180 70 M 135 90 L 170 90" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 35 L 80 15 M 100 35 L 100 10 M 120 35 L 120 15" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 105 L 80 125 M 100 105 L 100 130 M 120 105 L 120 125" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />

      {/* Terminal Node Endpoints */}
      <circle cx="20" cy="70" r="4" fill="#1c1917" />
      <circle cx="30" cy="50" r="3.5" fill="#1c1917" />
      <circle cx="30" cy="90" r="3.5" fill="#1c1917" />
      <circle cx="180" cy="70" r="4" fill="#1c1917" />
      <circle cx="170" cy="50" r="3.5" fill="#1c1917" />
      <circle cx="170" cy="90" r="3.5" fill="#1c1917" />
      <circle cx="100" cy="10" r="4" fill="#1c1917" />
      <circle cx="100" cy="130" r="4" fill="#1c1917" />

      {/* Binary / Precision Hatching Engraving */}
      <line x1="88" y1="50" x2="112" y2="50" stroke="#1c1917" strokeWidth="1.2" />
      <line x1="88" y1="90" x2="112" y2="90" stroke="#1c1917" strokeWidth="1.2" />
      <line x1="50" y1="50" x2="50" y2="30" stroke="#1c1917" strokeWidth="1.5" />
      <line x1="150" y1="90" x2="150" y2="110" stroke="#1c1917" strokeWidth="1.5" />
    </svg>
  ),

  design: (
    <svg width="180" height="130" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Drafting Compass & Caliper Legs */}
      <circle cx="100" cy="25" r="10" stroke="#1c1917" strokeWidth="2.5" fill="#f5ede0" />
      <circle cx="100" cy="25" r="4" fill="#1c1917" />
      <path d="M 96 34 L 55 125 M 104 34 L 145 125" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
      <path d="M 70 85 Q 100 95 130 85" stroke="#1c1917" strokeWidth="2" />
      <line x1="65" y1="85" x2="135" y2="85" stroke="#1c1917" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Fountain Pen Nib in Center */}
      <path d="M 100 45 L 90 95 L 97 125 L 100 135 L 103 125 L 110 95 Z" fill="#1c1917" />
      <circle cx="100" cy="85" r="3.5" fill="#f5ede0" />
      <line x1="100" y1="88" x2="100" y2="135" stroke="#f5ede0" strokeWidth="1.5" />

      {/* Golden Ratio Arc */}
      <path d="M 40 120 A 45 45 0 0 1 160 120" stroke="#1c1917" strokeWidth="1.4" strokeDasharray="4 4" />
    </svg>
  ),

  media: (
    <svg width="180" height="130" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vintage Cinema Camera Body */}
      <rect x="60" y="45" width="80" height="60" rx="6" stroke="#1c1917" strokeWidth="2.8" fill="#f5ede0" />
      
      {/* Twin 35mm Film Reels on Top */}
      <circle cx="75" cy="30" r="18" stroke="#1c1917" strokeWidth="2.2" fill="#f5ede0" />
      <circle cx="75" cy="30" r="6" fill="#1c1917" />
      <circle cx="125" cy="30" r="18" stroke="#1c1917" strokeWidth="2.2" fill="#f5ede0" />
      <circle cx="125" cy="30" r="6" fill="#1c1917" />

      {/* Large Lens with Aperture Blinds */}
      <circle cx="100" cy="75" r="22" stroke="#1c1917" strokeWidth="2.5" fill="#f5ede0" />
      <circle cx="100" cy="75" r="14" fill="#1c1917" />
      <circle cx="100" cy="75" r="6" fill="#f5ede0" />
      <path d="M 85 75 L 115 75 M 100 60 L 100 90" stroke="#f5ede0" strokeWidth="1.2" />

      {/* Viewfinder & Tripod Base Mount */}
      <polygon points="140,55 168,40 168,110 140,95" stroke="#1c1917" strokeWidth="2.2" fill="#1c1917" />
      <line x1="100" y1="105" x2="100" y2="130" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
      <line x1="85" y1="130" x2="115" y2="130" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  event: (
    <svg width="180" height="130" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crossed Spotlights */}
      <path d="M 20 130 L 70 30 L 95 30 L 140 130 Z" fill="#1c1917" opacity="0.08" />
      <path d="M 180 130 L 130 30 L 105 30 L 60 130 Z" fill="#1c1917" opacity="0.08" />

      {/* Ornate Pocket Chronometer (Precision Timekeeping) */}
      <circle cx="100" cy="75" r="32" stroke="#1c1917" strokeWidth="3" fill="#f5ede0" />
      <circle cx="100" cy="75" r="26" stroke="#1c1917" strokeWidth="1.5" />
      <circle cx="100" cy="35" r="7" stroke="#1c1917" strokeWidth="2.2" />
      <rect x="97" y="38" width="6" height="6" fill="#1c1917" />

      {/* Clock Hands & Ticks */}
      <circle cx="100" cy="75" r="3" fill="#1c1917" />
      <line x1="100" y1="75" x2="100" y2="56" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="75" x2="116" y2="75" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="52" r="1.5" fill="#1c1917" />
      <circle cx="100" cy="98" r="1.5" fill="#1c1917" />
      <circle cx="77" cy="75" r="1.5" fill="#1c1917" />
      <circle cx="123" cy="75" r="1.5" fill="#1c1917" />

      {/* Stage Spotlight Lamps */}
      <rect x="40" y="110" width="30" height="12" rx="3" stroke="#1c1917" strokeWidth="2" fill="#1c1917" />
      <rect x="130" y="110" width="30" height="12" rx="3" stroke="#1c1917" strokeWidth="2" fill="#1c1917" />
    </svg>
  ),

  pr: (
    <svg width="180" height="130" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sovereign Wax Seal Crest */}
      <circle cx="100" cy="70" r="42" stroke="#1c1917" strokeWidth="2.8" strokeDasharray="6 3" fill="#f5ede0" />
      <circle cx="100" cy="70" r="35" stroke="#1c1917" strokeWidth="1.8" />

      {/* Classical Alliance Handshake */}
      <path d="M 68 76 L 82 66 L 94 72 L 102 68 L 118 78 L 132 68" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 82 78 L 94 88 L 108 84 L 118 78" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="72" y1="62" x2="84" y2="74" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="128" y1="62" x2="116" y2="74" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />

      {/* Heraldic Laurel Branches */}
      <path d="M 52 70 Q 56 40 76 30" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 148 70 Q 144 40 124 30" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="62" cy="48" r="3" fill="#1c1917" />
      <circle cx="72" cy="36" r="3" fill="#1c1917" />
      <circle cx="138" cy="48" r="3" fill="#1c1917" />
      <circle cx="128" cy="36" r="3" fill="#1c1917" />
    </svg>
  ),

  content: (
    <svg width="180" height="130" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antique Scroll / Parchment */}
      <path d="M 50 35 C 40 35 40 50 50 50 L 140 50 C 150 50 150 35 140 35 Z" fill="#1c1917" />
      <path d="M 45 45 L 45 110 C 45 125 60 125 65 115 L 145 115 C 155 115 155 100 145 100 L 55 100" stroke="#1c1917" strokeWidth="2.2" fill="#f5ede0" />
      
      {/* Woodcut Text Lines on Scroll */}
      <line x1="65" y1="65" x2="125" y2="65" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      <line x1="65" y1="78" x2="135" y2="78" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      <line x1="65" y1="91" x2="115" y2="91" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />

      {/* Classical Goose Feather Quill Pen */}
      <path d="M 155 15 C 145 35 130 75 110 115 L 105 125 L 115 120 C 130 95 155 55 165 20 Z" fill="#1c1917" />
      <line x1="160" y1="18" x2="107" y2="123" stroke="#f5ede0" strokeWidth="1.2" />

      {/* Antique Inkwell */}
      <rect x="140" y="105" width="24" height="20" rx="3" stroke="#1c1917" strokeWidth="2" fill="#1c1917" />
      <rect x="145" y="99" width="14" height="6" fill="#1c1917" />
    </svg>
  )
};

// Playing Card Content Definitions (Matching Shark Tank Style)
const TEAMS_PLAYING_CARDS = [
  {
    id: 'technical',
    cardTitle: 'TECHNICAL',
    subtitle: 'BUILD · CODE · DEPLOY',
    illustrationKey: 'technical',
    bullets: [
      'HANDS-ON WORKSHOPS & BOOTCAMPS',
      'REAL WORLD PROJECTS & DEPLOYMENTS',
      'HACKATHON BUILDS & OPEN SOURCE'
    ],
    mission: 'We engineer the digital nervous system of the startup ecosystem.',
    robotDialogue: 'Technical Wing runs hands-on workshops, builds real-world deployments, and competes in hackathons!'
  },
  {
    id: 'design',
    cardTitle: 'DESIGN',
    subtitle: 'CREATE · BRAND · EXPERIENCE',
    illustrationKey: 'design',
    bullets: [
      'UI/UX DESIGN WORKSHOPS',
      'REAL BRAND IDENTITY PROJECTS',
      'MOTION GRAPHICS & VISUAL CAMPAIGNS'
    ],
    mission: 'Making the invisible tangible, captivating, and impossible to ignore.',
    robotDialogue: 'Design Wing runs UI/UX workshops and crafts real brand identities for student startups!'
  },
  {
    id: 'media',
    cardTitle: 'MEDIA',
    subtitle: 'CAPTURE · EDIT · PUBLISH',
    illustrationKey: 'media',
    bullets: [
      'PHOTOGRAPHY & VIDEOGRAPHY WORKSHOPS',
      'REAL EVENT COVERAGE & AFTERMOVIES',
      '1,000,000+ COMBINED DIGITAL REACH'
    ],
    mission: 'Immortalizing the turning points where raw ambition becomes history.',
    robotDialogue: 'Media Wing captures live events, runs photography workshops, and publishes stories reaching millions!'
  },
  {
    id: 'event',
    cardTitle: 'EVENT MGMT',
    subtitle: 'PLAN · EXECUTE · DELIVER',
    illustrationKey: 'event',
    bullets: [
      'EVENT PLANNING WORKSHOPS',
      'REAL CONCLAVE & FEST MANAGEMENT',
      '5,000+ DELEGATES PER FLAGSHIP'
    ],
    mission: 'Where meticulous precision commands raw chaos into unforgettable spectacle.',
    robotDialogue: 'Event Management organises workshops and takes the lead on real flagship conclaves, fests and pitch arenas!'
  },
  {
    id: 'pr',
    cardTitle: 'PUBLIC RELATIONS',
    subtitle: 'CONNECT · NEGOTIATE · GROW',
    illustrationKey: 'pr',
    bullets: [
      'NETWORKING & OUTREACH WORKSHOPS',
      'REAL SPONSOR & PARTNER DEALS',
      '100+ ENTERPRISE & VC ALLIANCES'
    ],
    mission: 'Bridging student dorm rooms with boardroom capital and industry titans.',
    robotDialogue: 'PR Wing runs negotiation workshops and secures real-world sponsors, VCs and enterprise alliances!'
  },
  {
    id: 'content',
    cardTitle: 'CONTENT',
    subtitle: 'WRITE · RESEARCH · INSPIRE',
    illustrationKey: 'content',
    bullets: [
      'WRITING & STORYTELLING WORKSHOPS',
      'REAL FOUNDER RESEARCH & CASE STUDIES',
      'BLOGS, NEWSLETTERS & VIRAL CAMPAIGNS'
    ],
    mission: 'Words engineered to spark revolutions in how generations think.',
    robotDialogue: 'Content Wing runs writing workshops and crafts real founder stories, newsletters and viral campaigns!'
  }
];

const S5_Teams = ({ isActive, sectionIndex = 3 }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isDraggingRef = useRef(false);
  const isAdvancingStageRef = useRef(false);

  const { setRobotState, setRobotDialogue, triggerDomino } = useDomino();
  const { playWhoosh, playClick } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  const totalCards = TEAMS_PLAYING_CARDS.length;

  // Reset stage transition guard whenever this section becomes active
  useEffect(() => {
    isAdvancingStageRef.current = false;
  }, [isActive]);

  const goToIndex = useCallback((nextIdx, withSound = true) => {
    const normalized = (nextIdx % totalCards + totalCards) % totalCards;
    setActiveIndex(normalized);
    if (withSound) playWhoosh();

    const team = TEAMS_PLAYING_CARDS[normalized];
    if (team) {
      setRobotDialogue(team.robotDialogue);
      setRobotState('talking');
    }
  }, [totalCards, playWhoosh, setRobotDialogue, setRobotState]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (isAdvancingStageRef.current) return;

    // If on the last card (Content) and advancing forward back to Tech card, change the stage
    if (activeIndex === totalCards - 1) {
      isAdvancingStageRef.current = true;
      setActiveIndex(0);
      if (playWhoosh) playWhoosh();

      const techCard = TEAMS_PLAYING_CARDS[0];
      if (techCard) {
        setRobotDialogue("You've explored all specialized wings! Advancing to Stage 05: Founders & Keynote Leaders.");
        setRobotState('excited');
      }

      // Smoothly trigger domino topple & advance to Stage 5
      setTimeout(() => {
        triggerDomino(sectionIndex);
      }, 420);
      return;
    }

    goToIndex(activeIndex + 1);
  }, [activeIndex, totalCards, goToIndex, playWhoosh, setRobotDialogue, setRobotState, triggerDomino, sectionIndex]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handlePrev, handleNext]);

  // Touch handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      e.stopPropagation();
      setDragOffset(dx);
    }
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    const dt = Date.now() - dragStartRef.current.time;

    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);

    const isFastSwipe = dt < 300 && Math.abs(dx) > 30;
    const isDistanceSwipe = Math.abs(dx) > 60;

    if (Math.abs(dx) > Math.abs(dy) && (isFastSwipe || isDistanceSwipe)) {
      e.stopPropagation();
      if (dx < 0) handleNext();
      else handlePrev();
    }
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    setDragOffset(e.clientX - dragStartRef.current.x);
  };

  const handleMouseUp = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dt = Date.now() - dragStartRef.current.time;

    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);

    if ((dt < 300 && Math.abs(dx) > 30) || Math.abs(dx) > 60) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  useGSAP(() => {
    if (isActive && !prefersReducedMotion && containerRef.current) {
      gsap.fromTo(`.${styles.header} > *`,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(`.${styles.cardDisplayStage}`,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.2)' },
        '-=0.2'
      );
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef} aria-label="Find Your Place Wings">
      {/* Centered Stage Header with 3D Wireframe and Metallic Glow */}
      <StageHeader
        title="FIND YOUR PLACE."
        subtitle="Six interconnected operational wings fueling the entrepreneurial movement."
      />

      {/* Main 3D Card Display Stage */}
      <div
        className={`${styles.cardDisplayStage} ${isDragging ? styles.dragging : ''}`}
        data-swipe-ignore="true"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Nav Arrow */}
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          onClick={handlePrev}
          aria-label="Previous Team Card"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Carousel Coverflow Track */}
        <div className={styles.cardsTrack}>
          {TEAMS_PLAYING_CARDS.map((card, idx) => {
            let offset = idx - activeIndex;
            if (offset > totalCards / 2) offset -= totalCards;
            if (offset < -totalCards / 2) offset += totalCards;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 2;

            let cardStateClass = styles.cardHidden;
            if (isCenter) cardStateClass = styles.cardCenter;
            else if (isLeft) cardStateClass = styles.cardLeft;
            else if (isRight) cardStateClass = styles.cardRight;
            else if (offset === -2) cardStateClass = styles.cardFarLeft;
            else if (offset === 2) cardStateClass = styles.cardFarRight;

            return (
              <div
                key={card.id}
                className={`${styles.cardStackWrapper} ${cardStateClass}`}
                onClick={() => {
                  if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                  else if (isCenter) {
                    playClick();
                    setRobotDialogue(card.robotDialogue);
                    setRobotState('excited');
                  }
                }}
                role="group"
                aria-label={`${card.cardTitle} card`}
                aria-hidden={!isVisible}
              >
                {/* 1. Tilted Playing Card Back (Classic Diamond Harlequin Pattern from Reference) */}
                <div className={styles.tiltedCardBack} aria-hidden="true">
                  <svg className={styles.harlequinSvg} width="100%" height="100%" preserveAspectRatio="none">
                    <defs>
                      <pattern id={`harlequin-${idx}`} width="28" height="44" patternUnits="userSpaceOnUse">
                        {/* Red Crimson Diamond */}
                        <polygon points="14,0 28,22 14,44 0,22" fill="#7a1818" />
                        {/* Navy Blue Side Triangles */}
                        <polygon points="14,0 28,0 28,22" fill="#14223d" />
                        <polygon points="0,0 14,0 0,22" fill="#14223d" />
                        <polygon points="0,22 14,44 0,44" fill="#14223d" />
                        <polygon points="28,22 28,44 14,44" fill="#14223d" />
                        {/* Cream Outline Accents */}
                        <polygon points="14,3 24,22 14,41 4,22" fill="none" stroke="#f6f0df" strokeWidth="1" opacity="0.3" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" rx="24" fill="#f6f0df" />
                    <rect x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 20px)" rx="16" fill={`url(#harlequin-${idx})`} stroke="#7a1818" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* 2. Main Playing Card Front (Exact Layout of Shark Tank Reference) */}
                <div className={styles.playingCardFront}>
                  {/* Top-Left Club Suit Symbol */}
                  <div className={styles.cornerSuitTop}>
                    <span className={styles.clubSymbol}>♣</span>
                  </div>

                  {/* Header: Serif Display Title & Subtitle */}
                  <div className={styles.cardHeaderArea}>
                    <h3 className={styles.cardSerifTitle}>{card.cardTitle}</h3>
                    <div className={styles.cardSubtitle}>{card.subtitle}</div>
                  </div>

                  {/* Center Woodcut Linework Illustration */}
                  <div className={styles.illustrationChamber}>
                    {WOODCUT_ILLUSTRATIONS[card.illustrationKey]}
                  </div>

                  {/* Bottom Metadata Details with ♣ Bullets */}
                  <div className={styles.metadataList}>
                    {card.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className={styles.metadataItem}>
                        <span className={styles.bulletClub}>♣</span>
                        <span className={styles.bulletText}>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom-Right Inverted Club Suit Symbol */}
                  <div className={styles.cornerSuitBottom}>
                    <span className={styles.clubSymbol}>♣</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Nav Arrow */}
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navArrowRight}`}
          onClick={handleNext}
          aria-label="Next Team Card"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Interactive Quick Team Selector Pills Bar */}
      <div className={styles.teamSelectorRow} role="tablist" aria-label="Select Team">
        {TEAMS_PLAYING_CARDS.map((card, idx) => {
          const isPillActive = idx === activeIndex;
          return (
            <button
              key={card.id}
              type="button"
              className={`${styles.teamPillBtn} ${isPillActive ? styles.teamPillBtnActive : ''}`}
              onClick={() => {
                setActiveIndex(idx);
                playClick();
                setRobotDialogue(card.robotDialogue);
                setRobotState('excited');
              }}
              role="tab"
              aria-selected={isPillActive}
            >
              {card.cardTitle}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default S5_Teams;
