import { useState, useEffect } from 'react';

// Hook for handling loading states
export const useLoading = (initialState: boolean = false) => {
  const [loading, setLoading] = useState(initialState);
  
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const toggleLoading = () => setLoading(prev => !prev);
  
  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading
  };
};

// Hook for handling async operations
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return {
    execute,
    status,
    data,
    error,
    loading: status === 'pending',
    success: status === 'success',
    failed: status === 'error'
  };
};

// Hook for handling form state
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Record<string, string>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const setFieldTouched = (name: keyof T, touched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: touched }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const finalValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    setValue(name, finalValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setFieldTouched(name);
    
    // Validate field on blur
    if (validationSchema) {
      const fieldErrors = validationSchema({ ...values, [name]: values[name as keyof T] });
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] || '' }));
    }
  };

  const validate = (): boolean => {
    if (!validationSchema) return true;
    
    const validationErrors = validationSchema(values);
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid = Object.keys(errors).every(key => !errors[key]);

  return {
    values,
    errors,
    touched,
    setValue,
    handleChange,
    handleBlur,
    setFieldTouched,
    validate,
    reset,
    isValid
  };
};

// Hook for handling local storage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

// Hook for handling window scroll
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const updateScrollY = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up');
      }
      
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, []);

  return { scrollY, scrollDirection };
};

// Hook for handling window resize
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Hook for handling media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
};

// Hook for handling debounced values
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for handling previous values
export const usePrevious = <T>(value: T): T | undefined => {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | undefined>();

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
};

// Hook for handling click outside
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Hook for handling copy to clipboard
export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopied(false);
    }
  };

  return { copied, copy };
};

// Hook for handling intersection observer
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, options]);

  return isIntersecting;
};

// Hook for handling toggle state
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse, setValue };
};
