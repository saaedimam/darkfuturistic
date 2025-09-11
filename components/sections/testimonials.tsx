'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: string
  content: string
  author: {
    name: string
    role: string
    company: string
    avatar: string
  }
  rating: number
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  description?: string
  testimonials?: Testimonial[]
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    content: "This platform has completely transformed how we handle our business operations. The intuitive design and powerful features have saved us countless hours.",
    author: {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5
  },
  {
    id: "2", 
    content: "The level of customization and the quality of support is outstanding. We've seen a 40% increase in productivity since switching to this platform.",
    author: {
      name: "Michael Chen",
      role: "CTO",
      company: "InnovateNow",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5
  },
  {
    id: "3",
    content: "Amazing platform with incredible performance. The team behind it clearly understands what businesses need. Highly recommend to anyone looking to scale.",
    author: {
      name: "Emily Rodriguez",
      role: "Product Manager",
      company: "GrowthCorp",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5
  },
  {
    id: "4",
    content: "The analytics and insights provided have been game-changing for our decision making. The interface is clean and the features are exactly what we needed.",
    author: {
      name: "David Kim",
      role: "Operations Director",
      company: "ScaleTech",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5
  },
  {
    id: "5",
    content: "Exceptional service and a platform that actually delivers on its promises. The migration was seamless and the results have exceeded our expectations.",
    author: {
      name: "Lisa Thompson",
      role: "Founder",
      company: "NextGen Solutions",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5
  },
  {
    id: "6",
    content: "The best investment we've made for our business infrastructure. The ROI has been incredible and the platform continues to evolve with our needs.",
    author: {
      name: "James Wilson",
      role: "VP of Engineering",
      company: "BuildFast Co",
      avatar: "/placeholder-user.jpg"
    },
    rating: 5
  }
]

export function Testimonials({
  title = "Loved by thousands of customers",
  subtitle = "Customer Stories",
  description = "Don't just take our word for it. Here's what our customers have to say about their experience.",
  testimonials = defaultTestimonials,
  className
}: TestimonialsProps) {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ))
  }

  return (
    <section
      ref={ref}
      className={cn(
        "py-24 lg:py-32 bg-muted/30",
        className
      )}
      aria-labelledby="testimonials-title"
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
              id="testimonials-title"
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className={cn(
                "relative p-6 rounded-2xl border border-border bg-card",
                "hover:shadow-lg transition-all duration-300"
              )}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4">
                <Quote className="h-6 w-6 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-body text-foreground mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={testimonial.author.avatar}
                    alt={`${testimonial.author.name} avatar`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.author.role} at {testimonial.author.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall rating summary */}
        <motion.div
          className="text-center mt-16 p-8 rounded-2xl bg-background border border-border"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            {renderStars(5)}
            <span className="text-2xl font-bold text-foreground ml-2">4.9</span>
          </div>
          <p className="text-body text-muted-foreground">
            Based on 1,200+ reviews from verified customers
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export type { TestimonialsProps, Testimonial }