import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';

// Mock featured projects data
const featuredProjects: Project[] = [
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
];

const FeaturedProjects: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
          >
            Featured Projects
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
            A showcase of my recent work and technical expertise
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 4,
            mb: 6,
          }}
        >
          {featuredProjects.map((project, index) => (
            <Box key={project._id}>
              <ProjectCard project={project} index={index} />
            </Box>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/projects"
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 4,
                py: 1.5,
              }}
            >
              View All Projects
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeaturedProjects;
