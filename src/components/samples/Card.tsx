import { clsx } from 'clsx';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  shadow: 'none' | 'sm' | 'md' | 'lg';
  padding: number;
  borderRadius: number;
}

export function Card({ title, description, imageUrl, shadow, padding, borderRadius }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white border border-gray-200 overflow-hidden',
        {
          'shadow-none': shadow === 'none',
          'shadow-sm': shadow === 'sm',
          'shadow-md': shadow === 'md',
          'shadow-lg': shadow === 'lg',
        }
      )}
      style={{
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
          style={{ borderRadius: `${Math.max(0, borderRadius - 4)}px ${Math.max(0, borderRadius - 4)}px 0 0` }}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
