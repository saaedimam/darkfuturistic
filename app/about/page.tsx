import type { Metadata } from 'next'
import { AboutSection } from '../../src/components/sections/AboutSection'

export const metadata: Metadata = {
  title: 'About - ioriimasu',
  description: 'Learn about ioriimasu, a modern web platform built with Next.js, TypeScript, and Tailwind CSS.',
  openGraph: {
    title: 'About - ioriimasu',
    description: 'Learn about ioriimasu, a modern web platform built with Next.js, TypeScript, and Tailwind CSS.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutSection />
    </div>
  )
}