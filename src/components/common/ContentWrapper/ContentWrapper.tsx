import React from 'react';
import styles from './ContentWrapper.module.scss'

const ContentWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <div className={styles.contentWrapper}>
      {children}
    </div>
  );
};

export default ContentWrapper;
