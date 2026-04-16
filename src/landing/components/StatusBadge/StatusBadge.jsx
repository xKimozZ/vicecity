import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ 
  children, 
  type = 'info', // 'info', 'warning', 'success'
  icon,
  className = '' 
}) => {
  return (
    <span className={`${styles.badge} ${styles[type]} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
};

export default StatusBadge;
