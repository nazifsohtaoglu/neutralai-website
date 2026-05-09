import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('root metadata keeps expanded high-intent SEO keywords', () => {
  const layoutSource = readSource('app/layout.tsx')

  const expectedKeywords = [
    'presidio alternative',
    'pii detection api',
    'ai compliance gateway',
    'llm data protection',
    'sensitive data masking for ai',
    'enterprise ai privacy',
    'ai data loss prevention',
    'pii redaction for llm',
    'gdpr compliant ai',
    'hipaa ai gateway',
  ]

  for (const keyword of expectedKeywords) {
    assert.match(layoutSource, new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
})

test('root layout publishes Organization and SoftwareApplication structured data', () => {
  const layoutSource = readSource('app/layout.tsx')

  assert.match(layoutSource, /'@graph'/)
  assert.match(layoutSource, /'@type': 'Organization'/)
  assert.match(layoutSource, /'@id': `\$\{siteConfig\.url\}\/#organization`/)
  assert.match(layoutSource, /logo: `\$\{siteConfig\.url\}\/logo\.png`/)
  assert.match(layoutSource, /contactType: 'sales'/)
  assert.match(layoutSource, /email: siteConfig\.salesEmail/)
  assert.match(layoutSource, /contactType: 'security'/)
  assert.match(layoutSource, /email: siteConfig\.securityEmail/)
  assert.match(layoutSource, /'@type': 'SoftwareApplication'/)
  assert.match(layoutSource, /applicationSubCategory: 'AI compliance gateway'/)
  assert.match(layoutSource, /publisher:[\s\S]*'@id': `\$\{siteConfig\.url\}\/#organization`/)
})

test('homepage pricing FAQ renders FAQPage structured data', () => {
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /const pricingFaqStructuredData = \{/)
  assert.match(homeSource, /'@type': 'FAQPage'/)
  assert.match(homeSource, /mainEntity: pricingFaqs\.map/)
  assert.match(homeSource, /'@type': 'Question'/)
  assert.match(homeSource, /'@type': 'Answer'/)
  assert.match(homeSource, /JSON\.stringify\(pricingFaqStructuredData\)/)
})

test('client-heavy routes receive unique segment metadata descriptions', () => {
  const expectedLayouts = [
    ['app/about/layout.tsx', /AI security gateway[\s\S]*PII masking/],
    ['app/contact/layout.tsx', /AI compliance gateway deployment[\s\S]*PII masking/],
    ['app/security/layout.tsx', /LLM data protection[\s\S]*PII detection/],
    ['app/terms/layout.tsx', /AI security gateway[\s\S]*PII masking service/],
  ]

  for (const [path, descriptionPattern] of expectedLayouts) {
    const source = readSource(path)

    assert.match(source, /export const metadata/)
    assert.match(source, /description:/)
    assert.match(source, descriptionPattern)
    assert.match(source, /alternates:[\s\S]*canonical:/)
  }
})

test('contact thank-you page has its own no-surprise metadata', () => {
  const source = readSource('app/contact/thanks/page.tsx')

  assert.match(source, /export const metadata/)
  assert.match(source, /title: 'Contact Request Sent'/)
  assert.match(source, /AI compliance gateway deployment/)
  assert.match(source, /robots:[\s\S]*index: false/)
  assert.match(source, /robots:[\s\S]*follow: false/)
  assert.match(source, /canonical: '\/contact'/)
  assert.doesNotMatch(source, /canonical: '\/contact\/thanks'/)
})
