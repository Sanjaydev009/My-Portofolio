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
  { id: 'react', name: 'React', level: 95, category: 'Frontend', x: 0, y: 0, z: 0, color: '#61dafb', connections: ['typescript', 'nextjs', 'redux'], description: 'Building modern, interactive user interfaces', projects: ['Portfolio', 'E-commerce Platform', 'Task Manager'] },
  { id: 'typescript', name: 'TypeScript', level: 90, category: 'Frontend', x: 120, y: -40, z: 20, color: '#3178c6', connections: ['react', 'nodejs', 'nextjs'], description: 'Type-safe JavaScript for better development experience', projects: ['All modern projects', 'API clients', 'Complex applications'] },
  { id: 'nextjs', name: 'Next.js', level: 85, category: 'Frontend', x: -80, y: 60, z: -30, color: '#000000', connections: ['react', 'typescript', 'vercel'], description: 'Full-stack React framework for production', projects: ['Company website', 'Blog platform', 'E-commerce'] },
  { id: 'tailwind', name: 'Tailwind CSS', level: 88, category: 'Frontend', x: 90, y: 80, z: 40, color: '#38b2ac', connections: ['react', 'nextjs'], description: 'Utility-first CSS framework for rapid UI development', projects: ['Design system', 'Landing pages', 'Mobile apps'] },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', level: 88, category: 'Backend', x: -120, y: -60, z: 10, color: '#339933', connections: ['typescript', 'mongodb', 'express'], description: 'Server-side JavaScript runtime', projects: ['REST APIs', 'Microservices', 'Real-time apps'] },
  { id: 'express', name: 'Express.js', level: 85, category: 'Backend', x: -150, y: 20, z: -20, color: '#404040', connections: ['nodejs', 'mongodb', 'jwt'], description: 'Minimal and flexible Node.js web framework', projects: ['API servers', 'Authentication systems', 'Middleware'] },
  { id: 'mongodb', name: 'MongoDB', level: 80, category: 'Backend', x: -200, y: -20, z: 30, color: '#47a248', connections: ['nodejs', 'express', 'mongoose'], description: 'NoSQL database for modern applications', projects: ['User management', 'Content systems', 'Analytics'] },
  { id: 'graphql', name: 'GraphQL', level: 75, category: 'Backend', x: -100, y: -120, z: -10, color: '#e10098', connections: ['nodejs', 'react', 'apollo'], description: 'Query language for APIs', projects: ['Data aggregation', 'Client-server communication'] },
  
  // DevOps & Tools
  { id: 'docker', name: 'Docker', level: 82, category: 'DevOps', x: 150, y: -80, z: -40, color: '#2496ed', connections: ['kubernetes', 'cicd', 'aws'], description: 'Containerization for consistent deployments', projects: ['Development environments', 'Production deployments'] },
  { id: 'aws', name: 'AWS', level: 78, category: 'DevOps', x: 200, y: 40, z: 20, color: '#ff9900', connections: ['docker', 'kubernetes', 'terraform'], description: 'Cloud computing services', projects: ['Scalable infrastructure', 'Serverless functions'] },
  { id: 'git', name: 'Git', level: 95, category: 'DevOps', x: 80, y: -120, z: 60, color: '#f05032', connections: ['github', 'cicd'], description: 'Version control and collaboration', projects: ['All projects', 'Open source contributions'] },
  
  // Design & UX
  { id: 'figma', name: 'Figma', level: 75, category: 'Design', x: -60, y: 120, z: -50, color: '#f24e1e', connections: ['ux', 'prototyping'], description: 'UI/UX design and prototyping', projects: ['Design systems', 'User interfaces', 'Prototypes'] },
  { id: 'ux', name: 'UX Design', level: 70, category: 'Design', x: 40, y: 150, z: 10, color: '#ff6b6b', connections: ['figma', 'user-research'], description: 'User experience design principles', projects: ['User flows', 'Wireframes', 'User testing'] },
  
  // AI & Data
  { id: 'python', name: 'Python', level: 80, category: 'AI/ML', x: -180, y: 80, z: 50, color: '#3776ab', connections: ['tensorflow', 'data-analysis'], description: 'Programming for AI and data science', projects: ['Machine learning models', 'Data analysis', 'Automation'] },
  { id: 'tensorflow', name: 'TensorFlow', level: 65, category: 'AI/ML', x: -220, y: 120, z: -10, color: '#ff6f00', connections: ['python', 'ml'], description: 'Machine learning framework', projects: ['Image recognition', 'Predictive models'] },
];

const skillCategories: Record<string, SkillCategory> = {
  'Frontend': { name: 'Frontend', color: '#61dafb', visible: true },
  'Backend': { name: 'Backend', color: '#339933', visible: true },
  'DevOps': { name: 'DevOps', color: '#2496ed', visible: true },
  'Design': { name: 'Design', color: '#f24e1e', visible: true },
  'AI/ML': { name: 'AI/ML', color: '#ff6f00', visible: true },
};

const SkillsGalaxy: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
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
          const aZ = a.z * Math.cos(rotation.x) - a.y * Math.sin(rotation.x);
          const bZ = b.z * Math.cos(rotation.x) - b.y * Math.sin(rotation.x);
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
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      
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
        setRotation(prev => ({
          x: prev.x + 0.005,
          y: prev.y + 0.003,
        }));
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
  }, [isAnimating, rotation, zoom, categories, selectedSkill, hoveredSkill, theme]);

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
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01,
      }));
      
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
    setRotation({ x: 0, y: 0 });
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
