import { useEffect } from 'react';
import { useEnvironmentStore } from '@/store/environmentStore';

export function useSectionTracker(ref: React.RefObject<HTMLElement | null>, sectionId: string, threshold = 0.5) {
  const setActiveSection = useEnvironmentStore((state) => state.setActiveSection);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, sectionId, threshold, setActiveSection]);
}
