'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'Community', href: '/community' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Status', href: '/status' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

const contactInfo = [
  { icon: Mail, text: 'hello@ioriimasu.com', href: 'mailto:hello@ioriimasu.com' },
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, text: 'San Francisco, CA', href: '#' },
]

export function Footer() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="py-16 space-y-12"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">I</span>
                  </div>
                  <span className="font-bold text-xl text-foreground">ioriimasu</span>
                </div>
                <p className="text-muted-foreground max-w-md">
                  A modern, production-ready website built with Next.js, TypeScript, and Tailwind CSS. 
                  Creating amazing web experiences for everyone.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <contact.icon className="h-4 w-4 text-primary" />
                    <a
                      href={contact.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {contact.text}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
              <motion.div
                key={section}
                variants={itemVariants}
                transition={{ delay: sectionIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-foreground capitalize">
                  {section}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.href}
                      variants={itemVariants}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    >
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-border"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ioriimasu. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Back to top
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}