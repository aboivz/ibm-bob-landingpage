import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds: readonly string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
