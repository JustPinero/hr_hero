import { useEffect, type RefObject } from 'react';

export function useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  onIntersect: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, onIntersect, enabled]);
}
