'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  heroImage?: {
    src: string
    alt: string
    width: number
    height: number
  }
  backgroundGradient?: boolean
  className?: string
}

export function Hero({
  title = "Build the Future with Modern SaaS",
  subtitle = "Production-Ready Platform",
  description = "Transform your business with our cutting-edge platform designed for scale, performance, and user experience. Built with the latest technologies and best practices.",
  primaryCta = {
    text: "Get Started",
    href: "/signup"
  },
  secondaryCta = {
    text: "Watch Demo",
    href: "/demo"
  },
  heroImage = {
    src: "/placeholder.jpg",
    alt: "Hero illustration",
    width: 800,
    height: 600
  },
  backgroundGradient = true,
  className
}: HeroProps) {
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
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                {subtitle}
              </div>
              
              <h1 
                id="hero-title"
                className="text-display text-foreground max-w-2xl"
              >
                {title}
              </h1>
              
              <p className="text-body-lg max-w-xl">
                {description}
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="focus-ring group"
                asChild
              >
                <a href={primaryCta.href}>
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="focus-ring group"
                asChild
              >
                <a href={secondaryCta.href}>
                  <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  {secondaryCta.text}
                </a>
              </Button>
            </motion.div>

            {/* Social proof indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-8 text-muted-foreground text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-background"
                    />
                  ))}
                </div>
                <span>10k+ users</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⭐⭐⭐⭐⭐</span>
                <span>4.9/5 rating</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-[3/4] max-w-lg mx-auto lg:max-w-none">
              {/* Loading placeholder to prevent CLS */}
              <div 
                className={cn(
                  "absolute inset-0 bg-muted rounded-2xl animate-pulse",
                  imageLoaded && "opacity-0"
                )}
                style={{
                  aspectRatio: `${heroImage.width} / ${heroImage.height}`
                }}
              />
              
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Add the blob animation to globals.css or here as a style tag
const blobAnimation = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`

// Export for use in stories/documentation
export type { HeroProps }