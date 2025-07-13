'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CurvedLoopProps {
  text: string;
  pathType: 'sine' | 'circle' | 'spiral' | 'wave';
  amplitude: number;
  frequency: number;
  speed: number;
  fontSize: number;
  className?: string;
}

export function CurvedLoop({
  text,
  pathType,
  amplitude,
  frequency,
  speed,
  fontSize,
  className = '',
}: CurvedLoopProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (speed > 0) {
      const interval = setInterval(() => {
        setTime(prev => prev + speed * 0.016); // ~60fps
      }, 16);
      return () => clearInterval(interval);
    }
  }, [speed]);

  const characters = text.split('');

  const getCharacterPosition = (index: number) => {
    const progress = (index / characters.length) + time;
    
    switch (pathType) {
      case 'sine':
        return {
          x: index * (fontSize * 0.8),
          y: Math.sin(progress * frequency) * amplitude,
          rotation: Math.cos(progress * frequency) * 15,
        };
      case 'circle':
        const angle = progress * frequency * Math.PI * 2;
        return {
          x: Math.cos(angle) * amplitude,
          y: Math.sin(angle) * amplitude,
          rotation: (angle * 180 / Math.PI) + 90,
        };
      case 'spiral':
        const spiralAngle = progress * frequency * Math.PI * 2;
        const radius = amplitude * (1 + progress * 0.1);
        return {
          x: Math.cos(spiralAngle) * radius,
          y: Math.sin(spiralAngle) * radius,
          rotation: spiralAngle * 180 / Math.PI,
        };
      case 'wave':
        return {
          x: index * (fontSize * 0.8),
          y: Math.sin(progress * frequency) * amplitude + Math.cos(progress * frequency * 2) * (amplitude * 0.3),
          rotation: Math.sin(progress * frequency) * 10,
        };
      default:
        return { x: index * fontSize, y: 0, rotation: 0 };
    }
  };

  const containerSize = pathType === 'circle' || pathType === 'spiral' 
    ? amplitude * 2 + fontSize * 2 
    : Math.max(text.length * fontSize, amplitude * 2 + fontSize * 2);

  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ 
        width: containerSize,
        height: containerSize,
        fontSize: `${fontSize}px`
      }}
    >
      {characters.map((char, index) => {
        const { x, y, rotation } = getCharacterPosition(index);
        
        return (
          <motion.span
            key={index}
            className="absolute font-bold"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: x,
              y: y,
              rotate: rotation,
            }}
            transition={{
              type: "linear",
              duration: 0,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}
