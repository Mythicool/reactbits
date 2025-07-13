'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplitTextProps {
  text: string;
  splitBy: 'character' | 'word' | 'line';
  animationType: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  duration: number;
  delay: number;
  stagger: number;
  className?: string;
}

export function SplitText({
  text,
  splitBy,
  animationType,
  duration,
  delay,
  stagger,
  className = '',
}: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const splitText = () => {
    switch (splitBy) {
      case 'character':
        return text.split('');
      case 'word':
        return text.split(' ');
      case 'line':
        return text.split('\n');
      default:
        return [text];
    }
  };

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    switch (animationType) {
      case 'fadeIn':
        return baseVariants;
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -20 },
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
      default:
        return baseVariants;
    }
  };

  const variants = getAnimationVariants();
  const parts = splitText();

  return (
    <div className={`inline-block ${className}`}>
      {parts.map((part, index) => (
        <motion.span
          key={index}
          variants={variants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{
            duration: duration,
            delay: index * stagger,
            ease: "easeOut",
          }}
          className={splitBy === 'word' ? 'inline-block mr-1' : 'inline-block'}
        >
          {part === ' ' ? '\u00A0' : part}
          {splitBy === 'line' && index < parts.length - 1 && <br />}
        </motion.span>
      ))}
    </div>
  );
}
