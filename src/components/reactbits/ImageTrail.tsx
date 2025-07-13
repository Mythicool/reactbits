'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface ImageTrailProps {
  imageUrl: string;
  trailLength: number;
  imageSize: number;
  fadeSpeed: number;
  rotationVariation: number;
  scaleVariation: number;
  followMouse: boolean;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
  className?: string;
}

interface TrailImage {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  timestamp: number;
}

export function ImageTrail({
  imageUrl,
  trailLength,
  imageSize,
  fadeSpeed,
  rotationVariation,
  scaleVariation,
  followMouse,
  blendMode,
  className = '',
}: ImageTrailProps) {
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageIdRef = useRef(0);

  const addTrailImage = (x: number, y: number) => {
    const rotation = (Math.random() - 0.5) * rotationVariation;
    const scale = 1 + (Math.random() - 0.5) * (scaleVariation / 100);
    
    const newImage: TrailImage = {
      id: imageIdRef.current++,
      x,
      y,
      rotation,
      scale,
      timestamp: Date.now(),
    };

    setTrail(prev => {
      const updated = [newImage, ...prev];
      return updated.slice(0, trailLength);
    });

    // Remove image after fade duration
    setTimeout(() => {
      setTrail(prev => prev.filter(img => img.id !== newImage.id));
    }, fadeSpeed * 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add trail image with some throttling
    if (trail.length === 0 || Date.now() - trail[0].timestamp > 50) {
      addTrailImage(x, y);
    }
  };

  const getImageOpacity = (image: TrailImage) => {
    const age = (Date.now() - image.timestamp) / 1000;
    return Math.max(0, 1 - age / fadeSpeed);
  };

  // Default placeholder image if no URL provided
  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23ff6b6b' stroke='%23fff' stroke-width='2'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-family='Arial' font-size='16' font-weight='bold'%3E★%3C/text%3E%3C/svg%3E";

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden ${followMouse ? 'cursor-none' : 'cursor-default'} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Instructions */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-gray-600 dark:text-gray-300 text-center">
          <div className="text-2xl font-bold mb-2">Image Trail</div>
          <div className="text-sm opacity-80">
            {followMouse ? 'Move mouse to create image trail' : 'Static trail display'}
          </div>
        </div>
      </div>

      {/* Trail Images */}
      <AnimatePresence>
        {trail.map((image) => {
          const opacity = getImageOpacity(image);
          
          return (
            <motion.div
              key={image.id}
              className="absolute pointer-events-none"
              style={{
                left: image.x - imageSize / 2,
                top: image.y - imageSize / 2,
                mixBlendMode: blendMode,
              }}
              initial={{ 
                scale: 0,
                opacity: 1,
                rotate: image.rotation,
              }}
              animate={{ 
                scale: image.scale,
                opacity,
                rotate: image.rotation,
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <img
                src={imageUrl || defaultImage}
                alt="Trail"
                width={imageSize}
                height={imageSize}
                className="w-full h-full object-cover rounded-lg"
                style={{
                  filter: `brightness(${0.5 + opacity * 0.5})`,
                }}
                onError={(e) => {
                  // Fallback to default image on error
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Current mouse cursor replacement */}
      {followMouse && (
        <motion.div
          className="absolute pointer-events-none z-10"
          style={{
            left: trail[0]?.x || 200,
            top: trail[0]?.y || 200,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={imageUrl || defaultImage}
            alt="Cursor"
            width={imageSize * 1.2}
            height={imageSize * 1.2}
            className="w-full h-full object-cover rounded-lg border-2 border-white shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImage;
            }}
          />
        </motion.div>
      )}

      {/* Trail info */}
      <div className="absolute bottom-4 left-4 text-gray-600 dark:text-gray-300 text-sm opacity-70">
        Trail Length: {trail.length}/{trailLength}
      </div>

      {/* Blend mode indicator */}
      <div className="absolute bottom-4 right-4 text-gray-600 dark:text-gray-300 text-sm opacity-70">
        Blend: {blendMode}
      </div>

      {/* Image URL display */}
      {imageUrl && (
        <div className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-xs opacity-70 max-w-48 truncate">
          {imageUrl}
        </div>
      )}
    </div>
  );
}
