import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('third-party service register tracks accounts and env ownership', () => {
  const register = readSource('docs/third-party-services.md')
  const projectMap = readSource('docs/ai/PROJECT_MAP.md')
  const analyticsDocs = readSource('docs/analytics-setup.md')
  const hubspotDocs = readSource('docs/hubspot-crm-setup.md')

  for (const service of ['PostHog', 'Plausible', 'HubSpot', 'Slack', 'Cloudflare', 'Chrome Web Store', 'Microsoft Edge Add-ons', 'Google Fonts', 'GitHub']) {
    assert.match(register, new RegExp(service))
  }

  for (const envName of ['NEXT_PUBLIC_POSTHOG_TOKEN', 'NEXT_PUBLIC_PLAUSIBLE_DOMAIN', 'NEXT_PUBLIC_HUBSPOT_PORTAL_ID']) {
    assert.match(register, new RegExp(envName))
  }

  assert.match(register, /Do not commit secret values/)
  assert.match(register, /Missing Account Setup Checklist/)
  assert.match(register, /Live Links/)
  assert.match(projectMap, /docs\/third-party-services\.md/)
  assert.match(analyticsDocs, /docs\/third-party-services\.md/)
  assert.match(hubspotDocs, /docs\/third-party-services\.md/)
})
