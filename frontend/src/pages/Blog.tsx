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
  useTheme,
  alpha,
} from '@mui/material';
import { Search, KeyboardArrowUp, FilterList, Article, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BlogCard from '../components/common/BlogCard';
import Loading from '../components/common/Loading';
import ProfessionalGrid from '../components/common/ProfessionalGrid';
import { blogService } from '../services/blog';
import { useQuery } from '@tanstack/react-query';
import type { BlogPost } from '../types';
import { useResponsive, getResponsiveSpacing, getResponsiveTypography, getResponsiveLayout } from '../utils/responsive';
import { useResponsiveColumns, useResponsiveContainer, useResponsivePadding } from '../hooks/useMediaQuery';

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
  
  const theme = useTheme();
  const responsive = useResponsive();
  const spacing = getResponsiveSpacing(theme);
  const typography = getResponsiveTypography();
  const layout = getResponsiveLayout();
  const columns = useResponsiveColumns();
  const containerWidth = useResponsiveContainer();
  const padding = useResponsivePadding();
  
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

        {/* Floating Article Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: '12%',
            left: '6%',
            width: '35px',
            height: '35px',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
            borderRadius: '15% 85% 15% 85%',
            filter: 'blur(1px)',
          }}
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -12, 0],
            rotate: [0, -90, -180],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '10%',
            width: '45px',
            height: '45px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.12)})`,
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
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '35%',
            right: '15%',
            width: '160px',
            height: '160px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.09)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(35px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 7,
          }}
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.07)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(45px)',
          }}
        />

        {/* Content Pattern Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 30% 70%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%),
              radial-gradient(circle at 45% 45%, ${alpha(theme.palette.info.main, 0.03)} 0%, transparent 50%)
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
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Article sx={{ fontSize: '1.5rem' }} />
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
                Blog
              </Typography>
            </Box>
            
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              Thoughts, insights, and tutorials on web development, technology trends, and my journey as a developer.
              Sharing knowledge and experiences with the community.
            </Typography>

            {/* Blog Stats */}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
              {[
                { label: 'Total Posts', value: filteredPosts.length.toString(), icon: '📚' },
                { label: 'Categories', value: allTags.length.toString(), icon: '🏷️' },
                { label: 'Total Views', value: '10K+', icon: '👁️' },
                { label: 'Monthly Readers', value: '500+', icon: '📖' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      minWidth: '120px',
                      transition: 'all 0.3s ease',
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
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}>
                      {stat.icon} {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Professional Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box 
            sx={{ 
              mb: { xs: 8, md: 10 },
              p: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search blog posts by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.8),
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
              }}
            />

            {/* Enhanced Tags Filter */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                <FilterList sx={{ color: 'primary.main' }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary'
                  }}
                >
                  Filter by Topics
                </Typography>
                {selectedTags.length > 0 && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSelectedTags([])}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Clear ({selectedTags.length})
                  </Button>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {allTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                    onClick={() => handleTagToggle(tag)}
                    sx={{ 
                      cursor: 'pointer',
                      fontWeight: 600,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      ...(selectedTags.includes(tag) 
                        ? {
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            color: 'white',
                            '&:hover': {
                              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                            },
                          }
                        : {
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              background: alpha(theme.palette.primary.main, 0.1),
                            },
                          }
                      ),
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Blog Posts Grid with Professional Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredPosts.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: { xs: 8, md: 12 },
              px: { xs: 2, lg: 4 }
            }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Typography variant="h3">📝</Typography>
              </Box>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '1.25rem', lg: '1.5rem' },
                  mb: 1
                }}
              >
                No blog posts found
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 1,
                  fontSize: { xs: '0.875rem', lg: '1rem' }
                }}
              >
                {searchQuery || selectedTags.length > 0
                  ? 'Try adjusting your search criteria or filters'
                  : 'No blog posts available yet'
                }
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: { xs: 3, sm: 4, md: 5, lg: 6 },
              }}
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <BlogCard post={post} index={index} />
                </motion.div>
              ))}
            </Box>
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
              bottom: { xs: 16, lg: 24 },
              right: { xs: 16, lg: 24 },
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Blog;
