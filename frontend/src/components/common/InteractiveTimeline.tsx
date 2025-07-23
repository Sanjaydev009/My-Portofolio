import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  WorkOutlined,
  SchoolOutlined,
  EmojiEventsOutlined,
  FavoriteOutlined,
  TravelExploreOutlined,
  CodeOutlined,
  PlayArrow,
  Pause,
} from '@mui/icons-material';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'work' | 'education' | 'achievement' | 'personal' | 'travel' | 'project';
  location?: string;
  tags: string[];
  image?: string;
  color: string;
  details?: {
    skills?: string[];
    impact?: string;
    links?: { label: string; url: string }[];
  };
}

const timelineData: TimelineEvent[] = [
  {
    id: '1',
    date: '2025-04',
    title: 'Advanced Portfolio Website Development',
    description: 'Built comprehensive portfolio website showcasing skills, projects, and achievements using modern web technologies.',
    category: 'project',
    location: 'Personal Project',
    tags: ['React', 'TypeScript', 'Material-UI', 'Performance Optimization'],
    color: '#ec4899',
    details: {
      skills: ['React', 'TypeScript', 'Responsive Design', 'Performance Optimization'],
      impact: 'Created professional online presence showcasing technical skills with 95/100 performance score',
      links: [
        { label: 'Live Portfolio', url: 'https://sanjay-portfolio.vercel.app' },
        { label: 'Source Code', url: 'https://github.com/Sanjaydev009/My-Portofolio' }
      ]
    }
  },
  {
    id: '2',
    date: '2025-02',
    title: '6 Months Full Stack Internship at Heydu Services',
    description: 'Completed advanced internship working on production-level projects and mentoring junior developers.',
    category: 'work',
    location: 'Heydu Services Pvt Ltd',
    tags: ['Full Stack Development', 'MERN Stack', 'Team Leadership', 'Mentoring'],
    color: '#8b5cf6',
    details: {
      skills: ['Team Leadership', 'Production Systems', 'Mentoring', 'MERN Stack'],
      impact: 'Led development initiatives, mentored junior developers, and contributed to multiple production applications',
      links: [
        { label: 'Company Profile', url: '#company' }
      ]
    }
  },
  {
    id: '3',
    date: '2024-03',
    title: 'First Rank in MCA Academics',
    description: 'Achieved first rank among all MCA students, recognized for outstanding academic performance and dedication.',
    category: 'achievement',
    location: 'University',
    tags: ['Academic Excellence', 'First Rank', 'University Recognition'],
    color: '#f59e0b',
    details: {
      skills: ['Academic Leadership', 'Problem Solving', 'Research'],
      impact: 'Recognized by university for exceptional academic performance with 9.2/10 CGPA',
      links: [
        { label: 'Achievement Certificate', url: '#achievement' }
      ]
    }
  },
  {
    id: '4',
    date: '2024-01',
    title: 'Master of Computer Applications (MCA)',
    description: 'Completed MCA with first rank, demonstrating academic excellence and deep understanding of computer science concepts.',
    category: 'education',
    location: 'University',
    tags: ['Post Graduate Degree', 'Computer Science', 'Software Engineering'],
    color: '#ff9900',
    details: {
      skills: ['Software Engineering', 'Database Management', 'Advanced Programming'],
      impact: 'Gained comprehensive theoretical knowledge and practical skills in advanced computer science topics with 9.2/10 CGPA',
      links: [
        { label: 'Academic Certificate', url: '#certificate' }
      ]
    }
  },
  {
    id: '5',
    date: '2024-06',
    title: '3 Months Internship at Edu-versity',
    description: 'Completed first professional internship gaining real-world development experience and industry best practices.',
    category: 'work',
    location: 'Edu-versity',
    tags: ['Internship', 'Professional Growth', 'Web Development'],
    color: '#06b6d4',
    details: {
      skills: ['Professional Development', 'Team Collaboration', 'Industry Experience'],
      impact: 'Gained valuable industry experience, learned professional development practices, and built confidence in teamwork',
      links: [
        { label: 'Internship Certificate', url: '#internship' }
      ]
    }
  },
  {
    id: '6',
    date: '2023-12',
    title: 'Student Feedback Management System',
    description: 'Developed comprehensive feedback management system with advanced features like real-time analytics and dashboard.',
    category: 'project',
    location: 'Academic Project',
    tags: ['MERN Stack', 'Real-time Analytics', 'System Design'],
    color: '#10b981',
    details: {
      skills: ['MERN Stack', 'Real-time Analytics', 'Dashboard Development', 'User Management'],
      impact: 'Successfully deployed complex system demonstrating ability to handle large-scale application development with 500+ users supported',
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Sanjaydev009/student-feedback-system' },
        { label: 'Live Demo', url: '#demo' }
      ]
    }
  },
  {
    id: '7',
    date: '2022-09',
    title: 'Full Stack Development Transition',
    description: 'Expanded skillset to backend technologies including Node.js, Express.js, MongoDB, and API development.',
    category: 'achievement',
    location: 'Self Learning',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Full Stack'],
    color: '#8b5cf6',
    details: {
      skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Backend Development'],
      impact: 'Became a full-stack developer capable of building end-to-end web applications independently',
      links: [
        { label: 'Portfolio Projects', url: '#projects' }
      ]
    }
  },
  {
    id: '8',
    date: '2022-03',
    title: 'React Framework Specialization',
    description: 'Specialized in React.js ecosystem including hooks, state management, routing, and modern development patterns.',
    category: 'achievement',
    location: 'Self Learning',
    tags: ['React.js', 'Hooks', 'State Management', 'Component Architecture'],
    color: '#06b6d4',
    details: {
      skills: ['React.js', 'Hooks', 'State Management', 'Component Architecture', 'SPA Development'],
      impact: 'Became proficient in building modern, interactive web applications with component-based architecture',
      links: [
        { label: 'React Projects', url: '#react-projects' }
      ]
    }
  },
  {
    id: '9',
    date: '2021-08',
    title: 'JavaScript & Programming Logic',
    description: 'Mastered JavaScript fundamentals, ES6+ features, and developed strong programming logic and problem-solving skills.',
    category: 'achievement',
    location: 'Self Learning',
    tags: ['JavaScript', 'ES6+', 'Problem Solving', 'Programming Logic'],
    color: '#f59e0b',
    details: {
      skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming', 'Problem Solving'],
      impact: 'Built solid foundation in programming concepts, algorithms, and modern JavaScript development practices',
      links: [
        { label: 'JavaScript Projects', url: '#js-projects' }
      ]
    }
  },
  {
    id: '10',
    date: '2021-01',
    title: 'Started Programming Journey',
    description: 'Began coding journey with curiosity about how websites and applications work, starting with basic HTML and CSS.',
    category: 'personal',
    location: 'Self Learning',
    tags: ['HTML', 'CSS', 'Web Development', 'Learning'],
    color: '#10b981',
    details: {
      skills: ['HTML', 'CSS', 'Web Development', 'Foundation Building'],
      impact: 'Discovered passion for web development and decided to pursue computer science as a career path',
      links: [
        { label: 'First Projects', url: '#first-projects' }
      ]
    }
  }
];

