import { describe, it, expect } from 'vitest'
import { heroFromCms, heroFromLocal, heroFromLegacy, type CmsHero, type LocalHeroData } from '@/lib/adapters/hero'

describe('Hero Adapters', () => {
  describe('heroFromCms', () => {
    it('handles full CMS data correctly', () => {
      const cmsData: CmsHero = {
        eyebrow: 'Test Kicker',
        headline: 'Test Title',
        description: 'Test description',
        ctas: {
          primaryLabel: 'Primary CTA',
          primaryHref: '/primary',
          secondaryLabel: 'Secondary CTA',
          secondaryHref: '/secondary',
        },
        media: {
          kind: 'image',
          url: '/test-image.jpg',
          alt: 'Test image',
          width: 800,
          height: 600,
        },
        bullets: ['Feature 1', 'Feature 2'],
        socialProof: {
          userCount: '1000+',
          rating: '4.8/5',
          trend: 'Growing fast',
        },
        showBackground: true,
      }

      const result = heroFromCms(cmsData)

      expect(result).toEqual({
        kicker: 'Test Kicker',
        title: 'Test Title',
        subtitle: 'Test description',
        primaryCta: { label: 'Primary CTA', href: '/primary' },
        secondaryCta: { label: 'Secondary CTA', href: '/secondary' },
        media: {
          type: 'image',
          src: '/test-image.jpg',
          alt: 'Test image',
          width: 800,
          height: 600,
        },
        highlights: expect.arrayContaining([
          expect.objectContaining({ count: '1000+', text: 'users' }),
          expect.objectContaining({ count: '4.8/5', text: 'rating' }),
          expect.objectContaining({ text: 'Growing fast' }),
          expect.objectContaining({ text: 'Feature 1' }),
          expect.objectContaining({ text: 'Feature 2' }),
        ]),
        backgroundGradient: true,
      })
    })

    it('handles missing CTAs gracefully', () => {
      const cmsData: CmsHero = {
        headline: 'Test Title',
        ctas: {
          primaryLabel: 'Primary Only',
          primaryHref: '/primary',
          // Missing secondary CTA
        },
      }

      const result = heroFromCms(cmsData)

      expect(result.primaryCta).toEqual({ label: 'Primary Only', href: '/primary' })
      expect(result.secondaryCta).toBeUndefined()
    })

    it('handles missing media gracefully', () => {
      const cmsData: CmsHero = {
        headline: 'Test Title',
        // No media provided
      }

      const result = heroFromCms(cmsData)

      expect(result.media).toBeUndefined()
    })

    it('handles empty bullets and no social proof', () => {
      const cmsData: CmsHero = {
        headline: 'Test Title',
        bullets: [],
        // No social proof
      }

      const result = heroFromCms(cmsData)

      expect(result.highlights).toBeUndefined()
    })

    it('handles video media type', () => {
      const cmsData: CmsHero = {
        headline: 'Test Title',
        media: {
          kind: 'video',
          url: '/test-video.mp4',
          alt: 'Test video',
        },
      }

      const result = heroFromCms(cmsData)

      expect(result.media).toEqual({
        type: 'video',
        src: '/test-video.mp4',
        alt: 'Test video',
        width: undefined,
        height: undefined,
      })
    })
  })

  describe('heroFromLocal', () => {
    it('handles full local data correctly', () => {
      const localData: LocalHeroData = {
        kicker: 'Local Kicker',
        title: 'Local Title',
        subtitle: 'Local subtitle',
        primaryButton: { text: 'Get Started', url: '/start' },
        secondaryButton: { text: 'Learn More', url: '/learn' },
        image: { src: '/local.jpg', alt: 'Local image', width: 400, height: 300 },
        highlights: [
          { count: '500+', text: 'users' },
          { text: 'Free trial' },
        ],
        backgroundGradient: false,
      }

      const result = heroFromLocal(localData)

      expect(result).toEqual({
        kicker: 'Local Kicker',
        title: 'Local Title',
        subtitle: 'Local subtitle',
        primaryCta: { label: 'Get Started', href: '/start' },
        secondaryCta: { label: 'Learn More', href: '/learn' },
        media: {
          type: 'image',
          src: '/local.jpg',
          alt: 'Local image',
          width: 400,
          height: 300,
        },
        highlights: [
          { count: '500+', text: 'users' },
          { text: 'Free trial' },
        ],
        backgroundGradient: false,
      })
    })

    it('prefers video over image when both are provided', () => {
      const localData: LocalHeroData = {
        title: 'Test Title',
        image: { src: '/image.jpg', alt: 'Image' },
        video: { src: '/video.mp4', alt: 'Video' },
      }

      const result = heroFromLocal(localData)

      expect(result.media).toEqual({
        type: 'video',
        src: '/video.mp4',
        alt: 'Video',
      })
    })

    it('handles minimal data', () => {
      const localData: LocalHeroData = {
        title: 'Minimal Title',
      }

      const result = heroFromLocal(localData)

      expect(result).toEqual({
        kicker: undefined,
        title: 'Minimal Title',
        subtitle: undefined,
        primaryCta: undefined,
        secondaryCta: undefined,
        media: undefined,
        highlights: undefined,
        backgroundGradient: true, // Default value
      })
    })
  })

  describe('heroFromLegacy', () => {
    it('converts legacy props correctly', () => {
      const legacyData = {
        title: 'Legacy Title',
        subtitle: 'Legacy Subtitle',
        description: 'Legacy description',
        primaryCta: { text: 'Legacy Primary', href: '/legacy-primary' },
        secondaryCta: { text: 'Legacy Secondary', href: '/legacy-secondary' },
        heroImage: {
          src: '/legacy-image.jpg',
          alt: 'Legacy image',
          width: 600,
          height: 400,
        },
        backgroundGradient: false,
      }

      const result = heroFromLegacy(legacyData)

      expect(result).toEqual({
        kicker: 'Legacy Subtitle',
        title: 'Legacy Title',
        subtitle: 'Legacy description',
        primaryCta: { label: 'Legacy Primary', href: '/legacy-primary' },
        secondaryCta: { label: 'Legacy Secondary', href: '/legacy-secondary' },
        media: {
          type: 'image',
          src: '/legacy-image.jpg',
          alt: 'Legacy image',
          width: 600,
          height: 400,
        },
        backgroundGradient: false,
      })
    })

    it('handles missing title with fallback', () => {
      const legacyData = {
        // No title provided
        description: 'Some description',
      }

      const result = heroFromLegacy(legacyData)

      expect(result.title).toBe('Welcome')
    })
  })
})