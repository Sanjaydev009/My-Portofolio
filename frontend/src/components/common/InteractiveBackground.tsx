import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface InteractiveBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  particleCount = 80,
  connectionDistance = 120,
  mouseRadius = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = '#2196F3';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawConnection = (p1: Particle, p2: Particle, distance: number) => {
      const opacity = 1 - distance / connectionDistance;
      ctx.save();
      ctx.globalAlpha = opacity * 0.3;
      ctx.strokeStyle = '#2196F3';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    };

    const updateParticles = () => {
      const mouse = mouseRef.current;
      
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2)
        );

        if (mouseDistance < mouseRadius) {
          const force = (mouseRadius - mouseDistance) / mouseRadius;
          const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
          particle.vx += Math.cos(angle) * force * 0.1;
          particle.vy += Math.sin(angle) * force * 0.1;
        }

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw connections to nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
          );

          if (distance < connectionDistance) {
            drawConnection(particle, other, distance);
          }
        }

        drawParticle(particle);
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, connectionDistance, mouseRadius]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.6,
        }}
      />
    </Box>
  );
};

export default InteractiveBackground;
