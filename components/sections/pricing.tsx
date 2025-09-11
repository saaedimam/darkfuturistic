'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, X, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface PricingFeature {
  name: string
  included: boolean
  description?: string
}

interface PricingTier {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: PricingFeature[]
  cta: string
  popular?: boolean
  href: string
}

interface PricingProps {
  title?: string
  subtitle?: string
  description?: string
  tiers?: PricingTier[]
  className?: string
}

const defaultTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthlyPrice: 29,
    yearlyPrice: 290,
    href: "/signup?plan=starter",
    cta: "Start Free Trial",
    features: [
      { name: "Up to 5 projects", included: true },
      { name: "10GB storage", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Custom domain", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Priority support", included: false },
      { name: "Team collaboration", included: false },
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing teams and businesses",
    monthlyPrice: 99,
    yearlyPrice: 990,
    href: "/signup?plan=professional",
    cta: "Start Free Trial",
    popular: true,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "100GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom domain", included: true },
      { name: "Team collaboration", included: true },
      { name: "API access", included: true },
      { name: "White-label solution", included: false },
    ]
  },
  {
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    href: "/contact?plan=enterprise",
    cta: "Contact Sales",
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Unlimited storage", included: true },
      { name: "Custom analytics", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Multiple custom domains", included: true },
      { name: "Advanced team features", included: true },
      { name: "Full API access", included: true },
      { name: "White-label solution", included: true },
    ]
  }
]

export function Pricing({
  title = "Choose the perfect plan",
  subtitle = "Simple, Transparent Pricing",
  description = "Start for free, scale as you grow. No hidden fees, no surprises.",
  tiers = defaultTiers,
  className
}: PricingProps) {
  const [isYearly, setIsYearly] = useState(false)
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

  const formatPrice = (monthly: number, yearly: number) => {
    if (isYearly) {
      const monthlyFromYearly = yearly / 12
      return {
        price: Math.floor(monthlyFromYearly),
        period: 'month',
        savings: `Save $${(monthly * 12 - yearly)}`
      }
    }
    return {
      price: monthly,
      period: 'month',
      savings: null
    }
  }

  return (
    <section
      ref={ref}
      className={cn(
        "py-24 lg:py-32 bg-background",
        className
      )}
      aria-labelledby="pricing-title"
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
              id="pricing-title"
              className="text-heading-1 text-foreground"
            >
              {title}
            </h2>
            <p className="text-body-lg">
              {description}
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center space-x-4 mt-8"
          >
            <span className={cn(
              "text-sm font-medium",
              !isYearly ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle between monthly and yearly billing"
            />
            <span className={cn(
              "text-sm font-medium",
              isYearly ? "text-foreground" : "text-muted-foreground"
            )}>
              Yearly
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium dark:bg-green-900 dark:text-green-200">
              Save 20%
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tiers.map((tier, index) => {
            const pricing = formatPrice(tier.monthlyPrice, tier.yearlyPrice)
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "relative rounded-2xl border p-8 shadow-sm",
                  tier.popular 
                    ? "border-primary bg-primary/5 shadow-lg scale-105" 
                    : "border-border bg-card hover:shadow-md",
                  "transition-all duration-300"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-heading-3 text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-body text-muted-foreground mb-6">
                    {tier.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">
                        ${pricing.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        /{pricing.period}
                      </span>
                    </div>
                    {pricing.savings && (
                      <div className="text-sm text-green-600 mt-1">
                        {pricing.savings}
                      </div>
                    )}
                  </div>

                  <Button 
                    className={cn(
                      "w-full focus-ring group",
                      tier.popular 
                        ? "bg-primary hover:bg-primary/90" 
                        : "variant-outline"
                    )}
                    size="lg"
                    asChild
                  >
                    <a href={tier.href}>
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-medium text-foreground mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3" role="list">
                    {tier.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                        <span className={cn(
                          "ml-3 text-sm",
                          feature.included 
                            ? "text-foreground" 
                            : "text-muted-foreground line-through"
                        )}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* FAQ or additional info */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-body text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.{' '}
            <a 
              href="/pricing-faq" 
              className="text-primary hover:underline focus-ring rounded"
            >
              View pricing FAQ
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export type { PricingProps, PricingTier, PricingFeature }