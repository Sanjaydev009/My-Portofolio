import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Fab,
  useScrollTrigger,
  Zoom,
  useTheme,
  alpha,
} from '@mui/material';
import { Search, KeyboardArrowUp, Rocket, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProjectCard from '../components/common/ProjectCard';
import Loading from '../components/common/Loading';
import ProfessionalGrid from '../components/common/ProfessionalGrid';
// import { useProjects } from '../hooks';
import { projectService } from '../services/projects';
import { useQuery } from '@tanstack/react-query';
import type { Project } from '../types';
import { useResponsive, getResponsiveSpacing, getResponsiveTypography, getResponsiveLayout } from '../utils/responsive';
import { useMediaQuery, useResponsiveColumns, useResponsiveContainer, useResponsivePadding } from '../hooks/useMediaQuery';

// Fallback mock data for when API is not available
const mockProjects: Project[] = [
  {
    _id: '0',
    title: '🌟 Heydu Services - Professional Experience',
    description: 'Real-time hands-on experience at Heydu Services Pvt Ltd, where I contributed to live production projects and gained invaluable industry experience. Working with experienced mentors Srinivas Sir and Siddhartha, I developed professional coding standards, learned agile methodologies, and contributed to client-facing applications that serve real users.',
    shortDescription: 'Professional development experience with real-world project contributions',
    technologies: ['React', 'Node.js', 'JavaScript', 'Professional Development', 'Agile', 'Team Collaboration'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        caption: 'Professional Team Environment',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://heydu.biz/',
      github: 'https://github.com/Sanjaydev009', // Your GitHub profile as you contributed to their projects
    },
    category: 'web',
    status: 'in-progress', // Since you're currently working there
    featured: true,
    priority: 0, // Highest priority to show first
    tags: ['Professional Experience', 'Real-time Projects', 'Industry Standards', 'Team Collaboration', 'Mentorship'],
    challenges: 'Adapting to professional development standards, working on live client projects, and meeting production deadlines',
    solutions: 'Learned industry best practices, collaborated effectively with senior developers, and contributed to scalable applications',
    duration: 'Ongoing since 2024',
    teamSize: 5,
    isPublic: true,
    views: 2500,
    likes: 125,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2025-07-23'),
  },
  {
    _id: '2',
    title: 'Student Feedback Management System',
    description: 'A comprehensive feedback management system built with MERN Stack featuring user authentication, feedback submission, real-time analytics dashboard, and mail configuration for notifications. Designed for academic institutions to streamline feedback collection and management processes.',
    shortDescription: 'MERN Stack feedback system with mail configuration and analytics',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Nodemailer', 'Material-UI'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
        caption: 'Feedback Dashboard',
        isMain: true,
      },
    ],
    links: {
      github: 'https://github.com/Sanjaydev009/student-feedback-system',
    },
    category: 'web',
    status: 'completed',
    featured: true,
    priority: 1,
    tags: ['Full-Stack', 'MERN', 'Authentication', 'Email Integration', 'Analytics'],
    challenges: 'Implementing real-time feedback analytics and secure email notifications',
    solutions: 'Used Socket.io for real-time features and Nodemailer for automated email system',
    duration: '4 months',
    teamSize: 1,
    isPublic: true,
    views: 1250,
    likes: 89,
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    _id: '3',
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and TypeScript, featuring interactive components, smooth animations, achievement showcase, blog system, and contact form with EmailJS integration. Optimized for performance with code splitting and lazy loading.',
    shortDescription: 'Modern portfolio with interactive components and performance optimization',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Framer Motion', 'EmailJS', 'Vite'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
        caption: 'Portfolio Homepage',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://sanjay-portfolio.vercel.app',
      github: 'https://github.com/Sanjaydev009/My-Portofolio',
    },
    category: 'web',
    status: 'completed',
    featured: true,
    priority: 2,
    tags: ['React', 'TypeScript', 'Portfolio', 'Responsive Design', 'Performance'],
    challenges: 'Creating smooth animations and optimizing bundle size for better performance',
    solutions: 'Used Framer Motion for animations and Vite with code splitting for optimization',
    duration: '3 months',
    teamSize: 1,
    isPublic: true,
    views: 2100,
    likes: 156,
    createdAt: new Date('2025-04-01'),
    updatedAt: new Date('2025-07-23'),
  },
  {
    _id: '4',
    title: 'Image Caption Generator using CNN',
    description: 'A deep learning project that automatically generates descriptive captions for images using Convolutional Neural Networks (CNN) and Natural Language Processing. Built with TensorFlow and trained on large image datasets to understand visual content and generate human-like descriptions.',
    shortDescription: 'AI-powered image captioning using CNN and deep learning',
    technologies: ['Python', 'TensorFlow', 'Keras', 'CNN', 'LSTM', 'OpenCV', 'NumPy'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
        caption: 'AI Image Processing',
        isMain: true,
      },
    ],
    links: {
      github: 'https://github.com/Sanjaydev009/Image-Caption-Generator-CNN',
    },
    category: 'other',
    status: 'completed',
    featured: true,
    priority: 3,
    tags: ['AI/ML', 'Deep Learning', 'Computer Vision', 'NLP', 'CNN'],
    challenges: 'Training CNN model for accurate image feature extraction and caption generation',
    solutions: 'Used transfer learning with pre-trained models and LSTM for sequence generation',
    duration: '2 months',
    teamSize: 1,
    isPublic: true,
    views: 890,
    likes: 78,
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-10-20'),
  },
  {
    _id: '5',
    title: 'College Website',
    description: 'A professional college website built with React featuring course information, faculty profiles, admission details, student portal, and event management. Designed with modern UI/UX principles for better user engagement and responsive design across all devices.',
    shortDescription: 'Professional college website with comprehensive features',
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Bootstrap', 'React Router'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
        caption: 'College Campus',
        isMain: true,
      },
    ],
    links: {
      github: 'https://github.com/Sanjaydev009/college',
    },
    category: 'web',
    status: 'completed',
    featured: false,
    priority: 4,
    tags: ['React', 'Educational', 'Responsive', 'UI/UX'],
    challenges: 'Creating user-friendly navigation and organizing large amounts of college information',
    solutions: 'Implemented intuitive navigation structure and responsive design with Bootstrap',
    duration: '2 months',
    teamSize: 1,
    isPublic: true,
    views: 640,
    likes: 42,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-08-15'),
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`projects-tabpanel-${index}`}
      aria-labelledby={`projects-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: { xs: 3, lg: 4, xl: 5 } }}>{children}</Box>}
    </div>
  );
}

const Projects: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  const theme = useTheme();
  const responsive = useResponsive();
  const typography = getResponsiveTypography();
  const layout = getResponsiveLayout();
  const spacing = getResponsiveSpacing(theme);
  
  // New responsive hooks
  const columns = useResponsiveColumns();
  const containerWidth = useResponsiveContainer();
  const padding = useResponsivePadding();
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');
  
  // DISABLED: API call since we're using frontend-only mode
  // const { data: projectsResponse, isLoading } = useQuery({
  //   queryKey: ['projects'],
  //   queryFn: () => projectService.getProjects(),
  //   retry: 0, // Don't retry failed requests
  //   retryOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  // Use mock data instead of API response
  const projects = mockProjects;
  const isLoading = false;

  const categories = ['all', 'web', 'mobile', 'desktop', 'api', 'other'];
  
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

  useEffect(() => {
    if (!projects) return;

    let filtered = projects;

    // Filter by category
    if (tabValue > 0) {
      const selectedCategory = categories[tabValue];
      filtered = filtered.filter((project: Project) => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((project: Project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech: string) => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, tabValue, searchQuery]);

  if (isLoading) {
    return <Loading message="Loading projects..." />;
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

        {/* Floating Code Elements */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '40px',
            height: '40px',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.12)})`,
            borderRadius: '20% 80% 20% 80%',
            filter: 'blur(1px)',
          }}
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            rotate: [0, -120, -240],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            bottom: '25%',
            right: '8%',
            width: '55px',
            height: '55px',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})`,
            borderRadius: '50%',
            filter: 'blur(2px)',
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '30%',
            right: '12%',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(45px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 8,
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '8%',
            width: '240px',
            height: '240px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(55px)',
          }}
        />

        {/* Tech Pattern Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 25% 75%, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, ${alpha(theme.palette.secondary.main, 0.04)} 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, ${alpha(theme.palette.info.main, 0.02)} 0%, transparent 50%)
            `,
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Professional Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ 
              textAlign: 'center', 
              mb: { xs: 6, sm: 8, md: 10, lg: 12 },
              px: { xs: 2, sm: 0 }
            }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: { xs: 1.5, sm: 2 }, 
              mb: { xs: 2, sm: 3 },
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Rocket sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
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
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  textAlign: 'center'
                }}
              >
                My Projects
              </Typography>
            </Box>
            
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: { xs: 4, sm: 5, md: 6 },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                px: { xs: 2, sm: 0 }
              }}
            >
              A collection of projects that showcase my skills, creativity, and passion for building amazing digital experiences.
              Each project represents a unique challenge and learning opportunity.
            </Typography>

            {/* Project Stats */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 4, md: 6 }
            }}>
              {[
                { label: 'Total Projects', value: filteredProjects.length.toString(), icon: '🚀' },
                { label: 'Technologies', value: '15+', icon: '⚡' },
                { label: 'Lines of Code', value: '25K+', icon: '💻' },
                { label: 'Experience', value: '1+ Years', icon: '⭐' },
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

        {/* Professional Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box 
            sx={{ 
              mb: { xs: 6, sm: 8, md: 10 },
              p: { xs: 3, sm: 4 },
              mx: { xs: 0, sm: 2 },
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search projects by name, technology, or description..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
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

            <Tabs
              value={tabValue}
              onChange={(_: React.SyntheticEvent, newValue: number) => setTabValue(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  borderRadius: 2,
                  mr: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  },
                  '&.Mui-selected': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'white',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              {categories.map((category, index) => (
                <Tab
                  key={category}
                  label={category === 'all' ? 'All Projects' : category}
                  id={`projects-tab-${index}`}
                  aria-controls={`projects-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Projects Grid with Professional Cards */}
        {categories.map((category, index) => (
          <TabPanel key={category} value={tabValue} index={index}>
            {filteredProjects.length === 0 ? (
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
                  <Typography variant="h3">🔍</Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '1.25rem', lg: '1.5rem' },
                    mb: 1
                  }}
                >
                  No projects found
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mt: 1,
                    fontSize: { xs: '0.875rem', lg: '1rem' }
                  }}
                >
                  {searchQuery 
                    ? 'Try adjusting your search criteria' 
                    : 'No projects available in this category'
                  }
                </Typography>
              </Box>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Box 
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: { xs: 3, sm: 4, md: 5, lg: 6 },
                  }}
                >
                  {filteredProjects.map((project, projectIndex) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <ProjectCard project={project} index={projectIndex} />
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            )}
          </TabPanel>
        ))}

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

export default Projects;
