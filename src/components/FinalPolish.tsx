'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Add global styles for enhanced interactions
export function FinalPolish() {
  useEffect(() => {
    // Add custom CSS for enhanced interactions
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced focus styles */
      *:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }

      /* Enhanced button hover effects */
      button:not(:disabled):hover {
        transform: translateY(-1px);
        transition: transform 0.2s ease;
      }

      button:not(:disabled):active {
        transform: translateY(0);
      }

      /* Enhanced card hover effects */
      .card-hover:hover {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }

      /* Smooth transitions for theme switching */
      * {
        transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
      }

      /* Enhanced selection styles */
      ::selection {
        background-color: #3b82f6;
        color: white;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 4px;
      }

      .dark ::-webkit-scrollbar-thumb {
        background: #4b5563;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }

      .dark ::-webkit-scrollbar-thumb:hover {
        background: #6b7280;
      }

      /* Loading shimmer effect */
      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: calc(200px + 100%) 0;
        }
      }

      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
      }

      .dark .shimmer {
        background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
        background-size: 200px 100%;
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        button {
          border: 2px solid currentColor;
        }
        
        .border {
          border-width: 2px;
        }
      }

      /* Print styles */
      @media print {
        .no-print {
          display: none !important;
        }
        
        * {
          background: white !important;
          color: black !important;
          box-shadow: none !important;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

// Enhanced page transitions
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating action button for quick actions
export function FloatingActionButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 no-print"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <motion.button
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Quick Help (Press ? for shortcuts)"
      >
        <span className="text-xl font-bold">?</span>
      </motion.button>
    </motion.div>
  );
}

// Keyboard shortcuts overlay
export function KeyboardShortcuts() {
  const shortcuts = [
    { key: 'Ctrl + K', description: 'Search components' },
    { key: 'Ctrl + C', description: 'Copy code' },
    { key: 'Ctrl + Shift + P', description: 'Toggle performance monitor' },
    { key: 'Ctrl + ,', description: 'Open settings' },
    { key: 'Ctrl + /', description: 'Toggle this help' },
    { key: 'Tab', description: 'Navigate between elements' },
    { key: 'Escape', description: 'Close modals/panels' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Keyboard Shortcuts
      </h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {shortcut.description}
            </span>
            <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded border">
              {shortcut.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced error boundary with better UX
export function EnhancedErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-[400px] p-8"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="text-6xl mb-4"
        >
          😵
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Don't worry, this happens sometimes. Let's get you back on track.
        </p>
        <div className="space-y-3">
          <motion.button
            onClick={resetError}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-md font-medium"
          >
            Refresh Page
          </button>
        </div>
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Technical Details
          </summary>
          <pre className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs text-red-600 dark:text-red-400 overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </motion.div>
  );
}