const categoryIcons = {
  work: WorkOutlined,
  education: SchoolOutlined,
  achievement: EmojiEventsOutlined,
  personal: FavoriteOutlined,
  travel: TravelExploreOutlined,
  project: CodeOutlined,
};

const InteractiveTimeline: React.FC = () => {
  const theme = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timelineData.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId);
    setIsPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box ref={ref} sx={{ py: 8, px: 2 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            My Journey
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Explore the milestones that shaped my path
          </Typography>
          
          {/* Auto-play control */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={toggleAutoPlay}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Typography variant="body2" sx={{ alignSelf: 'center' }}>
              {isPlaying ? 'Auto-playing' : 'Click to auto-play'}
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Timeline */}
      <Box sx={{ position: 'relative', maxWidth: 1200, mx: 'auto' }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 4,
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            transform: 'translateX(-50%)',
            borderRadius: 2,
            zIndex: 0,
          }}
        />

        {/* Timeline events */}
        {timelineData.map((event, index) => {
          const IconComponent = categoryIcons[event.category];
          const isLeft = index % 2 === 0;
          const isSelected = selectedEvent === event.id;
          const isHighlighted = isPlaying && currentIndex === index;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 6,
                  flexDirection: isLeft ? 'row' : 'row-reverse',
                }}
              >
                {/* Event card */}
                <Box sx={{ width: '45%', px: 2 }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: `2px solid ${
                          isHighlighted || isSelected 
                            ? event.color 
                            : 'transparent'
                        }`,
                        boxShadow: isHighlighted || isSelected
                          ? `0 8px 32px ${alpha(event.color, 0.3)}`
                          : theme.shadows[2],
                        '&:hover': {
                          boxShadow: `0 8px 32px ${alpha(event.color, 0.2)}`,
                          transform: 'translateY(-4px)',
                        },
                      }}
                      onClick={() => handleEventClick(event.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <IconComponent
                            sx={{
                              color: event.color,
                              mr: 1,
                              fontSize: 24,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              color: event.color,
                            }}
                          >
                            {event.title}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {event.date} {event.location && `• ${event.location}`}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {event.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {event.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: alpha(event.color, 0.1),
                                color: event.color,
                                borderColor: event.color,
                                variant: 'outlined',
                              }}
                            />
                          ))}
                        </Box>

                        {/* Expanded details */}
                        <AnimatePresence>
                          {isSelected && event.details && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(event.color, 0.2)}` }}>
                                {event.details.skills && (
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                      Key Skills:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {event.details.skills.map((skill) => (
                                        <Chip
                                          key={skill}
                                          label={skill}
                                          size="small"
                                          variant="filled"
                                          sx={{ bgcolor: alpha(event.color, 0.2) }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                                
                                {event.details.impact && (
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                      Impact:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {event.details.impact}
                                    </Typography>
                                  </Box>
                                )}
                                
                                {event.details.links && (
                                  <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                      Links:
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                      {event.details.links.map((link) => (
                                        <Chip
                                          key={link.label}
                                          label={link.label}
                                          clickable
                                          size="small"
                                          sx={{
                                            bgcolor: event.color,
                                            color: 'white',
                                            '&:hover': {
                                              bgcolor: alpha(event.color, 0.8),
                                            },
                                          }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle link click
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Box>

                {/* Timeline node */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isHighlighted || isSelected ? 1.3 : 1,
                      backgroundColor: isHighlighted || isSelected ? event.color : theme.palette.background.paper,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: theme.palette.background.paper,
                        border: `4px solid ${event.color}`,
                        boxShadow: `0 0 0 4px ${alpha(event.color, 0.2)}`,
                      }}
                    />
                  </motion.div>
                </Box>

                {/* Empty space for the other side */}
                <Box sx={{ width: '45%' }} />
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default InteractiveTimeline;
