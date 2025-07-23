import React, { useState } from 'react';
import { Button, Box, Typography, Alert } from '@mui/material';
import emailjs from 'emailjs-com';

const EmailJSTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testEmailJS = async () => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      // Initialize EmailJS
      emailjs.init("h3kC19B1uve366yko");
      
      const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        reply_to: 'test@example.com',
        company: 'Test Company',
        message: 'This is a test message from your portfolio contact form.',
        subject: 'Test Email',
        to_name: 'Sanjay Bandi',
        to_email: 'sanjaybandi009@gmail.com'
      };
      
      console.log('Testing EmailJS with params:', testParams);
      
      const result = await emailjs.send(
        'service_lns5hff',
        'template_i0c2orp',
        testParams,
        'h3kC19B1uve366yko'
      );
      
      console.log('Test email sent successfully:', result);
      setTestResult(`✅ Success! Email sent successfully. Status: ${result.status}, Text: ${result.text}`);
      
    } catch (error) {
      console.error('Test email failed:', error);
      if (error instanceof Error) {
        setTestResult(`❌ Failed: ${error.message}`);
      } else {
        setTestResult('❌ Failed: Unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        EmailJS Configuration Test
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This will test your EmailJS setup with the following configuration:
        <br />• Service ID: service_lns5hff
        <br />• Template ID: template_i0c2orp
        <br />• Public Key: h3kC19B1uve366yko
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testEmailJS} 
        disabled={isLoading}
        sx={{ mb: 2 }}
      >
        {isLoading ? 'Testing...' : 'Test EmailJS'}
      </Button>
      
      {testResult && (
        <Alert 
          severity={testResult.includes('✅') ? 'success' : 'error'}
          sx={{ mt: 2 }}
        >
          {testResult}
        </Alert>
      )}
      
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Troubleshooting Steps:
      </Typography>
      
      <Typography variant="body2" component="div">
        <ol>
          <li><strong>Check your EmailJS account:</strong> Make sure your account is active and not suspended</li>
          <li><strong>Verify Service ID:</strong> In EmailJS dashboard, go to Email Services and check the Service ID</li>
          <li><strong>Verify Template ID:</strong> In EmailJS dashboard, go to Email Templates and check the Template ID</li>
          <li><strong>Check Public Key:</strong> In EmailJS dashboard, go to Account → API Keys and verify your Public Key</li>
          <li><strong>Template Variables:</strong> Make sure your template uses these variables:
            <ul>
              <li>{'{{from_name}}'}</li>
              <li>{'{{from_email}}'}</li>
              <li>{'{{reply_to}}'}</li>
              <li>{'{{company}}'}</li>
              <li>{'{{message}}'}</li>
              <li>{'{{subject}}'}</li>
            </ul>
          </li>
          <li><strong>Email Service:</strong> Make sure your email service (Gmail, etc.) is properly connected</li>
          <li><strong>Domain Settings:</strong> If testing locally, make sure localhost is allowed in your EmailJS settings</li>
        </ol>
      </Typography>
    </Box>
  );
};

export default EmailJSTest;
