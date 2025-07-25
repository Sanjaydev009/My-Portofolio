import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { performanceMonitor } from '../../utils/performance';

interface PerformanceMonitorProps {
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ enabled = false }) => {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState<any>(null);

  useEffect(() => {
    if (!enabled || import.meta.env.DEV !== true) return;

    let fpsMonitor: () => number;
    
    // Monitor FPS
    fpsMonitor = performanceMonitor.monitorFPS();

    // Update FPS display every 2 seconds
    const fpsInterval = setInterval(() => {
      setFps(fpsMonitor());
    }, 2000);

    // Monitor memory usage every 5 seconds
    const memoryInterval = setInterval(() => {
      const memory = performanceMonitor.getMemoryUsage();
      setMemoryUsage(memory);
    }, 5000);

    return () => {
      clearInterval(fpsInterval);
      clearInterval(memoryInterval);
    };
  }, [enabled]);

  if (!enabled || import.meta.env.DEV !== true) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
        p: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 2,
        minWidth: 200,
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
        Performance Monitor
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Chip
          label={`FPS: ${fps}`}
          color={fps >= 60 ? 'success' : fps >= 30 ? 'warning' : 'error'}
          size="small"
        />
        
        {memoryUsage && (
          <Chip
            label={`Memory: ${Math.round(memoryUsage.used / 1048576)}MB`}
            color={
              memoryUsage.used / memoryUsage.limit < 0.7 
                ? 'success' 
                : memoryUsage.used / memoryUsage.limit < 0.9 
                ? 'warning' 
                : 'error'
            }
            size="small"
          />
        )}
      </Box>
    </Box>
  );
};

export default PerformanceMonitor;
