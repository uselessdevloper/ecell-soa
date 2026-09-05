import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const StaggerText = ({ text, delay = 0, trigger = true, className = '' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!trigger) return;
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set(containerRef.current.children, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      containerRef.current.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
        delay: delay
      }
    );
  }, [trigger, delay]);

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {words.map((word, index) => (
        <span 
          key={index} 
          style={{ display: 'inline-block', opacity: 0, paddingRight: '0.25em' }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default StaggerText;
