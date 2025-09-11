'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Logo {
  name: string
  src: string
  width: number
  height: number
  href?: string
}

interface LogosProps {
  title?: string
  subtitle?: string
  logos?: Logo[]
  className?: string
}

const defaultLogos: Logo[] = [
  {
    name: "Vercel",
    src: "/placeholder-logo.svg",
    width: 120,
    height: 40,
    href: "https://vercel.com"
  },
  {
    name: "Next.js",
    src: "/placeholder-logo.svg", 
    width: 120,
    height: 40,
    href: "https://nextjs.org"
  },
  {
    name: "React",
    src: "/placeholder-logo.svg",
    width: 120,
    height: 40,
    href: "https://react.dev"
  },
  {
    name: "TypeScript",
    src: "/placeholder-logo.svg",
    width: 120,
    height: 40,
    href: "https://typescriptlang.org"
  },
  {
    name: "Tailwind CSS",
    src: "/placeholder-logo.svg",
    width: 120,
    height: 40,
    href: "https://tailwindcss.com"
  },
  {
    name: "Framer Motion",
    src: "/placeholder-logo.svg",
    width: 120,
    height: 40,
    href: "https://framer.com/motion"
  }
]

export function Logos({
  title = "Trusted by industry leaders",
  subtitle = "Built with the best",
  logos = defaultLogos,
  className
}: LogosProps) {
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
        "py-16 lg:py-24 bg-muted/30",
        className
      )}
      aria-labelledby="logos-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-body text-muted-foreground">
              {subtitle}
            </p>
            <h2 
              id="logos-title"
              className="text-heading-2 text-foreground"
            >
              {title}
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group relative flex items-center justify-center",
                "p-4 rounded-lg transition-all duration-300",
                "hover:bg-background hover:shadow-md",
                logo.href && "cursor-pointer focus-ring"
              )}
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded-lg"
                  aria-label={`Visit ${logo.name} website`}
                >
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    width={logo.width}
                    height={logo.height}
                    className={cn(
                      "max-h-8 w-auto object-contain transition-all duration-300",
                      "opacity-60 hover:opacity-100",
                      "grayscale hover:grayscale-0"
                    )}
                    loading="lazy"
                  />
                </a>
              ) : (
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className={cn(
                    "max-h-8 w-auto object-contain transition-all duration-300",
                    "opacity-60 hover:opacity-100",
                    "grayscale hover:grayscale-0"
                  )}
                  loading="lazy"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional stats or metrics */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="text-3xl font-bold text-foreground">10k+</div>
            <div className="text-body text-muted-foreground">Active Users</div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="text-3xl font-bold text-foreground">99.9%</div>
            <div className="text-body text-muted-foreground">Uptime</div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="text-3xl font-bold text-foreground">4.9/5</div>
            <div className="text-body text-muted-foreground">User Rating</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export type { LogosProps, Logo }