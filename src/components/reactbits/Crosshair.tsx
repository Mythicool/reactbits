'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface CrosshairProps {
  size: number;
  thickness: number;
  color: string;
  style: 'simple' | 'tactical' | 'sniper' | 'gaming';
  animated: boolean;
  followMouse: boolean;
  showDot: boolean;
  showCircle: boolean;
  opacity: number;
  className?: string;
}

export function Crosshair({
  size,
  thickness,
  color,
  style,
  animated,
  followMouse,
  showDot,
  showCircle,
  opacity,
  className = '',
}: CrosshairProps) {
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getCrosshairStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      left: mousePosition.x,
      top: mousePosition.y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none' as const,
      opacity,
    };

    return baseStyle;
  };

  const renderSimpleCrosshair = () => (
    <div style={getCrosshairStyle()}>
      {/* Horizontal line */}
      <div
        className="absolute"
        style={{
          width: size,
          height: thickness,
          backgroundColor: color,
          left: -size / 2,
          top: -thickness / 2,
        }}
      />
      {/* Vertical line */}
      <div
        className="absolute"
        style={{
          width: thickness,
          height: size,
          backgroundColor: color,
          left: -thickness / 2,
          top: -size / 2,
        }}
      />
      {showDot && (
        <div
          className="absolute rounded-full"
          style={{
            width: thickness * 2,
            height: thickness * 2,
            backgroundColor: color,
            left: -thickness,
            top: -thickness,
          }}
        />
      )}
    </div>
  );

  const renderTacticalCrosshair = () => (
    <div style={getCrosshairStyle()}>
      {/* Top */}
      <div
        className="absolute"
        style={{
          width: thickness,
          height: size / 3,
          backgroundColor: color,
          left: -thickness / 2,
          top: -size / 2,
        }}
      />
      {/* Bottom */}
      <div
        className="absolute"
        style={{
          width: thickness,
          height: size / 3,
          backgroundColor: color,
          left: -thickness / 2,
          top: size / 6,
        }}
      />
      {/* Left */}
      <div
        className="absolute"
        style={{
          width: size / 3,
          height: thickness,
          backgroundColor: color,
          left: -size / 2,
          top: -thickness / 2,
        }}
      />
      {/* Right */}
      <div
        className="absolute"
        style={{
          width: size / 3,
          height: thickness,
          backgroundColor: color,
          left: size / 6,
          top: -thickness / 2,
        }}
      />
      {showCircle && (
        <div
          className="absolute border rounded-full"
          style={{
            width: size * 0.8,
            height: size * 0.8,
            borderColor: color,
            borderWidth: thickness / 2,
            left: -size * 0.4,
            top: -size * 0.4,
          }}
        />
      )}
    </div>
  );

  const renderSniperCrosshair = () => (
    <div style={getCrosshairStyle()}>
      {/* Main cross */}
      <div
        className="absolute"
        style={{
          width: size,
          height: thickness / 2,
          backgroundColor: color,
          left: -size / 2,
          top: -thickness / 4,
        }}
      />
      <div
        className="absolute"
        style={{
          width: thickness / 2,
          height: size,
          backgroundColor: color,
          left: -thickness / 4,
          top: -size / 2,
        }}
      />
      
      {/* Range markers */}
      {[0.3, 0.6, 0.9].map((scale, index) => (
        <div
          key={index}
          className="absolute border rounded-full"
          style={{
            width: size * scale,
            height: size * scale,
            borderColor: color,
            borderWidth: thickness / 4,
            left: -size * scale / 2,
            top: -size * scale / 2,
            opacity: 0.6,
          }}
        />
      ))}
      
      {showDot && (
        <div
          className="absolute rounded-full"
          style={{
            width: thickness,
            height: thickness,
            backgroundColor: color,
            left: -thickness / 2,
            top: -thickness / 2,
          }}
        />
      )}
    </div>
  );

  const renderGamingCrosshair = () => (
    <div style={getCrosshairStyle()}>
      {/* Dynamic segments */}
      {[0, 90, 180, 270].map((rotation, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            width: size / 4,
            height: thickness,
            backgroundColor: color,
            transformOrigin: 'center',
            left: -size / 8,
            top: -thickness / 2,
          }}
          animate={animated ? {
            rotate: rotation,
            x: [0, size / 4, 0],
            opacity: [1, 0.5, 1],
          } : {
            rotate: rotation,
          }}
          transition={{
            duration: 2,
            repeat: animated ? Infinity : 0,
            delay: index * 0.1,
          }}
        />
      ))}
      
      {showCircle && (
        <motion.div
          className="absolute border rounded-full"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            borderColor: color,
            borderWidth: thickness / 2,
            left: -size * 0.3,
            top: -size * 0.3,
          }}
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.4, 0.8],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: animated ? Infinity : 0,
          }}
        />
      )}
    </div>
  );

  const renderCrosshair = () => {
    switch (style) {
      case 'tactical':
        return renderTacticalCrosshair();
      case 'sniper':
        return renderSniperCrosshair();
      case 'gaming':
        return renderGamingCrosshair();
      case 'simple':
      default:
        return renderSimpleCrosshair();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden cursor-none ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Crosshair */}
      {renderCrosshair()}

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white text-sm opacity-70">
        {followMouse ? 'Move mouse to aim' : 'Static crosshair'}
      </div>

      {/* Info */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70">
        Style: {style} | Size: {size}px
      </div>

      {/* Coordinates */}
      {followMouse && (
        <div className="absolute bottom-4 right-4 text-white text-xs opacity-70 font-mono">
          X: {Math.round(mousePosition.x)} Y: {Math.round(mousePosition.y)}
        </div>
      )}
    </div>
  );
}
