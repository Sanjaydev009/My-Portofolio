import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  useTheme,
  CardMedia,
} from '@mui/material';
import {
  Launch,
  GitHub,
  Favorite,
  FavoriteBorder,
  Share,
  Visibility,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface Project3DCardProps {
  project: Project;
  index: number;
}

const Project3DCard: React.FC<Project3DCardProps> = ({ project, index }) => {
  const theme = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(
    Array.isArray(project.likes) ? project.likes.length : project.likes || 0
  );

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes((prev: number) => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 400,
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: theme.shadows[8],
            overflow: 'hidden',
          }}
        >
          {project.images && project.images.length > 0 && (
            <CardMedia
              component="img"
              height="200"
              image={project.images[0].url}
              alt={project.title}
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          )}

          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                {project.title}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={handleLike}
                  sx={{ color: isLiked ? 'error.main' : 'text.secondary' }}
                >
                  {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleShare}
                  sx={{ color: 'text.secondary' }}
                >
                  <Share fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {project.shortDescription}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <Chip
                  key={techIndex}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              ))}
              {project.technologies.length > 3 && (
                <Chip
                  label={`+${project.technologies.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Visibility sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {project.views}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Favorite sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {likes}
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={project.status}
                size="small"
                color={project.status === 'completed' ? 'success' : 'warning'}
                variant="filled"
                sx={{ fontSize: '0.65rem', height: 18 }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'primary.contrastText',
            boxShadow: theme.shadows[12],
          }}
        >
          <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'inherit' }}>
              Project Details
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, flex: 1, color: 'inherit', opacity: 0.9 }}>
              {project.description}
            </Typography>

            {project.challenges && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'inherit' }}>
                  Challenges:
                </Typography>
                <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.8, fontSize: '0.8rem' }}>
                  {project.challenges}
                </Typography>
              </Box>
            )}

            {project.solutions && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'inherit' }}>
                  Solutions:
                </Typography>
                <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.8, fontSize: '0.8rem' }}>
                  {project.solutions}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
              {project.links?.demo && (
                <IconButton
                  component="a"
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'inherit',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Launch />
                </IconButton>
              )}
              {project.links?.github && (
                <IconButton
                  component="a"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'inherit',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitHub />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default Project3DCard;
