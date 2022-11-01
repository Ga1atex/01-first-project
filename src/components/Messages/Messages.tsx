import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useIntersection } from '../../utils/hooks/useIntersection';
import styles from './Messages.module.scss';

const Messages: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const messagesParentRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const options = {
    root: messagesParentRef.current,
    rootMargin: '0px 0px 20px 0px',
    threshold: 0,
  };

  useIntersection(
    messagesAnchorRef,
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsAutoScroll(true);
      } else {
        setIsAutoScroll(false);
      }
    },
    options
  );

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [children, isAutoScroll, messagesAnchorRef]);

  return (
    <div className={styles.messagesWrapper} ref={messagesParentRef}>
      {children}
      <div className="" ref={messagesAnchorRef}></div>
    </div>
  );
});

export default Messages;
