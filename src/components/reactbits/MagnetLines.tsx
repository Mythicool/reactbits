'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface MagnetLinesProps {
  lineCount: number;
  lineColor: string;
  lineWidth: number;
  magnetStrength: number;
  animationSpeed: number;
  pattern: 'radial' | 'grid' | 'spiral' | 'wave';
  interactive: boolean;
  className?: string;
}

export function MagnetLines({
  lineCount,
  lineColor,
  lineWidth,
  magnetStrength,
  animationSpeed,
  pattern,
  interactive,
  className = '',
}: MagnetLinesProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState<{x1: number, y1: number, x2: number, y2: number, id: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const containerSize = 400;

  const generateLines = () => {
    const newLines: {x1: number, y1: number, x2: number, y2: number, id: number}[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      let line;
      
      switch (pattern) {
        case 'radial':
          const angle = (i / lineCount) * Math.PI * 2;
          const radius = containerSize / 3;
          line = {
            x1: containerSize / 2,
            y1: containerSize / 2,
            x2: containerSize / 2 + Math.cos(angle) * radius,
            y2: containerSize / 2 + Math.sin(angle) * radius,
            id: i,
          };
          break;
          
        case 'grid':
          const cols = Math.ceil(Math.sqrt(lineCount));
          const spacing = containerSize / cols;
          const row = Math.floor(i / cols);
          const col = i % cols;
          line = {
            x1: col * spacing,
            y1: row * spacing,
            x2: (col + 1) * spacing,
            y2: (row + 1) * spacing,
            id: i,
          };
          break;
          
        case 'spiral':
          const spiralAngle = (i / lineCount) * Math.PI * 8;
          const spiralRadius = (i / lineCount) * containerSize / 3;
          const centerX = containerSize / 2;
          const centerY = containerSize / 2;
          line = {
            x1: centerX + Math.cos(spiralAngle) * spiralRadius,
            y1: centerY + Math.sin(spiralAngle) * spiralRadius,
            x2: centerX + Math.cos(spiralAngle + 0.5) * (spiralRadius + 20),
            y2: centerY + Math.sin(spiralAngle + 0.5) * (spiralRadius + 20),
            id: i,
          };
          break;
          
        case 'wave':
          const waveX = (i / lineCount) * containerSize;
          const waveY = containerSize / 2 + Math.sin((i / lineCount) * Math.PI * 4) * 50;
          line = {
            x1: waveX,
            y1: waveY,
            x2: waveX + 20,
            y2: waveY + Math.cos((i / lineCount) * Math.PI * 4) * 20,
            id: i,
          };
          break;
          
        default:
          line = {
            x1: Math.random() * containerSize,
            y1: Math.random() * containerSize,
            x2: Math.random() * containerSize,
            y2: Math.random() * containerSize,
            id: i,
          };
      }
      
      newLines.push(line);
    }
    
    setLines(newLines);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !interactive) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getLineTransform = (line: {x1: number, y1: number, x2: number, y2: number}) => {
    if (!interactive) return { x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2 };

    const distance1 = Math.sqrt((mousePosition.x - line.x1) ** 2 + (mousePosition.y - line.y1) ** 2);
    const distance2 = Math.sqrt((mousePosition.x - line.x2) ** 2 + (mousePosition.y - line.y2) ** 2);
    
    const maxDistance = 100;
    const strength1 = Math.max(0, 1 - distance1 / maxDistance) * magnetStrength;
    const strength2 = Math.max(0, 1 - distance2 / maxDistance) * magnetStrength;
    
    const angle1 = Math.atan2(mousePosition.y - line.y1, mousePosition.x - line.x1);
    const angle2 = Math.atan2(mousePosition.y - line.y2, mousePosition.x - line.x2);
    
    return {
      x1: line.x1 + Math.cos(angle1) * strength1,
      y1: line.y1 + Math.sin(angle1) * strength1,
      x2: line.x2 + Math.cos(angle2) * strength2,
      y2: line.y2 + Math.sin(angle2) * strength2,
    };
  };

  useEffect(() => {
    generateLines();
  }, [lineCount, pattern]);

  useEffect(() => {
    if (!interactive) return;

    const animate = () => {
      // Auto-animation when not interactive
      animationRef.current = requestAnimationFrame(animate);
    };

    if (animationSpeed > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationSpeed, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      style={{ width: containerSize, height: containerSize }}
    >
      <svg
        width={containerSize}
        height={containerSize}
        className="absolute inset-0"
      >
        {lines.map((line) => {
          const transform = getLineTransform(line);
          
          return (
            <motion.line
              key={line.id}
              x1={transform.x1}
              y1={transform.y1}
              x2={transform.x2}
              y2={transform.y2}
              stroke={lineColor}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: animationSpeed,
                delay: line.id * 0.05,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
      
      {interactive && (
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400">
          Move mouse to attract lines
        </div>
      )}
    </div>
  );
}
