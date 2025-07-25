import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

interface ProfessionalGridProps {
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
  zIndex?: number;
}

const ProfessionalGrid: React.FC<ProfessionalGridProps> = ({ 
  intensity = 'medium', 
  animated = true,
  zIndex = 0 
}) => {
  const theme = useTheme();

  // Define opacity levels based on intensity
  const opacityLevels = {
    light: {
      primary: 0.08,
      secondary: 0.04,
      dots: 0.02,
      animatedOpacity: [0.08, 0.2, 0.08],
    },
    medium: {
      primary: 0.15,
      secondary: 0.08,
      dots: 0.03,
      animatedOpacity: [0.15, 0.4, 0.15],
    },
    strong: {
      primary: 0.25,
      secondary: 0.15,
      dots: 0.05,
      animatedOpacity: [0.25, 0.6, 0.25],
    },
  };

  const levels = opacityLevels[intensity];

  const gridStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex,
    pointerEvents: 'none' as const,
    backgroundImage: `
      linear-gradient(${alpha(theme.palette.primary.main, levels.primary)} 1px, transparent 1px),
      linear-gradient(90deg, ${alpha(theme.palette.primary.main, levels.primary)} 1px, transparent 1px),
      linear-gradient(${alpha(theme.palette.secondary.main, levels.secondary)} 1px, transparent 1px),
      linear-gradient(90deg, ${alpha(theme.palette.secondary.main, levels.secondary)} 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, ${alpha(theme.palette.primary.main, levels.dots)} 2px, transparent 2px),
      radial-gradient(circle at 75% 75%, ${alpha(theme.palette.secondary.main, levels.dots)} 2px, transparent 2px)
    `,
    backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px, 40px 40px, 60px 60px',
    backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 0 0',
  };

  if (animated) {
    return (
      <motion.div
        animate={{
          opacity: levels.animatedOpacity,
          backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={gridStyle}
      />
    );
  }

  return <Box sx={gridStyle} />;
};

export default ProfessionalGrid;
