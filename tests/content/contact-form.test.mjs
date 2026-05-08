import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('contact page has an inline form that does not use mailto as the primary action', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const siteSource = readSource('app/site.ts')

  assert.match(siteSource, /contactFormUrl:\s*'https:\/\/formsubmit\.co\/sales@neutralai\.co\.uk'/)
  assert.match(contactSource, /<form action=\{siteConfig\.contactFormUrl\} method="POST"/)
  assert.doesNotMatch(contactSource, /<form[^>]+mailto:/)
  assert.match(contactSource, /Send Message/)
})

test('contact form captures required buyer qualification fields', () => {
  const contactSource = readSource('app/contact/page.tsx')

  assert.match(contactSource, /name="full_name"/)
  assert.match(contactSource, /name="work_email"/)
  assert.match(contactSource, /type="email"/)
  assert.match(contactSource, /name="company_name"/)
  assert.match(contactSource, /name="company_size"/)
  assert.match(contactSource, /name="message"/)
  assert.match(contactSource, /required[\s\S]*name="full_name"/)
  assert.match(contactSource, /required[\s\S]*name="work_email"/)
  assert.match(contactSource, /required[\s\S]*name="company_name"/)
  assert.match(contactSource, /required[\s\S]*name="company_size"/)
  assert.match(contactSource, /required[\s\S]*name="message"/)
})

test('contact page keeps secondary email route and redirects to success copy', () => {
  const contactSource = readSource('app/contact/page.tsx')
  const thanksSource = readSource('app/contact/thanks/page.tsx')

  assert.match(contactSource, /name="referral_source"/)
  assert.match(contactSource, /\/contact\/thanks\//)
  assert.match(thanksSource, /We&apos;ll get back to you within 1 business day/)
  assert.match(contactSource, /Prefer email\? Reach us at/)
  assert.match(contactSource, /contactLinks\.salesMailto/)
  assert.match(contactSource, /Other routes/)
})
