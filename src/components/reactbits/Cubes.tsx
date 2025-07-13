'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CubesProps {
  cubeCount: number;
  cubeSize: number;
  rotationSpeed: number;
  scaleVariation: number;
  colorTransition: boolean;
  colors: string[];
  arrangement: 'grid' | 'spiral' | 'random' | 'wave';
  animationDelay: number;
  className?: string;
}

interface Cube {
  id: number;
  x: number;
  y: number;
  z: number;
  color: string;
  delay: number;
}

export function Cubes({
  cubeCount,
  cubeSize,
  rotationSpeed,
  scaleVariation,
  colorTransition,
  colors,
  arrangement,
  animationDelay,
  className = '',
}: CubesProps) {
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const generateCubes = () => {
    const newCubes: Cube[] = [];
    const containerSize = 400;
    
    for (let i = 0; i < cubeCount; i++) {
      let x, y, z;
      
      switch (arrangement) {
        case 'grid':
          const cols = Math.ceil(Math.sqrt(cubeCount));
          const spacing = containerSize / cols;
          const row = Math.floor(i / cols);
          const col = i % cols;
          x = col * spacing + spacing / 2;
          y = row * spacing + spacing / 2;
          z = 0;
          break;
          
        case 'spiral':
          const angle = (i / cubeCount) * Math.PI * 8;
          const radius = (i / cubeCount) * containerSize / 3;
          x = containerSize / 2 + Math.cos(angle) * radius;
          y = containerSize / 2 + Math.sin(angle) * radius;
          z = i * 5;
          break;
          
        case 'wave':
          x = (i / cubeCount) * containerSize;
          y = containerSize / 2 + Math.sin((i / cubeCount) * Math.PI * 4) * 100;
          z = Math.cos((i / cubeCount) * Math.PI * 4) * 50;
          break;
          
        case 'random':
        default:
          x = Math.random() * containerSize;
          y = Math.random() * containerSize;
          z = Math.random() * 200 - 100;
          break;
      }
      
      const color = colors[i % colors.length];
      const delay = i * animationDelay;
      
      newCubes.push({
        id: i,
        x,
        y,
        z,
        color,
        delay,
      });
    }
    
    setCubes(newCubes);
  };

  useEffect(() => {
    generateCubes();
  }, [cubeCount, arrangement, colors, animationDelay]);

  useEffect(() => {
    if (!colorTransition) return;

    const interval = setInterval(() => {
      setCurrentColorIndex(prev => (prev + 1) % colors.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [colorTransition, colors]);

  const getCubeStyle = (cube: Cube, index: number) => {
    const baseColor = colorTransition ? colors[currentColorIndex] : cube.color;
    const scale = 1 + (Math.sin(index * 0.5) * scaleVariation / 100);
    
    return {
      width: cubeSize,
      height: cubeSize,
      backgroundColor: baseColor,
      transform: `translateZ(${cube.z}px) scale(${scale})`,
      boxShadow: `
        inset -${cubeSize/4}px -${cubeSize/4}px 0 rgba(0,0,0,0.3),
        inset ${cubeSize/4}px ${cubeSize/4}px 0 rgba(255,255,255,0.2),
        0 0 ${cubeSize/2}px rgba(0,0,0,0.5)
      `,
    };
  };

  return (
    <div
      className={`relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Container for 3D space */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {cubes.map((cube, index) => (
          <motion.div
            key={cube.id}
            className="absolute"
            style={{
              left: cube.x - cubeSize / 2,
              top: cube.y - cubeSize / 2,
              transformStyle: 'preserve-3d',
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 360,
              rotateY: 360,
              rotateZ: 180,
            }}
            transition={{
              duration: rotationSpeed,
              delay: cube.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Cube faces */}
            <div
              className="absolute"
              style={{
                ...getCubeStyle(cube, index),
                transform: `rotateY(0deg) translateZ(${cubeSize/2}px)`,
              }}
            />
            <div
              className="absolute"
              style={{
                ...getCubeStyle(cube, index),
                transform: `rotateY(90deg) translateZ(${cubeSize/2}px)`,
                filter: 'brightness(0.8)',
              }}
            />
            <div
              className="absolute"
              style={{
                ...getCubeStyle(cube, index),
                transform: `rotateY(180deg) translateZ(${cubeSize/2}px)`,
                filter: 'brightness(0.6)',
              }}
            />
            <div
              className="absolute"
              style={{
                ...getCubeStyle(cube, index),
                transform: `rotateY(-90deg) translateZ(${cubeSize/2}px)`,
                filter: 'brightness(0.7)',
              }}
            />
            <div
              className="absolute"
              style={{
                ...getCubeStyle(cube, index),
                transform: `rotateX(90deg) translateZ(${cubeSize/2}px)`,
                filter: 'brightness(0.9)',
              }}
            />
            <div
              className="absolute"
              style={{
                ...getCubeStyle(cube, index),
                transform: `rotateX(-90deg) translateZ(${cubeSize/2}px)`,
                filter: 'brightness(0.5)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 text-white text-sm opacity-70">
        Cubes: {cubes.length} | Pattern: {arrangement}
      </div>
    </div>
  );
}
