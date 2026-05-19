import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('google sheets production verification runbook captures owners, links, and fallback checks', () => {
  const runbook = readSource('docs/google-sheets-production-verification.md')

  assert.match(runbook, /# Google Sheets Production Lead Capture Verification/)
  assert.match(runbook, /## Ownership And Non-Secret Links/)
  assert.match(runbook, /Revenue Operations/)
  assert.match(runbook, /Growth Engineering/)
  assert.match(runbook, /docs\.google\.com\/spreadsheets\/d\/<sheet-id>/)
  assert.match(runbook, /script\.google\.com\/home\/projects\/<project-id>/)
  assert.match(runbook, /## Runtime Configuration Snapshot \(Non-Secret\)/)
  assert.match(runbook, /NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT/)
  assert.match(runbook, /## Intent Routing Matrix/)
  assert.match(runbook, /\/contact\?intent=demo/)
  assert.match(runbook, /\/contact\?intent=enterprise/)
  assert.match(runbook, /\/contact\?intent=security-review/)
  assert.match(runbook, /website_demo_request/)
  assert.match(runbook, /website_enterprise_enquiry/)
  assert.match(runbook, /website_security_review/)
  assert.match(runbook, /## Fallback Route Validation/)
  assert.match(runbook, /clearing `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT`/)
  assert.match(runbook, /Lead form endpoint is not configured in this environment yet\./)
  assert.match(runbook, /Form could not be submitted right now\./)
  assert.match(runbook, /mailto:sales@neutralai\.co\.uk/)
  assert.match(runbook, /## Verification Log/)
  assert.match(runbook, /\| 2026-05-19 \| Pending \|/)
})

test('launch readiness ledger references the google sheets verification runbook', () => {
  const launchLedger = readSource('docs/ai/LAUNCH_READINESS_LEDGER.md')

  assert.match(launchLedger, /Google Sheets production forms, routing, and lead ownership/)
  assert.match(launchLedger, /docs\/google-sheets-production-verification\.md/)
  assert.match(launchLedger, /2026-05-19: verification runbook and non-secret ownership\/link matrix updated for Google Sheets/)
})
