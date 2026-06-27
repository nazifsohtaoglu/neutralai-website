'use client'

import { useScrollDepth } from '../../hooks/useScrollDepth'

/**
 * Mounts the scroll-depth tracking hook as a side-effect only component.
 * Renders null — include it once in a layout or page to track scroll milestones.
 * Fires `scroll_depth` PostHog events at 25 / 50 / 75 / 90 / 100 % once per page view.
 */
export default function ScrollDepthTracker() {
  useScrollDepth()
  return null
}
