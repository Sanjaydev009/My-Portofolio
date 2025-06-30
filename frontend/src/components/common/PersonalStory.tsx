import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  useTheme,
  alpha,
  Container,
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  PlayArrow,
  Pause,
  NavigateBefore,
  NavigateNext,
  Favorite,
  Lightbulb,
  School,
  Work,
  Code,
  Psychology,
} from '@mui/icons-material';

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  image?: string;
  theme: string;
  color: string;
  icon: React.ElementType;
  mood: 'reflective' | 'exciting' | 'challenging' | 'inspiring' | 'peaceful';
  tags: string[];
  year?: string;
  location?: string;
}

const storyChapters: StoryChapter[] = [
  {
    id: 'beginnings',
    title: 'The Curious Child',
    subtitle: 'Where it all began',
    content: [
      "Growing up, I was the kid who took apart every electronic device I could get my hands on. While other children played with toys, I was fascinated by the blinking lights and mysterious circuits inside our old radio.",
      "My parents weren't thrilled when I 'fixed' our TV remote by completely disassembling it, but they recognized something special in my insatiable curiosity about how things worked.",
      "That curiosity would become the driving force of my entire career - the need to understand, to build, to create something meaningful from nothing but ideas and determination."
    ],
    image: '/api/placeholder/600/400',
    theme: 'childhood',
    color: '#f59e0b',
    icon: Psychology,
    mood: 'reflective',
    tags: ['Curiosity', 'Early Signs', 'Family Support'],
    year: '1995-2005',
    location: 'Small Town'
  },
  {
    id: 'first-code',
    title: 'Hello, World!',
    subtitle: 'My first line of code',
    content: [
      "I still remember the exact moment I wrote my first line of code. It was a simple HTML page that just said 'Hello, World!' in bright blue text. But to me, it was magic.",
      "Seeing those words appear on screen, knowing that I had created them with nothing but text in a file, opened up a universe of possibilities I never knew existed.",
      "I spent the next three months building increasingly complex websites, learning CSS, then JavaScript. Each new concept was like discovering a new superpower.",
      "That summer, coding wasn't just a hobby - it became my language for bringing ideas to life."
    ],
    theme: 'discovery',
    color: '#10b981',
    icon: Code,
    mood: 'exciting',
    tags: ['First Code', 'HTML', 'Self-Learning', 'Summer Project'],
    year: '2010',
    location: 'Bedroom Desk'
  },
  {
    id: 'college-struggles',
    title: 'The Imposter Years',
    subtitle: 'Doubt, growth, and finding my voice',
    content: [
      "College was a humbling experience. Surrounded by brilliant minds, I often felt like I didn't belong. Everyone seemed to know more, code faster, understand concepts quicker.",
      "There were nights I questioned everything - was I cut out for this? Was I smart enough? The imposter syndrome was real and overwhelming.",
      "But those struggles taught me something invaluable: the difference between being smart and being willing to learn. I chose learning.",
      "I started asking more questions, seeking help, and most importantly, helping others when I could. That's when I discovered that teaching others actually made me a better developer."
    ],
    theme: 'growth',
    color: '#8b5cf6',
    icon: School,
    mood: 'challenging',
    tags: ['Imposter Syndrome', 'College', 'Peer Learning', 'Perseverance'],
    year: '2015-2019',
    location: 'University'
  },
  {
    id: 'first-job',
    title: 'Real World, Real Impact',
    subtitle: 'From student to professional',
    content: [
      "My first job was terrifying and exhilarating in equal measure. Suddenly, my code wasn't just for grades - it was being used by real people to solve real problems.",
      "I remember my first bug report from a user. Instead of feeling defeated, I felt energized. Someone cared enough about what I built to report an issue!",
      "Working with experienced developers taught me that good code isn't just about functionality - it's about clarity, maintainability, and empathy for the next person who will read it.",
      "This job showed me that software development is fundamentally about people - understanding their needs, solving their problems, and making their lives a little bit better."
    ],
    theme: 'professional',
    color: '#06b6d4',
    icon: Work,
    mood: 'inspiring',
    tags: ['First Job', 'Real Users', 'Code Quality', 'Team Work'],
    year: '2019',
    location: 'Tech Startup'
  },
  {
    id: 'breakthrough',
    title: 'The Breakthrough Project',
    subtitle: 'When everything clicked',
    content: [
      "There comes a moment in every developer's journey when everything just clicks. For me, it was during a project that seemed impossible at first.",
      "We needed to build a real-time collaboration tool in just six weeks. The requirements were complex, the timeline was tight, and the stakes were high.",
      "But instead of panicking, I found myself breaking down the problem into smaller pieces, designing elegant solutions, and leading a team with confidence I didn't know I had.",
      "When we delivered not just on time, but with features that exceeded expectations, I realized I wasn't just writing code anymore - I was crafting solutions.",
      "That project didn't just change my career trajectory; it changed how I see myself and what I'm capable of achieving."
    ],
    theme: 'achievement',
    color: '#ec4899',
    icon: Lightbulb,
    mood: 'inspiring',
    tags: ['Leadership', 'Complex Project', 'Team Success', 'Confidence'],
    year: '2022',
    location: 'Remote Team'
  },
  {
    id: 'philosophy',
    title: 'Beyond the Code',
    subtitle: 'Discovering purpose in technology',
    content: [
      "As I've grown in my career, I've realized that the most fulfilling projects aren't just technically challenging - they're meaningful.",
      "I've started asking different questions: Who will this help? How will this improve someone's day? What problems are we really solving?",
      "Technology is just a tool. The real magic happens when that tool is used to create positive change, to connect people, to solve problems that matter.",
      "Today, I approach every project with this philosophy: write code that doesn't just work, but code that makes the world a little bit better.",
      "This is my story so far, but I know the best chapters are still being written."
    ],
    theme: 'wisdom',
    color: '#f97316',
    icon: Favorite,
    mood: 'peaceful',
    tags: ['Purpose', 'Philosophy', 'Impact', 'Future Vision'],
    year: '2024',
    location: 'Everywhere'
  }
];

