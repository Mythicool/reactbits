import { clsx } from 'clsx';

interface BadgeProps {
  text: string;
  color: string;
  size: 'sm' | 'md' | 'lg';
  variant: 'solid' | 'outline' | 'soft';
}

export function Badge({ text, color, size, variant }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium',
        {
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
          'px-3 py-1.5 text-base': size === 'lg',
          
          // Variants
          'text-white rounded-full': variant === 'solid',
          'border-2 rounded-full': variant === 'outline',
          'rounded-md': variant === 'soft',
        }
      )}
      style={{
        backgroundColor: variant === 'solid' ? color : variant === 'soft' ? `${color}20` : 'transparent',
        borderColor: variant === 'outline' ? color : 'transparent',
        color: variant === 'solid' ? 'white' : color,
      }}
    >
      {text}
    </span>
  );
}
