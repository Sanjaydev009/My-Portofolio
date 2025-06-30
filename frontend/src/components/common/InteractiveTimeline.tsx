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
    date: '2024',
    title: 'Senior Full Stack Developer',
    description: 'Leading development of scalable web applications using modern technologies.',
    category: 'work',
    location: 'Tech Company',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    color: '#4f46e5',
    details: {
      skills: ['Team Leadership', 'System Architecture', 'Performance Optimization'],
      impact: 'Improved application performance by 40% and reduced load times significantly',
      links: [
        { label: 'Portfolio', url: '#projects' },
        { label: 'LinkedIn', url: '#' }
      ]
    }
  },
  {
    id: '2',
    date: '2023',
    title: 'Hackathon Winner',
    description: 'Won first place in National Coding Championship with innovative solution.',
    category: 'achievement',
    location: 'Tech Hub',
    tags: ['Innovation', 'Problem Solving', 'AI/ML'],
    color: '#f59e0b',
    details: {
      impact: 'Developed AI-powered solution that helps small businesses optimize inventory',
      links: [{ label: 'Project Demo', url: '#' }]
    }
  },
  {
    id: '3',
    date: '2022',
    title: 'Computer Science Degree',
    description: 'Graduated with honors, specializing in Software Engineering and AI.',
    category: 'education',
    location: 'University Name',
    tags: ['Computer Science', 'AI', 'Software Engineering'],
    color: '#10b981',
    details: {
      skills: ['Data Structures', 'Algorithms', 'Machine Learning', 'Database Design'],
      impact: 'GPA: 3.8/4.0, Dean\'s List for 3 consecutive semesters'
    }
  },
  {
    id: '4',
    date: '2022',
    title: 'Travel Photography in Japan',
    description: 'Explored Japanese culture and captured stunning landscapes across 15 cities.',
    category: 'travel',
    location: 'Japan',
    tags: ['Photography', 'Culture', 'Adventure'],
    color: '#ec4899',
    details: {
      impact: 'Published photo series featured in local gallery, learned about minimalism and design principles'
    }
  },
  {
    id: '5',
    date: '2021',
    title: 'Open Source Contributor',
    description: 'Started contributing to major open source projects and maintained personal projects.',
    category: 'project',
    location: 'Remote',
    tags: ['Open Source', 'Community', 'GitHub'],
    color: '#8b5cf6',
    details: {
      skills: ['Git/GitHub', 'Code Review', 'Documentation', 'Community Building'],
      impact: '50+ contributions, 500+ GitHub stars across projects'
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
