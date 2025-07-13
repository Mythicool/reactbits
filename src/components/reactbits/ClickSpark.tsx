'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ClickSparkProps {
  particleCount: number;
  colors: string[];
  spreadRadius: number;
  duration: number;
  particleSize: number;
  sparkType: 'circle' | 'star' | 'square' | 'triangle';
  gravity: boolean;
  className?: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
}

export function ClickSpark({
  particleCount,
  colors,
  spreadRadius,
  duration,
  particleSize,
  sparkType,
  gravity,
  className = '',
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [sparkId, setSparkId] = useState(0);

  const createSparks = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newSparks: Spark[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const velocity = Math.random() * spreadRadius + spreadRadius * 0.3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newSparks.push({
        id: sparkId + i,
        x: clickX,
        y: clickY,
        color,
        angle,
        velocity,
      });
    }

    setSparks(prev => [...prev, ...newSparks]);
    setSparkId(prev => prev + particleCount);

    // Remove sparks after animation
    setTimeout(() => {
      setSparks(prev => prev.filter(spark => !newSparks.some(newSpark => newSpark.id === spark.id)));
    }, duration * 1000);
  };

  const getSparkShape = (color: string) => {
    const size = particleSize;
    
    switch (sparkType) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'star':
        return (
          <div
            className="relative"
            style={{
              width: size,
              height: size,
              color: color,
            }}
          >
            ⭐
          </div>
        );
      case 'square':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      default:
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
    }
  };

  return (
    <div
      className={`relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg cursor-pointer overflow-hidden ${className}`}
      onClick={createSparks}
    >
      {/* Instructions */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2">Click Spark</div>
          <div className="text-gray-300">Click anywhere to create sparks!</div>
        </div>
      </div>

      {/* Sparks */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute pointer-events-none"
            style={{
              left: spark.x,
              top: spark.y,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: Math.cos(spark.angle) * spark.velocity,
              y: Math.sin(spark.angle) * spark.velocity + (gravity ? 50 : 0),
              scale: [0, 1, 0.8, 0],
              opacity: [1, 1, 0.5, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: duration,
              ease: "easeOut",
              times: [0, 0.2, 0.8, 1],
            }}
          >
            {getSparkShape(spark.color)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click indicator */}
      <div className="absolute bottom-4 left-4 text-white text-sm opacity-70">
        Particles: {sparks.length} | Click to add more!
      </div>
    </div>
  );
}
