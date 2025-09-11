import type { HeroFuturisticProps } from '@/components/hero-futuristic'
import { Users, Star, TrendingUp, Shield, Zap } from 'lucide-react'

/**
 * Example adapters for different CMS platforms
 * Choose the one that matches your CMS structure
 */

// 1. CONTENTFUL ADAPTER
export type ContentfulHero = {
  fields: {
    title: string
    subtitle?: string
    description?: string
    primaryButtonText?: string
    primaryButtonUrl?: string
    secondaryButtonText?: string
    secondaryButtonUrl?: string
    heroImage?: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number
              height: number
            }
          }
        }
        title: string
      }
    }
    kicker?: string
    features?: string[]
    stats?: {
      users?: string
      rating?: string
      uptime?: string
    }
  }
}

export function heroFromContentful(entry: ContentfulHero): HeroFuturisticProps {
  const fields = entry.fields
  
  const highlights: HeroFuturisticProps['highlights'] = []
  
  if (fields.stats?.users) {
    highlights.push({
      icon: <Users className="h-4 w-4" />,
      count: fields.stats.users,
      text: 'users'
    })
  }
  
  if (fields.stats?.rating) {
    highlights.push({
      icon: <Star className="h-4 w-4 fill-current text-yellow-500" />,
      count: fields.stats.rating,
      text: 'rating'
    })
  }
  
  if (fields.stats?.uptime) {
    highlights.push({
      icon: <Shield className="h-4 w-4" />,
      text: `${fields.stats.uptime} uptime`
    })
  }
  
  if (fields.features?.length) {
    fields.features.forEach(feature => {
      highlights.push({ text: feature })
    })
  }

  return {
    kicker: fields.kicker,
    title: fields.title,
    subtitle: fields.description,
    primaryCta: fields.primaryButtonText && fields.primaryButtonUrl
      ? { label: fields.primaryButtonText, href: fields.primaryButtonUrl }
      : undefined,
    secondaryCta: fields.secondaryButtonText && fields.secondaryButtonUrl
      ? { label: fields.secondaryButtonText, href: fields.secondaryButtonUrl }
      : undefined,
    media: fields.heroImage?.fields.file.url
      ? {
          type: 'image',
          src: `https:${fields.heroImage.fields.file.url}`,
          alt: fields.heroImage.fields.title,
          width: fields.heroImage.fields.file.details.image.width,
          height: fields.heroImage.fields.file.details.image.height
        }
      : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
  }
}

// 2. SANITY ADAPTER
export type SanityHero = {
  title: string
  subtitle?: string
  body?: Array<{ children: Array<{ text: string }> }>
  primaryCta?: { title: string; url: string }
  secondaryCta?: { title: string; url: string }
  image?: {
    asset: {
      url: string
      metadata: {
        dimensions: { width: number; height: number }
      }
    }
    alt?: string
  }
  badge?: string
  highlights?: Array<{ text: string; metric?: string }>
}

export function heroFromSanity(data: SanityHero): HeroFuturisticProps {
  const bodyText = data.body?.[0]?.children?.map(child => child.text).join(' ')
  
  return {
    kicker: data.badge,
    title: data.title,
    subtitle: bodyText,
    primaryCta: data.primaryCta
      ? { label: data.primaryCta.title, href: data.primaryCta.url }
      : undefined,
    secondaryCta: data.secondaryCta
      ? { label: data.secondaryCta.title, href: data.secondaryCta.url }
      : undefined,
    media: data.image?.asset.url
      ? {
          type: 'image',
          src: data.image.asset.url,
          alt: data.image.alt,
          width: data.image.asset.metadata.dimensions.width,
          height: data.image.asset.metadata.dimensions.height
        }
      : undefined,
    highlights: data.highlights?.map(h => ({
      text: h.text,
      count: h.metric,
      icon: <Zap className="h-4 w-4" />
    })),
  }
}

