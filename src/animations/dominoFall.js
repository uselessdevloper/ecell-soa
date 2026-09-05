import gsap from 'gsap';

/**
 * Creates a realistic domino fall animation timeline.
 * @param {HTMLElement|string} element - The DOM element to animate.
 * @param {Object} options - Animation options.
 * @param {string} [options.direction='forward'] - Fall direction.
 * @param {Function} [options.onImpact] - Callback triggered when domino hits 85deg.
 * @param {Function} [options.onComplete] - Callback triggered when animation completes.
 * @param {boolean} [options.reducedMotion=false] - If true, uses simple fade instead of complex physics.
 * @returns {gsap.core.Timeline} The GSAP timeline.
 */
export const createDominoFall = (element, options = {}) => {
  const { direction: _direction = 'forward', onImpact, onComplete, reducedMotion = false } = options;
  const tl = gsap.timeline({ onComplete });

  if (reducedMotion) {
    tl.fromTo(
      element,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 20, duration: 0.5, ease: 'power2.inOut' }
    );
    return tl;
  }

  // Wobble phase
  tl.to(element, {
    rotateX: -3,
    duration: 0.1,
    ease: 'power1.inOut',
    transformOrigin: 'bottom center'
  })
  .to(element, {
    rotateX: 2,
    duration: 0.1,
    ease: 'power1.inOut',
    transformOrigin: 'bottom center'
  })
  // Fall phase (gravity acceleration)
  .to(element, {
    rotateX: 85,
    duration: 0.6,
    ease: 'power2.in',
    transformOrigin: 'bottom center',
    boxShadow: '0px 30px 20px rgba(155, 48, 255, 0.4)', // simulate shadow stretching
    onComplete: () => {
      if (typeof onImpact === 'function') onImpact();
    }
  })
  // Impact pulse (slight scale)
  .to(element, {
    scale: 1.02,
    duration: 0.05,
    yoyo: true,
    repeat: 1
  }, "-=0.05")
  // Settle phase with slight bounce
  .to(element, {
    rotateX: 90,
    duration: 0.15,
    ease: 'bounce.out',
    transformOrigin: 'bottom center'
  });

  return tl;
};
