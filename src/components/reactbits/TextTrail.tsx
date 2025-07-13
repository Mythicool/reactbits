'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface TextTrailProps {
  text: string;
  trailLength: number;
  trailOpacity: number;
  trailColor: string;
  followMouse: boolean;
  trailDelay: number;
  className?: string;
}

export function TextTrail({
  text,
  trailLength,
  trailOpacity,
  trailColor,
  followMouse,
  trailDelay,
  className = '',
}: TextTrailProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{x: number, y: number, id: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setMousePosition(newPosition);

    // Add new trail point
    const newTrail = {
      x: newPosition.x,
      y: newPosition.y,
      id: trailIdRef.current++,
    };

    setTrails(prev => {
      const updated = [newTrail, ...prev];
      return updated.slice(0, trailLength);
    });

    // Remove trail points after delay
    setTimeout(() => {
      setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
    }, trailDelay * 1000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      style={{ minHeight: '100px', minWidth: '200px' }}
    >
      {/* Main text */}
      <motion.div
        className="relative z-10 font-bold text-2xl"
        animate={followMouse ? {
          x: mousePosition.x - 100,
          y: mousePosition.y - 20,
        } : {}}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {text}
      </motion.div>

      {/* Trail elements */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute font-bold text-2xl pointer-events-none"
          style={{
            left: trail.x - 100,
            top: trail.y - 20,
            color: trailColor,
            opacity: trailOpacity * (1 - index / trailLength),
            zIndex: 10 - index,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0.8 - (index * 0.1) }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: trailDelay,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.div>
      ))}

      {/* Static trails for non-mouse mode */}
      {!followMouse && Array.from({ length: trailLength }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute font-bold text-2xl"
          style={{
            color: trailColor,
            opacity: trailOpacity * (1 - index / trailLength),
            zIndex: 10 - index,
          }}
          animate={{
            x: index * 3,
            y: index * 2,
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}
