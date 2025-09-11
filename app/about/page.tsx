'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Target, Award, Zap } from 'lucide-react'
import { Footer } from '@/components/footer'

const values = [
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Mission-Driven',
    description: 'We believe in building technology that makes a real difference in people\'s lives and businesses.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'User-Centered',
    description: 'Every decision we make is guided by what\'s best for our users and their experience.'
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Quality First',
    description: 'We never compromise on quality, from code to customer service, everything we do is done right.'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Innovation',
    description: 'We stay at the cutting edge of technology to deliver the most advanced solutions.'
  }
]

const team = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Co-founder',
    image: '/placeholder-user.jpg',
    bio: 'Former tech lead at major SaaS companies with 10+ years building scalable platforms.'
  },
  {
    name: 'Sarah Chen',
    role: 'CTO & Co-founder', 
    image: '/placeholder-user.jpg',
    bio: 'Full-stack engineer passionate about performance, accessibility, and user experience.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Design',
    image: '/placeholder-user.jpg',
    bio: 'Design systems expert who believes great design should be invisible and intuitive.'
  },
  {
    name: 'Emily Davis',
    role: 'Head of Engineering',
    image: '/placeholder-user.jpg',
    bio: 'Infrastructure specialist focused on building reliable, scalable systems that just work.'
  }
]

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Modern SaaS Platform'
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                About Our Company
              </div>
              <h1 className="text-display text-foreground">
                Building the future with purpose
              </h1>
              <p className="text-body-lg max-w-2xl mx-auto">
                We're a team of passionate engineers, designers, and innovators dedicated to creating 
                technology that empowers businesses to achieve more than they thought possible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-heading-1 text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-body text-muted-foreground">
                <p>
                  Founded in 2020, our company emerged from a simple observation: most business 
                  software is either too complex for small teams or too limited for growing companies. 
                  We set out to bridge that gap.
                </p>
                <p>
                  Starting with just two co-founders working out of a garage, we've grown into a 
                  distributed team of experts who share a common vision: technology should amplify 
                  human potential, not complicate it.
                </p>
                <p>
                  Today, we serve thousands of customers worldwide, from startups to enterprises, 
                  helping them streamline their operations and focus on what matters most: their business.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square relative overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.jpg"
                  alt="Our team working together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-heading-1 text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-body-lg">
              These core principles guide everything we do, from product development to customer relationships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-heading-3 text-foreground">
                  {value.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-heading-1 text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-body-lg">
              The passionate individuals who make our vision a reality every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="128px"
                  />
                </div>
                <div>
                  <h3 className="text-heading-3 text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-3">
                    {member.role}
                  </p>
                  <p className="text-body-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-heading-1 text-foreground mb-6">
              Join us on our journey
            </h2>
            <p className="text-body-lg mb-8">
              Ready to be part of building the future? We're always looking for talented individuals 
              who share our passion for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Get in Touch
              </a>
              <a
                href="/careers"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border bg-background hover:bg-muted font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                View Careers
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}