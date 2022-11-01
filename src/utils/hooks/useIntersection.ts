import { RefObject, useEffect, useState } from 'react';

export const useIntersection = (
  anchorRef: RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
) => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);
  useEffect(() => {
    if (anchorRef.current) {
      const handler = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        setIntersectionObserverEntry(entries[0]);
        callback(entries, observer);
      };

      const autoObserver = new IntersectionObserver(handler, options);
      autoObserver.observe(anchorRef.current);

      return () => {
        autoObserver.disconnect();
      };
    }
  }, [anchorRef, options, callback]);

  return intersectionObserverEntry;
};
