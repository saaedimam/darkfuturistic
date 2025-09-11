'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail,
  ArrowUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

interface FooterProps {
  companyName?: string
  description?: string
  sections?: FooterSection[]
  socialLinks?: SocialLink[]
  className?: string
}

const defaultSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Integrations", href: "/integrations" },
      { name: "API", href: "/api" },
      { name: "Changelog", href: "/changelog" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Guides", href: "/guides" },
      { name: "Webinars", href: "/webinars" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Security", href: "/security" },
    ]
  }
]

const defaultSocialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter className="h-5 w-5" />
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <Github className="h-5 w-5" />
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="h-5 w-5" />
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: <Mail className="h-5 w-5" />
  }
]

export function Footer({
  companyName = "Brand",
  description = "Building the future with modern technology and innovative solutions.",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  className
}: FooterProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        duration: shouldReduceMotion ? 0.01 : 0.6,
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={ref}
      className={cn(
        "bg-muted/30 border-t border-border",
        className
      )}
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-16 lg:py-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              <div className="space-y-4">
                <Link
                  href="/"
                  className="focus-ring flex items-center space-x-2 rounded-md px-2 py-1 -mx-2"
                  aria-label="Home"
                >
                  <div className="h-8 w-8 rounded-md bg-primary" />
                  <span className="text-xl font-bold text-foreground">{companyName}</span>
                </Link>
                
                <p className="text-body text-muted-foreground max-w-sm">
                  {description}
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Follow us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-md text-muted-foreground hover:text-foreground",
                        "hover:bg-muted transition-colors focus-ring"
                      )}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <nav role="navigation" aria-label={`${section.title} links`}>
                    <ul className="space-y-3" role="list">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className={cn(
                              "text-sm text-muted-foreground hover:text-foreground",
                              "transition-colors focus-ring rounded-sm"
                            )}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground focus-ring rounded-sm">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground focus-ring rounded-sm">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-foreground focus-ring rounded-sm">
                Cookies
              </Link>
            </div>
          </div>

          {/* Back to top button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="focus-ring group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            Back to top
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}

export type { FooterProps, FooterSection, FooterLink, SocialLink }