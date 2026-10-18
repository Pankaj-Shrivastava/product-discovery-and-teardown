import React, { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Route Scroll Restoration:
 * Automatically resets window scroll to (0, 0) instantly whenever
 * navigating between teardown stages or paths.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Reset immediately before next paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })

    // Follow-up on the next animation frame to guarantee alignment if content renders asynchronously
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    })

    return () => cancelAnimationFrame(rafId)
  }, [pathname])

  return null
}
