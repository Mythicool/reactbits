import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  showIcon: boolean;
  dismissible: boolean;
  rounded: boolean;
}

export function Alert({ title, message, type, showIcon, dismissible, rounded }: AlertProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div
      className={clsx(
        'p-4 border',
        {
          // Types
          'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200': type === 'success',
          'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200': type === 'error',
          'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200': type === 'warning',
          'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200': type === 'info',
          
          // Rounded
          'rounded-lg': rounded,
          'rounded-none': !rounded,
        }
      )}
    >
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            <Icon size={20} />
          </div>
        )}
        
        <div className="flex-1">
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        
        {dismissible && (
          <button className="flex-shrink-0 ml-3 opacity-70 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
