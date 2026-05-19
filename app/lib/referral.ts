'use client'

import { siteConfig } from '../site'
import { trackAnalyticsEvent, type AnalyticsProperties } from './analytics'

export const REFERRAL_SNAPSHOT_KEY = 'neutralai_referral_snapshot_v1'

const REFERRAL_PARAM = 'ref'
const REFERRAL_TTL_MS = 1000 * 60 * 60 * 24 * 120
const REFERRAL_CODE_MAX_LENGTH = 64
const REFERRAL_CODE_REGEX = /^[a-z0-9][a-z0-9_-]{1,63}$/i

type ReferralSnapshotStorage = {
  schema_version: 1
  referral_code: string
  first_touch_at: string
  last_touch_at: string
  first_touch_path: string
  last_touch_path: string
  landing_page: string
  attribution_source: 'website_ref_query'
}

export type ReferralSnapshot = Omit<ReferralSnapshotStorage, 'schema_version'>

export type ReferralCaptureInput = {
  pathname: string
  search: string
}

export type ReferralHandoffResolution = {
  status: 'skipped' | 'succeeded' | 'failed'
  url: string
  reason?: 'invalid_url' | 'missing_snapshot'
  snapshot?: ReferralSnapshot
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
    // Ignore storage errors so referral capture never blocks browsing.
  }
}

function safeLocalStorageRemove(key: string) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignore storage errors so referral capture never blocks browsing.
  }
}

function sanitizePathname(pathname: string) {
  if (!pathname) {
    return '/'
  }

  const trimmed = pathname.trim()
  if (!trimmed.startsWith('/')) {
    return '/'
  }

  return trimmed.slice(0, 240)
}

function sanitizeReferralCode(raw: string | null) {
  if (!raw) {
    return null
  }

  const normalized = raw.trim().toLowerCase().slice(0, REFERRAL_CODE_MAX_LENGTH)

  if (!REFERRAL_CODE_REGEX.test(normalized)) {
    return null
  }

  return normalized
}

function safeParseSnapshot(raw: string | null): ReferralSnapshotStorage | null {
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ReferralSnapshotStorage>

    if (
      parsed.schema_version !== 1 ||
      typeof parsed.referral_code !== 'string' ||
      typeof parsed.first_touch_at !== 'string' ||
      typeof parsed.last_touch_at !== 'string' ||
      typeof parsed.first_touch_path !== 'string' ||
      typeof parsed.last_touch_path !== 'string' ||
      typeof parsed.landing_page !== 'string' ||
      parsed.attribution_source !== 'website_ref_query'
    ) {
      return null
    }

    if (!sanitizeReferralCode(parsed.referral_code)) {
      return null
    }

    return parsed as ReferralSnapshotStorage
  } catch {
    return null
  }
}

function isSnapshotExpired(snapshot: ReferralSnapshotStorage) {
  const firstTouchMs = Date.parse(snapshot.first_touch_at)
  if (Number.isNaN(firstTouchMs)) {
    return true
  }

  return Date.now() - firstTouchMs > REFERRAL_TTL_MS
}

function asSnapshot(storage: ReferralSnapshotStorage): ReferralSnapshot {
  const { schema_version: _schemaVersion, ...snapshot } = storage
  return snapshot
}

function serializeSnapshot(snapshot: ReferralSnapshot): ReferralSnapshotStorage {
  return {
    schema_version: 1,
    ...snapshot,
  }
}

function writeSnapshot(snapshot: ReferralSnapshot) {
  safeLocalStorageSet(REFERRAL_SNAPSHOT_KEY, JSON.stringify(serializeSnapshot(snapshot)))
}

