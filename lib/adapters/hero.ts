import type { HeroFuturisticProps } from '@/components/hero-futuristic'

// CMS/API data shape - this represents what your CMS returns
export type CmsHero = {
  eyebrow?: string
  headline: string
  description?: string
  ctas?: {
    primaryLabel?: string
    primaryHref?: string
    secondaryLabel?: string
    secondaryHref?: string
  }
  media?: {
    kind?: 'image' | 'video'
    url?: string
    alt?: string
    width?: number
    height?: number
  }
  bullets?: string[]
  socialProof?: {
    userCount?: string
    rating?: string
    trend?: string
  }
  showBackground?: boolean
}

// Alternative shape for local JSON files (simpler structure)
export type LocalHeroData = {
  kicker?: string
  title: string
  subtitle?: string
  primaryButton?: { text: string; url: string }
  secondaryButton?: { text: string; url: string }
  image?: { src: string; alt?: string; width?: number; height?: number }
  video?: { src: string; alt?: string }
  highlights?: Array<{ text: string; count?: string }>
  backgroundGradient?: boolean
}

/**
 * Adapter function to map CMS data to HeroFuturistic component props
 * Handles null safety and provides sensible fallbacks
 */
export function heroFromCms(data: CmsHero): HeroFuturisticProps {
  // Build highlights from bullets and social proof
  const highlights: HeroFuturisticProps['highlights'] = []
  
  // Add social proof highlights if available
  if (data.socialProof?.userCount) {
    highlights.push({
      count: data.socialProof.userCount,
      text: 'users'
    })
  }
  
  if (data.socialProof?.rating) {
    highlights.push({
      count: data.socialProof.rating,
      text: 'rating'
    })
  }
  
  if (data.socialProof?.trend) {
    highlights.push({
      text: data.socialProof.trend
    })
  }
  
  // Add bullet points as simple text highlights
  if (data.bullets?.length) {
    data.bullets.forEach(bullet => {
      highlights.push({ text: bullet })
    })
  }

  return {
    kicker: data.eyebrow,
    title: data.headline,
    subtitle: data.description,
    primaryCta: data.ctas?.primaryLabel && data.ctas?.primaryHref
      ? { label: data.ctas.primaryLabel, href: data.ctas.primaryHref }
      : undefined,
    secondaryCta: data.ctas?.secondaryLabel && data.ctas?.secondaryHref
      ? { label: data.ctas.secondaryLabel, href: data.ctas.secondaryHref }
      : undefined,
    media: data.media?.url
      ? { 
          type: data.media.kind === 'video' ? 'video' : 'image',
          src: data.media.url,
          alt: data.media.alt,
          width: data.media.width,
          height: data.media.height
        }
      : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    backgroundGradient: data.showBackground ?? true,
  }
}

/**
 * Adapter function to map local JSON data to HeroFuturistic component props
 * For when you're using a local JSON file instead of a CMS
 */
export function heroFromLocal(data: LocalHeroData): HeroFuturisticProps {
  return {
    kicker: data.kicker,
    title: data.title,
    subtitle: data.subtitle,
    primaryCta: data.primaryButton
      ? { label: data.primaryButton.text, href: data.primaryButton.url }
      : undefined,
    secondaryCta: data.secondaryButton
      ? { label: data.secondaryButton.text, href: data.secondaryButton.url }
      : undefined,
    media: data.video?.src
      ? {
          type: 'video',
          src: data.video.src,
          alt: data.video.alt
        }
      : data.image?.src
      ? {
          type: 'image',
          src: data.image.src,
          alt: data.image.alt,
          width: data.image.width,
          height: data.image.height
        }
      : undefined,
    highlights: data.highlights?.map(h => ({
      text: h.text,
      count: h.count
    })),
    backgroundGradient: data.backgroundGradient ?? true,
  }
}

/**
 * Adapter to convert the existing Hero component props to the new format
 * This allows for gradual migration from the old component
 */
export function heroFromLegacy(data: {
  title?: string
  subtitle?: string
  description?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  heroImage?: { src: string; alt: string; width: number; height: number }
  backgroundGradient?: boolean
}): HeroFuturisticProps {
  return {
    kicker: data.subtitle,
    title: data.title || 'Welcome',
    subtitle: data.description,
    primaryCta: data.primaryCta
      ? { label: data.primaryCta.text, href: data.primaryCta.href }
      : undefined,
    secondaryCta: data.secondaryCta
      ? { label: data.secondaryCta.text, href: data.secondaryCta.href }
      : undefined,
    media: data.heroImage
      ? {
          type: 'image',
          src: data.heroImage.src,
          alt: data.heroImage.alt,
          width: data.heroImage.width,
          height: data.heroImage.height
        }
      : undefined,
    backgroundGradient: data.backgroundGradient,
  }
}