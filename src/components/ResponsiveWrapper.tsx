'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smartphone, Tablet, Monitor } from 'lucide-react';
import { clsx } from 'clsx';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export function ResponsiveWrapper({ children, sidebar }: ResponsiveWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      
      if (width < 640) {
        setViewportSize('mobile');
      } else if (width < 1024) {
        setViewportSize('tablet');
      } else {
        setViewportSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-sidebar]') && !target.closest('[data-sidebar-toggle]')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  const getViewportIcon = () => {
    switch (viewportSize) {
      case 'mobile':
        return <Smartphone size={16} />;
      case 'tablet':
        return <Tablet size={16} />;
      case 'desktop':
        return <Monitor size={16} />;
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            data-sidebar-toggle
            aria-label="Open component sidebar"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {getViewportIcon()}
            <span className="capitalize">{viewportSize}</span>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 z-50 lg:hidden"
                data-sidebar
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Components
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Close sidebar"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="h-full overflow-hidden">
                  {sidebar}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Main Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex h-full gap-6">
      {/* Desktop Sidebar */}
      <motion.div 
        className="w-80 flex-shrink-0"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {sidebar}
      </motion.div>

      {/* Desktop Main Content */}
      <motion.div 
        className="flex-1 min-w-0"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Viewport Indicator */}
        <div className="hidden lg:flex items-center justify-end mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {getViewportIcon()}
            <span className="capitalize">{viewportSize} View</span>
          </div>
        </div>
        
        {children}
      </motion.div>
    </div>
  );
}

// Hook for responsive utilities
export function useResponsive() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setScreenSize('mobile');
        setIsMobile(true);
        setIsTablet(false);
      } else if (width < 1024) {
        setScreenSize('tablet');
        setIsMobile(false);
        setIsTablet(true);
      } else {
        setScreenSize('desktop');
        setIsMobile(false);
        setIsTablet(false);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop: screenSize === 'desktop',
  };
}
