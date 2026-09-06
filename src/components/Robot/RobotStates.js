export const ROBOT_STATES = {
  idle: {
    head: { rotation: 0, rotationY: 0, rotationX: 0, x: 0, y: 0, scale: 1, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
    earGlow: 0.8,
    mouthShape: 'normal',
    laserVisible: false
  },
  talking: {
    head: { rotation: 3, rotationY: -4, rotationX: -2, x: -2, y: -4, scale: 1.02, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 },
    earGlow: 1.2,
    mouthShape: 'talking',
    laserVisible: false
  },
  looking: {
    head: { rotation: -8, rotationY: -15, rotationX: 2, x: -8, y: -2, scale: 1, duration: 0.6, ease: "power2.out" },
    earGlow: 0.9,
    mouthShape: 'normal',
    laserVisible: false
  },
  pointing: {
    head: { rotation: -12, rotationY: -20, rotationX: 4, x: -16, y: -4, scale: 1.03, duration: 0.55, ease: "back.out(1.4)" },
    earGlow: 1.3,
    mouthShape: 'talking',
    laserVisible: true
  },
  thinking: {
    head: { rotation: 6, rotationY: 12, rotationX: -8, x: 4, y: -8, scale: 0.98, duration: 0.8, ease: "power2.inOut" },
    earGlow: 0.6,
    mouthShape: 'straight',
    laserVisible: false
  },
  excited: {
    head: { rotation: 0, rotationY: 0, rotationX: -4, x: 0, y: -16, scale: 1.06, duration: 0.22, ease: "power1.inOut", yoyo: true, repeat: -1 },
    earGlow: 1.5,
    mouthShape: 'open',
    laserVisible: false
  },
  celebrating: {
    head: { rotation: 6, rotationY: 8, rotationX: -6, x: 0, y: -14, scale: 1.08, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 },
    earGlow: 1.6,
    mouthShape: 'open',
    laserVisible: false
  },
  reacting: {
    head: { rotation: -6, rotationY: -8, rotationX: 6, x: -6, y: 8, scale: 1.04, duration: 0.2, ease: "back.out(2)" },
    earGlow: 1.4,
    mouthShape: 'open',
    laserVisible: false
  }
};

