'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface NoiseProps {
  intensity: number;
  speed: number;
  scale: number;
  colors: string[];
  noiseType: 'perlin' | 'simplex' | 'random' | 'grain';
  animated: boolean;
  opacity: number;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
  className?: string;
}

export function Noise({
  intensity,
  speed,
  scale,
  colors,
  noiseType,
  animated,
  opacity,
  blendMode,
  className = '',
}: NoiseProps) {
  const [noiseData, setNoiseData] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const generateNoise = (time: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4;
        let noiseValue = 0;

        switch (noiseType) {
          case 'perlin':
            noiseValue = perlinNoise(x / scale, y / scale, time);
            break;
          case 'simplex':
            noiseValue = simplexNoise(x / scale, y / scale, time);
            break;
          case 'random':
            noiseValue = Math.random();
            break;
          case 'grain':
            noiseValue = grainNoise(x, y, time);
            break;
        }

        // Apply intensity
        noiseValue = Math.pow(noiseValue, 1 / intensity);

        // Color selection based on noise value
        const colorIndex = Math.floor(noiseValue * colors.length);
        const color = hexToRgb(colors[colorIndex] || colors[0]);

        data[index] = color.r;     // Red
        data[index + 1] = color.g; // Green
        data[index + 2] = color.b; // Blue
        data[index + 3] = 255 * opacity; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setNoiseData(imageData);
  };

  // Simple Perlin-like noise function
  const perlinNoise = (x: number, y: number, time: number) => {
    const n = Math.sin(x * 0.1 + time * 0.01) * Math.cos(y * 0.1 + time * 0.01);
    return (n + 1) / 2; // Normalize to 0-1
  };

  // Simple Simplex-like noise function
  const simplexNoise = (x: number, y: number, time: number) => {
    const n1 = Math.sin(x * 0.05 + time * 0.02) * Math.sin(y * 0.05);
    const n2 = Math.cos(x * 0.03 + time * 0.015) * Math.cos(y * 0.03);
    return Math.abs(n1 + n2) / 2;
  };

  // Grain noise function
  const grainNoise = (x: number, y: number, time: number) => {
    const seed = x * 12.9898 + y * 78.233 + time * 0.1;
    return Math.abs(Math.sin(seed) * 43758.5453) % 1;
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    if (animated) {
      const animate = () => {
        timeRef.current += speed;
        generateNoise(timeRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      generateNoise();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, speed, scale, colors, noiseType, animated, opacity]);

  return (
    <div className={`relative w-full h-96 bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Noise Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: blendMode,
          imageRendering: 'pixelated',
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-white text-center mix-blend-difference"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-2xl font-bold mb-2">Noise Effect</div>
          <div className="text-sm opacity-80">
            Type: {noiseType} | {animated ? 'Animated' : 'Static'}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70">
        Intensity: {intensity} | Scale: {scale}
      </div>

      <div className="absolute bottom-4 right-4 text-white text-xs opacity-70">
        Blend: {blendMode}
      </div>
    </div>
  );
}
