import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('hubspot production verification runbook captures owners, links, and fallback checks', () => {
  const runbook = readSource('docs/hubspot-production-verification.md')

  assert.match(runbook, /# HubSpot Production Lead Capture Verification/)
  assert.match(runbook, /## Ownership And Non-Secret Links/)
  assert.match(runbook, /Revenue Operations/)
  assert.match(runbook, /Growth Engineering/)
  assert.match(runbook, /https:\/\/app\.hubspot\.com\/forms\/<portal-id>/)
  assert.match(runbook, /https:\/\/app\.hubspot\.com\/workflows\/<portal-id>/)
  assert.match(runbook, /## Runtime Configuration Snapshot \(Non-Secret\)/)
  assert.match(runbook, /NEXT_PUBLIC_HUBSPOT_PORTAL_ID/)
  assert.match(runbook, /NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID/)
  assert.match(runbook, /NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID/)
  assert.match(runbook, /## Intent Routing Matrix/)
  assert.match(runbook, /\/contact\?intent=demo/)
  assert.match(runbook, /\/contact\?intent=enterprise/)
  assert.match(runbook, /\/contact\?intent=security-review/)
  assert.match(runbook, /website_demo_request/)
  assert.match(runbook, /website_enterprise_enquiry/)
  assert.match(runbook, /website_security_review/)
  assert.match(runbook, /## Fallback Route Validation/)
  assert.match(runbook, /clearing `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`/)
  assert.match(runbook, /clearing both the selected intent form ID and `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID` fallback/)
  assert.match(runbook, /The CRM form is not configured in this environment yet\./)
  assert.match(runbook, /The CRM form could not load in this browser\./)
  assert.match(runbook, /mailto:sales@neutralai\.co\.uk/)
  assert.match(runbook, /## Verification Log/)
  assert.match(runbook, /\| 2026-05-15 \| Pending \|/)
})

test('launch readiness ledger references the hubspot verification runbook', () => {
  const launchLedger = readSource('docs/ai/LAUNCH_READINESS_LEDGER.md')

  assert.match(launchLedger, /HubSpot production forms, routing, and lead ownership/)
  assert.match(launchLedger, /docs\/hubspot-production-verification\.md/)
  assert.match(launchLedger, /2026-05-15: verification runbook and non-secret ownership\/link matrix added/)
})
