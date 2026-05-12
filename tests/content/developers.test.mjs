import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('developers page exposes API-first quickstart and auth guidance', () => {
  const source = readSource('app/developers/page.tsx')

  assert.match(source, /title: 'Developers'/)
  assert.match(source, /Mask sensitive data before your AI request leaves/)
  assert.match(source, /siteConfig\.apiBaseUrl\}\/v1\/shield\/mask/)
  assert.match(source, /x-api-key: nai_live_your_key/)
  assert.match(source, /Get your free API key/)
  assert.match(source, /Keep API keys server-side/)
  assert.match(source, /API reference/)
})

test('developers page covers SDK status and integration examples without unpublished install commands', () => {
  const source = readSource('app/developers/page.tsx')

  assert.match(source, /Python and Node SDKs are prepared for publication/)
  assert.match(source, /Public package publication is still in progress/)
  assert.match(source, /LangChain integration/)
  assert.match(source, /OpenAI SDK wrapper/)
  assert.match(source, /Browser extension/)
  assert.match(source, /Direct API/)
  assert.doesNotMatch(source, /python -m pip install neutralai-sdk/)
  assert.doesNotMatch(source, /npm install neutralai-node-sdk/)
})

test('developers route is discoverable from navigation, footer, and sitemap', () => {
  const navbar = readSource('app/components/Navbar.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')

  assert.match(navbar, /Developers/)
  assert.ok(navbar.includes("href: '/developers'"))
  assert.match(footer, /Developers/)
  assert.ok(footer.includes("href: '/developers'"))
  assert.ok(sitemap.includes("'/developers'"))
})
