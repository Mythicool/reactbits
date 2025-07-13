'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  text: string;
  revealType: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'clip';
  duration: number;
  stagger: number;
  threshold: number;
  once: boolean;
  className?: string;
}

export function ScrollReveal({
  text,
  revealType,
  duration,
  stagger,
  threshold,
  once,
  className = '',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    threshold: threshold,
    once: once 
  });

  const characters = text.split('');

  const getVariants = () => {
    switch (revealType) {
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
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -180 },
          visible: { opacity: 1, rotate: 0 },
        };
      case 'clip':
        return {
          hidden: { 
            opacity: 0,
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          },
          visible: { 
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
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

  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div ref={containerRef} className="inline-block text-4xl font-bold">
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              duration: duration,
              delay: index * stagger,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: 'center bottom',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
        {isInView ? '✓ In View' : '↓ Scroll to reveal'}
      </div>
    </div>
  );
}
