import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('vertical use-case pages exist for finance, healthcare, and legal', () => {
  const index = readSource('app/use-cases/page.tsx')
  const finance = readSource('app/use-cases/financial-services/page.tsx')
  const healthcare = readSource('app/use-cases/healthcare/page.tsx')
  const legal = readSource('app/use-cases/legal/page.tsx')
  const content = readSource('app/use-cases/content.ts')
  const indexSurface = `${index}\n${content}`

  assert.match(index, /AI use cases for regulated teams/)
  assert.match(indexSurface, /\/use-cases\/financial-services/)
  assert.match(indexSurface, /\/use-cases\/healthcare/)
  assert.match(indexSurface, /\/use-cases\/legal/)
  assert.match(finance, /AI Data Protection for Financial Services/)
  assert.match(finance, /canonical: '\/use-cases\/financial-services'/)
  assert.match(healthcare, /PHI-Aware AI Data Protection for Healthcare/)
  assert.match(healthcare, /canonical: '\/use-cases\/healthcare'/)
  assert.match(legal, /AI Data Protection for Legal Teams/)
  assert.match(legal, /canonical: '\/use-cases\/legal'/)
  assert.match(content, /IBAN/)
  assert.match(content, /CREDIT_CARD/)
  assert.match(content, /UK_NHS/)
  assert.match(content, /MRN/)
  assert.match(content, /HEALTH_PLAN_ID/)
  assert.match(content, /DEVICE_UDI/)
  assert.match(content, /MATTER_ID/)
  assert.match(content, /CLIENT_NAME/)
  assert.match(content, /PRIVILEGED_CONTEXT/)
})

test('legacy finance alias is static-export safe and points to canonical route', () => {
  const alias = readSource('app/use-cases/finance/page.tsx')

  assert.doesNotMatch(alias, /permanentRedirect/)
  assert.match(alias, /canonical: '\/use-cases\/financial-services'/)
  assert.match(alias, /robots:\s*{\s*index:\s*false,\s*follow:\s*true,?\s*}/)
  assert.match(alias, /Go to Financial Services Use Case/)
})

test('vertical copy avoids blanket compliance claims while supporting review language', () => {
  const content = readSource('app/use-cases/content.ts')

  assert.match(content, /PHI-aware masking/)
  assert.match(content, /BAA review/)
  assert.match(content, /health plan\/member IDs/)
  assert.match(content, /device or UDI-style identifiers/)
  assert.match(content, /evidence pack materials under review\/NDA/)
  assert.match(content, /not presenting this page as legal advice or a blanket HIPAA compliance claim/)
  assert.match(content, /client privilege/)
  assert.match(content, /matter confidentiality/)
  assert.match(content, /legal advice and does not guarantee privilege protection/)
  assert.doesNotMatch(content, /is HIPAA compliant/)
  assert.doesNotMatch(content, /HIPAA-compliant AI gateway/)
  assert.doesNotMatch(content, /BAA included/)
  assert.doesNotMatch(content, /guarantees privilege/)
})

test('use-case routes are discoverable from homepage, navigation, footer, and sitemap', () => {
  const homepage = readSource('app/components/home/UseCasesSection.tsx')
  const navbar = readSource('app/components/Navbar.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')

  for (const route of ["'/use-cases'", "'/use-cases/financial-services'", "'/use-cases/healthcare'", "'/use-cases/legal'"]) {
    assert.ok(homepage.includes(route))
    assert.ok(navbar.includes(route))
    assert.ok(footer.includes(route))
    assert.ok(sitemap.includes(route))
  }

  assert.match(navbar, /Use Cases/)
  assert.match(footer, /Finance Use Case/)
  assert.match(footer, /Healthcare Use Case/)
  assert.match(footer, /Legal Use Case/)
  assert.match(homepage, /Industries/)
})

test('use-case pages publish FAQ structured data for industry SEO', () => {
  const component = readSource('app/use-cases/UseCasePage.tsx')
  const content = readSource('app/use-cases/content.ts')

  assert.match(component, /type="application\/ld\+json"/)
  assert.match(component, /JSON\.stringify\(content\.faqStructuredData\)/)
  assert.match(content, /'@type': 'FAQPage'/)
  assert.match(content, /mainEntity: faq\.map/)
  assert.match(content, /financial AI workflows/)
  assert.match(content, /healthcare AI prompts/)
  assert.match(content, /legal document review AI/)
})

test('blog articles link to relevant use-case pages', () => {
  const financeArticle = readSource('content/blog/how-uk-financial-services-teams-use-ai-safely-under-fca-guidance.mdx')
  const piiArticle = readSource('content/blog/why-pii-masking-matters-for-enterprise-ai-adoption.mdx')
  const presidioArticle = readSource('content/blog/from-presidio-to-production-regulated-teams.mdx')

  assert.match(financeArticle, /\[financial services AI data protection\]\(\/use-cases\/financial-services\)/)
  assert.match(piiArticle, /\[healthcare AI data protection\]\(\/use-cases\/healthcare\)/)
  assert.match(presidioArticle, /\[legal AI data protection\]\(\/use-cases\/legal\)/)
})
