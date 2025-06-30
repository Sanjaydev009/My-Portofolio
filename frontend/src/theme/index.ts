import { createTheme } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';

// Color palette
const colors = {
  primary: {
    main: '#3498db',
    light: '#5dade2',
    dark: '#2980b9',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#e74c3c',
    light: '#ec7063',
    dark: '#c0392b',
    contrastText: '#ffffff'
  },
  success: {
    main: '#27ae60',
    light: '#58d68d',
    dark: '#1e8449'
  },
  warning: {
    main: '#f39c12',
    light: '#f8c471',
    dark: '#d68910'
  },
  error: {
    main: '#e74c3c',
    light: '#ec7063',
    dark: '#c0392b'
  },
  info: {
    main: '#3498db',
    light: '#85c1e9',
    dark: '#2874a6'
  }
};

// Typography configuration
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ].join(','),
  h1: {
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em'
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.7
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6
  }
};

// Component overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        borderRadius: 12,
        fontWeight: 500,
        padding: '12px 24px',
        fontSize: '0.95rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }
      },
      contained: {
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
        }
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12
        }
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        color: '#333'
      }
    }
  }
};

// Light theme
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...colors,
    background: {
      default: '#fafafa',
      paper: '#ffffff'
    },
    text: {
      primary: '#2c3e50',
      secondary: '#5d6d7e'
    },
    divider: '#e8eaf6'
  },
  typography,
  components: {
    ...components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          color: '#2c3e50'
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  }
};

// Dark theme
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...colors,
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0'
    },
    divider: '#333333'
  },
  typography,
  components: {
    ...components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          color: '#ffffff'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  }
};

export const lightTheme: Theme = createTheme(lightThemeOptions);
export const darkTheme: Theme = createTheme(darkThemeOptions);

// Breakpoints for responsive design
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

// Common spacing values
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Animation variants for Framer Motion
export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  },
  slideLeft: {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  },
  slideRight: {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }
};

export default lightTheme;
