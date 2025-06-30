import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
  Container,
  LinearProgress,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code,
  Web,
  Storage,
  Cloud,
  Build,
  Psychology,
  Palette,
  Timeline,
  Star,
  CheckCircle,
} from '@mui/icons-material';

interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools' | 'mobile' | 'ai-ml' | 'design';
  proficiency: number; // 1-10
  experience: number; // years
  projectCount: number;
  description: string;
  icon?: string;
  color: string;
  status: 'learning' | 'proficient' | 'expert' | 'teaching';
  firstUsed: string;
  lastUsed: string;
  trends: 'rising' | 'stable' | 'declining';
  certifications?: string[];
  projects?: string[];
  features: string[];
}

interface TechCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Web,
    color: '#3b82f6',
    description: 'User interfaces and experiences',
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Code,
    color: '#10b981',
    description: 'Server-side logic and APIs',
  },
  {
    id: 'database',
    name: 'Database',
    icon: Storage,
    color: '#8b5cf6',
    description: 'Data storage and management',
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: '#f59e0b',
    description: 'Infrastructure and deployment',
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Build,
    color: '#ec4899',
    description: 'Mobile app development',
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    icon: Psychology,
    color: '#06b6d4',
    description: 'Artificial intelligence and machine learning',
  },
  {
    id: 'design',
    name: 'Design',
    icon: Palette,
    color: '#f97316',
    description: 'UI/UX and visual design',
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: Timeline,
    color: '#84cc16',
    description: 'Development tools and utilities',
  },
];

