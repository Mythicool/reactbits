'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PixelTransitionProps {
  content: string;
  pixelSize: number;
  gridWidth: number;
  gridHeight: number;
  transitionSpeed: number;
  colors: string[];
  pattern: 'random' | 'wave' | 'spiral' | 'diagonal';
  autoPlay: boolean;
  className?: string;
}

export function PixelTransition({
  content,
  pixelSize,
  gridWidth,
  gridHeight,
  transitionSpeed,
  colors,
  pattern,
  autoPlay,
  className = '',
}: PixelTransitionProps) {
  const [pixels, setPixels] = useState<string[][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPixels = gridWidth * gridHeight;

  const initializePixels = () => {
    const newPixels: string[][] = [];
    for (let y = 0; y < gridHeight; y++) {
      const row: string[] = [];
      for (let x = 0; x < gridWidth; x++) {
        row.push(colors[0] || '#000000');
      }
      newPixels.push(row);
    }
    setPixels(newPixels);
  };

  const getAnimationOrder = () => {
    const positions: {x: number, y: number}[] = [];
    
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        positions.push({ x, y });
      }
    }

    switch (pattern) {
      case 'random':
        return positions.sort(() => Math.random() - 0.5);
      case 'wave':
        return positions.sort((a, b) => (a.x + a.y * 0.5) - (b.x + b.y * 0.5));
      case 'spiral':
        return positions.sort((a, b) => {
          const centerX = gridWidth / 2;
          const centerY = gridHeight / 2;
          const distA = Math.sqrt((a.x - centerX) ** 2 + (a.y - centerY) ** 2);
          const distB = Math.sqrt((b.x - centerX) ** 2 + (b.y - centerY) ** 2);
          return distA - distB;
        });
      case 'diagonal':
        return positions.sort((a, b) => (a.x + a.y) - (b.x + b.y));
      default:
        return positions;
    }
  };

  const animateTransition = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const animationOrder = getAnimationOrder();
    
    animationOrder.forEach((pos, index) => {
      setTimeout(() => {
        setPixels(prev => {
          const newPixels = [...prev];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          newPixels[pos.y][pos.x] = randomColor;
          return newPixels;
        });
        
        if (index === animationOrder.length - 1) {
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, index * transitionSpeed);
    });
  };

  useEffect(() => {
    initializePixels();
  }, [gridWidth, gridHeight, colors]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(animateTransition, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, transitionSpeed, pattern]);

  return (
    <div className={`inline-block ${className}`}>
      <div className="relative">
        {/* Pixel Grid */}
        <div 
          className="grid gap-1 p-4 bg-black rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${gridWidth}, ${pixelSize}px)`,
            gridTemplateRows: `repeat(${gridHeight}, ${pixelSize}px)`,
          }}
        >
          {pixels.map((row, y) =>
            row.map((color, x) => (
              <motion.div
                key={`${x}-${y}`}
                className="rounded-sm"
                style={{
                  backgroundColor: color,
                  width: pixelSize,
                  height: pixelSize,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              />
            ))
          )}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white font-bold text-lg mix-blend-difference">
            {content}
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={animateTransition}
          disabled={isAnimating}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isAnimating ? 'Animating...' : 'Animate Pixels'}
        </button>
      </div>
    </div>
  );
}
