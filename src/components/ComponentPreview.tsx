'use client';

import { useState, useEffect } from 'react';
import { ComponentDefinition } from '@/types/component';
import { ErrorBoundary } from './ErrorBoundary';
import { ComponentLoading } from './Loading';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentPreviewProps {
  component: ComponentDefinition | null;
  parameters: Record<string, any>;
}

export function ComponentPreview({ component, parameters }: ComponentPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  // Add loading state when component or parameters change
  useEffect(() => {
    if (component) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setKey(prev => prev + 1); // Force re-render for smooth transitions
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [component?.id, JSON.stringify(parameters)]);

  if (!component) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.div
            className="text-gray-400 dark:text-gray-500 text-6xl mb-4"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            📦
          </motion.div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Component Selected
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a component from the sidebar to see it in action
          </p>
        </div>
      </motion.div>
    );
  }

  const Component = component.component;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Preview
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {component.name}
            </p>
          </div>
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              <span>Updating...</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 h-full overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-[300px] bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <ComponentLoading key="loading" />
            ) : (
              <motion.div
                key={`component-${key}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                <ErrorBoundary>
                  <Component {...parameters} />
                </ErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Preview Controls */}
        <div className="mt-4 flex justify-center space-x-2">
          <button className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            📱 Mobile
          </button>
          <button className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            💻 Desktop
          </button>
          <button className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
