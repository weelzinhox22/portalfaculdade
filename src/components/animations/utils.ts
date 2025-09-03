// Animation utilities for enhanced microinteractions

// Debounce function for animation performance
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Generate random animation delay for staggered effects
export const getRandomDelay = (min: number = 0, max: number = 0.5) => {
  return Math.random() * (max - min) + min;
};

// Calculate optimal animation duration based on distance
export const calculateDuration = (distance: number, baseSpeed: number = 0.3) => {
  return Math.min(distance / 1000 + baseSpeed, 1);
};

// Spring animation config for natural feel
export const springConfig = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
  mass: 1,
};

// Bounce animation config
export const bounceConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
  mass: 0.8,
};

// Ease out config
export const easeOutConfig = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

// Check if element is in viewport
export const isInViewport = (element: Element, threshold: number = 0.1) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
  const horInView = rect.left <= windowWidth * (1 - threshold) && rect.right >= windowWidth * threshold;

  return vertInView && horInView;
};

// Get scroll direction
export const getScrollDirection = () => {
  let lastScrollY = window.scrollY;
  return () => {
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = scrollY;
    return direction;
  };
};

// Animation presets for common interactions
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: easeOutConfig,
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: easeOutConfig,
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: easeOutConfig,
  },

  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: easeOutConfig,
  },

  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: easeOutConfig,
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: springConfig,
  },

  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    transition: bounceConfig,
  },

  rotateIn: {
    initial: { opacity: 0, rotate: -180, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: springConfig,
  },
};

// Performance optimization: Use transform and opacity for better performance
export const performantProps = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  perspective: 1000,
};

// Create ripple effect data
export const createRipple = (event: React.MouseEvent<HTMLElement>, buttonRef: React.RefObject<HTMLElement>) => {
  const button = buttonRef.current;
  if (!button) return null;

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  return {
    id: Date.now(),
    x,
    y,
    size,
  };
};

// Color variants for consistent theming
export const colorVariants = {
  primary: {
    bg: 'bg-teal-600',
    hover: 'hover:bg-teal-700',
    text: 'text-white',
    border: 'border-teal-600',
  },
  secondary: {
    bg: 'bg-gray-100',
    hover: 'hover:bg-gray-200',
    text: 'text-gray-900',
    border: 'border-gray-300',
  },
  success: {
    bg: 'bg-green-600',
    hover: 'hover:bg-green-700',
    text: 'text-white',
    border: 'border-green-600',
  },
  error: {
    bg: 'bg-red-600',
    hover: 'hover:bg-red-700',
    text: 'text-white',
    border: 'border-red-600',
  },
  warning: {
    bg: 'bg-yellow-600',
    hover: 'hover:bg-yellow-700',
    text: 'text-white',
    border: 'border-yellow-600',
  },
};