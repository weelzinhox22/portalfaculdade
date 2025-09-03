// Animation variants for consistent microinteractions
import { Variants } from 'framer-motion';

// Standard easing curves
export const easing = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
};

// Standard durations
export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Fade animations
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.base, ease: easing.easeOut } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: easing.easeIn } },
};

// Slide animations
export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

export const slideDownVariants: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

export const slideLeftVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

export const slideRightVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

// Scale animations
export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: duration.fast }
  },
};

// Stagger animations for lists
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
};

// Hover animations
export const hoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
  tap: {
    scale: 0.95,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

// Button animations
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
  tap: {
    scale: 0.98,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
  loading: {
    scale: 1,
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
};

// Card animations
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.easeOut }
  },
  hover: {
    y: -8,
    transition: { duration: duration.slow, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

// Input animations
export const inputVariants: Variants = {
  initial: { scale: 1 },
  focus: {
    scale: 1.02,
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
  error: {
    scale: 1.01,
    transition: { duration: duration.fast, ease: easing.bounce }
  },
};

// Loading animations
export const loadingVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

// Toast animations
export const toastVariants: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.3 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.base, ease: easing.elastic }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

// Page transition animations
export const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.easeOut }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: duration.fast, ease: easing.easeIn }
  },
};

// Scroll reveal animations
export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.easeOut }
  },
};