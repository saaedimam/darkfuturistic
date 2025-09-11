'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
  Code, 
  Palette,
  BarChart3,
  Users
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js 15 and optimized for performance. Experience blazing fast load times and smooth interactions.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade security with built-in protection against common vulnerabilities and threats.',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Responsive design that works perfectly on all devices, from mobile phones to desktop computers.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    icon: Globe,
    title: 'Accessible',
    description: 'WCAG 2.1 AA compliant with keyboard navigation, screen reader support, and high contrast modes.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Built with TypeScript, comprehensive documentation, and modern development tools.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Modern, clean interface with carefully crafted components and smooth animations.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950',
  },
  {
    icon: BarChart3,
    title: 'Analytics Ready',
    description: 'Built-in analytics and monitoring to help you understand your users and optimize performance.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Open source and community-focused with regular updates and contributions from developers worldwide.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-950',
  },
]

export function FeaturesSection() {
  const shouldReduceMotion = useReducedMotion()

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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Why Choose ioriimasu?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with modern web technologies and best practices to deliver exceptional user experiences.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: shouldReduceMotion ? 0 : -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="bg-background rounded-2xl p-8 sm:p-12 border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-primary">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-primary">&lt;1.8s</div>
                <div className="text-muted-foreground">Load Time</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-primary">100%</div>
                <div className="text-muted-foreground">Accessible</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}