import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  CardActionArea,
  alpha
} from '@mui/material';
import { CalendarMonth, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  excerpt, 
  imageUrl, 
  date, 
  author, 
  tags,
  slug
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease-in-out',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }
        }}
      >
        <CardActionArea href={`/blog/${slug}`}>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ mb: 1.5, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.75rem' }}>
                <CalendarMonth sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                {date}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.75rem' }}>
                <Person sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                {author}
              </Box>
            </Box>
            
            <Typography 
              variant="h6" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '3.5rem'
              }}
            >
              {title}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                minHeight: '4.5rem'
              }}
            >
              {excerpt}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
              {tags.slice(0, 3).map((tag) => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha('#3f51b5', 0.1),
                    color: 'primary.main',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                    height: '1.5rem'
                  }}
                />
              ))}
              {tags.length > 3 && (
                <Chip 
                  label={`+${tags.length - 3}`} 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha('#3f51b5', 0.05),
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                    height: '1.5rem'
                  }}
                />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
