'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Globe, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  benefits?: string[]
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  description?: string
  features?: Feature[]
  className?: string
}

const defaultFeatures: Feature[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Built for speed with modern architecture and optimizations that deliver sub-second load times.",
    benefits: ["< 1.8s LCP", "Optimized bundles", "Edge caching"]
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, compliance certifications, and audit logs.",
    benefits: ["SOC 2 compliant", "GDPR ready", "Zero-trust architecture"]
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile First",
    description: "Responsive design that works perfectly on any device with native app-like experience.",
    benefits: ["PWA support", "Offline mode", "Touch optimized"]
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Real-time insights and detailed analytics to help you make data-driven decisions.",
    benefits: ["Real-time dashboards", "Custom reports", "API access"]
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Scale",
    description: "Worldwide infrastructure with CDN and edge computing for optimal performance everywhere.",
    benefits: ["99.9% uptime", "Global CDN", "Auto-scaling"]
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Built-in collaboration tools with role-based access control and team management.",
    benefits: ["Role management", "Team workspaces", "Activity tracking"]
  }
]

export function Features({
  title = "Everything you need to succeed",
  subtitle = "Powerful Features",
  description = "Our platform provides all the tools and features you need to build, scale, and manage your business effectively.",
  features = defaultFeatures,
  className
}: FeaturesProps) {
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
        "py-24 lg:py-32 bg-background",
        className
      )}
      aria-labelledby="features-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {subtitle}
            </div>
            <h2 
              id="features-title"
              className="text-heading-1 text-foreground"
            >
              {title}
            </h2>
            <p className="text-body-lg">
              {description}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group relative p-6 rounded-2xl border border-border bg-card",
                "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              )}
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary",
                  "group-hover:bg-primary group-hover:text-primary-foreground",
                  "transition-colors duration-300"
                )}>
                  {feature.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-heading-3 text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-body text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  
                  {feature.benefits && (
                    <ul className="space-y-2" role="list">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li 
                          key={benefitIndex}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Button size="lg" className="focus-ring group">
            Explore All Features
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export type { FeaturesProps, Feature }