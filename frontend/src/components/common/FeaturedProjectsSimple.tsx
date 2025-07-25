import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  IconButton,
  useTheme,
  alpha 
} from '@mui/material';
import { ArrowForward, Launch, GitHub } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '../../types';

// Featured projects data - top 3 projects from Projects.tsx
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

const FeaturedProjects = () => {
  const theme = useTheme();
  
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
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
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

        {/* Projects Grid */}
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
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: theme.shadows[12],
                    '& .project-image': {
                      transform: 'scale(1.05)',
                    },
                    '& .project-overlay': {
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Project Image */}
                {project.images && project.images.length > 0 && (
                  <Box
                    sx={{
                      height: 200,
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '4px 4px 0 0',
                    }}
                  >
                    <Box
                      className="project-image"
                      sx={{
                        height: '100%',
                        backgroundImage: `url(${project.images[0].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <Box
                      className="project-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.6)})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {project.links?.demo && (
                          <IconButton
                            component="a"
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'white',
                              backgroundColor: alpha(theme.palette.common.white, 0.2),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.common.white, 0.3),
                                transform: 'scale(1.1)',
                              },
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Launch />
                          </IconButton>
                        )}
                        {project.links?.github && (
                          <IconButton
                            component="a"
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'white',
                              backgroundColor: alpha(theme.palette.common.white, 0.2),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.common.white, 0.3),
                                transform: 'scale(1.1)',
                              },
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GitHub />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
                
                {/* Project Content */}
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 3,
                }}>
                  {/* Title and Status */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 'bold',
                        lineHeight: 1.3,
                        flex: 1,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Chip
                      label={project.status === 'completed' ? 'Completed' : 'In Progress'}
                      size="small"
                      color={project.status === 'completed' ? 'success' : 'warning'}
                      sx={{ ml: 1, flexShrink: 0 }}
                    />
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      mb: 3, 
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                    }}
                  >
                    {project.shortDescription || project.description}
                  </Typography>

                  {/* Technologies */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                    {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      />
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <Chip
                        label={`+${project.technologies.length - 4}`}
                        size="small"
                        variant="filled"
                        color="primary"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
                  borderWidth: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                    transition: 'left 0.6s',
                  },
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
              >
                View All Projects
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeaturedProjects;
