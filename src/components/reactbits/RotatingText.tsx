'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RotatingTextProps {
  words: string[];
  duration: number;
  transitionType: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  loop: boolean;
  pauseOnHover: boolean;
  className?: string;
}

export function RotatingText({
  words,
  duration,
  transitionType,
  loop,
  pauseOnHover,
  className = '',
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        if (next >= words.length) {
          return loop ? 0 : prev;
        }
        return next;
      });
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [words, duration, loop, isPaused]);

  const getVariants = () => {
    switch (transitionType) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        };
      case 'slideDown':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
        };
      case 'slideLeft':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
        };
      case 'slideRight':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 },
        };
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -10 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: 10 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <div 
      className={`inline-block relative ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
      
      {/* Progress indicator */}
      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 rounded">
        <motion.div
          className="h-full bg-blue-500 rounded"
          initial={{ width: '0%' }}
          animate={{ width: isPaused ? '0%' : '100%' }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: loop ? Infinity : 0,
          }}
        />
      </div>
    </div>
  );
}
