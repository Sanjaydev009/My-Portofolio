import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface SkillData {
  name: string;
  level: number;
  color: string;
  category: string;
}

interface SkillVisualizationProps {
  skills: SkillData[];
}

const SkillVisualization: React.FC<SkillVisualizationProps> = ({ skills }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 150;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw radar chart
    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;

    // Draw grid circles
    for (let i = 1; i <= 5; i++) {
      const radius = (maxRadius * i) / 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = theme.palette.divider;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw grid lines
    skills.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = theme.palette.divider;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw skill polygon
    ctx.beginPath();
    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = (maxRadius * skill.level) / 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = `${theme.palette.primary.main}30`;
    ctx.fill();
    ctx.strokeStyle = theme.palette.primary.main;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw skill points and labels
    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = (maxRadius * skill.level) / 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = skill.color;
      ctx.fill();

      // Draw label
      const labelRadius = maxRadius + 20;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;

      ctx.fillStyle = theme.palette.text.primary;
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(skill.name, labelX, labelY);
      ctx.fillText(`${skill.level}%`, labelX, labelY + 15);
    });
  }, [skills, theme]);

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          Technical Skills Radar
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: skill.color,
                  }}
                />
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                  {skill.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillVisualization;
