import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ParticleCanvas = ({ burstTrigger = null, activeColor = '#9b30ff', activeColorSecondary = '#ffd700' }) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Chromatic palette inspired by 3D Ball Melody
    const palette = ['#a832ff', '#00f0ff', '#00ff88', '#ffb800', '#ff007f', '#2979ff', '#ffd700'];

    // Ambient floating luminous particles
    const particleCount = prefersReducedMotion ? 15 : (window.innerWidth < 768 ? 35 : 75);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.9,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45,
      opacity: Math.random() * 0.5 + 0.25,
      color: palette[Math.floor(Math.random() * palette.length)]
    }));

    // Dynamic impact bursts & expanding neon shockwave rings
    const bursts = [];
    const shockwaves = [];

    const addBurst = (originX, originY) => {
      // 1. Expanding neon shockwave rings
      shockwaves.push({
        x: originX,
        y: originY,
        radius: 10,
        maxRadius: Math.min(width, height) * 0.38,
        lineWidth: 4,
        alpha: 0.95,
        color: activeColor || '#00f0ff'
      });

      shockwaves.push({
        x: originX,
        y: originY,
        radius: 4,
        maxRadius: Math.min(width, height) * 0.26,
        lineWidth: 2.5,
        alpha: 0.85,
        color: activeColorSecondary || '#ffffff'
      });

      // 2. High-speed spark embers
      const count = prefersReducedMotion ? 10 : 42;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 7 + 2.5;
        bursts.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1.0,
          decay: Math.random() * 0.02 + 0.014,
          size: Math.random() * 3.5 + 1.5,
          color: Math.random() > 0.35 ? activeColor : (activeColorSecondary || '#ffd700')
        });
      }
    };

    if (burstTrigger) {
      addBurst(width * 0.42, height * 0.52);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render ambient particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Slight parallax pull from mouse
        const dx = (mouseRef.current.x - width / 2) * 0.0005;
        const dy = (mouseRef.current.y - height / 2) * 0.0005;
        p.x += dx;
        p.y += dy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      // Render expanding neon shockwave rings
      for (let j = shockwaves.length - 1; j >= 0; j--) {
        const sw = shockwaves[j];
        sw.radius += 5.5;
        sw.alpha -= 0.022;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(j, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.lineWidth;
        ctx.globalAlpha = sw.alpha;
        ctx.shadowBlur = 18;
        ctx.shadowColor = sw.color;
        ctx.stroke();
        ctx.restore();
      }

      // Render bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.12; // gravity
        b.life -= b.decay;

        if (b.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * b.life, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.life * 0.8;
        ctx.shadowBlur = 14;
        ctx.shadowColor = b.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, burstTrigger, activeColor, activeColorSecondary]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.85
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleCanvas;
