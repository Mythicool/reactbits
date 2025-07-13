'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedContentProps {
  children: ReactNode;
  animationType: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'bounce';
  duration: number;
  delay: number;
  repeat: boolean;
  repeatDelay: number;
  trigger: 'auto' | 'hover' | 'click';
  className?: string;
}

export function AnimatedContent({
  children,
  animationType,
  duration,
  delay,
  repeat,
  repeatDelay,
  trigger,
  className = '',
}: AnimatedContentProps) {
  const getVariants = () => {
    switch (animationType) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { opacity: 1, rotate: 0 },
        };
      case 'bounce':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            }
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  const getAnimationProps = () => {
    const baseProps = {
      variants,
      transition: {
        duration,
        delay,
        repeat: repeat ? Infinity : 0,
        repeatDelay,
        ease: "easeOut",
      },
    };

    if (trigger === 'auto') {
      return {
        ...baseProps,
        initial: "hidden",
        animate: "visible",
      };
    } else if (trigger === 'hover') {
      return {
        ...baseProps,
        initial: "hidden",
        whileHover: "visible",
      };
    } else if (trigger === 'click') {
      return {
        ...baseProps,
        initial: "hidden",
        whileTap: "visible",
      };
    }

    return baseProps;
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
}
