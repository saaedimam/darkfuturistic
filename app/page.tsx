import HeroFuturistic from '@/components/hero-futuristic'
import { Features } from '@/components/sections/features'
import { Logos } from '@/components/sections/logos'
import { Pricing } from '@/components/sections/pricing'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/footer'
import { heroFromCms, heroFromLocal, type CmsHero, type LocalHeroData } from '@/lib/adapters/hero'
import heroJson from '@/data/hero.json'

// Fetch hero data from API (CMS-like)
async function getHeroFromApi(): Promise<CmsHero> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/hero`, {
      cache: 'no-store', // Always get fresh data
      next: { revalidate: 3600 } // Revalidate every hour in production
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch hero data: ${res.status}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Failed to load hero from API, falling back to local data:', error)
    // Fallback to local data if API fails
    return {
      headline: heroJson.title,
      description: heroJson.subtitle,
      eyebrow: heroJson.kicker,
      ctas: {
        primaryLabel: heroJson.primaryButton?.text,
        primaryHref: heroJson.primaryButton?.url,
        secondaryLabel: heroJson.secondaryButton?.text,
        secondaryHref: heroJson.secondaryButton?.url,
      },
      media: heroJson.image ? {
        kind: 'image' as const,
        url: heroJson.image.src,
        alt: heroJson.image.alt,
        width: heroJson.image.width,
        height: heroJson.image.height,
      } : undefined,
      bullets: heroJson.highlights?.map(h => h.text) || [],
      socialProof: {
        userCount: heroJson.highlights?.find(h => h.count)?.count,
        rating: heroJson.highlights?.find(h => h.text.includes('rating'))?.count,
      }
    }
  }
}

export default async function HomePage() {
  // Option 1: Fetch from API/CMS
  const cmsHeroData = await getHeroFromApi()
  const heroFromAPI = heroFromCms(cmsHeroData)

  // Option 2: Use local JSON (comment out API version above and uncomment this)
  // const heroFromJSON = heroFromLocal(heroJson as LocalHeroData)

  return (
    <div className="min-h-screen">
      <HeroFuturistic {...heroFromAPI} />
      <Logos />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
