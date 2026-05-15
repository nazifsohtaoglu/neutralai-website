import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

function readHomepageSource() {
  return [
    'app/page.tsx',
    'app/data/homepage.ts',
    'app/components/home/DetectionEngine.tsx',
    'app/components/home/Hero.tsx',
    'app/components/home/SocialProofSection.tsx',
    'app/components/home/TrustSection.tsx',
  ]
    .map(readSource)
    .join('\n')
}

test('homepage exposes concrete trust badges and detection details', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /AES-256-GCM vault/)
  assert.match(homeSource, /SOC2 readiness/)
  assert.match(homeSource, /GDPR-aligned controls/)
  assert.match(homeSource, /Cyber Essentials evidence/)
  assert.match(homeSource, /20\+ PII entity types/)
  assert.match(homeSource, /10-language benchmark/)
  assert.match(homeSource, /Presidio NER and pattern matching with semantic validation using Qdrant/)
  assert.match(homeSource, /Configurable confidence thresholds per entity type/)
  assert.match(homeSource, /EMAIL/)
  assert.match(homeSource, /CREDIT_CARD/)
  assert.match(homeSource, /PHONE_NUMBER, PERSON, CREDIT_CARD, IBAN, SSN, TR_ID_NUMBER, UK_NHS_NUMBER/)
  assert.match(homeSource, /Sensitive values are replaced with safer tokens or sanitized references/)
  assert.doesNotMatch(homeSource, /neutral tokens or irreversible tags/i)
})

test('homepage adds social proof without fake customer claims', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /<SocialProofSection \/>/)
  assert.match(homeSource, /Proof buyers can verify/)
  assert.match(homeSource, /Financial Services/)
  assert.match(homeSource, /Healthcare/)
  assert.match(homeSource, /Legal/)
  assert.match(homeSource, /Public Sector/)
  assert.match(homeSource, /Proof-backed metrics/)
  assert.match(homeSource, /20\+/)
  assert.match(homeSource, /10/)
  assert.match(homeSource, /99\.8%/)
  assert.match(homeSource, /~41 ms/)
  assert.match(homeSource, /Finance evaluation pattern/)
  assert.match(homeSource, /Healthcare evaluation pattern/)
  assert.match(homeSource, /Production usage counts and customer outcomes are published only when an approved source exists/)
  assert.doesNotMatch(homeSource, /Trusted by .*customers/)
  assert.doesNotMatch(homeSource, /testimonial/i)
  assert.doesNotMatch(homeSource, /customer logo/i)
})

test('homepage adds a scannable detection engine deep dive', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /function DetectionEngine/)
  assert.match(homeSource, /<DetectionEngine \/>/)
  assert.match(homeSource, /Detection Engine/)
  assert.match(homeSource, /Entity Types Grid/)
  assert.match(homeSource, /EMAIL/)
  assert.match(homeSource, /PHONE_NUMBER/)
  assert.match(homeSource, /PERSON/)
  assert.match(homeSource, /CREDIT_CARD/)
  assert.match(homeSource, /IBAN/)
  assert.match(homeSource, /IP_ADDRESS/)
  assert.match(homeSource, /SSN/)
  assert.match(homeSource, /UK_NHS_NUMBER/)
  assert.match(homeSource, /TR_ID_NUMBER/)
  assert.match(homeSource, /TR_VAT_NUMBER/)
  assert.match(homeSource, /Custom rules/)
  assert.match(homeSource, /Presidio NER \+ Pattern Matching/)
  assert.match(homeSource, /Semantic Validation via Qdrant vector DB/)
  assert.match(homeSource, /false positives/)
  assert.match(homeSource, /confidence thresholds configurable per entity type/)
  assert.match(homeSource, /Benchmark Coverage/)
  assert.match(homeSource, /English/)
  assert.match(homeSource, /Turkish/)
  assert.match(homeSource, /German/)
  assert.match(homeSource, /French/)
  assert.match(homeSource, /Spanish/)
  assert.match(homeSource, /Italian/)
  assert.match(homeSource, /Portuguese/)
  assert.match(homeSource, /Arabic/)
  assert.match(homeSource, /Dutch/)
  assert.match(homeSource, /Polish/)
  assert.match(homeSource, /Current multilingual benchmark scope covers 10 target languages/)
  assert.match(homeSource, /Irreversible/)
  assert.match(homeSource, /<EMAIL>/)
  assert.match(homeSource, /Reversible/)
  assert.match(homeSource, /<EMAIL_token_abc123>/)
  assert.match(homeSource, /encrypted vault/)
})

