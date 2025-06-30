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
  Group,
  TrendingUp,
  Star,
  Psychology,
  Build,
  Lightbulb,
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
    id: 'university',
    title: 'Computer Science Degree',
    organization: 'Tech University',
    type: 'education',
    startDate: '2015-08',
    endDate: '2019-05',
    location: 'University Campus',
    description: 'Bachelor of Science in Computer Science with focus on Software Engineering and AI.',
    skills: ['Java', 'Python', 'Data Structures', 'Algorithms', 'Database Design', 'Software Engineering'],
    highlights: [
      'Graduated Magna Cum Laude (GPA: 3.8/4.0)',
      'Dean\'s List for 6 semesters',
      'Computer Science Student of the Year 2019',
      'Senior Capstone: AI-powered study scheduler'
    ],
    impact: 'Established strong foundation in computer science principles and problem-solving methodologies.',
    connections: ['first-internship', 'capstone-project'],
    x: 20,
    y: 80,
    color: '#10b981',
    icon: School,
    level: 4
  },
  {
    id: 'first-internship',
    title: 'Software Development Intern',
    organization: 'StartupCorp',
    type: 'work',
    startDate: '2018-06',
    endDate: '2018-08',
    location: 'Remote',
    description: 'Summer internship focused on full-stack web development using React and Node.js.',
    skills: ['React', 'Node.js', 'MongoDB', 'RESTful APIs', 'Git', 'Agile'],
    highlights: [
      'Developed user authentication system used by 1000+ users',
      'Reduced page load times by 40% through optimization',
      'Received offer for full-time position post-graduation'
    ],
    impact: 'First real-world software development experience, confirmed passion for web development.',
    connections: ['university', 'junior-developer'],
    x: 35,
    y: 65,
    color: '#3b82f6',
    icon: Work,
    level: 3
  },
  {
    id: 'capstone-project',
    title: 'AI Study Scheduler',
    organization: 'University Project',
    type: 'project',
    startDate: '2019-01',
    endDate: '2019-05',
    location: 'University Lab',
    description: 'Machine learning application that optimizes study schedules based on individual learning patterns.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'UI/UX Design'],
    highlights: [
      'Won Best Senior Project Award',
      'Improved study efficiency by 35% in user testing',
      'Featured in university research publication',
      'Open-sourced with 200+ GitHub stars'
    ],
    impact: 'Introduced me to AI/ML and demonstrated potential of technology to solve real problems.',
    connections: ['university', 'ml-certification'],
    x: 15,
    y: 50,
    color: '#8b5cf6',
    icon: Psychology,
    level: 4
  },
  {
    id: 'junior-developer',
    title: 'Junior Full-Stack Developer',
    organization: 'TechFlow Solutions',
    type: 'work',
    startDate: '2019-06',
    endDate: '2021-03',
    location: 'San Francisco, CA',
    description: 'Full-stack development role building customer-facing web applications and internal tools.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Jest'],
    highlights: [
      'Delivered 15+ features ahead of schedule',
      'Mentored 3 interns during summer programs',
      'Led migration from JavaScript to TypeScript',
      'Improved test coverage from 60% to 95%'
    ],
    impact: 'Developed professional software development skills and learned importance of code quality.',
    connections: ['first-internship', 'senior-developer', 'aws-certification'],
    x: 50,
    y: 45,
    color: '#06b6d4',
    icon: Code,
    level: 4
  },
  {
    id: 'aws-certification',
    title: 'AWS Solutions Architect',
    organization: 'Amazon Web Services',
    type: 'achievement',
    startDate: '2020-11',
    location: 'Online',
    description: 'Professional certification in designing and deploying scalable systems on AWS.',
    skills: ['AWS', 'Cloud Architecture', 'Infrastructure as Code', 'Microservices', 'Security'],
    highlights: [
      'Passed Professional level exam (23% pass rate)',
      'Applied knowledge to reduce infrastructure costs by 40%',
      'Became team\'s go-to person for cloud architecture'
    ],
    impact: 'Opened doors to more senior roles and established expertise in cloud technologies.',
    connections: ['junior-developer', 'senior-developer'],
    x: 65,
    y: 60,
    color: '#f59e0b',
    icon: Star,
    level: 3
  },
  {
    id: 'senior-developer',
    title: 'Senior Full-Stack Developer',
    organization: 'InnovateTech',
    type: 'work',
    startDate: '2021-04',
    endDate: '2023-08',
    location: 'Austin, TX',
    description: 'Senior role leading development of enterprise SaaS platform serving 50,000+ users.',
    skills: ['React', 'Node.js', 'GraphQL', 'Microservices', 'Kubernetes', 'Team Leadership'],
    highlights: [
      'Led team of 5 developers',
      'Architected microservices platform',
      'Reduced system downtime by 90%',
      'Delivered major features 3 months ahead of schedule'
    ],
    impact: 'Transitioned from individual contributor to technical leadership role.',
    connections: ['junior-developer', 'aws-certification', 'tech-lead', 'conference-speaker'],
    x: 80,
    y: 30,
    color: '#ec4899',
    icon: TrendingUp,
    level: 5
  },
  {
    id: 'ml-certification',
    title: 'Machine Learning Specialization',
    organization: 'Stanford Online',
    type: 'education',
    startDate: '2021-09',
    endDate: '2022-01',
    location: 'Online',
    description: 'Advanced course series covering deep learning, neural networks, and AI applications.',
    skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
    highlights: [
      'Completed all 5 courses with distinction',
      'Built 10+ ML projects',
      'Applied knowledge to company\'s recommendation engine'
    ],
    impact: 'Expanded expertise beyond web development into AI/ML domain.',
    connections: ['capstone-project', 'ai-project'],
    x: 25,
    y: 25,
    color: '#f97316',
    icon: Psychology,
    level: 3
  },
  {
    id: 'conference-speaker',
    title: 'Tech Conference Speaker',
    organization: 'DevCon 2022',
    type: 'achievement',
    startDate: '2022-09',
    location: 'Las Vegas, NV',
    description: 'Keynote speaker on "Building Scalable React Applications" at major developer conference.',
    skills: ['Public Speaking', 'Technical Writing', 'React', 'Performance Optimization'],
    highlights: [
      'Presented to 500+ developers',
      'Talk viewed 10,000+ times online',
      'Received speaking invitations from 3 other conferences',
      '4.8/5 audience satisfaction rating'
    ],
    impact: 'Established thought leadership and expanded professional network significantly.',
    connections: ['senior-developer', 'open-source'],
    x: 85,
    y: 15,
    color: '#dc2626',
    icon: Public,
    level: 4
  },
  {
    id: 'tech-lead',
    title: 'Technical Lead',
    organization: 'ScaleUp Inc.',
    type: 'work',
    startDate: '2023-09',
    location: 'Remote',
    description: 'Leading technical strategy and architecture for next-generation fintech platform.',
    skills: ['System Architecture', 'Team Leadership', 'React', 'Node.js', 'Blockchain', 'Security'],
    highlights: [
      'Managing team of 12 developers',
      'Designing architecture for 1M+ user platform',
      'Implementing cutting-edge security measures',
      'Leading company\'s technical vision'
    ],
    impact: 'Currently shaping the future of financial technology while mentoring next generation of developers.',
    connections: ['senior-developer', 'blockchain-project'],
    x: 95,
    y: 45,
    color: '#7c3aed',
    icon: Build,
    level: 5
  },
  {
    id: 'open-source',
    title: 'Open Source Contributions',
    organization: 'Various Projects',
    type: 'project',
    startDate: '2020-01',
    location: 'Global',
    description: 'Regular contributor to popular open source projects with 1000+ contributions.',
    skills: ['JavaScript', 'TypeScript', 'React', 'Documentation', 'Community Building'],
    highlights: [
      '1000+ contributions across 25+ projects',
      '500+ GitHub stars earned',
      'Maintained 3 popular npm packages',
      'Helped onboard 50+ new contributors'
    ],
    impact: 'Built reputation in developer community and improved skills through diverse projects.',
    connections: ['conference-speaker', 'junior-developer'],
    x: 70,
    y: 75,
    color: '#059669',
    icon: Group,
    level: 4
  },
  {
    id: 'ai-project',
    title: 'AI-Powered Analytics Platform',
    organization: 'Personal Project',
    type: 'project',
    startDate: '2022-06',
    endDate: '2023-03',
    location: 'Home Lab',
    description: 'Built intelligent analytics platform using machine learning for small businesses.',
    skills: ['Machine Learning', 'Python', 'React', 'TensorFlow', 'Data Visualization', 'Product Design'],
    highlights: [
      'Used by 50+ small businesses',
      'Achieved 85% prediction accuracy',
      'Generated $25K in revenue',
      'Featured in tech blog with 100K+ views'
    ],
    impact: 'Demonstrated ability to turn technical skills into real business value.',
    connections: ['ml-certification', 'hackathon-win'],
    x: 40,
    y: 10,
    color: '#db2777',
    icon: Lightbulb,
    level: 4
  },
  {
    id: 'hackathon-win',
    title: 'National Hackathon Winner',
    organization: 'TechChallenge 2023',
    type: 'achievement',
    startDate: '2023-03',
    location: 'Boston, MA',
    description: 'First place in national coding competition with innovative supply chain optimization solution.',
    skills: ['Rapid Prototyping', 'AI/ML', 'Team Leadership', 'Presentation', 'Problem Solving'],
    highlights: [
      'Beat 150+ competing teams',
      'Won $10,000 prize',
      '48-hour development sprint',
      'Solution being developed into commercial product'
    ],
    impact: 'Validated ability to innovate under pressure and lead teams to victory.',
    connections: ['ai-project', 'tech-lead'],
    x: 55,
    y: 5,
    color: '#facc15',
    icon: EmojiEvents,
    level: 5
  },
  {
    id: 'blockchain-project',
    title: 'Blockchain Protocol Development',
    organization: 'Current Role',
    type: 'project',
    startDate: '2024-01',
    location: 'Remote',
    description: 'Leading development of novel blockchain protocol for decentralized finance applications.',
    skills: ['Blockchain', 'Solidity', 'Web3', 'Cryptography', 'DeFi', 'Security Auditing'],
    highlights: [
      'Designing next-generation DeFi protocol',
      'Managing $2M+ development budget',
      'Leading security audits and testing',
      'Preparing for Q3 2024 mainnet launch'
    ],
    impact: 'Pushing boundaries of blockchain technology and building the future of finance.',
    connections: ['tech-lead'],
    x: 75,
    y: 35,
    color: '#6366f1',
    icon: Build,
    level: 5
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
