"use client"

import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollProgress, useParallax, useHorizontalScroll } from "../hooks/useScrollEffects"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { ArrowRight, Zap, Shield, Rocket, Target, ChevronUp, Star, Info } from "lucide-react"

interface ScrollLandingPageProps {
  onNavigate?: (page: string) => void
}

export function ScrollLandingPage({ onNavigate }: ScrollLandingPageProps) {
  const scrollProgress = useScrollProgress()
  const parallaxOffset = useParallax()
  const [activeSection, setActiveSection] = useState("hero")
  const [portfolioItems, setPortfolioItems] = useState(6)
  const [isClient, setIsClient] = useState(false)
  const featureRefs = Array.from({ length: 4 }, () => React.createRef<HTMLDivElement>())
  const testimonialRefs = Array.from({ length: 3 }, () => React.createRef<HTMLDivElement>())

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Infinite scroll for portfolio
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const portfolioSection = document.getElementById("portfolio")
      if (portfolioSection) {
        const rect = portfolioSection.getBoundingClientRect()
        if (rect.bottom <= window.innerHeight + 200) {
          setPortfolioItems((prev) => Math.min(prev + 3, 15))
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  // Track active section based on scroll position
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const sections = ["hero", "features", "timeline", "portfolio", "testimonials"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  // Navigation sections
  const navSections = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "timeline", label: "Timeline" },
    { id: "portfolio", label: "Portfolio" },
    { id: "testimonials", label: "Testimonials" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative font-inter">
      {/* SCROLL PROGRESS BAR - Fixed at top indicating page progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600 origin-left z-50"
        style={{ scaleX: scrollProgress }}
      />

      {/* SMOOTH SCROLL NAVIGATION - Sticky navigation with active section highlighting */}
      <nav className="fixed top-1 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-slate-800">saaedimam</div>
            <div className="flex items-center gap-6">
              {navSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                    activeSection === id
                      ? "text-teal-600 bg-teal-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-teal-50 rounded-lg border border-teal-200"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </button>
              ))}
              <div className="w-px h-6 bg-slate-300 mx-2"></div>
              <button
                onClick={() => onNavigate?.("hero")}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-300"
              >
                Back to App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* PARALLAX HERO SECTION - Layered textile patterns with parallax effect */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden group">
        {/* Annotation for this section */}
        <div className="absolute top-24 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
          <Card className="p-4 bg-slate-800/90 backdrop-blur-md border-teal-400/30 shadow-xl max-w-80">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Info className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="border-teal-300 text-teal-300 mb-2 text-xs">
                  Parallax Hero
                </Badge>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Multi-layered background elements move at different speeds creating depth. Textile patterns use
                  transform: translateY with varying multipliers.
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* Background textile patterns with parallax */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`,
            background: `
              radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`,
            backgroundImage: `
              linear-gradient(45deg, rgba(20, 184, 166, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(30, 58, 138, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(20, 184, 166, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(30, 58, 138, 0.1) 75%)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Build the future.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Ship relentlessly.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Empowering teams to create extraordinary products through innovative technology and seamless
              collaboration.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* SCROLL-TRIGGERED ANIMATIONS - Feature cards that fade up and slide in */}
      <section id="features" className="py-24 bg-white relative group">
        {/* Annotation for this section */}
        <div className="absolute top-8 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
          <Card className="p-4 bg-slate-800/90 backdrop-blur-md border-teal-400/30 shadow-xl max-w-80">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Info className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="border-teal-300 text-teal-300 mb-2 text-xs">
                  Scroll Triggers
                </Badge>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Cards animate in when entering viewport using Intersection Observer. Staggered delays create premium
                  effect.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Cutting-edge features designed to accelerate your development workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", description: "Optimized performance for rapid development cycles" },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security protocols and compliance",
              },
              {
                icon: Rocket,
                title: "Scalable Infrastructure",
                description: "Grows with your business from startup to enterprise",
              },
              { icon: Target, title: "Precision Tools", description: "Purpose-built tools for maximum productivity" },
            ].map((feature, index) => {
              const element = featureRefs[index]?.current
              const isVisible =
                isClient && element && element.getBoundingClientRect().top <= window.innerHeight + 200

              return (
                <motion.div
                  key={feature.title}
                  ref={featureRefs[index]}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 border-slate-100 hover:border-teal-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL TIMELINE - Project milestones moving left-to-right */}
      <section id="timeline" className="py-24 bg-slate-50 overflow-hidden relative group">
        {/* Annotation for this section */}
        <div className="absolute top-8 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
          <Card className="p-4 bg-slate-800/90 backdrop-blur-md border-teal-400/30 shadow-xl max-w-80">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Info className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="border-teal-300 text-teal-300 mb-2 text-xs">
                  Horizontal Scroll
                </Badge>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Timeline moves horizontally as you scroll vertically. Uses sticky positioning + translateX transforms.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">Our Journey</h2>
          <p className="text-xl text-slate-600 text-center max-w-2xl mx-auto">
            Key milestones in our mission to revolutionize development workflows
          </p>
        </div>

        <HorizontalTimeline />
      </section>

      {/* 3D SCROLL-LINKED TRANSFORM - Rotating logo/graphic element */}
      <section className="py-24 bg-white flex items-center justify-center">
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl flex items-center justify-center"
          style={{
            rotateY: useTransform(useScroll().scrollY, [0, 2000], [0, 360]),
            rotateX: useTransform(useScroll().scrollY, [0, 2000], [0, 180]),
          }}
        >
          <div className="text-white text-2xl font-bold">SI</div>
        </motion.div>
      </section>

      {/* INFINITE SCROLL PORTFOLIO GRID - Gallery loading new items on scroll */}
      <section id="portfolio" className="py-24 bg-slate-50 relative group">
        {/* Annotation for this section */}
        <div className="absolute top-8 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
          <Card className="p-4 bg-slate-800/90 backdrop-blur-md border-teal-400/30 shadow-xl max-w-80">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Info className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="border-teal-300 text-teal-300 mb-2 text-xs">
                  Infinite Scroll
                </Badge>
                <p className="text-slate-300 text-sm leading-relaxed">
                  New items load automatically when approaching bottom. Detects scroll position and increments count.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600">A showcase of our latest work and innovations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: portfolioItems }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                    <div className="text-4xl text-teal-600">#{i + 1}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Project {i + 1}</h3>
                    <p className="text-slate-600 mb-4">
                      Innovative solution demonstrating cutting-edge technology implementation.
                    </p>
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-teal-200">
                      Featured
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {portfolioItems < 15 && (
            <div className="text-center mt-12">
              <div className="text-slate-500">Scroll to load more projects...</div>
            </div>
          )}
        </div>
      </section>

      {/* STICKY REVEAL TESTIMONIALS - Cards that stack and overlap */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-slate-600">Trusted by teams around the world</p>
          </div>

          <StickyTestimonials refs={testimonialRefs} isClient={isClient} />
        </div>
      </section>

      {/* Back to top button */}
      <motion.button
        onClick={() => scrollToSection("hero")}
        className="fixed bottom-8 right-8 w-12 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollProgress > 0.1 ? 1 : 0,
          scale: scrollProgress > 0.1 ? 1 : 0,
        }}
      >
        <ChevronUp size={20} />
      </motion.button>
    </div>
  )
}

// Horizontal Timeline Component
function HorizontalTimeline() {
  const { containerRef, scrollX } = useHorizontalScroll()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to transform development" },
    { year: "2021", title: "First Product Launch", description: "Released our flagship development platform" },
    { year: "2022", title: "Series A Funding", description: "Raised $10M to scale our operations" },
    { year: "2023", title: "Global Expansion", description: "Opened offices in 5 countries" },
    { year: "2024", title: "AI Integration", description: "Launched AI-powered development tools" },
    { year: "2025", title: "Future Vision", description: "Building the next generation of tools" },
  ]

  return (
    <div ref={containerRef} className="h-96 relative">
      <div className="sticky top-32">
        <div
          className="flex gap-8 transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(-${scrollX * (milestones.length * 300 - (isClient ? window.innerWidth : 1440))}px)`,
            width: `${milestones.length * 300}px`,
          }}
        >
          {milestones.map((milestone, index) => (
            <div key={index} className="flex-shrink-0 w-72">
              <Card className="p-6 h-48 border-slate-200 hover:border-teal-200 transition-all duration-300">
                <div className="text-3xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{milestone.title}</h3>
                <p className="text-slate-600">{milestone.description}</p>
              </Card>
              {index < milestones.length - 1 && (
                <div className="h-1 bg-gradient-to-r from-teal-500 to-transparent mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sticky Testimonials Component
function StickyTestimonials({ refs, isClient }: { refs: React.RefObject<HTMLDivElement>[]; isClient: boolean }) {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechCorp",
      content:
        "This platform has revolutionized how our team approaches development. The productivity gains are remarkable.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer at StartupXYZ",
      content: "The seamless integration and intuitive interface make complex workflows feel effortless.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Product Manager at ScaleUp",
      content: "Our deployment times have decreased by 70% since adopting this solution. Absolutely game-changing.",
      rating: 5,
    },
  ]

  return (
    <div className="space-y-8">
      {testimonials.map((testimonial, index) => {
        const isVisible = isClient && refs[index].current?.getBoundingClientRect().top <= window.innerHeight + 200

        return (
          <motion.div
            key={index}
            ref={refs[index]}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="sticky top-32"
            style={{ zIndex: testimonials.length - index }}
          >
            <Card className="p-8 bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
