import type { Metadata } from 'next'
import { BlogIndex } from '../../src/components/sections/BlogIndex'

export const metadata: Metadata = {
  title: 'Blog - ioriimasu',
  description: 'Read our latest articles and insights about web development, design, and technology.',
  openGraph: {
    title: 'Blog - ioriimasu',
    description: 'Read our latest articles and insights about web development, design, and technology.',
    type: 'website',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogIndex />
    </div>
  )
}