import React, { useRef, useEffect, useState } from 'react';
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
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import {
  Refresh,
  PlayArrow,
  Pause,
  ZoomIn,
  ZoomOut,
  FilterList,
} from '@mui/icons-material';

interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: string;
  x: number;
  y: number;
  z: number;
  color: string;
  connections: string[]; // IDs of related skills
  description: string;
  projects: string[];
}

interface SkillCategory {
  name: string;
  color: string;
  visible: boolean;
}

const skills: Skill[] = [
  // Frontend
  { id: 'html5', name: 'HTML5', level: 95, category: 'Frontend', x: 0, y: 0, z: 0, color: '#e34f26', connections: ['css3', 'javascript'], description: 'Semantic markup and modern web standards', projects: ['Personal Portfolio', 'College Website', 'All web projects'] },
  { id: 'css3', name: 'CSS3', level: 95, category: 'Frontend', x: 80, y: -40, z: 20, color: '#1572b6', connections: ['html5', 'tailwind', 'bootstrap'], description: 'Modern styling with animations and responsive design', projects: ['Personal Portfolio', 'Custom components', 'Responsive layouts'] },
  { id: 'javascript', name: 'JavaScript', level: 92, category: 'Frontend', x: -80, y: 60, z: -30, color: '#f7df1e', connections: ['react', 'nodejs', 'typescript'], description: 'Core programming language for web development', projects: ['Interactive features', 'Dynamic content', 'API integrations'] },
  { id: 'react', name: 'React/TypeScript', level: 95, category: 'Frontend', x: 120, y: 20, z: 40, color: '#61dafb', connections: ['typescript', 'nextjs', 'javascript'], description: 'Building modern, interactive user interfaces with TypeScript', projects: ['Personal Portfolio', 'Student Feedback System', 'College Website'] },
  { id: 'nextjs', name: 'Next.js', level: 90, category: 'Frontend', x: -120, y: -60, z: 10, color: '#000000', connections: ['react', 'typescript'], description: 'Full-stack React framework for production', projects: ['SSR applications', 'Performance optimization'] },
  { id: 'angular', name: 'Angular', level: 75, category: 'Frontend', x: 150, y: 80, z: -20, color: '#dd0031', connections: ['typescript', 'javascript'], description: 'TypeScript-based framework for enterprise applications', projects: ['Enterprise projects', 'Component libraries'] },
  { id: 'tailwind', name: 'Tailwind CSS', level: 88, category: 'Frontend', x: -150, y: 20, z: 30, color: '#38b2ac', connections: ['css3', 'react'], description: 'Utility-first CSS framework for rapid UI development', projects: ['Modern designs', 'Responsive components'] },
  { id: 'bootstrap', name: 'Bootstrap', level: 85, category: 'Frontend', x: 90, y: -80, z: -40, color: '#7952b3', connections: ['css3', 'html5'], description: 'Popular CSS framework for responsive design', projects: ['College Website', 'Quick prototypes'] },
  { id: 'materialui', name: 'Material-UI', level: 85, category: 'Frontend', x: -90, y: 120, z: 60, color: '#0081cb', connections: ['react', 'typescript'], description: 'React components implementing Google Material Design', projects: ['Personal Portfolio', 'Student Feedback System'] },
  
  // Backend
  { id: 'nodejs', name: 'Node.js/Express', level: 90, category: 'Backend', x: -200, y: -20, z: 50, color: '#339933', connections: ['javascript', 'mongodb', 'api'], description: 'Server-side JavaScript runtime with Express framework', projects: ['Student Feedback System', 'REST APIs', 'Microservices'] },
  { id: 'python', name: 'Python', level: 85, category: 'Backend', x: 200, y: -40, z: -50, color: '#3776ab', connections: ['tensorflow', 'ml'], description: 'Programming for backend development, AI and data science', projects: ['Image Caption Generator', 'Machine learning models', 'Data analysis'] },
  { id: 'java', name: 'Java', level: 60, category: 'Backend', x: -180, y: 80, z: -60, color: '#ed8b00', connections: ['api'], description: 'Object-oriented programming for enterprise applications', projects: ['Academic projects', 'Algorithm implementations'] },
  { id: 'api', name: 'RESTful APIs', level: 92, category: 'Backend', x: 180, y: 60, z: 80, color: '#4caf50', connections: ['nodejs', 'java', 'mongodb'], description: 'Designing and implementing REST APIs', projects: ['Student Feedback System', 'Personal Portfolio backend'] },
  
  // Database
  { id: 'mongodb', name: 'MongoDB', level: 88, category: 'Database', x: -250, y: 40, z: 20, color: '#47a248', connections: ['nodejs', 'api'], description: 'NoSQL database for modern applications', projects: ['User management', 'Content systems', 'Analytics'] },
  { id: 'mysql', name: 'MySQL', level: 85, category: 'Database', x: 250, y: -80, z: 30, color: '#4479a1', connections: ['api', 'java'], description: 'Relational database management system', projects: ['Traditional web apps', 'Data storage'] },
  { id: 'redis', name: 'Redis', level: 75, category: 'Database', x: -220, y: -100, z: -30, color: '#dc382d', connections: ['nodejs'], description: 'In-memory data structure store for caching', projects: ['Performance optimization', 'Session management'] },
  { id: 'firebase', name: 'Firebase', level: 80, category: 'Database', x: 220, y: 100, z: -40, color: '#ffca28', connections: ['react', 'api'], description: 'Google platform for web and mobile app development', projects: ['Real-time apps', 'Authentication'] },
  
  // AI/ML
  { id: 'ml', name: 'Machine Learning', level: 78, category: 'AI/ML', x: 160, y: -120, z: 70, color: '#ff9800', connections: ['python', 'tensorflow', 'pytorch'], description: 'Building intelligent systems and predictive models', projects: ['Image Caption Generator', 'Predictive analytics'] },
  { id: 'tensorflow', name: 'TensorFlow', level: 70, category: 'AI/ML', x: -160, y: -140, z: -70, color: '#ff6f00', connections: ['python', 'ml'], description: 'Machine learning framework for deep learning', projects: ['Image recognition', 'Neural networks'] },
  { id: 'pytorch', name: 'PyTorch', level: 65, category: 'AI/ML', x: 280, y: 40, z: -80, color: '#ee4c2c', connections: ['python', 'ml'], description: 'Dynamic neural network framework', projects: ['Research projects', 'Model prototyping'] },
  { id: 'transformers', name: 'Transformers', level: 72, category: 'AI/ML', x: -280, y: -60, z: 90, color: '#ffd700', connections: ['python', 'ml'], description: 'State-of-the-art NLP models and architectures', projects: ['Text processing', 'Language models'] },
  
  // Tools & Others
  { id: 'git', name: 'Git/GitHub', level: 95, category: 'Tools', x: 100, y: 140, z: -90, color: '#f05032', connections: ['vscode'], description: 'Version control and collaboration', projects: ['All projects', 'Open source contributions'] },
  { id: 'vscode', name: 'VS Code', level: 95, category: 'Tools', x: -100, y: -160, z: 100, color: '#007acc', connections: ['git'], description: 'Primary development environment', projects: ['All development work', 'Extension development'] },
  { id: 'androidstudio', name: 'Android Studio', level: 75, category: 'Tools', x: 320, y: -20, z: 50, color: '#3ddc84', connections: ['java'], description: 'IDE for Android app development', projects: ['Mobile app development', 'Android projects'] },
  { id: 'figma', name: 'Figma', level: 80, category: 'Tools', x: -320, y: 20, z: -50, color: '#f24e1e', connections: ['react', 'css3'], description: 'UI/UX design and prototyping tool', projects: ['Design systems', 'Wireframes', 'Prototypes'] },
];