const PersonalStory: React.FC = () => {
  const theme = useTheme();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-advance chapters
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentChapter((prev) => (prev + 1) % storyChapters.length);
    }, 8000); // 8 seconds per chapter

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextChapter = () => {
    setCurrentChapter((prev) => (prev + 1) % storyChapters.length);
    setIsAutoPlaying(false);
  };

  const prevChapter = () => {
    setCurrentChapter((prev) => (prev - 1 + storyChapters.length) % storyChapters.length);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const getCurrentMoodGradient = (mood: StoryChapter['mood']) => {
    switch (mood) {
      case 'reflective':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'exciting':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'challenging':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'inspiring':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'peaceful':
        return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      default:
        return theme.palette.primary.main;
    }
  };

  const chapter = storyChapters[currentChapter];

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
              My Story
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              The journey that shaped who I am today
            </Typography>

            {/* Story Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
              <IconButton onClick={prevChapter} color="primary">
                <NavigateBefore />
              </IconButton>
              
              <IconButton onClick={toggleAutoPlay} color="primary">
                {isAutoPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              
              <IconButton onClick={nextChapter} color="primary">
                <NavigateNext />
              </IconButton>
              
              <Typography variant="body2" color="text.secondary">
                Chapter {currentChapter + 1} of {storyChapters.length}
              </Typography>
            </Box>

            {/* Chapter Navigation Dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
              {storyChapters.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setCurrentChapter(index);
                    setIsAutoPlaying(false);
                  }}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: index === currentChapter ? chapter.color : alpha(theme.palette.text.secondary, 0.3),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Story Chapter */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                maxWidth: 900,
                mx: 'auto',
                background: getCurrentMoodGradient(chapter.mood),
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 500,
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.1,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <CardContent sx={{ p: 6, position: 'relative', zIndex: 1 }}>
                {/* Chapter Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      mr: 3,
                    }}
                  >
                    <chapter.icon sx={{ fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {chapter.title}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {chapter.subtitle}
                    </Typography>
                    {chapter.year && (
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        {chapter.year} • {chapter.location}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Chapter Content */}
                <Box sx={{ mb: 4 }}>
                  {chapter.content.map((paragraph, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.1rem',
                          lineHeight: 1.8,
                          mb: 3,
                          textAlign: 'justify',
                        }}
                      >
                        {paragraph}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>

                {/* Chapter Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {chapter.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Progress Indicator */}
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Story Progress
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {Math.round(((currentChapter + 1) / storyChapters.length) * 100)}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentChapter + 1) / storyChapters.length) * 100}%` }}
                      transition={{ duration: 0.6 }}
                      style={{
                        height: '100%',
                        backgroundColor: 'white',
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Story Timeline Preview */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Story Timeline
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3 
          }}>
            {storyChapters.map((chapterItem, index) => {
              const IconComponent = chapterItem.icon;
              const isActive = index === currentChapter;
              
              return (
                <motion.div
                  key={chapterItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: `2px solid ${isActive ? chapterItem.color : 'transparent'}`,
                      boxShadow: isActive ? `0 8px 32px ${alpha(chapterItem.color, 0.3)}` : theme.shadows[1],
                      '&:hover': {
                        boxShadow: `0 8px 32px ${alpha(chapterItem.color, 0.2)}`,
                        transform: 'translateY(-4px)',
                      },
                    }}
                    onClick={() => {
                      setCurrentChapter(index);
                      setIsAutoPlaying(false);
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '50%',
                          bgcolor: alpha(chapterItem.color, 0.1),
                          mb: 2,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 24, color: chapterItem.color }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {chapterItem.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {chapterItem.subtitle}
                      </Typography>
                      {chapterItem.year && (
                        <Typography variant="caption" color="text.secondary">
                          {chapterItem.year}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PersonalStory;
