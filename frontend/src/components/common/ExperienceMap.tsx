import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Container,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Work,
  School,
  Code,
  EmojiEvents,
  Public,
  ZoomIn,
  ZoomOut,
  Refresh,
  FilterList,
} from '@mui/icons-material';

interface Experience {
  id: string;
  title: string;
  organization: string;
  type: 'work' | 'education' | 'project' | 'achievement' | 'volunteer';
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  skills: string[];
  highlights: string[];
  impact: string;
  connections: string[]; // IDs of related experiences
  x: number; // Position on the map
  y: number;
  color: string;
  icon: React.ElementType;
  level: number; // 1-5, affects size and importance
}

const experiences: Experience[] = [
  {
    id: 'mca-degree',
    title: 'Master of Computer Applications (MCA)',
    organization: 'Aurora Deemed to be University',
    type: 'education',
    startDate: '2023-11',
    endDate: '2025-09',
    location: 'University Campus',
    description: 'Completed MCA PG Degree with specialization in software development and modern programming technologies.',
    skills: ['Software Engineering', 'Database Management', 'Programming', 'Computer Science'],
    highlights: [
      'Achieved First Rank in MCA Academics',
      'CGPA: 9.2/10',
      'Specialized in Software Development',
      'Outstanding academic performance'
    ],
    impact: 'Gained comprehensive knowledge in software engineering, database management, and advanced programming concepts.',
    connections: ['first-rank-academics', 'heydu-internship'],
    x: 20,
    y: 80,
    color: '#ff9900',
    icon: School,
    level: 5
  },
  {
    id: 'first-rank-academics',
    title: 'First Rank in MCA Academics',
    organization: 'Aurora Deemed to be University',
    type: 'achievement',
    startDate: '2023-11',
    location: 'University',
    description: 'Achieved first rank in Master of Computer Applications (MCA) program with outstanding academic performance.',
    skills: ['Academic Excellence', 'Computer Science', 'Problem Solving', 'Dedication'],
    highlights: [
      'Class Rank: 1st',
      'CGPA: 9.2/10',
      'Program Duration: 2 years',
      'Recognized for exceptional academic performance'
    ],
    impact: 'Recognized for exceptional academic performance and consistent dedication to learning computer science concepts.',
    connections: ['mca-degree'],
    x: 35,
    y: 65,
    color: '#f59e0b',
    icon: EmojiEvents,
    level: 5
  },
  {
    id: 'heydu-internship',
    title: '6 Months Full Stack Internship',
    organization: 'Heydu Services Pvt Ltd',
    type: 'work',
    startDate: '2025-02',
    endDate: '2025-08',
    location: 'Company Office',
    description: 'Completed 6-month full stack development internship working on real-world projects and gaining industry experience.',
    skills: ['MERN Stack', 'Full Stack Development', 'Industry Experience', 'Real-world Projects'],
    highlights: [
      'Duration: 6 months',
      'Technologies: MERN Stack',
      'Projects Completed: 4',
      'Gained hands-on experience with senior developers'
    ],
    impact: 'Gained hands-on experience in full stack development, worked with senior developers, and contributed to live projects.',
    connections: ['mca-degree', 'eduversity-internship', 'student-feedback-system'],
    x: 50,
    y: 45,
    color: '#8b5cf6',
    icon: Work,
    level: 4
  },
  {
    id: 'eduversity-internship',
    title: '3 Months Internship',
    organization: 'Edu-versity',
    type: 'work',
    startDate: '2024-06',
    endDate: '2024-09',
    location: 'Company Office',
    description: 'Completed 3-month development internship gaining experience in web technologies and software development practices.',
    skills: ['Web Development', 'Professional Growth', 'Learning', 'Teamwork'],
    highlights: [
      'Duration: 3 months',
      'Technologies Learned: Web Dev',
      'Performance Rating: Excellent',
      'Learned professional development practices'
    ],
    impact: 'Gained foundational industry experience and learned professional development practices and teamwork.',
    connections: ['heydu-internship'],
    x: 65,
    y: 30,
    color: '#06b6d4',
    icon: Work,
    level: 3
  },
  {
    id: 'student-feedback-system',
    title: 'Student Feedback Management System',
    organization: 'Personal Project',
    type: 'project',
    startDate: '2025-03',
    endDate: '2025-07',
    location: 'Development Environment',
    description: 'Developed a comprehensive feedback management system using MERN Stack for academic institutions.',
    skills: ['MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js', 'Full Stack'],
    highlights: [
      'Tech Stack: MERN',
      'Features: 15+',
      'Development Time: 3 months',
      'Real-time analytics dashboard'
    ],
    impact: 'Successfully deployed system for collecting and managing student feedback with real-time analytics dashboard.',
    connections: ['heydu-internship', 'portfolio-website'],
    x: 80,
    y: 15,
    color: '#10b981',
    icon: Code,
    level: 4
  },
  {
    id: 'portfolio-website',
    title: 'Advanced Portfolio Website Development',
    organization: 'Personal Project',
    type: 'project',
    startDate: '2025-05',
    endDate: '2025-07',
    location: 'Development Environment',
    description: 'Built a comprehensive portfolio website showcasing skills, projects, and achievements using modern web technologies.',
    skills: ['React', 'TypeScript', 'Portfolio', 'Web Development', 'Responsive Design'],
    highlights: [
      'Technologies: React+TS',
      'Components: 20+',
      'Performance Score: 95/100',
      'Professional online presence'
    ],
    impact: 'Created professional online presence showcasing technical skills and project experience to potential employers.',
    connections: ['student-feedback-system'],
    x: 95,
    y: 50,
    color: '#ec4899',
    icon: Public,
    level: 4
  }
];

