import React from 'react';
import styles from './FeatureCard.module.css';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  children,
  className = '' 
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {icon && (
        // <div className={styles.iconWrapper}>
        //   {icon}
        // </div>
      <span className={styles.featureIcon}>{icon}</span>
      )}
      <h3 className={styles.featureTitle}>{title}</h3>
      {description && (
        <p className={styles.featureDesc}>{description}</p>
      )}
      {children}
    </div>
  );
};

export default FeatureCard;
