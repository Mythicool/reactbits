'use client';

import { ComponentPlayground } from '@/components/ComponentPlayground';
import { ToastContainer, useToast } from '@/components/Toast';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { SettingsPanel } from '@/components/SettingsPanel';
import { FinalPolish, PageTransition } from '@/components/FinalPolish';
import { useState, Suspense } from 'react';
import { Settings } from 'lucide-react';

export default function Home() {
  const { toasts, dismissToast } = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({});

  return (
    <PageTransition>
      <FinalPolish />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                ReactBits
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Interactive React component playground with live code generation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div>✨ 37 Components Available</div>
                <div>📋 Export & Share Ready</div>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeSwitcher />
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Settings"
                >
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading playground...</p>
            </div>
          </div>
        }>
          <ComponentPlayground />
        </Suspense>
      </main>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSettingsChange={setSettings}
      />
      </div>
    </PageTransition>
  );
}
