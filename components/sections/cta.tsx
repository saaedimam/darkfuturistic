'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTAProps {
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
  backgroundGradient?: boolean
  className?: string
}

export function CTA({
  title = "Ready to get started?",
  subtitle = "Join thousands of satisfied customers",
  description = "Start your journey today with a free trial. No credit card required, no setup fees, and you can cancel anytime.",
  primaryCta = {
    text: "Start Free Trial",
    href: "/signup"
  },
  secondaryCta = {
    text: "Contact Sales",
    href: "/contact"
  },
  backgroundGradient = true,
  className
}: CTAProps) {
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

  return (
    <section
      ref={ref}
      className={cn(
        "py-24 lg:py-32 relative overflow-hidden",
        backgroundGradient && "bg-gradient-to-br from-primary/10 via-background to-accent/10",
        className
      )}
      aria-labelledby="cta-title"
    >
      {/* Background decoration */}
      {backgroundGradient && (
        <div 
          className="absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              {subtitle}
            </div>
            
            <h2 
              id="cta-title"
              className="text-display text-foreground"
            >
              {title}
            </h2>
            
            <p className="text-body-lg max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              size="lg"
              className="focus-ring group text-lg px-8 py-3"
              asChild
            >
              <a href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="focus-ring group text-lg px-8 py-3"
              asChild
            >
              <a href={secondaryCta.href}>
                {secondaryCta.text}
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-8 mt-12 text-muted-foreground text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export type { CTAProps }