import gsap from 'gsap';

/**
 * Creates a gentle idle bobbing animation.
 * @param {HTMLElement|string} robotRef - The robot element.
 * @param {Object} options - Animation options.
 * @param {boolean} [options.reducedMotion=false] - Reduced motion.
 * @returns {gsap.core.Timeline}
 */
export const createIdleAnimation = (robotRef, options = {}) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  if (options.reducedMotion) return tl;

  tl.to(robotRef, {
    y: 5,
    duration: 1.5,
    ease: 'sine.inOut'
  });
  return tl;
};

/**
 * Creates a talking animation (mouth pulse, eye glow).
 * @param {HTMLElement|string} robotRef - The robot element.
 * @param {Object} options - Animation options.
 * @returns {gsap.core.Timeline}
 */
export const createTalkingAnimation = (robotRef, options = {}) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  if (options.reducedMotion) {
    tl.to(robotRef, { opacity: 0.9, duration: 0.2 });
    return tl;
  }

  const mouth = gsap.utils.selector(robotRef)('.robot-mouth');
  const eyes = gsap.utils.selector(robotRef)('.robot-eye');

  if (mouth.length) {
    tl.to(mouth, { scaleY: 1.5, duration: 0.2, ease: 'power1.inOut' }, 0);
  }
  if (eyes.length) {
    tl.to(eyes, { filter: 'brightness(1.5)', duration: 0.2, ease: 'power1.inOut' }, 0);
  }
  return tl;
};

/**
 * Creates a pointing animation extending arm toward a direction.
 * @param {HTMLElement|string} robotRef - The robot element.
 * @param {string} direction - 'left', 'right', 'up', 'down'.
 * @param {Object} options - Animation options.
 * @returns {gsap.core.Timeline}
 */
export const createPointingAnimation = (robotRef, direction, options = {}) => {
  const tl = gsap.timeline();
  if (options.reducedMotion) return tl;

  const arm = gsap.utils.selector(robotRef)('.robot-arm');
  if (!arm.length) return tl;

  let x = 0, y = 0, rotate = 0;
  switch (direction) {
    case 'left': x = -20; rotate = -45; break;
    case 'right': x = 20; rotate = 45; break;
    case 'up': y = -20; rotate = -90; break;
    case 'down': y = 20; rotate = 90; break;
  }

  tl.to(arm, {
    x, y, rotate,
    duration: 0.4,
    ease: 'back.out(1.5)'
  });
  return tl;
};

/**
 * Creates an excited bounce animation.
 * @param {HTMLElement|string} robotRef - The robot element.
 * @param {Object} options - Animation options.
 * @returns {gsap.core.Timeline}
 */
export const createExcitedAnimation = (robotRef, options = {}) => {
  const tl = gsap.timeline();
  if (options.reducedMotion) return tl;

  const antenna = gsap.utils.selector(robotRef)('.robot-antenna');

  tl.to(robotRef, { y: -20, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 3 })
    .to(antenna, { rotate: 15, duration: 0.1, yoyo: true, repeat: 7 }, 0);
  return tl;
};

/**
 * Creates a celebrating animation (arms up, sparkle).
 * @param {HTMLElement|string} robotRef - The robot element.
 * @param {Object} options - Animation options.
 * @returns {gsap.core.Timeline}
 */
export const createCelebratingAnimation = (robotRef, options = {}) => {
  const tl = gsap.timeline();
  if (options.reducedMotion) return tl;

  const arms = gsap.utils.selector(robotRef)('.robot-arm');
  const sparkles = gsap.utils.selector(robotRef)('.robot-sparkle');

  if (arms.length) {
    tl.to(arms, { rotate: -120, y: -10, duration: 0.5, ease: 'back.out(2)' }, 0);
  }
  if (sparkles.length) {
    tl.fromTo(sparkles, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.5)' }, 0.2)
      .to(sparkles, { opacity: 0, duration: 0.2, stagger: 0.1 }, "+=0.5");
  }
  return tl;
};

/**
 * Creates a look-at animation where eyes move toward a target position.
 * @param {HTMLElement|string} robotRef - The robot element.
 * @param {Object} targetPosition - {x, y} coordinates to look at.
 * @param {Object} options - Animation options.
 * @returns {gsap.core.Timeline}
 */
export const createLookAtAnimation = (robotRef, targetPosition, options = {}) => {
  const tl = gsap.timeline();
  if (options.reducedMotion) return tl;

  const eyes = gsap.utils.selector(robotRef)('.robot-eye');
  if (!eyes.length) return tl;

  const x = targetPosition.x > window.innerWidth / 2 ? 5 : -5;
  const y = targetPosition.y > window.innerHeight / 2 ? 5 : -5;

  tl.to(eyes, {
    x, y,
    duration: 0.3,
    ease: 'power1.out'
  });
  return tl;
};
