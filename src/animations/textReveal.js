import gsap from 'gsap';

/**
 * Splits text and reveals it with a staggered 3D effect.
 * Note: Assumes element text content is appropriately wrapped in spans for characters or words.
 * @param {HTMLElement|string} element - The DOM element or selector containing text.
 * @param {Object} options - Animation options.
 * @param {boolean} [options.reducedMotion=false] - Reduced motion preference.
 * @returns {gsap.core.Timeline} The GSAP timeline.
 */
export const splitAndReveal = (element, options = {}) => {
  const { reducedMotion = false } = options;
  const tl = gsap.timeline();

  // Targets elements or children if it's a wrapper of pre-split items
  const targets = gsap.utils.toArray(element).flatMap(el => el.children.length ? Array.from(el.children) : el);

  if (reducedMotion) {
    tl.fromTo(targets,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out' }
    );
    return tl;
  }

  tl.fromTo(targets,
    { y: 40, opacity: 0, rotateX: -20 },
    { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.7)' }
  );

  return tl;
};

/**
 * Reveals a single line with a slide-up animation.
 * @param {HTMLElement|string} element - The DOM element or selector.
 * @param {Object} options - Animation options.
 * @param {boolean} [options.reducedMotion=false] - Reduced motion preference.
 * @returns {gsap.core.Timeline} The GSAP timeline.
 */
export const revealLine = (element, options = {}) => {
  const { reducedMotion = false } = options;
  const tl = gsap.timeline();

  if (reducedMotion) {
    tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    return tl;
  }

  tl.fromTo(element,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }
  );

  return tl;
};

/**
 * Simple fade-in with upward motion.
 * @param {HTMLElement|string} element - The DOM element or selector.
 * @param {number} delay - Delay before animation starts.
 * @param {Object} options - Animation options.
 * @param {boolean} [options.reducedMotion=false] - Reduced motion preference.
 * @returns {gsap.core.Timeline} The GSAP timeline.
 */
export const fadeInUp = (element, delay = 0, options = {}) => {
  const { reducedMotion = false } = options;
  const tl = gsap.timeline({ delay });

  if (reducedMotion) {
    tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    return tl;
  }

  tl.fromTo(element,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
  );

  return tl;
};
