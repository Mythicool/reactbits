export interface ComponentParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'range';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  description?: string;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: ComponentParameter[];
  component: React.ComponentType<any>;
  codeTemplate: (params: Record<string, any>) => string;
}

export interface ComponentState {
  selectedComponent: string | null;
  parameterValues: Record<string, any>;
  generatedCode: string;
}
