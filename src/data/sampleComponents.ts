import { ComponentDefinition } from '@/types/component';
import { Button } from '@/components/samples/Button';
import { Card } from '@/components/samples/Card';
import { Badge } from '@/components/samples/Badge';
import { Modal } from '@/components/samples/Modal';
import { Alert } from '@/components/samples/Alert';
import { Progress } from '@/components/samples/Progress';

// ReactBits Text Animation Components
import { SplitText } from '@/components/reactbits/SplitText';
import { BlurText } from '@/components/reactbits/BlurText';
import { CircularText } from '@/components/reactbits/CircularText';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { TextPressure } from '@/components/reactbits/TextPressure';
import { CurvedLoop } from '@/components/reactbits/CurvedLoop';
import { FuzzyText } from '@/components/reactbits/FuzzyText';
import { GradientText } from '@/components/reactbits/GradientText';
import { TextTrail } from '@/components/reactbits/TextTrail';
import { FallingText } from '@/components/reactbits/FallingText';
import { TextCursor } from '@/components/reactbits/TextCursor';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { TrueFocus } from '@/components/reactbits/TrueFocus';
import { ScrollFloat } from '@/components/reactbits/ScrollFloat';
import { ScrollReveal } from '@/components/reactbits/ScrollReveal';
import { ASCIIText } from '@/components/reactbits/ASCIIText';
import { ScrambleText } from '@/components/reactbits/ScrambleText';
import { RotatingText } from '@/components/reactbits/RotatingText';
import { GlitchText } from '@/components/reactbits/GlitchText';
import { ScrollVelocity } from '@/components/reactbits/ScrollVelocity';
import { VariableProximity } from '@/components/reactbits/VariableProximity';
import { CountUp } from '@/components/reactbits/CountUp';

// ReactBits General Animation Components
import { AnimatedContent } from '@/components/reactbits/AnimatedContent';
import { FadeContent } from '@/components/reactbits/FadeContent';
import { PixelTransition } from '@/components/reactbits/PixelTransition';
import { GlareHover } from '@/components/reactbits/GlareHover';
import { MagnetLines } from '@/components/reactbits/MagnetLines';
import { ClickSpark } from '@/components/reactbits/ClickSpark';
import { Magnet } from '@/components/reactbits/Magnet';
import { PixelTrail } from '@/components/reactbits/PixelTrail';
import { Cubes } from '@/components/reactbits/Cubes';
import { MetallicPaint } from '@/components/reactbits/MetallicPaint';
import { Noise } from '@/components/reactbits/Noise';
import { Crosshair } from '@/components/reactbits/Crosshair';
import { ImageTrail } from '@/components/reactbits/ImageTrail';
import { Ribbons } from '@/components/reactbits/Ribbons';
import { SplashCursor } from '@/components/reactbits/SplashCursor';

function generateButtonCode(params: any): string {
  return `import { clsx } from 'clsx';

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

// Usage Example
<Button
  text="${params.text}"
  variant="${params.variant}"
  size="${params.size}"
  disabled={${params.disabled}}
  rounded={${params.rounded}}
/>`;
}

