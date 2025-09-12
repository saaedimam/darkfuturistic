'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    details: 'hello@example.com',
    description: 'Send us an email anytime'
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 6pm PST'
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Office',
    details: 'San Francisco, CA',
    description: 'Come say hello at our HQ'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Response Time',
    details: '< 24 hours',
    description: 'We respond to all inquiries quickly'
  }
]

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | Modern SaaS Platform'
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
                Get in Touch
              </div>
              <h1 className="text-display text-foreground">
                Let's start a conversation
              </h1>
              <p className="text-body-lg max-w-2xl mx-auto">
                Have questions about our platform? Need help getting started? 
                Our team is here to support you every step of the way.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  {info.icon}
                </div>
                <h3 className="text-heading-3 text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="font-medium text-foreground mb-1">
                  {info.details}
                </p>
                <p className="text-body-sm text-muted-foreground">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-foreground mb-4">
                Send us a message
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 lg:p-12 shadow-sm">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-foreground mb-4">
                Common Questions
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Quick answers to questions you might have before reaching out.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-heading-3 text-foreground mb-2">
                    How quickly do you respond?
                  </h3>
                  <p className="text-body text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
                <div>
                  <h3 className="text-heading-3 text-foreground mb-2">
                    Do you offer demos?
                  </h3>
                  <p className="text-body text-muted-foreground">
                    Yes! We'd love to show you how our platform can work for your business. 
                    Schedule a personalized demo through our contact form.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-heading-3 text-foreground mb-2">
                    What support do you provide?
                  </h3>
                  <p className="text-body text-muted-foreground">
                    We offer comprehensive support including documentation, video tutorials, 
                    email support, and priority support for enterprise customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-heading-3 text-foreground mb-2">
                    Can I schedule a call?
                  </h3>
                  <p className="text-body text-muted-foreground">
                    Absolutely! Mention your preferred time in the contact form and we'll 
                    coordinate a call that works for both of us.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}