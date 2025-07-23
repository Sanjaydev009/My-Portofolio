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
} from '@mui/material';
import { Search, KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProjectCard from '../components/common/ProjectCard';
import Loading from '../components/common/Loading';
// import { useProjects } from '../hooks';
import { projectService } from '../services/projects';
import { useQuery } from '@tanstack/react-query';
import type { Project } from '../types';

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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Projects: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
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
          My Projects
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
          A collection of projects that showcase my skills and passion for development
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
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Tabs
            value={tabValue}
            onChange={(_: React.SyntheticEvent, newValue: number) => setTabValue(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                textTransform: 'capitalize',
                minWidth: 'auto',
                px: 3,
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

      {/* Projects Grid */}
      {categories.map((category, index) => (
        <TabPanel key={category} value={tabValue} index={index}>
          {filteredProjects.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No projects found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {searchQuery 
                  ? 'Try adjusting your search criteria' 
                  : 'No projects available in this category'
                }
              </Typography>
            </Box>
          ) : (
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  md: 'repeat(2, 1fr)', 
                  lg: 'repeat(3, 1fr)' 
                },
                gap: 4 
              }}
            >
              {filteredProjects.map((project, projectIndex) => (
                <Box key={project._id}>
                  <ProjectCard project={project} index={projectIndex} />
                </Box>
              ))}
            </Box>
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

export default Projects;
