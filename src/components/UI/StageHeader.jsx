import React from 'react';
import styles from './StageHeader.module.css';

const StageHeader = ({
  stageTag,
  title,
  subtitle,
  children,
  className = ''
}) => {
  return (
    <div className={`${styles.headerArea} ${className}`}>
      {/* 3D Perspective Curved Wireframe Grid */}
      <div className={styles.wireframeGridContainer} aria-hidden="true">
        <svg className={styles.wireframeSvg} viewBox="0 0 1200 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageHeaderGridGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.02)" />
              <stop offset="50%" stopColor="rgba(255, 170, 90, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 190, 120, 0.4)" />
            </linearGradient>
          </defs>

          <path d="M 0 310 Q 600 240 1200 310" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" fill="none" />
          <path d="M 50 260 Q 600 180 1150 260" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.3" fill="none" />
          <path d="M 120 200 Q 600 120 1080 200" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.4" fill="none" />
          <path d="M 220 140 Q 600 65 980 140" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.5" fill="none" />
          <path d="M 340 85 Q 600 25 860 85" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.6" fill="none" />

          <line x1="600" y1="20" x2="20" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" />
          <line x1="600" y1="20" x2="160" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" />
          <line x1="600" y1="20" x2="320" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" />
          <line x1="600" y1="20" x2="480" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.3" />
          <line x1="600" y1="20" x2="600" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.5" />
          <line x1="600" y1="20" x2="720" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.3" />
          <line x1="600" y1="20" x2="880" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" />
          <line x1="600" y1="20" x2="1040" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" />
          <line x1="600" y1="20" x2="1180" y2="320" stroke="url(#stageHeaderGridGrad)" strokeWidth="1.2" />
        </svg>
      </div>

      <div className={styles.textChamber}>
        <h1 className={styles.stageTitle}>{title}</h1>
        {subtitle && <p className={styles.stageSubtitle}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default StageHeader;
