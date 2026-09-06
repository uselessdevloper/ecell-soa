import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './PoppingBubbles.module.css';
import useSoundManager from '../../hooks/useSoundManager';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const BUBBLE_CONFIGS = [
  {
    id: 0,
    label: '01',
    name: 'WHO WE ARE',
    color: '#00f0ff',
    colorSecondary: '#ff2aa6',
    glow: 'rgba(0, 240, 255, 0.55)',
    size: 78,
    x: '16%',
    y: '26%',
    floatDur: 3.6
  },
  {
    id: 1,
    label: '02',
    name: 'WHAT WE DO',
    color: '#00ff88',
    colorSecondary: '#00f0ff',
    glow: 'rgba(0, 255, 136, 0.55)',
    size: 74,
    x: '82%',
    y: '22%',
    floatDur: 3.8
  },
  {
    id: 2,
    label: '03',
    name: 'EVENTS',
    color: '#ffb800',
    colorSecondary: '#ff2aa6',
    glow: 'rgba(255, 184, 0, 0.55)',
    size: 82,
    x: '18%',
    y: '72%',
    floatDur: 3.4
  },
  {
    id: 3,
    label: '04',
    name: 'TEAMS',
    color: '#ff007f',
    colorSecondary: '#ff52a5',
    glow: 'rgba(255, 0, 127, 0.55)',
    size: 70,
    x: '84%',
    y: '68%',
    floatDur: 4.0
  },
  {
    id: 4,
    label: '05',
    name: 'FOUNDERS',
    color: '#2979ff',
    colorSecondary: '#75a7ff',
    glow: 'rgba(41, 121, 255, 0.55)',
    size: 76,
    x: '34%',
    y: '82%',
    floatDur: 3.5
  },
  {
    id: 5,
    label: '06',
    name: 'YOUR MOVE',
    color: '#d08fff',
    colorSecondary: '#00f0ff',
    glow: 'rgba(208, 143, 255, 0.65)',
    size: 84,
    x: '68%',
    y: '80%',
    floatDur: 3.7
  }
];

