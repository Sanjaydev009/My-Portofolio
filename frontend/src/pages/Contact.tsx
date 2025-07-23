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
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Twitter,
  Send,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

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
    },
    {
      icon: <Phone />,
      title: 'Phone',
      value: '+91 9325469450',
      href: 'tel:+919325469450',
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      value: 'Mumbai, India',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/Sanjaydev009', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/bandi-sanjay-3431ab248/', label: 'LinkedIn' },
    { icon: <Twitter />, url: 'https://twitter.com/SanjayBandi009', label: 'Twitter' },
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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Get In Touch
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Have a project in mind or just want to say hello? I'd love to hear from you!
        </Typography>
      </motion.div>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              Let's Connect
            </Typography>
            
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.7 }}
            >
              I'm always interested in hearing about new opportunities and 
              exciting projects. Whether you're a company looking to hire, 
              or you're someone who has a project in mind, I'd love to hear from you.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        mr: 2,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {info.title}
                      </Typography>
                      {info.href ? (
                        <Typography
                          component="a"
                          href={info.href}
                          variant="body1"
                          sx={{
                            color: 'text.primary',
                            textDecoration: 'none',
                            '&:hover': {
                              color: 'primary.main',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {info.value}
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="text.primary">
                          {info.value}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Follow Me
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <IconButton
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.secondary',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          color: 'primary.main',
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Grid>

        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card sx={{ boxShadow: theme.shadows[4] }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Send Message
                </Typography>

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
                            label="Name *"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            variant="outlined"
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
                            label="Email *"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            variant="outlined"
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
                            label="Message *"
                            multiline
                            rows={6}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        startIcon={<Send />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
