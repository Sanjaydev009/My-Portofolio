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

// Featured projects data - showcasing real work and technical expertise
const featuredProjects: Project[] = [
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
      github: 'https://github.com/Sanjaydev009',
    },
    category: 'web',
    status: 'in-progress',
    featured: true,
    priority: 0,
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
