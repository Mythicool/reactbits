'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FadeContentProps {
  children: ReactNode;
  direction: 'in' | 'out' | 'inOut';
  duration: number;
  delay: number;
  threshold: number;
  once: boolean;
  stagger: number;
  className?: string;
}

export function FadeContent({
  children,
  direction,
  duration,
  delay,
  threshold,
  once,
  stagger,
  className = '',
}: FadeContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    threshold,
    once 
  });

  const getVariants = () => {
    switch (direction) {
      case 'in':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'out':
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 0 },
        };
      case 'inOut':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: [0, 1, 1, 0],
            transition: {
              duration: duration * 2,
              times: [0, 0.3, 0.7, 1],
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

  // If children is a string, split into characters for stagger effect
  const renderContent = () => {
    if (typeof children === 'string' && stagger > 0) {
      return children.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          transition={{
            duration,
            delay: delay + (index * stagger),
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }
    
    return children;
  };

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      variants={stagger > 0 ? {} : variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={stagger > 0 ? {} : {
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {renderContent()}
    </motion.div>
  );
}
