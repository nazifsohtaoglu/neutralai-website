import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('contact page embeds HubSpot instead of FormSubmit or mailto as the primary action', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const siteSource = readSource('app/site.ts')
  const hubspotSource = readSource('app/components/HubSpotLeadForm.tsx')

  assert.match(siteSource, /NEXT_PUBLIC_HUBSPOT_PORTAL_ID/)
  assert.match(siteSource, /NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID/)
  assert.match(siteSource, /NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID/)
  assert.match(siteSource, /NEXT_PUBLIC_HUBSPOT_ENTERPRISE_FORM_ID/)
  assert.match(siteSource, /NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID/)
  assert.match(contactSource, /<HubSpotLeadForm/)
  assert.match(hubspotSource, /js\.hsforms\.net\/forms\/embed\/v2\.js/)
  assert.match(hubspotSource, /window\.hbspt\.forms\.create/)
  assert.match(hubspotSource, /redirectUrl: `\$\{siteConfig\.url\}\/contact\/thanks\/`/)
  assert.match(hubspotSource, /onError=\{\(\) => setLoadFailed\(true\)\}/)
  assert.match(hubspotSource, /window\.setTimeout/)
  assert.match(hubspotSource, /The CRM form could not load in this browser/)
  assert.doesNotMatch(siteSource, /formsubmit\.co/i)
  assert.doesNotMatch(contactSource, /formsubmit\.co/i)
  assert.doesNotMatch(contactSource, /<form[^>]+mailto:/)
})

test('HubSpot setup documents required buyer qualification fields', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const docsSource = readSource('docs/hubspot-crm-setup.md')
  const hubspotSource = readSource('app/components/HubSpotLeadForm.tsx')

  for (const field of ['full_name', 'email', 'company_name', 'company_size', 'message', 'referral_source']) {
    assert.match(docsSource, new RegExp(field))
  }

  assert.match(contactSource, /intentCopy/)
  assert.match(hubspotSource, /website_intent/)
  assert.match(hubspotSource, /lead_source/)
  assert.match(hubspotSource, /website_page_url/)
})

test('contact page keeps secondary email route and routes high-intent CRM forms', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const siteSource = readSource('app/site.ts')
  const thanksSource = readSource('app/contact/thanks/page.tsx')
  const hubspotSource = readSource('app/components/HubSpotLeadForm.tsx')

  assert.match(siteSource, /demo: '\/contact\?intent=demo'/)
  assert.match(siteSource, /enterprise: '\/contact\?intent=enterprise'/)
  assert.match(siteSource, /securityReview: '\/contact\?intent=security-review'/)
  assert.match(contactSource, /normalizeIntent/)
  assert.match(contactSource, /getHubSpotFormId/)
  assert.match(hubspotSource, /\/contact\/thanks\//)
  assert.match(thanksSource, /We&apos;ll get back to you within 1 business day/)
  assert.match(contactSource, /Prefer email\? Reach us at/)
  assert.match(contactSource, /contactLinks\.salesMailto/)
  assert.match(contactSource, /Other routes/)
})
