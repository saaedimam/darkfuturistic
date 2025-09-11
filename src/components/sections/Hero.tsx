'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Zap, Shield } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  imageSrc?: string
  imageAlt?: string
  showStats?: boolean
  showVideo?: boolean
  videoSrc?: string
}

export function Hero({
  title = "Build the Future with Modern SaaS",
  subtitle = "Production-Grade Platform",
  description = "A comprehensive Next.js platform built with TypeScript, Tailwind CSS, and shadcn/ui. Featuring accessibility, performance optimization, and modern design patterns.",
  ctaText = "Get Started",
  ctaHref = "#pricing",
  secondaryCtaText = "Watch Demo",
  secondaryCtaHref = "#demo",
  imageSrc = "/hero-image.jpg",
  imageAlt = "Modern SaaS Platform Dashboard",
  showStats = true,
  showVideo = false,
  videoSrc = "/demo-video.mp4",
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Uptime', value: '99.9%', icon: Zap },
    { label: 'Security', value: 'Enterprise', icon: Shield },
  ]

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

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Star className="h-3 w-3 fill-current" />
                {subtitle}
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              {showVideo && (
                <Button variant="outline" size="lg" asChild>
                  <Link href={secondaryCtaHref} className="group">
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {secondaryCtaText}
                  </Link>
                </Button>
              )}
            </motion.div>

            {showStats && (
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Image/Video */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
              {showVideo ? (
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 p-0 bg-primary hover:bg-primary/90"
                    aria-label="Play demo video"
                  >
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </Button>
                </div>
              ) : (
                <div className="aspect-video relative">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover"
                    onLoad={() => setIsLoaded(true)}
                  />
                  
                  {/* Image overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}