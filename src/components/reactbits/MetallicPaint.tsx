'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface MetallicPaintProps {
  baseColor: string;
  highlightColor: string;
  reflectionIntensity: number;
  flowSpeed: number;
  viscosity: number;
  surfaceRoughness: number;
  animationPattern: 'wave' | 'ripple' | 'flow' | 'bubble';
  interactive: boolean;
  className?: string;
}

export function MetallicPaint({
  baseColor,
  highlightColor,
  reflectionIntensity,
  flowSpeed,
  viscosity,
  surfaceRoughness,
  animationPattern,
  interactive,
  className = '',
}: MetallicPaintProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{x: number, y: number, id: number, timestamp: number}[]>([]);
  const [animationOffset, setAnimationOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => prev + flowSpeed);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [flowSpeed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: rippleIdRef.current++,
      timestamp: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 3000);
  };

  const getGradientStyle = () => {
    const time = animationOffset * 0.01;
    
    switch (animationPattern) {
      case 'wave':
        return {
          background: `linear-gradient(${45 + Math.sin(time) * 30}deg, 
            ${baseColor} 0%, 
            ${highlightColor} ${30 + Math.sin(time * 2) * 20}%, 
            ${baseColor} ${70 + Math.cos(time) * 20}%, 
            ${highlightColor} 100%)`,
          backgroundSize: '200% 200%',
          backgroundPosition: `${Math.sin(time) * 50 + 50}% ${Math.cos(time * 0.7) * 50 + 50}%`,
        };
        
      case 'ripple':
        return {
          background: `radial-gradient(circle at ${50 + Math.sin(time) * 30}% ${50 + Math.cos(time * 0.8) * 30}%, 
            ${highlightColor} 0%, 
            ${baseColor} ${30 + Math.sin(time * 3) * 10}%, 
            ${highlightColor} ${60 + Math.cos(time * 2) * 15}%, 
            ${baseColor} 100%)`,
          backgroundSize: '150% 150%',
        };
        
      case 'flow':
        return {
          background: `linear-gradient(${time * 2}deg, 
            ${baseColor} 0%, 
            ${highlightColor} 25%, 
            ${baseColor} 50%, 
            ${highlightColor} 75%, 
            ${baseColor} 100%)`,
          backgroundSize: '300% 300%',
          backgroundPosition: `${time * 2}% ${time}%`,
        };
        
      case 'bubble':
        return {
          background: `radial-gradient(ellipse at ${30 + Math.sin(time) * 20}% ${40 + Math.cos(time * 1.3) * 25}%, 
            ${highlightColor} 0%, 
            transparent 40%), 
            radial-gradient(ellipse at ${70 + Math.cos(time * 0.9) * 15}% ${60 + Math.sin(time * 1.1) * 20}%, 
            ${highlightColor} 0%, 
            transparent 35%), 
            ${baseColor}`,
        };
        
      default:
        return {
          background: `linear-gradient(45deg, ${baseColor}, ${highlightColor})`,
        };
    }
  };

  const getReflectionStyle = () => {
    return {
      background: `linear-gradient(135deg, 
        rgba(255,255,255,${reflectionIntensity * 0.3}) 0%, 
        transparent 30%, 
        transparent 70%, 
        rgba(255,255,255,${reflectionIntensity * 0.1}) 100%)`,
      mixBlendMode: 'overlay' as const,
    };
  };

  const getTextureStyle = () => {
    const roughness = surfaceRoughness / 100;
    return {
      background: `
        radial-gradient(circle at 20% 30%, rgba(255,255,255,${roughness * 0.1}) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0,0,0,${roughness * 0.1}) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(255,255,255,${roughness * 0.05}) 0%, transparent 30%)
      `,
      filter: `blur(${roughness * 2}px)`,
      mixBlendMode: 'overlay' as const,
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 rounded-lg overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        ...getGradientStyle(),
        transition: `all ${viscosity * 100}ms ease-out`,
      }}
    >
      {/* Surface texture */}
      <div
        className="absolute inset-0"
        style={getTextureStyle()}
      />

      {/* Reflection layer */}
      <div
        className="absolute inset-0"
        style={getReflectionStyle()}
      />

      {/* Interactive ripples */}
      {ripples.map((ripple) => {
        const age = (Date.now() - ripple.timestamp) / 1000;
        const scale = age * 100;
        const opacity = Math.max(0, 1 - age / 3);
        
        return (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 4,
              height: 4,
              marginLeft: -2,
              marginTop: -2,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: scale,
              opacity: opacity,
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
          >
            <div
              className="w-full h-full rounded-full border-2"
              style={{
                borderColor: highlightColor,
                boxShadow: `0 0 20px ${highlightColor}`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Mouse interaction highlight */}
      {interactive && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${highlightColor}40 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center mix-blend-difference">
          <div className="text-2xl font-bold mb-2">Metallic Paint</div>
          <div className="text-sm opacity-80">
            {interactive ? 'Move mouse and click to interact' : 'Watch the fluid animation'}
          </div>
        </div>
      </div>

      {/* Info display */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70 mix-blend-difference">
        Pattern: {animationPattern} | Viscosity: {viscosity}
      </div>
    </div>
  );
}