test('homepage carries benchmark proof without overclaiming independence', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /Source of truth: nazifsohtaoglu\/neutralai-gateway benchmark artifacts/)
  assert.match(homeSource, /id="benchmark-proof"/)
  assert.match(homeSource, /Benchmark proof/)
  assert.match(homeSource, /reproducible Presidio-vanilla baseline/)
  assert.match(homeSource, /multilingual calibration, masking, and enforcement layers/)
  assert.match(homeSource, /Public overall F1/)
  assert.match(homeSource, /99\.8%/)
  assert.match(homeSource, /Holdout overall F1/)
  assert.match(homeSource, /98\.4%/)
  assert.match(homeSource, /Holdout PERSON F1/)
  assert.match(homeSource, /92\.7%/)
  assert.match(homeSource, /Product benchmark, not a third-party independent evaluation/)
  assert.match(homeSource, /benchmarkProof\.appBenchmarkUrl/)
  assert.match(homeSource, /\/presidio-alternative/)
  assert.doesNotMatch(homeSource, /independent third-party evaluation/)
})

test('homepage carries healthcare trust copy without blanket HIPAA claims', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /Source of truth: nazifsohtaoglu\/neutralai-gateway#779 healthcare pack artifacts/)
  assert.match(homeSource, /id="healthcare-trust"/)
  assert.match(homeSource, /HIPAA-ready deployment support without blanket claims/)
  assert.match(homeSource, /PHI-aware controls/)
  assert.match(homeSource, /medical record numbers, health plan\/member IDs, and device\/UDI-style identifiers/)
  assert.match(homeSource, /Minimum-necessary posture/)
  assert.match(homeSource, /evidence pack are available under review\/NDA/)
  assert.match(homeSource, /BAA review is available for eligible healthcare deployments/)
  assert.match(homeSource, /contactLinks\.securityReview/)
  assert.match(homeSource, /href="\/use-cases\/healthcare"/)
  assert.doesNotMatch(homeSource, /NeutralAI is HIPAA compliant/)
  assert.doesNotMatch(homeSource, /BAA included/)
})

test('homepage carries document redaction proof without overclaiming OCR or PDF coverage', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /Source of truth: nazifsohtaoglu\/neutralai-gateway#782 document redaction artifacts/)
  assert.match(homeSource, /id="document-redaction-proof"/)
  assert.match(homeSource, /Document proof/)
  assert.match(homeSource, /Protect files before document content reaches AI workflows/)
  assert.match(homeSource, /document-aware extraction, redaction output, and audit-safe finding metadata/)
  assert.match(homeSource, /Supports simple text PDFs today/)
  assert.match(homeSource, /OCR-backed image detection depends on configured OCR runtime/)
  assert.match(homeSource, /PDF redaction/)
  assert.match(homeSource, /visual blackout marks/)
  assert.match(homeSource, /Office document text/)
  assert.match(homeSource, /OCR-backed image detection when OCR is configured/)
  assert.match(homeSource, /file hash, page count, finding counts, and approximate locations/)
  assert.doesNotMatch(homeSource, /Live canary smoke/)
  assert.doesNotMatch(homeSource, /Dense 10-page text PDF/)
  assert.doesNotMatch(homeSource, /sensitive spans/)
  assert.doesNotMatch(homeSource, /simple 10-page text PDF smoke/)
  assert.doesNotMatch(homeSource, /universal PDF layout-preserving redaction/)
  assert.doesNotMatch(homeSource, /perfect OCR coverage/)
  assert.doesNotMatch(homeSource, /independent third-party benchmark/)
})

test('security page describes architecture, encryption, and public trust links', () => {
  const securitySource = readSource('app/security/page.tsx')

  assert.match(securitySource, /AES-256-GCM vault/)
  assert.match(securitySource, /Presidio NER/)
  assert.match(securitySource, /semantic validation with Qdrant/)
  assert.match(securitySource, /Client app or browser extension/)
  assert.match(securitySource, /NeutralAI policy and masking gateway/)
  assert.match(securitySource, /Sanitized request to external LLM provider/)
  assert.match(securitySource, /siteConfig\.securityTxtPath/)
  assert.match(securitySource, /siteConfig\.apiHealthUrl/)
  assert.match(securitySource, /siteConfig\.apiReadyUrl/)
})

test('trust center documents customer proof framework without fake social-proof claims', () => {
  const trustCenterSource = readSource('app/trust-center/page.tsx')
  const frameworkDoc = readSource('docs/customer-proof-framework.md')

  assert.match(trustCenterSource, /Customer Proof Framework/)
  assert.match(
    trustCenterSource,
    /Publication gates, approved proof\s+types, and wording guardrails are documented in the customer proof framework before any public customer claim\s+goes live\./
  )
  assert.match(trustCenterSource, /No customer logos or testimonials are published on this site until approved assets are recorded through the framework workflow/)
  assert.match(trustCenterSource, /Approved proof types/)
  assert.match(trustCenterSource, /Wording guardrails/)
  assert.doesNotMatch(trustCenterSource, /github\.com\/nazifsohtaoglu\/neutralai-website\/blob\/main\/docs\/customer-proof-framework\.md/)
  assert.match(frameworkDoc, /Allowed Public Proof Types/)
  assert.match(frameworkDoc, /Required Approval Gates/)
  assert.match(frameworkDoc, /No invented customer logos, testimonials, or usage numbers\./)
  assert.match(frameworkDoc, /Current Public Posture \(2026-05-15\)/)
})
