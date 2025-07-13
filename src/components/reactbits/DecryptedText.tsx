'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  decryptSpeed: number;
  scrambleChars: string;
  iterations: number;
  delay: number;
  trigger: 'auto' | 'hover' | 'click';
  className?: string;
}

export function DecryptedText({
  text,
  decryptSpeed,
  scrambleChars,
  iterations,
  delay,
  trigger,
  className = '',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);

  const scrambleText = (originalText: string, revealedLength: number) => {
    return originalText
      .split('')
      .map((char, index) => {
        if (index < revealedLength) {
          return char;
        }
        if (char === ' ') {
          return ' ';
        }
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      })
      .join('');
  };

  const startDecryption = () => {
    if (isDecrypting || isDecrypted) return;
    
    setIsDecrypting(true);
    setIsDecrypted(false);
    
    let currentIteration = 0;
    let revealedChars = 0;
    
    const decrypt = () => {
      if (revealedChars >= text.length) {
        setDisplayText(text);
        setIsDecrypting(false);
        setIsDecrypted(true);
        return;
      }
      
      if (currentIteration >= iterations) {
        revealedChars++;
        currentIteration = 0;
      }
      
      setDisplayText(scrambleText(text, revealedChars));
      currentIteration++;
      
      setTimeout(decrypt, decryptSpeed);
    };
    
    setTimeout(decrypt, delay * 1000);
  };

  const resetDecryption = () => {
    setIsDecrypting(false);
    setIsDecrypted(false);
    setDisplayText(scrambleText(text, 0));
  };

  useEffect(() => {
    resetDecryption();
    if (trigger === 'auto') {
      startDecryption();
    }
  }, [text, trigger]);

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      if (isDecrypted) {
        resetDecryption();
      } else {
        startDecryption();
      }
    }
  };

  return (
    <motion.div
      className={`inline-block font-mono cursor-pointer ${className}`}
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
