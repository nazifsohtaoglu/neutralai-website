'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteConfig } from '../site'
import {
  captureAttribution,
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackAnalyticsEvent,
  type AnalyticsConsent,
  type AnalyticsProperties,
} from '../lib/analytics'

function safeDestination(element: HTMLElement) {
  const href = element instanceof HTMLAnchorElement ? element.href : ''
  if (!href) {
    return ''
  }

  try {
    const url = new URL(href)
    return url.origin === window.location.origin ? url.pathname : `${url.hostname}${url.pathname}`
  } catch {
    return ''
  }
}

function getEventProperties(element: HTMLElement, pathname: string): AnalyticsProperties {
  return {
    label: element.dataset.analyticsLabel || element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || 'unknown',
    placement: element.dataset.analyticsPlacement || 'unspecified',
    destination: element.dataset.analyticsDestination || safeDestination(element),
    page_path: pathname,
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() => getAnalyticsConsent())
  const analyticsEnabled = Boolean(siteConfig.analytics.plausibleDomain)
  const canLoadAnalytics = consent === 'accepted' && analyticsEnabled

  useEffect(() => {
    if (consent === 'accepted') {
      captureAttribution()
    }
  }, [consent, pathname, searchParams])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const element = target.closest<HTMLElement>('[data-analytics-event]')
      if (!element?.dataset.analyticsEvent) {
        return
      }

      trackAnalyticsEvent(element.dataset.analyticsEvent, getEventProperties(element, pathname))
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  function chooseConsent(nextConsent: AnalyticsConsent) {
    setAnalyticsConsent(nextConsent)
    setConsent(nextConsent)

    if (nextConsent === 'accepted') {
      captureAttribution()
    }
  }

  return (
    <>
      {canLoadAnalytics ? (
        <Script
          id="plausible-analytics"
          src={siteConfig.analytics.plausibleScriptUrl}
          data-domain={siteConfig.analytics.plausibleDomain}
          strategy="afterInteractive"
        />
      ) : null}

      {consent === null ? (
        <div className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-background-secondary/95 p-3 shadow-[0_24px_80px_rgba(2,8,23,0.55)] backdrop-blur sm:inset-x-4 sm:bottom-4 sm:p-4 md:p-5">
          <div className="sm:hidden">
            <p className="font-heading text-sm font-semibold text-white">Analytics consent</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              We use privacy-friendly analytics for page performance and CTA conversion. No analytics runs until you accept.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => chooseConsent('declined')}
                className="h-11 rounded-xl border border-white/10 px-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => chooseConsent('accepted')}
                className="h-11 rounded-xl bg-primary px-3 text-sm font-semibold text-slate-950 transition hover:bg-primary-light"
              >
                Accept
              </button>
            </div>
          </div>
          <div className="hidden flex-col gap-4 sm:flex md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-heading text-base font-semibold text-white">Analytics consent</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                We use privacy-friendly analytics to understand page performance and CTA conversion. No analytics runs until you accept.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => chooseConsent('declined')}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => chooseConsent('accepted')}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primary-light"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
