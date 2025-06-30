import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Avatar,
} from '@mui/material';
import { AccessTime, Visibility, FavoriteOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types';
import { formatDate, formatNumber } from '../../utils/helpers';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        component={Link}
        to={`/blog/${post.slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[8],
            transform: 'translateY(-4px)',
          },
        }}
      >
        {post.featuredImage && (
          <CardMedia
            component="img"
            height="200"
            image={post.featuredImage.url}
            alt={post.featuredImage.caption || post.title}
            sx={{
              objectFit: 'cover',
            }}
          />
        )}

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header with author and date */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              sx={{ width: 32, height: 32, mr: 1 }}
            >
              {post.author.name.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {post.author.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime sx={{ fontSize: 12 }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(post.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Title and excerpt */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.excerpt}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <Chip
                key={tagIndex}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
            ))}
            {post.tags.length > 3 && (
              <Chip
                label={`+${post.tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  color: 'text.secondary',
                }}
              />
            )}
          </Box>

          {/* Footer with stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatNumber(post.views)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FavoriteOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatNumber(post.likes.length)}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={post.status}
              size="small"
              color={post.status === 'published' ? 'success' : 'warning'}
              variant="filled"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
