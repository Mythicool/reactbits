'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface VariableProximityProps {
  text: string;
  proximityRadius: number;
  maxScale: number;
  maxRotation: number;
  colorShift: boolean;
  magneticEffect: boolean;
  rippleEffect: boolean;
  className?: string;
}

export function VariableProximity({
  text,
  proximityRadius,
  maxScale,
  maxRotation,
  colorShift,
  magneticEffect,
  rippleEffect,
  className = '',
}: VariableProximityProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!rippleEffect || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: rippleIdRef.current++,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const characters = text.split('');

  const getCharacterEffects = (charIndex: number) => {
    if (!containerRef.current) return { scale: 1, rotate: 0, color: 'inherit', x: 0, y: 0 };

    const charElement = containerRef.current.children[charIndex] as HTMLElement;
    if (!charElement) return { scale: 1, rotate: 0, color: 'inherit', x: 0, y: 0 };

    const charRect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
    const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charCenterX, 2) + 
      Math.pow(mousePosition.y - charCenterY, 2)
    );

    const proximity = Math.max(0, 1 - distance / proximityRadius);
    
    // Scale effect
    const scale = 1 + (maxScale - 1) * proximity;
    
    // Rotation effect
    const angle = Math.atan2(mousePosition.y - charCenterY, mousePosition.x - charCenterX);
    const rotate = maxRotation * proximity * Math.sin(angle * 2);
    
    // Color shift effect
    const hue = colorShift ? (proximity * 360 + charIndex * 30) % 360 : 0;
    const color = colorShift ? `hsl(${hue}, 70%, 50%)` : 'inherit';
    
    // Magnetic effect
    const magneticStrength = magneticEffect ? proximity * 10 : 0;
    const x = magneticEffect ? Math.cos(angle) * magneticStrength : 0;
    const y = magneticEffect ? Math.sin(angle) * magneticStrength : 0;

    return { scale, rotate, color, x, y };
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ 
        minHeight: '100px',
        padding: '40px',
      }}
    >
      {characters.map((char, index) => {
        const effects = getCharacterEffects(index);
        
        return (
          <motion.span
            key={index}
            className="inline-block font-bold text-3xl"
            animate={{
              scale: effects.scale,
              rotate: effects.rotate,
              color: effects.color,
              x: effects.x,
              y: effects.y,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            style={{
              transformOrigin: 'center',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}

      {/* Proximity indicator */}
      <motion.div
        className="absolute pointer-events-none border-2 border-blue-400/30 rounded-full"
        style={{
          left: mousePosition.x - proximityRadius,
          top: mousePosition.y - proximityRadius,
          width: proximityRadius * 2,
          height: proximityRadius * 2,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        exit={{ scale: 0, opacity: 0 }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none border-2 border-blue-500 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
