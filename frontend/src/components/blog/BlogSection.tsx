import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Tabs, 
  Tab,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import { Search, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import ProfessionalGrid from '../common/ProfessionalGrid';

// Sample blog data - replace this with your actual data source
const blogPosts = [
  {
    id: 1,
    title: 'Building Responsive Web Applications with React and Material UI',
    excerpt: 'Learn how to create beautiful, responsive web applications using React and Material UI that adapt to any screen size.',
    imageUrl: '/images/blog/responsive-design.jpg',
    date: 'July 15, 2025',
    author: 'Sanjay Bandi',
    tags: ['React', 'Material UI', 'Responsive Design'],
    slug: 'building-responsive-web-applications',
    category: 'Development'
  },
  {
    id: 2,
    title: 'Getting Started with TypeScript in React Projects',
    excerpt: 'A comprehensive guide to integrating TypeScript into your React projects for better type safety and developer experience.',
    imageUrl: '/images/blog/typescript.jpg',
    date: 'June 28, 2025',
    author: 'Sanjay Bandi',
    tags: ['TypeScript', 'React', 'JavaScript'],
    slug: 'getting-started-with-typescript',
    category: 'Development'
  },
  {
    id: 3,
    title: 'Modern State Management with React Context and Hooks',
    excerpt: 'Discover how to effectively manage state in React applications using Context API and custom hooks.',
    imageUrl: '/images/blog/state-management.jpg',
    date: 'June 10, 2025',
    author: 'Sanjay Bandi',
    tags: ['React', 'State Management', 'Hooks'],
    slug: 'modern-state-management',
    category: 'Development'
  },
  {
    id: 4,
    title: 'Optimizing Frontend Performance: Advanced Techniques',
    excerpt: 'Learn advanced optimization techniques to make your frontend applications blazing fast and deliver a better user experience.',
    imageUrl: '/images/blog/performance.jpg',
    date: 'May 22, 2025',
    author: 'Sanjay Bandi',
    tags: ['Performance', 'Optimization', 'Web Development'],
    slug: 'optimizing-frontend-performance',
    category: 'Performance'
  },
  {
    id: 5,
    title: 'Building Accessible Web Applications: A Practical Guide',
    excerpt: 'A guide to creating web applications that are accessible to all users, including those with disabilities.',
    imageUrl: '/images/blog/accessibility.jpg',
    date: 'May 5, 2025',
    author: 'Sanjay Bandi',
    tags: ['Accessibility', 'Web Development', 'Inclusive Design'],
    slug: 'building-accessible-web-applications',
    category: 'Accessibility'
  },
  {
    id: 6,
    title: 'Serverless Architecture for Modern Web Applications',
    excerpt: 'Discover how serverless architectures can simplify development and reduce operational costs for modern web applications.',
    imageUrl: '/images/blog/serverless.jpg',
    date: 'April 18, 2025',
    author: 'Sanjay Bandi',
    tags: ['Serverless', 'Architecture', 'Cloud Computing'],
    slug: 'serverless-architecture',
    category: 'Architecture'
  }
];

// All unique categories from blog posts
const allCategories = ['All', ...new Set(blogPosts.map(post => post.category))];

const BlogSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: 'background.default',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Professional Grid Pattern */}
      <ProfessionalGrid intensity="light" animated zIndex={0} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 1
            }}
          >
            Blog & Insights
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            paragraph
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mb: 5
            }}
          >
            Thoughts, tutorials, and insights on web development, 
            programming best practices, and the latest tech trends.
          </Typography>
        </motion.div>

        {/* Search and Filter Section */}
        <Box 
          sx={{ 
            mb: 6,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2
          }}
        >
          <TextField
            placeholder="Search articles..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ 
              maxWidth: { xs: '100%', md: '350px' },
              backgroundColor: 'background.paper',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <Tabs 
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ 
              minHeight: '40px',
              '.MuiTab-root': {
                minHeight: '40px',
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }
            }}
          >
            {allCategories.map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category} 
              />
            ))}
          </Tabs>
        </Box>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <Grid container spacing={4}>
            {filteredPosts.map((post) => (
              <Box key={post.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' }, mb: 4 }}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  date={post.date}
                  author={post.author}
                  tags={post.tags}
                  slug={post.slug}
                />
              </Box>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No articles found matching your search.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
        
        {/* More Articles Button */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained" 
            color="primary" 
            endIcon={<ArrowForward />}
            href="/blog"
            sx={{ 
              borderRadius: 2, 
              py: 1, 
              px: 4,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Browse All Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogSection;