// 3. STRAPI ADAPTER
export type StrapiHero = {
  attributes: {
    Title: string
    Subtitle?: string
    Description?: string
    Kicker?: string
    PrimaryButton?: {
      Label: string
      URL: string
    }
    SecondaryButton?: {
      Label: string
      URL: string
    }
    HeroImage?: {
      data: {
        attributes: {
          url: string
          alternativeText?: string
          width: number
          height: number
        }
      }
    }
    Features?: Array<{ Feature: string }>
    SocialProof?: {
      UserCount?: string
      Rating?: string
    }
  }
}

export function heroFromStrapi(data: StrapiHero): HeroFuturisticProps {
  const attrs = data.attributes
  
  const highlights: HeroFuturisticProps['highlights'] = []
  
  if (attrs.SocialProof?.UserCount) {
    highlights.push({
      icon: <Users className="h-4 w-4" />,
      count: attrs.SocialProof.UserCount,
      text: 'users'
    })
  }
  
  if (attrs.SocialProof?.Rating) {
    highlights.push({
      icon: <Star className="h-4 w-4 fill-current text-yellow-500" />,
      count: attrs.SocialProof.Rating,
      text: 'rating'
    })
  }
  
  if (attrs.Features?.length) {
    attrs.Features.forEach(feature => {
      highlights.push({ text: feature.Feature })
    })
  }

  return {
    kicker: attrs.Kicker,
    title: attrs.Title,
    subtitle: attrs.Description,
    primaryCta: attrs.PrimaryButton
      ? { label: attrs.PrimaryButton.Label, href: attrs.PrimaryButton.URL }
      : undefined,
    secondaryCta: attrs.SecondaryButton
      ? { label: attrs.SecondaryButton.Label, href: attrs.SecondaryButton.URL }
      : undefined,
    media: attrs.HeroImage?.data.attributes.url
      ? {
          type: 'image',
          src: attrs.HeroImage.data.attributes.url,
          alt: attrs.HeroImage.data.attributes.alternativeText,
          width: attrs.HeroImage.data.attributes.width,
          height: attrs.HeroImage.data.attributes.height
        }
      : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
  }
}

// 4. GENERIC REST API ADAPTER
export type RestApiHero = {
  id: string
  title: string
  subtitle?: string
  content?: string
  badge?: string
  buttons?: Array<{
    text: string
    url: string
    primary?: boolean
  }>
  image?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  metrics?: Array<{
    label: string
    value: string
    icon?: string
  }>
}

export function heroFromRestApi(data: RestApiHero): HeroFuturisticProps {
  const primaryButton = data.buttons?.find(b => b.primary)
  const secondaryButton = data.buttons?.find(b => !b.primary)
  
  return {
    kicker: data.badge,
    title: data.title,
    subtitle: data.content,
    primaryCta: primaryButton
      ? { label: primaryButton.text, href: primaryButton.url }
      : undefined,
    secondaryCta: secondaryButton
      ? { label: secondaryButton.text, href: secondaryButton.url }
      : undefined,
    media: data.image?.url
      ? {
          type: 'image',
          src: data.image.url,
          alt: data.image.alt,
          width: data.image.width,
          height: data.image.height
        }
      : undefined,
    highlights: data.metrics?.map(metric => ({
      count: metric.value,
      text: metric.label,
      icon: metric.icon ? <TrendingUp className="h-4 w-4" /> : undefined
    })),
  }
}

/**
 * Universal adapter that tries to detect the data format and use the appropriate adapter
 * Useful when you're not sure which format the data is in
 */
export function heroFromUnknown(data: any): HeroFuturisticProps {
  // Detect Contentful format
  if (data.fields) {
    return heroFromContentful(data as ContentfulHero)
  }
  
  // Detect Strapi format
  if (data.attributes) {
    return heroFromStrapi(data as StrapiHero)
  }
  
  // Detect REST API format
  if (data.id && data.buttons) {
    return heroFromRestApi(data as RestApiHero)
  }
  
  // Fallback to local format
  return heroFromLocal(data as any)
}