import React from 'react';
import {
  Container,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import InteractiveTimeline from '../components/common/InteractiveTimeline';
import PersonalityExplorer from '../components/common/PersonalityExplorer';
import SkillsGalaxy from '../components/common/SkillsGalaxy';
import PersonalPhilosophy from '../components/common/PersonalPhilosophy';
import AchievementShowcase from '../components/common/AchievementShowcase';
import PersonalStory from '../components/common/PersonalStory';
import ExperienceMap from '../components/common/ExperienceMap';
import TechStackExplorer from '../components/common/TechStackExplorer';

const About: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, rgba(63, 94, 251, 0.1), rgba(252, 70, 107, 0.1))',
                borderRadius: 4,
                p: 6,
                mb: 8,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 3s infinite',
                },
                '@keyframes shimmer': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
              }}
            >
              <Box
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #3f5efb, #fc466b)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                About Me
              </Box>
              <Box
                component="p"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Dive deep into my journey, values, and the experiences that have shaped me as a developer and human being.
                Explore my skills, achievements, and the philosophy that drives my work.
              </Box>
            </Box>
          </motion.div>
        </Container>
      </motion.div>

      {/* Interactive Timeline */}
      <Box sx={{ bgcolor: 'background.default' }}>
        <InteractiveTimeline />
      </Box>

      {/* Personal Story */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <PersonalStory />
      </Box>

      {/* Experience Map */}
      <Box sx={{ bgcolor: 'background.default' }}>
        <ExperienceMap />
      </Box>

      {/* Personality Explorer */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <PersonalityExplorer />
      </Box>

      {/* Tech Stack Explorer */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <TechStackExplorer />
      </Box>

      {/* Skills Galaxy */}
      <Box sx={{ bgcolor: 'background.default' }}>
        <SkillsGalaxy />
      </Box>

      {/* Achievement Showcase */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <AchievementShowcase />
      </Box>

      {/* Personal Philosophy */}
      <Box sx={{ bgcolor: 'background.default' }}>
        <PersonalPhilosophy />
      </Box>
    </Box>
  );
};

export default About;
