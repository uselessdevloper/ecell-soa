import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { DOMINO_SECTIONS } from '../data/content';

const DominoContext = createContext();

export const DominoProvider = ({ children }) => {
  // -1 represents the Front Page Hero; 0 to 5 are the 6 Domino Stages
  const [currentDomino, setCurrentDomino] = useState(-1);
  const [dominoStates, setDominoStates] = useState(
    Array(6).fill('standing')
  );
  const [direction, setDirection] = useState('forward');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(null);
  
  // Robot guide state
  const [robotState, setRobotState] = useState('idle');
  const [robotDialogue, setRobotDialogue] = useState(
    "Welcome to IEC-SOA! Click my avatar anytime for a guided walkthrough of our innovation ecosystem."
  );

  // Update robot dialogue and state when section changes
  useEffect(() => {
    if (currentDomino === -1) {
      setRobotState('idle');
      setRobotDialogue("Welcome to IEC-SOA! Click my avatar anytime for a guided walkthrough of our innovation ecosystem.");
      return;
    }

    const sec = DOMINO_SECTIONS[currentDomino];
    if (sec) {
      setRobotState(sec.robotState || 'idle');
      const fullText = Array.isArray(sec.robotDialogues) ? sec.robotDialogues.join(' ') : (sec.robotDialogues || "");
      setRobotDialogue(fullText);
    }
  }, [currentDomino]);

  /**
   * Directly navigate to a specific section (-1 for Front Page, 0-5 for stages).
   */
  const goToSection = useCallback((index) => {
    if (isTransitioning || index < -1 || index > 5) return;
    setDirection(index >= currentDomino ? 'forward' : 'backward');
    setDominoStates(Array(6).fill('standing'));
    setCurrentDomino(index);
    setIsTransitioning(false);
  }, [currentDomino, isTransitioning]);

  /**
   * Domino topple trigger: physical fall, robot reaction, impact spark, then move to next.
   */
  const triggerDomino = useCallback((index) => {
    if (isTransitioning) return;

    if (index === -1) {
      goToSection(0);
      return;
    }

    setIsTransitioning(true);
    setDirection('forward');

    // 1. Domino initiates kinetic click pulse
    setDominoStates((prev) => {
      const copy = [...prev];
      if (index >= 0 && index < 6) {
        copy[index] = 'falling';
      }
      return copy;
    });

    // 2. Robot companion reacts
    setRobotState('excited');

    // 3. Supersonic neon shockwaves & kinetic sparks
    setTimeout(() => {
      setBurstTrigger(Date.now());
    }, 120);

    // 4. Smooth milestone transition to next section (~450ms)
    setTimeout(() => {
      setDominoStates(Array(6).fill('standing'));

      if (index < 5) {
        setCurrentDomino(index + 1);
      }
      setIsTransitioning(false);
    }, 450);
  }, [isTransitioning, goToSection]);

  const nextSection = useCallback(() => {
    if (isTransitioning) return;
    if (currentDomino === -1) {
      goToSection(0);
    } else if (currentDomino < 5) {
      triggerDomino(currentDomino);
    }
  }, [currentDomino, isTransitioning, triggerDomino, goToSection]);

  const prevSection = useCallback(() => {
    if (isTransitioning) return;
    if (currentDomino > 0) {
      setDominoStates((prev) => {
        const copy = [...prev];
        copy[currentDomino - 1] = 'standing';
        return copy;
      });
      goToSection(currentDomino - 1);
    } else if (currentDomino === 0) {
      goToSection(-1);
    }
  }, [currentDomino, isTransitioning, goToSection]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const value = {
    currentDomino,
    dominoStates,
    direction,
    soundEnabled,
    setSoundEnabled,
    isTransitioning,
    burstTrigger,
    robotState,
    setRobotState,
    robotDialogue,
    setRobotDialogue,
    triggerDomino,
    goToSection,
    nextSection,
    prevSection,
    toggleSound
  };

  return (
    <DominoContext.Provider value={value}>
      {children}
    </DominoContext.Provider>
  );
};

export const useDomino = () => {
  const context = useContext(DominoContext);
  if (!context) {
    throw new Error('useDomino must be used within a DominoProvider');
  }
  return context;
};
