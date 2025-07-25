import { useTheme, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material/styles';

// Responsive breakpoints
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
  xxl: 1920,
} as const;

// Custom hook for responsive values
export const useResponsive = () => {
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  const isXxl = useMediaQuery('(min-width: 1920px)');
  
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  
  const isMobile = isXs || isSm;
  const isTablet = isMd;
  const isDesktop = isLg || isXl || isXxl;
  const isLargeDesktop = isXl || isXxl;

  return {
    // Exact breakpoints
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
    
    // Up queries
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    
    // Down queries
    isSmDown,
    isMdDown,
    isLgDown,
    
    // Device categories
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    
    // Current breakpoint
    currentBreakpoint: isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : isXl ? 'xl' : 'xxl',
  };
};

// Responsive spacing utility
export const getResponsiveSpacing = (theme: Theme) => ({
  // Container padding
  containerPadding: {
    xs: theme.spacing(2),
    sm: theme.spacing(3),
    md: theme.spacing(4),
    lg: theme.spacing(6),
    xl: theme.spacing(8),
  },
  
  // Section padding
  sectionPadding: {
    xs: theme.spacing(4, 2),
    sm: theme.spacing(6, 3),
    md: theme.spacing(8, 4),
    lg: theme.spacing(12, 6),
    xl: theme.spacing(16, 8),
  },
  
  // Card padding
  cardPadding: {
    xs: theme.spacing(2),
    sm: theme.spacing(3),
    md: theme.spacing(4),
    lg: theme.spacing(5),
    xl: theme.spacing(6),
  },
  
  // Grid gaps
  gridGap: {
    xs: theme.spacing(2),
    sm: theme.spacing(3),
    md: theme.spacing(4),
    lg: theme.spacing(6),
    xl: theme.spacing(8),
  },
  
  // Component margins
  componentMargin: {
    xs: theme.spacing(3),
    sm: theme.spacing(4),
    md: theme.spacing(6),
    lg: theme.spacing(10),
    xl: theme.spacing(12),
  },
  
  // Desktop-specific spacing
  desktopSpacing: {
    heroSection: { lg: theme.spacing(20), xl: theme.spacing(24) },
    sectionGap: { lg: theme.spacing(15), xl: theme.spacing(20) },
    cardSpacing: { lg: theme.spacing(8), xl: theme.spacing(10) },
  },
});

// Responsive typography
export const getResponsiveTypography = () => ({
  // Hero title
  heroTitle: {
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '4rem', xl: '4.5rem' },
    lineHeight: { xs: 1.2, sm: 1.2, md: 1.1, lg: 1.1 },
    fontWeight: { xs: 700, lg: 800 },
  },
  
  // Section titles
  sectionTitle: {
    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '3.5rem', xl: '4rem' },
    lineHeight: 1.2,
    fontWeight: { xs: 700, lg: 800 },
  },
  
  // Card titles
  cardTitle: {
    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem', xl: '2rem' },
    lineHeight: 1.3,
    fontWeight: { xs: 600, lg: 700 },
  },
  
  // Body text
  bodyText: {
    fontSize: { xs: '0.875rem', sm: '1rem', lg: '1.125rem', xl: '1.25rem' },
    lineHeight: { xs: 1.6, sm: 1.7, lg: 1.8 },
  },
  
  // Button text
  buttonText: {
    fontSize: { xs: '0.875rem', sm: '1rem', lg: '1.125rem' },
    padding: { xs: '8px 16px', sm: '12px 24px', lg: '16px 32px', xl: '20px 40px' },
    fontWeight: { xs: 500, lg: 600 },
  },
  
  // Desktop hero subtitle
  heroSubtitle: {
    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem', xl: '2rem' },
    lineHeight: { xs: 1.4, lg: 1.5 },
    fontWeight: { xs: 400, lg: 500 },
  },
});

