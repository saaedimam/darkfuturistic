# ioriimasu

[![Build Status](https://github.com/yourusername/ioriimasu/workflows/CI/badge.svg)](https://github.com/yourusername/ioriimasu/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

A modern, production-ready website built with Next.js, TypeScript, and Tailwind CSS. Features a clean, accessible design with smooth animations and optimal performance.

## ✨ Features

- 🚀 **Next.js 15** with App Router
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- ♿ **Accessibility** first design
- 📱 **Responsive** across all devices
- ⚡ **Performance** optimized
- 🌙 **Dark mode** support
- 🎭 **Smooth animations** with Framer Motion
- 📝 **Blog system** with MDX support
- 🔍 **SEO optimized** with metadata and sitemap
- 🧪 **Comprehensive testing** with Vitest and Playwright

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest, Playwright
- **Linting:** ESLint, Prettier
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ioriimasu.git
   cd ioriimasu
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run unit tests |
| `pnpm test:ui` | Run tests with UI |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm e2e` | Run E2E tests |
| `pnpm e2e:ui` | Run E2E tests with UI |
| `pnpm e2e:headed` | Run E2E tests in headed mode |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm a11y` | Run accessibility tests |
| `pnpm lh` | Run Lighthouse audit |
| `pnpm lh:ci` | Run Lighthouse CI |

## 🏗️ Project Structure

```
ioriimasu/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   │   └── blog/          # Blog API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   ├── error.tsx          # Error page
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable components
│   ├── nav/               # Navigation components
│   │   ├── MenuButton.tsx
│   │   ├── NavOverlay.tsx
│   │   ├── NavProvider.tsx
│   │   ├── FocusTrap.tsx
│   │   └── config.ts
│   └── theme-provider.tsx
├── lib/                   # Utility functions
│   ├── scroll/            # Smooth scrolling
│   │   └── smooth.ts
│   ├── blog.ts            # Blog utilities
│   └── utils.ts           # General utilities
├── public/                # Static assets
│   ├── robots.txt
│   └── site.webmanifest
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/      # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── BlogIndex.tsx
│   │   │   └── BlogPost.tsx
│   │   └── ui/            # UI components
│   ├── styles/            # Additional styles
│   └── test/              # Test utilities
├── tests/                 # Test files
│   └── e2e/               # E2E tests
├── .husky/                # Git hooks
├── .github/               # GitHub Actions
└── docs/                  # Documentation
```

## 🧪 Testing

### Unit Tests
```bash
pnpm test
```

### E2E Tests
```bash
pnpm e2e
```

### Accessibility Tests
```bash
pnpm a11y
```

### Performance Audit
```bash
pnpm lh
```

## 📊 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.8s
- **Largest Contentful Paint:** < 1.8s
- **Cumulative Layout Shift:** < 0.05
- **Bundle Size:** < 170KB gzipped

## ♿ Accessibility

This project follows WCAG 2.1 AA guidelines and includes:

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance
- Reduced motion support
- ARIA labels and roles

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### GitHub Pages

1. **Build the project**
   ```bash
   pnpm build
   pnpm export
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npx gh-pages -d out
   ```

### Custom VPS

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Start production server**
   ```bash
   pnpm start
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=https://ioriimasu.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Tailwind CSS

The project uses Tailwind CSS with custom design tokens. Configuration is in `tailwind.config.ts`.

### TypeScript

TypeScript configuration is in `tsconfig.json`. The project uses strict mode for better type safety.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/ioriimasu/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact us at [your-email@example.com](mailto:your-email@example.com)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)