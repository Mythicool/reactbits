'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  blurAmount: number;
  duration: number;
  delay: number;
  trigger: 'auto' | 'hover' | 'click';
  direction: 'in' | 'out' | 'inOut';
  className?: string;
}

export function BlurText({
  text,
  blurAmount,
  duration,
  delay,
  trigger,
  direction,
  className = '',
}: BlurTextProps) {
  const [isBlurred, setIsBlurred] = useState(direction === 'out' || direction === 'inOut');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(() => {
        if (direction === 'in') {
          setIsBlurred(false);
        } else if (direction === 'out') {
          setIsBlurred(true);
        } else if (direction === 'inOut') {
          setIsBlurred(false);
          setTimeout(() => setIsBlurred(true), duration * 500);
        }
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, direction, delay, duration]);

  const handleInteraction = () => {
    if (trigger === 'hover') {
      setIsBlurred(!isHovered);
    } else if (trigger === 'click') {
      setIsBlurred(!isClicked);
      setIsClicked(!isClicked);
    }
  };

  const getBlurValue = () => {
    if (trigger === 'hover') {
      return isHovered ? 0 : blurAmount;
    }
    return isBlurred ? blurAmount : 0;
  };

  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={() => {
        if (trigger === 'hover') {
          setIsHovered(true);
          handleInteraction();
        }
      }}
      onMouseLeave={() => {
        if (trigger === 'hover') {
          setIsHovered(false);
          handleInteraction();
        }
      }}
      onClick={() => {
        if (trigger === 'click') {
          handleInteraction();
        }
      }}
      animate={{
        filter: `blur(${getBlurValue()}px)`,
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  );
}
