import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('homepage exposes concrete trust badges and detection details', () => {
  const homeSource = readSource('app/page.tsx')

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
})

test('homepage adds a scannable detection engine deep dive', () => {
  const homeSource = readSource('app/page.tsx')

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
  const homeSource = readSource('app/page.tsx')

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
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /Source of truth: nazifsohtaoglu\/neutralai-gateway#779 healthcare pack artifacts/)
  assert.match(homeSource, /id="healthcare-trust"/)
  assert.match(homeSource, /HIPAA-ready deployment support without blanket claims/)
  assert.match(homeSource, /PHI-aware controls/)
  assert.match(homeSource, /medical record numbers, health plan\/member IDs, and device\/UDI-style identifiers/)
  assert.match(homeSource, /Minimum-necessary posture/)
  assert.match(homeSource, /evidence pack are available under review\/NDA/)
  assert.match(homeSource, /BAA review is available for eligible healthcare deployments/)
  assert.match(homeSource, /href="\/contact"/)
  assert.match(homeSource, /href="\/use-cases\/healthcare"/)
  assert.doesNotMatch(homeSource, /NeutralAI is HIPAA compliant/)
  assert.doesNotMatch(homeSource, /BAA included/)
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
