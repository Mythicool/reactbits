import { ComponentParameter } from '@/types/component';

export function generateComponentCode(
  componentName: string,
  parameters: ComponentParameter[],
  values: Record<string, any>,
  template: (params: Record<string, any>) => string
): string {
  try {
    return template(values);
  } catch (error) {
    console.error('Error generating code:', error);
    return `// Error generating code for ${componentName}`;
  }
}

export function formatParameterValue(value: any, type: ComponentParameter['type']): string {
  switch (type) {
    case 'string':
      return `"${value}"`;
    case 'number':
      return String(value);
    case 'boolean':
      return String(value);
    case 'color':
      return `"${value}"`;
    case 'select':
      return `"${value}"`;
    case 'range':
      return String(value);
    default:
      return String(value);
  }
}
