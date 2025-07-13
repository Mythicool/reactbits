'use client';

import { useState, useEffect } from 'react';
import { ComponentDefinition, ComponentState } from '@/types/component';
import { ComponentSidebar } from './ComponentSidebar';
import { ComponentPreview } from './ComponentPreview';
import { ParameterControls } from './ParameterControls';
import { CodeDisplay } from './CodeDisplay';
import { ExportOptions } from './ExportOptions';
import { ResponsiveWrapper } from './ResponsiveWrapper';
import { ComponentDocumentation } from './ComponentDocumentation';
import { usePerformanceMonitor } from './PerformanceMonitor';
import { sampleComponents } from '@/data/sampleComponents';
import { generateComponentCode } from '@/utils/codeGenerator';
import { useUrlState } from '@/hooks/useUrlState';
import { clsx } from 'clsx';

export function ComponentPlayground() {
  const [state, setState] = useState<ComponentState>({
    selectedComponent: null,
    parameterValues: {},
    generatedCode: '',
  });
  const [activeTab, setActiveTab] = useState<'preview' | 'docs'>('preview');

  const { getStateFromUrl, updateUrl, shareConfiguration, isLoading } = useUrlState();
  const { PerformanceMonitor } = usePerformanceMonitor();

  const selectedComponentDef = sampleComponents.find(
    comp => comp.id === state.selectedComponent
  );

  // Update generated code when component or parameters change
  useEffect(() => {
    if (selectedComponentDef) {
      const code = generateComponentCode(
        selectedComponentDef.name,
        selectedComponentDef.parameters,
        state.parameterValues,
        selectedComponentDef.codeTemplate
      );
      setState(prev => ({ ...prev, generatedCode: code }));
    }
  }, [selectedComponentDef, state.parameterValues]);

  const handleComponentSelect = (componentId: string) => {
    const component = sampleComponents.find(comp => comp.id === componentId);
    if (component) {
      // Initialize parameter values with defaults
      const defaultValues: Record<string, any> = {};
      component.parameters.forEach(param => {
        defaultValues[param.name] = param.defaultValue;
      });

      setState({
        selectedComponent: componentId,
        parameterValues: defaultValues,
        generatedCode: '',
      });

      // Update URL
      updateUrl(componentId, defaultValues);
    }
  };

  const handleParameterChange = (paramName: string, value: any) => {
    setState(prev => {
      const newParameterValues = {
        ...prev.parameterValues,
        [paramName]: value,
      };

      // Update URL with new parameters
      if (prev.selectedComponent) {
        updateUrl(prev.selectedComponent, newParameterValues);
      }

      return {
        ...prev,
        parameterValues: newParameterValues,
      };
    });
  };

  const handleShare = async (): Promise<boolean> => {
    if (state.selectedComponent) {
      return await shareConfiguration(state.selectedComponent, state.parameterValues);
    }
    return false;
  };

  // Load state from URL on mount
  useEffect(() => {
    if (!isLoading) {
      const urlState = getStateFromUrl();
      if (urlState.component) {
        const component = sampleComponents.find(comp => comp.id === urlState.component);
        if (component) {
          // Merge URL parameters with defaults
          const defaultValues: Record<string, any> = {};
          component.parameters.forEach(param => {
            defaultValues[param.name] = param.defaultValue;
          });

          const mergedValues = { ...defaultValues, ...urlState.parameters };

          setState({
            selectedComponent: urlState.component,
            parameterValues: mergedValues,
            generatedCode: '',
          });
        }
      }
    }
  }, [isLoading]);

  return (
    <ResponsiveWrapper
      sidebar={
        <ComponentSidebar
          components={sampleComponents}
          selectedComponent={state.selectedComponent}
          onComponentSelect={handleComponentSelect}
        />
      }
    >
      <div className="flex flex-col gap-6 h-[calc(100vh-200px)] lg:h-auto">
        {/* Tab Navigation */}
        {selectedComponentDef && (
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('preview')}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                activeTab === 'preview'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Preview & Controls
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                activeTab === 'docs'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Documentation
            </button>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'preview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <ComponentPreview
                component={selectedComponentDef}
                parameters={state.parameterValues}
              />
              <ParameterControls
                component={selectedComponentDef}
                values={state.parameterValues}
                onChange={handleParameterChange}
              />
            </div>
          ) : selectedComponentDef ? (
            <ComponentDocumentation
              component={selectedComponentDef}
              parameters={state.parameterValues}
            />
          ) : null}
        </div>

        {/* Bottom Row: Code Display with Export */}
        <div className="h-64 lg:h-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Code
            </h3>
            {selectedComponentDef && (
              <ExportOptions
                component={selectedComponentDef}
                parameters={state.parameterValues}
                generatedCode={state.generatedCode}
                onShare={handleShare}
              />
            )}
          </div>
          <CodeDisplay code={state.generatedCode} />
        </div>
      </div>

      {/* Performance Monitor */}
      <PerformanceMonitor />
    </ResponsiveWrapper>
  );
}
