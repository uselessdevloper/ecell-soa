import React, { useRef } from 'react';
import styles from './Domino.module.css';
import useSoundManager from '../../hooks/useSoundManager';

const Domino = ({
  number,
  title,
  tagline,
  logo,
  fullFaceLogo,
  slideshowPhotos,
  slideshowIndex = 0,
  state = 'standing',
  isActive = false,
  onClick,
  children,
  className = '',
  size = 'large',
  glow = true,
  index,
  color,
  glowColor
}) => {
  const dominoRef = useRef(null);
  const { playImpact, playClick } = useSoundManager();

  // Determine current index & formatted display number
  const currentIndex = typeof index === 'number'
    ? index
    : (number ? parseInt(number, 10) - 1 : 0);
  const displayNum = number || `0${currentIndex + 1}`;

  const handleClick = (e) => {
    if (onClick) {
      playClick();
      playImpact(1.0, currentIndex);
      onClick(e);
    }
  };

  const rootClass = [
    styles.dominoWrapper,
    styles[size],
    styles[state],
    isActive ? styles.active : '',
    glow ? styles.glow : '',
    className
  ].filter(Boolean).join(' ');

  const customStyle = {};
  if (color) customStyle['--step-color'] = color;
  if (glowColor) customStyle['--step-glow'] = glowColor;

  return (
    <div 
      ref={dominoRef}
      className={rootClass} 
      style={customStyle}
      onClick={handleClick}
      role="button"
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick(e);
        }
      }}
      aria-label={`Domino ${displayNum || ''}: ${title || 'Interactive Section'}`}
    >
      {/* Floor Shadow */}
      <div className={styles.floorShadow}></div>

      {/* Main 3D Physical Body */}
      <div className={styles.dominoBody}>
        {/* Front Face */}
        <div className={`${styles.frontFace} ${(fullFaceLogo || (slideshowPhotos && slideshowPhotos.length > 0)) ? styles.hasFullLogo : ''}`}>
          {slideshowPhotos && slideshowPhotos.length > 0 ? (
            <div className={styles.fullLogoBackground}>
              {slideshowPhotos.map((photo, pIdx) => {
                const isCurrent = pIdx === slideshowIndex;
                const src = typeof photo === 'string' ? photo : photo.src;
                return (
                  <img 
                    key={src || pIdx} 
                    src={src} 
                    alt="" 
                    className={`${styles.fullLogoImage} ${styles.slideshowLayer} ${isCurrent ? styles.slideshowLayerActive : ''}`} 
                  />
                );
              })}
              <div className={styles.fullLogoOverlay}></div>
            </div>
          ) : fullFaceLogo ? (
            <div className={styles.fullLogoBackground}>
              <img src={fullFaceLogo} alt="" className={styles.fullLogoImage} />
              <div className={styles.fullLogoOverlay}></div>
            </div>
          ) : null}
          <div className={styles.surfaceSheen}></div>
          <div className={styles.innerBevel}>
            {displayNum && <span className={styles.dominoNumber}>{displayNum}</span>}
            
            <div className={styles.dominoCenter}>
              {logo && !fullFaceLogo && (
                <div className={styles.dominoLogoContainer}>
                  <img src={logo} alt={title || "Domino Logo"} className={styles.dominoLogoImg} />
                </div>
              )}
              {title && <h2 className={styles.title}>{title}</h2>}
              {tagline && <p className={styles.tagline}>{tagline}</p>}
              {children}
            </div>

            <div className={styles.dominoPivotIndicator}>
              <span className={styles.dotIndicator}></span>
            </div>
          </div>
        </div>

        {/* 3D Sides for Physical Depth */}
        <div className={styles.sideRight}></div>
        <div className={styles.sideLeft}></div>
        <div className={styles.sideTop}></div>
        <div className={styles.sideBottom}></div>
        <div className={styles.backFace}></div>
      </div>
    </div>
  );
};

export default Domino;
