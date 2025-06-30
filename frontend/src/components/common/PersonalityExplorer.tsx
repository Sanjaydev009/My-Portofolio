import React, { useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import {
  Psychology as PsychologyIcon,
  Lightbulb as CreativeIcon,
  Group as TeamIcon,
  TrendingUp as LeadershipIcon,
  Favorite as EmpathyIcon,
  Build as ProblemSolverIcon,
  School as LearnerIcon,
  Explore as CuriousIcon,
} from '@mui/icons-material';

interface PersonalityTrait {
  id: string;
  name: string;
  value: number;
  description: string;
  color: string;
  icon: React.ElementType;
}

interface CoreValue {
  name: string;
  description: string;
  importance: number;
}

const PersonalityExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTrait, setHoveredTrait] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const personalityTraits: PersonalityTrait[] = [
    {
      id: 'creative',
      name: 'Creative',
      value: 92,
      description: 'I love finding innovative solutions and thinking outside the box.',
      color: '#ff6b6b',
      icon: CreativeIcon,
    },
    {
      id: 'analytical',
      name: 'Analytical',
      value: 88,
      description: 'I approach problems systematically and love diving deep into data.',
      color: '#4ecdc4',
      icon: PsychologyIcon,
    },
    {
      id: 'collaborative',
      name: 'Collaborative',
      value: 85,
      description: 'I thrive in team environments and believe in collective success.',
      color: '#45b7d1',
      icon: TeamIcon,
    },
    {
      id: 'leadership',
      name: 'Leadership',
      value: 78,
      description: 'I enjoy guiding teams and projects toward successful outcomes.',
      color: '#f9ca24',
      icon: LeadershipIcon,
    },
    {
      id: 'empathetic',
      name: 'Empathetic',
      value: 90,
      description: 'I connect well with others and understand diverse perspectives.',
      color: '#f0932b',
      icon: EmpathyIcon,
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      value: 95,
      description: 'I excel at breaking down complex challenges into manageable solutions.',
      color: '#eb4d4b',
      icon: ProblemSolverIcon,
    },
    {
      id: 'learner',
      name: 'Continuous Learner',
      value: 93,
      description: 'I have an insatiable curiosity for new technologies and methods.',
      color: '#6c5ce7',
      icon: LearnerIcon,
    },
    {
      id: 'curious',
      name: 'Curious',
      value: 89,
      description: 'I always ask "why" and "how can we improve this?"',
      color: '#a29bfe',
      icon: CuriousIcon,
    },
  ];

  const coreValues: CoreValue[] = [
    {
      name: 'Excellence',
      description: 'Striving for the highest quality in everything I do.',
      importance: 95,
    },
    {
      name: 'Innovation',
      description: 'Constantly seeking new and better ways to solve problems.',
      importance: 90,
    },
    {
      name: 'Integrity',
      description: 'Being honest, transparent, and ethical in all interactions.',
      importance: 98,
    },
    {
      name: 'Growth',
      description: 'Embracing challenges as opportunities to learn and improve.',
      importance: 87,
    },
    {
      name: 'Impact',
      description: 'Creating meaningful solutions that make a positive difference.',
      importance: 92,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Traits' },
    { id: 'technical', name: 'Technical' },
    { id: 'interpersonal', name: 'Interpersonal' },
    { id: 'leadership', name: 'Leadership' },
  ];

  const getFilteredTraits = () => {
    if (selectedCategory === 'all') return personalityTraits;
    if (selectedCategory === 'technical') {
      return personalityTraits.filter(trait => 
        ['analytical', 'problem-solver', 'learner', 'curious'].includes(trait.id)
      );
    }
    if (selectedCategory === 'interpersonal') {
      return personalityTraits.filter(trait => 
        ['empathetic', 'collaborative', 'creative'].includes(trait.id)
      );
    }
    if (selectedCategory === 'leadership') {
      return personalityTraits.filter(trait => 
        ['leadership', 'problem-solver', 'collaborative'].includes(trait.id)
      );
    }
    return personalityTraits;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Personality Explorer
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
          Discover the traits, values, and characteristics that define who I am as a developer and collaborator.
        </Typography>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory(category.id)}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: selectedCategory === category.id ? 'bold' : 'medium',
              }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </motion.div>

      {/* Personality Traits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Personality Traits
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3 
          }}>
            {getFilteredTraits().map((trait, index) => {
              const IconComponent = trait.icon;
              const isHovered = hoveredTrait === trait.id;
              
              return (
                <motion.div
                  key={trait.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredTrait(trait.id)}
                  onHoverEnd={() => setHoveredTrait(null)}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: isHovered 
                        ? `linear-gradient(135deg, ${alpha(trait.color, 0.1)}, ${alpha(trait.color, 0.05)})`
                        : 'background.paper',
                      border: `2px solid ${isHovered ? trait.color : 'transparent'}`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '50%',
                          bgcolor: alpha(trait.color, 0.1),
                          mb: 2,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 32, color: trait.color }} />
                      </Box>
                      
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {trait.name}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {trait.description}
                      </Typography>
                      
                      {/* Trait strength visualization */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Strength
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: trait.color }}>
                            {trait.value}%
                          </Typography>
                        </Box>
                        
                        <Box
                          sx={{
                            height: 8,
                            bgcolor: alpha(trait.color, 0.1),
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${trait.value}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                            style={{
                              height: '100%',
                              background: `linear-gradient(90deg, ${trait.color}, ${alpha(trait.color, 0.7)})`,
                              borderRadius: 4,
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </Box>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Core Values
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 3 
          }}>
            {coreValues.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {value.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {value.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            height: 6,
                            bgcolor: 'action.hover',
                            borderRadius: 3,
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${value.importance}%` } : {}}
                            transition={{ duration: 1, delay: 1 + index * 0.1 }}
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #667eea, #764ba2)',
                              borderRadius: 3,
                            }}
                          />
                        </Box>
                      </Box>
                      <Chip
                        label={`${value.importance}%`}
                        size="small"
                        sx={{
                          bgcolor: alpha('#667eea', 0.1),
                          color: '#667eea',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default PersonalityExplorer;
