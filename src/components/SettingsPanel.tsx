'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Code, Palette, Zap, Monitor } from 'lucide-react';
import { clsx } from 'clsx';

interface SettingsState {
  codeStyle: 'typescript' | 'javascript';
  indentation: 2 | 4;
  semicolons: boolean;
  quotes: 'single' | 'double';
  trailingCommas: boolean;
  autoFormat: boolean;
  showLineNumbers: boolean;
  wordWrap: boolean;
  fontSize: 'small' | 'medium' | 'large';
  animationSpeed: 'slow' | 'normal' | 'fast';
  reducedMotion: boolean;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: SettingsState) => void;
}

export function SettingsPanel({ isOpen, onClose, onSettingsChange }: SettingsPanelProps) {
  const [settings, setSettings] = useState<SettingsState>({
    codeStyle: 'typescript',
    indentation: 2,
    semicolons: true,
    quotes: 'single',
    trailingCommas: true,
    autoFormat: true,
    showLineNumbers: true,
    wordWrap: true,
    fontSize: 'medium',
    animationSpeed: 'normal',
    reducedMotion: false,
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('reactbits-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage and notify parent
  useEffect(() => {
    localStorage.setItem('reactbits-settings', JSON.stringify(settings));
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings: SettingsState = {
      codeStyle: 'typescript',
      indentation: 2,
      semicolons: true,
      quotes: 'single',
      trailingCommas: true,
      autoFormat: true,
      showLineNumbers: true,
      wordWrap: true,
      fontSize: 'medium',
      animationSpeed: 'normal',
      reducedMotion: false,
    };
    setSettings(defaultSettings);
  };

  const settingSections = [
    {
      title: 'Code Generation',
      icon: Code,
      settings: [
        {
          key: 'codeStyle' as const,
          label: 'Language',
          type: 'select' as const,
          options: [
            { value: 'typescript', label: 'TypeScript' },
            { value: 'javascript', label: 'JavaScript' },
          ],
        },
        {
          key: 'indentation' as const,
          label: 'Indentation',
          type: 'select' as const,
          options: [
            { value: 2, label: '2 spaces' },
            { value: 4, label: '4 spaces' },
          ],
        },
        {
          key: 'quotes' as const,
          label: 'Quote Style',
          type: 'select' as const,
          options: [
            { value: 'single', label: 'Single quotes' },
            { value: 'double', label: 'Double quotes' },
          ],
        },
        {
          key: 'semicolons' as const,
          label: 'Semicolons',
          type: 'boolean' as const,
        },
        {
          key: 'trailingCommas' as const,
          label: 'Trailing Commas',
          type: 'boolean' as const,
        },
      ],
    },
    {
      title: 'Editor',
      icon: Monitor,
      settings: [
        {
          key: 'fontSize' as const,
          label: 'Font Size',
          type: 'select' as const,
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ],
        },
        {
          key: 'showLineNumbers' as const,
          label: 'Line Numbers',
          type: 'boolean' as const,
        },
        {
          key: 'wordWrap' as const,
          label: 'Word Wrap',
          type: 'boolean' as const,
        },
        {
          key: 'autoFormat' as const,
          label: 'Auto Format',
          type: 'boolean' as const,
        },
      ],
    },
    {
      title: 'Animations',
      icon: Zap,
      settings: [
        {
          key: 'animationSpeed' as const,
          label: 'Animation Speed',
          type: 'select' as const,
          options: [
            { value: 'slow', label: 'Slow' },
            { value: 'normal', label: 'Normal' },
            { value: 'fast', label: 'Fast' },
          ],
        },
        {
          key: 'reducedMotion' as const,
          label: 'Reduced Motion',
          type: 'boolean' as const,
        },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Settings
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {settingSections.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center space-x-2 mb-4">
                    <section.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {section.settings.map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          {setting.label}
                        </label>
                        
                        {setting.type === 'boolean' ? (
                          <button
                            onClick={() => updateSetting(setting.key, !settings[setting.key])}
                            className={clsx(
                              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                              settings[setting.key]
                                ? 'bg-blue-600'
                                : 'bg-gray-200 dark:bg-gray-700'
                            )}
                          >
                            <motion.span
                              layout
                              className={clsx(
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                              )}
                            />
                          </button>
                        ) : (
                          <select
                            value={settings[setting.key] as string | number}
                            onChange={(e) => {
                              const value = setting.key === 'indentation' 
                                ? parseInt(e.target.value) 
                                : e.target.value;
                              updateSetting(setting.key, value as any);
                            }}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {setting.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Reset Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={resetSettings}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
