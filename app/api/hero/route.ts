import { NextResponse } from 'next/server'
import type { CmsHero } from '@/lib/adapters/hero'

// Mock CMS data - in a real app, this would come from your CMS
const heroData: CmsHero = {
  eyebrow: "Trusted by 10,000+ teams worldwide",
  headline: "Build the Future with Modern SaaS",
  description: "Transform your business with our cutting-edge platform designed for scale, performance, and user experience. Built with the latest technologies and best practices.",
  ctas: {
    primaryLabel: "Get Started Free",
    primaryHref: "/signup",
    secondaryLabel: "Watch Demo",
    secondaryHref: "/demo"
  },
  media: {
    kind: "image",
    url: "/placeholder.jpg",
    alt: "Modern SaaS platform dashboard showing analytics and user interface",
    width: 800,
    height: 600
  },
  bullets: [
    "99.9% uptime guaranteed",
    "Enterprise-grade security",
    "24/7 customer support"
  ],
  socialProof: {
    userCount: "10k+",
    rating: "4.9/5",
    trend: "Growing 40% month-over-month"
  },
  showBackground: true
}

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return NextResponse.json(heroData, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

// For development/preview purposes, allow updating the data
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
  }
  
  const newData = await request.json()
  // In a real app, you'd validate and save to your CMS
  return NextResponse.json({ success: true, data: newData })
}