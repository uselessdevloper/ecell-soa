import React from 'react';
import styles from './MiniDomino.module.css';
import useSoundManager from '../../hooks/useSoundManager';

const MiniDomino = ({
  title,
  text,
  tagline,
  number,
  index,
  description,
  desc,
  tags = [],
  frontContent,
  children,
  isActive = false,
  isInteractive = true,
  onClick,
  state = 'standing',
  className = '',
  color,
  glowColor
}) => {
  const { playClick, playImpact } = useSoundManager();

  const displayTitle = title || text;
  const displayDesc = description || desc;
  const displayNum = number || (typeof index === 'number' ? `0${index + 1}` : null);

  const handleClick = (e) => {
    if (onClick) {
      playClick();
      playImpact(1.2);
      onClick(e);
    }
  };

  const rootClass = [
    styles.miniWrapper,
    styles[state],
    isActive ? styles.active : '',
    isInteractive ? styles.interactive : '',
    className
  ].filter(Boolean).join(' ');

  const customStyle = {};
  if (color) customStyle['--mini-color'] = color;
  if (glowColor) customStyle['--mini-glow'] = glowColor;

  return (
    <div 
      className={rootClass}
      style={customStyle}
      onClick={isInteractive ? handleClick : undefined}
      role={isInteractive && onClick ? "button" : undefined}
      tabIndex={isInteractive && onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (isInteractive && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick(e);
        }
      }}
      aria-label={`Mini Domino: ${displayTitle || 'Item'}`}
    >
      <div className={styles.miniShadow}></div>
      <div className={styles.mini3d}>
        <div className={styles.face}>
          {displayNum && <span className={styles.miniNumber}>{displayNum}</span>}

          {frontContent ? (
            frontContent
          ) : children ? (
            children
          ) : (
            <div className={styles.content}>
              {displayTitle && <h3 className={styles.miniTitle}>{displayTitle}</h3>}
              {tagline && <span className={styles.miniTagline}>{tagline}</span>}
              {displayDesc && <p className={styles.miniDesc}>{displayDesc}</p>}
              {tags.length > 0 && (
                <div className={styles.tags}>
                  {tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.sideRight}></div>
        <div className={styles.sideTop}></div>
      </div>
    </div>
  );
};

export default MiniDomino;
