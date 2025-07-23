import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
  IconButton,
  alpha,
} from '@mui/material';
import {
  Email,
  Phone,
  Send,
  LinkedIn,
  GitHub,
  Twitter,
  VideoCall,
  Coffee,
  Lightbulb,
  Work,
  School,
  Psychology,
  Chat,
  CheckCircle,
} from '@mui/icons-material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

interface ContactMethod {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  action: string | null;
  color: string;
  availability?: string;
  responseTime?: string;
}

interface ContactReason {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const contactMethods: ContactMethod[] = [
  {
      id: 'email',
      icon: Email,
      title: 'Email',
      description: 'For detailed discussions and project inquiries',
      value: 'sanjaybandi009@gmail.com',
      action: 'mailto:sanjaybandi009@gmail.com',
      color: '#3b82f6',
      availability: 'Always available',
      responseTime: 'Within 24 hours',
    },
    {
      id: 'phone',
      icon: Phone,
      title: 'Phone',
      description: 'For urgent matters and direct conversations',
      value: '+91 9325469450',
      action: 'tel:+919325469450',
      color: '#10b981',
      availability: 'Mon-Fri, 9 AM - 6 PM IST',
      responseTime: 'Immediate',
    },
  {
    id: 'video',
    icon: VideoCall,
    title: 'Video Call',
    description: 'Schedule a meeting to discuss your project',
    value: 'Book a 30-min call',
    action: 'https://calendly.com/sanjaybandi',
    color: '#8b5cf6',
    availability: 'Mon-Fri, flexible hours',
    responseTime: 'Same day confirmation',
  },
  {
    id: 'coffee',
    icon: Coffee,
    title: 'Coffee Chat',
    description: 'Let\'s meet in person if you\'re in the area',
    value: 'Mumbai, India',
    action: null,
    color: '#f59e0b',
    availability: 'Weekends preferred',
    responseTime: 'Within 48 hours',
  },
];

const socialLinks = [
  {
    icon: LinkedIn,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bandi-sanjay-3431ab248/',
    color: '#0077b5',
  },
  {
    icon: GitHub,
    label: 'GitHub',
    url: 'https://github.com/Sanjaydev009',
    color: '#333333',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    url: 'https://twitter.com/SanjayBandi009',
    color: '#1da1f2',
  },
];

const contactReasons: ContactReason[] = [
  {
    id: 'project',
    label: 'Project Collaboration',
    icon: Work,
    color: '#3b82f6',
    description: 'Let\'s build something amazing together',
  },
  {
    id: 'mentoring',
    label: 'Mentoring',
    icon: School,
    color: '#10b981',
    description: 'Career guidance and technical mentorship',
  },
  {
    id: 'speaking',
    label: 'Speaking Opportunity',
    icon: Psychology,
    color: '#8b5cf6',
    description: 'Conference talks, workshops, or podcasts',
  },
  {
    id: 'consulting',
    label: 'Technical Consulting',
    icon: Lightbulb,
    color: '#f59e0b',
    description: 'Architecture review and technical guidance',
  },
  {
    id: 'networking',
    label: 'Just Say Hi',
    icon: Chat,
    color: '#ec4899',
    description: 'Connect and share ideas',
  },
];

const ContactSection: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSending) return; // Prevent multiple submissions
    
    // Check internet connectivity
    if (!navigator.onLine) {
      alert('No internet connection. Please check your network and try again.');
      return;
    }
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSending(true);
    
    try {
      // Initialize EmailJS with your User ID
      emailjs.init("h3kC19B1uve366yko");
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        company: formData.company || 'Not provided',
        message: formData.message,
        subject: selectedReason ? contactReasons.find(r => r.id === selectedReason)?.label : 'General Inquiry',
        to_name: 'Sanjay Bandi',
        to_email: 'sanjaybandi009@gmail.com'
      };

      console.log('Sending email with params:', templateParams);
      console.log('Service ID:', 'service_lns5hff');
      console.log('Template ID:', 'template_i0c2orp');
      
      // EmailJS service details - make sure these match your actual EmailJS setup
      const result = await emailjs.send(
        'service_lns5hff',   // Make sure this matches your EmailJS Service ID
        'template_i0c2orp',  // Make sure this matches your EmailJS Template ID
        templateParams,
        'h3kC19B1uve366yko'  // Your EmailJS Public Key (User ID)
      );
      
      console.log('Email sent successfully!', result);
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setSelectedReason('');
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSending(false);
      
      // More detailed error handling
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        
        // Check for specific EmailJS errors
        if (error.message.includes('403')) {
          alert('Email service authentication failed. Please contact the site administrator.');
        } else if (error.message.includes('400')) {
          alert('Invalid email parameters. Please check your input and try again.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          alert('Network error. Please check your internet connection and try again.');
        } else {
          alert(`Failed to send your message: ${error.message}. Please try again or contact directly via email: sanjaybandi009@gmail.com`);
        }
      } else {
        alert('Failed to send your message. Please check your internet connection and try again or contact directly via email: sanjaybandi009@gmail.com');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box ref={ref} sx={{ py: 8, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
              color: 'inherit',
            }}
          >
            Let's Create Something Amazing
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              color: 'inherit',
              opacity: 0.9,
            }}
          >
            I'm always excited to discuss new projects, share knowledge, or simply connect with fellow developers and innovators.
          </Typography>
        </motion.div>

        {/* Why are you reaching out? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 4,
                color: 'inherit',
              }}
            >
              What brings you here?
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
              gap: 2,
              mb: 6,
            }}>
              {contactReasons.map((reason, index) => {
                const IconComponent = reason.icon;
                const isSelected = selectedReason === reason.id;
                
                return (
                  <motion.div
                    key={reason.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: isSelected 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${isSelected ? reason.color : 'rgba(255, 255, 255, 0.2)'}`,
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                      onClick={() => setSelectedReason(isSelected ? '' : reason.id)}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '50%',
                            backgroundColor: alpha(reason.color, 0.2),
                            mb: 2,
                          }}
                        >
                          <IconComponent sx={{ fontSize: 24, color: reason.color }} />
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {reason.label}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
                          {reason.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </motion.div>

        {/* Contact Methods */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 4,
          mb: 8,
        }}>
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: method.action ? 'pointer' : 'default',
                    backgroundColor: isSelected 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${isSelected ? method.color : 'rgba(255, 255, 255, 0.2)'}`,
                    color: 'inherit',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      boxShadow: `0 12px 40px ${alpha(method.color, 0.3)}`,
                    },
                  }}
                  onClick={() => {
                    if (method.action) {
                      if (method.action.startsWith('http')) {
                        window.open(method.action, '_blank');
                      } else {
                        window.location.href = method.action;
                      }
                    }
                    setSelectedMethod(isSelected ? '' : method.id);
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: alpha(method.color, 0.2),
                        mb: 3,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32, color: method.color }} />
                    </Box>
                    
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {method.title}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                      {method.description}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'medium',
                        mb: 2,
                        color: method.color,
                      }}
                    >
                      {method.value}
                    </Typography>

                    {/* Availability Info */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, mb: 0.5 }}>
                        📅 {method.availability}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                        ⚡ {method.responseTime}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'inherit',
              maxWidth: 600,
              mx: 'auto',
              mb: 6,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Send a Message
              </Typography>
              
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <CheckCircle sx={{ fontSize: 64, color: '#10b981', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Message Sent!
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Thanks for reaching out. I'll get back to you soon!
                      </Typography>
                    </Box>
                  </motion.div>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
                      <TextField
                        label="Your Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'inherit',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                        }}
                      />
                      <TextField
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'inherit',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                        }}
                      />
                    </Box>
                    
                    <TextField
                      label="Company/Organization (Optional)"
                      variant="outlined"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      fullWidth
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          color: 'inherit',
                          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                          '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                          '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      }}
                    />
                    
                    <TextField
                      label="Your Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      fullWidth
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          color: 'inherit',
                          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                          '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                          '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      }}
                    />
                    
                    {selectedReason && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                          Selected topic:
                        </Typography>
                        <Chip
                          label={contactReasons.find(r => r.id === selectedReason)?.label}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            color: 'inherit',
                          }}
                        />
                      </Box>
                    )}
                    
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSending}
                      startIcon={isSending ? null : <Send />}
                      sx={{
                        backgroundColor: 'background.paper',
                        color: 'primary.main',
                        borderRadius: 2,
                        textTransform: 'none',
                        py: 1.5,
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                        opacity: isSending ? 0.7 : 1,
                      }}
                    >
                      {isSending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Box>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Let's Connect
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'inherit',
                        width: 56,
                        height: 56,
                        '&:hover': {
                          backgroundColor: social.color,
                          transform: 'translateY(-4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24 }} />
                    </IconButton>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactSection;
