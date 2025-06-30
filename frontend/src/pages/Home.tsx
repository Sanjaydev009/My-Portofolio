import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/common/Hero';
import FeaturedProjects from '../components/common/FeaturedProjects';
import SkillsSection from '../components/common/SkillsSection';
import ContactSection from '../components/common/ContactSection';

const Home: React.FC = () => {
  return (
    <Box>
      <Hero />
      <FeaturedProjects />
      <SkillsSection />
      <ContactSection />
      
      {/* About Section */}
      {/* <AboutSection /> */}
      
      {/* Latest Blog Posts */}
      {/* <LatestBlogPosts /> */}
    </Box>
  );
};

export default Home;
