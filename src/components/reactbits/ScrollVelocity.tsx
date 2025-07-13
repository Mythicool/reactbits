'use client';

import { motion, useScroll, useVelocity, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollVelocityProps {
  text: string;
  velocityMultiplier: number;
  maxScale: number;
  maxRotation: number;
  maxBlur: number;
  direction: 'horizontal' | 'vertical';
  smoothing: number;
  className?: string;
}

export function ScrollVelocity({
  text,
  velocityMultiplier,
  maxScale,
  maxRotation,
  maxBlur,
  direction,
  smoothing,
  className = '',
}: ScrollVelocityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollX } = useScroll();
  
  // Get velocity based on direction
  const velocity = direction === 'horizontal' 
    ? useVelocity(scrollX)
    : useVelocity(scrollY);

  // Transform velocity to visual effects
  const scale = useTransform(
    velocity,
    [-1000, 0, 1000],
    [1 - maxScale * 0.5, 1, 1 + maxScale],
    { clamp: false }
  );

  const rotate = useTransform(
    velocity,
    [-1000, 0, 1000],
    [-maxRotation, 0, maxRotation],
    { clamp: false }
  );

  const blur = useTransform(
    velocity,
    [-1000, 0, 1000],
    [maxBlur * 0.5, 0, maxBlur],
    { clamp: false }
  );

  const skewX = useTransform(
    velocity,
    [-1000, 0, 1000],
    [-10, 0, 10],
    { clamp: false }
  );

  const opacity = useTransform(
    velocity,
    [-2000, 0, 2000],
    [0.5, 1, 0.5],
    { clamp: false }
  );

  const characters = text.split('');

  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div ref={containerRef} className="inline-block">
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block font-bold text-4xl"
            style={{
              scale,
              rotate,
              filter: useTransform(blur, (value) => `blur(${Math.abs(value)}px)`),
              skewX,
              opacity,
              transformOrigin: 'center',
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: smoothing,
              mass: 0.8,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      
      {/* Velocity indicator */}
      <motion.div
        className="fixed top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-sm font-mono"
        style={{
          opacity: useTransform(velocity, (v) => Math.abs(v) > 10 ? 1 : 0),
        }}
      >
        <div>Velocity: {useTransform(velocity, (v) => Math.round(v))}</div>
        <div className="text-xs text-gray-300 mt-1">
          {direction === 'horizontal' ? 'Scroll horizontally' : 'Scroll vertically'} to see effects
        </div>
      </motion.div>
      
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-0 left-0 h-1 bg-blue-500 origin-left"
        style={{
          scaleX: direction === 'horizontal' 
            ? useTransform(scrollX, [0, 1000], [0, 1])
            : useTransform(scrollY, [0, 1000], [0, 1]),
          width: '100%',
        }}
      />
      
      {/* Content spacer for scrolling */}
      <div className="absolute inset-0 w-full h-[200vh]" />
    </div>
  );
}
