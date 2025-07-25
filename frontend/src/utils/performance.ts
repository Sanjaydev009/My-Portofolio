/**
 * Performance optimization utilities for the portfolio application
 */

// Debounce function to limit function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit function execution frequency
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get optimized animation duration based on user preference
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

// Intersection Observer for performance-friendly animations
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined') return null;
  
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Optimized Framer Motion variants for reduced animations
export const optimizedVariants = {
  // Simple fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: prefersReducedMotion() ? 0 : 0.5 }
    }
  },
  
  // Simple slide up
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion() ? 0 : 0.6 }
    }
  },

  // Stagger container with reduced motion
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: prefersReducedMotion() ? 0 : 0.1,
        staggerChildren: prefersReducedMotion() ? 0 : 0.1
      }
    }
  }
};

// Performance monitoring utilities
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const renderTime = end - start;
      
      if (renderTime > 16) { // More than 1 frame at 60fps
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  },

  // Memory usage monitoring
  getMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  },

  // FPS monitoring
  monitorFPS: () => {
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;

    const measureFPS = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;

        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}`);
        }
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
    return () => fps;
  }
};

// Device performance detection
export const devicePerformance = {
  // Detect if device is likely low-end
  isLowEndDevice: (): boolean => {
    if (typeof navigator === 'undefined') return false;
    
    // Check for hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2;
    
    // Check for device memory (if available)
    const memory = (navigator as any).deviceMemory || 4;
    
    // Check for connection type
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    );

    return cores <= 2 || memory <= 2 || isSlowConnection;
  },

  // Get performance tier
  getPerformanceTier: (): 'low' | 'medium' | 'high' => {
    if (devicePerformance.isLowEndDevice()) return 'low';
    
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    
    if (cores >= 8 && memory >= 8) return 'high';
    return 'medium';
  }
};

// Animation performance optimizations
export const animationOptimizations = {
  // Get reduced animation config based on device performance
  getAnimationConfig: () => {
    const tier = devicePerformance.getPerformanceTier();
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      return {
        enabled: false,
        duration: 0,
        particleCount: 0,
        complexAnimations: false
      };
    }

    switch (tier) {
      case 'low':
        return {
          enabled: true,
          duration: 0.3,
          particleCount: 2,
          complexAnimations: false
        };
      case 'medium':
        return {
          enabled: true,
          duration: 0.5,
          particleCount: 4,
          complexAnimations: false
        };
      case 'high':
      default:
        return {
          enabled: true,
          duration: 0.8,
          particleCount: 6,
          complexAnimations: true
        };
    }
  },

  // Will change optimization for better performance
  optimizeForWillChange: (element: HTMLElement, properties: string[]) => {
    element.style.willChange = properties.join(', ');
    
    // Clean up will-change after animation
    const cleanup = () => {
      element.style.willChange = 'auto';
    };

    return cleanup;
  }
};

export default {
  debounce,
  throttle,
  prefersReducedMotion,
  getAnimationDuration,
  createIntersectionObserver,
  optimizedVariants,
  performanceMonitor,
  devicePerformance,
  animationOptimizations
};
