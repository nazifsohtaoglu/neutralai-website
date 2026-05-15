import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, realpath, rm, symlink, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { resolveStaticFileFromRoot } from '../scripts/accessibility-smoke.mjs'

async function withTempDir(run) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'neutralai-a11y-smoke-'))

  try {
    await run(tempDir)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

test('resolveStaticFileFromRoot serves files inside the static export root', async () => {
  await withTempDir(async (tempDir) => {
    await mkdir(path.join(tempDir, 'nested'), { recursive: true })
    await writeFile(path.join(tempDir, 'index.html'), '<html></html>', 'utf8')
    await writeFile(path.join(tempDir, 'nested', 'index.html'), '<html>nested</html>', 'utf8')

    const home = await resolveStaticFileFromRoot(tempDir, '/')
    const nested = await resolveStaticFileFromRoot(tempDir, '/nested/')

    assert.equal(home, await realpath(path.join(tempDir, 'index.html')))
    assert.equal(nested, await realpath(path.join(tempDir, 'nested', 'index.html')))
  })
})

test('resolveStaticFileFromRoot rejects traversal and symlink escapes', async () => {
  await withTempDir(async (tempDir) => {
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), 'neutralai-a11y-outside-'))

    try {
      await writeFile(path.join(tempDir, 'index.html'), '<html></html>', 'utf8')
      await writeFile(path.join(outsideRoot, 'secret.txt'), 'secret', 'utf8')
      await symlink(path.join(outsideRoot, 'secret.txt'), path.join(tempDir, 'escape.txt'))

      const traversal = await resolveStaticFileFromRoot(tempDir, '/../secret.txt')
      const symlinkEscape = await resolveStaticFileFromRoot(tempDir, '/escape.txt')

      assert.equal(traversal, null)
      assert.equal(symlinkEscape, null)
    } finally {
      await rm(outsideRoot, { recursive: true, force: true })
    }
  })
})

test('resolveStaticFileFromRoot rejects malformed absolute and scheme-relative targets', async () => {
  await withTempDir(async (tempDir) => {
    await writeFile(path.join(tempDir, 'index.html'), '<html></html>', 'utf8')

    const absoluteTarget = await resolveStaticFileFromRoot(tempDir, 'http://evil.test/index.html')
    const schemeRelativeTarget = await resolveStaticFileFromRoot(tempDir, '//evil.test/%2e%2e/index.html')

    assert.equal(absoluteTarget, null)
    assert.equal(schemeRelativeTarget, null)
  })
})