const ExperienceMap: React.FC = () => {
  const theme = useTheme();
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<Experience | null>(null);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState<string>('all');
  const [showConnections, setShowConnections] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filterTypes = [
    { id: 'all', label: 'All Experiences', color: theme.palette.primary.main },
    { id: 'work', label: 'Work', color: '#3b82f6' },
    { id: 'education', label: 'Education', color: '#10b981' },
    { id: 'project', label: 'Projects', color: '#8b5cf6' },
    { id: 'achievement', label: 'Achievements', color: '#f59e0b' },
  ];

  const filteredExperiences = filter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === filter);

  const getConnectionPath = (from: Experience, to: Experience) => {
    const fromX = from.x * zoom;
    const fromY = from.y * zoom;
    const toX = to.x * zoom;
    const toY = to.y * zoom;
    
    return `M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${Math.min(fromY, toY) - 20} ${toX} ${toY}`;
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <Box ref={ref} sx={{ py: 8, px: 2 }}>
      <Container maxWidth="lg">
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
              Experience Map
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Navigate through my professional journey and see how experiences connect
            </Typography>

            {/* Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              {/* Zoom Controls */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Zoom In">
                  <IconButton onClick={zoomIn} color="primary">
                    <ZoomIn />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom Out">
                  <IconButton onClick={zoomOut} color="primary">
                    <ZoomOut />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset Zoom">
                  <IconButton onClick={resetZoom} color="primary">
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Filter Toggle */}
              <Tooltip title="Toggle Connections">
                <IconButton 
                  onClick={() => setShowConnections(!showConnections)}
                  color={showConnections ? "primary" : "default"}
                >
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Filter Chips */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
              {filterTypes.map((filterType) => (
                <Chip
                  key={filterType.id}
                  label={filterType.label}
                  clickable
                  variant={filter === filterType.id ? 'filled' : 'outlined'}
                  sx={{
                    bgcolor: filter === filterType.id ? filterType.color : 'transparent',
                    borderColor: filterType.color,
                    color: filter === filterType.id ? 'white' : filterType.color,
                    '&:hover': {
                      bgcolor: alpha(filterType.color, 0.1),
                    },
                  }}
                  onClick={() => setFilter(filterType.id)}
                />
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Experience Map */}
        <Box
          sx={{
            position: 'relative',
            height: 600,
            bgcolor: alpha(theme.palette.primary.main, 0.02),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            overflow: 'hidden',
            mb: 6,
          }}
        >
          {/* Connection Lines */}
          {showConnections && (
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {filteredExperiences.map((exp) =>
                exp.connections
                  .map(connId => experiences.find(e => e.id === connId))
                  .filter(Boolean)
                  .filter(connExp => filteredExperiences.includes(connExp!))
                  .map((connExp, index) => (
                    <motion.path
                      key={`${exp.id}-${connExp!.id}`}
                      d={getConnectionPath(exp, connExp!)}
                      fill="none"
                      stroke={alpha(theme.palette.primary.main, 0.3)}
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  ))
              )}
            </svg>
          )}

          {/* Experience Nodes */}
          {filteredExperiences.map((experience, index) => {
            const IconComponent = experience.icon;
            const isSelected = selectedExperience?.id === experience.id;
            const isHovered = hoveredExperience?.id === experience.id;
            const nodeSize = 20 + (experience.level * 8);

            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  position: 'absolute',
                  left: `${experience.x * zoom}%`,
                  top: `${experience.y * zoom}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected || isHovered ? 10 : 2,
                }}
                onMouseEnter={() => setHoveredExperience(experience)}
                onMouseLeave={() => setHoveredExperience(null)}
                onClick={() => setSelectedExperience(isSelected ? null : experience)}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box
                    sx={{
                      width: nodeSize,
                      height: nodeSize,
                      borderRadius: '50%',
                      bgcolor: experience.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: theme.shadows[4],
                      border: `3px solid ${isSelected || isHovered ? 'white' : 'transparent'}`,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: `0 8px 32px ${alpha(experience.color, 0.4)}`,
                      },
                    }}
                  >
                    <IconComponent sx={{ fontSize: nodeSize * 0.5 }} />
                    
                    {/* Level indicator */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        color: experience.color,
                        fontSize: '0.6rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {experience.level}
                    </Box>
                  </Box>
                </motion.div>

                {/* Hover/Selected Info */}
                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        position: 'absolute',
                        top: nodeSize + 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                      }}
                    >
                      <Card
                        sx={{
                          minWidth: 200,
                          maxWidth: 300,
                          bgcolor: 'background.paper',
                          border: `2px solid ${experience.color}`,
                          boxShadow: theme.shadows[8],
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {experience.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            {experience.organization} • {experience.startDate}
                            {experience.endDate && ` - ${experience.endDate}`}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem' }}>
                            {experience.description}
                          </Typography>
                          {experience.skills.slice(0, 3).map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                mr: 0.5,
                                mb: 0.5,
                                fontSize: '0.7rem',
                                height: 20,
                                bgcolor: alpha(experience.color, 0.1),
                                color: experience.color,
                              }}
                            />
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </Box>

        {/* Detailed Experience Info */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  border: `2px solid ${selectedExperience.color}`,
                  boxShadow: `0 8px 32px ${alpha(selectedExperience.color, 0.2)}`,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: selectedExperience.color,
                        color: 'white',
                        flexShrink: 0,
                      }}
                    >
                      <selectedExperience.icon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {selectedExperience.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        {selectedExperience.organization}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {selectedExperience.startDate}
                        {selectedExperience.endDate && ` - ${selectedExperience.endDate}`} • {selectedExperience.location}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        {selectedExperience.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Highlights */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Key Highlights
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {selectedExperience.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: selectedExperience.color,
                                mt: 1,
                                mr: 2,
                                flexShrink: 0,
                              }}
                            />
                            {highlight}
                          </Typography>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>

                  {/* Skills */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Skills & Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedExperience.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          sx={{
                            bgcolor: alpha(selectedExperience.color, 0.1),
                            color: selectedExperience.color,
                            borderColor: selectedExperience.color,
                            variant: 'outlined',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Impact */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Impact & Learning
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        p: 3,
                        bgcolor: alpha(selectedExperience.color, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(selectedExperience.color, 0.2)}`,
                        fontStyle: 'italic',
                      }}
                    >
                      {selectedExperience.impact}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Experience Types
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2 
          }}>
            {filterTypes.slice(1).map((type) => {
              const exampleExp = experiences.find(exp => exp.type === type.id);
              if (!exampleExp) return null;
              
              const IconComponent = exampleExp.icon;
              
              return (
                <Box key={type.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: type.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 14 }} />
                  </Box>
                  <Typography variant="body2">{type.label}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ExperienceMap;
