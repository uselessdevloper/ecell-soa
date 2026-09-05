import React, { useRef, useState } from 'react';
import styles from './MagneticButton.module.css';

const MagneticButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  className = '',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (max 8px offset)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const x = (distanceX / (width / 2)) * 8;
    const y = (distanceY / (height / 2)) * 8;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const rootClass = [
    styles.magneticBtn,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={buttonRef}
      className={rootClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      {...props}
    >
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default MagneticButton;
