import { useState, useEffect } from 'react';

export default function useBreakpoint() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const calculateBreakpoints = () => {
      const width = window.innerWidth;

      setBreakpoints({
        isMobile: width < 768, // Tailwind's `sm` and below
        isTablet: width >= 768 && width < 1024, // Tailwind's `md` and `lg`
        isDesktop: width >= 1024, // Tailwind's `lg` and above
      });
    };

    calculateBreakpoints();
    window.addEventListener('resize', calculateBreakpoints);

    return () => window.removeEventListener('resize', calculateBreakpoints);
  }, []);

  return breakpoints;
}
