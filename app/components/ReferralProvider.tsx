'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { trackAnalyticsEvent, type AnalyticsProperties } from '../lib/analytics'
import { resolveReferralHandoffUrl, captureReferralFromLocation } from '../lib/referral'

function isPrimarySameTabNavigation(event: MouseEvent, anchor: HTMLAnchorElement) {
  const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  return event.button === 0 && !hasModifier && !anchor.target && !anchor.hasAttribute('download')
}

function safeDestination(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href)
    return `${url.hostname}${url.pathname}`
  } catch {
    return anchor.getAttribute('href') || ''
  }
}

function eventProperties(anchor: HTMLAnchorElement, pathname: string): AnalyticsProperties {
  return {
    label: anchor.dataset.analyticsLabel || anchor.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || 'unknown',
    placement: anchor.dataset.analyticsPlacement || 'unspecified',
    destination: anchor.dataset.analyticsDestination || safeDestination(anchor),
    page_path: pathname,
  }
}

export default function ReferralProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchString = searchParams.toString()

  useEffect(() => {
    captureReferralFromLocation({
      pathname,
      search: searchString ? `?${searchString}` : '',
    })
  }, [pathname, searchString])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest<HTMLAnchorElement>('a[href]')

      if (!anchor?.href) {
        return
      }

      const resolution = resolveReferralHandoffUrl(anchor.href)

      if (resolution.status === 'skipped') {
        return
      }

      const baseProperties = eventProperties(anchor, pathname)

      trackAnalyticsEvent('High Intent CTA Redirect To Sign-In', baseProperties)
      trackAnalyticsEvent('Referral Handoff Attempted', {
        ...baseProperties,
        referral_handoff_status: resolution.status,
      })

      if (resolution.status === 'failed') {
        trackAnalyticsEvent('Referral Handoff Failed', {
          ...baseProperties,
          referral_handoff_reason: resolution.reason || 'unknown',
        })
        return
      }

      anchor.href = resolution.url

      trackAnalyticsEvent('Referral Handoff Succeeded', {
        ...baseProperties,
        referral_code: resolution.snapshot?.referral_code || '',
      })

      if (isPrimarySameTabNavigation(event, anchor)) {
        event.preventDefault()
        window.location.assign(resolution.url)
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  return null
}
