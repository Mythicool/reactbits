'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  scrambleSpeed: number;
  revealSpeed: number;
  scrambleChars: string;
  trigger: 'auto' | 'hover' | 'click';
  loop: boolean;
  className?: string;
}

export function ScrambleText({
  text,
  scrambleSpeed,
  revealSpeed,
  scrambleChars,
  trigger,
  loop,
  className = '',
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedChars, setRevealedChars] = useState(0);

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  const scrambleText = (originalText: string, revealed: number) => {
    return originalText
      .split('')
      .map((char, index) => {
        if (index < revealed) {
          return char;
        }
        if (char === ' ') {
          return ' ';
        }
        return getRandomChar();
      })
      .join('');
  };

  const startScramble = () => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    setRevealedChars(0);
    
    // Scrambling phase
    const scrambleInterval = setInterval(() => {
      setDisplayText(scrambleText(text, revealedChars));
    }, scrambleSpeed);
    
    // Revealing phase
    const revealInterval = setInterval(() => {
      setRevealedChars(prev => {
        const next = prev + 1;
        if (next >= text.length) {
          clearInterval(scrambleInterval);
          clearInterval(revealInterval);
          setDisplayText(text);
          setIsScrambling(false);
          
          if (loop && trigger === 'auto') {
            setTimeout(startScramble, 2000);
          }
        }
        return next;
      });
    }, revealSpeed);
  };

  const resetScramble = () => {
    setDisplayText(scrambleText(text, 0));
    setRevealedChars(0);
    setIsScrambling(false);
  };

  useEffect(() => {
    resetScramble();
    if (trigger === 'auto') {
      const timer = setTimeout(startScramble, 500);
      return () => clearTimeout(timer);
    }
  }, [text, trigger]);

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      if (isScrambling) {
        resetScramble();
      } else {
        startScramble();
      }
    }
  };

  return (
    <motion.div
      className={`inline-block font-mono cursor-pointer select-none ${className}`}
      onMouseEnter={() => trigger === 'hover' && handleInteraction()}
      onClick={() => trigger === 'click' && handleInteraction()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || scrambleText(text, 0)}
    </motion.div>
  );
}
