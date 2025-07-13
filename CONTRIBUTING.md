# Contributing to ReactBits Component Playground

Thank you for your interest in contributing to ReactBits! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/reactbits-playground.git
   cd reactbits-playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Contribute

### Adding New Components

1. **Create the component file**
   ```bash
   # Create in src/components/reactbits/
   touch src/components/reactbits/YourComponent.tsx
   ```

2. **Follow the component structure**
   ```tsx
   'use client';
   
   import { motion } from 'framer-motion';
   
   interface YourComponentProps {
     // Define your props with proper types
     text?: string;
     duration?: number;
     // ... other props
   }
   
   export function YourComponent({ 
     text = "Default text",
     duration = 1,
     ...props 
   }: YourComponentProps) {
     return (
       <motion.div
         // Your animation logic
         {...props}
       >
         {text}
       </motion.div>
     );
   }
   ```

3. **Add component definition**
   Update `src/data/componentDefinitions.ts` to include your component.

4. **Create parameter schema**
   Define the parameter controls for your component.

5. **Add documentation**
   Include usage examples and best practices.

### Code Style Guidelines

- **TypeScript**: Use proper typing, avoid `any` when possible
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes
- **Animation**: Use Framer Motion for animations
- **Naming**: Use PascalCase for components, camelCase for props

### Testing

Before submitting:

1. **Test your component**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for errors**
   - No console errors
   - Component renders correctly
   - Parameters work as expected
   - Responsive design works

3. **Test export functionality**
   - Code generation works
   - TypeScript definitions are correct

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-component
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing component with cool animations"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-component
   ```

5. **Create a Pull Request**
   - Provide a clear description
   - Include screenshots/GIFs if applicable
   - Reference any related issues

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests:

- **Use case**: Describe the problem you're solving
- **Proposed solution**: Your suggested approach
- **Alternatives**: Other solutions you've considered
- **Additional context**: Any other relevant information

## 📋 Component Checklist

When adding a new component:

- [ ] Component follows naming conventions
- [ ] Props are properly typed
- [ ] Component is responsive
- [ ] Animation is smooth and performant
- [ ] Parameter controls work correctly
- [ ] Code generation produces valid output
- [ ] Documentation is complete
- [ ] Component is added to definitions
- [ ] No console errors or warnings

## 🎨 Design Guidelines

- **Animations**: Smooth, purposeful, not overwhelming
- **Performance**: 60fps target, efficient rendering
- **Accessibility**: ARIA labels, keyboard navigation
- **Responsive**: Works on mobile and desktop
- **Theming**: Supports light and dark themes

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/reactbits)
- **Issues**: [GitHub Issues](https://github.com/yourusername/reactbits-playground/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/reactbits-playground/discussions)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ReactBits! 🎉
