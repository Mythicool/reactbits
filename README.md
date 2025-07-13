# ReactBits Component Playground 🎨

An interactive React component playground featuring **37 animated components** built with Framer Motion. Explore, customize, and export beautiful UI components with live preview, code generation, and comprehensive documentation.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://reactbits-playground.pages.dev)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/yourusername/reactbits-playground)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## ✨ Features

### 🎯 **Core Functionality**
- **37 Animated Components** - Text animations, general animations, and interactive effects
- **Live Preview** - Real-time component rendering with parameter adjustments
- **Code Generation** - Professional TypeScript/JavaScript code output
- **Parameter Controls** - Interactive sliders, color pickers, and input fields
- **Responsive Design** - Mobile-first design that works on all devices

### 🚀 **Advanced Features**
- **Favorites System** - Save and organize your favorite components
- **Recently Used** - Quick access to your last 10 used components
- **URL Sharing** - Share component configurations via URL
- **Export Options** - Copy code, download files, TypeScript definitions
- **Search & Filtering** - Enhanced search across all components
- **Theme System** - Light, dark, and system theme support

### 🎨 **User Experience**
- **Loading States** - Smooth loading animations throughout
- **Toast Notifications** - User feedback system
- **Performance Monitor** - Real-time FPS and memory tracking
- **Accessibility** - ARIA labels, keyboard navigation, focus management
- **Documentation** - Usage examples and best practices for each component

## 🎭 Component Library

### **Text Animation Components (22)**
1. **Split Text** - Character-by-character text animations
2. **Blur Text** - Blur reveal effects with timing controls
3. **Circular Text** - Text arranged in circular patterns
4. **Shiny Text** - Metallic shine effects with gradients
5. **Text Pressure** - Pressure-sensitive text interactions
6. **Curved Loop** - Text following curved paths
7. **Fuzzy Text** - Fuzzy/glitch text effects
8. **Gradient Text** - Animated gradient text effects
9. **Text Trail** - Trailing text effects
10. **Falling Text** - Gravity-based falling animations
11. **Text Cursor** - Typewriter cursor effects
12. **Decrypted Text** - Matrix-style decryption
13. **True Focus** - Focus-based text reveals
14. **Scroll Float** - Scroll-triggered floating text
15. **Scroll Reveal** - Progressive text reveals on scroll
16. **ASCII Text** - ASCII art text effects
17. **Scramble Text** - Text scrambling animations
18. **Rotating Text** - 3D text rotation effects
19. **Glitch Text** - Digital glitch effects
20. **Scroll Velocity** - Velocity-based scroll animations
21. **Variable Proximity** - Proximity-based magnetic effects
22. **Count Up** - Number counting animations

### **General Animation Components (15)**
23. **Animated Content** - General content animations
24. **Fade Content** - Fade effects with scroll triggers
25. **Pixel Transition** - Retro pixel transitions
26. **Glare Hover** - 3D glare hover effects
27. **Magnet Lines** - Interactive magnetic lines
28. **Click Spark** - Click-triggered particle effects
29. **Magnet** - Magnetic attraction effects
30. **Pixel Trail** - Mouse-following pixel trails
31. **Cubes** - 3D rotating cube animations
32. **Metallic Paint** - Liquid metallic effects
33. **Noise** - Procedural noise effects
34. **Crosshair** - Interactive crosshair tracking
35. **Image Trail** - Image-based trailing effects
36. **Ribbons** - Flowing ribbon animations
37. **Splash Cursor** - Splash particle cursor effects

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/reactbits-playground.git
cd reactbits-playground

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the playground.

### Build for Production

```bash
# Build static export
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Code Highlighting**: Monaco Editor, Prism
- **Icons**: Lucide React
- **Build**: Turbopack (development)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── reactbits/         # 37 animated components
│   ├── ui/                # UI components (sidebar, controls, etc.)
│   └── samples/           # Sample usage components
├── data/                  # Component definitions and schemas
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🎨 Usage Examples

### Basic Component Usage

```tsx
import { SplitText } from '@/components/reactbits/SplitText';

export default function MyComponent() {
  return (
    <SplitText
      text="Hello World"
      delay={0.1}
      duration={0.5}
      stagger={0.05}
    />
  );
}
```

### Advanced Configuration

```tsx
import { BlurText } from '@/components/reactbits/BlurText';

export default function AdvancedExample() {
  return (
    <BlurText
      text="Advanced Animation"
      blur={10}
      duration={1.2}
      delay={0.2}
      className="text-4xl font-bold"
      style={{ color: '#3b82f6' }}
    />
  );
}
```

## 🚀 Deployment

### Cloudflare Pages

1. **Connect Repository**: Link your GitHub repository to Cloudflare Pages
2. **Build Settings**:
   - Build command: `npm run build`
   - Output directory: `out`
   - Node.js version: `18` or higher

3. **Environment Variables**: None required for basic deployment

### GitHub Pages

1. **Enable GitHub Pages** in repository settings
2. **Configure Build Action**:
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-component`
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -m 'Add amazing component'`
6. Push: `git push origin feature/amazing-component`
7. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for amazing animation capabilities
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

- 📧 Email: support@reactbits.dev
- 💬 Discord: [Join our community](https://discord.gg/reactbits)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/reactbits-playground/issues)

---

<div align="center">
  <p>Made with ❤️ by the ReactBits team</p>
  <p>
    <a href="https://reactbits-playground.pages.dev">Live Demo</a> •
    <a href="https://github.com/yourusername/reactbits-playground">GitHub</a> •
    <a href="https://twitter.com/reactbits">Twitter</a>
  </p>
</div>#   r e a c t b i t s c o p y  
 