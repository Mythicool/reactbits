'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FuzzyTextProps {
  text: string;
  intensity: number;
  speed: number;
  glitchChance: number;
  colorShift: boolean;
  blurAmount: number;
  className?: string;
}

export function FuzzyText({
  text,
  intensity,
  speed,
  glitchChance,
  colorShift,
  blurAmount,
  className = '',
}: FuzzyTextProps) {
  const [glitchState, setGlitchState] = useState<boolean[]>([]);
  const [positions, setPositions] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGlitchState = text.split('').map(() => Math.random() < glitchChance);
      const newPositions = text.split('').map(() => ({
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity,
      }));
      
      setGlitchState(newGlitchState);
      setPositions(newPositions);
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [text, intensity, speed, glitchChance]);

  const characters = text.split('');

  const getGlitchColors = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {characters.map((char, index) => {
        const isGlitching = glitchState[index];
        const position = positions[index] || { x: 0, y: 0 };
        
        return (
          <motion.span
            key={index}
            className="inline-block relative"
            animate={{
              x: isGlitching ? position.x : 0,
              y: isGlitching ? position.y : 0,
              filter: isGlitching ? `blur(${blurAmount}px)` : 'blur(0px)',
              color: isGlitching && colorShift ? getGlitchColors() : 'inherit',
            }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
          >
            {char}
            {isGlitching && (
              <>
                <motion.span
                  className="absolute inset-0"
                  style={{
                    color: '#ff0000',
                    mixBlendMode: 'multiply',
                  }}
                  animate={{
                    x: Math.random() * 2 - 1,
                    y: Math.random() * 2 - 1,
                    opacity: 0.7,
                  }}
                  transition={{ duration: 0.05 }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className="absolute inset-0"
                  style={{
                    color: '#00ffff',
                    mixBlendMode: 'multiply',
                  }}
                  animate={{
                    x: Math.random() * 2 - 1,
                    y: Math.random() * 2 - 1,
                    opacity: 0.7,
                  }}
                  transition={{ duration: 0.05 }}
                >
                  {char}
                </motion.span>
              </>
            )}
          </motion.span>
        );
      })}
    </div>
  );
}
