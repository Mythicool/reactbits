'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  start: number;
  end: number;
  duration: number;
  decimals: number;
  prefix: string;
  suffix: string;
  separator: string;
  trigger: 'auto' | 'scroll' | 'hover' | 'click';
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  className?: string;
}

export function CountUp({
  start,
  end,
  duration,
  decimals,
  prefix,
  suffix,
  separator,
  trigger,
  easing,
  className = '',
}: CountUpProps) {
  const [currentValue, setCurrentValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  };

  const formatNumber = (value: number) => {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split('.');
    
    // Add thousand separators
    if (separator) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    
    const formatted = parts.join('.');
    return `${prefix}${formatted}${suffix}`;
  };

  const animateCount = () => {
    if (isAnimating || (trigger === 'scroll' && hasAnimated)) return;
    
    setIsAnimating(true);
    setHasAnimated(true);
    
    const startTime = Date.now();
    const difference = end - start;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const newValue = start + (difference * easedProgress);
      
      setCurrentValue(newValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const resetCount = () => {
    setCurrentValue(start);
    setIsAnimating(false);
    setHasAnimated(false);
  };

  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(animateCount, 500);
      return () => clearTimeout(timer);
    } else if (trigger === 'scroll' && isInView && !hasAnimated) {
      animateCount();
    }
  }, [trigger, isInView]);

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click') {
      if (hasAnimated) {
        resetCount();
        setTimeout(animateCount, 100);
      } else {
        animateCount();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      onMouseEnter={() => trigger === 'hover' && handleInteraction()}
      onClick={() => trigger === 'click' && handleInteraction()}
    >
      <motion.div
        className="font-bold text-4xl"
        animate={{
          scale: isAnimating ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {formatNumber(currentValue)}
      </motion.div>
      
      {/* Progress indicator */}
      {isAnimating && (
        <motion.div
          className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: duration,
              ease: easing === 'linear' ? 'linear' : 'easeInOut',
            }}
          />
        </motion.div>
      )}
      
      {/* Trigger hint */}
      {!hasAnimated && trigger !== 'auto' && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          {trigger === 'scroll' && 'Scroll to animate'}
          {trigger === 'hover' && 'Hover to animate'}
          {trigger === 'click' && 'Click to animate'}
        </div>
      )}
    </div>
  );
}
