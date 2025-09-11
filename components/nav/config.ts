export type NavLink = { label: string; href: string }
export type Easing = 'easeOutCubic' | 'linear'

export interface NavConfig {
  overlay: { variant: 'fullscreen' | 'drawer'; blur: boolean; glass: boolean }
  menuButton: { position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; size: number }
  smoothScroll: { enabled: boolean; offset: number; duration: number; easing: Easing }
  links: NavLink[]
}

export const navConfig: NavConfig = {
  overlay: { variant: 'fullscreen', blur: true, glass: true },
  menuButton: { position: 'top-right', size: 56 },
  smoothScroll: { enabled: true, offset: 0, duration: 700, easing: 'easeOutCubic' },
  links: [
    { label: 'Hero', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
  ],
}
