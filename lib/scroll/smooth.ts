interface SmoothScrollOptions {
  offset?: number
  duration?: number
  easing?: 'easeOutCubic' | 'easeInOutCubic' | 'easeOutQuart'
}

interface ScrollToOptions extends SmoothScrollOptions {
  behavior?: 'smooth' | 'auto'
}

// Easing functions
const easingFunctions = {
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
}

let isInitialized = false
let prefersReducedMotion = false

// Check for reduced motion preference
function checkReducedMotion() {
  if (typeof window !== 'undefined') {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
}

// Smooth scroll to element
function scrollToElement(element: Element, options: SmoothScrollOptions = {}) {
  const { offset = 0, duration = 700, easing = 'easeOutCubic' } = options
  
  if (prefersReducedMotion) {
    // Use native smooth scrolling for reduced motion
    element.scrollIntoView({ behavior: 'smooth' })
    return
  }

  const startY = window.scrollY
  const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset)
  const distance = targetY - startY
  
  if (Math.abs(distance) < 1) return // Already at target

  const startTime = performance.now()
  const ease = easingFunctions[easing]

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = ease(progress)
    
    window.scrollTo(0, startY + distance * easedProgress)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// Initialize smooth scrolling
export function initSmoothScroll(options: SmoothScrollOptions = {}) {
  if (isInitialized) return
  
  checkReducedMotion()
  isInitialized = true

  // Set native scroll behavior to auto to avoid double smoothing
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'auto'
  }

  // Handle click events on anchor links and data-smooth elements
  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    const link = target.closest('a[href^="#"], [data-smooth]') as HTMLAnchorElement
    
    if (!link) return

    const href = link.getAttribute('href')
    if (!href || !href.startsWith('#')) return

    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      event.preventDefault()
      scrollToElement(targetElement, options)
    }
  }

  // Add event listener
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClick, { capture: true })
  }

  // Expose global API
  if (typeof window !== 'undefined') {
    ;(window as any).IORI_SCROLL = {
      scrollTo: (selector: string | Element, scrollOptions?: ScrollToOptions) => {
        const element = typeof selector === 'string' 
          ? document.querySelector(selector) 
          : selector
        
        if (element) {
          scrollToElement(element, { ...options, ...scrollOptions })
        }
      },
      scrollToElement,
      initSmoothScroll,
    }
  }
}

// Hook for programmatic scrolling
export function useSmoothScroll() {
  const scrollTo = (selector: string | Element, scrollOptions?: ScrollToOptions) => {
    if (typeof window !== 'undefined' && (window as any).IORI_SCROLL) {
      ;(window as any).IORI_SCROLL.scrollTo(selector, scrollOptions)
    }
  }

  return { scrollTo }
}