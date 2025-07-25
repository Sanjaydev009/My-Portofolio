import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocationOn,
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Download,
  KeyboardArrowDown,
  Code,
  School,
  Work,
} from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import ResumeDownloadService from '../../utils/resumeDownload';
import { Link as RouterLink } from 'react-router-dom';
import InteractiveBackground from './InteractiveBackground';
import TypewriterEffect from './TypewriterEffect';
import ProfessionalGrid from './ProfessionalGrid';
import { animationOptimizations, prefersReducedMotion } from '../../utils/performance';
import { useResponsive } from '../../utils/responsive';

// Import static assets to ensure they're bundled
import profileImage from '../../assets/images/sanju.jpg';
import resumeFile from '../../assets/documents/Sanju_Resume.pdf';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const responsive = useResponsive();
  
  // Get performance-optimized animation configuration
  const animationConfig = animationOptimizations.getAnimationConfig();
  const shouldReduceMotion = prefersReducedMotion();

  const roles = [
    'Full-Stack Developer',
    'React Specialist',
    'Web Developer',
    'Problem Solver',
    'Tech Innovator',
  ];

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/Sanjaydev009', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/bandi-sanjay-3431ab248/', label: 'LinkedIn' },
    { icon: <Email />, url: 'mailto:sanjay.bandi@aurora.edu.in', label: 'Email' },
  ];

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleDownloadResume = async () => {
    try {
      // First try with the imported asset URL
      const success = await ResumeDownloadService.downloadResume({
        filename: 'Sanju_Resume.pdf',
        showUserFeedback: true,
        fallbackUrl: resumeFile, // Use imported asset as fallback
      });

      if (success) {
        console.log('Resume download process completed');
      } else {
        console.warn('Resume download failed with all methods');
      }
    } catch (error) {
      console.error('Error in resume download:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.default, 0.95)} 0%, 
          ${alpha(theme.palette.background.paper, 0.95)} 50%,
          ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
      }}
    >
      {/* Remove InteractiveBackground for better performance */}
      {/* <InteractiveBackground /> */}

      {/* Optimized Background Animation Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Animated Gradient Orbs - Enhanced Visibility */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '350px',
            height: '350px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 40%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(30px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          style={{
            position: 'absolute',
            top: '60%',
            right: '10%',
            width: '280px',
            height: '280px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 40%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(25px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.6, 0.25],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            delay: 10,
          }}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            width: '220px',
            height: '220px',
            background: `conic-gradient(from 0deg, ${alpha(theme.palette.info.main, 0.12)}, ${alpha(theme.palette.success.main, 0.12)}, ${alpha(theme.palette.warning.main, 0.12)}, ${alpha(theme.palette.info.main, 0.12)})`,
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />

        {/* Floating Code Elements with Enhanced Visibility */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 45, 90, 45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '40px',
            height: '40px',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.25)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
            borderRadius: '20% 80% 20% 80%',
            filter: 'blur(0.5px)',
            backdropFilter: 'blur(5px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          style={{
            position: 'absolute',
            bottom: '25%',
            right: '8%',
            width: '55px',
            height: '55px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.18)})`,
            borderRadius: '50%',
            filter: 'blur(1px)',
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.12)}`,
            boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.25)}`,
          }}
        />

        <motion.div
          animate={{
            y: [0, -20, 20, 0],
            x: [0, 25, -10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 8,
          }}
          style={{
            position: 'absolute',
            top: '45%',
            left: '3%',
            width: '35px',
            height: '35px',
            background: `linear-gradient(60deg, ${alpha(theme.palette.info.main, 0.18)}, ${alpha(theme.palette.success.main, 0.15)})`,
            borderRadius: '30% 70% 70% 30%',
            filter: 'blur(1px)',
            border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
            boxShadow: `0 3px 12px ${alpha(theme.palette.info.main, 0.2)}`,
          }}
        />

        {/* Professional Grid Pattern with Animation */}
        <ProfessionalGrid intensity="medium" animated zIndex={1} />

        {/* Animated Mesh Gradient Background - Enhanced */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 25% 25%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, ${alpha(theme.palette.info.main, 0.04)} 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, ${alpha(theme.palette.success.main, 0.04)} 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, ${alpha(theme.palette.warning.main, 0.04)} 0%, transparent 50%)
            `,
            backgroundSize: '400% 400%, 300% 300%, 500% 500%, 350% 350%, 450% 450%',
          }}
        />

        {/* Enhanced Floating Particles */}
        {!shouldReduceMotion && animationConfig.enabled && [...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 3,
            }}
            style={{
              position: 'absolute',
              bottom: `${15 + i * 15}%`,
              left: `${8 + i * 20}%`,
              width: '6px',
              height: '6px',
              background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.secondary.main, 0.8)})`,
              borderRadius: '50%',
              boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.5)}, 0 0 30px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          />
        ))}

        {/* Floating Professional Elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          style={{
            position: 'absolute',
            top: '35%',
            right: '5%',
            width: '48px',
            height: '48px',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.12)} 25%, transparent 25%), 
                         linear-gradient(-45deg, ${alpha(theme.palette.secondary.main, 0.12)} 25%, transparent 25%), 
                         linear-gradient(45deg, transparent 75%, ${alpha(theme.palette.primary.main, 0.12)} 75%), 
                         linear-gradient(-45deg, transparent 75%, ${alpha(theme.palette.secondary.main, 0.12)} 75%)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
            borderRadius: '15%',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            backdropFilter: 'blur(8px)',
          }}
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 12,
          }}
          style={{
            position: 'absolute',
            bottom: '40%',
            left: '12%',
            width: '42px',
            height: '42px',
            background: `conic-gradient(from 45deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)}, ${alpha(theme.palette.info.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.15)})`,
            borderRadius: '25%',
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
            filter: 'blur(0.5px)',
            boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.2)}`,
          }}
        />

        {/* Enhanced Circuit Pattern with Animation */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(${alpha(theme.palette.primary.main, 0.08)} 1px, transparent 1px),
              linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.08)} 1px, transparent 1px),
              linear-gradient(${alpha(theme.palette.secondary.main, 0.04)} 1px, transparent 1px),
              linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.04)} 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            backgroundPosition: '0 0, 0 0, 0 0, 0 0',
          }}
        />

        {/* Floating Text Elements */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              style={{
                position: 'absolute',
                top: '20%',
                right: '20%',
                fontSize: '12px',
                fontWeight: 'bold',
                color: alpha(theme.palette.primary.main, 0.2),
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {'</>'}
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [0.1, 0.25, 0.1],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 6,
              }}
              style={{
                position: 'absolute',
                bottom: '30%',
                left: '25%',
                fontSize: '14px',
                fontWeight: 'bold',
                color: alpha(theme.palette.secondary.main, 0.2),
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {'{ }'}
            </motion.div>
          </>
        )}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              md: '1fr 1fr' 
            },
            gap: { xs: 3, sm: 4, md: 6, lg: 8 },
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '80vh' },
            py: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'medium',
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.5rem' },
                  }}
                >
                  Hello, I'm
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Typography
                  variant={isMobile ? 'h4' : 'h2'}
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    mb: { xs: 1.5, sm: 2, md: 2.5 },
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    fontSize: { 
                      xs: '2rem', 
                      sm: '2.5rem', 
                      md: '3rem', 
                      lg: '3.5rem',
                      xl: '4rem'
                    },
                    lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '100%',
                      height: '3px',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      borderRadius: '2px',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      animation: 'expandLine 1s ease-out 1s forwards',
                    },
                    '@keyframes expandLine': {
                      to: {
                        transform: 'scaleX(1)',
                      },
                    },
                  }}
                >
                  Bandi Sanjay
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <TypewriterEffect
                  texts={roles}
                  variant={isMobile ? 'h6' : 'h4'}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    mb: { xs: 2, sm: 3, md: 4 },
                    minHeight: { xs: '2em', sm: '1.8em', md: '1.5em' },
                    fontSize: { 
                      xs: '1.1rem', 
                      sm: '1.3rem', 
                      md: '1.5rem', 
                      lg: '1.75rem' 
                    },
                  }}
                  speed={150}
                  deleteSpeed={75}
                  pauseDuration={3000}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: { xs: 3, sm: 4, md: 5 },
                    maxWidth: { xs: '100%', sm: '90%', md: '500px' },
                    lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                  }}
                >
                  I create beautiful, responsive web applications with modern technologies. 
                  Passionate about clean code, user experience, and turning ideas into reality.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  flexWrap: 'wrap', 
                  gap: { xs: 2, sm: 2, md: 3 }, 
                  mb: { xs: 3, sm: 4, md: 5 },
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  alignItems: { xs: 'stretch', sm: 'center' },
                }}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 8px 25px rgba(33, 203, 243, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="contained"
                      size={isMobile ? 'medium' : 'large'}
                      component={RouterLink}
                      to="/projects"
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: { xs: 2.5, sm: 3, md: 4 },
                        py: { xs: 1.2, sm: 1.5, md: 1.8 },
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        minWidth: { xs: '100%', sm: 'auto' },
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                    >
                      View My Work
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: theme.palette.primary.main,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outlined"
                      size={isMobile ? 'medium' : 'large'}
                      startIcon={<Download />}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: { xs: 2.5, sm: 3, md: 4 },
                        py: { xs: 1.2, sm: 1.5, md: 1.8 },
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        minWidth: { xs: '100%', sm: 'auto' },
                        borderWidth: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                          transition: 'left 0.6s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                      onClick={handleDownloadResume}
                    >
                      Download CV
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  flexWrap: 'wrap',
                }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.3,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'text.secondary',
                          backgroundColor: 'background.paper',
                          boxShadow: theme.shadows[2],
                          width: { xs: 44, sm: 48, md: 52 },
                          height: { xs: 44, sm: 48, md: 52 },
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'background.paper',
                            boxShadow: theme.shadows[8],
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Box>

          <Box sx={{ 
            order: { xs: -1, md: 0 }, // Show avatar first on mobile
            mb: { xs: 4, md: 0 },
          }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  px: { xs: 2, sm: 0 },
                }}
              >
                {/* Simplified floating tech elements - 3 instead of 3 with reduced animations */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
                      JS
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white', fontSize: '16px' }}>
                      ⚛️
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '20%',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      backgroundColor: 'success.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows[3],
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>
                      TS
                    </Typography>
                  </Box>
                </motion.div>

                {/* Main Avatar with Enhanced Animations */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.6 }
                  }}
                  style={{ position: 'relative' }}
                >
                  {/* Simplified Avatar Ring - Static instead of animated */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-15px',
                      right: '-15px',
                      bottom: '-15px',
                      borderRadius: '50%',
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      zIndex: 1,
                    }}
                  />

                  {/* Simplified Glowing Effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '-8px',
                      right: '-8px',
                      bottom: '-8px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
                      zIndex: 0,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <Avatar
                    src={profileImage}
                    alt="Bandi Sanjay Profile"
                    sx={{
                      width: { 
                        xs: 200, 
                        sm: 250, 
                        md: 300, 
                        lg: 350, 
                        xl: 400 
                      },
                      height: { 
                        xs: 200, 
                        sm: 250, 
                        md: 300, 
                        lg: 350, 
                        xl: 400 
                      },
                      border: `4px solid ${theme.palette.background.paper}`,
                      boxShadow: `${theme.shadows[12]}, 0 0 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                      position: 'relative',
                      zIndex: 2,
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: `${theme.shadows[20]}, 0 0 60px ${alpha(theme.palette.primary.main, 0.5)}`,
                      },
                    }}
                  >
                    {/* Fallback initials */}
                    BS
                  </Avatar>

                  {/* Simplified Floating Tech Icons - responsive sizing */}
                  {[
                    { icon: 'React', angle: 0, distance: { xs: 120, sm: 140, md: 160 }, color: '#61DAFB' },
                    { icon: 'JS', angle: 120, distance: { xs: 110, sm: 130, md: 150 }, color: '#F7DF1E' },
                    { icon: 'Node', angle: 240, distance: { xs: 115, sm: 135, md: 155 }, color: '#339933' },
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.icon}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${tech.angle}deg) translateY(-${responsive.isMobile ? tech.distance.xs : responsive.isTablet ? tech.distance.sm : tech.distance.md}px)`,
                        zIndex: 1,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [-3, 3, -3],
                      }}
                      transition={{ 
                        opacity: { duration: 0.5, delay: 1 + index * 0.3 },
                        scale: { duration: 0.5, delay: 1 + index * 0.3 },
                        y: { duration: 2 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 28, sm: 32, md: 35, lg: 40 },
                          height: { xs: 28, sm: 32, md: 35, lg: 40 },
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40)`,
                          border: `2px solid ${tech.color}60`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: { xs: '9px', sm: '10px', md: '11px', lg: '12px' },
                          fontWeight: 'bold',
                          color: tech.color,
                          backdropFilter: 'blur(10px)',
                          boxShadow: `0 2px 15px ${tech.color}20`,
                        }}
                      >
                        {tech.icon}
                      </Box>
                    </motion.div>
                  ))}
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <IconButton
          onClick={scrollToNext}
          sx={{
            color: 'text.secondary',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 53%, 80%, 100%': {
                transform: 'translate3d(0,0,0)',
              },
              '40%, 43%': {
                transform: 'translate3d(0,-8px,0)',
              },
              '70%': {
                transform: 'translate3d(0,-4px,0)',
              },
              '90%': {
                transform: 'translate3d(0,-2px,0)',
              },
            },
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </motion.div>
    </Box>
  );
};

export default Hero;