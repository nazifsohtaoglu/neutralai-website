'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackAnalyticsEvent } from '../lib/analytics'

const MILESTONES = [25, 50, 75, 90, 100] as const
type Milestone = (typeof MILESTONES)[number]

export function useScrollDepth() {
  const pathname = usePathname()
  // Track which milestones have fired for the current page view
  const firedRef = useRef<Set<Milestone>>(new Set())
  // Reset fired milestones when the path changes
  const prevPathRef = useRef<string>(pathname)

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      firedRef.current = new Set()
      prevPathRef.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100))

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone)
          trackAnalyticsEvent('scroll_depth', {
            depth: milestone,
            path: pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Fire immediately in case page is already scrolled (e.g. after navigation)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])
}
