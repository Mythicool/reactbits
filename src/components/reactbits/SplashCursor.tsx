'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface SplashCursorProps {
  splashSize: number;
  splashCount: number;
  colors: string[];
  splashDuration: number;
  splashType: 'circle' | 'square' | 'star' | 'heart' | 'drop';
  followMouse: boolean;
  autoSplash: boolean;
  gravity: boolean;
  className?: string;
}

interface Splash {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  timestamp: number;
}

export function SplashCursor({
  splashSize,
  splashCount,
  colors,
  splashDuration,
  splashType,
  followMouse,
  autoSplash,
  gravity,
  className = '',
}: SplashCursorProps) {
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });
  const containerRef = useRef<HTMLDivElement>(null);
  const splashIdRef = useRef(0);
  const lastSplashTime = useRef(0);

  const createSplash = (x: number, y: number) => {
    const now = Date.now();
    
    // Throttle splash creation
    if (now - lastSplashTime.current < 100) return;
    lastSplashTime.current = now;

    const newSplashes: Splash[] = [];
    
    for (let i = 0; i < splashCount; i++) {
      const angle = (Math.PI * 2 * i) / splashCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 100 + 50;
      const size = splashSize * (0.5 + Math.random() * 0.5);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newSplashes.push({
        id: splashIdRef.current++,
        x,
        y,
        color,
        size,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        timestamp: now,
      });
    }

    setSplashes(prev => [...prev, ...newSplashes]);

    // Remove splashes after duration
    setTimeout(() => {
      setSplashes(prev => prev.filter(splash => 
        !newSplashes.some(newSplash => newSplash.id === splash.id)
      ));
    }, splashDuration * 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });

    if (followMouse && autoSplash) {
      createSplash(x, y);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createSplash(x, y);
  };

  const getSplashShape = (splash: Splash) => {
    const baseStyle = {
      width: splash.size,
      height: splash.size,
      backgroundColor: splash.color,
    };

    switch (splashType) {
      case 'circle':
        return <div className="rounded-full" style={baseStyle} />;
      
      case 'square':
        return <div style={baseStyle} />;
      
      case 'star':
        return (
          <div 
            className="flex items-center justify-center text-yellow-400"
            style={{ fontSize: splash.size }}
          >
            ⭐
          </div>
        );
      
      case 'heart':
        return (
          <div 
            className="flex items-center justify-center text-red-500"
            style={{ fontSize: splash.size }}
          >
            ❤️
          </div>
        );
      
      case 'drop':
        return (
          <div
            className="rounded-full"
            style={{
              ...baseStyle,
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
            }}
          />
        );
      
      default:
        return <div className="rounded-full" style={baseStyle} />;
    }
  };

  const getSplashPosition = (splash: Splash) => {
    const age = (Date.now() - splash.timestamp) / 1000;
    const gravityEffect = gravity ? age * age * 200 : 0;
    
    return {
      x: splash.x + splash.velocity.x * age,
      y: splash.y + splash.velocity.y * age + gravityEffect,
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-lg overflow-hidden cursor-none ${className}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Instructions */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2">Splash Cursor</div>
          <div className="text-sm opacity-80">
            {autoSplash ? 'Move mouse for auto splash' : 'Click to create splash'}
          </div>
        </div>
      </div>

      {/* Splashes */}
      <AnimatePresence>
        {splashes.map((splash) => {
          const position = getSplashPosition(splash);
          const age = (Date.now() - splash.timestamp) / 1000;
          const opacity = Math.max(0, 1 - age / splashDuration);
          
          return (
            <motion.div
              key={splash.id}
              className="absolute pointer-events-none"
              style={{
                left: position.x - splash.size / 2,
                top: position.y - splash.size / 2,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: opacity,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {getSplashShape(splash)}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Custom cursor */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-5 h-5 border-2 border-white rounded-full bg-white/20" />
      </motion.div>

      {/* Splash info */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70">
        Active Splashes: {splashes.length} | Type: {splashType}
      </div>

      {/* Settings info */}
      <div className="absolute bottom-4 right-4 text-white text-xs opacity-70">
        {gravity ? 'Gravity: ON' : 'Gravity: OFF'} | Auto: {autoSplash ? 'ON' : 'OFF'}
      </div>
    </div>
  );
}
