import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * 3D Interactive Scrolling Starfield & Constellation Network
 * Inspired by https://www.bari.asia (Image 1)
 *
 * Features:
 * - Hundreds of glowing particles in 3D depth with parallax (white, soft violet, bright purple)
 * - Inertial scroll-velocity acceleration: when user scrolls or wheels, particles stream with 3D depth
 * - Organic floating Brownian noise & gentle twinkling when idle
 * - Interactive mouse/cursor parallax depth
 * - Faint ethereal constellation links between nearby stars
 */
const FrontPageStarfield = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollVelocityRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tilt tracking
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll wheel & trackpad velocity tracking (bari.asia effect)
    const handleWheel = (e) => {
      const delta = Math.max(-40, Math.min(40, e.deltaY));
      scrollVelocityRef.current += delta * 0.12;
      // Cap maximum velocity for smoothness
      scrollVelocityRef.current = Math.max(-28, Math.min(28, scrollVelocityRef.current));
      lastScrollTimeRef.current = Date.now();
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Touch swipe velocity tracking for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;
      scrollVelocityRef.current += delta * 0.08;
      scrollVelocityRef.current = Math.max(-25, Math.min(25, scrollVelocityRef.current));
      touchStartY = currentY;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Palette strictly matching our brand identity: Pure White, Soft Lavender, Royal Purple, Electric Violet
    const STAR_COLORS = [
      { r: 255, g: 255, b: 255 }, // Crisp White
      { r: 245, g: 240, b: 255 }, // Ethereal White
      { r: 216, g: 180, b: 254 }, // Soft Lavender (#d8b4fe)
      { r: 192, g: 132, b: 252 }, // Neon Violet (#c084fc)
      { r: 168, g: 85, b: 247 },  // Royal Purple (#a855f7)
      { r: 232, g: 121, b: 249 }  // Magenta Sheen (#e879f9)
    ];

    const count = prefersReducedMotion 
      ? 45 
      : (window.innerWidth < 768 ? 85 : 185);

    // Initialize 3D particles with z-depth
    const stars = Array.from({ length: count }, () => {
      const z = Math.random() * 0.9 + 0.15; // 0.15 (far) to 1.05 (near)
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (Math.random() * 1.8 + 0.6) * z,
        baseAlpha: Math.random() * 0.6 + 0.35,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.3 * z,
        driftY: (Math.random() * -0.35 - 0.1) * z, // Gentle upward drift
        color,
        hasGlow: z > 0.65 && Math.random() > 0.4
      };
    });

    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min(32, time - lastTime) / 16.666;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08 * dt;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08 * dt;

      // Decay scroll velocity smoothly back to idle drift
      scrollVelocityRef.current *= Math.pow(0.92, dt);
      if (Math.abs(scrollVelocityRef.current) < 0.01) {
        scrollVelocityRef.current = 0;
      }

      const vel = scrollVelocityRef.current;

      // 1. Draw subtle constellation connections between nearby close stars
      if (!prefersReducedMotion && width > 768) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < stars.length; i += 3) {
          const s1 = stars[i];
          if (s1.z < 0.45) continue; // Only mid and foreground stars connect

          for (let j = i + 1; j < Math.min(stars.length, i + 12); j++) {
            const s2 = stars[j];
            if (s2.z < 0.45) continue;

            const dx = s1.x - s2.x;
            const dy = s1.y - s2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 85) {
              const alpha = (1 - dist / 85) * 0.14 * Math.min(s1.baseAlpha, s2.baseAlpha);
              ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(s1.x + mouseRef.current.x * s1.z, s1.y + mouseRef.current.y * s1.z);
              ctx.lineTo(s2.x + mouseRef.current.x * s2.z, s2.y + mouseRef.current.y * s2.z);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Render each star with depth, twinkle, and scroll velocity streaming
      stars.forEach((s) => {
        // Advance twinkle
        s.twinklePhase += s.twinkleSpeed * dt;
        const currentAlpha = Math.max(0.1, Math.min(1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.25));

        // Advance position with ambient drift + 3D parallax scroll response
        s.x += (s.driftX + mouseRef.current.x * 0.02 * s.z) * dt;
        // Scroll velocity pushes stars along the Y axis with parallax (near stars move much faster)
        s.y += (s.driftY - vel * s.z * 1.8) * dt;

        // Wrap around canvas edges seamlessly
        if (s.y < -20) {
          s.y = height + 10;
          s.x = Math.random() * width;
        } else if (s.y > height + 20) {
          s.y = -10;
          s.x = Math.random() * width;
        }

        if (s.x < -20) s.x = width + 10;
        if (s.x > width + 20) s.x = -10;

        const posX = s.x + mouseRef.current.x * s.z;
        const posY = s.y + mouseRef.current.y * s.z;

        // If high velocity, render a slight motion trail along the scroll axis (bari.asia warp effect)
        if (Math.abs(vel) > 3 && !prefersReducedMotion) {
          const trailLength = Math.min(18, Math.abs(vel) * s.z * 0.85);
          const trailDir = vel > 0 ? -1 : 1;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha * 0.75})`;
          ctx.lineWidth = s.radius * 1.2;
          ctx.lineCap = 'round';
          ctx.moveTo(posX, posY);
          ctx.lineTo(posX, posY + trailDir * trailLength);
          ctx.stroke();
        } else {
          // Standard soft glowing star dot
          // Bokeh halo for prominent near stars
          if (s.hasGlow) {
            ctx.beginPath();
            ctx.arc(posX, posY, s.radius * 3.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha * 0.18})`;
            ctx.fill();
          }

          // Sharp bright core
          ctx.beginPath();
          ctx.arc(posX, posY, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${currentAlpha})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
      aria-hidden="true"
    />
  );
};

export default FrontPageStarfield;