export const sampleComponents: ComponentDefinition[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'A customizable button component',
    category: 'Form',
    component: Button,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Click me',
        description: 'Button text content',
      },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'outline'],
        description: 'Button style variant',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Button size',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Disable the button',
      },
      {
        name: 'rounded',
        type: 'boolean',
        defaultValue: false,
        description: 'Use rounded corners',
      },
    ],
    codeTemplate: generateButtonCode,
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'A small status or label badge',
    category: 'Display',
    component: Badge,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'New',
        description: 'Badge text content',
      },
      {
        name: 'color',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'Badge color',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Badge size',
      },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'solid',
        options: ['solid', 'outline', 'soft'],
        description: 'Badge style variant',
      },
    ],
    codeTemplate: (params) => `import { clsx } from 'clsx';

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
        backgroundColor: variant === 'solid' ? color : variant === 'soft' ? \`\${color}20\` : 'transparent',
        borderColor: variant === 'outline' ? color : 'transparent',
        color: variant === 'solid' ? 'white' : color,
      }}
    >
      {text}
    </span>
  );
}

// Usage Example
<Badge
  text="${params.text}"
  color="${params.color}"
  size="${params.size}"
  variant="${params.variant}"
/>`,
  },
  {
    id: 'card',
    name: 'Card',
    description: 'A flexible card component',
    category: 'Layout',
    component: Card,
    parameters: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Card Title',
        description: 'Card title text',
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: 'This is a sample card description that shows how the component looks.',
        description: 'Card description text',
      },
      {
        name: 'imageUrl',
        type: 'string',
        defaultValue: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        description: 'Image URL for the card',
      },
      {
        name: 'shadow',
        type: 'select',
        defaultValue: 'md',
        options: ['none', 'sm', 'md', 'lg'],
        description: 'Card shadow size',
      },
      {
        name: 'padding',
        type: 'range',
        defaultValue: 16,
        min: 0,
        max: 32,
        step: 4,
        description: 'Card padding in pixels',
      },
      {
        name: 'borderRadius',
        type: 'range',
        defaultValue: 8,
        min: 0,
        max: 24,
        step: 2,
        description: 'Border radius in pixels',
      },
    ],
    codeTemplate: (params) => `import { clsx } from 'clsx';

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
        padding: \`\${padding}px\`,
        borderRadius: \`\${borderRadius}px\`,
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
          style={{
            borderRadius: \`\${Math.max(0, borderRadius - 4)}px \${Math.max(0, borderRadius - 4)}px 0 0\`
          }}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Usage Example
<Card
  title="${params.title}"
  description="${params.description}"
  imageUrl="${params.imageUrl}"
  shadow="${params.shadow}"
  padding={${params.padding}}
  borderRadius={${params.borderRadius}}
/>`,
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'A notification alert component',
    category: 'Feedback',
    component: Alert,
    parameters: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Alert Title',
        description: 'Alert title text',
      },
      {
        name: 'message',
        type: 'string',
        defaultValue: 'This is an alert message that provides important information to the user.',
        description: 'Alert message content',
      },
      {
        name: 'type',
        type: 'select',
        defaultValue: 'info',
        options: ['success', 'error', 'warning', 'info'],
        description: 'Alert type/severity',
      },
      {
        name: 'showIcon',
        type: 'boolean',
        defaultValue: true,
        description: 'Show alert icon',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        defaultValue: true,
        description: 'Show dismiss button',
      },
      {
        name: 'rounded',
        type: 'boolean',
        defaultValue: true,
        description: 'Use rounded corners',
      },
    ],
    codeTemplate: (params) => `<Alert
  title="${params.title}"
  message="${params.message}"
  type="${params.type}"
  showIcon={${params.showIcon}}
  dismissible={${params.dismissible}}
  rounded={${params.rounded}}
/>`,
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'A progress bar component',
    category: 'Feedback',
    component: Progress,
    parameters: [
      {
        name: 'value',
        type: 'range',
        defaultValue: 65,
        min: 0,
        max: 100,
        step: 1,
        description: 'Current progress value',
      },
      {
        name: 'max',
        type: 'number',
        defaultValue: 100,
        description: 'Maximum progress value',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Progress bar size',
      },
      {
        name: 'color',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'Progress bar color',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: true,
        description: 'Show progress label',
      },
      {
        name: 'animated',
        type: 'boolean',
        defaultValue: false,
        description: 'Animate stripes',
      },
      {
        name: 'striped',
        type: 'boolean',
        defaultValue: false,
        description: 'Show striped pattern',
      },
    ],
    codeTemplate: (params) => `<Progress
  value={${params.value}}
  max={${params.max}}
  size="${params.size}"
  color="${params.color}"
  showLabel={${params.showLabel}}
  animated={${params.animated}}
  striped={${params.striped}}
/>`,
  },
  {
    id: 'split-text',
    name: 'Split Text',
    description: 'Text splitting with character/word/line animations',
    category: 'Text Animations',
    component: SplitText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Hello World!',
        description: 'Text to animate',
      },
      {
        name: 'splitBy',
        type: 'select',
        defaultValue: 'character',
        options: ['character', 'word', 'line'],
        description: 'How to split the text',
      },
      {
        name: 'animationType',
        type: 'select',
        defaultValue: 'slideUp',
        options: ['fadeIn', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'rotate'],
        description: 'Animation type',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'delay',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 3,
        step: 0.1,
        description: 'Initial delay (seconds)',
      },
      {
        name: 'stagger',
        type: 'range',
        defaultValue: 0.05,
        min: 0,
        max: 0.5,
        step: 0.01,
        description: 'Stagger delay between elements',
      },
    ],
    codeTemplate: (params) => `<SplitText
  text="${params.text}"
  splitBy="${params.splitBy}"
  animationType="${params.animationType}"
  duration={${params.duration}}
  delay={${params.delay}}
  stagger={${params.stagger}}
/>`,
  },
  {
    id: 'blur-text',
    name: 'Blur Text',
    description: 'Text blur/unblur effects with various triggers',
    category: 'Text Animations',
    component: BlurText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Blur Effect Text',
        description: 'Text to blur/unblur',
      },
      {
        name: 'blurAmount',
        type: 'range',
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 1,
        description: 'Blur intensity (pixels)',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 0.8,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'delay',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 3,
        step: 0.1,
        description: 'Initial delay (seconds)',
      },
      {
        name: 'trigger',
        type: 'select',
        defaultValue: 'auto',
        options: ['auto', 'hover', 'click'],
        description: 'Animation trigger',
      },
      {
        name: 'direction',
        type: 'select',
        defaultValue: 'in',
        options: ['in', 'out', 'inOut'],
        description: 'Blur direction',
      },
    ],
    codeTemplate: (params) => `<BlurText
  text="${params.text}"
  blurAmount={${params.blurAmount}}
  duration={${params.duration}}
  delay={${params.delay}}
  trigger="${params.trigger}"
  direction="${params.direction}"
/>`,
  },
  {
    id: 'circular-text',
    name: 'Circular Text',
    description: 'Text arranged in circles with rotation',
    category: 'Text Animations',
    component: CircularText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'CIRCULAR TEXT ANIMATION • ',
        description: 'Text to arrange in circle',
      },
      {
        name: 'radius',
        type: 'range',
        defaultValue: 80,
        min: 30,
        max: 150,
        step: 5,
        description: 'Circle radius (pixels)',
      },
      {
        name: 'fontSize',
        type: 'range',
        defaultValue: 16,
        min: 8,
        max: 32,
        step: 1,
        description: 'Font size (pixels)',
      },
      {
        name: 'rotationSpeed',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 5,
        step: 0.1,
        description: 'Rotation speed',
      },
      {
        name: 'direction',
        type: 'select',
        defaultValue: 'clockwise',
        options: ['clockwise', 'counterclockwise'],
        description: 'Rotation direction',
      },
      {
        name: 'startAngle',
        type: 'range',
        defaultValue: 0,
        min: 0,
        max: 360,
        step: 15,
        description: 'Starting angle (degrees)',
      },
    ],
    codeTemplate: (params) => `<CircularText
  text="${params.text}"
  radius={${params.radius}}
  fontSize={${params.fontSize}}
  rotationSpeed={${params.rotationSpeed}}
  direction="${params.direction}"
  startAngle={${params.startAngle}}
/>`,
  },
  {
    id: 'shiny-text',
    name: 'Shiny Text',
    description: 'Metallic/gradient text effects with shine animation',
    category: 'Text Animations',
    component: ShinyText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'SHINY TEXT',
        description: 'Text to make shiny',
      },
      {
        name: 'shineColor',
        type: 'color',
        defaultValue: '#ffffff',
        description: 'Shine highlight color',
      },
      {
        name: 'baseColor',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'Base text color',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 5,
        step: 0.1,
        description: 'Shine duration (seconds)',
      },
      {
        name: 'delay',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 3,
        step: 0.1,
        description: 'Initial delay (seconds)',
      },
      {
        name: 'repeat',
        type: 'boolean',
        defaultValue: true,
        description: 'Repeat animation',
      },
      {
        name: 'shineWidth',
        type: 'range',
        defaultValue: 30,
        min: 10,
        max: 80,
        step: 5,
        description: 'Shine width (%)',
      },
      {
        name: 'angle',
        type: 'range',
        defaultValue: 45,
        min: 0,
        max: 180,
        step: 15,
        description: 'Shine angle (degrees)',
      },
    ],
    codeTemplate: (params) => `<ShinyText
  text="${params.text}"
  shineColor="${params.shineColor}"
  baseColor="${params.baseColor}"
  duration={${params.duration}}
  delay={${params.delay}}
  repeat={${params.repeat}}
  shineWidth={${params.shineWidth}}
  angle={${params.angle}}
/>`,
  },
  {
    id: 'text-pressure',
    name: 'Text Pressure',
    description: 'Pressure-sensitive text that responds to mouse interaction',
    category: 'Text Animations',
    component: TextPressure,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'PRESSURE TEXT',
        description: 'Text to make pressure-sensitive',
      },
      {
        name: 'pressureIntensity',
        type: 'range',
        defaultValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Pressure effect intensity',
      },
      {
        name: 'recoverySpeed',
        type: 'range',
        defaultValue: 0.3,
        min: 0.1,
        max: 1,
        step: 0.1,
        description: 'Recovery animation speed',
      },
      {
        name: 'maxScale',
        type: 'range',
        defaultValue: 1.5,
        min: 1,
        max: 3,
        step: 0.1,
        description: 'Maximum scale factor',
      },
      {
        name: 'minScale',
        type: 'range',
        defaultValue: 1,
        min: 0.5,
        max: 1.5,
        step: 0.1,
        description: 'Minimum scale factor',
      },
      {
        name: 'pressureRadius',
        type: 'range',
        defaultValue: 50,
        min: 20,
        max: 100,
        step: 5,
        description: 'Pressure effect radius (pixels)',
      },
    ],
    codeTemplate: (params) => `<TextPressure
  text="${params.text}"
  pressureIntensity={${params.pressureIntensity}}
  recoverySpeed={${params.recoverySpeed}}
  maxScale={${params.maxScale}}
  minScale={${params.minScale}}
  pressureRadius={${params.pressureRadius}}
/>`,
  },
  {
    id: 'curved-loop',
    name: 'Curved Loop',
    description: 'Text following curved paths with various animations',
    category: 'Text Animations',
    component: CurvedLoop,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'CURVED PATH',
        description: 'Text to animate along curve',
      },
      {
        name: 'pathType',
        type: 'select',
        defaultValue: 'sine',
        options: ['sine', 'circle', 'spiral', 'wave'],
        description: 'Type of curved path',
      },
      {
        name: 'amplitude',
        type: 'range',
        defaultValue: 50,
        min: 10,
        max: 150,
        step: 5,
        description: 'Curve amplitude',
      },
      {
        name: 'frequency',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Curve frequency',
      },
      {
        name: 'speed',
        type: 'range',
        defaultValue: 1,
        min: 0,
        max: 5,
        step: 0.1,
        description: 'Animation speed',
      },
      {
        name: 'fontSize',
        type: 'range',
        defaultValue: 20,
        min: 12,
        max: 48,
        step: 2,
        description: 'Font size (pixels)',
      },
    ],
    codeTemplate: (params) => `<CurvedLoop
  text="${params.text}"
  pathType="${params.pathType}"
  amplitude={${params.amplitude}}
  frequency={${params.frequency}}
  speed={${params.speed}}
  fontSize={${params.fontSize}}
/>`,
  },
  {
    id: 'fuzzy-text',
    name: 'Fuzzy Text',
    description: 'Fuzzy/glitch text effects with random distortions',
    category: 'Text Animations',
    component: FuzzyText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'GLITCH TEXT',
        description: 'Text to make fuzzy/glitchy',
      },
      {
        name: 'intensity',
        type: 'range',
        defaultValue: 5,
        min: 1,
        max: 20,
        step: 1,
        description: 'Glitch intensity',
      },
      {
        name: 'speed',
        type: 'range',
        defaultValue: 10,
        min: 1,
        max: 30,
        step: 1,
        description: 'Glitch speed (fps)',
      },
      {
        name: 'glitchChance',
        type: 'range',
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Probability of glitch per character',
      },
      {
        name: 'colorShift',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable color shifting',
      },
      {
        name: 'blurAmount',
        type: 'range',
        defaultValue: 2,
        min: 0,
        max: 10,
        step: 0.5,
        description: 'Blur amount during glitch',
      },
    ],
    codeTemplate: (params) => `<FuzzyText
  text="${params.text}"
  intensity={${params.intensity}}
  speed={${params.speed}}
  glitchChance={${params.glitchChance}}
  colorShift={${params.colorShift}}
  blurAmount={${params.blurAmount}}
/>`,
  },
  {
    id: 'gradient-text',
    name: 'Gradient Text',
    description: 'Gradient text animations with customizable colors',
    category: 'Text Animations',
    component: GradientText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'GRADIENT TEXT',
        description: 'Text to apply gradient to',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#ff0000,#00ff00,#0000ff',
        description: 'Gradient colors (comma-separated)',
      },
      {
        name: 'direction',
        type: 'range',
        defaultValue: 45,
        min: 0,
        max: 360,
        step: 15,
        description: 'Gradient direction (degrees)',
      },
      {
        name: 'animated',
        type: 'boolean',
        defaultValue: true,
        description: 'Animate gradient',
      },
      {
        name: 'speed',
        type: 'range',
        defaultValue: 2,
        min: 0.1,
        max: 10,
        step: 0.1,
        description: 'Animation speed',
      },
      {
        name: 'size',
        type: 'range',
        defaultValue: 32,
        min: 16,
        max: 72,
        step: 2,
        description: 'Font size (pixels)',
      },
    ],
    codeTemplate: (params) => `<GradientText
  text="${params.text}"
  colors={["${params.colors.split(',').join('", "')}"]}
  direction={${params.direction}}
  animated={${params.animated}}
  speed={${params.speed}}
  size={${params.size}}
/>`,
  },
  {
    id: 'text-trail',
    name: 'Text Trail',
    description: 'Trailing text effects that follow mouse or animate',
    category: 'Text Animations',
    component: TextTrail,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'TRAIL TEXT',
        description: 'Text to create trail effect',
      },
      {
        name: 'trailLength',
        type: 'range',
        defaultValue: 5,
        min: 2,
        max: 15,
        step: 1,
        description: 'Number of trail elements',
      },
      {
        name: 'trailOpacity',
        type: 'range',
        defaultValue: 0.7,
        min: 0.1,
        max: 1,
        step: 0.1,
        description: 'Trail opacity',
      },
      {
        name: 'trailColor',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'Trail color',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        defaultValue: true,
        description: 'Follow mouse cursor',
      },
      {
        name: 'trailDelay',
        type: 'range',
        defaultValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Trail fade delay (seconds)',
      },
    ],
    codeTemplate: (params) => `<TextTrail
  text="${params.text}"
  trailLength={${params.trailLength}}
  trailOpacity={${params.trailOpacity}}
  trailColor="${params.trailColor}"
  followMouse={${params.followMouse}}
  trailDelay={${params.trailDelay}}
/>`,
  },
  {
    id: 'falling-text',
    name: 'Falling Text',
    description: 'Falling/dropping text with gravity and bounce effects',
    category: 'Text Animations',
    component: FallingText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'FALLING TEXT',
        description: 'Text to animate falling',
      },
      {
        name: 'fallHeight',
        type: 'range',
        defaultValue: 200,
        min: 50,
        max: 500,
        step: 25,
        description: 'Fall height (pixels)',
      },
      {
        name: 'fallDuration',
        type: 'range',
        defaultValue: 1.5,
        min: 0.5,
        max: 5,
        step: 0.1,
        description: 'Fall duration (seconds)',
      },
      {
        name: 'stagger',
        type: 'range',
        defaultValue: 0.1,
        min: 0,
        max: 0.5,
        step: 0.05,
        description: 'Stagger delay between characters',
      },
      {
        name: 'bounce',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable bounce effect',
      },
      {
        name: 'gravity',
        type: 'range',
        defaultValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Gravity strength',
      },
      {
        name: 'rotation',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable rotation during fall',
      },
    ],
    codeTemplate: (params) => `<FallingText
  text="${params.text}"
  fallHeight={${params.fallHeight}}
  fallDuration={${params.fallDuration}}
  stagger={${params.stagger}}
  bounce={${params.bounce}}
  gravity={${params.gravity}}
  rotation={${params.rotation}}
/>`,
  },
  {
    id: 'text-cursor',
    name: 'Text Cursor',
    description: 'Typing cursor effects with customizable animation',
    category: 'Text Animations',
    component: TextCursor,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Hello, World!',
        description: 'Text to type out',
      },
      {
        name: 'typingSpeed',
        type: 'range',
        defaultValue: 100,
        min: 50,
        max: 500,
        step: 25,
        description: 'Typing speed (ms per character)',
      },
      {
        name: 'cursorChar',
        type: 'string',
        defaultValue: '|',
        description: 'Cursor character',
      },
      {
        name: 'cursorColor',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'Cursor color',
      },
      {
        name: 'blinkSpeed',
        type: 'range',
        defaultValue: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1,
        description: 'Cursor blink speed (seconds)',
      },
      {
        name: 'showCursor',
        type: 'boolean',
        defaultValue: true,
        description: 'Show blinking cursor',
      },
      {
        name: 'loop',
        type: 'boolean',
        defaultValue: true,
        description: 'Loop typing animation',
      },
      {
        name: 'deleteSpeed',
        type: 'range',
        defaultValue: 50,
        min: 25,
        max: 200,
        step: 25,
        description: 'Delete speed (ms per character)',
      },
    ],
    codeTemplate: (params) => `<TextCursor
  text="${params.text}"
  typingSpeed={${params.typingSpeed}}
  cursorChar="${params.cursorChar}"
  cursorColor="${params.cursorColor}"
  blinkSpeed={${params.blinkSpeed}}
  showCursor={${params.showCursor}}
  loop={${params.loop}}
  deleteSpeed={${params.deleteSpeed}}
/>`,
  },
  {
    id: 'decrypted-text',
    name: 'Decrypted Text',
    description: 'Decryption animations with scrambled characters',
    category: 'Text Animations',
    component: DecryptedText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'CLASSIFIED',
        description: 'Text to decrypt',
      },
      {
        name: 'decryptSpeed',
        type: 'range',
        defaultValue: 50,
        min: 10,
        max: 200,
        step: 10,
        description: 'Decryption speed (ms)',
      },
      {
        name: 'scrambleChars',
        type: 'string',
        defaultValue: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        description: 'Characters used for scrambling',
      },
      {
        name: 'iterations',
        type: 'range',
        defaultValue: 3,
        min: 1,
        max: 10,
        step: 1,
        description: 'Scramble iterations per character',
      },
      {
        name: 'delay',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 3,
        step: 0.1,
        description: 'Initial delay (seconds)',
      },
      {
        name: 'trigger',
        type: 'select',
        defaultValue: 'auto',
        options: ['auto', 'hover', 'click'],
        description: 'Animation trigger',
      },
    ],
    codeTemplate: (params) => `<DecryptedText
  text="${params.text}"
  decryptSpeed={${params.decryptSpeed}}
  scrambleChars="${params.scrambleChars}"
  iterations={${params.iterations}}
  delay={${params.delay}}
  trigger="${params.trigger}"
/>`,
  },
  {
    id: 'true-focus',
    name: 'True Focus',
    description: 'Focus-based text effects with blur and highlighting',
    category: 'Text Animations',
    component: TrueFocus,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'FOCUS TEXT',
        description: 'Text to apply focus effect',
      },
      {
        name: 'focusRadius',
        type: 'range',
        defaultValue: 50,
        min: 20,
        max: 150,
        step: 10,
        description: 'Focus radius (pixels)',
      },
      {
        name: 'blurIntensity',
        type: 'range',
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 1,
        description: 'Blur intensity for unfocused text',
      },
      {
        name: 'focusIntensity',
        type: 'range',
        defaultValue: 1.5,
        min: 1,
        max: 3,
        step: 0.1,
        description: 'Brightness multiplier for focused text',
      },
      {
        name: 'transitionSpeed',
        type: 'range',
        defaultValue: 0.3,
        min: 0.1,
        max: 1,
        step: 0.1,
        description: 'Transition speed (seconds)',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        defaultValue: true,
        description: 'Follow mouse cursor',
      },
    ],
    codeTemplate: (params) => `<TrueFocus
  text="${params.text}"
  focusRadius={${params.focusRadius}}
  blurIntensity={${params.blurIntensity}}
  focusIntensity={${params.focusIntensity}}
  transitionSpeed={${params.transitionSpeed}}
  followMouse={${params.followMouse}}
/>`,
  },
  {
    id: 'scroll-float',
    name: 'Scroll Float',
    description: 'Scroll-triggered floating animations',
    category: 'Text Animations',
    component: ScrollFloat,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'SCROLL FLOAT',
        description: 'Text to animate on scroll',
      },
      {
        name: 'floatIntensity',
        type: 'range',
        defaultValue: 100,
        min: 20,
        max: 300,
        step: 20,
        description: 'Float distance (pixels)',
      },
      {
        name: 'rotationIntensity',
        type: 'range',
        defaultValue: 15,
        min: 0,
        max: 90,
        step: 5,
        description: 'Rotation intensity (degrees)',
      },
      {
        name: 'scaleIntensity',
        type: 'range',
        defaultValue: 0.2,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Scale intensity',
      },
      {
        name: 'stagger',
        type: 'range',
        defaultValue: 0.1,
        min: 0,
        max: 0.5,
        step: 0.05,
        description: 'Stagger delay between characters',
      },
      {
        name: 'direction',
        type: 'select',
        defaultValue: 'up',
        options: ['up', 'down', 'left', 'right'],
        description: 'Float direction',
      },
    ],
    codeTemplate: (params) => `<ScrollFloat
  text="${params.text}"
  floatIntensity={${params.floatIntensity}}
  rotationIntensity={${params.rotationIntensity}}
  scaleIntensity={${params.scaleIntensity}}
  stagger={${params.stagger}}
  direction="${params.direction}"
/>`,
  },
  {
    id: 'scroll-reveal',
    name: 'Scroll Reveal',
    description: 'Scroll-triggered reveal animations',
    category: 'Text Animations',
    component: ScrollReveal,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'SCROLL REVEAL',
        description: 'Text to reveal on scroll',
      },
      {
        name: 'revealType',
        type: 'select',
        defaultValue: 'slideUp',
        options: ['fadeIn', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'rotate', 'clip'],
        description: 'Reveal animation type',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 0.6,
        min: 0.2,
        max: 2,
        step: 0.1,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'stagger',
        type: 'range',
        defaultValue: 0.1,
        min: 0,
        max: 0.5,
        step: 0.05,
        description: 'Stagger delay between characters',
      },
      {
        name: 'threshold',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Scroll threshold to trigger (0-1)',
      },
      {
        name: 'once',
        type: 'boolean',
        defaultValue: true,
        description: 'Animate only once',
      },
    ],
    codeTemplate: (params) => `<ScrollReveal
  text="${params.text}"
  revealType="${params.revealType}"
  duration={${params.duration}}
  stagger={${params.stagger}}
  threshold={${params.threshold}}
  once={${params.once}}
/>`,
  },
  {
    id: 'ascii-text',
    name: 'ASCII Text',
    description: 'ASCII art text with various fonts and animations',
    category: 'Text Animations',
    component: ASCIIText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'ASCII',
        description: 'Text to convert to ASCII art',
      },
      {
        name: 'font',
        type: 'select',
        defaultValue: 'block',
        options: ['block', 'slant', 'shadow', 'bubble', 'digital'],
        description: 'ASCII font style',
      },
      {
        name: 'animationType',
        type: 'select',
        defaultValue: 'typewriter',
        options: ['typewriter', 'fadeIn', 'slideUp', 'glitch'],
        description: 'Animation type',
      },
      {
        name: 'speed',
        type: 'range',
        defaultValue: 50,
        min: 10,
        max: 200,
        step: 10,
        description: 'Animation speed (ms)',
      },
      {
        name: 'color',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'ASCII text color',
      },
    ],
    codeTemplate: (params) => `<ASCIIText
  text="${params.text}"
  font="${params.font}"
  animationType="${params.animationType}"
  speed={${params.speed}}
  color="${params.color}"
/>`,
  },
  {
    id: 'scramble-text',
    name: 'Scramble Text',
    description: 'Text scrambling effects with character randomization',
    category: 'Text Animations',
    component: ScrambleText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'SCRAMBLED',
        description: 'Text to scramble',
      },
      {
        name: 'scrambleSpeed',
        type: 'range',
        defaultValue: 50,
        min: 10,
        max: 200,
        step: 10,
        description: 'Scramble speed (ms)',
      },
      {
        name: 'revealSpeed',
        type: 'range',
        defaultValue: 100,
        min: 50,
        max: 500,
        step: 25,
        description: 'Reveal speed (ms per character)',
      },
      {
        name: 'scrambleChars',
        type: 'string',
        defaultValue: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        description: 'Characters used for scrambling',
      },
      {
        name: 'trigger',
        type: 'select',
        defaultValue: 'auto',
        options: ['auto', 'hover', 'click'],
        description: 'Animation trigger',
      },
      {
        name: 'loop',
        type: 'boolean',
        defaultValue: true,
        description: 'Loop animation',
      },
    ],
    codeTemplate: (params) => `<ScrambleText
  text="${params.text}"
  scrambleSpeed={${params.scrambleSpeed}}
  revealSpeed={${params.revealSpeed}}
  scrambleChars="${params.scrambleChars}"
  trigger="${params.trigger}"
  loop={${params.loop}}
/>`,
  },
  {
    id: 'rotating-text',
    name: 'Rotating Text',
    description: 'Rotating text elements with multiple transition effects',
    category: 'Text Animations',
    component: RotatingText,
    parameters: [
      {
        name: 'words',
        type: 'string',
        defaultValue: 'Amazing,Incredible,Fantastic,Awesome',
        description: 'Words to rotate (comma-separated)',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Duration per word (seconds)',
      },
      {
        name: 'transitionType',
        type: 'select',
        defaultValue: 'slideUp',
        options: ['fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'rotate'],
        description: 'Transition animation type',
      },
      {
        name: 'loop',
        type: 'boolean',
        defaultValue: true,
        description: 'Loop through words',
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        defaultValue: true,
        description: 'Pause animation on hover',
      },
    ],
    codeTemplate: (params) => `<RotatingText
  words={["${params.words.split(',').join('", "')}"]}
  duration={${params.duration}}
  transitionType="${params.transitionType}"
  loop={${params.loop}}
  pauseOnHover={${params.pauseOnHover}}
/>`,
  },
  {
    id: 'glitch-text',
    name: 'Glitch Text',
    description: 'Glitch/distortion effects with color shifting and corruption',
    category: 'Text Animations',
    component: GlitchText,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'GLITCH',
        description: 'Text to apply glitch effect',
      },
      {
        name: 'intensity',
        type: 'range',
        defaultValue: 5,
        min: 1,
        max: 20,
        step: 1,
        description: 'Glitch intensity',
      },
      {
        name: 'speed',
        type: 'range',
        defaultValue: 20,
        min: 5,
        max: 60,
        step: 5,
        description: 'Glitch speed (fps)',
      },
      {
        name: 'colorGlitch',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable color glitch effects',
      },
      {
        name: 'dataCorruption',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable character corruption',
      },
      {
        name: 'trigger',
        type: 'select',
        defaultValue: 'auto',
        options: ['auto', 'hover', 'click'],
        description: 'Animation trigger',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Glitch duration (seconds)',
      },
    ],
    codeTemplate: (params) => `<GlitchText
  text="${params.text}"
  intensity={${params.intensity}}
  speed={${params.speed}}
  colorGlitch={${params.colorGlitch}}
  dataCorruption={${params.dataCorruption}}
  trigger="${params.trigger}"
  duration={${params.duration}}
/>`,
  },
  {
    id: 'scroll-velocity',
    name: 'Scroll Velocity',
    description: 'Velocity-based scroll effects with dynamic transformations',
    category: 'Text Animations',
    component: ScrollVelocity,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'VELOCITY',
        description: 'Text to animate based on scroll velocity',
      },
      {
        name: 'velocityMultiplier',
        type: 'range',
        defaultValue: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        description: 'Velocity effect multiplier',
      },
      {
        name: 'maxScale',
        type: 'range',
        defaultValue: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        description: 'Maximum scale change',
      },
      {
        name: 'maxRotation',
        type: 'range',
        defaultValue: 15,
        min: 0,
        max: 90,
        step: 5,
        description: 'Maximum rotation (degrees)',
      },
      {
        name: 'maxBlur',
        type: 'range',
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 1,
        description: 'Maximum blur (pixels)',
      },
      {
        name: 'direction',
        type: 'select',
        defaultValue: 'vertical',
        options: ['horizontal', 'vertical'],
        description: 'Scroll direction to track',
      },
      {
        name: 'smoothing',
        type: 'range',
        defaultValue: 30,
        min: 10,
        max: 100,
        step: 5,
        description: 'Animation smoothing',
      },
    ],
    codeTemplate: (params) => `<ScrollVelocity
  text="${params.text}"
  velocityMultiplier={${params.velocityMultiplier}}
  maxScale={${params.maxScale}}
  maxRotation={${params.maxRotation}}
  maxBlur={${params.maxBlur}}
  direction="${params.direction}"
  smoothing={${params.smoothing}}
/>`,
  },
  {
    id: 'variable-proximity',
    name: 'Variable Proximity',
    description: 'Proximity-based effects with magnetic and ripple interactions',
    category: 'Text Animations',
    component: VariableProximity,
    parameters: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'PROXIMITY',
        description: 'Text to apply proximity effects',
      },
      {
        name: 'proximityRadius',
        type: 'range',
        defaultValue: 80,
        min: 30,
        max: 200,
        step: 10,
        description: 'Proximity detection radius (pixels)',
      },
      {
        name: 'maxScale',
        type: 'range',
        defaultValue: 1.5,
        min: 1,
        max: 3,
        step: 0.1,
        description: 'Maximum scale factor',
      },
      {
        name: 'maxRotation',
        type: 'range',
        defaultValue: 15,
        min: 0,
        max: 90,
        step: 5,
        description: 'Maximum rotation (degrees)',
      },
      {
        name: 'colorShift',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable color shifting',
      },
      {
        name: 'magneticEffect',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable magnetic attraction',
      },
      {
        name: 'rippleEffect',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable click ripple effects',
      },
    ],
    codeTemplate: (params) => `<VariableProximity
  text="${params.text}"
  proximityRadius={${params.proximityRadius}}
  maxScale={${params.maxScale}}
  maxRotation={${params.maxRotation}}
  colorShift={${params.colorShift}}
  magneticEffect={${params.magneticEffect}}
  rippleEffect={${params.rippleEffect}}
/>`,
  },
  {
    id: 'count-up',
    name: 'Count Up',
    description: 'Number counting animations with formatting and triggers',
    category: 'Text Animations',
    component: CountUp,
    parameters: [
      {
        name: 'start',
        type: 'number',
        defaultValue: 0,
        description: 'Starting number',
      },
      {
        name: 'end',
        type: 'number',
        defaultValue: 1000,
        description: 'Ending number',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'decimals',
        type: 'range',
        defaultValue: 0,
        min: 0,
        max: 3,
        step: 1,
        description: 'Decimal places',
      },
      {
        name: 'prefix',
        type: 'string',
        defaultValue: '$',
        description: 'Number prefix',
      },
      {
        name: 'suffix',
        type: 'string',
        defaultValue: '',
        description: 'Number suffix',
      },
      {
        name: 'separator',
        type: 'string',
        defaultValue: ',',
        description: 'Thousand separator',
      },
      {
        name: 'trigger',
        type: 'select',
        defaultValue: 'auto',
        options: ['auto', 'scroll', 'hover', 'click'],
        description: 'Animation trigger',
      },
      {
        name: 'easing',
        type: 'select',
        defaultValue: 'easeOut',
        options: ['linear', 'easeIn', 'easeOut', 'easeInOut'],
        description: 'Easing function',
      },
    ],
    codeTemplate: (params) => `<CountUp
  start={${params.start}}
  end={${params.end}}
  duration={${params.duration}}
  decimals={${params.decimals}}
  prefix="${params.prefix}"
  suffix="${params.suffix}"
  separator="${params.separator}"
  trigger="${params.trigger}"
  easing="${params.easing}"
/>`,
  },
  {
    id: 'animated-content',
    name: 'Animated Content',
    description: 'General content animations with various triggers and effects',
    category: 'Animations',
    component: AnimatedContent,
    parameters: [
      {
        name: 'children',
        type: 'string',
        defaultValue: 'Animated Content',
        description: 'Content to animate',
      },
      {
        name: 'animationType',
        type: 'select',
        defaultValue: 'fadeIn',
        options: ['fadeIn', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'rotate', 'bounce'],
        description: 'Animation type',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 0.6,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'delay',
        type: 'range',
        defaultValue: 0,
        min: 0,
        max: 3,
        step: 0.1,
        description: 'Animation delay (seconds)',
      },
      {
        name: 'repeat',
        type: 'boolean',
        defaultValue: false,
        description: 'Repeat animation',
      },
      {
        name: 'repeatDelay',
        type: 'range',
        defaultValue: 1,
        min: 0,
        max: 5,
        step: 0.1,
        description: 'Delay between repeats (seconds)',
      },
      {
        name: 'trigger',
        type: 'select',
        defaultValue: 'auto',
        options: ['auto', 'hover', 'click'],
        description: 'Animation trigger',
      },
    ],
    codeTemplate: (params) => `<AnimatedContent
  animationType="${params.animationType}"
  duration={${params.duration}}
  delay={${params.delay}}
  repeat={${params.repeat}}
  repeatDelay={${params.repeatDelay}}
  trigger="${params.trigger}"
>
  ${params.children}
</AnimatedContent>`,
  },
  {
    id: 'fade-content',
    name: 'Fade Content',
    description: 'Fade in/out animations with scroll triggers and stagger effects',
    category: 'Animations',
    component: FadeContent,
    parameters: [
      {
        name: 'children',
        type: 'string',
        defaultValue: 'Fade Content',
        description: 'Content to fade',
      },
      {
        name: 'direction',
        type: 'select',
        defaultValue: 'in',
        options: ['in', 'out', 'inOut'],
        description: 'Fade direction',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 0.8,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'delay',
        type: 'range',
        defaultValue: 0,
        min: 0,
        max: 3,
        step: 0.1,
        description: 'Animation delay (seconds)',
      },
      {
        name: 'threshold',
        type: 'range',
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Scroll threshold (0-1)',
      },
      {
        name: 'once',
        type: 'boolean',
        defaultValue: true,
        description: 'Animate only once',
      },
      {
        name: 'stagger',
        type: 'range',
        defaultValue: 0,
        min: 0,
        max: 0.5,
        step: 0.05,
        description: 'Character stagger delay',
      },
    ],
    codeTemplate: (params) => `<FadeContent
  direction="${params.direction}"
  duration={${params.duration}}
  delay={${params.delay}}
  threshold={${params.threshold}}
  once={${params.once}}
  stagger={${params.stagger}}
>
  ${params.children}
</FadeContent>`,
  },
  {
    id: 'pixel-transition',
    name: 'Pixel Transition',
    description: 'Pixel-based transitions with customizable patterns and colors',
    category: 'Animations',
    component: PixelTransition,
    parameters: [
      {
        name: 'content',
        type: 'string',
        defaultValue: 'PIXEL',
        description: 'Content to display',
      },
      {
        name: 'pixelSize',
        type: 'range',
        defaultValue: 8,
        min: 4,
        max: 20,
        step: 2,
        description: 'Pixel size (pixels)',
      },
      {
        name: 'gridWidth',
        type: 'range',
        defaultValue: 20,
        min: 10,
        max: 40,
        step: 2,
        description: 'Grid width (pixels)',
      },
      {
        name: 'gridHeight',
        type: 'range',
        defaultValue: 15,
        min: 8,
        max: 30,
        step: 2,
        description: 'Grid height (pixels)',
      },
      {
        name: 'transitionSpeed',
        type: 'range',
        defaultValue: 20,
        min: 5,
        max: 100,
        step: 5,
        description: 'Transition speed (ms)',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#ff0000,#00ff00,#0000ff,#ffff00',
        description: 'Colors (comma-separated)',
      },
      {
        name: 'pattern',
        type: 'select',
        defaultValue: 'random',
        options: ['random', 'wave', 'spiral', 'diagonal'],
        description: 'Animation pattern',
      },
      {
        name: 'autoPlay',
        type: 'boolean',
        defaultValue: true,
        description: 'Auto-play animation',
      },
    ],
    codeTemplate: (params) => `<PixelTransition
  content="${params.content}"
  pixelSize={${params.pixelSize}}
  gridWidth={${params.gridWidth}}
  gridHeight={${params.gridHeight}}
  transitionSpeed={${params.transitionSpeed}}
  colors={["${params.colors.split(',').join('", "')}"]}
  pattern="${params.pattern}"
  autoPlay={${params.autoPlay}}
/>`,
  },
  {
    id: 'glare-hover',
    name: 'Glare Hover',
    description: 'Glare effects on hover with 3D transformations',
    category: 'Animations',
    component: GlareHover,
    parameters: [
      {
        name: 'children',
        type: 'string',
        defaultValue: 'Hover for Glare',
        description: 'Content to apply glare effect',
      },
      {
        name: 'glareColor',
        type: 'color',
        defaultValue: '#ffffff',
        description: 'Glare color',
      },
      {
        name: 'glareOpacity',
        type: 'range',
        defaultValue: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Glare opacity',
      },
      {
        name: 'glareSize',
        type: 'range',
        defaultValue: 50,
        min: 20,
        max: 100,
        step: 5,
        description: 'Glare size (%)',
      },
      {
        name: 'rotationIntensity',
        type: 'range',
        defaultValue: 10,
        min: 0,
        max: 30,
        step: 2,
        description: 'Rotation intensity (degrees)',
      },
      {
        name: 'scaleOnHover',
        type: 'range',
        defaultValue: 1.05,
        min: 1,
        max: 1.3,
        step: 0.05,
        description: 'Scale on hover',
      },
      {
        name: 'borderRadius',
        type: 'range',
        defaultValue: 8,
        min: 0,
        max: 50,
        step: 2,
        description: 'Border radius (pixels)',
      },
    ],
    codeTemplate: (params) => `<GlareHover
  glareColor="${params.glareColor}"
  glareOpacity={${params.glareOpacity}}
  glareSize={${params.glareSize}}
  rotationIntensity={${params.rotationIntensity}}
  scaleOnHover={${params.scaleOnHover}}
  borderRadius={${params.borderRadius}}
>
  <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
    ${params.children}
  </div>
</GlareHover>`,
  },
  {
    id: 'magnet-lines',
    name: 'Magnet Lines',
    description: 'Magnetic line effects with interactive mouse attraction',
    category: 'Animations',
    component: MagnetLines,
    parameters: [
      {
        name: 'lineCount',
        type: 'range',
        defaultValue: 20,
        min: 5,
        max: 50,
        step: 5,
        description: 'Number of lines',
      },
      {
        name: 'lineColor',
        type: 'color',
        defaultValue: '#3b82f6',
        description: 'Line color',
      },
      {
        name: 'lineWidth',
        type: 'range',
        defaultValue: 2,
        min: 1,
        max: 8,
        step: 1,
        description: 'Line width (pixels)',
      },
      {
        name: 'magnetStrength',
        type: 'range',
        defaultValue: 20,
        min: 5,
        max: 50,
        step: 5,
        description: 'Magnetic attraction strength',
      },
      {
        name: 'animationSpeed',
        type: 'range',
        defaultValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
        description: 'Animation speed (seconds)',
      },
      {
        name: 'pattern',
        type: 'select',
        defaultValue: 'radial',
        options: ['radial', 'grid', 'spiral', 'wave'],
        description: 'Line pattern',
      },
      {
        name: 'interactive',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable mouse interaction',
      },
    ],
    codeTemplate: (params) => `<MagnetLines
  lineCount={${params.lineCount}}
  lineColor="${params.lineColor}"
  lineWidth={${params.lineWidth}}
  magnetStrength={${params.magnetStrength}}
  animationSpeed={${params.animationSpeed}}
  pattern="${params.pattern}"
  interactive={${params.interactive}}
/>`,
  },
  {
    id: 'click-spark',
    name: 'Click Spark',
    description: 'Click-triggered spark/particle effects with customizable properties',
    category: 'Animations',
    component: ClickSpark,
    parameters: [
      {
        name: 'particleCount',
        type: 'range',
        defaultValue: 15,
        min: 5,
        max: 50,
        step: 5,
        description: 'Number of particles per click',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#ff6b6b,#4ecdc4,#45b7d1,#f9ca24,#f0932b',
        description: 'Particle colors (comma-separated)',
      },
      {
        name: 'spreadRadius',
        type: 'range',
        defaultValue: 100,
        min: 50,
        max: 300,
        step: 25,
        description: 'Particle spread radius',
      },
      {
        name: 'duration',
        type: 'range',
        defaultValue: 1.5,
        min: 0.5,
        max: 5,
        step: 0.5,
        description: 'Animation duration (seconds)',
      },
      {
        name: 'particleSize',
        type: 'range',
        defaultValue: 8,
        min: 4,
        max: 20,
        step: 2,
        description: 'Particle size (pixels)',
      },
      {
        name: 'sparkType',
        type: 'select',
        defaultValue: 'circle',
        options: ['circle', 'star', 'square', 'triangle'],
        description: 'Particle shape',
      },
      {
        name: 'gravity',
        type: 'boolean',
        defaultValue: true,
        description: 'Apply gravity effect',
      },
    ],
    codeTemplate: (params) => `<ClickSpark
  particleCount={${params.particleCount}}
  colors={["${params.colors.split(',').join('", "')}"]}
  spreadRadius={${params.spreadRadius}}
  duration={${params.duration}}
  particleSize={${params.particleSize}}
  sparkType="${params.sparkType}"
  gravity={${params.gravity}}
/>`,
  },
  {
    id: 'magnet',
    name: 'Magnet',
    description: 'Magnetic attraction effects with configurable strength and radius',
    category: 'Animations',
    component: Magnet,
    parameters: [
      {
        name: 'children',
        type: 'string',
        defaultValue: 'Magnetic Element',
        description: 'Content to make magnetic',
      },
      {
        name: 'attractionStrength',
        type: 'range',
        defaultValue: 0.3,
        min: 0.1,
        max: 1,
        step: 0.1,
        description: 'Magnetic attraction strength',
      },
      {
        name: 'attractionRadius',
        type: 'range',
        defaultValue: 100,
        min: 50,
        max: 300,
        step: 25,
        description: 'Attraction radius (pixels)',
      },
      {
        name: 'returnSpeed',
        type: 'range',
        defaultValue: 20,
        min: 5,
        max: 50,
        step: 5,
        description: 'Return animation speed',
      },
      {
        name: 'rotationIntensity',
        type: 'range',
        defaultValue: 10,
        min: 0,
        max: 50,
        step: 5,
        description: 'Rotation intensity',
      },
      {
        name: 'scaleIntensity',
        type: 'range',
        defaultValue: 10,
        min: 0,
        max: 50,
        step: 5,
        description: 'Scale intensity',
      },
      {
        name: 'magneticField',
        type: 'boolean',
        defaultValue: true,
        description: 'Show magnetic field visualization',
      },
    ],
    codeTemplate: (params) => `<Magnet
  attractionStrength={${params.attractionStrength}}
  attractionRadius={${params.attractionRadius}}
  returnSpeed={${params.returnSpeed}}
  rotationIntensity={${params.rotationIntensity}}
  scaleIntensity={${params.scaleIntensity}}
  magneticField={${params.magneticField}}
>
  <div className="p-4 bg-blue-500 text-white rounded-lg font-bold">
    ${params.children}
  </div>
</Magnet>`,
  },
  {
    id: 'pixel-trail',
    name: 'Pixel Trail',
    description: 'Trailing pixel effects with mouse tracking and auto animation',
    category: 'Animations',
    component: PixelTrail,
    parameters: [
      {
        name: 'trailLength',
        type: 'range',
        defaultValue: 20,
        min: 5,
        max: 50,
        step: 5,
        description: 'Maximum trail length',
      },
      {
        name: 'pixelSize',
        type: 'range',
        defaultValue: 6,
        min: 2,
        max: 20,
        step: 2,
        description: 'Pixel size',
      },
      {
        name: 'fadeSpeed',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 5,
        step: 0.5,
        description: 'Fade duration (seconds)',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#ff0080,#00ff80,#8000ff,#ff8000',
        description: 'Pixel colors (comma-separated)',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        defaultValue: true,
        description: 'Follow mouse movement',
      },
      {
        name: 'autoAnimate',
        type: 'boolean',
        defaultValue: false,
        description: 'Auto animation mode',
      },
      {
        name: 'trailShape',
        type: 'select',
        defaultValue: 'circle',
        options: ['square', 'circle', 'diamond'],
        description: 'Pixel shape',
      },
      {
        name: 'blendMode',
        type: 'select',
        defaultValue: 'normal',
        options: ['normal', 'multiply', 'screen', 'overlay'],
        description: 'Blend mode',
      },
    ],
    codeTemplate: (params) => `<PixelTrail
  trailLength={${params.trailLength}}
  pixelSize={${params.pixelSize}}
  fadeSpeed={${params.fadeSpeed}}
  colors={["${params.colors.split(',').join('", "')}"]}
  followMouse={${params.followMouse}}
  autoAnimate={${params.autoAnimate}}
  trailShape="${params.trailShape}"
  blendMode="${params.blendMode}"
/>`,
  },
  {
    id: 'cubes',
    name: 'Cubes',
    description: '3D cube animations with rotation, scaling, and arrangement patterns',
    category: 'Animations',
    component: Cubes,
    parameters: [
      {
        name: 'cubeCount',
        type: 'range',
        defaultValue: 12,
        min: 4,
        max: 30,
        step: 2,
        description: 'Number of cubes',
      },
      {
        name: 'cubeSize',
        type: 'range',
        defaultValue: 30,
        min: 15,
        max: 60,
        step: 5,
        description: 'Cube size (pixels)',
      },
      {
        name: 'rotationSpeed',
        type: 'range',
        defaultValue: 4,
        min: 1,
        max: 10,
        step: 1,
        description: 'Rotation speed (seconds)',
      },
      {
        name: 'scaleVariation',
        type: 'range',
        defaultValue: 20,
        min: 0,
        max: 50,
        step: 5,
        description: 'Scale variation (%)',
      },
      {
        name: 'colorTransition',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable color transitions',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#e74c3c,#3498db,#2ecc71,#f39c12,#9b59b6',
        description: 'Cube colors (comma-separated)',
      },
      {
        name: 'arrangement',
        type: 'select',
        defaultValue: 'grid',
        options: ['grid', 'spiral', 'random', 'wave'],
        description: 'Cube arrangement pattern',
      },
      {
        name: 'animationDelay',
        type: 'range',
        defaultValue: 0.1,
        min: 0,
        max: 0.5,
        step: 0.05,
        description: 'Animation delay between cubes',
      },
    ],
    codeTemplate: (params) => `<Cubes
  cubeCount={${params.cubeCount}}
  cubeSize={${params.cubeSize}}
  rotationSpeed={${params.rotationSpeed}}
  scaleVariation={${params.scaleVariation}}
  colorTransition={${params.colorTransition}}
  colors={["${params.colors.split(',').join('", "')}"]}
  arrangement="${params.arrangement}"
  animationDelay={${params.animationDelay}}
/>`,
  },
  {
    id: 'metallic-paint',
    name: 'Metallic Paint',
    description: 'Metallic paint/liquid effects with surface reflections and fluid motion',
    category: 'Animations',
    component: MetallicPaint,
    parameters: [
      {
        name: 'baseColor',
        type: 'color',
        defaultValue: '#2c3e50',
        description: 'Base paint color',
      },
      {
        name: 'highlightColor',
        type: 'color',
        defaultValue: '#ecf0f1',
        description: 'Metallic highlight color',
      },
      {
        name: 'reflectionIntensity',
        type: 'range',
        defaultValue: 0.6,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Reflection intensity',
      },
      {
        name: 'flowSpeed',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Flow animation speed',
      },
      {
        name: 'viscosity',
        type: 'range',
        defaultValue: 3,
        min: 1,
        max: 10,
        step: 1,
        description: 'Paint viscosity (transition speed)',
      },
      {
        name: 'surfaceRoughness',
        type: 'range',
        defaultValue: 30,
        min: 0,
        max: 100,
        step: 10,
        description: 'Surface roughness (%)',
      },
      {
        name: 'animationPattern',
        type: 'select',
        defaultValue: 'wave',
        options: ['wave', 'ripple', 'flow', 'bubble'],
        description: 'Animation pattern',
      },
      {
        name: 'interactive',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable mouse interaction',
      },
    ],
    codeTemplate: (params) => `<MetallicPaint
  baseColor="${params.baseColor}"
  highlightColor="${params.highlightColor}"
  reflectionIntensity={${params.reflectionIntensity}}
  flowSpeed={${params.flowSpeed}}
  viscosity={${params.viscosity}}
  surfaceRoughness={${params.surfaceRoughness}}
  animationPattern="${params.animationPattern}"
  interactive={${params.interactive}}
/>`,
  },
  {
    id: 'noise',
    name: 'Noise',
    description: 'Noise/grain effects with various algorithms and patterns',
    category: 'Animations',
    component: Noise,
    parameters: [
      {
        name: 'intensity',
        type: 'range',
        defaultValue: 1.5,
        min: 0.5,
        max: 5,
        step: 0.1,
        description: 'Noise intensity',
      },
      {
        name: 'speed',
        type: 'range',
        defaultValue: 2,
        min: 0.1,
        max: 10,
        step: 0.1,
        description: 'Animation speed',
      },
      {
        name: 'scale',
        type: 'range',
        defaultValue: 50,
        min: 10,
        max: 200,
        step: 10,
        description: 'Noise scale',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#000000,#333333,#666666,#999999,#cccccc,#ffffff',
        description: 'Noise colors (comma-separated)',
      },
      {
        name: 'noiseType',
        type: 'select',
        defaultValue: 'perlin',
        options: ['perlin', 'simplex', 'random', 'grain'],
        description: 'Noise algorithm',
      },
      {
        name: 'animated',
        type: 'boolean',
        defaultValue: true,
        description: 'Animate noise',
      },
      {
        name: 'opacity',
        type: 'range',
        defaultValue: 0.8,
        min: 0.1,
        max: 1,
        step: 0.1,
        description: 'Noise opacity',
      },
      {
        name: 'blendMode',
        type: 'select',
        defaultValue: 'normal',
        options: ['normal', 'multiply', 'screen', 'overlay'],
        description: 'Blend mode',
      },
    ],
    codeTemplate: (params) => `<Noise
  intensity={${params.intensity}}
  speed={${params.speed}}
  scale={${params.scale}}
  colors={["${params.colors.split(',').join('", "')}"]}
  noiseType="${params.noiseType}"
  animated={${params.animated}}
  opacity={${params.opacity}}
  blendMode="${params.blendMode}"
/>`,
  },
  {
    id: 'crosshair',
    name: 'Crosshair',
    description: 'Crosshair tracking with various styles and animations',
    category: 'Animations',
    component: Crosshair,
    parameters: [
      {
        name: 'size',
        type: 'range',
        defaultValue: 40,
        min: 20,
        max: 100,
        step: 5,
        description: 'Crosshair size (pixels)',
      },
      {
        name: 'thickness',
        type: 'range',
        defaultValue: 2,
        min: 1,
        max: 8,
        step: 1,
        description: 'Line thickness (pixels)',
      },
      {
        name: 'color',
        type: 'color',
        defaultValue: '#00ff00',
        description: 'Crosshair color',
      },
      {
        name: 'style',
        type: 'select',
        defaultValue: 'simple',
        options: ['simple', 'tactical', 'sniper', 'gaming'],
        description: 'Crosshair style',
      },
      {
        name: 'animated',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable animations',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        defaultValue: true,
        description: 'Follow mouse cursor',
      },
      {
        name: 'showDot',
        type: 'boolean',
        defaultValue: true,
        description: 'Show center dot',
      },
      {
        name: 'showCircle',
        type: 'boolean',
        defaultValue: false,
        description: 'Show targeting circle',
      },
      {
        name: 'opacity',
        type: 'range',
        defaultValue: 0.8,
        min: 0.1,
        max: 1,
        step: 0.1,
        description: 'Crosshair opacity',
      },
    ],
    codeTemplate: (params) => `<Crosshair
  size={${params.size}}
  thickness={${params.thickness}}
  color="${params.color}"
  style="${params.style}"
  animated={${params.animated}}
  followMouse={${params.followMouse}}
  showDot={${params.showDot}}
  showCircle={${params.showCircle}}
  opacity={${params.opacity}}
/>`,
  },
  {
    id: 'image-trail',
    name: 'Image Trail',
    description: 'Image trailing effects with rotation and scale variations',
    category: 'Animations',
    component: ImageTrail,
    parameters: [
      {
        name: 'imageUrl',
        type: 'string',
        defaultValue: '',
        description: 'Image URL (leave empty for default)',
      },
      {
        name: 'trailLength',
        type: 'range',
        defaultValue: 10,
        min: 3,
        max: 30,
        step: 1,
        description: 'Trail length',
      },
      {
        name: 'imageSize',
        type: 'range',
        defaultValue: 40,
        min: 20,
        max: 100,
        step: 5,
        description: 'Image size (pixels)',
      },
      {
        name: 'fadeSpeed',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 5,
        step: 0.5,
        description: 'Fade duration (seconds)',
      },
      {
        name: 'rotationVariation',
        type: 'range',
        defaultValue: 30,
        min: 0,
        max: 180,
        step: 15,
        description: 'Rotation variation (degrees)',
      },
      {
        name: 'scaleVariation',
        type: 'range',
        defaultValue: 20,
        min: 0,
        max: 100,
        step: 10,
        description: 'Scale variation (%)',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        defaultValue: true,
        description: 'Follow mouse movement',
      },
      {
        name: 'blendMode',
        type: 'select',
        defaultValue: 'normal',
        options: ['normal', 'multiply', 'screen', 'overlay'],
        description: 'Blend mode',
      },
    ],
    codeTemplate: (params) => `<ImageTrail
  imageUrl="${params.imageUrl}"
  trailLength={${params.trailLength}}
  imageSize={${params.imageSize}}
  fadeSpeed={${params.fadeSpeed}}
  rotationVariation={${params.rotationVariation}}
  scaleVariation={${params.scaleVariation}}
  followMouse={${params.followMouse}}
  blendMode="${params.blendMode}"
/>`,
  },
  {
    id: 'ribbons',
    name: 'Ribbons',
    description: 'Ribbon animations with wave patterns and interactive effects',
    category: 'Animations',
    component: Ribbons,
    parameters: [
      {
        name: 'ribbonCount',
        type: 'range',
        defaultValue: 5,
        min: 2,
        max: 15,
        step: 1,
        description: 'Number of ribbons',
      },
      {
        name: 'ribbonWidth',
        type: 'range',
        defaultValue: 8,
        min: 2,
        max: 20,
        step: 2,
        description: 'Ribbon width (pixels)',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#ff6b6b,#4ecdc4,#45b7d1,#f9ca24,#f0932b',
        description: 'Ribbon colors (comma-separated)',
      },
      {
        name: 'animationSpeed',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Animation speed',
      },
      {
        name: 'waveAmplitude',
        type: 'range',
        defaultValue: 30,
        min: 10,
        max: 100,
        step: 5,
        description: 'Wave amplitude',
      },
      {
        name: 'waveFrequency',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5,
        description: 'Wave frequency',
      },
      {
        name: 'direction',
        type: 'select',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical', 'diagonal'],
        description: 'Ribbon direction',
      },
      {
        name: 'pattern',
        type: 'select',
        defaultValue: 'wave',
        options: ['wave', 'spiral', 'flow', 'dance'],
        description: 'Animation pattern',
      },
      {
        name: 'interactive',
        type: 'boolean',
        defaultValue: true,
        description: 'Enable mouse interaction',
      },
    ],
    codeTemplate: (params) => `<Ribbons
  ribbonCount={${params.ribbonCount}}
  ribbonWidth={${params.ribbonWidth}}
  colors={["${params.colors.split(',').join('", "')}"]}
  animationSpeed={${params.animationSpeed}}
  waveAmplitude={${params.waveAmplitude}}
  waveFrequency={${params.waveFrequency}}
  direction="${params.direction}"
  pattern="${params.pattern}"
  interactive={${params.interactive}}
/>`,
  },
  {
    id: 'splash-cursor',
    name: 'Splash Cursor',
    description: 'Splash cursor effects with particle physics and gravity',
    category: 'Animations',
    component: SplashCursor,
    parameters: [
      {
        name: 'splashSize',
        type: 'range',
        defaultValue: 20,
        min: 10,
        max: 50,
        step: 5,
        description: 'Splash particle size',
      },
      {
        name: 'splashCount',
        type: 'range',
        defaultValue: 8,
        min: 3,
        max: 20,
        step: 1,
        description: 'Particles per splash',
      },
      {
        name: 'colors',
        type: 'string',
        defaultValue: '#ff6b6b,#4ecdc4,#45b7d1,#f9ca24,#f0932b',
        description: 'Splash colors (comma-separated)',
      },
      {
        name: 'splashDuration',
        type: 'range',
        defaultValue: 2,
        min: 0.5,
        max: 5,
        step: 0.5,
        description: 'Splash duration (seconds)',
      },
      {
        name: 'splashType',
        type: 'select',
        defaultValue: 'circle',
        options: ['circle', 'square', 'star', 'heart', 'drop'],
        description: 'Splash particle shape',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        defaultValue: true,
        description: 'Follow mouse cursor',
      },
      {
        name: 'autoSplash',
        type: 'boolean',
        defaultValue: false,
        description: 'Auto splash on mouse move',
      },
      {
        name: 'gravity',
        type: 'boolean',
        defaultValue: true,
        description: 'Apply gravity to particles',
      },
    ],
    codeTemplate: (params) => `<SplashCursor
  splashSize={${params.splashSize}}
  splashCount={${params.splashCount}}
  colors={["${params.colors.split(',').join('", "')}"]}
  splashDuration={${params.splashDuration}}
  splashType="${params.splashType}"
  followMouse={${params.followMouse}}
  autoSplash={${params.autoSplash}}
  gravity={${params.gravity}}
/>`,
  },

];
