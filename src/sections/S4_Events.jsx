import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import Domino from '../components/Domino/Domino';
import MiniDomino from '../components/Domino/MiniDomino';
import MagneticButton from '../components/UI/MagneticButton';
import { DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S4_Events.module.css';

const EXPERIENCE_PHOTOS = [
  {
    id: "dsc0120",
    title: "KEYNOTE CONCLAVE",
    src: "/exp-dsc-0120.jpg",
    originalName: "Copy of DSC_0120",
    caption: "Founders & leaders inspiring SOA innovators.",
    dialogue: "Here are our keynote masterclasses in the grand auditorium, where founders share raw startup journeys and strategies!"
  },
  {
    id: "img7878",
    title: "IDEATION SPRINT",
    src: "/exp-img-7878.jpg",
    originalName: "IMG_7878",
    caption: "Hands-on problem solving and prototype building.",
    dialogue: "This is our rapid ideation sprint, where student teams turn ideas into working MVPs and live prototypes over 36 intense hours!"
  },
  {
    id: "dsc07345",
    title: "COMMUNITY CULTURE",
    src: "/exp-dsc-07345.jpg",
    originalName: "DSC07345",
    caption: "A bonded student ecosystem driven by peer innovation.",
    dialogue: "The heart of IEC-SOA is the culture! An unstoppable community that learns, builds, and celebrates every win together."
  },
  {
    id: "eventscrowd",
    title: "FLAGSHIP CONVERGENCE",
    src: "/exp-events-crowd.jpg",
    originalName: "events-crowd",
    caption: "Thousands of students uniting under one roof.",
    dialogue: "Look at the electric energy in the audience! Thousands of students coming together to shape their entrepreneurial future."
  }
];

const S4_Events = ({ isActive, sectionIndex = 3 }) => {
  const containerRef = useRef(null);
  const [converged, setConverged] = useState(false);
  const [activeEventId, setActiveEventId] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [experienceState, setExperienceState] = useState('standing');
  const { triggerDomino, setRobotState, setRobotDialogue } = useDomino();
  const { playImpact, playWhoosh, playClick } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  const sectionData = DOMINO_SECTIONS[sectionIndex] || {};
  const events = sectionData.events || [];
  const selectedPhoto = EXPERIENCE_PHOTOS[selectedPhotoIndex] || EXPERIENCE_PHOTOS[0];

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
      gsap.fromTo(`.${styles.header} > *`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
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
      <div className={styles.header}>
        <span className={styles.categoryPill}>EVENTS</span>
        <h2 className={styles.mainTitle}>WHERE IDEAS COME ALIVE</h2>
        <p className={styles.tagline}>"Learn. Compete. Connect. Create."</p>
      </div>

      {!converged ? (
        <div className={styles.eventsWrapper}>
          <div className={styles.eventsGrid}>
            {events.map((evt, idx) => {
              const isSelected = activeEventId === evt.id;
              return (
                <div 
                  key={evt.id || idx} 
                  className={`${styles.eventCard} ${isSelected ? styles.cardActive : ''}`}
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
                  <MiniDomino 
                    number={`0${idx + 1}`}
                    title={evt.name}
                    tagline={evt.tagline}
                    description={evt.description}
                    tags={evt.tags}
                    isActive={isSelected}
                    isInteractive={true}
                    color={sectionData.color}
                    glowColor={sectionData.glowColor}
                  />
                </div>
              );
            })}
          </div>

          <p className={styles.eventHintText}>
            Click or hover over any event to explore · Sparky explains the details
          </p>

          <div className={styles.convergencePrompt}>
            <MagneticButton 
              variant="outline" 
              size="medium" 
              onClick={handleConverge}
            >
              CONVERGE INTO EXPERIENCE →
            </MagneticButton>
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
