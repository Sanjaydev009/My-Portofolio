import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BlogSection from '../components/blog/BlogSection';

const BlogPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <BlogSection />
      </Box>
      <Footer />
    </Box>
  );
};

export default BlogPage;
