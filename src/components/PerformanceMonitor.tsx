'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Cpu, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage: number;
  fps: number;
  lastUpdate: number;
}

interface PerformanceMonitorProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

export function PerformanceMonitor({ isVisible = false, onToggle }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    fps: 60,
    lastUpdate: Date.now(),
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const renderStartRef = useRef(0);

  // FPS monitoring
  useEffect(() => {
    let animationId: number;
    
    const measureFPS = () => {
      frameCountRef.current++;
      const now = performance.now();
      
      if (now - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          lastUpdate: Date.now(),
        }));
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };
    
    if (isVisible) {
      animationId = requestAnimationFrame(measureFPS);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  // Memory usage monitoring
  useEffect(() => {
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage: usedMB,
        }));
      }
    };

    if (isVisible) {
      const interval = setInterval(measureMemory, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Component count monitoring
  useEffect(() => {
    const countComponents = () => {
      const components = document.querySelectorAll('[data-component]');
      setMetrics(prev => ({
        ...prev,
        componentCount: components.length,
      }));
    };

    if (isVisible) {
      countComponents();
      const interval = setInterval(countComponents, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Render time monitoring
  useEffect(() => {
    renderStartRef.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      setMetrics(prev => ({
        ...prev,
        renderTime: Math.round(renderTime * 100) / 100,
      }));
    };
  });

  const getPerformanceStatus = () => {
    if (metrics.fps < 30 || metrics.renderTime > 16) {
      return { status: 'poor', color: 'text-red-500', icon: AlertTriangle };
    }
    if (metrics.fps < 50 || metrics.renderTime > 8) {
      return { status: 'fair', color: 'text-yellow-500', icon: Activity };
    }
    return { status: 'good', color: 'text-green-500', icon: CheckCircle };
  };

  const performanceStatus = getPerformanceStatus();

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <performanceStatus.icon className={clsx('w-4 h-4', performanceStatus.color)} />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Performance
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={clsx('text-xs', performanceStatus.color)}>
              {metrics.fps} FPS
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {/* FPS */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">FPS</span>
                  </div>
                  <span className={clsx('text-sm font-mono', performanceStatus.color)}>
                    {metrics.fps}
                  </span>
                </div>

                {/* Render Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Render</span>
                  </div>
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {metrics.renderTime}ms
                  </span>
                </div>

                {/* Memory Usage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Memory</span>
                  </div>
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {metrics.memoryUsage}MB
                  </span>
                </div>

                {/* Component Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Components</span>
                  </div>
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {metrics.componentCount}
                  </span>
                </div>

                {/* Performance Tips */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {performanceStatus.status === 'poor' && (
                      <div className="text-red-600 dark:text-red-400">
                        ⚠️ Performance issues detected. Consider reducing animation complexity.
                      </div>
                    )}
                    {performanceStatus.status === 'fair' && (
                      <div className="text-yellow-600 dark:text-yellow-400">
                        ⚡ Performance could be improved. Check for unnecessary re-renders.
                      </div>
                    )}
                    {performanceStatus.status === 'good' && (
                      <div className="text-green-600 dark:text-green-400">
                        ✅ Performance is optimal.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    fps: 60,
    lastUpdate: Date.now(),
  });

  const toggle = () => setIsVisible(!isVisible);
  
  // Keyboard shortcut to toggle (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isVisible,
    toggle,
    metrics,
    PerformanceMonitor: () => <PerformanceMonitor isVisible={isVisible} onToggle={toggle} />,
  };
}
