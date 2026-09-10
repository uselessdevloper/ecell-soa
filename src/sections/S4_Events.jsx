import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import Domino from '../components/Domino/Domino';
import MagneticButton from '../components/UI/MagneticButton';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S4_Events.module.css';
import StageHeader from '../components/UI/StageHeader';

const EXPERIENCE_PHOTOS = [
  {
    id: "dsc0120",
    title: "KEYNOTE CONCLAVE",
    src: "/exp-dsc-0120.jpg",
    caption: "Founders & leaders inspiring SOA innovators.",
    dialogue: "Here are our keynote masterclasses in the grand auditorium, where founders share raw startup journeys and strategies!"
  },
  {
    id: "img7878",
    title: "IDEATION SPRINT",
    src: "/exp-img-7878.jpg",
    caption: "Hands-on problem solving and prototype building.",
    dialogue: "This is our rapid ideation sprint, where student teams turn ideas into working MVPs and live prototypes over 36 intense hours!"
  },
  {
    id: "dsc07345",
    title: "COMMUNITY CULTURE",
    src: "/exp-dsc-07345.jpg",
    caption: "A bonded student ecosystem driven by peer innovation.",
    dialogue: "The heart of IEC-SOA is the culture! An unstoppable community that learns, builds, and celebrates every win together."
  },
  {
    id: "eventscrowd",
    title: "FLAGSHIP CONVERGENCE",
    src: "/exp-events-crowd.jpg",
    caption: "Thousands of students uniting under one roof.",
    dialogue: "Look at the electric energy in the audience! Thousands of students coming together to shape their entrepreneurial future."
  }
];

// Background image cycling reel (3 images provided by user)
const BG_IMAGES = [
  "/founders-stage.jpg",
  "/exp-img-7878.jpg",
  "/events-domino.jpg",
];

// All events — properly researched IEC-SOA flagship events
const ALL_EVENTS = [
  {
    id: "resonance25",
    name: "Resonance-25",
    category: "FLAGSHIP FEST",
    tagline: "Eastern India's Grandest Student Fest",
    description: "Resonance is IEC-SOA's flagship mega-festival — a multi-day celebration blending entrepreneurship, innovation, and culture. Featuring live startup pitches, business plan competitions, high-energy musical showcases, and industry speaker sessions, it draws thousands of students and visionaries from across Eastern India.",
    tags: ["FLAGSHIP FEST", "STARTUP EXPO", "LIVE PITCHING", "CULTURAL SHOWCASE"],
    accent: "#ffb800",
    iconType: "trophy",
    robotDialogue: "Resonance-25 is our flagship mega celebration! Thousands of students, live startup pitches, and industry leaders under one electric roof."
  },
  {
    id: "oblive",
    name: "Oblive",
    category: "ALUMNI CONCLAVE",
    tagline: "Annual Alumni Conclave & Founder Social",
    description: "Oblive is IEC-SOA's signature annual conclave bringing together alumni founders, startup leaders, and student innovators. An exclusive networking gala where groundbreaking milestones are celebrated, mentorship bonds are forged, and the next generation of entrepreneurs connects with those who've already made it.",
    tags: ["ALUMNI CONCLAVE", "FOUNDER SOCIAL", "NETWORKING GALA"],
    accent: "#00f0ff",
    iconType: "network",
    robotDialogue: "Oblive is our signature alumni gathering! Soaked in memories — founders, alumni, and creators celebrate entrepreneurial wins together."
  },
  {
    id: "exanova",
    name: "Exanova",
    category: "STRATEGY ARENA",
    tagline: "Where Creativity Meets Corporate Strategy",
    description: "Exanova is IEC-SOA's premier business & management challenge. Student teams tackle real-world corporate case studies, develop innovative marketing strategies, and battle it out in design-thinking pitch arenas judged by industry professionals — bridging academia with actual business strategy.",
    tags: ["CASE STUDY COMPETITION", "MARKETING CHALLENGE", "PITCH BATTLE"],
    accent: "#c084fc",
    iconType: "bolt",
    robotDialogue: "Exanova is our premier creative business challenge! Teams tackle real corporate case studies and pitch bold solutions to industry judges."
  },
  {
    id: "elysium2025",
    name: "ELYSIUM-2025",
    category: "WEEK FIESTA",
    tagline: "Week-Long Fiesta · Concludes at ITER",
    description: "ELYSIUM is ITER's grandest week-long annual fiesta — seven electrifying days of competitions, performances, and innovation. It hosts flagship IEC-SOA segments including Business Decoded, Founder's Arena at the Atal Innovation Centre, coding challenges, and startup showcases, culminating in a spectacular grand finale.",
    tags: ["WEEK-LONG FEST", "FOUNDER'S ARENA", "BUSINESS DECODED", "GRAND FINALE"],
    accent: "#dc50ff",
    iconType: "aperture",
    robotDialogue: "ELYSIUM-2025 is the week-long fiesta at ITER! Seven electrifying days of innovation, culture, and Founder's Arena at Atal Innovation Centre!"
  }
];

