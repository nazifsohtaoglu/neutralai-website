'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { hasAnalyticsConsent, trackAnalyticsEvent } from '../lib/analytics'

const MILESTONES = [25, 50, 75, 90, 100] as const
type Milestone = (typeof MILESTONES)[number]

export function useScrollDepth() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Track which milestones have fired for the current page view
  const firedRef = useRef<Set<Milestone>>(new Set())
  // Reset fired milestones when the path (including query string) changes
  const prevPageKeyRef = useRef<string>(`${pathname}?${searchParams.toString()}`)

  useEffect(() => {
    const pageKey = `${pathname}?${searchParams.toString()}`
    if (prevPageKeyRef.current !== pageKey) {
      firedRef.current = new Set()
      prevPageKeyRef.current = pageKey
    }
  }, [pathname, searchParams])

  useEffect(() => {
    function handleScroll() {
      if (!hasAnalyticsConsent()) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        if (!firedRef.current.has(100)) {
          firedRef.current.add(100)
          trackAnalyticsEvent('scroll_depth', { depth: 100, page_path: pathname })
        }
        return
      }

      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100))

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone)
          trackAnalyticsEvent('scroll_depth', {
            depth: milestone,
            page_path: pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Fire immediately in case page is already scrolled (e.g. after navigation)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, searchParams])
}
