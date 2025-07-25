import { useState, useEffect } from 'react';

// Custom media query hook for better responsive design
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    
    // Use addEventListener if available, otherwise use deprecated addListener
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
};

// Predefined breakpoints
export const breakpoints = {
  xs: '(max-width: 599px)',
  sm: '(min-width: 600px) and (max-width: 899px)',
  md: '(min-width: 900px) and (max-width: 1199px)',
  lg: '(min-width: 1200px) and (max-width: 1535px)',
  xl: '(min-width: 1536px) and (max-width: 1919px)',
  xxl: '(min-width: 1920px)',
  
  // Up breakpoints
  smUp: '(min-width: 600px)',
  mdUp: '(min-width: 900px)',
  lgUp: '(min-width: 1200px)',
  xlUp: '(min-width: 1536px)',
  xxlUp: '(min-width: 1920px)',
  
  // Down breakpoints
  smDown: '(max-width: 899px)',
  mdDown: '(max-width: 1199px)',
  lgDown: '(max-width: 1535px)',
  xlDown: '(max-width: 1919px)',
};

// Custom hook for responsive values
export const useResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}): T => {
  const isXxl = useMediaQuery(breakpoints.xxl);
  const isXl = useMediaQuery(breakpoints.xl);
  const isLg = useMediaQuery(breakpoints.lg);
  const isMd = useMediaQuery(breakpoints.md);
  const isSm = useMediaQuery(breakpoints.sm);

  if (isXxl && values.xxl !== undefined) return values.xxl;
  if (isXl && values.xl !== undefined) return values.xl;
  if (isLg && values.lg !== undefined) return values.lg;
  if (isMd && values.md !== undefined) return values.md;
  if (isSm && values.sm !== undefined) return values.sm;
  
  return values.xs as T;
};

// Grid columns hook - more columns for better space utilization
export const useResponsiveColumns = () => {
  return useResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6,
  });
};

// Container width hook - 100% width for all devices
export const useResponsiveContainer = () => {
  return '100%';
};

// Padding hook - minimal padding only for content readability
export const useResponsivePadding = () => {
  return useResponsiveValue({
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '28px',
  });
};
