import gsap from 'gsap';
import { createDominoFall } from './dominoFall.js';

/**
 * Creates a sequential chain reaction animation for an array of dominoes.
 * @param {HTMLElement[]|string} elements - Array of domino elements or a selector.
 * @param {Object} options - Animation options.
 * @param {number} [options.stagger=0.15] - Delay between each domino fall.
 * @param {Function} [options.onComplete] - Callback on sequence finish.
 * @param {boolean} [options.reducedMotion=false] - Reduced motion preference.
 * @returns {gsap.core.Timeline} The GSAP master timeline.
 */
export const createChainReaction = (elements, options = {}) => {
  const { stagger = 0.15, onComplete, reducedMotion = false } = options;
  const masterTl = gsap.timeline({ onComplete });
  const nodes = gsap.utils.toArray(elements);

  if (reducedMotion) {
    masterTl.to(nodes, {
      opacity: 0,
      y: 20,
      stagger: stagger,
      duration: 0.5,
      ease: 'power2.inOut'
    });
    return masterTl;
  }

  nodes.forEach((el, index) => {
    const fallTl = createDominoFall(el, {
      reducedMotion,
      onImpact: () => {
        // Trigger impact particles or similar effects here
      }
    });

    // Add to master timeline with stagger overlap
    masterTl.add(fallTl, index * stagger);
  });

  return masterTl;
};
