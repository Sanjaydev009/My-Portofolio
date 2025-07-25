import React from 'react';
import {
  Container,
  Box,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Rocket, Star } from '@mui/icons-material';
import InteractiveTimeline from '../components/common/InteractiveTimeline';
import PersonalityExplorer from '../components/common/PersonalityExplorer';
import SkillsGalaxy from '../components/common/SkillsGalaxy';
import PersonalPhilosophy from '../components/common/PersonalPhilosophy';
import AchievementShowcase from '../components/common/AchievementShowcase';
import PersonalStory from '../components/common/PersonalStory';
import ExperienceMap from '../components/common/ExperienceMap';
import TechStackExplorer from '../components/common/TechStackExplorer';
import ProfessionalGrid from '../components/common/ProfessionalGrid';
import { useResponsive, getResponsiveSpacing, getResponsiveTypography } from '../utils/responsive';
import { useResponsiveContainer, useResponsivePadding } from '../hooks/useMediaQuery';

const About: React.FC = () => {
  const theme = useTheme();
  const responsive = useResponsive();
  const spacing = getResponsiveSpacing(theme);
  const typography = getResponsiveTypography();
  const containerWidth = useResponsiveContainer();
  const padding = useResponsivePadding();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Professional Background Elements */}
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
        {/* Professional Grid Pattern */}
        <ProfessionalGrid intensity="light" animated zIndex={1} />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '50px',
            height: '50px',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: 'blur(1px)',
          }}
        />

        <motion.div
          animate={{
            y: [0, 35, 0],
            x: [0, -20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '60px',
            height: '60px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)}, ${alpha(theme.palette.primary.main, 0.08)})`,
            borderRadius: '50%',
            filter: 'blur(2px)',
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            width: '180px',
            height: '180px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 6,
          }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '12%',
            width: '220px',
            height: '220px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        {/* Mesh Gradient Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.04)} 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, ${alpha(theme.palette.info.main, 0.02)} 0%, transparent 50%)
            `,
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
        {/* Professional Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Star sx={{ fontSize: '1.5rem' }} />
                </motion.div>
              </Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                }}
              >
                About Me
              </Typography>
            </Box>
            
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              Dive deep into my journey, values, and the experiences that have shaped me as a developer and human being.
              Explore my skills, achievements, and the philosophy that drives my work.
            </Typography>

            {/* Professional Stats */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 4, md: 6 }
            }}>
              {[
                { label: 'Learning Journey', value: '2+', icon: '🚀' },
                { label: 'Skills Mastered', value: '25+', icon: '⚡' },
                { label: 'Projects Built', value: '15+', icon: '💼' },
                { label: 'Technologies', value: '15+', icon: '🛠️' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ 
                    flex: window.innerWidth < 600 ? '1 1 calc(50% - 8px)' : 'none',
                    minWidth: window.innerWidth < 600 ? 'calc(50% - 8px)' : '120px'
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: { xs: 2, sm: 2.5, md: 3 },
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      minWidth: { xs: '100px', sm: '120px', md: '140px' },
                      transition: 'all 0.3s ease',
                      height: { xs: 'auto', sm: '120px' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      '&:hover': {
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      color: 'primary.main',
                      mb: 1,
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }
                    }}>
                      {stat.icon} {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
                      fontWeight: 500,
                      lineHeight: 1.2
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Sections with Professional Styling */}
        <Box sx={{ 
          '& > *': { 
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: { xs: -10, md: -20 },
              left: { xs: -10, md: -20 },
              right: { xs: -10, md: -20 },
              bottom: { xs: -10, md: -20 },
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.5)} 0%, ${alpha(theme.palette.background.paper, 0.2)} 100%)`,
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
              zIndex: -1,
            }
          }
        }}>
          {/* Interactive Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <InteractiveTimeline />
          </motion.div>

          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PersonalStory />
          </motion.div>

          {/* Experience Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ExperienceMap />
          </motion.div>

          {/* Personality Explorer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PersonalityExplorer />
          </motion.div>

          {/* Tech Stack Explorer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TechStackExplorer />
          </motion.div>

          {/* Skills Galaxy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SkillsGalaxy />
          </motion.div>

          {/* Achievement Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AchievementShowcase />
          </motion.div>

          {/* Personal Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PersonalPhilosophy />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