const technologies: Technology[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 9,
    experience: 5,
    projectCount: 25,
    description: 'My go-to library for building dynamic user interfaces with component-based architecture.',
    color: '#61dafb',
    status: 'expert',
    firstUsed: '2019',
    lastUsed: '2024',
    trends: 'stable',
    certifications: ['React Developer Certification'],
    projects: ['Portfolio Website', 'E-commerce Platform', 'Task Management App'],
    features: ['Hooks', 'Context API', 'Suspense', 'Concurrent Features'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 8,
    experience: 4,
    projectCount: 20,
    description: 'Essential for building scalable applications with type safety and better developer experience.',
    color: '#3178c6',
    status: 'expert',
    firstUsed: '2020',
    lastUsed: '2024',
    trends: 'rising',
    features: ['Type Safety', 'IntelliSense', 'Refactoring', 'Interface Design'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    proficiency: 8,
    experience: 3,
    projectCount: 15,
    description: 'Full-stack React framework for production-ready applications with SSR and SSG.',
    color: '#000000',
    status: 'proficient',
    firstUsed: '2021',
    lastUsed: '2024',
    trends: 'rising',
    features: ['SSR/SSG', 'API Routes', 'Image Optimization', 'App Router'],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    proficiency: 7,
    experience: 2,
    projectCount: 8,
    description: 'Progressive framework for building user interfaces with gentle learning curve.',
    color: '#4fc08d',
    status: 'proficient',
    firstUsed: '2022',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Composition API', 'Reactivity', 'Directives', 'SFC'],
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 9,
    experience: 5,
    projectCount: 30,
    description: 'Server-side JavaScript runtime for building scalable network applications.',
    color: '#339933',
    status: 'expert',
    firstUsed: '2019',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Express.js', 'Event Loop', 'NPM Ecosystem', 'Microservices'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    proficiency: 8,
    experience: 6,
    projectCount: 20,
    description: 'Versatile language for web development, data science, and automation.',
    color: '#3776ab',
    status: 'expert',
    firstUsed: '2018',
    lastUsed: '2024',
    trends: 'rising',
    features: ['Django/Flask', 'Data Science', 'Automation', 'AI/ML'],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    proficiency: 7,
    experience: 2,
    projectCount: 10,
    description: 'Query language for APIs providing efficient data fetching.',
    color: '#e10098',
    status: 'proficient',
    firstUsed: '2022',
    lastUsed: '2024',
    trends: 'rising',
    features: ['Type System', 'Single Endpoint', 'Real-time', 'Introspection'],
  },

  // Database
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    proficiency: 8,
    experience: 4,
    projectCount: 20,
    description: 'NoSQL database for flexible, scalable data storage.',
    color: '#47a248',
    status: 'expert',
    firstUsed: '2020',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Document Store', 'Aggregation', 'Indexing', 'Sharding'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 7,
    experience: 3,
    projectCount: 12,
    description: 'Advanced relational database with powerful features.',
    color: '#336791',
    status: 'proficient',
    firstUsed: '2021',
    lastUsed: '2024',
    trends: 'stable',
    features: ['ACID Compliance', 'JSON Support', 'Full-text Search', 'Extensions'],
  },

  // Cloud & DevOps
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    proficiency: 8,
    experience: 3,
    projectCount: 15,
    description: 'Comprehensive cloud platform for scalable infrastructure.',
    color: '#ff9900',
    status: 'expert',
    firstUsed: '2021',
    lastUsed: '2024',
    trends: 'stable',
    certifications: ['AWS Solutions Architect Professional'],
    features: ['EC2', 'Lambda', 'S3', 'RDS', 'CloudFormation'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    proficiency: 8,
    experience: 4,
    projectCount: 25,
    description: 'Containerization platform for consistent deployments.',
    color: '#2496ed',
    status: 'expert',
    firstUsed: '2020',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Containerization', 'Multi-stage Builds', 'Compose', 'Swarm'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'cloud',
    proficiency: 6,
    experience: 2,
    projectCount: 8,
    description: 'Container orchestration for managing distributed applications.',
    color: '#326ce5',
    status: 'learning',
    firstUsed: '2022',
    lastUsed: '2024',
    trends: 'rising',
    features: ['Orchestration', 'Auto-scaling', 'Service Discovery', 'Rolling Updates'],
  },

  // Mobile
  {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    proficiency: 7,
    experience: 2,
    projectCount: 6,
    description: 'Cross-platform mobile development using React.',
    color: '#61dafb',
    status: 'proficient',
    firstUsed: '2022',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Cross-platform', 'Native Performance', 'Hot Reload', 'Expo'],
  },

  // AI/ML
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'ai-ml',
    proficiency: 6,
    experience: 2,
    projectCount: 5,
    description: 'Open-source machine learning framework.',
    color: '#ff6f00',
    status: 'learning',
    firstUsed: '2022',
    lastUsed: '2024',
    trends: 'rising',
    features: ['Neural Networks', 'TensorBoard', 'Keras', 'TensorFlow.js'],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai-ml',
    proficiency: 5,
    experience: 1,
    projectCount: 3,
    description: 'Dynamic neural network framework for research and production.',
    color: '#ee4c2c',
    status: 'learning',
    firstUsed: '2023',
    lastUsed: '2024',
    trends: 'rising',
    features: ['Dynamic Graphs', 'Research-friendly', 'TorchScript', 'Lightning'],
  },

  // Design
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    proficiency: 7,
    experience: 3,
    projectCount: 15,
    description: 'Collaborative design tool for UI/UX design and prototyping.',
    color: '#f24e1e',
    status: 'proficient',
    firstUsed: '2021',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Prototyping', 'Components', 'Auto Layout', 'Design Systems'],
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    proficiency: 9,
    experience: 6,
    projectCount: 50,
    description: 'Distributed version control system for tracking changes.',
    color: '#f05032',
    status: 'expert',
    firstUsed: '2018',
    lastUsed: '2024',
    trends: 'stable',
    features: ['Branching', 'Merging', 'Rebasing', 'Workflows'],
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    proficiency: 9,
    experience: 5,
    projectCount: 50,
    description: 'Powerful code editor with extensive plugin ecosystem.',
    color: '#007acc',
    status: 'expert',
    firstUsed: '2019',
    lastUsed: '2024',
    trends: 'stable',
    features: ['IntelliSense', 'Debugging', 'Extensions', 'Git Integration'],
  },
];

