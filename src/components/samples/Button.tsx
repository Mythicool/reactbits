import { clsx } from 'clsx';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  rounded: boolean;
}

export function Button({ text, variant, size, disabled, rounded }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          // Variants
          'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500': variant === 'primary',
          'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500': variant === 'secondary',
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500': variant === 'outline',
          
          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          
          // Rounded
          'rounded-full': rounded,
          'rounded-md': !rounded,
          
          // Disabled
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
    >
      {text}
    </button>
  );
}
