'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface PixelTrailProps {
  trailLength: number;
  pixelSize: number;
  fadeSpeed: number;
  colors: string[];
  followMouse: boolean;
  autoAnimate: boolean;
  trailShape: 'square' | 'circle' | 'diamond';
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
  className?: string;
}

interface TrailPixel {
  id: number;
  x: number;
  y: number;
  color: string;
  timestamp: number;
}

export function PixelTrail({
  trailLength,
  pixelSize,
  fadeSpeed,
  colors,
  followMouse,
  autoAnimate,
  trailShape,
  blendMode,
  className = '',
}: PixelTrailProps) {
  const [trail, setTrail] = useState<TrailPixel[]>([]);
  const [autoPosition, setAutoPosition] = useState({ x: 200, y: 200 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelIdRef = useRef(0);
  const autoAnimationRef = useRef<number>();

  const addPixel = (x: number, y: number) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const newPixel: TrailPixel = {
      id: pixelIdRef.current++,
      x,
      y,
      color,
      timestamp: Date.now(),
    };

    setTrail(prev => {
      const updated = [newPixel, ...prev];
      return updated.slice(0, trailLength);
    });

    // Remove pixel after fade duration
    setTimeout(() => {
      setTrail(prev => prev.filter(pixel => pixel.id !== newPixel.id));
    }, fadeSpeed * 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addPixel(x, y);
  };

  // Auto animation
  React.useEffect(() => {
    if (!autoAnimate) return;

    const animate = () => {
      const time = Date.now() * 0.001;
      const x = 200 + Math.sin(time) * 150;
      const y = 200 + Math.cos(time * 0.7) * 100;
      
      setAutoPosition({ x, y });
      addPixel(x, y);
      
      autoAnimationRef.current = requestAnimationFrame(animate);
    };

    if (autoAnimate) {
      animate();
    }

    return () => {
      if (autoAnimationRef.current) {
        cancelAnimationFrame(autoAnimationRef.current);
      }
    };
  }, [autoAnimate, trailLength, colors]);

  const getPixelShape = (pixel: TrailPixel, opacity: number) => {
    const style = {
      width: pixelSize,
      height: pixelSize,
      backgroundColor: pixel.color,
      opacity,
      mixBlendMode: blendMode as any,
    };

    switch (trailShape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={style}
          />
        );
      case 'diamond':
        return (
          <div
            className="transform rotate-45"
            style={style}
          />
        );
      case 'square':
      default:
        return (
          <div style={style} />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 bg-black rounded-lg overflow-hidden cursor-crosshair ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Instructions */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2">Pixel Trail</div>
          <div className="text-gray-300">
            {followMouse ? 'Move mouse to create trail' : 'Watch the auto animation'}
          </div>
        </div>
      </div>

      {/* Auto animation cursor */}
      {autoAnimate && (
        <motion.div
          className="absolute w-4 h-4 border-2 border-white rounded-full pointer-events-none"
          style={{
            left: autoPosition.x - 8,
            top: autoPosition.y - 8,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}

      {/* Trail pixels */}
      <AnimatePresence>
        {trail.map((pixel, index) => {
          const age = (Date.now() - pixel.timestamp) / 1000;
          const opacity = Math.max(0, 1 - age / fadeSpeed);
          
          return (
            <motion.div
              key={pixel.id}
              className="absolute pointer-events-none"
              style={{
                left: pixel.x - pixelSize / 2,
                top: pixel.y - pixelSize / 2,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            >
              {getPixelShape(pixel, opacity)}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Trail info */}
      <div className="absolute bottom-4 left-4 text-white text-sm opacity-70">
        Trail Length: {trail.length}/{trailLength}
      </div>

      {/* Blend mode indicator */}
      <div className="absolute bottom-4 right-4 text-white text-sm opacity-70">
        Blend: {blendMode}
      </div>
    </div>
  );
}