const TechStackExplorer: React.FC = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [sortBy, setSortBy] = useState<'proficiency' | 'experience' | 'projects'>('proficiency');
  const [showOnlyExpert, setShowOnlyExpert] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredTechnologies = technologies
    .filter(tech => selectedCategory === 'all' || tech.category === selectedCategory)
    .filter(tech => !showOnlyExpert || tech.status === 'expert')
    .sort((a, b) => {
      const aValue = sortBy === 'projects' ? a.projectCount : a[sortBy];
      const bValue = sortBy === 'projects' ? b.projectCount : b[sortBy];
      return bValue - aValue;
    });

  const getStatusColor = (status: Technology['status']) => {
    switch (status) {
      case 'learning': return '#f59e0b';
      case 'proficient': return '#3b82f6';
      case 'expert': return '#10b981';
      case 'teaching': return '#8b5cf6';
      default: return theme.palette.text.secondary;
    }
  };

  const getStatusIcon = (status: Technology['status']) => {
    switch (status) {
      case 'learning': return '📚';
      case 'proficient': return '💪';
      case 'expert': return '🌟';
      case 'teaching': return '👨‍🏫';
      default: return '📖';
    }
  };

  const getTrendIcon = (trend: Technology['trends']) => {
    switch (trend) {
      case 'rising': return '📈';
      case 'stable': return '📊';
      case 'declining': return '📉';
      default: return '📊';
    }
  };

  const calculateOverallStats = () => {
    const totalTechs = technologies.length;
    const expertTechs = technologies.filter(t => t.status === 'expert').length;
    const avgProficiency = technologies.reduce((sum, tech) => sum + tech.proficiency, 0) / totalTechs;
    const totalProjects = technologies.reduce((sum, tech) => sum + tech.projectCount, 0);
    
    return {
      totalTechs,
      expertTechs,
      avgProficiency: avgProficiency.toFixed(1),
      totalProjects,
    };
  };

  const stats = calculateOverallStats();

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
              Tech Stack Explorer
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Deep dive into my technical expertise and experience
            </Typography>

            {/* Overall Stats */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mb: 6,
              maxWidth: 600,
              mx: 'auto'
            }}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                  {stats.totalTechs}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Technologies
                </Typography>
              </Card>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                  {stats.expertTechs}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expert Level
                </Typography>
              </Card>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
                  {stats.avgProficiency}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Proficiency
                </Typography>
              </Card>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#8b5cf6' }}>
                  {stats.totalProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Projects
                </Typography>
              </Card>
            </Box>
          </Box>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip
                label="All"
                clickable
                variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                sx={{
                  bgcolor: selectedCategory === 'all' ? theme.palette.primary.main : 'transparent',
                  borderColor: theme.palette.primary.main,
                  color: selectedCategory === 'all' ? 'white' : theme.palette.primary.main,
                }}
                onClick={() => setSelectedCategory('all')}
              />
              {techCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Chip
                    key={category.id}
                    icon={<IconComponent sx={{ fontSize: '1rem' }} />}
                    label={category.name}
                    clickable
                    variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                    sx={{
                      bgcolor: selectedCategory === category.id ? category.color : 'transparent',
                      borderColor: category.color,
                      color: selectedCategory === category.id ? 'white' : category.color,
                      '&:hover': {
                        bgcolor: alpha(category.color, 0.1),
                      },
                    }}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                );
              })}
            </Box>
          </Box>
        </motion.div>

        {/* Sort and Filter Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {(['proficiency', 'experience', 'projects'] as const).map((sort) => (
              <Chip
                key={sort}
                label={`Sort by ${sort}`}
                clickable
                variant={sortBy === sort ? 'filled' : 'outlined'}
                onClick={() => setSortBy(sort)}
                sx={{
                  textTransform: 'capitalize',
                  bgcolor: sortBy === sort ? theme.palette.secondary.main : 'transparent',
                  color: sortBy === sort ? 'white' : theme.palette.secondary.main,
                }}
              />
            ))}
          </Box>
          <Chip
            label="Expert Only"
            clickable
            variant={showOnlyExpert ? 'filled' : 'outlined'}
            onClick={() => setShowOnlyExpert(!showOnlyExpert)}
            sx={{
              bgcolor: showOnlyExpert ? '#10b981' : 'transparent',
              borderColor: '#10b981',
              color: showOnlyExpert ? 'white' : '#10b981',
            }}
          />
        </Box>

        {/* Technology Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 8 
        }}>
          {filteredTechnologies.map((tech, index) => {
            const category = techCategories.find(c => c.id === tech.category);
            const isSelected = selectedTech?.id === tech.id;
            
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${isSelected ? tech.color : 'transparent'}`,
                    '&:hover': {
                      boxShadow: `0 8px 32px ${alpha(tech.color, 0.2)}`,
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => setSelectedTech(isSelected ? null : tech)}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Tech Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          bgcolor: alpha(tech.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: tech.color,
                        }}
                      >
                        {tech.name.charAt(0)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                          {tech.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: getStatusColor(tech.status) }}>
                            {getStatusIcon(tech.status)} {tech.status}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getTrendIcon(tech.trends)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Proficiency */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Proficiency
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: tech.color }}>
                          {tech.proficiency}/10
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={tech.proficiency * 10}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: alpha(tech.color, 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: tech.color,
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>

                    {/* Stats */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: tech.color }}>
                          {tech.experience}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Years
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: tech.color }}>
                          {tech.projectCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Projects
                        </Typography>
                      </Box>
                    </Box>

                    {/* Category */}
                    <Chip
                      label={category?.name}
                      size="small"
                      sx={{
                        bgcolor: alpha(category?.color || theme.palette.primary.main, 0.1),
                        color: category?.color,
                        fontSize: '0.75rem',
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        {/* Detailed Tech Info */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  border: `2px solid ${selectedTech.color}`,
                  boxShadow: `0 8px 32px ${alpha(selectedTech.color, 0.2)}`,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        bgcolor: selectedTech.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                      }}
                    >
                      {selectedTech.name.charAt(0)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {selectedTech.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {selectedTech.description}
                      </Typography>
                      
                      {/* Quick Stats */}
                      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Status</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: getStatusColor(selectedTech.status), textTransform: 'capitalize' }}>
                            {getStatusIcon(selectedTech.status)} {selectedTech.status}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Experience</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {selectedTech.firstUsed} - {selectedTech.lastUsed}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Trend</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                            {getTrendIcon(selectedTech.trends)} {selectedTech.trends}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Features */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Key Features I've Worked With
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedTech.features.map((feature) => (
                        <Chip
                          key={feature}
                          label={feature}
                          size="small"
                          sx={{
                            bgcolor: alpha(selectedTech.color, 0.1),
                            color: selectedTech.color,
                            borderColor: selectedTech.color,
                            variant: 'outlined',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Projects */}
                  {selectedTech.projects && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Notable Projects
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {selectedTech.projects.map((project, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <CheckCircle sx={{ fontSize: 16, color: selectedTech.color, mr: 1 }} />
                            {project}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Certifications */}
                  {selectedTech.certifications && (
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Certifications
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedTech.certifications.map((cert) => (
                          <Chip
                            key={cert}
                            label={cert}
                            icon={<Star />}
                            sx={{
                              bgcolor: selectedTech.color,
                              color: 'white',
                              '&:hover': {
                                bgcolor: alpha(selectedTech.color, 0.8),
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default TechStackExplorer;
