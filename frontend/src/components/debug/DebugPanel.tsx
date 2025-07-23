import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Divider } from '@mui/material';
import { ExpandMore, BugReport } from '@mui/icons-material';
import ResumeDownloadService from '../../utils/resumeDownload';

/**
 * Debug Component - Only visible in development or when explicitly enabled
 * Helps troubleshoot deployment issues
 */
const DebugPanel: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when debug query param is present
    const isDev = import.meta.env.DEV;
    const hasDebugParam = new URLSearchParams(window.location.search).has('debug');
    setIsVisible(isDev || hasDebugParam);

    if (isDev || hasDebugParam) {
      collectDebugInfo();
    }
  }, []);

  const collectDebugInfo = async () => {
    const info: any = {
      environment: import.meta.env.MODE,
      baseUrl: import.meta.env.BASE_URL,
      origin: window.location.origin,
      pathname: window.location.pathname,
      staticPaths: {
        profileImage: '/images/sanju.jpg',
        resume: '/documents/Sanju_Resume.pdf',
      },
    };

    // Test file accessibility
    try {
      const resumeExists = await ResumeDownloadService.checkResumeExists();
      info.resumeAccessible = resumeExists;
    } catch (error) {
      info.resumeError = error?.toString();
    }

    try {
      const imageResponse = await fetch('/images/sanju.jpg', { method: 'HEAD' });
      info.imageAccessible = imageResponse.ok;
      info.imageStatus = imageResponse.status;
    } catch (error) {
      info.imageError = error?.toString();
    }

    // Get best resume URL
    try {
      const bestUrl = await ResumeDownloadService.getBestResumeUrl();
      info.bestResumeUrl = bestUrl;
    } catch (error) {
      info.bestResumeError = error?.toString();
    }

    setDebugInfo(info);
  };

  const testResumeDownload = async () => {
    try {
      const success = await ResumeDownloadService.downloadResume({
        showUserFeedback: true,
      });
      alert(`Resume download test result: ${success ? 'SUCCESS' : 'FAILED'}`);
    } catch (error) {
      alert(`Resume download test error: ${error}`);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
      }}
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BugReport color="warning" />
            <Typography variant="subtitle2">Debug Panel</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ fontSize: '0.8rem' }}>
            <Typography variant="subtitle2" gutterBottom>
              Environment Info
            </Typography>
            <pre style={{ fontSize: '0.7rem', overflow: 'auto' }}>
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Test Actions
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={testResumeDownload}
              fullWidth
              sx={{ mb: 1 }}
            >
              Test Resume Download
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => window.open('/images/sanju.jpg', '_blank')}
              fullWidth
              sx={{ mb: 1 }}
            >
              Test Profile Image
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => window.open('/documents/Sanju_Resume.pdf', '_blank')}
              fullWidth
            >
              Test Resume Direct Link
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DebugPanel;
