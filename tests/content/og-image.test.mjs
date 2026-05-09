import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

function readPngSize(path) {
  const buffer = readFileSync(join(root, path))
  assert.equal(buffer.toString('ascii', 1, 4), 'PNG', `${path} should be a PNG file`)

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

test('site metadata uses the branded large social preview image', () => {
  const layoutSource = readSource('app/layout.tsx')

  assert.match(layoutSource, /url:\s*'\/og-default\.png'/)
  assert.match(layoutSource, /width:\s*1200/)
  assert.match(layoutSource, /height:\s*630/)
  assert.match(layoutSource, /alt:\s*`\$\{siteConfig\.name\} AI Security Gateway preview`/)
  assert.match(layoutSource, /twitter:[\s\S]*card:\s*'summary_large_image'/)
  assert.match(layoutSource, /twitter:[\s\S]*images:\s*\['\/og-default\.png'\]/)
  assert.doesNotMatch(layoutSource, /images:\s*\[\s*\{\s*url:\s*'\/logo\.png'/)
})

test('branded OG assets exist at 1200 by 630', () => {
  for (const path of ['public/og-default.png', 'public/og-home.png']) {
    assert.deepEqual(readPngSize(path), { width: 1200, height: 630 })
  }
})
