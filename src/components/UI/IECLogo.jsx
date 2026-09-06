import React from 'react';

/**
 * Official IEC (Innovation & Entrepreneurship Cell) Monogram Vector
 * Recreates the geometric nested I-E-C logo mark in electric violet and white.
 */
const IECLogo = ({ 
  size = 36, 
  color = '#9b30ff', 
  accentColor = '#ffffff',
  className = '',
  withGlow = true
}) => {
  const filterId = `iec-logo-glow-${size}`;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IEC Logo"
    >
      {withGlow && (
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* Main geometric IEC Monogram */}
      <g filter={withGlow ? `url(#${filterId})` : undefined}>
        {/* The 'I' spine and 'E' backplate */}
        <path
          d="M 16 16 H 104 V 34 H 42 V 51 H 88 V 69 H 42 V 86 H 104 V 104 H 16 Z"
          fill={color}
        />

        {/* The nested 'C' inner geometry */}
        <path
          d="M 52 48 H 96 V 58 H 64 V 62 H 96 V 72 H 52 Z"
          fill={accentColor}
          opacity="0.95"
        />
      </g>
    </svg>
  );
};

export default IECLogo;
