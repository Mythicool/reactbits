'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ASCIITextProps {
  text: string;
  font: 'block' | 'slant' | 'shadow' | 'bubble' | 'digital';
  animationType: 'typewriter' | 'fadeIn' | 'slideUp' | 'glitch';
  speed: number;
  color: string;
  className?: string;
}

export function ASCIIText({
  text,
  font,
  animationType,
  speed,
  color,
  className = '',
}: ASCIITextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const asciiArt = {
    block: {
      'A': ['██████', '██  ██', '██████', '██  ██', '██  ██'],
      'B': ['██████', '██  ██', '██████', '██  ██', '██████'],
      'C': ['██████', '██    ', '██    ', '██    ', '██████'],
      'D': ['██████', '██  ██', '██  ██', '██  ██', '██████'],
      'E': ['██████', '██    ', '██████', '██    ', '██████'],
      'F': ['██████', '██    ', '██████', '██    ', '██    '],
      'G': ['██████', '██    ', '██ ███', '██  ██', '██████'],
      'H': ['██  ██', '██  ██', '██████', '██  ██', '██  ██'],
      'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '██████'],
      'J': ['██████', '    ██', '    ██', '██  ██', '██████'],
      'K': ['██  ██', '██ ██ ', '████  ', '██ ██ ', '██  ██'],
      'L': ['██    ', '██    ', '██    ', '██    ', '██████'],
      'M': ['██  ██', '██████', '██████', '██  ██', '██  ██'],
      'N': ['██  ██', '██████', '██████', '██████', '██  ██'],
      'O': ['██████', '██  ██', '██  ██', '██  ██', '██████'],
      'P': ['██████', '██  ██', '██████', '██    ', '██    '],
      'Q': ['██████', '██  ██', '██  ██', '██ ███', '██████'],
      'R': ['██████', '██  ██', '██████', '██ ██ ', '██  ██'],
      'S': ['██████', '██    ', '██████', '    ██', '██████'],
      'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
      'U': ['██  ██', '██  ██', '██  ██', '██  ██', '██████'],
      'V': ['██  ██', '██  ██', '██  ██', ' ████ ', '  ██  '],
      'W': ['██  ██', '██  ██', '██████', '██████', '██  ██'],
      'X': ['██  ██', ' ████ ', '  ██  ', ' ████ ', '██  ██'],
      'Y': ['██  ██', '██  ██', ' ████ ', '  ██  ', '  ██  '],
      'Z': ['██████', '   ██ ', '  ██  ', ' ██   ', '██████'],
      ' ': ['      ', '      ', '      ', '      ', '      '],
    },
    slant: {
      'A': ['   ██   ', '  ████  ', ' ██  ██ ', '████████', '██    ██'],
      'B': ['███████ ', '██    ██', '███████ ', '██    ██', '███████ '],
      'C': [' ███████', '██      ', '██      ', '██      ', ' ███████'],
      ' ': ['        ', '        ', '        ', '        ', '        '],
    },
  };

  const generateASCII = (inputText: string) => {
    const chars = inputText.toUpperCase().split('');
    const selectedFont = asciiArt[font] || asciiArt.block;
    const lines = ['', '', '', '', ''];
    
    chars.forEach(char => {
      const charArt = selectedFont[char] || selectedFont[' '];
      charArt.forEach((line, index) => {
        lines[index] += line + ' ';
      });
    });
    
    return lines.join('\n');
  };

  useEffect(() => {
    if (animationType === 'typewriter') {
      setDisplayText('');
      setIsAnimating(true);
      
      const fullText = generateASCII(text);
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsAnimating(false);
        }
      }, speed);
      
      return () => clearInterval(typeInterval);
    } else {
      setDisplayText(generateASCII(text));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [text, font, animationType, speed]);

  const getAnimationProps = () => {
    switch (animationType) {
      case 'fadeIn':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: speed / 100 },
        };
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: speed / 100 },
        };
      case 'glitch':
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: [0, 1, 0.8, 1],
            x: [0, -2, 2, 0],
            filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
          },
          transition: { 
            duration: speed / 50,
            times: [0, 0.3, 0.6, 1],
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.pre
      className={`font-mono text-sm leading-tight ${className}`}
      style={{ color }}
      {...getAnimationProps()}
    >
      {displayText}
    </motion.pre>
  );
}
