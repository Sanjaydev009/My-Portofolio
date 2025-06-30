import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

// Theme Context Type
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

// Create Context
const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
    
    if (savedMode) {
      setModeState(savedMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setModeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedMode = localStorage.getItem('theme-mode');
      if (!savedMode) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const setMode = (newMode: 'light' | 'dark') => {
    setModeState(newMode);
    localStorage.setItem('theme-mode', newMode);
    
    // Update document class for CSS-in-JS and external styles
    document.documentElement.setAttribute('data-theme', newMode);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newMode === 'dark' ? '#1a1a1a' : '#ffffff');
    }
  };

  // Apply theme on mode change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', mode === 'dark' ? '#1a1a1a' : '#ffffff');
    }
  }, [mode]);

  const value: ThemeContextType = {
    mode,
    toggleMode,
    setMode
  };

  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to use Theme Context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};

export default ThemeContext;
