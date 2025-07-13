'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ShinyTextProps {
  text: string;
  shineColor: string;
  baseColor: string;
  duration: number;
  delay: number;
  repeat: boolean;
  shineWidth: number;
  angle: number;
  className?: string;
}

export function ShinyText({
  text,
  shineColor,
  baseColor,
  duration,
  delay,
  repeat,
  shineWidth,
  angle,
  className = '',
}: ShinyTextProps) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (repeat) {
      const interval = setInterval(() => {
        setAnimationKey(prev => prev + 1);
      }, (duration + delay) * 1000);
      return () => clearInterval(interval);
    }
  }, [repeat, duration, delay]);

  const shineGradient = `linear-gradient(${angle}deg, 
    transparent 0%, 
    transparent ${50 - shineWidth/2}%, 
    ${shineColor} 50%, 
    transparent ${50 + shineWidth/2}%, 
    transparent 100%)`;

  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <motion.div
        className="relative"
        style={{
          color: baseColor,
          fontWeight: 'bold',
        }}
      >
        {text}
        <motion.div
          key={animationKey}
          className="absolute inset-0"
          style={{
            background: shineGradient,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mixBlendMode: 'overlay',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: duration,
            delay: delay,
            ease: "easeInOut",
            repeat: repeat ? Infinity : 0,
            repeatDelay: delay,
          }}
        >
          {text}
        </motion.div>
      </motion.div>
    </div>
  );
}