const skillCategories: Record<string, SkillCategory> = {
  'Frontend': { name: 'Frontend', color: '#61dafb', visible: true },
  'Backend': { name: 'Backend', color: '#339933', visible: true },
  'Database': { name: 'Database', color: '#47a248', visible: true },
  'AI/ML': { name: 'AI/ML', color: '#ff9800', visible: true },
  'Tools': { name: 'Tools & Others', color: '#007acc', visible: true },
};

const SkillsGalaxy: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [zoom, setZoom] = useState(1);
  const [categories, setCategories] = useState(skillCategories);
  const [showFilters, setShowFilters] = useState(false);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Filter visible skills
      const visibleSkills = skills.filter(skill => categories[skill.category]?.visible);

      // Draw connections first
      ctx.globalAlpha = 0.3;
      visibleSkills.forEach(skill => {
        skill.connections.forEach(connectionId => {
          const connectedSkill = visibleSkills.find(s => s.id === connectionId);
          if (!connectedSkill) return;

          // 3D to 2D projection
          const skill3D = project3D(skill, centerX, centerY);
          const connected3D = project3D(connectedSkill, centerX, centerY);

          ctx.strokeStyle = skill.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(skill3D.x, skill3D.y);
          ctx.lineTo(connected3D.x, connected3D.y);
          ctx.stroke();
        });
      });

      // Draw skills
      ctx.globalAlpha = 1;
      visibleSkills
        .sort((a, b) => {
          // Sort by z-depth for proper layering
          const aZ = a.z * Math.cos(rotationRef.current.x) - a.y * Math.sin(rotationRef.current.x);
          const bZ = b.z * Math.cos(rotationRef.current.x) - b.y * Math.sin(rotationRef.current.x);
          return bZ - aZ;
        })
        .forEach(skill => {
          const pos = project3D(skill, centerX, centerY);
          const size = (skill.level / 100) * 40 * zoom + 10;
          
          // Highlight effects
          const isHovered = hoveredSkill?.id === skill.id;
          const isSelected = selectedSkill?.id === skill.id;
          
          // Draw skill circle
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
          
          if (isSelected || isHovered) {
            // Glow effect
            const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size + 10);
            gradient.addColorStop(0, skill.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fill();
          }
          
          ctx.fillStyle = skill.color;
          ctx.globalAlpha = isHovered || isSelected ? 1 : 0.8;
          ctx.fill();
          
          // Draw skill name
          ctx.fillStyle = theme.palette.text.primary;
          ctx.font = `${Math.max(12, size / 3)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = 1;
          ctx.fillText(skill.name, pos.x, pos.y);
          
          // Store position for click detection
          (skill as any).screenX = pos.x;
          (skill as any).screenY = pos.y;
          (skill as any).screenSize = size;
        });
    };

    const project3D = (skill: Skill, centerX: number, centerY: number) => {
      // Apply rotation
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      
      // Rotate around X axis
      const y1 = skill.y * cosX - skill.z * sinX;
      const z1 = skill.y * sinX + skill.z * cosX;
      
      // Rotate around Y axis
      const x2 = skill.x * cosY + z1 * sinY;
      const z2 = -skill.x * sinY + z1 * cosY;
      
      // Project to 2D
      const perspective = 300;
      const scale = perspective / (perspective + z2);
      
      return {
        x: centerX + x2 * scale * zoom,
        y: centerY + y1 * scale * zoom,
        z: z2
      };
    };

    const animate = () => {
      if (isAnimating) {
        rotationRef.current = {
          x: rotationRef.current.x + 0.005,
          y: rotationRef.current.y + 0.003,
        };
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, zoom, categories, selectedSkill, hoveredSkill, theme]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked skill
    const visibleSkills = skills.filter(skill => categories[skill.category]?.visible);
    const clickedSkill = visibleSkills.find(skill => {
      const dx = x - (skill as any).screenX;
      const dy = y - (skill as any).screenY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= (skill as any).screenSize;
    });

    setSelectedSkill(clickedSkill || null);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = x - lastMousePos.current.x;
      const deltaY = y - lastMousePos.current.y;
      
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.01,
        y: rotationRef.current.y + deltaX * 0.01,
      };
      
      lastMousePos.current = { x, y };
      return;
    }

    // Find hovered skill
    const visibleSkills = skills.filter(skill => categories[skill.category]?.visible);
    const hoveredSkill = visibleSkills.find(skill => {
      const dx = x - (skill as any).screenX;
      const dy = y - (skill as any).screenY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= (skill as any).screenSize;
    });

    setHoveredSkill(hoveredSkill || null);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastMousePos.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
    setIsAnimating(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const toggleCategory = (categoryName: string) => {
    setCategories(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        visible: !prev[categoryName].visible,
      },
    }));
  };

  const resetView = () => {
    rotationRef.current = { x: 0, y: 0 };
    setZoom(1);
    setSelectedSkill(null);
    setHoveredSkill(null);
  };

  return (
    <Box ref={containerRef} sx={{ py: 8, px: 2 }}>
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
            Skills Galaxy
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Explore my technical skills in an interactive 3D space
          </Typography>
          
          {/* Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            <Tooltip title={isAnimating ? "Pause rotation" : "Start rotation"}>
              <IconButton onClick={() => setIsAnimating(!isAnimating)} color="primary">
                {isAnimating ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Zoom in">
              <IconButton onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} color="primary">
                <ZoomIn />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Zoom out">
              <IconButton onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} color="primary">
                <ZoomOut />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Reset view">
              <IconButton onClick={resetView} color="primary">
                <Refresh />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle filters">
              <IconButton onClick={() => setShowFilters(!showFilters)} color="primary">
                <FilterList />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Category filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 4 }}>
                {Object.entries(categories).map(([key, category]) => (
                  <Chip
                    key={key}
                    label={category.name}
                    clickable
                    variant={category.visible ? 'filled' : 'outlined'}
                    sx={{
                      bgcolor: category.visible ? category.color : 'transparent',
                      borderColor: category.color,
                      color: category.visible ? 'white' : category.color,
                      '&:hover': {
                        bgcolor: alpha(category.color, 0.2),
                      },
                    }}
                    onClick={() => toggleCategory(key)}
                  />
                ))}
              </Box>
            </motion.div>
          )}
        </Box>
      </motion.div>

      {/* Galaxy Container */}
      <Box sx={{ display: 'flex', gap: 4, minHeight: 600 }}>
        {/* 3D Canvas */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '600px',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: theme.shape.borderRadius,
              cursor: isDragging.current ? 'grabbing' : hoveredSkill ? 'pointer' : 'grab',
              background: alpha(theme.palette.background.paper, 0.5),
            }}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          {/* Instructions */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              p: 2,
              borderRadius: 1,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="caption" display="block">
              • Click and drag to rotate
            </Typography>
            <Typography variant="caption" display="block">
              • Click on skills for details
            </Typography>
            <Typography variant="caption" display="block">
              • Use controls to zoom and filter
            </Typography>
          </Box>
        </Box>

        {/* Skill Details Panel */}
        <Box sx={{ width: 300, display: { xs: 'none', md: 'block' } }}>
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ height: 'fit-content' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: selectedSkill.color,
                        mr: 2,
                      }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {selectedSkill.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Proficiency Level
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          flex: 1,
                          height: 8,
                          bgcolor: alpha(selectedSkill.color, 0.2),
                          borderRadius: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: `${selectedSkill.level}%`,
                            height: '100%',
                            bgcolor: selectedSkill.color,
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {selectedSkill.level}%
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedSkill.description}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Category
                    </Typography>
                    <Chip
                      label={selectedSkill.category}
                      size="small"
                      sx={{
                        bgcolor: alpha(selectedSkill.color, 0.2),
                        color: selectedSkill.color,
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Projects Used In
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {selectedSkill.projects.map((project, idx) => (
                        <Typography key={idx} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              bgcolor: selectedSkill.color,
                              mr: 1,
                            }}
                          />
                          {project}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                  
                  {selectedSkill.connections.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Related Skills
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedSkill.connections.map((connectionId) => {
                          const connectedSkill = skills.find(s => s.id === connectionId);
                          return connectedSkill ? (
                            <Chip
                              key={connectionId}
                              label={connectedSkill.name}
                              size="small"
                              clickable
                              onClick={() => setSelectedSkill(connectedSkill)}
                              sx={{
                                bgcolor: alpha(connectedSkill.color, 0.1),
                                borderColor: connectedSkill.color,
                                color: connectedSkill.color,
                                '&:hover': {
                                  bgcolor: alpha(connectedSkill.color, 0.2),
                                },
                              }}
                            />
                          ) : null;
                        })}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card sx={{ height: 'fit-content' }}>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Click on a skill to explore
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Navigate the 3D space and click on any skill node to see detailed information about my experience and projects.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Mobile skill details */}
      {selectedSkill && (
        <Box sx={{ display: { md: 'none' }, mt: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: selectedSkill.color,
                    mr: 2,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {selectedSkill.name}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedSkill.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip
                  label={selectedSkill.category}
                  size="small"
                  sx={{
                    bgcolor: alpha(selectedSkill.color, 0.2),
                    color: selectedSkill.color,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {selectedSkill.level}% Proficiency
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SkillsGalaxy;
