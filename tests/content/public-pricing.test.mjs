import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('public pricing page consumes the gateway catalog contract', () => {
  const page = readSource('app/pricing/page.tsx')
  const catalog = readSource('app/pricing/publicCatalog.ts')
  const client = readSource('app/pricing/PricingClient.tsx')

  assert.match(page, /getPublicPricingCatalog/)
  assert.match(catalog, /GET \/v1\/billing\/public-catalog/)
  assert.match(catalog, /siteConfig\.apiBaseUrl\}\/v1\/billing\/public-catalog/)
  assert.match(catalog, /catalog_id: 'neutralai-public-pricing'/)
  assert.match(catalog, /owner: 'gateway'/)
  assert.match(catalog, /Free/)
  assert.match(catalog, /Starter/)
  assert.match(catalog, /Team/)
  assert.match(catalog, /Business/)
  assert.match(catalog, /Enterprise/)
  assert.match(client, /catalog\.tiers/)
  assert.match(client, /tier\.cta\.href/)
  assert.match(client, /catalog\.commercial_terms\.model_spend_policy/)
})

test('public pricing page preserves GBP billing and model spend boundaries', () => {
  const catalog = readSource('app/pricing/publicCatalog.ts')
  const client = readSource('app/pricing/PricingClient.tsx')

  assert.match(catalog, /currency: 'GBP'/)
  assert.match(catalog, /monthly_price_gbp: 29/)
  assert.match(catalog, /monthly_price_gbp: 99/)
  assert.match(catalog, /monthly_price_gbp: 299/)
  assert.match(catalog, /masking_requests_monthly: 100000/)
  assert.match(catalog, /managed_ai_credit_gbp: 10/)
  assert.match(catalog, /not unlimited model spend/)
  assert.match(catalog, /Production model\/provider spend is customer-owned/)
  assert.match(client, /Annual billing saves/)
  assert.match(client, /Monthly/)
  assert.match(client, /Annual/)
  assert.doesNotMatch(catalog, /\$499/)
  assert.doesNotMatch(client, />USD</)
})

test('public pricing route is discoverable and contact-sales handoff is safe', () => {
  const site = readSource('app/site.ts')
  const navbar = readSource('app/components/Navbar.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')
  const contactSales = readSource('app/contact-sales/page.tsx')

  assert.match(site, /pricing: '\/pricing'/)
  assert.ok(navbar.includes("href: homeSections.pricing"))
  assert.ok(footer.includes("href: homeSections.pricing"))
  assert.ok(sitemap.includes("'/pricing'"))
  assert.match(contactSales, /redirect\('\/contact'\)/)
})
