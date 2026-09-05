import { useEffect, useRef, useCallback } from 'react';
import { useDomino } from '../context/DominoContext';

/**
 * Procedural Web Audio engine for zero-latency, reliable sound effects
 * without external asset dependencies.
 */
export const useSoundManager = () => {
  const { soundEnabled } = useDomino();
  const audioCtxRef = useRef(null);

  // Initialize or resume AudioContext safely
  const getContext = useCallback(() => {
    if (!soundEnabled) return null;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, [soundEnabled]);

  // Clean up
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  /**
   * 3D Ball Melody Cascade Synthesizer:
   * Plays a tuned chime/bell note with rich harmonics and resonant decay
   * tuned to a pentatonic scale (C4, D4, E4, G4, A4, C5, E5)
   */
  const playMelodyCascade = useCallback((stepIndex = 0) => {
    const ctx = getContext();
    if (!ctx) return;

    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
    const baseFreq = scale[stepIndex % scale.length];
    const now = ctx.currentTime;

    // 1. Crystal Fundamental Bell Tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, now);

    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.9);

    // 2. Harmonic Upper Chime (Shimmer overtone)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 2.01, now);

    gain2.gain.setValueAtTime(0.14, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.6);

    // 3. Tactile Contact Tap
    const tapOsc = ctx.createOscillator();
    const tapGain = ctx.createGain();
    tapOsc.type = 'triangle';
    tapOsc.frequency.setValueAtTime(baseFreq * 3, now);
    tapOsc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

    tapGain.gain.setValueAtTime(0.2, now);
    tapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    tapOsc.connect(tapGain);
    tapGain.connect(ctx.destination);
    tapOsc.start(now);
    tapOsc.stop(now + 0.07);
  }, [getContext]);

  /**
   * Domino physical impact sound layered with resonant bell tone
   */
  const playImpact = useCallback((pitchScale = 1.0, stepIndex = 0) => {
    const ctx = getContext();
    if (!ctx) return;

    // Trigger melodic harmonic
    playMelodyCascade(stepIndex);

    const now = ctx.currentTime;

    // Transient click (burst)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420 * pitchScale, now);
    osc.frequency.exponentialRampToValueAtTime(80 * pitchScale, now + 0.08);

    oscGain.gain.setValueAtTime(0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);

    // Deep resonance thump
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140 * pitchScale, now);
    subOsc.frequency.exponentialRampToValueAtTime(35 * pitchScale, now + 0.18);

    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.22);
  }, [getContext, playMelodyCascade]);

  /**
   * Chain reaction acceleration: rapid sequence of melodic cascading steps
   */
  const playChainReaction = useCallback((count = 4) => {
    const ctx = getContext();
    if (!ctx) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        playMelodyCascade(i);
      }, i * 130);
    }
  }, [getContext, playMelodyCascade]);

  /**
   * Tactile UI click
   */
  const playClick = useCallback(() => {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }, [getContext]);

  /**
   * Camera & Domino transition whoosh
   */
  const playWhoosh = useCallback(() => {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.3);
    filter.Q.setValueAtTime(3, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.32);
  }, [getContext]);

  /**
   * Robot electronic vocal chirp
   */
  const playRobotChirp = useCallback(() => {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.setValueAtTime(880, now + 0.04);
    osc.frequency.setValueAtTime(1170, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }, [getContext]);

  /**
   * Climax / Celebration ethereal chime
   */
  const playSuccess = useCallback(() => {
    const ctx = getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C-E-G-C
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      }, i * 90);
    });
  }, [getContext]);

  return {
    playImpact,
    playMelodyCascade,
    playChainReaction,
    playClick,
    playWhoosh,
    playRobotChirp,
    playSuccess,
    isReady: true
  };
};

export default useSoundManager;
