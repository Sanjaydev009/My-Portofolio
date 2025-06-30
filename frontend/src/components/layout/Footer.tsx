import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Divider,
  Grid,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter />, url: 'https://twitter.com', label: 'Twitter' },
  ];

  const contactInfo = [
    { icon: <Email />, text: 'your.email@example.com', href: 'mailto:your.email@example.com' },
    { icon: <Phone />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: <LocationOn />, text: 'Your City, Country', href: null },
  ];

  const quickLinks = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Projects', href: '/projects' },
    { text: 'Blog', href: '/blog' },
    { text: 'Contact', href: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand and Description */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Portfolio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Full-stack developer passionate about creating innovative solutions 
              and building exceptional digital experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Get In Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contactInfo.map((contact, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                  }}
                >
                  {contact.icon}
                  {contact.href ? (
                    <Link
                      href={contact.href}
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {contact.text}
                    </Link>
                  ) : (
                    <Typography variant="body2">{contact.text}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Portfolio. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="/privacy"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
