'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type HeroFuturisticProps = {
  kicker?: string
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  // Media can be an image or video; keeping it simple first
  media?: {
    type: 'image' | 'video'
    src: string
    alt?: string
    width?: number
    height?: number
  }
  // Optional badges / highlights for social proof
  highlights?: Array<{ 
    icon?: React.ReactNode
    text: string
    count?: string
  }>
  // Design options
  backgroundGradient?: boolean
  className?: string
}

export default function HeroFuturistic({
  kicker,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  media,
  highlights = [],
  backgroundGradient = true,
  className = '',
}: HeroFuturisticProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        duration: shouldReduceMotion ? 0.01 : 0.6,
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "px-4 sm:px-6 lg:px-8",
        backgroundGradient && "bg-gradient-to-br from-background via-background to-muted/20",
        className
      )}
      aria-labelledby="hero-title"
    >
      {/* Background decoration */}
      {backgroundGradient && (
        <div 
          className="absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      )}

      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              {kicker && (
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  {kicker}
                </div>
              )}
              
              <h1 
                id="hero-title"
                className="text-display text-foreground max-w-2xl"
              >
                {title}
              </h1>
              
              {subtitle && (
                <p className="text-body-lg max-w-xl">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                {primaryCta && (
                  <Button
                    size="lg"
                    className="focus-ring group"
                    asChild
                  >
                    <a href={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                )}
                
                {secondaryCta && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="focus-ring group"
                    asChild
                  >
                    <a href={secondaryCta.href}>
                      <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      {secondaryCta.label}
                    </a>
                  </Button>
                )}
              </motion.div>
            )}

            {/* Highlights/Social proof */}
            {highlights.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-8 text-muted-foreground text-sm flex-wrap"
              >
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {highlight.icon && (
                      <span className="flex-shrink-0">{highlight.icon}</span>
                    )}
                    {highlight.count && (
                      <span className="font-semibold text-foreground">{highlight.count}</span>
                    )}
                    <span>{highlight.text}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Media */}
          {media?.src && (
            <motion.div
              variants={imageVariants}
              className="relative"
            >
              {media.type === 'image' && (
                <div className="relative aspect-[4/3] lg:aspect-[3/4] max-w-lg mx-auto lg:max-w-none">
                  {/* Loading placeholder to prevent CLS */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-muted rounded-2xl animate-pulse",
                      imageLoaded && "opacity-0"
                    )}
                    style={{
                      aspectRatio: media.width && media.height 
                        ? `${media.width} / ${media.height}` 
                        : '4 / 3'
                    }}
                  />
                  
                  <Image
                    src={media.src}
                    alt={media.alt ?? ''}
                    width={media.width ?? 800}
                    height={media.height ?? 600}
                    priority // LCP optimization
                    className={cn(
                      "rounded-2xl object-cover shadow-2xl transition-opacity duration-500",
                      imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                  />
                  
                  {/* Image decoration */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl -z-10 blur-2xl opacity-50" />
                </div>
              )}

              {media.type === 'video' && (
                <div className="relative aspect-video max-w-lg mx-auto lg:max-w-none">
                  <video
                    src={media.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    aria-label={media.alt ?? 'Hero video'}
                  />
                  {/* Video decoration */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl -z-10 blur-2xl opacity-50" />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}