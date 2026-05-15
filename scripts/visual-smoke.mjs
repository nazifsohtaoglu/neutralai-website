#!/usr/bin/env node

import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { access, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { chromium } from 'playwright'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const outDir = path.join(rootDir, 'out')
const artifactRoot = path.join(rootDir, 'output', 'visual-smoke')
const resolvedOutDir = path.resolve(outDir)

const scenarios = [
  { name: 'home-desktop', route: '/', viewport: { width: 1440, height: 900 } },
  { name: 'home-tablet', route: '/', viewport: { width: 1024, height: 1366 } },
  { name: 'home-mobile', route: '/', viewport: { width: 390, height: 844 }, checkMobileNav: true, checkPrimaryMedia: true },
  { name: 'pricing-desktop', route: '/#pricing', viewport: { width: 1440, height: 900 } },
  { name: 'contact-desktop', route: '/contact/', viewport: { width: 1440, height: 900 } },
  { name: 'demo-desktop', route: '/demo/', viewport: { width: 1440, height: 900 } },
  { name: 'playground-desktop', route: '/playground/', viewport: { width: 1440, height: 900 } },
  { name: 'use-case-finance-desktop', route: '/use-cases/financial-services/', viewport: { width: 1440, height: 900 } },
]

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
}

function nowStamp() {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

async function ensureOutExists() {
  const indexFile = path.join(outDir, 'index.html')
  try {
    await access(indexFile)
  } catch {
    throw new Error('Missing out/index.html. Run `npm run build` before visual smoke checks.')
  }
}

async function resolveStaticFile(urlPathname) {
  const normalizedPath = decodeURIComponent(urlPathname.split('?')[0]).replace(/^\/+/, '')
  const candidate = path.join(outDir, normalizedPath)

  const candidatePaths = []
  if (normalizedPath === '') {
    candidatePaths.push(path.join(outDir, 'index.html'))
  } else {
    candidatePaths.push(candidate)
    if (!path.extname(candidate)) {
      candidatePaths.push(path.join(candidate, 'index.html'))
    }
    if (normalizedPath.endsWith('/')) {
      candidatePaths.push(path.join(candidate, 'index.html'))
    }
  }

  for (const maybePath of candidatePaths) {
    try {
      const resolvedPath = path.resolve(maybePath)
      const relativePath = path.relative(resolvedOutDir, resolvedPath)
      if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        continue
      }

      const fileStat = await stat(maybePath)
      if (fileStat.isFile()) {
        return resolvedPath
      }
    } catch {
      // Try next candidate.
    }
  }

  return null
}

async function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      const filePath = await resolveStaticFile(req.url ?? '/')
      if (!filePath) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('Not Found')
        return
      }

      const extension = path.extname(filePath).toLowerCase()
      res.statusCode = 200
      res.setHeader('Content-Type', mimeTypes[extension] ?? 'application/octet-stream')
      createReadStream(filePath).pipe(res)
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(`Server error: ${error instanceof Error ? error.message : 'unknown error'}`)
    }
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') {
    server.close()
    throw new Error('Could not start static server on 127.0.0.1')
  }
  return { server, port: address.port }
}

async function assertNoHorizontalOverflow(page, scenarioName) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement
    const body = document.body
    const docOverflow = doc.scrollWidth - doc.clientWidth
    const bodyOverflow = body ? body.scrollWidth - body.clientWidth : 0
    return Math.max(docOverflow, bodyOverflow)
  })

  if (overflow > 1) {
    throw new Error(`${scenarioName}: detected horizontal overflow of ${overflow}px`)
  }
}

async function assertPrimaryMediaVisible(page, scenarioName) {
  const media = page.locator('[data-visual-smoke="home-primary-media"]')
  if ((await media.count()) === 0) {
    throw new Error(`${scenarioName}: missing [data-visual-smoke="home-primary-media"]`)
  }
  await media.first().waitFor({ state: 'visible', timeout: 7000 })
  const box = await media.first().boundingBox()
  if (!box || box.width < 220 || box.height < 220) {
    throw new Error(`${scenarioName}: primary media appears blank or collapsed (${JSON.stringify(box)})`)
  }
}

async function assertMobileMenuPlacement(page, scenarioName) {
  const toggle = page.getByRole('button', { name: /open navigation menu/i })
  await toggle.click()

  const panel = page.locator('[data-visual-smoke="mobile-nav-panel"]')
  await panel.waitFor({ state: 'visible', timeout: 5000 })
  await page.waitForTimeout(450)

  const geometry = await page.evaluate(() => {
    const nav = document.querySelector('[data-visual-smoke="navbar-root"]')
    const menu = document.querySelector('[data-visual-smoke="mobile-nav-panel"]')
    if (!nav || !menu) {
      return null
    }
    const navRect = nav.getBoundingClientRect()
    const menuRect = menu.getBoundingClientRect()
    return {
      navBottom: navRect.bottom,
      menuTop: menuRect.top,
      menuRight: menuRect.right,
      viewportWidth: window.innerWidth,
    }
  })

  if (!geometry) {
    throw new Error(`${scenarioName}: unable to measure mobile nav geometry`)
  }
  if (geometry.menuTop + 1 < geometry.navBottom) {
    throw new Error(`${scenarioName}: mobile nav overlaps navbar (menuTop=${geometry.menuTop}, navBottom=${geometry.navBottom})`)
  }
  if (geometry.menuRight - geometry.viewportWidth > 1) {
    throw new Error(`${scenarioName}: mobile nav extends past viewport by ${geometry.menuRight - geometry.viewportWidth}px`)
  }
}

async function run() {
  await ensureOutExists()
  const runDir = path.join(artifactRoot, nowStamp())
  await mkdir(runDir, { recursive: true })
  const { server, port } = await startStaticServer()
  const baseUrl = `http://127.0.0.1:${port}`
  const browser = await chromium.launch({ headless: true })

  let passed = 0
  const failures = []

  try {
    for (const scenario of scenarios) {
      const context = await browser.newContext({
        viewport: scenario.viewport,
        deviceScaleFactor: 1,
      })

      try {
        const page = await context.newPage()
        await page.goto(`${baseUrl}${scenario.route}`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(300)

        await assertNoHorizontalOverflow(page, scenario.name)

        if (scenario.checkPrimaryMedia) {
          await assertPrimaryMediaVisible(page, scenario.name)
        }

        if (scenario.checkMobileNav) {
          await assertMobileMenuPlacement(page, scenario.name)
          await assertNoHorizontalOverflow(page, `${scenario.name} (with menu open)`)
        }

        const screenshotFile = path.join(runDir, `${scenario.name}.png`)
        await page.screenshot({ path: screenshotFile, fullPage: true })
        passed += 1
        process.stdout.write(`PASS ${scenario.name}\n`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        failures.push(`${scenario.name}: ${message}`)
        process.stderr.write(`FAIL ${scenario.name}: ${message}\n`)
      } finally {
        await context.close()
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  process.stdout.write(`\nVisual smoke artifacts: ${runDir}\n`)
  process.stdout.write(`Scenarios passed: ${passed}/${scenarios.length}\n`)

  if (failures.length > 0) {
    process.stderr.write('\nVisual smoke failures:\n')
    for (const failure of failures) {
      process.stderr.write(`- ${failure}\n`)
    }
    process.exitCode = 1
    return
  }
}

run().catch((error) => {
  process.stderr.write(`Fatal visual smoke error: ${error instanceof Error ? error.message : String(error)}\n`)
  process.exit(1)
})
