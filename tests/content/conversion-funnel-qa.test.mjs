import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('conversion funnel QA runbook documents owners, destinations, analytics signals, and smoke status', () => {
  const runbook = readSource('docs/conversion-funnel-qa.md')

  assert.match(runbook, /# Conversion Funnel QA Matrix/)
  assert.match(runbook, /Ticket: \[#76\]/)
  assert.match(runbook, /\| Funnel path \| Owner role \| Expected destination \| Analytics event \| Smoke result \|/)

  assert.match(runbook, /homepage_hero/)
  assert.match(runbook, /navbar_desktop/)
  assert.match(runbook, /homepage_pricing_primary/)
  assert.match(runbook, /homepage_pricing_advanced/)
  assert.match(runbook, /playground_bottom_cta/)
  assert.match(runbook, /install_extension_options/)

  assert.match(runbook, /website_start_free_trial/)
  assert.match(runbook, /website_get_started/)
  assert.match(runbook, /website_get_team/)
  assert.match(runbook, /website_get_business/)
  assert.match(runbook, /website_demo_request/)
  assert.match(runbook, /website_enterprise_enquiry/)
  assert.match(runbook, /website_security_review/)
})

test('homepage, pricing, and extension flows emit CTA analytics metadata', () => {
  const heroSource = readSource('app/components/home/Hero.tsx')
  const productSurfaceSource = readSource('app/components/home/ProductSurface.tsx')
  const pricingSource = readSource('app/components/home/PricingSection.tsx')
  const installSource = readSource('app/install-extension/page.tsx')

  assert.match(heroSource, /data-analytics-event="CTA Click"/)
  assert.match(heroSource, /data-analytics-label="Try Free"/)
  assert.match(heroSource, /data-analytics-label="Book Demo"/)
  assert.match(heroSource, /data-analytics-label="Install Browser Extension"/)

  assert.match(productSurfaceSource, /data-analytics-placement="homepage_product_surface"/)
  assert.match(productSurfaceSource, /data-analytics-label="Install Browser Extension"/)

  assert.match(pricingSource, /data-analytics-placement="homepage_pricing_primary"/)
  assert.match(pricingSource, /data-analytics-placement="homepage_pricing_advanced"/)
  assert.match(pricingSource, /data-analytics-label=\{`\$\{plan\.name\} \$\{plan\.cta\}`\}/)

  assert.match(installSource, /data-analytics-placement="install_extension_options"/)
  assert.match(installSource, /data-analytics-event="CTA Click"/)
  assert.match(installSource, /target="_blank"/)
  assert.match(installSource, /rel="noopener noreferrer"/)
})

test('contact intent routes and lead-source attribution remain wired for demo, enterprise, and security review', () => {
  const siteSource = readSource('app/site.ts')
  const contactSource = readSource('app/contact/page.tsx')
  const runbook = readSource('docs/conversion-funnel-qa.md')

  assert.match(siteSource, /demo: '\/contact\?intent=demo'/)
  assert.match(siteSource, /enterprise: '\/contact\?intent=enterprise'/)
  assert.match(siteSource, /securityReview: '\/contact\?intent=security-review'/)

  assert.match(contactSource, /leadSource: 'website_demo_request'/)
  assert.match(contactSource, /leadSource: 'website_enterprise_enquiry'/)
  assert.match(contactSource, /leadSource: 'website_security_review'/)

  assert.match(runbook, /Pending production execution evidence/)
  assert.match(runbook, /docs\/hubspot-production-verification\.md/)
  assert.match(runbook, /docs\/analytics-setup\.md/)
})
