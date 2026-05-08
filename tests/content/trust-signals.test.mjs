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
  assert.match(homeSource, /5\+ language benchmark/)
  assert.match(homeSource, /Presidio NER and pattern matching with semantic validation using Qdrant/)
  assert.match(homeSource, /Configurable confidence thresholds per entity type/)
  assert.match(homeSource, /EMAIL/)
  assert.match(homeSource, /CREDIT_CARD/)
  assert.match(homeSource, /UK_NHS/)
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
