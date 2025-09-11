'use client'

import { useEffect, useState } from 'react'
import HeroFuturistic from '@/components/hero-futuristic'
import { heroFromCms, heroFromLocal, heroFromLegacy, type CmsHero, type LocalHeroData } from '@/lib/adapters/hero'
import { Button } from '@/components/ui/button'
import heroJson from '@/data/hero.json'

const examples = {
  cms: {
    eyebrow: "From CMS",
    headline: "CMS-Driven Hero Section",
    description: "This hero is populated from a CMS-like API endpoint with full social proof and media support.",
    ctas: {
      primaryLabel: "Try CMS Version",
      primaryHref: "/cms-demo",
      secondaryLabel: "View API",
      secondaryHref: "/api/hero"
    },
    media: {
      kind: "image" as const,
      url: "/placeholder.jpg",
      alt: "CMS hero image",
      width: 800,
      height: 600
    },
    bullets: ["Real-time updates", "Content management", "Multi-language support"],
    socialProof: {
      userCount: "50k+",
      rating: "4.9/5",
      trend: "Trusted by Fortune 500"
    }
  },
  local: {
    kicker: "From Local JSON",
    title: "JSON-Powered Hero",
    subtitle: "This version loads from a local JSON file, perfect for static sites or when you don't need a CMS.",
    primaryButton: { text: "Try JSON Version", url: "/json-demo" },
    secondaryButton: { text: "View Source", url: "/data/hero.json" },
    image: { src: "/placeholder.jpg", alt: "JSON hero image", width: 800, height: 600 },
    highlights: [
      { count: "100%", text: "static" },
      { text: "No API required" },
      { text: "Fast builds" }
    ]
  },
  legacy: {
    title: "Legacy Hero Format",
    subtitle: "Backwards Compatible",
    description: "This shows how to migrate from the old Hero component format to the new data-driven approach.",
    primaryCta: { text: "Legacy Primary", href: "/legacy" },
    secondaryCta: { text: "Migration Guide", href: "/migrate" },
    heroImage: { src: "/placeholder.jpg", alt: "Legacy format", width: 800, height: 600 }
  }
}

export default function HeroExamplesPage() {
  const [activeExample, setActiveExample] = useState<'cms' | 'local' | 'legacy'>('cms')
  const [cmsData, setCmsData] = useState<CmsHero | null>(null)

  useEffect(() => {
    // Fetch CMS data
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => setCmsData(data))
      .catch(console.error)
  }, [])

  const renderHero = () => {
    switch (activeExample) {
      case 'cms':
        return cmsData ? (
          <HeroFuturistic {...heroFromCms(cmsData)} />
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading CMS data...</p>
            </div>
          </div>
        )
      
      case 'local':
        return <HeroFuturistic {...heroFromLocal(heroJson as LocalHeroData)} />
      
      case 'legacy':
        return <HeroFuturistic {...heroFromLegacy(examples.legacy)} />
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Example selector */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Hero Component Examples</h1>
              <p className="text-sm text-muted-foreground">
                Different data sources for the same component
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={activeExample === 'cms' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveExample('cms')}
              >
                CMS Data
              </Button>
              <Button
                variant={activeExample === 'local' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveExample('local')}
              >
                Local JSON
              </Button>
              <Button
                variant={activeExample === 'legacy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveExample('legacy')}
              >
                Legacy Format
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero example */}
      {renderHero()}

      {/* Code examples */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              How It Works: {activeExample.toUpperCase()} Example
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Shape</h3>
                <pre className="bg-background border rounded-lg p-4 text-sm overflow-x-auto">
                  <code>
                    {JSON.stringify(
                      activeExample === 'cms' ? examples.cms :
                      activeExample === 'local' ? examples.local :
                      examples.legacy,
                      null,
                      2
                    )}
                  </code>
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Usage</h3>
                <pre className="bg-background border rounded-lg p-4 text-sm overflow-x-auto">
                  <code>
{activeExample === 'cms' ? `// From API/CMS
const data = await fetch('/api/hero')
const hero = heroFromCms(data)
return <HeroFuturistic {...hero} />` :
activeExample === 'local' ? `// From local JSON
import heroData from '@/data/hero.json'
const hero = heroFromLocal(heroData)
return <HeroFuturistic {...hero} />` :
`// From legacy format
const legacyData = { /* old format */ }
const hero = heroFromLegacy(legacyData)
return <HeroFuturistic {...hero} />`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>Data-driven:</strong> Same component, different data sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>Type-safe:</strong> Full TypeScript support with proper contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>Flexible:</strong> Adapters handle different data shapes seamlessly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>Fallback-ready:</strong> Graceful handling of missing data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>Migration-friendly:</strong> Easy to transition from legacy formats</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}