import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to synthesize Sparky's robot voice via Web Speech API.
 * Provides pitch/rate tuning, voice selection, queue cancellation, and speaking state.
 */
export const useRobotVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voicesRef = useRef([]);
  const keepAliveIntervalRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  // Check browser support and load available speech voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
      setIsSupported(true);

      const updateVoices = () => {
        try {
          const available = window.speechSynthesis.getVoices() || [];
          if (available.length > 0) {
            voicesRef.current = available;
          }
        } catch {
          // ignore
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
        keepAliveIntervalRef.current = null;
      }
    };
  }, []);

  // Stop current speech
  const stop = useCallback(() => {
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    currentUtteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  // Speak dialogue text
  const speak = useCallback((text) => {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Cancel previous ongoing utterance immediately so utterances don't stack
    stop();

    try {
      const cleanText = String(text).trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      currentUtteranceRef.current = utterance;

      // Select optimal voice: prefer natural English voices
      const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v => 
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')) &&
          v.lang.startsWith('en')
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      // Tuned for a friendly, energetic, robotic cadence
      utterance.pitch = 1.18; // slightly higher friendly robotic pitch
      utterance.rate = 1.03;  // crisp articulation
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);

        // Chrome long-speech pause workaround: ping resume every 8 seconds if still speaking
        if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
        keepAliveIntervalRef.current = setInterval(() => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          } else {
            clearInterval(keepAliveIntervalRef.current);
            keepAliveIntervalRef.current = null;
          }
        }, 8000);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (keepAliveIntervalRef.current) {
          clearInterval(keepAliveIntervalRef.current);
          keepAliveIntervalRef.current = null;
        }
        currentUtteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        // Ignore interrupted or canceled errors
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Speech synthesis notice:', e.error);
        }
        setIsSpeaking(false);
        if (keepAliveIntervalRef.current) {
          clearInterval(keepAliveIntervalRef.current);
          keepAliveIntervalRef.current = null;
        }
        currentUtteranceRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Could not speak robot voice:', err);
      setIsSpeaking(false);
    }
  }, [stop]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported
  };
};

export default useRobotVoice;
