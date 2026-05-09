import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('playground page exposes an interactive PII masking workflow', () => {
  const page = readSource('app/playground/page.tsx')
  const layout = readSource('app/playground/layout.tsx')

  assert.match(layout, /PII Masking Playground/)
  assert.match(page, /siteConfig\.apiBaseUrl\}\/v1\/shield\/mask/)
  assert.match(page, /Mask prompt/)
  assert.match(page, /Write your prompt here, or choose a sample prompt below/)
  assert.match(page, /Sanitized output will appear here/)
  assert.match(page, /Raw prompt/)
  assert.match(page, /Sanitized/)
  assert.match(page, /Entities and confidence/)
  assert.match(page, /reversible/)
  assert.match(page, /samplePrompts/)
})

test('playground is discoverable from nav, footer, and sitemap', () => {
  const navbar = readSource('app/components/Navbar.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')

  assert.match(navbar, /Playground/)
  assert.ok(navbar.includes("href: '/playground'"))
  assert.match(footer, /Playground/)
  assert.ok(footer.includes("href: '/playground'"))
  assert.ok(sitemap.includes("'/playground'"))
})

test('playground keeps abuse controls client-side and sends no secret material', () => {
  const page = readSource('app/playground/page.tsx')

  assert.match(page, /MAX_PROMPT_LENGTH = 1200/)
  assert.match(page, /REQUEST_COOLDOWN_MS = 2500/)
  assert.match(page, /reversible: mode === 'reversible'/)
  assert.doesNotMatch(page, /x-api-key/i)
  assert.doesNotMatch(page, /authorization/i)
})
