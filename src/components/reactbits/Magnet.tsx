'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  attractionStrength: number;
  attractionRadius: number;
  returnSpeed: number;
  rotationIntensity: number;
  scaleIntensity: number;
  magneticField: boolean;
  className?: string;
}

export function Magnet({
  children,
  attractionStrength,
  attractionRadius,
  returnSpeed,
  rotationIntensity,
  scaleIntensity,
  magneticField,
  className = '',
}: MagnetProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    if (distance <= attractionRadius) {
      const attraction = Math.max(0, 1 - distance / attractionRadius);
      const deltaX = (mouseX - centerX) * attraction * attractionStrength;
      const deltaY = (mouseY - centerY) * attraction * attractionStrength;
      
      setMousePosition({ x: deltaX, y: deltaY });
      setIsHovered(true);
    } else {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const getRotation = () => {
    if (!isHovered) return 0;
    const angle = Math.atan2(mousePosition.y, mousePosition.x);
    return (angle * 180 / Math.PI) * (rotationIntensity / 100);
  };

  const getScale = () => {
    if (!isHovered) return 1;
    const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
    const normalizedDistance = distance / attractionStrength;
    return 1 + (normalizedDistance * scaleIntensity / 100);
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: attractionRadius,
      }}
    >
      {/* Magnetic field visualization */}
      {magneticField && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Field rings */}
          {[0.3, 0.6, 1].map((scale, index) => (
            <motion.div
              key={index}
              className="absolute border border-blue-400/20 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                width: attractionRadius * 2 * scale,
                height: attractionRadius * 2 * scale,
                marginLeft: -attractionRadius * scale,
                marginTop: -attractionRadius * scale,
              }}
              animate={{
                opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
                scale: isHovered ? [0.95, 1.05, 0.95] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
          ))}
          
          {/* Center indicator */}
          <motion.div
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: -4,
              marginTop: -4,
            }}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </div>
      )}

      {/* Magnetic element */}
      <motion.div
        ref={elementRef}
        className="relative z-10"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          rotate: getRotation(),
          scale: getScale(),
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: returnSpeed,
          mass: 0.8,
        }}
      >
        {children}
      </motion.div>

      {/* Attraction indicator */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none text-xs text-blue-500 font-mono"
          style={{
            left: '50%',
            bottom: -30,
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Attraction: {Math.round(Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2))}px
        </motion.div>
      )}
    </div>
  );
}