function defaultEventProperties(snapshot: ReferralSnapshot): AnalyticsProperties {
  return {
    referral_code: snapshot.referral_code,
    referral_first_touch_at: snapshot.first_touch_at,
    referral_last_touch_at: snapshot.last_touch_at,
    referral_first_touch_path: snapshot.first_touch_path,
    referral_last_touch_path: snapshot.last_touch_path,
    referral_landing_page: snapshot.landing_page,
    referral_attribution_source: snapshot.attribution_source,
  }
}

export function getReferralSnapshot(): ReferralSnapshot | null {
  if (typeof window === 'undefined') {
    return null
  }

  const parsed = safeParseSnapshot(safeLocalStorageGet(REFERRAL_SNAPSHOT_KEY))
  if (!parsed) {
    return null
  }

  if (isSnapshotExpired(parsed)) {
    safeLocalStorageRemove(REFERRAL_SNAPSHOT_KEY)
    return null
  }

  return asSnapshot(parsed)
}

export function captureReferralFromLocation({ pathname, search }: ReferralCaptureInput): ReferralSnapshot | null {
  if (typeof window === 'undefined') {
    return null
  }

  const snapshot = getReferralSnapshot()
  const params = new URLSearchParams(search)
  const referralCode = sanitizeReferralCode(params.get(REFERRAL_PARAM))

  if (!referralCode) {
    return snapshot
  }

  const now = new Date().toISOString()
  const currentPath = sanitizePathname(pathname)

  if (!snapshot) {
    const created: ReferralSnapshot = {
      referral_code: referralCode,
      first_touch_at: now,
      last_touch_at: now,
      first_touch_path: currentPath,
      last_touch_path: currentPath,
      landing_page: currentPath,
      attribution_source: 'website_ref_query',
    }

    writeSnapshot(created)
    trackAnalyticsEvent('Referral Captured', defaultEventProperties(created))
    return created
  }

  const updated: ReferralSnapshot = {
    ...snapshot,
    last_touch_at: now,
    last_touch_path: currentPath,
  }

  writeSnapshot(updated)
  trackAnalyticsEvent('Referral Updated', {
    ...defaultEventProperties(updated),
    touched_referral_code: referralCode,
  })

  return updated
}

function isHighIntentSignInUrl(url: URL) {
  let appHost = ''

  try {
    appHost = new URL(siteConfig.appBaseUrl).host
  } catch {
    return false
  }

  return url.host === appHost && url.pathname === '/auth/signin' && url.searchParams.get('intent') === 'signup'
}

function applyHandoffParams(url: URL, snapshot: ReferralSnapshot) {
  const fields = referralSnapshotToFieldMap(snapshot)

  for (const [key, value] of Object.entries(fields)) {
    url.searchParams.set(key, value)
  }
}

export function resolveReferralHandoffUrl(rawHref: string): ReferralHandoffResolution {
  if (typeof window === 'undefined') {
    return { status: 'skipped', url: rawHref }
  }

  let parsed: URL

  try {
    parsed = new URL(rawHref, window.location.origin)
  } catch {
    return { status: 'failed', url: rawHref, reason: 'invalid_url' }
  }

  if (!isHighIntentSignInUrl(parsed)) {
    return {
      status: 'skipped',
      url: parsed.toString(),
    }
  }

  const snapshot = getReferralSnapshot()

  if (!snapshot) {
    return {
      status: 'failed',
      url: parsed.toString(),
      reason: 'missing_snapshot',
    }
  }

  applyHandoffParams(parsed, snapshot)

  return {
    status: 'succeeded',
    url: parsed.toString(),
    snapshot,
  }
}

export function referralSnapshotToFieldMap(snapshot: ReferralSnapshot) {
  return {
    ref: snapshot.referral_code,
    referral_code: snapshot.referral_code,
    first_touch_at: snapshot.first_touch_at,
    last_touch_at: snapshot.last_touch_at,
    first_touch_path: snapshot.first_touch_path,
    last_touch_path: snapshot.last_touch_path,
    landing_page: snapshot.landing_page,
    attribution_source: snapshot.attribution_source,
  }
}
