'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  glareColor: string;
  glareOpacity: number;
  glareSize: number;
  rotationIntensity: number;
  scaleOnHover: number;
  borderRadius: number;
  className?: string;
}

export function GlareHover({
  children,
  glareColor,
  glareOpacity,
  glareSize,
  rotationIntensity,
  scaleOnHover,
  borderRadius,
  className = '',
}: GlareHoverProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getRotation = () => {
    if (!containerRef.current) return { rotateX: 0, rotateY: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((mousePosition.y - centerY) / centerY) * rotationIntensity;
    const rotateY = ((mousePosition.x - centerX) / centerX) * rotationIntensity;
    
    return { rotateX: -rotateX, rotateY };
  };

  const getGlarePosition = () => {
    if (!containerRef.current) return { x: '50%', y: '50%' };

    const rect = containerRef.current.getBoundingClientRect();
    const x = (mousePosition.x / rect.width) * 100;
    const y = (mousePosition.y / rect.height) * 100;
    
    return { x: `${x}%`, y: `${y}%` };
  };

  const rotation = getRotation();
  const glarePosition = getGlarePosition();

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
        rotateX: isHovered ? rotation.rotateX : 0,
        rotateY: isHovered ? rotation.rotateY : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glare Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x} ${glarePosition.y}, ${glareColor} 0%, transparent ${glareSize}%)`,
          opacity: isHovered ? glareOpacity : 0,
          borderRadius: `${borderRadius}px`,
        }}
        animate={{
          opacity: isHovered ? glareOpacity : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Reflection Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          opacity: isHovered ? 0.3 : 0,
          borderRadius: `${borderRadius}px`,
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Border Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `2px solid ${glareColor}`,
          borderRadius: `${borderRadius}px`,
          opacity: isHovered ? 0.5 : 0,
          boxShadow: `0 0 20px ${glareColor}`,
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}
