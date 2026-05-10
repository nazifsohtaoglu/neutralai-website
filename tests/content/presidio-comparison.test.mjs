import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('presidio alternative page carries SEO and build-vs-buy content', () => {
  const source = readSource('app/presidio-alternative/page.tsx')

  assert.match(source, /Presidio Alternative for Regulated AI Teams/)
  assert.match(source, /presidio alternative/)
  assert.match(source, /pii masking for llm/)
  assert.match(source, /ai compliance gateway/)
  assert.match(source, /Build with Presidio/)
  assert.match(source, /Buy NeutralAI/)
  assert.match(source, /Presidio is a library/)
  assert.match(source, /not positioned as a from-scratch recognizer model/)
  assert.match(source, /Source of truth: nazifsohtaoglu\/neutralai-gateway benchmark artifacts/)
  assert.match(source, /neutralaiF1: '99\.8%'/)
})

test('roi calculator remains client-side and exposes expected controls', () => {
  const source = readSource('app/presidio-alternative/RoiCalculator.tsx')

  assert.match(source, /'use client'/)
  assert.match(source, /Build vs buy ROI calculator/)
  assert.match(source, /currency:\s*'GBP'/)
  assert.match(source, /useState\(8500\)/)
  assert.match(source, /useState\(399\)/)
  assert.match(source, /Engineers assigned/)
  assert.match(source, /Build timeline/)
  assert.match(source, /Loaded monthly cost per engineer, GBP/)
  assert.match(source, /Estimated savings/)
  assert.match(source, /SpaCy and NLP model updates/)
})

test('presidio insight page links official sources and benchmark proof', () => {
  const source = readSource('app/insights/presidio-alone-regulated-industries/page.tsx')

  assert.match(source, /Why Presidio alone is not enough for regulated industries/)
  assert.match(source, /https:\/\/github\.com\/microsoft\/presidio/)
  assert.match(source, /https:\/\/microsoft\.github\.io\/presidio\//)
  assert.match(source, /siteConfig\.appBaseUrl\}\/pii-benchmark/)
  assert.match(source, /not the same thing as a full AI compliance gateway/)
})

test('new routes are discoverable from existing website surfaces', () => {
  const compare = readSource('app/compare/page.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')

  assert.match(compare, /\/presidio-alternative/)
  assert.match(footer, /\/presidio-alternative/)
  assert.match(sitemap, /\/presidio-alternative/)
  assert.match(sitemap, /\/insights\/presidio-alone-regulated-industries/)
})
