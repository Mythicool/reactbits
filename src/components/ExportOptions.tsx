'use client';

import { useState } from 'react';
import { ComponentDefinition } from '@/types/component';
import { Download, Copy, Share2, FileText, Package, Code2 } from 'lucide-react';
import { clsx } from 'clsx';
import { generateTypeDefinitions, generatePackageJson, generateReadme } from '@/utils/typeDefinitions';

interface ExportOptionsProps {
  component: ComponentDefinition;
  parameters: Record<string, any>;
  generatedCode: string;
  onShare: () => Promise<boolean>;
}

export function ExportOptions({
  component,
  parameters,
  generatedCode,
  onShare,
}: ExportOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'sharing' | 'success' | 'error'>('idle');

  const copyToClipboard = async (text: string, type: string) => {
    setCopyStatus('copying');
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleShare = async () => {
    setShareStatus('sharing');
    try {
      const success = await onShare();
      setShareStatus(success ? 'success' : 'error');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch (error) {
      setShareStatus('error');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  };

  const generateFullExample = () => {
    const imports = `import { ${component.name} } from '@/components/reactbits/${component.name}';`;
    const usage = generatedCode;
    
    return `${imports}

export default function Example() {
  return (
    <div className="p-8">
      ${usage}
    </div>
  );
}`;
  };

  const generatePackageJson = () => {
    return JSON.stringify({
      "name": `reactbits-${component.id}-example`,
      "version": "1.0.0",
      "description": `Example usage of ${component.name} component`,
      "main": "index.js",
      "dependencies": {
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "framer-motion": "^10.0.0",
        "clsx": "^2.0.0"
      },
      "devDependencies": {
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "typescript": "^5.0.0"
      }
    }, null, 2);
  };

  const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportOptions = [
    {
      id: 'copy-component',
      label: 'Copy Component Code',
      icon: Copy,
      action: () => copyToClipboard(generatedCode, 'component'),
      description: 'Copy the component usage code',
    },
    {
      id: 'copy-full-example',
      label: 'Copy Full Example',
      icon: FileText,
      action: () => copyToClipboard(generateFullExample(), 'example'),
      description: 'Copy a complete example with imports',
    },
    {
      id: 'copy-types',
      label: 'Copy TypeScript Types',
      icon: Code2,
      action: () => copyToClipboard(generateTypeDefinitions(component), 'types'),
      description: 'Copy TypeScript interface definitions',
    },
    {
      id: 'download-example',
      label: 'Download Example',
      icon: Download,
      action: () => downloadFile(generateFullExample(), `${component.id}-example.tsx`, 'text/typescript'),
      description: 'Download as TypeScript file',
    },
    {
      id: 'download-types',
      label: 'Download Types',
      icon: Code2,
      action: () => downloadFile(generateTypeDefinitions(component), `${component.id}.d.ts`, 'text/typescript'),
      description: 'Download TypeScript definitions',
    },
    {
      id: 'download-package',
      label: 'Download Package.json',
      icon: Package,
      action: () => downloadFile(generatePackageJson([component]), 'package.json', 'application/json'),
      description: 'Download package.json with dependencies',
    },
    {
      id: 'share-config',
      label: 'Share Configuration',
      icon: Share2,
      action: handleShare,
      description: 'Copy shareable URL with current settings',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        <Download size={16} />
        <span>Export</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Export Options
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Export or share your component configuration
              </p>
            </div>
            
            <div className="p-2">
              {exportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={option.action}
                  className={clsx(
                    'w-full flex items-start space-x-3 p-3 rounded-md transition-colors text-left',
                    'hover:bg-gray-50 dark:hover:bg-gray-700',
                    (copyStatus === 'copying' || shareStatus === 'sharing') && 'opacity-50 cursor-not-allowed'
                  )}
                  disabled={copyStatus === 'copying' || shareStatus === 'sharing'}
                >
                  <option.icon size={16} className="text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Status Messages */}
            {(copyStatus !== 'idle' || shareStatus !== 'idle') && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className={clsx(
                  'text-xs font-medium',
                  (copyStatus === 'success' || shareStatus === 'success') && 'text-green-600 dark:text-green-400',
                  (copyStatus === 'error' || shareStatus === 'error') && 'text-red-600 dark:text-red-400',
                  (copyStatus === 'copying' || shareStatus === 'sharing') && 'text-blue-600 dark:text-blue-400'
                )}>
                  {copyStatus === 'copying' && 'Copying to clipboard...'}
                  {copyStatus === 'success' && '✓ Copied to clipboard!'}
                  {copyStatus === 'error' && '✗ Failed to copy'}
                  {shareStatus === 'sharing' && 'Generating share link...'}
                  {shareStatus === 'success' && '✓ Share link copied!'}
                  {shareStatus === 'error' && '✗ Failed to generate share link'}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