// Vector SVG icon renderer replacing all emojis with clean, futuristic iconography
const renderEventIcon = (type) => {
  switch (type) {
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'aperture':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
          <line x1="9.69" y1="8" x2="21.17" y2="8" />
          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
          <line x1="14.31" y1="16" x2="2.83" y2="16" />
          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};


const S4_Events = ({ isActive, sectionIndex = 3 }) => {
  const containerRef = useRef(null);
  const [converged, setConverged] = useState(false);
  const [activeEventId, setActiveEventId] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [experienceState, setExperienceState] = useState('standing');
  const [bgIndex, setBgIndex] = useState(0);
  const [flashActive, setFlashActive] = useState(false);
  const { triggerDomino, setRobotState, setRobotDialogue } = useDomino();
  const { playImpact, playWhoosh, playClick } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  const sectionData = DOMINO_SECTIONS[sectionIndex] || {};
  const events = ALL_EVENTS;
  const selectedPhoto = EXPERIENCE_PHOTOS[selectedPhotoIndex] || EXPERIENCE_PHOTOS[0];

  // Background cycling with shutter flash
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashActive(true);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % BG_IMAGES.length);
        setFlashActive(false);
      }, 280);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Automatic smooth slideshow timer when in experience view
  useEffect(() => {
    if (!converged || isPaused) return;

    const interval = setInterval(() => {
      setSelectedPhotoIndex((prev) => (prev + 1) % EXPERIENCE_PHOTOS.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [converged, isPaused]);

  // Synchronize Sparky the robot's dialogue with the active slideshow photo
  useEffect(() => {
    if (converged) {
      const photo = EXPERIENCE_PHOTOS[selectedPhotoIndex];
      if (photo && photo.dialogue) {
        setRobotDialogue(photo.dialogue);
      }
    }
  }, [selectedPhotoIndex, converged, setRobotDialogue]);

  const handlePrevPhoto = (e) => {
    e?.stopPropagation?.();
    playClick();
    setSelectedPhotoIndex((prev) => (prev - 1 + EXPERIENCE_PHOTOS.length) % EXPERIENCE_PHOTOS.length);
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation?.();
    playClick();
    setSelectedPhotoIndex((prev) => (prev + 1) % EXPERIENCE_PHOTOS.length);
  };

  useGSAP(() => {
    if (isActive && !prefersReducedMotion) {
      gsap.fromTo(`.${styles.header}`,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(`.${styles.eventCard}`,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.4'
      );
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleEventSelect = (event) => {
    setActiveEventId(event.id);
    if (event.robotDialogue) {
      setRobotDialogue(event.robotDialogue);
      setRobotState('talking');
    }
  };

  const handlePhotoSelect = (index) => {
    setSelectedPhotoIndex(index);
    playClick();
    const photo = EXPERIENCE_PHOTOS[index];
    if (photo && photo.dialogue) {
      setRobotDialogue(photo.dialogue);
      setRobotState('excited');
    }
  };

  const handleConverge = () => {
    if (converged) return;
    playWhoosh();
    playImpact(0.8);
    setConverged(true);
    setRobotDialogue(sectionData.convergenceDialogue || "And these are just some of the experiences waiting for you. Click any snapshot to feature it on the domino!");
    setRobotState('excited');

    if (!prefersReducedMotion) {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const exp = containerRef.current.querySelector(`.${styles.experienceContainer}`);
        const photos = containerRef.current.querySelectorAll(`.${styles.photoCard}`);
        if (exp) {
          gsap.fromTo(exp,
            { scale: 0.85, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }
          );
        }
        if (photos && photos.length) {
          gsap.fromTo(photos,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
          );
        }
      });
    }
  };

  const handleExperienceClick = () => {
    playImpact(1.0);
    setExperienceState('falling');
    setTimeout(() => {
      setExperienceState('fallen');
      triggerDomino(sectionIndex);
    }, 600);
  };

  return (
    <section className={styles.section} ref={containerRef}>
      {/* Cycling background image reel */}
      <div className={styles.bgReel}>
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`${styles.bgSlide} ${i === bgIndex ? styles.bgSlideActive : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className={`${styles.shutterFlash} ${flashActive ? styles.shutterFlashActive : ''}`} />
        <div className={styles.bgOverlay} />
      </div>

      <StageHeader
        title="WHERE IDEAS COME ALIVE"
        subtitle='"Learn. Compete. Connect. Create."'
      />

      {!converged ? (
        <div className={styles.eventsWrapper}>
          <div className={styles.eventsGrid}>
            {events.map((evt, idx) => {
              const isSelected = activeEventId === evt.id;
              const accent = evt.accent || '#ffb800';
              return (
                <div
                  key={evt.id || idx}
                  className={`${styles.eventCard} ${isSelected ? styles.cardActive : ''}`}
                  style={{
                    '--card-accent': accent,
                    '--card-accent-20': `${accent}33`,
                    '--card-accent-40': `${accent}66`,
                  }}
                  onMouseEnter={() => handleEventSelect(evt)}
                  onClick={() => handleEventSelect(evt)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${evt.name}: ${evt.tagline || ''}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleEventSelect(evt);
                    }
                  }}
                >
                  {/* Top row: badge with vector icon + category name & index number */}
                  <div className={styles.cardTopRow}>
                    <div className={styles.cardBadge}>
                      <span className={styles.cardIcon}>
                        {renderEventIcon(evt.iconType)}
                      </span>
                      <span className={styles.cardCategory}>{evt.category}</span>
                    </div>
                    <span className={styles.cardNumber}>// 0{idx + 1}</span>
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{evt.name}</h3>
                    <p className={styles.cardTagline}>{evt.tagline}</p>
                    <div className={styles.cardDivider} />
                    <p className={styles.cardDescription}>{evt.description}</p>
                  </div>

                  <div className={styles.cardTags}>
                    {evt.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.cardGlow} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.experienceContainer}>
          <div className={styles.convergenceHalo}></div>
          <h2 className={styles.singleLineHeading}>EXPERIENCE</h2>
          
          <div 
            className={styles.experienceStageWrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Nav Chevrons */}
            <button 
              className={`${styles.slideNavBtn} ${styles.slideNavPrev}`}
              onClick={handlePrevPhoto}
              title="Previous photo"
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div className={styles.experienceDomino}>
              <Domino 
                number="04" 
                slideshowPhotos={EXPERIENCE_PHOTOS}
                slideshowIndex={selectedPhotoIndex}
                size="experienceLarge" 
                state={experienceState}
                glow={true} 
                color={sectionData.color}
                glowColor={sectionData.glowColor}
                onClick={handleExperienceClick}
              />
            </div>

            <button 
              className={`${styles.slideNavBtn} ${styles.slideNavNext}`}
              onClick={handleNextPhoto}
              title="Next photo"
              aria-label="Next photo"
            >
              ›
            </button>

            {/* Slideshow Progress Counter & Pill */}
            <div className={styles.slideshowCounter}>
              <span className={styles.pulseDot}></span>
              <span className={styles.counterText}>
                0{selectedPhotoIndex + 1} / 0{EXPERIENCE_PHOTOS.length} · {selectedPhoto.title}
              </span>
              {isPaused && <span className={styles.pausedTag}>[PAUSED]</span>}
            </div>
          </div>

          {/* 4 Photo Snapshots Bar */}
          <div 
            className={styles.galleryGrid} 
            role="tablist" 
            aria-label="Experience photo gallery"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {EXPERIENCE_PHOTOS.map((photo, pIdx) => {
              const isSelected = selectedPhotoIndex === pIdx;
              return (
                <div
                  key={photo.id || pIdx}
                  className={`${styles.photoCard} ${isSelected ? styles.photoCardActive : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePhotoSelect(pIdx);
                  }}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isSelected}
                  title={`View ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePhotoSelect(pIdx);
                    }
                  }}
                >
                  <div className={styles.photoThumbWrapper}>
                    <img src={photo.src} alt={photo.title} className={styles.photoThumbImg} />
                    <div className={styles.photoOverlay}></div>
                    <span className={styles.photoIndexBadge}>{photo.title}</span>
                    {/* Animated Progress Bar on Active Snapshot */}
                    {isSelected && (
                      <div 
                        key={`prog-${selectedPhotoIndex}`}
                        className={`${styles.photoProgressBar} ${isPaused ? styles.progressPaused : ''}`}
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default S4_Events;
