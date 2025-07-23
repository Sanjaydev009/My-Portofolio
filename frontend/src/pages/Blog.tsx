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
import { blogService } from '../services/blog';
import { useQuery } from '@tanstack/react-query';
import type { BlogPost } from '../types';

// Import profile image
import profileImage from '../assets/images/sanju.jpg';

// Fallback mock data for when API is not available
const mockBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Building Modern Web Applications with React and TypeScript',
    slug: 'building-modern-web-apps-react-typescript',
    content: 'Explore the best practices for building scalable and maintainable web applications using React and TypeScript. Learn about component design patterns, state management, and performance optimization techniques.',
    excerpt: 'Learn how to build scalable web applications with React and TypeScript, covering best practices and modern development patterns.',
    author: {
      id: 'author1',
      name: 'Bandi Sanjay',
      email: 'sanjay.bandi@aurora.edu.in',
      role: 'admin',
      avatar: profileImage,
      bio: 'Full-stack developer passionate about modern web technologies',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    tags: ['React', 'TypeScript', 'Web Development', 'Frontend'],
    category: 'technology',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      caption: 'React and TypeScript',
      alt: 'React and TypeScript development setup',
    },
    status: 'published',
    featured: true,
    views: 1250,
    likes: [],
    comments: [],
    seo: {
      metaTitle: 'Building Modern Web Applications with React and TypeScript',
      metaDescription: 'Learn React and TypeScript best practices for building scalable web applications',
      keywords: ['React', 'TypeScript', 'Web Development'],
    },
    readTime: 8,
    publishedAt: new Date('2025-06-15'),
    createdAt: new Date('2025-06-10'),
    updatedAt: new Date('2025-06-15'),
  },
  {
    _id: '2',
    title: 'Mastering Node.js Backend Development',
    slug: 'mastering-nodejs-backend-development',
    content: 'Dive deep into Node.js backend development, covering Express.js, database integration, authentication, and API design principles for building robust server-side applications.',
    excerpt: 'Complete guide to Node.js backend development with Express.js, databases, and authentication systems.',
    author: {
      id: 'author1',
      name: 'Bandi Sanjay',
      email: 'sanjay.bandi@aurora.edu.in',
      role: 'admin',
      avatar: profileImage,
      bio: 'Full-stack developer passionate about modern web technologies',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    category: 'tutorial',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      caption: 'Node.js Backend Development',
      alt: 'Node.js server code',
    },
    status: 'published',
    featured: true,
    views: 980,
    likes: [],
    comments: [],
    seo: {
      metaTitle: 'Mastering Node.js Backend Development',
      metaDescription: 'Complete guide to Node.js backend development and API design',
      keywords: ['Node.js', 'Backend', 'API', 'Express'],
    },
    readTime: 12,
    publishedAt: new Date('2025-05-20'),
    createdAt: new Date('2025-05-15'),
    updatedAt: new Date('2025-05-20'),
  },
  {
    _id: '3',
    title: 'Database Design and MongoDB Best Practices',
    slug: 'database-design-mongodb-best-practices',
    content: 'Learn essential database design principles and MongoDB-specific best practices for building efficient and scalable data storage solutions.',
    excerpt: 'Essential guide to database design principles and MongoDB optimization techniques for scalable applications.',
    author: {
      id: 'author1',
      name: 'Bandi Sanjay',
      email: 'sanjay.bandi@aurora.edu.in',
      role: 'admin',
      avatar: profileImage,
      bio: 'Full-stack developer passionate about modern web technologies',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    tags: ['MongoDB', 'Database', 'NoSQL', 'Backend'],
    category: 'technology',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
      caption: 'Database Design',
      alt: 'Database schema visualization',
    },
    status: 'published',
    featured: false,
    views: 756,
    likes: [],
    comments: [],
    seo: {
      metaTitle: 'Database Design and MongoDB Best Practices',
      metaDescription: 'Learn database design and MongoDB optimization for scalable applications',
      keywords: ['MongoDB', 'Database', 'NoSQL', 'Design'],
    },
    readTime: 10,
    publishedAt: new Date('2025-04-10'),
    createdAt: new Date('2025-04-05'),
    updatedAt: new Date('2025-04-10'),
  },
  {
    _id: '4',
    title: 'Modern CSS Techniques and Responsive Design',
    slug: 'modern-css-techniques-responsive-design',
    content: 'Explore modern CSS features including Grid, Flexbox, CSS Custom Properties, and responsive design techniques for creating beautiful user interfaces.',
    excerpt: 'Master modern CSS techniques including Grid, Flexbox, and responsive design for beautiful web interfaces.',
    author: {
      id: 'author1',
      name: 'Bandi Sanjay',
      email: 'sanjay.bandi@aurora.edu.in',
      role: 'admin',
      avatar: profileImage,
      bio: 'Full-stack developer passionate about modern web technologies',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    tags: ['CSS', 'Responsive Design', 'Frontend', 'UI/UX'],
    category: 'tutorial',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      caption: 'Modern CSS Design',
      alt: 'CSS code on screen',
    },
    status: 'published',
    featured: false,
    views: 892,
    likes: [],
    comments: [],
    seo: {
      metaTitle: 'Modern CSS Techniques and Responsive Design',
      metaDescription: 'Learn modern CSS features and responsive design techniques',
      keywords: ['CSS', 'Responsive', 'Frontend', 'Design'],
    },
    readTime: 6,
    publishedAt: new Date('2025-03-25'),
    createdAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-25'),
  },
  {
    _id: '5',
    title: 'DevOps and Deployment Strategies',
    slug: 'devops-deployment-strategies',
    content: 'Learn about modern DevOps practices, CI/CD pipelines, containerization with Docker, and deployment strategies for web applications.',
    excerpt: 'Comprehensive guide to DevOps practices, CI/CD pipelines, and deployment strategies for modern web applications.',
    author: {
      id: 'author1',
      name: 'Bandi Sanjay',
      email: 'sanjay.bandi@aurora.edu.in',
      role: 'admin',
      avatar: profileImage,
      bio: 'Full-stack developer passionate about modern web technologies',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    tags: ['DevOps', 'CI/CD', 'Docker', 'Deployment'],
    category: 'technology',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80',
      caption: 'DevOps Pipeline',
      alt: 'CI/CD pipeline visualization',
    },
    status: 'published',
    featured: false,
    views: 654,
    likes: [],
    comments: [],
    seo: {
      metaTitle: 'DevOps and Deployment Strategies',
      metaDescription: 'Learn DevOps practices and deployment strategies for web applications',
      keywords: ['DevOps', 'CI/CD', 'Docker', 'Deployment'],
    },
    readTime: 15,
    publishedAt: new Date('2025-02-28'),
    createdAt: new Date('2025-02-25'),
    updatedAt: new Date('2025-02-28'),
  },
];

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  // DISABLED: API calls since we're using frontend-only mode
  // const { data: blogsResponse, isLoading, error } = useQuery({
  //   queryKey: ['blogs', { category, search: searchQuery }],
  //   queryFn: () => blogService.getBlogs({ 
  //     category: category === 'all' ? undefined : category, 
  //     search: searchQuery || undefined,
  //     limit: 20
  //   }),
  //   retry: 0, // Don't retry failed requests
  //   retryOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  // Use mock data instead of API response
  const blogPosts = mockBlogPosts;
  const isLoading = false;
  const error = null;

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
    if (!blogPosts) return [];
    const tags = blogPosts.flatMap((post: BlogPost) => post.tags || []);
    return Array.from(new Set(tags)).filter((tag): tag is string => typeof tag === 'string');
  }, [blogPosts]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  useEffect(() => {
    if (!blogPosts) return;

    let filtered = blogPosts.filter((post: BlogPost) => post.status === 'published');

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
  }, [blogPosts, searchQuery, selectedTags]);

  if (isLoading) {
    return <Loading message="Loading blog posts..." />;
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
