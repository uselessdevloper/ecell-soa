import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { BRAND, DOMINO_SECTIONS } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S7_YourMove.module.css';
import StageHeader from '../components/UI/StageHeader';

// Step-by-step student transformation journey (Exactly 4 points)
const STUDENT_JOURNEY_STEPS = [
  {
    phase: 'WHERE YOU ARE NOW',
    subPhase: 'Day 01 · Campus Arrival',
    headline: 'THE CURIOUS OBSERVER IN THE CLASSROOM',
    subhead: 'Raw Ideas & Dorm Room Ambitions',
    description:
      'You have creative energy, untapped potential, and bold questions. But without real-world platforms, angel mentors, or execution squads, your greatest ideas risk staying just ideas.'
  },
  {
    phase: 'FIRST 90 DAYS IN IEC',
    subPhase: 'Semester 01 · Finding Your Tribe',
    headline: 'IMMERSION INTO SPECIALIZED WINGS',
    subhead: 'Tech · Design · Media · Events · PR · Content',
    description:
      'You step directly onto the ground floor. Shipping production software, directing 4K cinematic aftermovies, sculpting brand systems, and mastering live event execution alongside relentless peers.'
  },
  {
    phase: 'YEAR TWO EXECUTION',
    subPhase: 'Semester 03-04 · The Catalyst Phase',
    headline: 'COMMANDING EASTERN INDIA’S LARGEST ARENAS',
    subhead: 'Flagship Summits & Angel Pitch Battles',
    description:
      'You lead operations for 5,000+ delegate conventions, bridge venture capital sponsorships, pitch live to angel investors, and mentor incoming cohorts. High-stakes execution becomes second nature.'
  },
  {
    phase: 'WHERE YOU SEE YOURSELF',
    subPhase: 'Graduation & Future Frontier',
    headline: 'SCALING VENTURES & INDUSTRY LEADERSHIP',
    subhead: 'Alumni Founders, Tech Pioneers & Global Innovators',
    description:
      'Walking the proven path of Biraja Prasad Rout (Biggies Burger, 130+ stores) and Dr. Abhishek Gautam (Ambula). Whether founding your own venture or leading high-impact products, you command the future with undeniable proof of work.'
  }
];

const S7_YourMove = ({ isActive, sectionIndex = 5 }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { playSuccess, playClick } = useSoundManager();

  const sectionData = DOMINO_SECTIONS.find((s) => s.id === 'your-move') || DOMINO_SECTIONS[sectionIndex] || DOMINO_SECTIONS[5] || {};

  useGSAP(() => {
    if (isActive) {
      playSuccess();

      if (!prefersReducedMotion && containerRef.current) {
        gsap.fromTo(`.${styles.timelineRow}`,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
        );
        gsap.fromTo(`.${styles.thankYouFinale}`,
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.45, ease: 'back.out(1.15)' }
        );
      }
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleRegisterClick = () => {
    playClick();
    const targetUrl = BRAND.registrationUrl || 'https://startup-brawl.vercel.app/';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.section} ref={containerRef} aria-label="Student Journey & Thank You">
      {/* Upper 75% Zone: Header and 4-Point Timeline */}
      <div className={styles.upperZone}>
        {/* Centered Stage Header with 3D Wireframe and Metallic Glow */}
        <StageHeader
          title="FROM STUDENT TO FOUNDER"
          subtitle="Where you are today — and where you will see yourself after joining IEC."
        />

        {/* Vertical Timeline Structure: 4 Points */}
        <div className={styles.timelineContainer}>
          {STUDENT_JOURNEY_STEPS.map((step, idx) => (
            <div key={idx} className={styles.timelineRow}>
              {/* Left Column: Phase / Timing */}
              <div className={styles.timeColumn}>
                <div className={styles.timePhaseText}>{step.phase}</div>
                <div className={styles.timeSubPhaseText}>{step.subPhase}</div>
              </div>

              {/* Center Column: Glowing Node Marker & Vertical Cord */}
              <div className={styles.nodeColumn}>
                <div className={styles.glowingNodeMarker}>
                  <div className={styles.nodeCoreDot} />
                </div>
                {idx < STUDENT_JOURNEY_STEPS.length - 1 && (
                  <div className={styles.verticalCordLine} />
                )}
              </div>

              {/* Right Column: Serif Headline, Subhead, Description */}
              <div className={styles.contentColumn}>
                <h3 className={styles.serifHeadline}>{step.headline}</h3>
                <div className={styles.subheadTag}>{step.subhead}</div>
                <p className={styles.stepDescriptionText}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lower 25% Zone: Grand Thank You Finale */}
      <div className={styles.lowerZone}>
        <div className={styles.thankYouFinale}>
          <div className={styles.thankYouLeft}>
            <span className={styles.lastStageBadge}>
              <span className={styles.pulsingDot} /> WRAP UP
            </span>
            <h1 className={styles.thankYouDisplayTitle}>THANK YOU!</h1>
            <p className={styles.thankYouQuote}>
              "Every great movement begins with a single spark. Your journey starts now."
            </p>
          </div>

          <div className={styles.thankYouRight}>
            <button
              type="button"
              className={styles.joinIecBtn}
              onClick={handleRegisterClick}
              aria-label="Take us to the next part - Startup Brawl"
            >
              <img src="/iec-logo.png" alt="IEC Logo" className={styles.btnIecLogo} />
              <span>TAKE US TO THE NEXT PART →</span>
            </button>
            <span className={styles.registrationHint}>
              Official Innovation & Entrepreneurship Cell · ITER Orientation
            </span>
            {/* Philosophy Domino Chain */}
            <div className={styles.philosophyTrail}>
              {sectionData.philosophy?.map((step, pIdx) => (
                <React.Fragment key={pIdx}>
                  <span className={styles.trailWord}>{step}</span>
                  {pIdx < sectionData.philosophy.length - 1 && (
                    <span className={styles.trailArrow}>→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default S7_YourMove;
