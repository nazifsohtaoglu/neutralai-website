import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (route) => readFileSync(new URL(`../../app/${route}/page.tsx`, import.meta.url), 'utf8')

test('prompt bodies are not presented as policy-dependent storage', () => {
  const source = read('how-it-works')
  for (const label of ['Raw prompt', 'Masked prompt']) {
    assert.match(source, new RegExp(`data: '${label}', stored: false`))
  }
  assert.match(source, /Not stored by NeutralAI/)
  assert.doesNotMatch(source, /Policy-dependent|The design goal|telemetry should/)
  assert.match(source, /provider’s retention is governed separately/)
})

test('security pages distinguish prompt bodies, encrypted mappings and provider retention', () => {
  for (const route of ['security', 'trust-center']) {
    const source = read(route)
    assert.match(source, /Raw and masked prompt bodies.*not persisted by NeutralAI/)
    assert.match(source, /AES-256-GCM.*configured TTL/)
    assert.match(source, /Model-provider retention.*governed separately/)
  }
})

test('audit metadata excludes prompt bodies, PII and token values', () => {
  const source = read('security-pack')
  assert.match(source, /not raw prompt text, raw or detected PII values, masked prompt bodies, or token values/)
  assert.match(source, /Do not put sensitive data in customer-supplied custom metadata/)
  assert.doesNotMatch(source, /Audit events are designed to/)
})
