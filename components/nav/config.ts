export const navConfig = {
  overlay: { 
    variant: "fullscreen" as const, 
    blur: true, 
    glass: true 
  },
  menuButton: { 
    position: "top-right" as const, 
    size: 56 
  },
  smoothScroll: { 
    enabled: true, 
    offset: 0, 
    duration: 700, 
    easing: "easeOutCubic" as const 
  },
  links: [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ],
} as const

export type NavConfig = typeof navConfig
