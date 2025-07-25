import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  alpha,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Close as CloseIcon,
  Rocket,
  Home,
  Person,
  Work,
  Article,
  ContactMail,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { label: 'Home', path: '/', icon: <Home /> },
  { label: 'About', path: '/about', icon: <Person /> },
  { label: 'Projects', path: '/projects', icon: <Work /> },
  { label: 'Blog', path: '/blog', icon: <Article /> },
  { label: 'Contact', path: '/contact', icon: <ContactMail /> },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { mode, toggleMode } = useCustomTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      sx={{ 
        width: 300,
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
            }}
          >
            <Rocket sx={{ fontSize: '1.1rem' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
              Menu
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              Navigation
            </Typography>
          </Box>
        </Box>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{
              width: 36,
              height: 36,
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </motion.div>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ p: 2 }}>
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  background: location.pathname === item.path 
                    ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    : 'transparent',
                  color: location.pathname === item.path ? 'white' : 'text.primary',
                  '&:hover': {
                    background: location.pathname === item.path
                      ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : alpha(theme.palette.primary.main, 0.08),
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.5,
                  px: 2,
                }}
              >
                <Box sx={{ 
                  color: location.pathname === item.path ? 'white' : theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: 24,
                }}>
                  {item.icon}
                </Box>
                <ListItemText 
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      fontSize: '0.95rem',
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: scrolled 
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.3s ease',
          boxShadow: scrolled 
            ? `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`
            : 'none',
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: { xs: 1, md: 1.5 }, justifyContent: 'space-between' }}>
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'white',
                  }}
                >
                  <Rocket sx={{ fontSize: '1.2rem' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
                    Sanjay Bandi
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                    Full Stack Developer
                  </Typography>
                </Box>
              </Typography>
            </motion.div>

            {/* Navigation Section */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: location.pathname === item.path ? 'white' : 'text.primary',
                        fontWeight: location.pathname === item.path ? 700 : 500,
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        mx: 0.5,
                        background: location.pathname === item.path 
                          ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                          : 'transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: location.pathname === item.path
                            ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                            : alpha(theme.palette.primary.main, 0.08),
                          transform: 'translateY(-1px)',
                          boxShadow: location.pathname === item.path
                            ? `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`
                            : `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                        '& .MuiButton-startIcon': {
                          marginRight: 1,
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            )}

            {/* Actions Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} arrow>
                  <IconButton 
                    onClick={toggleMode} 
                    sx={{ 
                      width: 44,
                      height: 44,
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: theme.palette.primary.main,
                        color: 'white',
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Tooltip>
              </motion.div>

              {/* Mobile Menu */}
              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    sx={{ 
                      width: 44,
                      height: 44,
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: theme.palette.primary.main,
                        color: 'white',
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 300,
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
