import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('vertical use-case pages exist for finance and healthcare', () => {
  const finance = readSource('app/use-cases/finance/page.tsx')
  const healthcare = readSource('app/use-cases/healthcare/page.tsx')
  const content = readSource('app/use-cases/content.ts')

  assert.match(finance, /AI Data Protection for Financial Services/)
  assert.match(finance, /canonical: '\/use-cases\/finance'/)
  assert.match(healthcare, /PHI-Aware AI Data Protection for Healthcare/)
  assert.match(healthcare, /canonical: '\/use-cases\/healthcare'/)
  assert.match(content, /IBAN/)
  assert.match(content, /CREDIT_CARD/)
  assert.match(content, /UK_NHS/)
  assert.match(content, /MRN/)
})

test('healthcare copy avoids blanket HIPAA claims while supporting BAA review language', () => {
  const content = readSource('app/use-cases/content.ts')

  assert.match(content, /PHI-aware masking/)
  assert.match(content, /BAA review/)
  assert.match(content, /not presenting this page as legal advice or a blanket HIPAA compliance claim/)
  assert.doesNotMatch(content, /is HIPAA compliant/)
  assert.doesNotMatch(content, /BAA included/)
})

test('use-case routes are discoverable from navigation, footer, and sitemap', () => {
  const navbar = readSource('app/components/Navbar.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')

  for (const route of ["'/use-cases/finance'", "'/use-cases/healthcare'"]) {
    assert.ok(navbar.includes(route))
    assert.ok(footer.includes(route))
    assert.ok(sitemap.includes(route))
  }

  assert.match(navbar, /Use Cases/)
  assert.match(footer, /Finance Use Case/)
  assert.match(footer, /Healthcare Use Case/)
})
