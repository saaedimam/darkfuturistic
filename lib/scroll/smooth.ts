type Options = { offset?: number; duration?: number; easing?: 'easeOutCubic' | 'linear' }

const easings = {
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  linear: (t: number) => t,
}

export function initSmoothScroll({ offset = 0, duration = 700, easing = 'easeOutCubic' }: Options = {}) {
  try {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduced = mq && mq.matches
    const ease = easings[easing] || easings.easeOutCubic

    // Avoid double smoothing with CSS
    const de = document.documentElement
    const prevBehavior = de.style.scrollBehavior
    de.style.scrollBehavior = 'auto'

    const scrollToEl = (el: Element) => {
      const start = window.scrollY
      const targetTop = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - offset
      const end = Math.max(0, targetTop)
      if (reduced) {
        window.scrollTo({ top: end, behavior: 'auto' })
        return
      }
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const y = start + (end - start) * ease(p)
        window.scrollTo(0, y)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const anchor = target.closest('a[href^="#"], [data-smooth]') as HTMLAnchorElement | HTMLElement | null
      if (!anchor) return
      const href = (anchor as HTMLAnchorElement).getAttribute('href') || ''
      const id = href.startsWith('#') ? href.slice(1) : ''
      const el = id ? document.getElementById(id) : null
      if (el) {
        e.preventDefault()
        scrollToEl(el)
      }
    }

    document.addEventListener('click', onClick, { capture: true })

    ;(window as any).IORI_SCROLL = {
      scrollTo: (selectorOrEl: string | Element, opts?: Options) => {
        const el = typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl
        if (el) {
          const merged = { offset, duration, easing, ...(opts || {}) }
          initSmoothScroll(merged)
          scrollToEl(el)
        }
      },
    }

    return () => {
      de.style.scrollBehavior = prevBehavior
      document.removeEventListener('click', onClick, { capture: true } as any)
    }
  } catch {
    // no-op in SSR
  }
}

export default initSmoothScroll
