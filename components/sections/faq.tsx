'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  subtitle?: string
  description?: string
  faqs?: FAQItem[]
  className?: string
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How do I get started with the platform?",
    answer: "Getting started is easy! Simply sign up for a free account, complete the onboarding process, and you'll have access to all the tools you need. Our setup wizard will guide you through the initial configuration, and you can start using the platform immediately."
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through our encrypted payment system."
  },
  {
    id: "3",
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access to your account until the end of your current billing period."
  },
  {
    id: "4",
    question: "Do you offer a free trial?",
    answer: "Absolutely! We offer a 14-day free trial for all our paid plans. No credit card is required to start your trial, and you'll have access to all premium features during this period."
  },
  {
    id: "5",
    question: "How secure is my data?",
    answer: "We take security very seriously. Your data is encrypted both in transit and at rest using industry-standard AES-256 encryption. We're SOC 2 compliant, GDPR ready, and undergo regular security audits by third-party experts."
  },
  {
    id: "6",
    question: "Can I integrate with other tools?",
    answer: "Yes! We offer integrations with over 100 popular tools including Slack, Google Workspace, Microsoft 365, Salesforce, and many more. We also provide a robust API for custom integrations."
  },
  {
    id: "7",
    question: "What kind of support do you provide?",
    answer: "We offer multiple support channels including email support, live chat, and a comprehensive knowledge base. Professional and Enterprise plans include priority support with faster response times."
  },
  {
    id: "8",
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the start of your next billing cycle. Any unused credits will be prorated."
  }
]

export function FAQ({
  title = "Frequently asked questions",
  subtitle = "Got Questions?",
  description = "Everything you need to know about our platform. Can't find the answer you're looking for? Please chat with our friendly team.",
  faqs = defaultFAQs,
  className
}: FAQProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
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
      aria-labelledby="faq-title"
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
              id="faq-title"
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
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
              >
                <AccordionItem 
                  value={faq.id}
                  className={cn(
                    "border border-border rounded-lg px-6 py-2",
                    "hover:shadow-md transition-shadow duration-200",
                    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  )}
                >
                  <AccordionTrigger 
                    className={cn(
                      "text-left hover:no-underline py-4",
                      "text-heading-3 text-foreground",
                      "focus:outline-none"
                    )}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-muted-foreground pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16 p-8 rounded-2xl bg-muted/50 border border-border"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-heading-3 text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-body text-muted-foreground mb-4">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center px-6 py-2 rounded-md",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "focus-ring font-medium transition-colors"
              )}
            >
              Get in touch
            </a>
            <a
              href="mailto:support@example.com"
              className={cn(
                "inline-flex items-center justify-center px-6 py-2 rounded-md",
                "border border-border bg-background hover:bg-muted",
                "focus-ring font-medium transition-colors"
              )}
            >
              Email support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export type { FAQProps, FAQItem }