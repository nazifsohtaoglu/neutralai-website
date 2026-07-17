import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('contact page uses Google Sheets lead form as the primary capture path', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const siteSource = readSource('app/site.ts')
  const leadFormSource = readSource('app/components/GoogleSheetsLeadForm.tsx')

  assert.match(siteSource, /NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT/)
  assert.match(contactSource, /<GoogleSheetsLeadForm/)
  assert.match(leadFormSource, /GOOGLE_SHEETS_EXEC_PATH_REGEX/)
  assert.match(leadFormSource, /function resolveLeadCaptureEndpoint/)
  assert.match(leadFormSource, /parsed\.protocol !== 'https:'/)
  assert.match(leadFormSource, /parsed\.hostname !== 'script\.google\.com'/)
  assert.match(leadFormSource, /parsed\.username \|\| parsed\.password \|\| parsed\.search \|\| parsed\.hash/)
  assert.match(leadFormSource, /macros\\\/s\\\/\[a-z0-9_-\]\+\\\/exec/)
  assert.match(leadFormSource, /fetch\(submissionEndpoint, \{/)
  assert.match(leadFormSource, /window\.location\.assign\('\/contact\/thanks\/'\)/)
  assert.match(leadFormSource, /website_intent/)
  assert.match(leadFormSource, /lead_source/)
  assert.match(leadFormSource, /website_page_url/)
  assert.match(leadFormSource, /company_website/)
  assert.doesNotMatch(contactSource, /HubSpotLeadForm/)
  assert.doesNotMatch(siteSource, /NEXT_PUBLIC_HUBSPOT_/)
})

test('google sheets setup documents required buyer qualification fields', () => {
  const docsSource = readSource('docs/google-sheets-crm-setup.md')
  const leadFormSource = readSource('app/components/GoogleSheetsLeadForm.tsx')

  for (const field of ['full_name', 'email', 'company_name', 'company_size', 'message', 'referral_source']) {
    assert.match(docsSource, new RegExp(field))
  }

  assert.match(leadFormSource, /getLeadAttribution/)
  assert.match(leadFormSource, /getReferralSnapshot/)
  assert.match(leadFormSource, /referralSnapshotToFieldMap/)
  assert.match(docsSource, /script\.google\.com\/macros\/s\/<deployment-id>\/exec/)
  assert.match(docsSource, /do not paste:/i)
  assert.match(docsSource, /script\.googleusercontent\.com/)
  assert.match(docsSource, /query-string auth tokens/i)
})

test('contact page keeps secondary email route and routes high-intent form intents', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const siteSource = readSource('app/site.ts')
  const thanksSource = readSource('app/contact/thanks/page.tsx')
  const leadFormSource = readSource('app/components/GoogleSheetsLeadForm.tsx')

  assert.match(siteSource, /demo: '\/contact\?intent=demo'/)
  assert.match(siteSource, /enterprise: '\/contact\?intent=enterprise'/)
  assert.match(siteSource, /securityReview: '\/contact\?intent=security-review'/)
  assert.match(contactSource, /normalizeIntent/)
  assert.match(leadFormSource, /Lead form endpoint is not configured in this environment yet\./)
  assert.match(thanksSource, /We&apos;ll get back to you within 24 hours/)
  assert.match(contactSource, /Prefer email\? Reach us at/)
  assert.match(contactSource, /contactLinks\.salesMailto/)
  assert.match(contactSource, /Other routes/)
})
