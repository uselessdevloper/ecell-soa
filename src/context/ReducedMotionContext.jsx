import React, { createContext, useState, useEffect, useContext } from 'react';

const ReducedMotionContext = createContext();

/**
 * Provider that detects and manages user preference for reduced motion.
 */
export const ReducedMotionProvider = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setReducedMotion(mediaQuery.matches);
    
    // Create event listener
    const handleChange = (event) => {
      setReducedMotion(event.matches);
    };
    
    // Handle cross-browser event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange); // Fallback for older browsers
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
};

/**
 * Hook to access the reduced motion preference.
 * @returns {boolean} True if the user prefers reduced motion, false otherwise.
 */
export const useReducedMotion = () => {
  const context = useContext(ReducedMotionContext);
  if (context === undefined) {
    return false; // Default to false if used outside provider (safe fallback)
  }
  return context;
};
