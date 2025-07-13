'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollFloatProps {
  text: string;
  floatIntensity: number;
  rotationIntensity: number;
  scaleIntensity: number;
  stagger: number;
  direction: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollFloat({
  text,
  floatIntensity,
  rotationIntensity,
  scaleIntensity,
  stagger,
  direction,
  className = '',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const characters = text.split('');

  const getTransforms = (index: number) => {
    const staggeredProgress = useTransform(
      scrollYProgress,
      [0, 1],
      [0 - (index * stagger), 1 - (index * stagger)]
    );

    let x, y;
    switch (direction) {
      case 'up':
        x = useTransform(staggeredProgress, [0, 1], [0, 0]);
        y = useTransform(staggeredProgress, [0, 1], [0, -floatIntensity]);
        break;
      case 'down':
        x = useTransform(staggeredProgress, [0, 1], [0, 0]);
        y = useTransform(staggeredProgress, [0, 1], [0, floatIntensity]);
        break;
      case 'left':
        x = useTransform(staggeredProgress, [0, 1], [0, -floatIntensity]);
        y = useTransform(staggeredProgress, [0, 1], [0, 0]);
        break;
      case 'right':
        x = useTransform(staggeredProgress, [0, 1], [0, floatIntensity]);
        y = useTransform(staggeredProgress, [0, 1], [0, 0]);
        break;
      default:
        x = useTransform(staggeredProgress, [0, 1], [0, 0]);
        y = useTransform(staggeredProgress, [0, 1], [0, -floatIntensity]);
    }

    const rotate = useTransform(
      staggeredProgress,
      [0, 1],
      [0, rotationIntensity * (index % 2 === 0 ? 1 : -1)]
    );

    const scale = useTransform(
      staggeredProgress,
      [0, 0.5, 1],
      [1, 1 + scaleIntensity, 1]
    );

    return { x, y, rotate, scale };
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div ref={containerRef} className="inline-block text-4xl font-bold">
        {characters.map((char, index) => {
          const { x, y, rotate, scale } = getTransforms(index);
          
          return (
            <motion.span
              key={index}
              className="inline-block"
              style={{
                x,
                y,
                rotate,
                scale,
                transformOrigin: 'center',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
