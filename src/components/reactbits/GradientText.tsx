'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GradientTextProps {
  text: string;
  colors: string[];
  direction: number;
  animated: boolean;
  speed: number;
  size: number;
  className?: string;
}

export function GradientText({
  text,
  colors,
  direction,
  animated,
  speed,
  size,
  className = '',
}: GradientTextProps) {
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    if (animated && speed > 0) {
      const interval = setInterval(() => {
        setGradientPosition(prev => (prev + speed) % 200);
      }, 16); // ~60fps
      return () => clearInterval(interval);
    }
  }, [animated, speed]);

  const createGradient = () => {
    const colorStops = colors.map((color, index) => {
      const position = (index / (colors.length - 1)) * 100;
      return `${color} ${position}%`;
    }).join(', ');

    if (animated) {
      return `linear-gradient(${direction}deg, ${colorStops}, ${colors[0]} 100%, ${colorStops})`;
    }
    
    return `linear-gradient(${direction}deg, ${colorStops})`;
  };

  const gradientStyle = {
    background: createGradient(),
    backgroundSize: animated ? '200% 200%' : '100% 100%',
    backgroundPosition: animated ? `${gradientPosition}% 50%` : '0% 50%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontSize: `${size}px`,
    fontWeight: 'bold',
    display: 'inline-block',
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={gradientStyle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.div>
  );
}
