import React, { useState, useEffect } from 'react';
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
  Avatar,
  IconButton,
  Fade,
} from '@mui/material';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import {
  Code,
  Storage,
  CloudOutlined,
  SmartToy,
  BuildOutlined,
  Star,
  TrendingUp,
  AutoAwesome,
  Verified,
} from '@mui/icons-material';
import { useResponsive, getResponsiveSpacing, getResponsiveTypography, getResponsiveLayout } from '../../utils/responsive';

const skills = [
  {
    category: 'Frontend',
    icon: Code,
    color: '#61dafb',
    gradient: ['#61dafb', '#21d4fd'],
    description: 'Crafting responsive and interactive user interfaces',
    yearsExperience: 2,
    projectsCompleted: 15,
    technologies: [
      { name: 'HTML5', level: 95, icon: '🌐', trending: true, certified: true },
      { name: 'CSS3', level: 95, icon: '🎨', trending: true, certified: true },
      { name: 'JavaScript', level: 92, icon: '⚡', trending: true, certified: false },
      { name: 'React/TypeScript', level: 95, icon: '⚛️', trending: true, certified: false },
      { name: 'Next.js', level: 90, icon: '🚀', trending: true, certified: false },
      { name: 'Angular', level: 75, icon: '🅰️', trending: false, certified: false },
      { name: 'Tailwind CSS', level: 88, icon: '💨', trending: true, certified: false },
      { name: 'Bootstrap', level: 85, icon: '🥾', trending: false, certified: false },
    ],
  },
  {
    category: 'Backend',
    icon: Storage,
    color: '#68d391',
    gradient: ['#68d391', '#38b2ac'],
    description: 'Building robust server-side applications and APIs',
    yearsExperience: 1.5,
    projectsCompleted: 12,
    technologies: [
      { name: 'Node.js/Express', level: 90, icon: '💚', trending: true, certified: false },
      { name: 'Python', level: 85, icon: '🐍', trending: true, certified: false },
      { name: 'Java', level: 60, icon: '☕', trending: false, certified: false },
      { name: 'RESTful APIs', level: 92, icon: '🔌', trending: true, certified: false },
    ],
  },
  {
    category: 'Database',
    icon: CloudOutlined,
    color: '#f093fb',
    gradient: ['#f093fb', '#f5576c'],
    description: 'Designing efficient data storage solutions',
    yearsExperience: 1.5,
    projectsCompleted: 10,
    technologies: [
      { name: 'MongoDB', level: 88, icon: '🍃', trending: true, certified: false },
      { name: 'MySQL', level: 85, icon: '🐬', trending: false, certified: false },
      { name: 'Redis', level: 75, icon: '🔴', trending: true, certified: false },
      { name: 'Firebase', level: 80, icon: '🔥', trending: true, certified: false },
    ],
  },
  {
    category: 'AI/ML',
    icon: SmartToy,
    color: '#ffd89b',
    gradient: ['#ffd89b', '#19547b'],
    description: 'Implementing intelligent solutions and algorithms',
    yearsExperience: 1,
    projectsCompleted: 5,
    technologies: [
      { name: 'Machine Learning', level: 78, icon: '🤖', trending: true, certified: false },
      { name: 'TensorFlow', level: 70, icon: '🧠', trending: true, certified: false },
      { name: 'PyTorch', level: 65, icon: '🔥', trending: true, certified: false },
      { name: 'Transformers', level: 72, icon: '🔄', trending: true, certified: false },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: BuildOutlined,
    color: '#a8edea',
    gradient: ['#a8edea', '#fed6e3'],
    description: 'Streamlining development and deployment processes',
    yearsExperience: 2,
    projectsCompleted: 20,
    technologies: [
      { name: 'Git/GitHub', level: 95, icon: '🐙', trending: true, certified: false },
      { name: 'VS Code', level: 95, icon: '💻', trending: false, certified: false },
      { name: 'Docker', level: 70, icon: '🐳', trending: true, certified: false },
      { name: 'Figma', level: 80, icon: '🎨', trending: false, certified: false },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const theme = useTheme();
  const responsive = useResponsive();
  const spacing = getResponsiveSpacing(theme);
  const typography = getResponsiveTypography();
  const layout = getResponsiveLayout();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [animatedStats, setAnimatedStats] = useState({ technologies: 0, categories: 0, proficiency: 0 });
  
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Animate stats when component comes into view
  useEffect(() => {
    if (isInView) {
      const animateStats = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Animate technologies count
        for (let i = 0; i <= 30; i++) {
          setAnimatedStats(prev => ({ ...prev, technologies: i }));
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Animate categories count
        for (let i = 0; i <= 5; i++) {
          setAnimatedStats(prev => ({ ...prev, categories: i }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Animate proficiency percentage
        for (let i = 0; i <= 87; i++) {
          setAnimatedStats(prev => ({ ...prev, proficiency: i }));
          await new Promise(resolve => setTimeout(resolve, 20));
        }
      };
      
      animateStats();
    }
  }, [isInView]);

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

  const totalTechnologies = skills.reduce((total, category) => total + category.technologies.length, 0);
  const avgProficiency = Math.round(
    skills.reduce((total, category) => 
      total + category.technologies.reduce((sum, tech) => sum + tech.level, 0), 0
    ) / totalTechnologies
  );

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: spacing.sectionPadding, 
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.default, 0.95)} 0%, 
          ${alpha(theme.palette.background.paper, 0.98)} 50%,
          ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        position: 'relative', 
        overflow: 'hidden',
        px: { xs: 2, lg: 3, xl: 4 }
      }}
    >
      {/* Enhanced Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        {/* Animated Grid Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(${alpha(theme.palette.primary.main, 0.03)} 1px, transparent 1px),
              linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.03)} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            opacity: 0.5,
          }}
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`skill-particle-${i}`}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
            style={{
              position: 'absolute',
              top: `${10 + (i % 4) * 25}%`,
              left: `${5 + i * 11}%`,
              width: '6px',
              height: '6px',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Tech Icons Floating */}
        {['⚛️', '🚀', '💻', '🎨', '🔧'].map((icon, i) => (
          <motion.div
            key={`floating-icon-${i}`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
            style={{
              position: 'absolute',
              top: `${15 + i * 15}%`,
              right: `${5 + (i % 2) * 10}%`,
              fontSize: '24px',
              zIndex: 0,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        px: { xs: 2, sm: 3, lg: 4 }
      }}>
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, lg: 8, xl: 10 } }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 3,
                    py: 1,
                    borderRadius: '50px',
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <AutoAwesome sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                    Technical Expertise
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                ...typography.sectionTitle,
                fontWeight: 'bold',
                mb: { xs: 2, lg: 3, xl: 4 },
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
                ...typography.bodyText,
                color: 'text.secondary',
                mb: { xs: 4, lg: 5, xl: 6 },
                maxWidth: { xs: '500px', lg: '700px', xl: '800px' },
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Transforming ideas into digital reality with cutting-edge technologies and proven expertise
            </Typography>

            {/* Enhanced Stats Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(3, 1fr)' },
                  gap: { xs: 3, sm: 4, lg: 6 }, 
                  mb: { xs: 6, lg: 8, xl: 10 },
                  maxWidth: '500px',
                  mx: 'auto',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.02)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        fontSize: { xs: '2rem', lg: '2.5rem', xl: '3rem' },
                        mb: 1,
                      }}
                    >
                      {animatedStats.technologies}+
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.875rem', lg: '1rem' },
                        fontWeight: 'medium',
                      }}
                    >
                      Technologies
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.02)})`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'secondary.main',
                        fontSize: { xs: '2rem', lg: '2.5rem', xl: '3rem' },
                        mb: 1,
                      }}
                    >
                      {animatedStats.categories}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.875rem', lg: '1rem' },
                        fontWeight: 'medium',
                      }}
                    >
                      Categories
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)}, ${alpha(theme.palette.success.main, 0.02)})`,
                    border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'success.main',
                        fontSize: { xs: '2rem', lg: '2.5rem', xl: '3rem' },
                        mb: 1,
                      }}
                    >
                      {animatedStats.proficiency}%
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.875rem', lg: '1rem' },
                        fontWeight: 'medium',
                      }}
                    >
                      Avg Proficiency
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </motion.div>

        {/* Enhanced Skills Grid */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: { xs: 3, sm: 4, lg: 4, xl: 5 },
            px: 0,
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          {skills.map((skillCategory, categoryIndex) => {
            const IconComponent = skillCategory.icon;
            const isHovered = hoveredCategory === skillCategory.category;
            const isSelected = selectedCategory === skillCategory.category;

            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredCategory(skillCategory.category)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Card
                  onClick={() => setSelectedCategory(isSelected ? null : skillCategory.category)}
                  sx={{
                    height: '100%',
                    background: isHovered || isSelected
                      ? `linear-gradient(135deg, ${alpha(skillCategory.color, 0.15)}, ${alpha(skillCategory.gradient[1], 0.1)})`
                      : 'background.paper',
                    border: `2px solid ${isHovered || isSelected ? skillCategory.color : alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 4,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${skillCategory.gradient[0]}, ${skillCategory.gradient[1]})`,
                      transform: isHovered || isSelected ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease',
                    },
                    '&:hover': {
                      boxShadow: `0 20px 40px ${alpha(skillCategory.color, 0.25)}, 0 0 0 1px ${alpha(skillCategory.color, 0.1)}`,
                    },
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 2.5, sm: 3, lg: 3.5 }, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>
                    {/* Enhanced Category Header */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 2.5, lg: 3 } }}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: 50, sm: 60, lg: 70 },
                            height: { xs: 50, sm: 60, lg: 70 },
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${skillCategory.gradient[0]}, ${skillCategory.gradient[1]})`,
                            mb: { xs: 1.5, lg: 2 },
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: -2,
                              left: -2,
                              right: -2,
                              bottom: -2,
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${skillCategory.gradient[0]}, ${skillCategory.gradient[1]})`,
                              opacity: isHovered ? 0.3 : 0,
                              transition: 'opacity 0.3s ease',
                              zIndex: -1,
                            },
                          }}
                        >
                          <IconComponent sx={{ 
                            fontSize: { xs: 24, sm: 28, lg: 32 }, 
                            color: 'white',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          }} />
                        </Box>
                      </motion.div>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: isHovered || isSelected ? skillCategory.color : 'text.primary',
                          transition: 'color 0.3s ease',
                          fontSize: { xs: '1rem', lg: '1.1rem' },
                          mb: 1,
                        }}
                      >
                        {skillCategory.category}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '0.8rem', lg: '0.85rem' },
                          lineHeight: 1.4,
                          mb: 1.5,
                          px: 1,
                        }}
                      >
                        {skillCategory.description}
                      </Typography>

                      {/* Category Stats */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1.5 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: skillCategory.color, fontSize: '1rem' }}>
                            {skillCategory.yearsExperience}+
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            Years
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: skillCategory.color, fontSize: '1rem' }}>
                            {skillCategory.projectsCompleted}+
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            Projects
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Enhanced Technologies List */}
                    <Box sx={{ flexGrow: 1 }}>
                      <AnimatePresence>
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
                            whileHover={{ x: 5 }}
                          >
                            <Tooltip
                              title={
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {tech.name}
                                  </Typography>
                                  <Typography variant="caption">
                                    {getSkillLevelLabel(tech.level)} ({tech.level}%)
                                  </Typography>
                                  {tech.certified && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                      <Verified sx={{ fontSize: 14, color: 'success.main' }} />
                                      <Typography variant="caption" color="success.main">
                                        Certified
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              }
                              arrow
                              placement="top"
                            >
                              <Box sx={{ mb: { xs: 2, lg: 2.2 } }}>
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
                                      sx={{ fontSize: '1.2rem' }}
                                    >
                                      {tech.icon}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ 
                                        fontWeight: 'medium',
                                        fontSize: '0.95rem',
                                      }}
                                    >
                                      {tech.name}
                                    </Typography>
                                    {tech.trending && (
                                      <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} />
                                    )}
                                    {tech.certified && (
                                      <Verified sx={{ fontSize: 14, color: 'primary.main' }} />
                                    )}
                                  </Box>
                                  
                                  <Chip
                                    label={`${tech.level}%`}
                                    size="small"
                                    sx={{
                                      backgroundColor: alpha(getSkillLevelColor(tech.level), 0.1),
                                      color: getSkillLevelColor(tech.level),
                                      fontWeight: 'bold',
                                      fontSize: '0.75rem',
                                      height: 22,
                                      '& .MuiChip-label': {
                                        px: 1,
                                      },
                                    }}
                                  />
                                </Box>
                                
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${tech.level}%` }}
                                  transition={{ duration: 1, delay: categoryIndex * 0.1 + techIndex * 0.1 }}
                                  viewport={{ once: true }}
                                >
                                  <LinearProgress
                                    variant="determinate"
                                    value={tech.level}
                                    sx={{
                                      height: 6,
                                      borderRadius: 3,
                                      backgroundColor: alpha(getSkillLevelColor(tech.level), 0.1),
                                      '& .MuiLinearProgress-bar': {
                                        borderRadius: 3,
                                        background: `linear-gradient(90deg, ${getSkillLevelColor(tech.level)}, ${alpha(getSkillLevelColor(tech.level), 0.8)})`,
                                        transition: 'transform 1s ease-out',
                                      },
                                    }}
                                  />
                                </motion.div>
                              </Box>
                            </Tooltip>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mt: { xs: 6, lg: 8 },
            p: { xs: 3, lg: 4 },
            borderRadius: 3,
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.05)} 0%, 
              ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '800px',
            mx: 'auto',
          }}>
            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                opacity: 0.5,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})`,
                opacity: 0.5,
              }}
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Ready to Build Something Amazing?
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  Let's collaborate and turn your ideas into reality with cutting-edge technology and creative solutions.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label="Let's Collaborate! 🚀"
                      onClick={() => {
                        const contactSection = document.querySelector('#contact');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        px: 4,
                        py: 2,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderRadius: '50px',
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                        },
                      }}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label="View Projects 📁"
                      onClick={() => {
                        const projectsSection = document.querySelector('#projects');
                        if (projectsSection) {
                          projectsSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.href = '/projects';
                        }
                      }}
                      variant="outlined"
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        px: 4,
                        py: 2,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderRadius: '50px',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SkillsSection;
