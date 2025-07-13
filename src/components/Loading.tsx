'use client';

import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
  className?: string;
}

export function Loading({ 
  size = 'md', 
  variant = 'spinner', 
  text, 
  className = '' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'spinner') {
    return (
      <div className={clsx('flex items-center justify-center', className)}>
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className={clsx(sizeClasses[size], 'animate-spin text-blue-500')} />
          {text && (
            <p className={clsx(textSizeClasses[size], 'text-gray-600 dark:text-gray-300')}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={clsx('flex items-center justify-center', className)}>
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={clsx(
                  'rounded-full bg-blue-500',
                  size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
                )}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          {text && (
            <p className={clsx(textSizeClasses[size], 'text-gray-600 dark:text-gray-300')}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={clsx('flex items-center justify-center', className)}>
        <div className="flex flex-col items-center space-y-3">
          <motion.div
            className={clsx(
              'rounded-full bg-blue-500',
              size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'
            )}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {text && (
            <p className={clsx(textSizeClasses[size], 'text-gray-600 dark:text-gray-300')}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={clsx('animate-pulse', className)}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Specialized loading components
export function ComponentLoading() {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-3" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Loading component...
        </p>
      </div>
    </div>
  );
}

export function CodeLoading() {
  return (
    <div className="space-y-2 p-4">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}

export function SidebarLoading() {
  return (
    <div className="p-4 space-y-4">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
