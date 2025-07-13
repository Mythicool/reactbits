'use client';

import { ComponentDefinition, ComponentParameter } from '@/types/component';

interface ParameterControlsProps {
  component: ComponentDefinition | undefined;
  values: Record<string, any>;
  onChange: (paramName: string, value: any) => void;
}

export function ParameterControls({ component, values, onChange }: ParameterControlsProps) {
  if (!component) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
            🎛️
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Controls Available
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Select a component to see its parameters
          </p>
        </div>
      </div>
    );
  }

  const renderControl = (param: ComponentParameter) => {
    const value = values[param.name] ?? param.defaultValue;

    switch (param.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(param.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            min={param.min}
            max={param.max}
            step={param.step}
            onChange={(e) => onChange(param.name, Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value}
              min={param.min}
              max={param.max}
              step={param.step}
              onChange={(e) => onChange(param.name, Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {value}
            </div>
          </div>
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(param.name, e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-gray-900 dark:text-white">
              {value ? 'True' : 'False'}
            </span>
          </label>
        );

      case 'color':
        return (
          <div className="flex space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(param.name, e.target.value)}
              className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(param.name, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(param.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {param.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Parameters
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Customize the component properties
        </p>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
        {component.parameters.map((param) => (
          <div key={param.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {param.name}
              {param.description && (
                <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">
                  - {param.description}
                </span>
              )}
            </label>
            {renderControl(param)}
          </div>
        ))}
      </div>
    </div>
  );
}
