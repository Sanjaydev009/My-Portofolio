import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Badge,
  IconButton,
  useTheme,
  alpha,
  LinearProgress,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  EmojiEvents,
  Star,
  Favorite,
  School,
  Work,
  Code,
  Group,
  Public,
  TrendingUp,
  Celebration,
  PlayArrow,
  Pause,
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'award' | 'certification' | 'milestone' | 'contribution' | 'leadership';
  date: string;
  icon: React.ElementType;
  color: string;
  image?: string;
  stats?: {
    label: string;
    value: string | number;
    icon?: React.ElementType;
  }[];
  impact: string;
  links?: {
    label: string;
    url: string;
  }[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
}

interface AchievementStats {
  totalAchievements: number;
  categoryCounts: Record<string, number>;
  totalImpact: string;
  latestAchievement: Achievement;
}

const achievements: Achievement[] = [
  {
    id: 'first-rank-academics',
    title: 'First Rank in MCA Academics',
    description: 'Achieved first rank in Master of Computer Applications (MCA) program with outstanding academic performance.',
    category: 'award',
    date: '2024-03',
    icon: EmojiEvents,
    color: '#f59e0b',
    image: '/api/placeholder/400/200',
    stats: [
      { label: 'Class Rank', value: '1st', icon: Star },
      { label: 'CGPA', value: '9.2/10', icon: TrendingUp },
      { label: 'Program Duration', value: '3 years', icon: School }
    ],
    impact: 'Recognized for exceptional academic performance and consistent dedication to learning computer science concepts.',
    links: [
      { label: 'Academic Certificate', url: '#certificate' }
    ],
    level: 'expert',
    tags: ['Academic Excellence', 'Computer Science', 'Problem Solving', 'Dedication']
  },
  {
    id: 'mca-degree',
    title: 'Master of Computer Applications (MCA)',
    description: 'Completed MCA PG Degree with specialization in software development and modern programming technologies.',
    category: 'certification',
    date: '2024-01',
    icon: School,
    color: '#ff9900',
    stats: [
      { label: 'CGPA', value: '9.2/10', icon: TrendingUp },
      { label: 'Program Duration', value: '3 years', icon: School },
      { label: 'Specialization', value: 'Software Dev', icon: Code }
    ],
    impact: 'Gained comprehensive knowledge in software engineering, database management, and advanced programming concepts.',
    links: [
      { label: 'Degree Certificate', url: '#cert' }
    ],
    level: 'expert',
    tags: ['Post Graduate', 'Software Engineering', 'Computer Science', 'Academic Achievement']
  },
  {
    id: 'student-feedback-system',
    title: 'Student Feedback Management System',
    description: 'Developed a comprehensive feedback management system using MERN Stack for academic institutions.',
    category: 'milestone',
    date: '2023-12',
    icon: Code,
    color: '#10b981',
    stats: [
      { label: 'Tech Stack', value: 'MERN', icon: Code },
      { label: 'Features', value: '15+', icon: Star },
      { label: 'Development Time', value: '3 months', icon: Public }
    ],
    impact: 'Successfully deployed system for collecting and managing student feedback with real-time analytics dashboard.',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Sanjaydev009/student-feedback-system' },
      { label: 'Live Demo', url: '#demo' }
    ],
    level: 'advanced',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js', 'Full Stack']
  },
  {
    id: 'heydu-services-internship',
    title: '6 Months Full Stack Internship at Heydu Services Pvt Ltd',
    description: 'Completed 6-month full stack development internship working on real-world projects and gaining industry experience.',
    category: 'leadership',
    date: '2025-02',
    icon: Work,
    color: '#8b5cf6',
    stats: [
      { label: 'Duration', value: '6 months', icon: Work },
      { label: 'Technologies', value: 'MERN Stack', icon: Code },
      { label: 'Project Completed', value: '1', icon: Celebration }
    ],
    impact: 'Gained hands-on experience in full stack development, worked with senior developers, and contributed to live projects.',
    level: 'advanced',
    tags: ['Full Stack Development', 'MERN Stack', 'Industry Experience', 'Real-world Projects']
  },
  {
    id: 'eduversity-internship',
    title: '3 Months Internship at Edu-versity',
    description: 'Completed 3-month development internship gaining experience in web technologies and software development practices.',
    category: 'milestone',
    date: '2024-06',
    icon: TrendingUp,
    color: '#06b6d4',
    stats: [
      { label: 'Duration', value: '3 months', icon: TrendingUp },
      { label: 'Technologies Learned', value: 'Web Dev', icon: Code },
      { label: 'Performance Rating', value: 'Excellent', icon: Favorite }
    ],
    impact: 'Gained foundational industry experience and learned professional development practices and teamwork.',
    level: 'intermediate',
    tags: ['Internship', 'Web Development', 'Learning', 'Professional Growth']
  },
  {
    id: 'portfolio-website',
    title: 'Advanced Portfolio Website Development',
    description: 'Built a comprehensive portfolio website showcasing skills, projects, and achievements using modern web technologies.',
    category: 'contribution',
    date: '2025-04',
    icon: Public,
    color: '#ec4899',
    stats: [
      { label: 'Technologies', value: 'React+TS', icon: Code },
      { label: 'Components', value: '20+', icon: Group },
      { label: 'Performance Score', value: '95/100', icon: Star }
    ],
    impact: 'Created professional online presence showcasing technical skills and project experience to potential employers.',
    links: [
      { label: 'Live Website', url: '#website' },
      { label: 'Source Code', url: 'https://github.com/Sanjaydev009/My-Portofolio' }
    ],
    level: 'advanced',
    tags: ['React', 'TypeScript', 'Portfolio', 'Web Development', 'Responsive Design']
  }
];

