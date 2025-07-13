import { ComponentDefinition, ParameterDefinition } from '@/types/component';

export function generateTypeDefinitions(component: ComponentDefinition): string {
  const interfaceName = `${component.name}Props`;
  
  const generateParameterType = (param: ParameterDefinition): string => {
    switch (param.type) {
      case 'string':
        if (param.options) {
          return param.options.map(opt => `'${opt}'`).join(' | ');
        }
        return 'string';
      case 'number':
      case 'range':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'color':
        return 'string';
      case 'select':
        if (param.options) {
          return param.options.map(opt => `'${opt}'`).join(' | ');
        }
        return 'string';
      default:
        return 'any';
    }
  };

  const parameters = component.parameters.map(param => {
    const type = generateParameterType(param);
    const optional = param.defaultValue !== undefined ? '?' : '';
    const comment = param.description ? `  /** ${param.description} */\n` : '';
    
    return `${comment}  ${param.name}${optional}: ${type};`;
  }).join('\n');

  return `/**
 * ${component.description}
 * 
 * @category ${component.category}
 */
export interface ${interfaceName} {
${parameters}
  /** Additional CSS classes */
  className?: string;
}

/**
 * ${component.name} component
 * 
 * @example
 * \`\`\`tsx
 * <${component.name}
${component.parameters.map(param => `   ${param.name}={${JSON.stringify(param.defaultValue)}}`).join('\n')}
 * />
 * \`\`\`
 */
export declare function ${component.name}(props: ${interfaceName}): JSX.Element;`;
}

export function generateAllTypeDefinitions(components: ComponentDefinition[]): string {
  const imports = `// Auto-generated TypeScript definitions for ReactBits components
// Generated on ${new Date().toISOString()}

import { JSX } from 'react';

`;

  const definitions = components.map(component => generateTypeDefinitions(component)).join('\n\n');

  const exportIndex = `
// Component exports
export {
${components.map(comp => `  ${comp.name},`).join('\n')}
} from './components';

// Type exports
export type {
${components.map(comp => `  ${comp.name}Props,`).join('\n')}
};`;

  return imports + definitions + exportIndex;
}

export function generateComponentIndex(components: ComponentDefinition[]): string {
  const imports = components.map(comp => 
    `export { ${comp.name} } from './reactbits/${comp.name}';`
  ).join('\n');

  const typeImports = components.map(comp => 
    `export type { ${comp.name}Props } from './reactbits/${comp.name}';`
  ).join('\n');

  return `// Auto-generated component index
// Generated on ${new Date().toISOString()}

// Component exports
${imports}

// Type exports
${typeImports}

// Component metadata
export const COMPONENT_METADATA = {
  totalComponents: ${components.length},
  categories: [${[...new Set(components.map(c => `'${c.category}'`))].join(', ')}],
  lastUpdated: '${new Date().toISOString()}',
};`;
}

export function generatePackageJson(components: ComponentDefinition[]): string {
  return JSON.stringify({
    name: 'reactbits-components',
    version: '1.0.0',
    description: 'A collection of animated React components built with Framer Motion',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    files: [
      'dist',
      'README.md'
    ],
    scripts: {
      build: 'tsc',
      'build:watch': 'tsc --watch',
      prepublishOnly: 'npm run build'
    },
    keywords: [
      'react',
      'components',
      'animation',
      'framer-motion',
      'typescript',
      'ui'
    ],
    author: 'ReactBits',
    license: 'MIT',
    peerDependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      'framer-motion': '^10.0.0'
    },
    devDependencies: {
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
      typescript: '^5.0.0'
    },
    repository: {
      type: 'git',
      url: 'https://github.com/reactbits/components.git'
    },
    bugs: {
      url: 'https://github.com/reactbits/components/issues'
    },
    homepage: 'https://reactbits.dev',
    metadata: {
      componentCount: components.length,
      categories: [...new Set(components.map(c => c.category))],
      lastGenerated: new Date().toISOString()
    }
  }, null, 2);
}

export function generateReadme(components: ComponentDefinition[]): string {
  const categories = [...new Set(components.map(c => c.category))];
  const componentsByCategory = categories.reduce((acc, category) => {
    acc[category] = components.filter(c => c.category === category);
    return acc;
  }, {} as Record<string, ComponentDefinition[]>);

  const componentList = categories.map(category => {
    const categoryComponents = componentsByCategory[category];
    const componentItems = categoryComponents.map(comp => 
      `- **${comp.name}** - ${comp.description}`
    ).join('\n');
    
    return `### ${category}\n\n${componentItems}`;
  }).join('\n\n');

  return `# ReactBits Components

A comprehensive collection of ${components.length} animated React components built with Framer Motion and TypeScript.

## Installation

\`\`\`bash
npm install reactbits-components framer-motion
# or
yarn add reactbits-components framer-motion
# or
pnpm add reactbits-components framer-motion
\`\`\`

## Quick Start

\`\`\`tsx
import { SplitText, FadeContent } from 'reactbits-components';

function App() {
  return (
    <div>
      <SplitText text="Hello World" />
      <FadeContent>
        <p>This content will fade in</p>
      </FadeContent>
    </div>
  );
}
\`\`\`

## Components

${componentList}

## Features

- 🎨 **${components.length} Components** - Comprehensive collection of animated components
- 🚀 **TypeScript Support** - Full type definitions included
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessibility** - ARIA labels and keyboard navigation
- 🎭 **Framer Motion** - Smooth, performant animations
- 🎯 **Tree Shakeable** - Import only what you need
- 📖 **Well Documented** - Comprehensive documentation and examples

## Requirements

- React 18+
- Framer Motion 10+
- TypeScript 5+ (optional but recommended)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © ReactBits

## Links

- [Documentation](https://reactbits.dev)
- [GitHub](https://github.com/reactbits/components)
- [NPM](https://www.npmjs.com/package/reactbits-components)

---

Generated on ${new Date().toLocaleDateString()} with ❤️ by ReactBits
`;
}
