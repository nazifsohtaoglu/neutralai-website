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