const categoryConfig = {
  award: { name: 'Awards', icon: EmojiEvents, color: '#f59e0b' },
  certification: { name: 'Certifications', icon: School, color: '#ff9900' },
  milestone: { name: 'Milestones', icon: TrendingUp, color: '#06b6d4' },
  contribution: { name: 'Contributions', icon: Public, color: '#10b981' },
  leadership: { name: 'Leadership', icon: Group, color: '#8b5cf6' },
};

const AchievementShowcase: React.FC = () => {
  const theme = useTheme();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter] = useState<string>('all');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calculate stats
  const stats: AchievementStats = {
    totalAchievements: achievements.length,
    categoryCounts: achievements.reduce((acc, achievement) => {
      acc[achievement.category] = (acc[achievement.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalImpact: "250,000+ people impacted",
    latestAchievement: achievements[0]
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === filter);

  const getLevelColor = (level: Achievement['level']) => {
    switch (level) {
      case 'beginner': return '#94a3b8';
      case 'intermediate': return '#3b82f6';
      case 'advanced': return '#10b981';
      case 'expert': return '#f59e0b';
      default: return theme.palette.text.secondary;
    }
  };

  const getLevelProgress = (level: Achievement['level']) => {
    switch (level) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'expert': return 100;
      default: return 0;
    }
  };

  return (
    <Box ref={ref} sx={{ py: 8, px: 2 }}>
      {/* Header with Stats */}
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
            Achievements & Milestones
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            A journey of growth, impact, and continuous learning
          </Typography>

          {/* Stats Overview */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 6,
            maxWidth: 800,
            mx: 'auto'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                  {stats.totalAchievements}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Achievements
                </Typography>
              </Card>
            </motion.div>

            {Object.entries(categoryConfig).slice(0, 3).map(([key, config], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    {React.createElement(config.icon, { sx: { color: config.color, mr: 1 } })}
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: config.color }}>
                      {stats.categoryCounts[key] || 0}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {config.name}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Auto-play control */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              }}
            >
              {isAutoPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Typography variant="body2" sx={{ alignSelf: 'center' }}>
              {isAutoPlaying ? 'Auto-playing achievements' : 'Click to auto-play'}
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Featured Achievement (Auto-playing) */}
      <Box sx={{ mb: 8 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                maxWidth: 800,
                mx: 'auto',
                background: `linear-gradient(135deg, ${alpha(achievements[currentIndex].color, 0.1)}, ${alpha(achievements[currentIndex].color, 0.05)})`,
                border: `2px solid ${achievements[currentIndex].color}`,
                boxShadow: `0 8px 32px ${alpha(achievements[currentIndex].color, 0.3)}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: achievements[currentIndex].color,
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    {React.createElement(achievements[currentIndex].icon, { sx: { fontSize: 40 } })}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {achievements[currentIndex].title}
                      </Typography>
                      <Badge
                        badgeContent={achievements[currentIndex].level}
                        sx={{
                          '& .MuiBadge-badge': {
                            bgcolor: getLevelColor(achievements[currentIndex].level),
                            color: 'white',
                            textTransform: 'capitalize',
                          },
                        }}
                      >
                        <Box />
                      </Badge>
                    </Box>
                    
                    <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
                      {achievements[currentIndex].description}
                    </Typography>
                    
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Impact:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      {achievements[currentIndex].impact}
                    </Typography>
                    
                    {/* Achievement Stats */}
                    {achievements[currentIndex].stats && (
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                        {achievements[currentIndex].stats!.map((stat, idx) => {
                          const StatIcon = stat.icon || Star;
                          return (
                            <Box key={idx} sx={{ textAlign: 'center', p: 2, bgcolor: alpha(achievements[currentIndex].color, 0.1), borderRadius: 1 }}>
                              <StatIcon sx={{ color: achievements[currentIndex].color, mb: 1 }} />
                              <Typography variant="h6" sx={{ fontWeight: 'bold', color: achievements[currentIndex].color }}>
                                {stat.value}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {stat.label}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
                
                {/* Progress indicator */}
                <Box sx={{ mt: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={((currentIndex + 1) / achievements.length) * 100}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: alpha(achievements[currentIndex].color, 0.2),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: achievements[currentIndex].color,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                    {currentIndex + 1} of {achievements.length} achievements
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* All Achievements Grid */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          All Achievements
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3 
        }}>
          {filteredAchievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const isSelected = selectedAchievement?.id === achievement.id;
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${isSelected ? achievement.color : 'transparent'}`,
                    '&:hover': {
                      boxShadow: `0 8px 32px ${alpha(achievement.color, 0.2)}`,
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => setSelectedAchievement(isSelected ? null : achievement)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: alpha(achievement.color, 0.1),
                          mr: 2,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 24, color: achievement.color }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                          {achievement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {achievement.date} • {categoryConfig[achievement.category].name}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {achievement.description}
                    </Typography>
                    
                    {/* Level indicator */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Level
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: getLevelColor(achievement.level), textTransform: 'capitalize' }}>
                          {achievement.level}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getLevelProgress(achievement.level)}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: alpha(getLevelColor(achievement.level), 0.2),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getLevelColor(achievement.level),
                          },
                        }}
                      />
                    </Box>
                    
                    {/* Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {achievement.tags.slice(0, 3).map((tag) => (
                        <Typography
                          key={tag}
                          variant="caption"
                          sx={{
                            px: 1,
                            py: 0.5,
                            bgcolor: alpha(achievement.color, 0.1),
                            color: achievement.color,
                            borderRadius: 1,
                            fontSize: '0.7rem',
                          }}
                        >
                          {tag}
                        </Typography>
                      ))}
                      {achievement.tags.length > 3 && (
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1,
                            py: 0.5,
                            bgcolor: alpha(theme.palette.text.secondary, 0.1),
                            color: 'text.secondary',
                            borderRadius: 1,
                            fontSize: '0.7rem',
                          }}
                        >
                          +{achievement.tags.length - 3}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default AchievementShowcase;
