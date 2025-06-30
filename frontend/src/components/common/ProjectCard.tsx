import React from 'react';
import { Box, Card, CardContent, Chip, Typography, IconButton } from '@mui/material';
import { Launch, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        {project.images && project.images.length > 0 && (
          <Box
            sx={{
              height: 200,
              backgroundImage: `url(${project.images[0].url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '4px 4px 0 0',
            }}
          />
        )}
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
              {project.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {project.links?.demo && (
                <IconButton
                  size="small"
                  component="a"
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'primary.main' }}
                >
                  <Launch fontSize="small" />
                </IconButton>
              )}
              {project.links?.github && (
                <IconButton
                  size="small"
                  component="a"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'text.secondary' }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
            {project.technologies?.map((tech, techIndex) => (
              <Chip
                key={techIndex}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
