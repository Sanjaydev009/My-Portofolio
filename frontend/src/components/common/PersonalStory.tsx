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
    title: 'Village Roots',
    subtitle: 'Born in 2000 in a small village',
    content: [
      "I was born in the year 2000 in a small village, where life was simple and dreams were big. Growing up in a rural setting taught me the values of hard work, perseverance, and never giving up on your aspirations.",
      "The village environment shaped my character - surrounded by nature, close-knit community, and the understanding that education would be my gateway to new opportunities.",
      "Even as a young child, I was curious about the world beyond our village, always wondering how things worked and dreaming of making a difference through technology.",
      "This humble beginning would become the foundation of my determination to learn and grow, no matter the circumstances."
    ],
    theme: 'childhood',
    color: '#f59e0b',
    icon: Psychology,
    mood: 'reflective',
    tags: ['Village Life', 'Born 2000', 'Simple Beginnings', 'Family Values'],
    year: '2000',
    location: 'Small Village'
  },
  {
    id: 'early-education',
    title: 'Foundation Years',
    subtitle: 'Sri Chaitanya Vidyalayam Gantlakunta',
    content: [
      "My formal education began at Sri Chaitanya Vidyalayam in Gantlakunta, where I spent my foundational years from 1st to 8th standard. These were the years that built my academic discipline and love for learning.",
      "The school provided a structured environment that nurtured not just academic growth but also character development. Every day was a new opportunity to discover something fascinating.",
      "Teachers at Sri Chaitanya recognized my potential and encouraged me to think beyond textbooks. They planted the seeds of curiosity that would later bloom into my passion for technology.",
      "These eight years taught me that consistent effort and dedication are the keys to achieving any goal, no matter how ambitious it might seem."
    ],
    theme: 'education',
    color: '#10b981',
    icon: School,
    mood: 'inspiring',
    tags: ['Primary Education', 'Sri Chaitanya', 'Academic Foundation', 'Character Building'],
    year: '2005-2013',
    location: 'Gantlakunta'
  },
  {
    id: 'high-school',
    title: 'Transition Years',
    subtitle: 'ZPPSS Kodakandla',
    content: [
      "For my 9th and 10th standards, I moved to ZPPSS (Zilla Parishad Primary School) at Kodakandla. This transition marked a significant phase in my educational journey.",
      "The change in environment brought new challenges and opportunities. I had to adapt to different teaching methods and make new friendships, which taught me flexibility and resilience.",
      "During these crucial years, I began to understand the importance of self-study and independent learning. The foundation laid here would prove invaluable in my future academic pursuits.",
      "These two years shaped my ability to adapt to new situations and thrive in different environments - skills that would serve me well in my technology career."
    ],
    theme: 'growth',
    color: '#8b5cf6',
    icon: School,
    mood: 'challenging',
    tags: ['High School', 'ZPPSS', 'Adaptation', 'Self-Learning'],
    year: '2013-2015',
    location: 'Kodakandla'
  },
  {
    id: 'intermediate',
    title: 'Preparing for the Future',
    subtitle: 'TS Model Junior College',
    content: [
      "My intermediate education at TS Model Junior College in Kodakandla was where I began to see the broader picture of what I wanted to achieve in life.",
      "The college environment exposed me to diverse subjects and helped me understand my strengths and interests. This was where I first started thinking seriously about higher education and career paths.",
      "The faculty at TS Model Junior College were instrumental in guiding me towards making informed decisions about my future. They encouraged critical thinking and analytical skills.",
      "These two years were crucial in building my confidence and preparing me for the challenges of higher education and eventual entry into the world of technology."
    ],
    theme: 'preparation',
    color: '#06b6d4',
    icon: School,
    mood: 'inspiring',
    tags: ['Intermediate', 'TS Model College', 'Career Planning', 'Critical Thinking'],
    year: '2016-2018',
    location: 'Kodakandla'
  },
  {
    id: 'bachelor-degree',
    title: 'Higher Education Journey',
    subtitle: 'BA from Dr BR Ambedkar Open University',
    content: [
      "I pursued my Bachelor's degree (BA) from Dr BR Ambedkar Open University, which gave me the flexibility to explore different areas of knowledge while maintaining focus on my core interests.",
      "The open university system taught me self-discipline and independent learning - skills that would prove invaluable in my technology career where continuous learning is essential.",
      "During this time, I began to develop a broader worldview and understanding of how different fields of knowledge interconnect, especially how technology can be applied across various domains.",
      "This degree was more than just academic achievement; it was the stepping stone that gave me the confidence to pursue specialized technical education."
    ],
    theme: 'achievement',
    color: '#ec4899',
    icon: School,
    mood: 'inspiring',
    tags: ['Bachelor Degree', 'BA', 'Dr BR Ambedkar University', 'Self-Discipline'],
    year: '2020-2023',
    location: 'Distance Learning'
  },
  {
    id: 'mca-journey',
    title: 'Discovering My Passion',
    subtitle: 'MCA from Aurora Deemed University',
    content: [
      "My MCA (Master of Computer Applications) from Aurora Deemed to be University was the turning point where I discovered my true calling in technology and software development.",
      "Aurora University provided an excellent environment for learning programming, database management, software engineering, and web technologies. Every subject opened new doors of possibility.",
      "The faculty and curriculum at Aurora were designed to bridge the gap between theoretical knowledge and practical application, preparing us for real-world challenges in the IT industry.",
      "This was where I realized that coding wasn't just about writing programs - it was about solving problems, creating solutions, and making a positive impact through technology."
    ],
    theme: 'discovery',
    color: '#f97316',
    icon: Code,
    mood: 'exciting',
    tags: ['MCA', 'Aurora University', 'Programming', 'Career Focus'],
    year: '2023-2025',
    location: 'Aurora Deemed University'
  },
  {
    id: 'first-code',
    title: 'Hello, World!',
    subtitle: 'My first line of code in 2023',
    content: [
      "In 2023, during my MCA program, I wrote my very first line of code in HTML. That simple '<h1>Hello, World!</h1>' was more than just text - it was the beginning of my journey into the digital world.",
      "Seeing those words appear on a web browser for the first time filled me with an indescribable excitement. I had created something from nothing, using just text and logic.",
      "That first HTML page quickly evolved into more complex structures as I learned CSS for styling and JavaScript for interactivity. Each new concept was like discovering a new superpower.",
      "What started as academic curiosity quickly became a passionate pursuit. I spent countless hours practicing, building small projects, and dreaming of the applications I could create."
    ],
    theme: 'breakthrough',
    color: '#10b981',
    icon: Code,
    mood: 'exciting',
    tags: ['First Code', 'HTML', '2023', 'Web Development', 'Learning'],
    year: '2023',
    location: 'College Lab'
  },
  {
    id: 'heydu-internship',
    title: '🚀 The Golden Opportunity at Heydu Services',
    subtitle: 'Internship with Real-time Impact',
    content: [
      "The opportunity to intern at Heydu Services Pvt Ltd (https://heydu.biz/) came as a blessing that would change the trajectory of my career forever. This wasn't just an internship - it was my gateway into the professional world of software development.",
      "During my internship, I gained real-time hands-on experience working on live production projects that serve actual users. Every day brought new learning opportunities, challenges, and the thrill of seeing my code make a difference in real applications.",
      "The mentorship and guidance I received during this period were invaluable. Working on actual client projects taught me the importance of clean code, proper documentation, meeting deadlines, and the responsibility that comes with professional development.",
      "What made this experience special was the real-time contribution I was able to make. My code wasn't just practice exercises - it was part of applications that users depend on, which gave me a deep sense of responsibility and pride in my work.",
      "This internship gave me the confidence and practical experience I needed to transition from being a student to becoming a professional developer, setting the foundation for my career at the same company."
    ],
    theme: 'opportunity',
    color: '#8b5cf6',
    icon: Work,
    mood: 'inspiring',
    tags: ['Internship', 'Heydu Services', 'Real-time Experience', 'Live Projects', 'Professional Growth'],
    year: '2024',
    location: 'Heydu Services Pvt Ltd'
  },
  {
    id: 'first-job',
    title: '🌟 Dreams Come True at Heydu Services',
    subtitle: 'First Job - February 5th, 2025',
    content: [
      "February 5th, 2025 - a date I'll never forget. This was when I officially started my career as a software developer at Heydu Services Pvt Ltd. The internship had led to a full-time opportunity that changed my life!",
      "I am eternally grateful to Srinivas Sir and Siddhartha for believing in my potential and giving me this incredible opportunity to improve my skills and grow as a developer. Their mentorship has been invaluable.",
      "At Heydu Services (https://heydu.biz/), I gained real-time hands-on experience working on live production projects. Every day brought new challenges, learning opportunities, and the excitement of contributing to applications that serve real users.",
      "Srinivas Sir's guidance taught me not just technical skills but also the importance of professionalism, teamwork, and continuous learning. His faith in my abilities gave me the confidence to take on challenging projects.",
      "Siddhartha's support and collaborative approach showed me how great software is built through teamwork and shared knowledge. Working with both of them has been a privilege and a tremendous learning experience.",
      "This job isn't just about earning a living - it's about contributing to meaningful projects, solving real-world problems, and being part of a team that values innovation and excellence. The real-time experience I'm gaining here is shaping me into a professional developer."
    ],
    theme: 'achievement',
    color: '#ec4899',
    icon: Work,
    mood: 'inspiring',
    tags: ['First Job', 'Heydu Services', 'Srinivas Sir', 'Siddhartha', 'Real-time Experience', 'Professional Growth'],
    year: '2025',
    location: 'Heydu Services Pvt Ltd'
  },
  {
    id: 'philosophy',
    title: 'Looking Forward',
    subtitle: 'My vision for the future',
    content: [
      "As I embark on this professional journey, I carry with me the values instilled during my village upbringing, the knowledge gained through years of education, and the practical skills developed at Heydu Services.",
      "My goal is not just to write code, but to create solutions that make a difference in people's lives. Every project is an opportunity to apply technology for positive impact.",
      "I believe in continuous learning and growth. The technology landscape is ever-evolving, and I'm committed to staying updated with the latest trends and best practices in software development.",
      "From a small village to the world of technology - this journey has taught me that with determination, hard work, and the right opportunities, any dream is achievable.",
      "I'm excited about the future and the possibility of contributing to innovative projects that can change the world, one line of code at a time."
    ],
    theme: 'wisdom',
    color: '#f97316',
    icon: Favorite,
    mood: 'peaceful',
    tags: ['Future Vision', 'Continuous Learning', 'Impact', 'Innovation', 'Growth Mindset'],
    year: '2025 & Beyond',
    location: 'The Future'
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
