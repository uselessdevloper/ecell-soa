import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDomino } from '../context/DominoContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import useSoundManager from '../hooks/useSoundManager';
import styles from './S2_WhoWeAre.module.css';
import StageHeader from '../components/UI/StageHeader';

const METRICS = [
  { value: '80+',  label: 'MEMBERS',  color: '#00f0ff' },
  { value: '250+', label: 'ALUMNIES', color: '#c084fc' },
  { value: '5+',   label: 'STARTUPS', color: '#ffb800' },
  { value: '10+',  label: 'EVENTS / YEAR', color: '#f43f5e' },
];

const S2_WhoWeAre = ({ isActive, sectionIndex = 0 }) => {
  const containerRef = useRef(null);
  const { triggerDomino, setRobotState, setRobotDialogue } = useDomino();
  const { playWhoosh } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (isActive && !prefersReducedMotion && containerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(`.${styles.leftCol}`, { x: -40, opacity: 0, duration: 0.8 })
        .from(`.${styles.photoFrame}`, { x: 40, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(`.${styles.metricItem}`, {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.5
        }, '-=0.4');
    }
  }, { dependencies: [isActive, prefersReducedMotion], scope: containerRef });

  const handleAdvance = () => {
    playWhoosh();
    triggerDomino(sectionIndex);
    setRobotDialogue("That's us — IEC-SOA! One of ITER's most dynamic student clubs, driving entrepreneurship from campus to the real world.");
    setRobotState('excited');
  };

  return (
    <section className={styles.container} ref={containerRef} aria-label="Who We Are">
      {/* Ambient glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <StageHeader
        title="WHO WE ARE"
        subtitle='"A Team That Builds Tomorrow"'
      />

      <div className={styles.splitLayout}>
        {/* Left — Statement copy */}
        <div className={styles.leftCol}>
          <p className={styles.overline}>EST. AT ITER · SOA UNIVERSITY</p>

          <h2 className={styles.statement}>
            Nurturing the next generation of&nbsp;
            <span className={styles.accentWord}>founders</span>,&nbsp;
            <span className={styles.accentWord2}>builders</span>&nbsp;&amp;&nbsp;
            <span className={styles.accentWord3}>innovators</span>.
          </h2>

          <p className={styles.bodyText}>
            At IEC-SOA, we turn student ambition into impactful ventures.
            Through hands-on workshops, keynote speaker sessions, and competitive
            pitch arenas, we build Eastern India’s premier innovation ecosystem.
          </p>

          <button
            className={styles.advanceBtn}
            onClick={handleAdvance}
            aria-label="Continue to next section"
          >
            EXPLORE WHAT WE DO →
          </button>
        </div>

        {/* Right — Clean photo with modern treatment */}
        <div className={styles.rightCol}>
          <div className={styles.photoFrame}>
            <img
              src="/who-we-are.jpg"
              alt="IEC-SOA team at ITER"
              className={styles.photo}
            />
            <div className={styles.photoOverlay} />
            <div className={styles.photoCornerTL} />
            <div className={styles.photoCornerBR} />
          </div>
        </div>
      </div>

      {/* Metrics bar */}
      <div className={styles.metricsBar}>
        {METRICS.map((m) => (
          <div key={m.label} className={styles.metricItem}>
            <span className={styles.metricValue} style={{ color: m.color, textShadow: `0 0 20px ${m.color}80` }}>
              {m.value}
            </span>
            <span className={styles.metricLabel}>{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default S2_WhoWeAre;

