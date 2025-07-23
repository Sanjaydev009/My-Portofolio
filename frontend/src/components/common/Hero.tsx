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

// Import static assets to ensure they're bundled
import profileImage from '../../assets/images/sanju.jpg';
import resumeFile from '../../assets/documents/Sanju_Resume.pdf';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      }}
    >
      <InteractiveBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'medium',
                  mb: 2,
                }}
              >
                Hello, I'm
              </Typography>

              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Bandi Sanjay
              </Typography>

              <TypewriterEffect
                texts={roles}
                variant={isMobile ? 'h5' : 'h4'}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 'medium',
                  mb: 3,
                  minHeight: { xs: '2em', md: '1.5em' },
                }}
                speed={100}
                deleteSpeed={50}
                pauseDuration={2000}
              />

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '500px',
                  lineHeight: 1.7,
                }}
              >
                I create beautiful, responsive web applications with modern technologies. 
                Passionate about clean code, user experience, and turning ideas into reality.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/projects"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      px: 3,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    }}
                  >
                    View My Work
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Download />}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      px: 3,
                      py: 1.5,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                      },
                    }}
                    onClick={handleDownloadResume}
                  >
                    Download CV
                  </Button>
                </motion.div>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 5,
                    }}
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
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: 'background.paper',
                          boxShadow: theme.shadows[4],
                        },
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>

          <Box>
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
                }}
              >
                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
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
                      width: 60,
                      height: 60,
                      borderRadius: '12px',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows[8],
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      JS
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
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
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows[6],
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                      ⚛️
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 5,
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
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      TS
                    </Typography>
                  </Box>
                </motion.div>

                {/* Main Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar
                    src={profileImage}
                    alt="Bandi Sanjay Profile"
                    sx={{
                      width: isMobile ? 250 : 350,
                      height: isMobile ? 250 : 350,
                      border: `4px solid ${theme.palette.background.paper}`,
                      boxShadow: theme.shadows[12],
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {/* Fallback initials */}
                    BS
                  </Avatar>
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
