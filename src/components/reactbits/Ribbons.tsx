'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RibbonsProps {
  ribbonCount: number;
  ribbonWidth: number;
  colors: string[];
  animationSpeed: number;
  waveAmplitude: number;
  waveFrequency: number;
  direction: 'horizontal' | 'vertical' | 'diagonal';
  pattern: 'wave' | 'spiral' | 'flow' | 'dance';
  interactive: boolean;
  className?: string;
}

interface Ribbon {
  id: number;
  color: string;
  offset: number;
  delay: number;
}

export function Ribbons({
  ribbonCount,
  ribbonWidth,
  colors,
  animationSpeed,
  waveAmplitude,
  waveFrequency,
  direction,
  pattern,
  interactive,
  className = '',
}: RibbonsProps) {
  const [ribbons, setRibbons] = useState<Ribbon[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const newRibbons: Ribbon[] = [];
    for (let i = 0; i < ribbonCount; i++) {
      newRibbons.push({
        id: i,
        color: colors[i % colors.length],
        offset: i * (400 / ribbonCount),
        delay: i * 0.1,
      });
    }
    setRibbons(newRibbons);
  }, [ribbonCount, colors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + animationSpeed * 0.016);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [animationSpeed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const getRibbonPath = (ribbon: Ribbon, index: number) => {
    const baseOffset = ribbon.offset;
    const timeOffset = time + ribbon.delay;
    const mouseInfluence = interactive ? mousePosition.x * 50 : 0;

    switch (pattern) {
      case 'wave':
        return `M 0 ${baseOffset + Math.sin(timeOffset * waveFrequency) * waveAmplitude + mouseInfluence} 
                Q 100 ${baseOffset + Math.sin(timeOffset * waveFrequency + 1) * waveAmplitude} 
                  200 ${baseOffset + Math.sin(timeOffset * waveFrequency + 2) * waveAmplitude} 
                Q 300 ${baseOffset + Math.sin(timeOffset * waveFrequency + 3) * waveAmplitude} 
                  400 ${baseOffset + Math.sin(timeOffset * waveFrequency + 4) * waveAmplitude}`;

      case 'spiral':
        const spiralRadius = 50 + index * 20;
        const spiralAngle = timeOffset * 0.5;
        const centerX = 200 + Math.cos(spiralAngle) * spiralRadius;
        const centerY = 150 + Math.sin(spiralAngle) * spiralRadius;
        return `M ${centerX - 100} ${centerY} 
                Q ${centerX} ${centerY - 50} 
                  ${centerX + 100} ${centerY}`;

      case 'flow':
        const flowY = baseOffset + Math.sin(timeOffset * 0.5) * waveAmplitude;
        return `M 0 ${flowY} 
                C 100 ${flowY - 30} 200 ${flowY + 30} 300 ${flowY} 
                S 400 ${flowY + 20} 400 ${flowY}`;

      case 'dance':
        const danceX = Math.sin(timeOffset * 0.8 + index) * 50;
        const danceY = baseOffset + Math.cos(timeOffset * 0.6 + index) * waveAmplitude;
        return `M ${100 + danceX} ${danceY} 
                Q ${200 + danceX * 0.5} ${danceY - 40} 
                  ${300 + danceX} ${danceY}`;

      default:
        return `M 0 ${baseOffset} L 400 ${baseOffset}`;
    }
  };

  const getRibbonTransform = (ribbon: Ribbon) => {
    switch (direction) {
      case 'vertical':
        return 'rotate(90deg)';
      case 'diagonal':
        return 'rotate(45deg)';
      case 'horizontal':
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <div
      className={`relative w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* SVG Container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        style={{
          transform: getRibbonTransform(ribbons[0] || { id: 0, color: '', offset: 0, delay: 0 }),
          transformOrigin: 'center',
        }}
      >
        {ribbons.map((ribbon, index) => (
          <motion.path
            key={ribbon.id}
            d={getRibbonPath(ribbon, index)}
            stroke={ribbon.color}
            strokeWidth={ribbonWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              duration: 2,
              delay: ribbon.delay,
              ease: "easeInOut",
            }}
            style={{
              filter: `drop-shadow(0 0 ${ribbonWidth}px ${ribbon.color}40)`,
            }}
          />
        ))}

        {/* Glow effects */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Interactive particles */}
      {interactive && (
        <motion.div
          className="absolute w-4 h-4 bg-white rounded-full pointer-events-none"
          style={{
            left: mousePosition.x * 400 - 8,
            top: mousePosition.y * 300 - 8,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-white text-center"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-2xl font-bold mb-2">Ribbons</div>
          <div className="text-sm opacity-80">
            Pattern: {pattern} | Direction: {direction}
          </div>
        </motion.div>
      </div>

      {/* Controls info */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70">
        Ribbons: {ribbons.length} | Width: {ribbonWidth}px
      </div>

      {/* Interactive hint */}
      {interactive && (
        <div className="absolute top-4 right-4 text-white text-xs opacity-70">
          Move mouse to influence ribbons
        </div>
      )}
    </div>
  );
}
