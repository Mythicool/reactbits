'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircularTextProps {
  text: string;
  radius: number;
  fontSize: number;
  rotationSpeed: number;
  direction: 'clockwise' | 'counterclockwise';
  startAngle: number;
  className?: string;
}

export function CircularText({
  text,
  radius,
  fontSize,
  rotationSpeed,
  direction,
  startAngle,
  className = '',
}: CircularTextProps) {
  const [rotation, setRotation] = useState(startAngle);

  useEffect(() => {
    if (rotationSpeed > 0) {
      const interval = setInterval(() => {
        setRotation(prev => {
          const increment = direction === 'clockwise' ? rotationSpeed : -rotationSpeed;
          return prev + increment;
        });
      }, 16); // ~60fps
      return () => clearInterval(interval);
    }
  }, [rotationSpeed, direction]);

  const characters = text.split('');
  const angleStep = 360 / characters.length;

  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ 
        width: radius * 2, 
        height: radius * 2,
        fontSize: `${fontSize}px`
      }}
    >
      {characters.map((char, index) => {
        const angle = (index * angleStep + rotation) * (Math.PI / 180);
        const x = radius + Math.cos(angle) * radius;
        const y = radius + Math.sin(angle) * radius;
        const charRotation = (index * angleStep + rotation + 90) % 360;

        return (
          <motion.span
            key={index}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${charRotation}deg)`,
              transformOrigin: 'center',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.05,
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}
