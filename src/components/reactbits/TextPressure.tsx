'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface TextPressureProps {
  text: string;
  pressureIntensity: number;
  recoverySpeed: number;
  maxScale: number;
  minScale: number;
  pressureRadius: number;
  className?: string;
}

export function TextPressure({
  text,
  pressureIntensity,
  recoverySpeed,
  maxScale,
  minScale,
  pressureRadius,
  className = '',
}: TextPressureProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const characters = text.split('');

  const getCharacterScale = (charIndex: number) => {
    if (!containerRef.current) return 1;

    const charElement = containerRef.current.children[charIndex] as HTMLElement;
    if (!charElement) return 1;

    const charRect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
    const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charCenterX, 2) + 
      Math.pow(mousePosition.y - charCenterY, 2)
    );

    if (distance > pressureRadius) return minScale;

    const pressure = Math.max(0, 1 - distance / pressureRadius);
    const scale = minScale + (maxScale - minScale) * pressure * pressureIntensity;
    
    return isPressed ? scale : minScale + (scale - minScale) * 0.3;
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            scale: getCharacterScale(index),
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          style={{
            transformOrigin: 'center bottom',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}
