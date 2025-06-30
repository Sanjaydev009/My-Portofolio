import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ExpandMore,
  FormatQuote,
  Lightbulb,
  Group,
  TrendingUp,
  Nature,
  AutoAwesome,
  PlayArrow,
} from '@mui/icons-material';

interface PhilosophySection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: React.ElementType;
  color: string;
  quote: string;
  details: {
    principles: string[];
    practices: string[];
    impact: string;
  };
}

interface LifeQuote {
  text: string;
  author: string;
  context: string;
  personal: string;
}

const philosophySections: PhilosophySection[] = [
  {
    id: 'growth',
    title: 'Continuous Growth',
    subtitle: 'Never stop learning, never stop improving',
    content: 'I believe that growth is the essence of life. Every challenge is an opportunity to become better, every failure a lesson in disguise.',
    icon: TrendingUp,
    color: '#10b981',
    quote: "The only constant in life is change, and the only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    details: {
      principles: [
        'Embrace challenges as growth opportunities',
        'Learn from failures and setbacks',
        'Seek feedback and different perspectives',
        'Stay curious about new technologies and methods'
      ],
      practices: [
        'Daily learning through reading and experimentation',
        'Regular reflection on progress and areas for improvement',
        'Attending conferences and workshops',
        'Building side projects to explore new concepts'
      ],
      impact: 'This mindset has helped me adapt to rapidly changing technology landscapes and continuously improve my skills and impact.'
    }
  },
  {
    id: 'innovation',
    title: 'Innovation Through Empathy',
    subtitle: 'Creating solutions that truly matter',
    content: 'Great technology isn\'t just about what\'s possible—it\'s about what\'s meaningful. I strive to build solutions that genuinely improve people\'s lives.',
    icon: Lightbulb,
    color: '#f59e0b',
    quote: "Innovation is not about saying yes to everything. It's about saying no to all but the most crucial features.",
    details: {
      principles: [
        'Put user needs first in every decision',
        'Solve real problems, not imaginary ones',
        'Think beyond technical requirements to human impact',
        'Question assumptions and conventional approaches'
      ],
      practices: [
        'User research and testing in every project',
        'Accessibility-first design and development',
        'Regular user feedback collection and analysis',
        'Cross-functional collaboration with designers and stakeholders'
      ],
      impact: 'This approach has led to products with higher user satisfaction and more meaningful business outcomes.'
    }
  },
  {
    id: 'collaboration',
    title: 'Collaborative Excellence',
    subtitle: 'Together we achieve more',
    content: 'The best solutions emerge from diverse minds working together. I believe in fostering environments where everyone can contribute their unique strengths.',
    icon: Group,
    color: '#8b5cf6',
    quote: "If you want to go fast, go alone. If you want to go far, go together.",
    details: {
      principles: [
        'Value diverse perspectives and backgrounds',
        'Create psychological safety for open communication',
        'Share knowledge freely and learn from others',
        'Celebrate team successes over individual achievements'
      ],
      practices: [
        'Regular pair programming and code reviews',
        'Knowledge sharing sessions and documentation',
        'Mentoring junior developers',
        'Contributing to open source communities'
      ],
      impact: 'Teams I\'ve worked with have shown increased productivity, innovation, and job satisfaction.'
    }
  },
  {
    id: 'mindfulness',
    title: 'Mindful Technology',
    subtitle: 'Building with intention and awareness',
    content: 'Technology should enhance human connection and well-being, not diminish it. I practice mindful development that considers the broader impact of what we build.',
    icon: Nature,
    color: '#06b6d4',
    quote: "The best technology is invisible, seamlessly integrating into our lives to make us more human, not less.",
    details: {
      principles: [
        'Consider the ethical implications of technology',
        'Prioritize user privacy and data protection',
        'Build inclusive and accessible solutions',
        'Balance efficiency with human values'
      ],
      practices: [
        'Privacy-by-design implementation',
        'Regular accessibility audits and improvements',
        'Sustainable coding practices',
        'Mindful communication in digital spaces'
      ],
      impact: 'This philosophy has guided me to create more responsible and sustainable technology solutions.'
    }
  },
  {
    id: 'craftsmanship',
    title: 'Digital Craftsmanship',
    subtitle: 'Pride in every line of code',
    content: 'I approach coding as a craft—each function, each component is an opportunity to create something beautiful, maintainable, and meaningful.',
    icon: AutoAwesome,
    color: '#ec4899',
    quote: "Quality is not an act, it is a habit.",
    details: {
      principles: [
        'Write code that tells a story',
        'Prioritize clarity over cleverness',
        'Invest in proper architecture and design',
        'Leave codebases better than you found them'
      ],
      practices: [
        'Test-driven development and comprehensive testing',
        'Regular refactoring and code quality improvements',
        'Detailed documentation and commenting',
        'Following established patterns and best practices'
      ],
      impact: 'This commitment to craftsmanship has resulted in more maintainable systems and fewer production issues.'
    }
  }
];