// Responsive layout utilities
export const getResponsiveLayout = () => ({
  // Grid columns - optimized for all screen sizes including large desktops
  gridColumns: {
    projects: { 
      xs: '1fr', 
      sm: 'repeat(2, 1fr)', 
      md: 'repeat(3, 1fr)', 
      lg: 'repeat(4, 1fr)', 
      xl: 'repeat(5, 1fr)',
      '@media (min-width: 1920px)': 'repeat(6, 1fr)' // Ultra-wide screens
    },
    blog: { 
      xs: '1fr', 
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)', 
      lg: 'repeat(4, 1fr)',
      xl: 'repeat(5, 1fr)',
      '@media (min-width: 1920px)': 'repeat(6, 1fr)'
    },
    skills: { 
      xs: '1fr', 
      sm: 'repeat(2, 1fr)', 
      md: 'repeat(3, 1fr)', 
      lg: 'repeat(5, 1fr)', 
      xl: 'repeat(6, 1fr)',
      '@media (min-width: 1920px)': 'repeat(8, 1fr)'
    },
    features: { 
      xs: '1fr', 
      sm: 'repeat(2, 1fr)',
      md: 'repeat(2, 1fr)', 
      lg: 'repeat(3, 1fr)',
      xl: 'repeat(4, 1fr)'
    },
    testimonials: { 
      xs: '1fr', 
      sm: 'repeat(2, 1fr)', 
      md: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
      xl: 'repeat(4, 1fr)'
    },
  },
  
  // Container max widths - optimized for desktop viewing
  maxWidth: {
    content: { xs: '100%', sm: '600px', md: '800px', lg: '1200px', xl: '1600px' },
    narrow: { xs: '100%', sm: '500px', md: '600px', lg: '800px', xl: '1000px' },
    wide: { xs: '100%', sm: '700px', md: '900px', lg: '1400px', xl: '1800px' },
    ultraWide: { xs: '100%', sm: '700px', md: '900px', lg: '1500px', xl: '2000px' },
  },
  
  // Avatar sizes
  avatarSize: {
    small: { xs: 40, sm: 48, md: 56, lg: 64, xl: 72 },
    medium: { xs: 80, sm: 100, md: 120, lg: 140, xl: 160 },
    large: { xs: 150, sm: 200, md: 250, lg: 300, xl: 350 },
    hero: { xs: 200, sm: 250, md: 300, lg: 350, xl: 400 },
  },
  
  // Card dimensions
  cardHeight: {
    project: { xs: 'auto', md: 400, lg: 450, xl: 500 },
    blog: { xs: 'auto', md: 350, lg: 400, xl: 450 },
    skill: { xs: 'auto', md: 200, lg: 220, xl: 240 },
  },
});

// Common responsive patterns
export const responsivePatterns = {
  // Flex direction
  flexColumn: { xs: 'column', md: 'row' },
  flexColumnReverse: { xs: 'column-reverse', md: 'row' },
  
  // Text alignment
  centerOnMobile: { xs: 'center', md: 'left' },
  
  // Display utilities
  hideOnMobile: { xs: 'none', md: 'block' },
  hideOnDesktop: { xs: 'block', md: 'none' },
  
  // Positioning
  stickyTop: { xs: 'relative', md: 'sticky' },
};

// Animation delays for staggered effects
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => 
  baseDelay + (index * 0.05);

// Responsive image settings
export const getResponsiveImage = () => ({
  // Hero image
  hero: {
    width: { xs: '100%', md: '80%', lg: '70%' },
    maxWidth: { xs: 300, sm: 400, md: 500 },
    height: 'auto',
    aspectRatio: '1/1',
  },
  
  // Project thumbnails
  project: {
    width: '100%',
    height: { xs: 200, sm: 250, md: 300 },
    objectFit: 'cover' as const,
  },
  
  // Blog featured images
  blog: {
    width: '100%',
    height: { xs: 180, sm: 200, md: 220 },
    objectFit: 'cover' as const,
  },
});

// Helper function to get responsive value
export const getResponsiveValue = <T>(
  values: Partial<Record<keyof typeof breakpoints, T>>,
  currentBreakpoint: keyof typeof breakpoints
): T | undefined => {
  const orderedBreakpoints: (keyof typeof breakpoints)[] = ['xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = orderedBreakpoints.indexOf(currentBreakpoint);
  
  for (let i = currentIndex; i < orderedBreakpoints.length; i++) {
    const breakpoint = orderedBreakpoints[i];
    if (values[breakpoint] !== undefined) {
      return values[breakpoint];
    }
  }
  
  return undefined;
};
