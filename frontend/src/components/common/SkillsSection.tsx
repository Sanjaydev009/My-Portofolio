import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'React/TypeScript', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'Angular', level: 75 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Bootstrap', level: 85 },
      { name: 'Material-UI', level: 85 },
    ],
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js/Express', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Java', level: 60 },
      { name: 'RESTful APIs', level: 92 },
    ],
  },
  {
    category: 'Database',
    technologies: [
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'Redis', level: 75 },
      { name: 'Firebase', level: 80 },
    ],
  },
  {
    category: 'AI/ML',
    technologies: [
      { name: 'Machine Learning', level: 78 },
      { name: 'TensorFlow', level: 70 },
      { name: 'PyTorch', level: 65 },
      { name: 'Transformers', level: 72 },
    ],
  },
  {
    category: 'Tools & Others',
    technologies: [
      { name: 'Git/GitHub', level: 95 },
      { name: 'VS Code', level: 95 },
      { name: 'Android Studio', level: 75 },
      { name: 'Figma', level: 80 },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
          >
            Skills & Technologies
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
            A comprehensive overview of my technical expertise and proficiency levels
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {skills.map((skillCategory, categoryIndex) => (
            <Box key={skillCategory.category}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        color: 'primary.main',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                        pb: 1,
                      }}
                    >
                      {skillCategory.category}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      {skillCategory.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.1 + techIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                        >
                          <Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 'medium' }}
                              >
                                {tech.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {tech.level}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={tech.level}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'action.hover',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3,
                                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                                },
                              }}
                            />
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SkillsSection;
