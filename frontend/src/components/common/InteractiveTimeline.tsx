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
    date: '2025-02-15',
    title: '🌟 First Job at Heydu Services Pvt Ltd',
    description: 'Started my professional career as a Software Developer at Heydu Services. Eternally grateful to Srinivas Sir and Siddhartha for this incredible opportunity to grow and improve my skills.',
    category: 'work',
    location: 'Heydu Services Pvt Ltd',
    tags: ['First Job', 'Professional Career', 'Srinivas Sir', 'Siddhartha', 'Career Growth'],
    color: '#ec4899',
    details: {
      skills: ['Professional Development', 'Team Collaboration', 'Software Development', 'Problem Solving'],
      impact: 'Starting my professional journey in software development, contributing to real-world projects and learning from experienced mentors',
      links: [
        { label: 'Company Profile', url: 'https://www.linkedin.com/company/heydu-services-pvt-ltd/posts/?feedView=all' }
      ]
    }
  },
  {
    id: '2',
    date: 'Present',
    title: 'Internship at Heydu Services Pvt Ltd',
    description: 'Currently interning at Heydu Services Pvt Ltd, where I’m actively contributing to live projects while gaining hands-on experience in software development, team collaboration, and agile workflows.',
    category: 'work',
    location: 'Heydu Services Pvt Ltd',
    tags: ['Internship', 'Professional Training', 'Real Projects', 'Career Foundation'],
    color: '#8b5cf6',
    details: {
      skills: ['Professional Standards', 'Team Collaboration', 'Project Development', 'Industry Best Practices'],
      impact: 'Gained invaluable industry experience, learned professional development practices, and built foundation for career growth',
      links: [
        { label: 'Internship Experience', url: 'https://www.linkedin.com/company/heydu-services-pvt-ltd/posts/?feedView=all' }
      ]
    }
  },
  {
    id: '3',
    date: '2025-09',
    title: 'MCA Graduation - Aurora Deemed University',
    description: 'Successfully completed Master of Computer Applications from Aurora Deemed to be University, where I discovered my passion for software development.',
    category: 'education',
    location: 'Aurora Deemed to be University',
    tags: ['MCA', 'Post Graduate', 'Software Development', 'Aurora University'],
    color: '#f59e0b',
    details: {
      skills: ['Programming', 'Software Engineering', 'Database Management', 'Web Development'],
      impact: 'Gained comprehensive knowledge in computer applications and developed strong foundation in software development',
      links: [
        { label: 'University Profile', url: 'https://aurora.edu.in/' }
      ]
    }
  },
  {
    id: '4',
    date: '2023-08',
    title: '💻 First Code Written - HTML',
    description: 'Wrote my very first line of code in HTML during MCA program. That simple "Hello, World!" opened the door to the amazing world of programming.',
    category: 'achievement',
    location: 'College Lab',
    tags: ['First Code', 'HTML', 'Programming Journey', 'Learning Milestone'],
    color: '#10b981',
    details: {
      skills: ['HTML', 'Web Development Basics', 'Problem Solving', 'Learning Mindset'],
      impact: 'Discovered passion for coding and web development, marking the beginning of my programming journey',
      links: [
        { label: 'Learning Journey', url: '#coding' }
      ]
    }
  },
  {
    id: '5',
    date: '2025-06',
    title: 'Student Feedback Management System',
    description: 'Developed comprehensive MERN stack application with advanced features including email configuration, real-time analytics, and user management.',
    category: 'project',
    location: 'Academic Project',
    tags: ['MERN Stack', 'Email Integration', 'Full Stack', 'Database Design'],
    color: '#06b6d4',
    details: {
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Email Integration', 'Authentication'],
      impact: 'Built complex full-stack application demonstrating ability to handle real-world development challenges',
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Sanjaydev009/student-feedback-system' }
      ]
    }
  },
  {
    id: '6',
    date: '2023-11',
    title: 'MCA Program Started',
    description: 'Began Master of Computer Applications at Aurora Deemed to be University, diving deep into programming, software engineering, and computer science concepts.',
    category: 'education',
    location: 'Aurora Deemed to be University',
    tags: ['Higher Education', 'Computer Science', 'Skill Development'],
    color: '#ff9900',
    details: {
      skills: ['Programming Fundamentals', 'Data Structures', 'Software Engineering', 'Database Systems'],
      impact: 'Started intensive computer science education that would shape my career in software development',
    }
  },
  {
    id: '7',
    date: '2023-06',
    title: 'Bachelor Degree Completion',
    description: 'Completed Bachelor of Arts from Dr BR Ambedkar Open University, which provided flexibility to explore different areas of knowledge.',
    category: 'education',
    location: 'Dr BR Ambedkar Open University',
    tags: ['Bachelor Degree', 'BA', 'Distance Learning', 'Self-Discipline'],
    color: '#8b5cf6',
    details: {
      skills: ['Self-Directed Learning', 'Time Management', 'Independent Study', 'Academic Discipline'],
      impact: 'Developed strong self-discipline and independent learning skills through distance education',
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
