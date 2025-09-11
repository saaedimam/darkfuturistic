'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Users, Target, Award, Heart } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

const features = [
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by developers, for developers. Our community is at the heart of everything we do.',
  },
  {
    icon: Target,
    title: 'Mission Focused',
    description: 'We are committed to creating tools that make web development more accessible and enjoyable.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every line of code is written with care, tested thoroughly, and optimized for performance.',
  },
  {
    icon: Heart,
    title: 'Open Source',
    description: 'We believe in the power of open source and contribute back to the community.',
  },
]

export function AboutSection() {
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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              About ioriimasu
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We are passionate developers creating modern, accessible, and performant web experiences. 
              Our mission is to make web development more enjoyable and accessible to everyone.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Story Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ioriimasu was born from a simple idea: create a platform that combines the best of modern web technologies 
                  with a focus on developer experience and user accessibility.
                </p>
                <p>
                  We started as a small team of developers who were frustrated with the complexity and bloat of existing solutions. 
                  We wanted something that was both powerful and simple to use.
                </p>
                <p>
                  Today, we're proud to serve thousands of developers worldwide, providing them with the tools they need to 
                  build amazing web experiences.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    Built with ❤️
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="bg-muted/50 rounded-2xl p-8 sm:p-12">
            <div className="text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                By the Numbers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold text-primary">10K+</div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold text-primary">99.9%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold text-primary">50+</div>
                  <div className="text-muted-foreground">Contributors</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}