'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface TrueFocusProps {
  text: string;
  focusRadius: number;
  blurIntensity: number;
  focusIntensity: number;
  transitionSpeed: number;
  followMouse: boolean;
  className?: string;
}

export function TrueFocus({
  text,
  focusRadius,
  blurIntensity,
  focusIntensity,
  transitionSpeed,
  followMouse,
  className = '',
}: TrueFocusProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const characters = text.split('');

  const getCharacterEffect = (charIndex: number) => {
    if (!followMouse || !containerRef.current) {
      return {
        filter: isHovered ? `blur(0px) brightness(${focusIntensity})` : `blur(${blurIntensity}px)`,
        scale: isHovered ? 1.05 : 1,
      };
    }

    const charElement = containerRef.current.children[charIndex] as HTMLElement;
    if (!charElement) {
      return {
        filter: `blur(${blurIntensity}px)`,
        scale: 1,
      };
    }

    const charRect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
    const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charCenterX, 2) + 
      Math.pow(mousePosition.y - charCenterY, 2)
    );

    const isInFocus = distance <= focusRadius;
    const focusStrength = isInFocus ? Math.max(0, 1 - distance / focusRadius) : 0;
    
    const blur = blurIntensity * (1 - focusStrength);
    const brightness = 1 + (focusIntensity - 1) * focusStrength;
    const scale = 1 + (0.1 * focusStrength);

    return {
      filter: `blur(${blur}px) brightness(${brightness})`,
      scale: scale,
    };
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        minHeight: '60px',
        padding: '20px',
      }}
    >
      {characters.map((char, index) => {
        const effects = getCharacterEffect(index);
        
        return (
          <motion.span
            key={index}
            className="inline-block font-bold text-2xl"
            animate={effects}
            transition={{
              duration: transitionSpeed,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: 'center',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
      
      {/* Focus indicator */}
      {followMouse && isHovered && (
        <motion.div
          className="absolute pointer-events-none border-2 border-blue-400 rounded-full opacity-30"
          style={{
            left: mousePosition.x - focusRadius,
            top: mousePosition.y - focusRadius,
            width: focusRadius * 2,
            height: focusRadius * 2,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </div>
  );
}