const PoppingBubbles = ({ 
  activeStage = 0, 
  onBubblePop,
  onGoHome,
  showBackgroundOrbs = true
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bubbleRefs = useRef([]);
  const particlesRef = useRef([]);
  const shardsRef = useRef([]);
  const ringsRef = useRef([]);
  const animFrameRef = useRef(null);

  const { playBubblePop } = useSoundManager();
  const prefersReducedMotion = useReducedMotion();

  // Canvas resize listener
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous Canvas Physics Animation Loop for Bursting Membrane & Droplets
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render & Update Expanding Shockwave Rings
      for (let i = ringsRef.current.length - 1; i >= 0; i--) {
        const ring = ringsRef.current[i];
        ring.radius += (ring.maxRadius - ring.radius) * 0.18;
        ring.alpha *= 0.88;

        if (ring.alpha > 0.02) {
          ctx.save();
          ctx.globalAlpha = ring.alpha;
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = ring.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        } else {
          ringsRef.current.splice(i, 1);
        }
      }

      // 2. Render & Update Tearing Membrane Shards (Frames 3-6 of reference)
      for (let i = shardsRef.current.length - 1; i >= 0; i--) {
        const s = shardsRef.current[i];
        s.progress += s.speed;

        if (s.progress < 1) {
          const alpha = (1 - s.progress) * 0.95;
          ctx.save();
          ctx.globalAlpha = Math.max(0, alpha);

          const curRadius = s.radius * (1 - s.progress * 0.45);
          const midAngle = (s.startAngle + s.endAngle) / 2;
          const tearStart = s.startAngle + (midAngle - s.startAngle) * s.progress;
          const tearEnd = s.endAngle - (s.endAngle - midAngle) * s.progress;

          const grad = ctx.createLinearGradient(
            s.x - s.radius, s.y - s.radius,
            s.x + s.radius, s.y + s.radius
          );
          grad.addColorStop(0, s.color1);
          grad.addColorStop(0.5, '#ffffff');
          grad.addColorStop(1, s.color2);

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, 3.5 * (1 - s.progress));
          ctx.shadowColor = s.color1;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(
            s.x + Math.cos(midAngle) * s.progress * 18,
            s.y + Math.sin(midAngle) * s.progress * 18,
            curRadius,
            tearStart,
            tearEnd
          );
          ctx.stroke();
          ctx.restore();
        } else {
          shardsRef.current.splice(i, 1);
        }
      }

      // 3. Render & Update Sparkling Droplet Mist Cloud (Frames 4-8 of reference)
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94; // air friction drag
        p.vy *= 0.94;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.sparkle ? 8 : 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          particlesRef.current.splice(i, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Floating ambient animation for each bubble
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tweens = [];
    bubbleRefs.current.forEach((el, index) => {
      if (!el) return;
      const config = BUBBLE_CONFIGS[index];
      const tween = gsap.to(el, {
        y: -14,
        x: Math.sin(index) * 8,
        duration: config.floatDur,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.2
      });
      tweens.push(tween);
    });

    return () => tweens.forEach(t => t.kill());
  }, [prefersReducedMotion]);

  // Execute authentic soap bubble pop physics matching the reference sequence
  const handlePop = useCallback((index, e) => {
    if (e) e.stopPropagation();

    // Trigger synthetic audio
    playBubblePop(index);

    const config = BUBBLE_CONFIGS[index];
    const el = bubbleRefs.current[index];

    const rect = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 70, height: 70 };
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;

    // 1. Frame 2: Instant bubble deformation / indentation before burst
    if (el && !prefersReducedMotion) {
      gsap.timeline()
        .to(el, { scaleX: 1.15, scaleY: 0.9, rotate: 4, duration: 0.05, ease: 'power1.in' })
        .to(el, { scale: 0, opacity: 0, duration: 0.08, ease: 'power3.in' })
        .to(el, { scale: 1, opacity: 1, duration: 0.6, delay: 0.45, ease: 'back.out(1.4)' });
    }

    // 2. Frames 3-6: Spawn Tearing Iridescent Membrane Shards
    const shardCount = 5;
    for (let i = 0; i < shardCount; i++) {
      const startAngle = (i / shardCount) * Math.PI * 2 + (Math.random() * 0.3);
      const endAngle = startAngle + (Math.PI * 2 / shardCount) * 0.85;
      shardsRef.current.push({
        x: centerX,
        y: centerY,
        radius: radius * 1.05,
        startAngle,
        endAngle,
        color1: config.color,
        color2: config.colorSecondary,
        progress: 0,
        speed: 0.065 + Math.random() * 0.04
      });
    }

    // 3. Frames 4-8: Spawn 45+ Sparkling Droplet Mist Micro-particles
    const particleCount = 48;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 9;
      const colors = ['#ffffff', config.color, config.colorSecondary, '#d8f4ff'];
      particlesRef.current.push({
        x: centerX + Math.cos(angle) * (radius * 0.4),
        y: centerY + Math.sin(angle) * (radius * 0.4),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 0.8 + Math.random() * 2.8,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.035,
        color: colors[Math.floor(Math.random() * colors.length)],
        sparkle: Math.random() > 0.35
      });
    }

    // 4. Expanding Shockwave Ripple
    ringsRef.current.push({
      x: centerX,
      y: centerY,
      radius: radius * 0.6,
      maxRadius: radius * 2.2,
      color: config.color,
      alpha: 0.85
    });

    // Call stage transition callback
    if (onBubblePop) {
      onBubblePop(index);
    }
  }, [playBubblePop, onBubblePop, prefersReducedMotion]);

  return (
    <>
      {/* Canvas Layer for High-Performance Membrane Shards & Droplet Mist */}
      <canvas ref={canvasRef} className={styles.burstCanvas} aria-hidden="true" />

      {/* Top HUD Stage Orbs Bar */}
      <div className={styles.floatingHudBar} role="navigation" aria-label="Quick Level Jumper">
        {BUBBLE_CONFIGS.map((cfg) => (
          <button
            key={cfg.id}
            type="button"
            className={`${styles.hudOrbBtn} ${activeStage === cfg.id ? styles.hudOrbActive : ''}`}
            style={{
              '--orb-color': cfg.color,
              '--orb-glow': cfg.glow
            }}
            onClick={() => handlePop(cfg.id)}
            title={`Stage ${cfg.label}: ${cfg.name}`}
            aria-label={`Jump to Stage ${cfg.label}: ${cfg.name}`}
          >
            {cfg.label}
          </button>
        ))}
      </div>

      {/* Floating 3D Iridescent Background Bubbles */}
      {showBackgroundOrbs && (
        <div ref={containerRef} className={styles.bubblesContainer} aria-hidden="true">
          {BUBBLE_CONFIGS.map((cfg, idx) => (
            <div
              key={cfg.id}
              ref={el => bubbleRefs.current[idx] = el}
              className={styles.bubbleItem}
              style={{
                left: cfg.x,
                top: cfg.y,
                width: `${cfg.size}px`,
                height: `${cfg.size}px`,
                '--bubble-color': cfg.color,
                '--bubble-glow': cfg.glow,
                opacity: activeStage === cfg.id ? 0.98 : 0.6
              }}
              onClick={(e) => handlePop(cfg.id, e)}
            >
              <div className={styles.bubbleSphere}>
                <div className={styles.specularGlint} />
                <div className={styles.specularSecondary} />
                <span className={styles.bubbleLabel}>{cfg.label}</span>
                <span className={styles.stageName}>{cfg.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PoppingBubbles;
