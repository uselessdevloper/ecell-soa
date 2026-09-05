export const ROBOT_STATES = {
  idle: {
    head: { rotation: 0, y: 0, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 },
    leftArm: { rotation: -8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 },
    rightArm: { rotation: 8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 },
    body: { y: 0, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 },
    antenna: { rotation: 4, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 },
    mouthShape: 'normal'
  },
  talking: {
    head: { rotation: 3, y: -2, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 },
    leftArm: { rotation: -26, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 },
    rightArm: { rotation: 16, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 },
    body: { y: -2, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 },
    antenna: { rotation: 8, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 },
    mouthShape: 'talking'
  },
  looking: {
    head: { rotation: -12, y: -4, duration: 0.6, ease: "power2.out" },
    leftArm: { rotation: -16, duration: 0.6, ease: "power2.out" },
    rightArm: { rotation: 10, duration: 0.6, ease: "power2.out" },
    body: { y: -3, duration: 0.6, ease: "power2.out" },
    antenna: { rotation: -15, duration: 0.5, ease: "power2.out" },
    mouthShape: 'normal'
  },
  pointing: {
    head: { rotation: -10, y: -4, duration: 0.5, ease: "power2.out" },
    leftArm: { rotation: -68, duration: 0.5, ease: "back.out(1.4)" },
    rightArm: { rotation: 12, duration: 0.5, ease: "power2.out" },
    body: { y: -4, duration: 0.5, ease: "power2.out" },
    antenna: { rotation: -12, duration: 0.4, ease: "power2.out" },
    mouthShape: 'talking'
  },
  thinking: {
    head: { rotation: -16, y: -8, duration: 0.8, ease: "power2.inOut" },
    leftArm: { rotation: -44, duration: 0.8, ease: "power2.inOut" },
    rightArm: { rotation: 10, duration: 0.8, ease: "power2.inOut" },
    body: { y: 4, duration: 0.8, ease: "power2.inOut" },
    antenna: { rotation: -22, duration: 0.8, ease: "power2.inOut" },
    mouthShape: 'straight'
  },
  excited: {
    head: { rotation: 0, y: -14, duration: 0.25, ease: "power1.inOut", yoyo: true, repeat: -1 },
    leftArm: { rotation: -115, duration: 0.25, ease: "power1.inOut", yoyo: true, repeat: -1 },
    rightArm: { rotation: 115, duration: 0.25, ease: "power1.inOut", yoyo: true, repeat: -1 },
    body: { y: -12, duration: 0.25, ease: "power1.inOut", yoyo: true, repeat: -1 },
    antenna: { rotation: 0, scaleY: 1.4, duration: 0.15, ease: "power1.inOut", yoyo: true, repeat: -1 },
    mouthShape: 'open'
  },
  celebrating: {
    head: { rotation: 8, y: -12, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 },
    leftArm: { rotation: -130, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 },
    rightArm: { rotation: 130, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 },
    body: { y: -10, rotation: 4, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 },
    antenna: { rotation: 20, duration: 0.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
    mouthShape: 'open'
  },
  reacting: {
    head: { rotation: -15, y: 10, scale: 1.1, duration: 0.2, ease: "back.out(2)" },
    leftArm: { rotation: -50, duration: 0.2, ease: "power2.out" },
    rightArm: { rotation: 50, duration: 0.2, ease: "power2.out" },
    body: { y: 8, duration: 0.2, ease: "power2.out" },
    antenna: { rotation: 30, duration: 0.15, ease: "power2.out" },
    mouthShape: 'open'
  }
};
