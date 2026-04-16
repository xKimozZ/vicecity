import React from 'react';
import styles from './SectionHeader.module.css';

const SectionHeader = ({ 
  title, 
  subtitle, 
  badge, 
  badgeType = 'info', // 'info', 'warning', 'success'
  centered = true,
  className = '' 
}) => {
  return (
    <div className={`${styles.header} ${centered ? styles.centered : ''} ${className}`}>
      {badge && (
        <span className={`landing-badge landing-badge-${badgeType}`}>
          {badge}
        </span>
      )}
      <h2 className={styles.title}>
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
