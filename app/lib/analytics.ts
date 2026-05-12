'use client'

export type AnalyticsConsent = 'accepted' | 'declined'
export type AnalyticsProperties = Record<string, string | number | boolean>

export const ANALYTICS_CONSENT_KEY = 'neutralai_analytics_consent'
export const ANALYTICS_ATTRIBUTION_KEY = 'neutralai_analytics_attribution'

const attributionParams = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

type PlausibleOptions = {
  props?: AnalyticsProperties
  url?: string
}

type PlausibleFn = {
  (eventName: string, options?: PlausibleOptions): void
  q?: [string, PlausibleOptions | undefined][]
}

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

function safeLocalStorageGet(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeLocalStorageSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore storage failures so consent UI never blocks navigation.
  }
}

function normalizePath() {
  return `${window.location.pathname}${window.location.hash || ''}`
}

function referrerHost(referrer: string) {
  if (!referrer) {
    return ''
  }

  try {
    const url = new URL(referrer)
    return url.hostname === window.location.hostname ? '' : url.hostname
  } catch {
    return ''
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') {
    return null
  }

  const consent = safeLocalStorageGet(ANALYTICS_CONSENT_KEY)
  return consent === 'accepted' || consent === 'declined' ? consent : null
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  safeLocalStorageSet(ANALYTICS_CONSENT_KEY, consent)
}

export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === 'accepted'
}

export function currentUrlAttribution(): AnalyticsProperties {
  if (typeof window === 'undefined') {
    return {}
  }

  const searchParams = new URLSearchParams(window.location.search)
  const attribution: AnalyticsProperties = {}

  for (const param of attributionParams) {
    const value = searchParams.get(param)
    if (value) {
      attribution[param] = value.slice(0, 120)
    }
  }

  const host = referrerHost(document.referrer)
  if (host) {
    attribution.referrer_host = host
  }

  attribution.landing_page_path = normalizePath()

  return attribution
}

export function getStoredAttribution(): AnalyticsProperties {
  if (typeof window === 'undefined') {
    return {}
  }

  const stored = safeLocalStorageGet(ANALYTICS_ATTRIBUTION_KEY)
  if (!stored) {
    return {}
  }

  try {
    return JSON.parse(stored) as AnalyticsProperties
  } catch {
    return {}
  }
}

function mergeAttribution(stored: AnalyticsProperties, current: AnalyticsProperties) {
  const merged = {
    ...stored,
    ...current,
  }

  if (stored.landing_page_path) {
    merged.landing_page_path = stored.landing_page_path
  }

  return merged
}

export function captureAttribution() {
  if (!hasAnalyticsConsent()) {
    return {}
  }

  const merged = mergeAttribution(getStoredAttribution(), currentUrlAttribution())

  safeLocalStorageSet(ANALYTICS_ATTRIBUTION_KEY, JSON.stringify(merged))
  return merged
}

export function getLeadAttribution(): AnalyticsProperties {
  return mergeAttribution(getStoredAttribution(), currentUrlAttribution())
}

function getPlausibleQueue() {
  if (!window.plausible) {
    const plausible: PlausibleFn = (eventName, options) => {
      plausible.q = plausible.q || []
      plausible.q.push([eventName, options])
    }
    window.plausible = plausible
  }

  return window.plausible
}

export function trackAnalyticsEvent(eventName: string, properties: AnalyticsProperties = {}, options: Omit<PlausibleOptions, 'props'> = {}) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return
  }

  const props = {
    ...getStoredAttribution(),
    ...properties,
  }

  getPlausibleQueue()(eventName, {
    ...options,
    props,
  })
}
