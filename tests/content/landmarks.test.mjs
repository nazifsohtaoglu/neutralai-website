import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const appDir = join(root, 'app')

function listPageFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const pages = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      pages.push(...listPageFiles(fullPath))
      continue
    }

    if (entry.isFile() && entry.name === 'page.tsx') {
      pages.push(fullPath)
    }
  }

  return pages
}

function countMainLandmarks(source) {
  const matches = source.match(/<main(?:\s|>)/g)
  return matches ? matches.length : 0
}

function delegatesToUseCasePage(source) {
  return source.includes('<UseCasePage ')
}

test('root layout delegates main landmark ownership to routes', () => {
  const source = readFileSync(join(root, 'app/layout.tsx'), 'utf8')
  assert.equal(
    countMainLandmarks(source),
    0,
    'app/layout.tsx should not render a <main> landmark',
  )
})

test('shared use-case template owns a single main landmark', () => {
  const source = readFileSync(join(root, 'app/use-cases/UseCasePage.tsx'), 'utf8')
  assert.equal(countMainLandmarks(source), 1, 'UseCasePage should render one <main>')
})

test('each route page renders one main landmark directly or via shared template', () => {
  const pageFiles = listPageFiles(appDir)
  assert.ok(pageFiles.length > 0, 'expected at least one app route page')

  for (const pageFile of pageFiles) {
    const source = readFileSync(pageFile, 'utf8')
    const count = countMainLandmarks(source)

    if (count === 1) {
      continue
    }

    assert.ok(
      count === 0 && delegatesToUseCasePage(source),
      `${pageFile.replace(`${root}/`, '')} should render one <main> directly or delegate to UseCasePage`,
    )
  }
})
