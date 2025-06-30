import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorBoundaryProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
  showRetry = true,
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Alert 
        severity="error" 
        sx={{ mb: showRetry && onRetry ? 2 : 0 }}
      >
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
      {showRetry && onRetry && (
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRetry}
          sx={{ mt: 1 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorBoundary;
