export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  author: string
  image?: string
  tags: string[]
}

// Mock blog data - in a real app, this would come from a CMS or API
const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 15',
    excerpt: 'Learn how to build modern web applications with Next.js 15, including the new App Router and server components.',
    content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework. In this guide, we'll explore the key features and how to get started.

## What's New in Next.js 15

- **App Router**: The new routing system that provides better performance and developer experience
- **Server Components**: Components that render on the server for better performance
- **Turbopack**: The new bundler that's faster than Webpack
- **Improved TypeScript Support**: Better type safety and developer experience

## Getting Started

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will create a new Next.js project with all the latest features and best practices.

## Conclusion

Next.js 15 is a powerful framework for building modern web applications. With its new features and improvements, it's easier than ever to create fast, scalable applications.`,
    publishedAt: '2024-01-15',
    author: 'John Doe',
    image: '/blog/nextjs-15.jpg',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    slug: 'building-accessible-web-apps',
    title: 'Building Accessible Web Applications',
    excerpt: 'A comprehensive guide to creating web applications that are accessible to all users, including those with disabilities.',
    content: `# Building Accessible Web Applications

Accessibility is not just a nice-to-have feature—it's a requirement for creating inclusive web experiences. In this guide, we'll cover the essential principles and techniques.

## Why Accessibility Matters

- **Legal Compliance**: Many countries have laws requiring accessible websites
- **Better UX**: Accessible design often improves the experience for all users
- **SEO Benefits**: Search engines favor accessible websites
- **Social Responsibility**: Everyone deserves access to information and services

## Key Principles

### 1. Perceivable
- Provide text alternatives for images
- Use sufficient color contrast
- Make content adaptable to different screen sizes

### 2. Operable
- Ensure all functionality is keyboard accessible
- Provide enough time for users to read and use content
- Avoid content that causes seizures

### 3. Understandable
- Use clear and simple language
- Make web pages appear and operate in predictable ways
- Help users avoid and correct mistakes

### 4. Robust
- Maximize compatibility with current and future tools
- Use semantic HTML
- Test with assistive technologies

## Implementation Tips

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Use sufficient color contrast

## Conclusion

Building accessible web applications is an ongoing process that requires attention to detail and regular testing. By following these principles, you can create experiences that work for everyone.`,
    publishedAt: '2024-01-10',
    author: 'Jane Smith',
    image: '/blog/accessibility.jpg',
    tags: ['Accessibility', 'Web Development', 'UX'],
  },
  {
    slug: 'optimizing-web-performance',
    title: 'Optimizing Web Performance',
    excerpt: 'Learn how to optimize your web applications for better performance, including Core Web Vitals and modern optimization techniques.',
    content: `# Optimizing Web Performance

Web performance is crucial for user experience and SEO. In this guide, we'll explore modern techniques for optimizing web applications.

## Core Web Vitals

Google's Core Web Vitals measure user experience:

- **Largest Contentful Paint (LCP)**: Should be under 2.5 seconds
- **First Input Delay (FID)**: Should be under 100 milliseconds
- **Cumulative Layout Shift (CLS)**: Should be under 0.1

## Optimization Techniques

### 1. Image Optimization
- Use modern formats like WebP and AVIF
- Implement lazy loading
- Provide responsive images
- Use appropriate image sizes

### 2. Code Splitting
- Split JavaScript bundles
- Use dynamic imports
- Implement route-based splitting
- Lazy load components

### 3. Caching
- Implement proper caching headers
- Use CDNs for static assets
- Cache API responses
- Use service workers

### 4. Bundle Optimization
- Remove unused code
- Minify CSS and JavaScript
- Use tree shaking
- Optimize dependencies

## Tools and Monitoring

- **Lighthouse**: Built-in Chrome DevTools
- **WebPageTest**: Detailed performance analysis
- **Core Web Vitals**: Real user monitoring
- **Bundle Analyzer**: Analyze bundle size

## Conclusion

Performance optimization is an ongoing process that requires regular monitoring and updates. By focusing on Core Web Vitals and implementing modern optimization techniques, you can create fast, responsive web applications.`,
    publishedAt: '2024-01-05',
    author: 'Mike Johnson',
    image: '/blog/performance.jpg',
    tags: ['Performance', 'Web Development', 'SEO'],
  },
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return blogPosts.find(post => post.slug === slug) || null
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter(post => post.slug !== currentSlug).slice(0, limit)
}