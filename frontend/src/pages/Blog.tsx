import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Fab,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import { Search, KeyboardArrowUp, FilterList } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BlogCard from '../components/common/BlogCard';
import Loading from '../components/common/Loading';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { blogService } from '../services/blog';
import { useQuery } from '@tanstack/react-query';
import type { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  const { data: blogsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => blogService.getBlogs(),
  });

  const posts = blogsResponse?.blogs || [];

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Get all unique tags
  const allTags = React.useMemo(() => {
    if (!posts) return [];
    const tags = posts.flatMap((post: BlogPost) => post.tags || []);
    return Array.from(new Set(tags)).filter((tag): tag is string => typeof tag === 'string');
  }, [posts]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  useEffect(() => {
    if (!posts) return;

    let filtered = posts.filter((post: BlogPost) => post.status === 'published');

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((post: BlogPost) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag: string) => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post: BlogPost) =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedTags]);

  if (isLoading) {
    return <Loading message="Loading blog posts..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ErrorBoundary
          message="Failed to load blog posts. Please try again."
          onRetry={refetch}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Blog
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Thoughts, insights, and tutorials on web development and technology
        </Typography>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Tags Filter */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FilterList sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" color="text.secondary">
                Filter by tags:
              </Typography>
              {selectedTags.length > 0 && (
                <Button
                  size="small"
                  onClick={() => setSelectedTags([])}
                  sx={{ ml: 2 }}
                >
                  Clear filters
                </Button>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                  color={selectedTags.includes(tag) ? 'primary' : 'default'}
                  onClick={() => handleTagToggle(tag)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {filteredPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No blog posts found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchQuery || selectedTags.length > 0
                ? 'Try adjusting your search criteria or filters'
                : 'No blog posts available yet'
              }
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredPosts.map((post, index) => (
              <Grid key={post._id} size={{ xs: 12, md: 6, lg: 4 }}>
                <BlogCard post={post} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>

      {/* Scroll to Top FAB */}
      <Zoom in={trigger}>
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Container>
  );
};

export default Blog;
