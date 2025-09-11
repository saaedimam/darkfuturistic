import type { Metadata } from 'next'
import { ContactSection } from '../../src/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact - ioriimasu',
  description: 'Get in touch with us. We would love to hear from you.',
  openGraph: {
    title: 'Contact - ioriimasu',
    description: 'Get in touch with us. We would love to hear from you.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactSection />
    </div>
  )
}