import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Paper,
  useTheme,
  alpha,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Twitter,
  Send,
  Schedule,
  Language,
  Rocket,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { useResponsive, getResponsiveSpacing, getResponsiveTypography } from '../utils/responsive';
import ProfessionalGrid from '../components/common/ProfessionalGrid';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const theme = useTheme();
  const responsive = useResponsive();
  const spacing = getResponsiveSpacing(theme);
  const typography = getResponsiveTypography();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email',
      value: 'sanjaybandi009@gmail.com',
      href: 'mailto:sanjaybandi009@gmail.com',
      subtitle: 'Drop me a line anytime',
      color: theme.palette.primary.main,
    },
    {
      icon: <Phone />,
      title: 'Phone',
      value: '+91 9325469450',
      href: 'tel:+919325469450',
      subtitle: 'Available Mon-Fri, 9 AM - 6 PM',
      color: theme.palette.success.main,
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      value: 'Hyderabad, India',
      href: null,
      subtitle: 'Open to remote opportunities',
      color: theme.palette.warning.main,
    },
    {
      icon: <Schedule />,
      title: 'Response Time',
      value: 'Within 24 hours',
      href: null,
      subtitle: 'Quick and professional responses',
      color: theme.palette.info.main,
    },
  ];

  const socialLinks = [
    { 
      icon: <GitHub />, 
      url: 'https://github.com/Sanjaydev009', 
      label: 'GitHub',
      color: '#333',
      hoverColor: '#24292e',
      followers: '15+ repositories'
    },
    { 
      icon: <LinkedIn />, 
      url: 'https://www.linkedin.com/in/bandi-sanjay-3431ab248/', 
      label: 'LinkedIn',
      color: '#0077b5',
      hoverColor: '#005885',
      followers: '500+ connections'
    },
    { 
      icon: <Twitter />, 
      url: 'https://twitter.com/SanjayBandi009', 
      label: 'Twitter',
      color: '#1da1f2',
      hoverColor: '#0d8bd9',
      followers: 'Tech enthusiast'
    },
  ];

  const skills = [
    'React', 'Angular', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'MySQL'
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Check internet connectivity
      if (!navigator.onLine) {
        toast.error('No internet connection. Please check your network and try again.');
        return;
      }

      // Initialize EmailJS with your User ID
      emailjs.init("h3kC19B1uve366yko");
      
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Sanjay Bandi',
        to_email: 'sanjaybandi009@gmail.com'
      };

      console.log('Sending email with params:', templateParams);
      
      // EmailJS service details - make sure these match your actual EmailJS setup
      const result = await emailjs.send(
        'service_lns5hff',   // Make sure this matches your EmailJS Service ID
        'template_i0c2orp',  // Make sure this matches your EmailJS Template ID
        templateParams,
        'h3kC19B1uve366yko'  // Your EmailJS Public Key (User ID)
      );
      
      console.log('Email sent successfully!', result);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
      
    } catch (error) {
      console.error('Contact form error:', error);
      
      // More detailed error handling
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        
        // Check for specific EmailJS errors
        if (error.message.includes('403')) {
          toast.error('Email service authentication failed. Please try again or contact directly via email.');
        } else if (error.message.includes('400')) {
          toast.error('Invalid email parameters. Please check your input and try again.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          toast.error('Network error. Please check your internet connection and try again.');
        } else {
          toast.error(`Failed to send message: ${error.message}. Please try again.`);
        }
      } else {
        toast.error('Failed to send message. Please try again or contact directly via email.');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      {/* Professional Grid Pattern */}
      <ProfessionalGrid intensity="light" animated zIndex={1} />

      <Container maxWidth="xl" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 0 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: { xs: 1.5, sm: 2 }, 
              mb: { xs: 2, sm: 3 },
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Rocket sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </motion.div>
              </Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  textAlign: 'center'
                }}
              >
                Let's Connect
              </Typography>
            </Box>
            
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: { xs: 2, sm: 3 },
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together!
            </Typography>

            {/* Skills Tags */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: { xs: 0.5, sm: 1 }, 
              mb: { xs: 3, sm: 4 },
              px: { xs: 1, sm: 0 }
            }}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Chip
                    label={skill}
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: 24, sm: 32 },
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        borderColor: 'transparent',
                      },
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Main Content Grid */}
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} sx={{ alignItems: 'flex-start' }}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Professional Card */}
              <Box
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  mx: { xs: 1, sm: 0 },
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  mb: 4,
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    color: 'text.primary',
                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                  }}
                >
                  Why Work With Me?
                </Typography>
                
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ 
                    mb: 4, 
                    lineHeight: 1.7,
                    fontSize: '1.1rem'
                  }}
                >
                  I'm passionate about creating exceptional digital experiences. With expertise in 
                  modern technologies and a focus on clean, maintainable code, I deliver solutions 
                  that not only meet your requirements but exceed expectations.
                </Typography>

                {/* Features */}
                <Box sx={{ mb: 4 }}>
                  {[
                    'Fast & Responsive Development',
                    'Clean, Maintainable Code',
                    'Modern Tech Stack',
                    'Excellent Communication'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {feature}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>

              {/* Contact Information Cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <Paper
                      elevation={0}
                      component={info.href ? 'a' : 'div'}
                      href={info.href || undefined}
                      sx={{ 
                        textDecoration: 'none',
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(info.color, 0.1)}`,
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        cursor: info.href ? 'pointer' : 'default',
                        '&:hover': {
                          borderColor: alpha(info.color, 0.3),
                          boxShadow: `0 8px 32px ${alpha(info.color, 0.15)}`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${info.color} 0%, ${alpha(info.color, 0.8)} 100%)`,
                          color: 'white',
                          mr: 3,
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {info.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color={info.href ? 'primary.main' : 'text.primary'}
                          sx={{ 
                            mb: 0.5,
                            fontWeight: info.href ? 500 : 400,
                            '&:hover': info.href ? { textDecoration: 'underline' } : {}
                          }}
                        >
                          {info.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {info.subtitle}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>

              {/* Social Links */}
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: 'primary.main' }} />
                  Connect With Me
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Tooltip title={`${social.label} - ${social.followers}`} arrow>
                        <Box>
                          <IconButton
                            component="a"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              width: 64,
                              height: 64,
                              background: `linear-gradient(135deg, ${alpha(social.color, 0.1)} 0%, ${alpha(social.color, 0.05)} 100%)`,
                              backdropFilter: 'blur(10px)',
                              color: social.color,
                              border: `2px solid ${alpha(social.color, 0.2)}`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: `linear-gradient(135deg, ${social.color} 0%, ${social.hoverColor} 100%)`,
                                color: 'white',
                                borderColor: 'transparent',
                                boxShadow: `0 12px 40px ${alpha(social.color, 0.4)}`,
                                transform: 'translateY(-4px)',
                              },
                            }}
                            aria-label={social.label}
                          >
                            {social.icon}
                          </IconButton>
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            sx={{ 
                              display: 'block', 
                              textAlign: 'center', 
                              mt: 1,
                              fontSize: '0.7rem'
                            }}
                          >
                            {social.followers}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card 
                sx={{ 
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Send sx={{ color: 'primary.main' }} />
                      Send Message
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      Ready to start your project? Fill out the form below and I'll get back to you within 24 hours.
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Full Name *"
                              error={!!errors.name}
                              helperText={errors.name?.message}
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  background: alpha(theme.palette.background.paper, 0.8),
                                  backdropFilter: 'blur(10px)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Email Address *"
                              type="email"
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  background: alpha(theme.palette.background.paper, 0.8),
                                  backdropFilter: 'blur(10px)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Controller
                          name="subject"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Subject *"
                              error={!!errors.subject}
                              helperText={errors.subject?.message}
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  background: alpha(theme.palette.background.paper, 0.8),
                                  backdropFilter: 'blur(10px)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Controller
                          name="message"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Your Message *"
                              multiline
                              rows={6}
                              error={!!errors.message}
                              helperText={errors.message?.message}
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  background: alpha(theme.palette.background.paper, 0.8),
                                  backdropFilter: 'blur(10px)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ flex: 1 }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              disabled={isSubmitting}
                              startIcon={isSubmitting ? undefined : <Send />}
                              sx={{
                                px: 4,
                                py: 2,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                                width: { xs: '100%', sm: 'auto' },
                                minWidth: '200px',
                                '&:hover': {
                                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                                  transform: 'translateY(-2px)',
                                },
                                '&:disabled': {
                                  background: alpha(theme.palette.action.disabled, 0.3),
                                  color: theme.palette.action.disabled,
                                },
                              }}
                            >
                              {isSubmitting ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  >
                                    <Send />
                                  </motion.div>
                                  Sending...
                                </Box>
                              ) : (
                                'Send Message'
                              )}
                            </Button>
                          </motion.div>
                          
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            sx={{ 
                              alignSelf: 'center',
                              textAlign: { xs: 'center', sm: 'left' },
                              mt: { xs: 1, sm: 0 }
                            }}
                          >
                            Usually responds within 24 hours
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>

                  {/* Additional Info */}
                  <Box 
                    sx={{ 
                      mt: 4, 
                      pt: 4, 
                      borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                      🔒 Your information is secure and will never be shared with third parties.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: '1rem' }} />
                        <Typography variant="caption">Quick Response</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: '1rem' }} />
                        <Typography variant="caption">Professional Service</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: '1rem' }} />
                        <Typography variant="caption">Free Consultation</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
