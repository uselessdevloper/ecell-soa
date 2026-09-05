import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { DOMINO_SECTIONS } from '../data/content';

const DominoContext = createContext();

export const DominoProvider = ({ children }) => {
  const [currentDomino, setCurrentDomino] = useState(0);
  const [dominoStates, setDominoStates] = useState(
    Array(7).fill('standing')
  );
  const [direction, setDirection] = useState('forward');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(null);
  
  // Robot guide state
  const [robotState, setRobotState] = useState('idle');
  const [robotDialogue, setRobotDialogue] = useState(
    DOMINO_SECTIONS[0]?.robotDialogues ? DOMINO_SECTIONS[0].robotDialogues.join(' ') : "Welcome to IEC-SOA!"
  );

  // Update robot dialogue and state when section changes
  useEffect(() => {
    const sec = DOMINO_SECTIONS[currentDomino];
    if (sec) {
      setRobotState(sec.robotState || 'idle');
      // Show all message lines combined at once
      const fullText = Array.isArray(sec.robotDialogues) ? sec.robotDialogues.join(' ') : (sec.robotDialogues || "");
      setRobotDialogue(fullText);
    }
  }, [currentDomino]);

  /**
   * Directly navigate to a specific section.
   */
  const goToSection = useCallback((index) => {
    if (isTransitioning || index < 0 || index > 6) return;
    setDirection(index >= currentDomino ? 'forward' : 'backward');
    setCurrentDomino(index);
    setIsTransitioning(false);
  }, [currentDomino, isTransitioning]);

  /**
   * Domino topple trigger: physical fall, robot reaction, impact spark, then move to next.
   */
  const triggerDomino = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('forward');

    // 1. Domino initiates cyber gateway warp
    setDominoStates((prev) => {
      const copy = [...prev];
      copy[index] = 'falling';
      return copy;
    });

    // 2. Robot companion reacts to the energy surge
    setRobotState('excited');

    // 3. Supersonic neon shockwaves & kinetic sparks at peak energy surge (~140ms)
    setTimeout(() => {
      setBurstTrigger(Date.now());
    }, 140);

    // 4. Milestone transition to next section (~540ms)
    setTimeout(() => {
      setDominoStates((prev) => {
        const copy = [...prev];
        copy[index] = 'fallen';
        return copy;
      });

      if (index < 6) {
        setCurrentDomino(index + 1);
      }
      setIsTransitioning(false);
    }, 540);
  }, [isTransitioning]);

  const nextSection = useCallback(() => {
    if (currentDomino < 6 && !isTransitioning) {
      triggerDomino(currentDomino);
    }
  }, [currentDomino, isTransitioning, triggerDomino]);

  const prevSection = useCallback(() => {
    if (currentDomino > 0 && !isTransitioning) {
      // Reset fallen state of target when going back
      setDominoStates((prev) => {
        const copy = [...prev];
        copy[currentDomino - 1] = 'standing';
        return copy;
      });
      goToSection(currentDomino - 1);
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
