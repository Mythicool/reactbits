'use client';

import { useState } from 'react';
import { ComponentDefinition } from '@/types/component';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Code, 
  Lightbulb, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink
} from 'lucide-react';
import { clsx } from 'clsx';

interface ComponentDocumentationProps {
  component: ComponentDefinition;
  parameters: Record<string, any>;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  content: React.ReactNode;
}

export function ComponentDocumentation({ component, parameters }: ComponentDocumentationProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    setActiveSection(sectionId);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getUsageExample = () => {
    const props = component.parameters
      .map(param => `  ${param.name}={${JSON.stringify(parameters[param.name] || param.defaultValue)}}`)
      .join('\n');
    
    return `import { ${component.name} } from '@/components/reactbits/${component.name}';

export default function Example() {
  return (
    <${component.name}
${props}
    />
  );
}`;
  };

  const getBestPractices = () => [
    {
      type: 'success',
      title: 'Performance',
      tips: [
        'Use React.memo() for components that receive stable props',
        'Implement proper key props for list items',
        'Consider lazy loading for heavy animations',
        'Use CSS transforms instead of changing layout properties'
      ]
    },
    {
      type: 'warning',
      title: 'Accessibility',
      tips: [
        'Ensure proper ARIA labels for interactive elements',
        'Test with keyboard navigation',
        'Provide alternative text for visual elements',
        'Consider reduced motion preferences'
      ]
    },
    {
      type: 'info',
      title: 'Customization',
      tips: [
        'Use CSS custom properties for theme integration',
        'Extend component props for additional styling',
        'Consider composition over configuration',
        'Document breaking changes in prop updates'
      ]
    }
  ];

  const getPerformanceTips = () => [
    'Debounce rapid parameter changes to avoid excessive re-renders',
    'Use requestAnimationFrame for smooth animations',
    'Implement proper cleanup in useEffect hooks',
    'Consider using CSS animations for simple transitions',
    'Profile component performance with React DevTools'
  ];

  const sections: DocSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      icon: Book,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            {component.description}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Component Category
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              {component.category}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'usage',
      title: 'Usage Example',
      icon: Code,
      content: (
        <div className="space-y-4">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{getUsageExample()}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(getUsageExample())}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
              title="Copy code"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            This example shows the component with current parameter values.
          </div>
        </div>
      )
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: Lightbulb,
      content: (
        <div className="space-y-6">
          {getBestPractices().map((section, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-2">
                {section.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
                {section.type === 'warning' && <AlertTriangle className="text-yellow-500" size={20} />}
                {section.type === 'info' && <Info className="text-blue-500" size={20} />}
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h4>
              </div>
              <ul className="space-y-2 ml-7">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'performance',
      title: 'Performance Tips',
      icon: Zap,
      content: (
        <div className="space-y-4">
          <ul className="space-y-3">
            {getPerformanceTips().map((tip, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Zap className="text-yellow-500 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
              Profiling Tip
            </h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Use React DevTools Profiler to measure component performance and identify bottlenecks.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Documentation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {component.name} - Usage guide and best practices
        </p>
      </div>

      <div className="h-full overflow-auto">
        <div className="p-4 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </span>
                </div>
                {expandedSections.has(section.id) ? (
                  <ChevronDown className="text-gray-400" size={20} />
                ) : (
                  <ChevronRight className="text-gray-400" size={20} />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.has(section.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* External Links */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Additional Resources
          </h3>
          <div className="space-y-2">
            <a
              href="https://framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={14} />
              <span>Framer Motion Documentation</span>
            </a>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={14} />
              <span>React Documentation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
