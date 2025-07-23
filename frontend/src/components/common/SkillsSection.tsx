import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  alpha,
  Chip,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Code,
  Storage,
  CloudOutlined,
  SmartToy,
  BuildOutlined,
} from '@mui/icons-material';

const skills = [
  {
    category: 'Frontend',
    icon: Code,
    color: '#61dafb',
    gradient: ['#61dafb', '#21d4fd'],
    technologies: [
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 95, icon: '🎨' },
      { name: 'JavaScript', level: 92, icon: '⚡' },
      { name: 'React/TypeScript', level: 95, icon: '⚛️' },
      { name: 'Next.js', level: 90, icon: '🚀' },
      { name: 'Angular', level: 75, icon: '🅰️' },
      { name: 'Tailwind CSS', level: 88, icon: '💨' },
      { name: 'Bootstrap', level: 85, icon: '🥾' },
      { name: 'Material-UI', level: 85, icon: '📦' },
    ],
  },
  {
    category: 'Backend',
    icon: Storage,
    color: '#68d391',
    gradient: ['#68d391', '#38b2ac'],
    technologies: [
      { name: 'Node.js/Express', level: 90, icon: '💚' },
      { name: 'Python', level: 85, icon: '🐍' },
      { name: 'Java', level: 60, icon: '☕' },
      { name: 'RESTful APIs', level: 92, icon: '🔌' },
    ],
  },
  {
    category: 'Database',
    icon: CloudOutlined,
    color: '#f093fb',
    gradient: ['#f093fb', '#f5576c'],
    technologies: [
      { name: 'MongoDB', level: 88, icon: '🍃' },
      { name: 'MySQL', level: 85, icon: '🐬' },
      { name: 'Redis', level: 75, icon: '🔴' },
      { name: 'Firebase', level: 80, icon: '🔥' },
    ],
  },
  {
    category: 'AI/ML',
    icon: SmartToy,
    color: '#ffd89b',
    gradient: ['#ffd89b', '#19547b'],
    technologies: [
      { name: 'Machine Learning', level: 78, icon: '🤖' },
      { name: 'TensorFlow', level: 70, icon: '🧠' },
      { name: 'PyTorch', level: 65, icon: '🔥' },
      { name: 'Transformers', level: 72, icon: '🔄' },
    ],
  },
  {
    category: 'Tools & Others',
    icon: BuildOutlined,
    color: '#a8edea',
    gradient: ['#a8edea', '#fed6e3'],
    technologies: [
      { name: 'Git/GitHub', level: 95, icon: '🐙' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Android Studio', level: 75, icon: '📱' },
      { name: 'Figma', level: 80, icon: '🎨' },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const theme = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return '#10b981'; // Green for expert
    if (level >= 80) return '#3b82f6'; // Blue for advanced  
    if (level >= 70) return '#f59e0b'; // Orange for intermediate
    return '#ef4444'; // Red for beginner
  };

  const getSkillLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radica-gradient(circle at 25px 25px, ${alpha(theme.palette.primary.main, 0.03)} 2px, transparent 0)`,
          backgroundSize: '50px 50px',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Skills & Technologies
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 2,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              My technical expertise across different domains
            </Typography>

            {/* Skills Overview Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 4, 
                  flexWrap: 'wrap', 
                  mb: 6 
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    26+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Technologies
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                    5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Categories
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                    85%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Proficiency
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </motion.div>

        {/* Skills Grid */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: 3,
          }}
        >
          {skills.map((skillCategory, categoryIndex) => {
            const IconComponent = skillCategory.icon;
            const isHovered = hoveredCategory === skillCategory.category;

            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCategory(skillCategory.category)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: isHovered 
                      ? `linear-gradient(135deg, ${alpha(skillCategory.color, 0.1)}, ${alpha(skillCategory.gradient[1], 0.1)})`
                      : 'background.paper',
                    border: `2px solid ${isHovered ? skillCategory.color : 'transparent'}`,
                    borderRadius: 3,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${skillCategory.gradient[0]}, ${skillCategory.gradient[1]})`,
                      transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease',
                    },
                    '&:hover': {
                      boxShadow: `0 20px 40px ${alpha(skillCategory.color, 0.2)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Category Header */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${skillCategory.gradient[0]}, ${skillCategory.gradient[1]})`,
                          mb: 2,
                          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                      </Box>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: isHovered ? skillCategory.color : 'text.primary',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {skillCategory.category}
                      </Typography>
                    </Box>

                    {/* Technologies List */}
                    <Box sx={{ flexGrow: 1 }}>
                      {skillCategory.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: categoryIndex * 0.1 + techIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                        >
                          <Tooltip
                            title={`${getSkillLevelLabel(tech.level)} (${tech.level}%)`}
                            arrow
                            placement="top"
                          >
                            <Box sx={{ mb: 2.5 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  mb: 1,
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontSize: '1.1rem' }}
                                  >
                                    {tech.icon}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ 
                                      fontWeight: 'medium',
                                      fontSize: '0.9rem',
                                    }}
                                  >
                                    {tech.name}
                                  </Typography>
                                </Box>
                                
                                <Chip
                                  label={`${tech.level}%`}
                                  size="small"
                                  sx={{
                                    backgroundColor: alpha(getSkillLevelColor(tech.level), 0.1),
                                    color: getSkillLevelColor(tech.level),
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    height: 20,
                                  }}
                                />
                              </Box>
                              
                              <LinearProgress
                                variant="determinate"
                                value={tech.level}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: alpha(getSkillLevelColor(tech.level), 0.1),
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 3,
                                    backgroundColor: getSkillLevelColor(tech.level),
                                    transition: 'transform 0.8s ease-out',
                                  },
                                }}
                              />
                            </Box>
                          </Tooltip>
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: 'text.secondary',
              }}
            >
              Interested in working together?
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                label="Let's build something amazing! 🚀"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              />
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SkillsSection;
