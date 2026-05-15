import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('public claims registry exists and records required review fields', () => {
  const registry = readSource('docs/ai/PUBLIC_CLAIMS_EVIDENCE_REGISTRY.md')

  assert.match(registry, /# Public Claims Evidence Registry/)
  assert.match(registry, /Last reviewed: 2026-05-15/)
  assert.match(registry, /Status values:/)
  assert.match(registry, /`approved`/)
  assert.match(registry, /`needs_evidence`/)
  assert.match(registry, /`nda_only`/)
  assert.match(registry, /`roadmap`/)
  assert.match(registry, /`remove`/)
  assert.match(registry, /\| Area \| Public Claim \| Status \| Source \| Owner \| Review Date \| Allowed Wording \|/)
  assert.match(registry, /Repeatable Review Process For New Claims/)
})

test('registry covers high-risk benchmark, compliance, and deployment claims', () => {
  const registry = readSource('docs/ai/PUBLIC_CLAIMS_EVIDENCE_REGISTRY.md')

  assert.match(registry, /AES-256-GCM/)
  assert.match(registry, /SOC2 readiness/)
  assert.match(registry, /GDPR-aligned controls/)
  assert.match(registry, /Cyber Essentials via review/)
  assert.match(registry, /public overall F1/)
  assert.match(registry, /measured overhead/)
  assert.match(registry, /PHI-aware masking/)
  assert.match(registry, /BAA review support/)
  assert.match(registry, /private cloud\/on-prem planning/)
  assert.match(registry, /app\/security\/page\.tsx/)
  assert.match(registry, /app\/trust-center\/page\.tsx/)
  assert.match(registry, /app\/developers\/page\.tsx/)
  assert.match(registry, /app\/use-cases\/content\.ts/)
})

test('homepage trust proof wording stays conservative for certification and deployment posture', () => {
  const homeData = readSource('app/data/homepage.ts')

  assert.match(homeData, /SOC2 readiness \/ GDPR-aligned \/ Cyber Essentials via review/)
  assert.match(homeData, /Managed now, private cloud\/on-prem planning/)
  assert.doesNotMatch(homeData, /SOC2 \/ ISO \/ CE/)
  assert.doesNotMatch(homeData, /Cyber Essentials evidence/)
  assert.doesNotMatch(homeData, /Managed, private cloud, or on-prem/)
})
