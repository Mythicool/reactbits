'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  intensity: number;
  speed: number;
  colorGlitch: boolean;
  dataCorruption: boolean;
  trigger: 'auto' | 'hover' | 'click';
  duration: number;
  className?: string;
}

export function GlitchText({
  text,
  intensity,
  speed,
  colorGlitch,
  dataCorruption,
  trigger,
  duration,
  className = '',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);
  const [glitchStyles, setGlitchStyles] = useState({});

  const corruptChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
  const glitchColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  const corruptText = (originalText: string) => {
    return originalText
      .split('')
      .map(char => {
        if (Math.random() < 0.1 && dataCorruption) {
          return corruptChars[Math.floor(Math.random() * corruptChars.length)];
        }
        return char;
      })
      .join('');
  };

  const generateGlitchStyles = () => {
    const styles: any = {};
    
    if (Math.random() < 0.3) {
      styles.transform = `translate(${(Math.random() - 0.5) * intensity}px, ${(Math.random() - 0.5) * intensity}px)`;
    }
    
    if (Math.random() < 0.2) {
      styles.filter = `blur(${Math.random() * 2}px)`;
    }
    
    if (colorGlitch && Math.random() < 0.4) {
      styles.color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
      styles.textShadow = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 ${glitchColors[Math.floor(Math.random() * glitchColors.length)]}`;
    }
    
    if (Math.random() < 0.1) {
      styles.scaleX = Math.random() * 0.5 + 0.75;
    }
    
    return styles;
  };

  const startGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    
    const glitchInterval = setInterval(() => {
      setGlitchText(corruptText(text));
      setGlitchStyles(generateGlitchStyles());
    }, 1000 / speed);
    
    setTimeout(() => {
      clearInterval(glitchInterval);
      setGlitchText(text);
      setGlitchStyles({});
      setIsGlitching(false);
    }, duration * 1000);
  };

  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(startGlitch, 500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      startGlitch();
    }
  };

  return (
    <div className={`inline-block relative ${className}`}>
      <motion.div
        className="relative font-bold text-2xl cursor-pointer select-none"
        style={glitchStyles}
        onMouseEnter={() => trigger === 'hover' && handleInteraction()}
        onClick={() => trigger === 'click' && handleInteraction()}
        animate={isGlitching ? {
          x: [0, -2, 2, 0],
          skewX: [0, -5, 5, 0],
        } : {}}
        transition={{
          duration: 0.1,
          repeat: isGlitching ? Infinity : 0,
          repeatType: "reverse",
        }}
      >
        {glitchText}
        
        {/* Glitch layers */}
        {isGlitching && (
          <>
            <motion.div
              className="absolute inset-0 font-bold text-2xl"
              style={{
                color: '#ff0000',
                mixBlendMode: 'multiply',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              }}
              animate={{
                x: [0, -1, 1, 0],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 0.05,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {glitchText}
            </motion.div>
            
            <motion.div
              className="absolute inset-0 font-bold text-2xl"
              style={{
                color: '#00ffff',
                mixBlendMode: 'multiply',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              }}
              animate={{
                x: [0, 1, -1, 0],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 0.05,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.025,
              }}
            >
              {glitchText}
            </motion.div>
          </>
        )}
      </motion.div>
      
      {/* Scanlines effect */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}
    </div>
  );
}
