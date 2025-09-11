'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
// import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@ioriimasu.com',
    description: 'Send us an email anytime',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri from 9am to 6pm',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'San Francisco, CA',
    description: 'Visit our office',
  },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form submitted:', data)
      // toast.success('Message sent successfully!')
      setIsSubmitted(true)
      reset()
    } catch (error) {
      // toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md mx-auto"
        >
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
          <p className="text-muted-foreground">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Have a question or want to work together? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Name *
                        </label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Your name"
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="your@email.com"
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="What's this about?"
                        className={errors.subject ? 'border-destructive' : ''}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us more..."
                        rows={6}
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}