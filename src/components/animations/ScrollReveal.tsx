import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { scrollRevealVariants } from './variants';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  once = true,
  threshold = 0.1,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  // Custom variants based on direction
  const getVariants = () => {
    const baseHidden = { opacity: 0 };
    const baseVisible = {
      opacity: 1,
      transition: { duration, delay }
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseHidden, y: distance },
          visible: { ...baseVisible, y: 0 }
        };
      case 'down':
        return {
          hidden: { ...baseHidden, y: -distance },
          visible: { ...baseVisible, y: 0 }
        };
      case 'left':
        return {
          hidden: { ...baseHidden, x: distance },
          visible: { ...baseVisible, x: 0 }
        };
      case 'right':
        return {
          hidden: { ...baseHidden, x: -distance },
          visible: { ...baseVisible, x: 0 }
        };
      default:
        return {
          hidden: { ...baseHidden, y: distance },
          visible: { ...baseVisible, y: 0 }
        };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

// Hook personalizado para usar scroll reveal em componentes funcionais
export const useScrollReveal = (options?: {
  threshold?: number;
  once?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: options?.threshold || 0.1,
    once: options?.once !== false,
  });

  return { ref, isInView };
};

export default ScrollReveal;