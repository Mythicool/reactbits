'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextCursorProps {
  text: string;
  typingSpeed: number;
  cursorChar: string;
  cursorColor: string;
  blinkSpeed: number;
  showCursor: boolean;
  loop: boolean;
  deleteSpeed: number;
  className?: string;
}

export function TextCursor({
  text,
  typingSpeed,
  cursorChar,
  cursorColor,
  blinkSpeed,
  showCursor,
  loop,
  deleteSpeed,
  className = '',
}: TextCursorProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!loop && isComplete) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsComplete(true);
          if (loop) {
            setTimeout(() => {
              setIsDeleting(true);
            }, 1000);
          }
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setDisplayText(text.slice(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setIsComplete(false);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text, typingSpeed, deleteSpeed, loop, isComplete]);

  return (
    <div className={`inline-block font-mono ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          className="inline-block"
          style={{ color: cursorColor }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: blinkSpeed,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
}
