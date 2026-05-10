import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function lineCount(path) {
  return readFileSync(join(root, path), 'utf8').trimEnd().split('\n').length
}

test('homepage page file stays as thin composition', () => {
  assert.ok(lineCount('app/page.tsx') < 80, 'app/page.tsx should stay below 80 lines')
})

test('homepage section component files stay focused', () => {
  const sectionFiles = [
    'app/components/home/CtaSection.tsx',
    'app/components/home/DetectionEngine.tsx',
    'app/components/home/Hero.tsx',
    'app/components/home/HowItWorks.tsx',
    'app/components/home/PricingSection.tsx',
    'app/components/home/ProductSurface.tsx',
    'app/components/home/ProductVisual.tsx',
    'app/components/home/TrustSection.tsx',
    'app/components/home/WhyItMatters.tsx',
  ]

  for (const path of sectionFiles) {
    assert.ok(lineCount(path) < 250, `${path} should stay below 250 lines`)
  }
})
