import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('referral provider is mounted globally and captures first-touch referral context', () => {
  const layoutSource = readSource('app/layout.tsx')
  const referralSource = readSource('app/lib/referral.ts')

  assert.match(layoutSource, /<ReferralProvider \/>/)
  assert.match(referralSource, /REFERRAL_SNAPSHOT_KEY/)
  assert.match(referralSource, /captureReferralFromLocation/)
  assert.match(referralSource, /REFERRAL_TTL_MS/)
  assert.match(referralSource, /REFERRAL_CODE_REGEX/)
  assert.match(referralSource, /attribution_source: 'website_ref_query'/)
  assert.match(referralSource, /const updated: ReferralSnapshot = \{\n\s+\.\.\.snapshot,\n\s+last_touch_at: now,\n\s+last_touch_path: currentPath,/)
})

test('high-intent sign-in redirects attach referral handoff context and emit observability events', () => {
  const referralSource = readSource('app/lib/referral.ts')
  const providerSource = readSource('app/components/ReferralProvider.tsx')

  assert.match(referralSource, /url\.pathname === '\/auth\/signin'/)
  assert.match(referralSource, /url\.searchParams\.get\('intent'\) === 'signup'/)
  assert.match(referralSource, /status: 'succeeded'/)
  assert.match(referralSource, /status: 'failed'/)
  assert.match(referralSource, /url\.searchParams\.set\(key, value\)/)
  assert.match(referralSource, /referralSnapshotToFieldMap/)
  assert.match(referralSource, /ref: snapshot\.referral_code/)

  assert.match(providerSource, /resolveReferralHandoffUrl/)
  assert.match(providerSource, /captureReferralFromLocation/)
  assert.match(providerSource, /High Intent CTA Redirect To Sign-In/)
  assert.match(providerSource, /Referral Handoff Attempted/)
  assert.match(providerSource, /Referral Handoff Succeeded/)
  assert.match(providerSource, /Referral Handoff Failed/)
  assert.match(providerSource, /document\.addEventListener\('click', handleClick, true\)/)
})

test('demo and contact lead capture can include referral fields without exposing secrets', () => {
  const leadFormSource = readSource('app/components/GoogleSheetsLeadForm.tsx')
  const referralSource = readSource('app/lib/referral.ts')

  assert.match(leadFormSource, /getReferralSnapshot/)
  assert.match(leadFormSource, /referralSnapshotToFieldMap/)
  assert.match(leadFormSource, /lead_source/)
  assert.doesNotMatch(referralSource, /commission_rate/i)
  assert.doesNotMatch(referralSource, /webhook_secret/i)
  assert.doesNotMatch(referralSource, /stripe_secret/i)
})

test('sign-up handoff carries campaign parameters even without a partner referral', () => {
  const referralSource = readSource('app/lib/referral.ts')
  const providerSource = readSource('app/components/ReferralProvider.tsx')

  // Only the five utm_* parameters the app already accepts are forwarded.
  assert.match(referralSource, /SIGNUP_ATTRIBUTION_PARAMS = \['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'\]/)
  assert.match(referralSource, /SIGNUP_ATTRIBUTION_VALUE_REGEX = \/\^\[a-z0-9\]\[a-z0-9\._-\]\{0,63\}\$\/i/)
  assert.match(referralSource, /getLeadAttribution\(\)/)
  // Values already on the URL are never overwritten, and malformed ones are left behind.
  assert.match(referralSource, /url\.searchParams\.has\(param\)/)
  assert.match(referralSource, /SIGNUP_ATTRIBUTION_VALUE_REGEX\.test\(value\)/)

  // No partner snapshot but campaign parameters attached: a distinct, non-failure status.
  assert.match(referralSource, /status: 'attribution_only'/)
  assert.match(providerSource, /resolution\.status === 'attribution_only'/)
  assert.match(providerSource, /Signup Attribution Handoff/)

  // The partner referral fields still win the full handoff when a snapshot exists.
  assert.match(referralSource, /applyHandoffParams\(parsed, snapshot\)/)
  // A visitor with nothing to carry still resolves to the original 'failed' outcome.
  assert.match(referralSource, /reason: 'missing_snapshot'/)
})
