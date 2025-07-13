import { clsx } from 'clsx';

interface ProgressProps {
  value: number;
  max: number;
  size: 'sm' | 'md' | 'lg';
  color: string;
  showLabel: boolean;
  animated: boolean;
  striped: boolean;
}

export function Progress({ value, max, size, color, showLabel, animated, striped }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {value}/{max} ({Math.round(percentage)}%)
          </span>
        </div>
      )}
      
      <div
        className={clsx(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          {
            'h-2': size === 'sm',
            'h-3': size === 'md',
            'h-4': size === 'lg',
          }
        )}
      >
        <div
          className={clsx(
            'h-full transition-all duration-300 ease-out rounded-full',
            {
              'bg-gradient-to-r from-white/20 to-transparent bg-[length:20px_100%] animate-pulse': striped && animated,
              'bg-gradient-to-r from-white/20 to-transparent bg-[length:20px_100%]': striped && !animated,
            }
          )}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            backgroundImage: striped ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' : undefined,
          }}
        />
      </div>
    </div>
  );
}