const lifeQuotes: LifeQuote[] = [
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    context: "On authenticity and self-expression",
    personal: "This reminds me to bring my authentic self to every project and team, contributing my unique perspective rather than trying to fit a mold."
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    context: "On vision and possibility",
    personal: "This quote inspires me to pursue ambitious technical challenges and believe in the potential of technology to create positive change."
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    context: "On finding solutions in challenges",
    personal: "Every bug, every complex requirement, every tight deadline is an opportunity to grow and innovate. This mindset has helped me thrive under pressure."
  }
];

const PersonalPhilosophy: React.FC = () => {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % lifeQuotes.length);
  };

  const currentQuote = lifeQuotes[currentQuoteIndex];

  return (
    <Box ref={ref} sx={{ py: 8, px: 2 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            My Philosophy
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            The principles and beliefs that guide my work and life
          </Typography>

          {/* Rotating inspirational quote */}
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                maxWidth: 800,
                mx: 'auto',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                position: 'relative',
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <FormatQuote
                  sx={{
                    fontSize: 48,
                    color: alpha(theme.palette.primary.main, 0.3),
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontStyle: 'italic',
                    fontWeight: 300,
                    mb: 3,
                    lineHeight: 1.4,
                  }}
                >
                  "{currentQuote.text}"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  — {currentQuote.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {currentQuote.context}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Personal reflection: {currentQuote.personal}
                </Typography>
                
                <IconButton
                  onClick={nextQuote}
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <PlayArrow />
                </IconButton>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </motion.div>

      {/* Philosophy Sections */}
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        {philosophySections.map((section, index) => {
          const IconComponent = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Accordion
                expanded={isExpanded}
                onChange={() => handleSectionToggle(section.id)}
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  border: `2px solid ${isExpanded ? section.color : 'transparent'}`,
                  '&:before': { display: 'none' },
                  boxShadow: isExpanded 
                    ? `0 8px 32px ${alpha(section.color, 0.2)}`
                    : theme.shadows[1],
                  transition: 'all 0.3s ease',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: section.color }} />}
                  sx={{
                    minHeight: 80,
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      py: 2,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: alpha(section.color, 0.1),
                        mr: 3,
                        transition: 'all 0.3s ease',
                        transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 28, color: section.color }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 'bold',
                          color: isExpanded ? section.color : 'text.primary',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {section.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 4, pb: 4 }}>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{ pl: 8 }}>
                          {/* Main content */}
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: '1.1rem',
                              lineHeight: 1.6,
                              mb: 4,
                            }}
                          >
                            {section.content}
                          </Typography>

                          {/* Inspirational quote */}
                          <Box
                            sx={{
                              p: 3,
                              mb: 4,
                              borderLeft: `4px solid ${section.color}`,
                              bgcolor: alpha(section.color, 0.05),
                              borderRadius: '0 8px 8px 0',
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontStyle: 'italic',
                                fontWeight: 300,
                                color: section.color,
                                mb: 1,
                              }}
                            >
                              "{section.quote}"
                            </Typography>
                          </Box>

                          {/* Detailed breakdown */}
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
                            {/* Principles */}
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 'bold',
                                  color: section.color,
                                  mb: 2,
                                }}
                              >
                                Core Principles
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {section.details.principles.map((principle, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ display: 'flex', alignItems: 'flex-start' }}
                                    >
                                      <Box
                                        sx={{
                                          width: 6,
                                          height: 6,
                                          borderRadius: '50%',
                                          bgcolor: section.color,
                                          mt: 1,
                                          mr: 2,
                                          flexShrink: 0,
                                        }}
                                      />
                                      {principle}
                                    </Typography>
                                  </motion.div>
                                ))}
                              </Box>
                            </Box>

                            {/* Practices */}
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 'bold',
                                  color: section.color,
                                  mb: 2,
                                }}
                              >
                                How I Practice This
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {section.details.practices.map((practice, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ display: 'flex', alignItems: 'flex-start' }}
                                    >
                                      <Box
                                        sx={{
                                          width: 6,
                                          height: 6,
                                          borderRadius: '50%',
                                          bgcolor: section.color,
                                          mt: 1,
                                          mr: 2,
                                          flexShrink: 0,
                                        }}
                                      />
                                      {practice}
                                    </Typography>
                                  </motion.div>
                                ))}
                              </Box>
                            </Box>
                          </Box>

                          {/* Impact */}
                          <Box sx={{ mt: 4 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 'bold',
                                color: section.color,
                                mb: 2,
                              }}
                            >
                              Real-World Impact
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                p: 3,
                                bgcolor: alpha(section.color, 0.05),
                                borderRadius: 2,
                                border: `1px solid ${alpha(section.color, 0.2)}`,
                              }}
                            >
                              {section.details.impact}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default PersonalPhilosophy;
