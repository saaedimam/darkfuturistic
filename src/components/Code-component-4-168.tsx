import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Info } from 'lucide-react';

interface AnnotationProps {
  title: string;
  description: string;
  implementation: string;
  position?: 'left' | 'right';
}

export function ScrollAnnotation({ title, description, implementation, position = 'right' }: AnnotationProps) {
  return (
    <div className={`fixed top-20 ${position === 'left' ? 'left-4' : 'right-4'} z-30 max-w-80 hidden lg:block`}>
      <Card className="p-4 bg-navy-900/90 backdrop-blur-md border-teal-200/30 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-500/20 rounded-lg">
            <Info className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="border-teal-300 text-teal-300 mb-2">
              Scroll Effect
            </Badge>
            <h4 className="text-white font-semibold mb-2">{title}</h4>
            <p className="text-slate-300 text-sm mb-3 leading-relaxed">{description}</p>
            <div className="text-xs text-teal-400 bg-teal-500/10 p-2 rounded border border-teal-500/30">
              <code>{implementation}</code>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const scrollEffectAnnotations = {
  hero: {
    title: "Parallax Hero Section",
    description: "Multi-layered background elements move at different speeds as user scrolls, creating depth. Textile-inspired patterns shift subtly using transform: translateY with different multipliers.",
    implementation: "useParallax() + transform: translateY(offset * 0.5)"
  },
  features: {
    title: "Scroll-Triggered Animations", 
    description: "Feature cards detect when they enter viewport using Intersection Observer API, then animate in with staggered delays for premium feel.",
    implementation: "useScrollTrigger() + motion.div with whileInView"
  },
  navigation: {
    title: "Smooth Scroll Navigation",
    description: "Sticky navigation automatically highlights current section based on scroll position. Smooth scrolling to anchors with element.scrollIntoView({ behavior: 'smooth' }).",
    implementation: "activeSection state + scrollToSection() function"
  },
  timeline: {
    title: "Horizontal Scroll Timeline",
    description: "Timeline cards move horizontally as user scrolls vertically. Uses sticky positioning and transforms based on container's scroll progress.",
    implementation: "useHorizontalScroll() + translateX transform"
  },
  portfolio: {
    title: "Infinite Scroll Portfolio",
    description: "New portfolio items load automatically as user approaches bottom. Detects scroll position and increments item count with smooth animations.",
    implementation: "scroll event listener + conditional rendering"
  },
  progress: {
    title: "Scroll Progress Bar",
    description: "Fixed bar at top shows page scroll progress. Calculates percentage of page scrolled using scrollTop / scrollHeight ratio.",
    implementation: "useScrollProgress() + scaleX transform"
  },
  transform3d: {
    title: "3D Scroll-Linked Transform",
    description: "Logo rotates on multiple axes as user scrolls. Uses Motion's useTransform to map scroll position to rotation values for 3D effect.",
    implementation: "useTransform(scrollY, [0, 2000], [0, 360])"
  },
  testimonials: {
    title: "Sticky Reveal Testimonials",
    description: "Testimonial cards stack and overlap using sticky positioning with different z-index values. Each stays pinned briefly before next overlaps.",
    implementation: "sticky positioning + z-index stacking + scroll triggers"
  }
};
