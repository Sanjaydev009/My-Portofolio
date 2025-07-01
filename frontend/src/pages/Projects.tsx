import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
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
    _id: '1',
    title: 'Feedback Management System',
    description: 'A full-stack feedback management system built with Next.js, Node.js, and MongoDB. Features include user authentication, feedback submission, and real-time feedback tracking for academics.',
    shortDescription: 'Full-stack feedback management system with real-time tracking',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
        caption: 'Homepage',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://demo.example.com',
      github: 'https://github.com/Sanjaydev009/student-feedback-system',
      website: 'https://feedback.example.com',
    },
    category: 'web',
    status: 'completed',
    featured: true,
    priority: 1,
    tags: ['Full-Stack', 'Feedback', 'Real-Time'],
    challenges: 'Implementing secure feedback submission and real-time tracking',
    solutions: 'Used Socket.io for real-time features and Next.js for server-side rendering',
    duration: '3 months',
    teamSize: 1,
    isPublic: true,
    views: 1250,
    likes: 89,
    createdAt: new Date('2025-04-15'),
    updatedAt: new Date('2025-07-20'),
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Firebase.',
    shortDescription: 'Collaborative task management with real-time updates',
    technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI', 'React DnD'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
        caption: 'Dashboard',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://taskapp.example.com',
      github: 'https://github.com/yourusername/taskapp',
    },
    category: 'web',
    status: 'completed',
    featured: true,
    priority: 2,
    tags: ['React', 'Firebase', 'Real-time'],
    challenges: 'Implementing smooth drag-and-drop with real-time synchronization',
    solutions: 'Used React DnD with Firebase real-time database for instant updates',
    duration: '2 months',
    teamSize: 1,
    isPublic: true,
    views: 980,
    likes: 67,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps. Features location-based weather data and customizable widgets.',
    shortDescription: 'Interactive weather dashboard with forecasts',
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API', 'PWA'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
        caption: 'Weather Dashboard',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://weather.example.com',
      github: 'https://github.com/yourusername/weather-dashboard',
    },
    category: 'web',
    status: 'completed',
    featured: true,
    priority: 3,
    tags: ['PWA', 'API Integration', 'Charts'],
    challenges: 'Creating responsive charts and handling offline functionality',
    solutions: 'Used Chart.js for visualizations and service workers for PWA features',
    duration: '1 month',
    teamSize: 1,
    isPublic: true,
    views: 756,
    likes: 45,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-30'),
  },
  {
    _id: '4',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Built with MERN stack.',
    shortDescription: 'Full-stack e-commerce platform with payments',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=800&q=80',
        caption: 'Product Page',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://ecommerce.example.com',
      github: 'https://github.com/yourusername/ecommerce',
    },
    category: 'web',
    status: 'completed',
    featured: false,
    priority: 4,
    tags: ['E-commerce', 'Payments', 'MERN'],
    challenges: 'Implementing secure payment processing and inventory management',
    solutions: 'Used Stripe for payments and MongoDB for scalable data storage',
    duration: '4 months',
    teamSize: 2,
    isPublic: true,
    views: 1580,
    likes: 124,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-05-10'),
  },
  {
    _id: '5',
    title: 'Mobile Fitness App',
    description: 'A React Native fitness tracking app with workout plans, progress tracking, and social features. Includes nutrition tracking and goal setting.',
    shortDescription: 'Mobile fitness tracking with social features',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Node.js'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
        caption: 'Workout Screen',
        isMain: true,
      },
    ],
    links: {
      demo: 'https://fitness.example.com',
      github: 'https://github.com/yourusername/fitness-app',
    },
    category: 'mobile',
    status: 'completed',
    featured: false,
    priority: 5,
    tags: ['Mobile', 'Fitness', 'Social'],
    challenges: 'Creating smooth animations and offline data synchronization',
    solutions: 'Used Redux Persist for offline storage and Lottie for animations',
    duration: '5 months',
    teamSize: 1,
    isPublic: true,
    views: 892,
    likes: 76,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-01-15'),
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
  
  const { data: projectsResponse, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getProjects(),
    retry: 0, // Don't retry failed requests
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Always use fallback data if API fails or returns no data
  const projects = (projectsResponse?.projects && projectsResponse.projects.length > 0) 
    ? projectsResponse.projects 
    : mockProjects;

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

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
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
            <Grid container spacing={4}>
              {filteredProjects.map((project, projectIndex) => (
                <Grid key={project._id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <ProjectCard project={project} index={projectIndex} />
                </Grid>
              ))}
            </Grid>
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
