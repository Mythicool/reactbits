import { clsx } from 'clsx';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  size: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton: boolean;
  backdrop: 'blur' | 'dark' | 'light';
}

export function Modal({ title, content, isOpen, size, showCloseButton, backdrop }: ModalProps) {
  if (!isOpen) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Modal is closed. Set "isOpen" to true to see the modal.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Backdrop */}
      <div 
        className={clsx(
          'fixed inset-0 transition-opacity',
          {
            'bg-black/50 backdrop-blur-sm': backdrop === 'blur',
            'bg-black/75': backdrop === 'dark',
            'bg-white/75': backdrop === 'light',
          }
        )}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={clsx(
            'bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 relative',
            {
              'max-w-sm w-full': size === 'sm',
              'max-w-md w-full': size === 'md',
              'max-w-lg w-full': size === 'lg',
              'max-w-2xl w-full': size === 'xl',
            }
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {showCloseButton && (
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">
              {content}
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
