'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FallingTextProps {
  text: string;
  fallHeight: number;
  fallDuration: number;
  stagger: number;
  bounce: boolean;
  gravity: number;
  rotation: boolean;
  className?: string;
}

export function FallingText({
  text,
  fallHeight,
  fallDuration,
  stagger,
  bounce,
  gravity,
  rotation,
  className = '',
}: FallingTextProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const characters = text.split('');

  const getFallVariants = (index: number) => {
    const randomRotation = rotation ? Math.random() * 720 - 360 : 0;
    const randomDelay = Math.random() * 0.2;

    return {
      initial: {
        y: -fallHeight,
        opacity: 0,
        rotate: rotation ? Math.random() * 180 - 90 : 0,
        scale: 0.8,
      },
      animate: {
        y: 0,
        opacity: 1,
        rotate: randomRotation,
        scale: 1,
      },
      transition: {
        duration: fallDuration,
        delay: index * stagger + randomDelay,
        ease: bounce ? [0.25, 0.46, 0.45, 0.94] : "easeOut",
        type: bounce ? "spring" : "tween",
        stiffness: bounce ? 100 : undefined,
        damping: bounce ? 10 : undefined,
        mass: gravity,
      },
    };
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 100);
  };

  return (
    <div className={`inline-block ${className}`}>
      <div className="relative overflow-hidden" style={{ height: `${fallHeight + 50}px` }}>
        {characters.map((char, index) => {
          const variants = getFallVariants(index);
          
          return (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block font-bold"
              initial={variants.initial}
              animate={isAnimating ? variants.animate : variants.initial}
              transition={variants.transition}
              style={{
                transformOrigin: 'center bottom',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
      </div>
      
      <button
        onClick={resetAnimation}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
      >
        Drop Again
      </button>
    </div>
  );
}
