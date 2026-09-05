import gsap from 'gsap';

/**
 * Animates a virtual camera transition between sections.
 * @param {HTMLElement|string} container - The main scroll/viewport container.
 * @param {HTMLElement|string} fromSection - The section leaving the view.
 * @param {HTMLElement|string} toSection - The section entering the view.
 * @param {string} direction - 'forward' or 'backward'.
 * @param {Object} options - Animation options.
 * @param {boolean} [options.reducedMotion=false] - Reduced motion preference.
 * @returns {gsap.core.Timeline} The GSAP timeline.
 */
export const createCameraTransition = (container, fromSection, toSection, direction = 'forward', options = {}) => {
  const { reducedMotion = false } = options;
  const tl = gsap.timeline();

  if (reducedMotion) {
    tl.to(fromSection, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })
      .set(fromSection, { display: 'none' })
      .set(toSection, { display: 'block', opacity: 0 })
      .to(toSection, { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
    return tl;
  }

  // Calculate slide directions
  const isForward = direction === 'forward';
  const outX = isForward ? '-50%' : '50%';
  const outY = isForward ? '-20%' : '20%';
  const inX = isForward ? '50%' : '-50%';
  const inY = isForward ? '20%' : '-20%';

  // Set up new section before animating
  tl.set(toSection, { display: 'block', x: inX, y: inY, opacity: 0 })
    
  // Animate out current section
  .to(fromSection, {
    x: outX,
    y: outY,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.inOut'
  }, 0)
  
  // Parallax background effect (if a background element exists in container)
  .to(container, {
    backgroundPosition: isForward ? '10% 50%' : '-10% 50%',
    duration: 1.2,
    ease: 'power3.inOut'
  }, 0)
  
  // Animate in new section
  .to(toSection, {
    x: '0%',
    y: '0%',
    opacity: 1,
    duration: 1.2,
    ease: 'power3.inOut'
  }, 0)
  
  // Hide old section after completion
  .set(fromSection, { display: 'none' });

  return tl;
};
