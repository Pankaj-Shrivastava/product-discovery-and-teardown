import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/**
 * FloatingScrollToTop:
 * An interactive, elevated floating CTA that appears when the user scrolls down.
 * Features a circular scroll-progress indicator ring and smooth one-click scroll to top.
 */
export const FloatingScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight

    // Show CTA once scrolled past 240px
    setIsVisible(scrollY > 240)

    // Calculate scroll progress percentage (0 to 1)
    if (totalHeight > 0) {
      const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1)
      setScrollProgress(progress)
    } else {
      setScrollProgress(0)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // initial check

    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Circle dimensions for SVG progress ring
  const radius = 17
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - scrollProgress * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.75, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll back to top of page"
          title={`Scroll to top (${Math.round(scrollProgress * 100)}% viewed)`}
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-md hover:shadow-xl hover:border-[#4355B9]/40 hover:bg-white active:scale-95 transition-all duration-200 group flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4355B9] focus:ring-offset-2 focus:ring-offset-white"
        >
          {/* Dynamic Scroll Progress Ring */}
          <svg
            className="w-11 h-11 -rotate-90 pointer-events-none"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            {/* Background Track */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="text-[#E2E8F0] stroke-current"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Progress Arc */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="text-[#4355B9] stroke-current transition-all duration-150 ease-out"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Centered Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ArrowUp
              className="w-4 h-4 text-[#4355B9] group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.5]"
              aria-hidden="true"
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
