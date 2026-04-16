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
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
      {children}
    </div>
  );
};

export default FeatureCard;
