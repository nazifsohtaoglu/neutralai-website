#!/usr/bin/env node

import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { access, mkdir, realpath, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const outDir = path.join(rootDir, 'out')
const artifactRoot = path.join(rootDir, 'output', 'accessibility-smoke')

const desktopViewport = { width: 1366, height: 900 }
const mobileViewport = { width: 390, height: 844 }

const scenarios = [
  {
    name: 'home',
    route: '/',
    contrast: [],
  },
  {
    name: 'developers',
    route: '/developers/',
    contrast: [],
  },
  {
    name: 'contact',
    route: '/contact/',
    contrast: [
      { selector: 'p:has(> a[href^="mailto:sales@neutralai.co.uk?subject=NeutralAI%20commercial%20enquiry"])', minRatio: 4.5, label: 'contact secondary copy contrast' },
    ],
  },
  {
    name: 'trust-center',
    route: '/trust-center/',
    contrast: [],
  },
  {
    name: 'playground',
    route: '/playground/',
    contrast: [
      { selector: 'a[href="#playground-demo"]', minRatio: 4.5, label: 'playground hero CTA contrast' },
      { selector: '#playground-demo span.font-body.text-sm.leading-6.text-slate-400', minRatio: 4.5, label: 'playground helper panel contrast', all: true },
      { selector: '#playground-demo div.mt-4 div.text-sm.text-slate-400 > span', minRatio: 4.5, label: 'playground character counter contrast' },
    ],
  },
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
  try {
    await access(path.join(outDir, 'index.html'))
  } catch {
    throw new Error('Missing out/index.html. Run `npm run build` before accessibility smoke checks.')
  }
}

export async function resolveStaticFileFromRoot(staticRoot, urlPathname) {
  const resolvedRoot = path.resolve(staticRoot)
  const realRoot = await realpath(staticRoot).catch(() => resolvedRoot)
  let normalizedPath

  try {
    if (!urlPathname.startsWith('/') || urlPathname.startsWith('//')) {
      return null
    }

    const pathname = new URL(urlPathname, 'http://localhost').pathname
    normalizedPath = decodeURIComponent(pathname).replace(/^\/+/, '')
  } catch {
    return null
  }

  const candidate = path.join(staticRoot, normalizedPath)

  const candidatePaths = []
  if (normalizedPath === '') {
    candidatePaths.push(path.join(staticRoot, 'index.html'))
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
      const fileStat = await stat(maybePath)
      if (fileStat.isFile()) {
        const realCandidatePath = await realpath(maybePath)
        const relativePath = path.relative(realRoot, realCandidatePath)
        if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
          continue
        }

        return realCandidatePath
      }
    } catch {
      // Try next candidate.
    }
  }

  return null
}

async function resolveStaticFile(urlPathname) {
  return resolveStaticFileFromRoot(outDir, urlPathname)
}

async function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.statusCode = 405
        res.setHeader('Allow', 'GET, HEAD')
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('Method Not Allowed')
        return
      }

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
      if (req.method === 'HEAD') {
        res.end()
        return
      }
      createReadStream(filePath).pipe(res)
    } catch {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('Internal Server Error')
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

async function assertLandmarksAndHeadings(page, scenarioName) {
  const result = await page.evaluate(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    const headingLevels = headingElements.map((heading) => Number(heading.tagName[1]))

    const headingSkips = []
    for (let i = 1; i < headingLevels.length; i += 1) {
      if (headingLevels[i] - headingLevels[i - 1] > 1) {
        headingSkips.push(`${headingElements[i - 1].tagName}->${headingElements[i].tagName}`)
      }
    }

    return {
      mainCount: document.querySelectorAll('main').length,
      navCount: document.querySelectorAll('nav').length,
      footerCount: document.querySelectorAll('footer').length,
      h1Count: document.querySelectorAll('h1').length,
      headingSkips,
    }
  })

  if (result.mainCount !== 1) {
    throw new Error(`${scenarioName}: expected exactly one <main>, found ${result.mainCount}`)
  }

  if (result.navCount < 1) {
    throw new Error(`${scenarioName}: expected at least one <nav>`)
  }

  if (result.footerCount < 1) {
    throw new Error(`${scenarioName}: expected at least one <footer>`)
  }

  if (result.h1Count < 1) {
    throw new Error(`${scenarioName}: expected at least one <h1>`)
  }

  if (result.headingSkips.length > 0) {
    throw new Error(`${scenarioName}: heading level jumps detected (${result.headingSkips.join(', ')})`)
  }
}

async function assertNamedInteractiveControls(page, scenarioName) {
  const unnamed = await page.evaluate(() => {
    function visible(element) {
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false
      }
      return element.getClientRects().length > 0
    }

    function textFromLabelledBy(element) {
      const labelledBy = element.getAttribute('aria-labelledby')
      if (!labelledBy) {
        return ''
      }

      return labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent || '')
        .join(' ')
        .trim()
    }

    const elements = Array.from(document.querySelectorAll('a, button, [role="link"], [role="button"]'))
    return elements
      .filter((element) => element instanceof HTMLElement && visible(element))
      .map((element) => {
        const ariaLabel = element.getAttribute('aria-label')?.trim() || ''
        const labelledBy = textFromLabelledBy(element)
        const text = (element.textContent || '').trim().replace(/\s+/g, ' ')
        const title = element.getAttribute('title')?.trim() || ''
        const value = element instanceof HTMLInputElement ? (element.value || '').trim() : ''
        const name = ariaLabel || labelledBy || text || title || value
        return { tag: element.tagName, name }
      })
      .filter((entry) => entry.name.length === 0)
      .slice(0, 5)
  })

  if (unnamed.length > 0) {
    const sample = unnamed.map((entry) => entry.tag).join(', ')
    throw new Error(`${scenarioName}: unnamed interactive controls detected (${sample})`)
  }
}

async function assertContrast(page, check, scenarioName) {
  const results = await page.evaluate(({ selector, minRatio, all }) => {
    function parseColor(input) {
      const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i)
      if (!match) {
        return null
      }

      return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
        a: match[4] === undefined ? 1 : Number(match[4]),
      }
    }

    function srgbToLinear(channel) {
      const value = channel / 255
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    }

    function luminance(color) {
      return 0.2126 * srgbToLinear(color.r) + 0.7152 * srgbToLinear(color.g) + 0.0722 * srgbToLinear(color.b)
    }

    function contrastRatio(foreground, background) {
      const fg = luminance(foreground)
      const bg = luminance(background)
      const lighter = Math.max(fg, bg)
      const darker = Math.min(fg, bg)
      return (lighter + 0.05) / (darker + 0.05)
    }

    function isTransparent(color) {
      return color.a === 0
    }

    function visible(element) {
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false
      }
      return element.getClientRects().length > 0
    }

    function findBackground(element) {
      let current = element
      while (current) {
        const background = parseColor(getComputedStyle(current).backgroundColor)
        if (background && !isTransparent(background)) {
          return background
        }
        current = current.parentElement
      }
      return { r: 3, g: 7, b: 18, a: 1 }
    }

    const elements = Array.from(document.querySelectorAll(selector))
    const measured = []

    for (const element of elements) {
      if (!(element instanceof HTMLElement) || !visible(element)) {
        continue
      }

      const foreground = parseColor(getComputedStyle(element).color)
      const background = findBackground(element)
      if (!foreground || !background) {
        continue
      }

      const ratio = contrastRatio(foreground, background)
      measured.push({ ratio, text: (element.textContent || '').trim().slice(0, 90) })
      if (!all) {
        break
      }
    }

    const failing = measured.filter((entry) => entry.ratio < minRatio)
    return { measured, failing }
  }, check)

  if (results.measured.length === 0) {
    throw new Error(`${scenarioName}: no visible targets for contrast selector ${check.selector}`)
  }

  if (results.failing.length > 0) {
    const detail = results.failing.map((entry) => `${entry.ratio.toFixed(2)} "${entry.text}"`).join('; ')
    throw new Error(`${scenarioName}: ${check.label} below contrast threshold (${detail})`)
  }
}

async function runScenario(context, baseUrl, scenario) {
  const page = await context.newPage()
  const response = await page.goto(`${baseUrl}${scenario.route}`, { waitUntil: 'networkidle' })

  if (!response || !response.ok()) {
    throw new Error(`${scenario.name}: expected 2xx/3xx response but got ${response?.status() ?? 'no response'}`)
  }

  await assertLandmarksAndHeadings(page, scenario.name)
  await assertNamedInteractiveControls(page, scenario.name)

  for (const check of scenario.contrast) {
    await assertContrast(page, check, scenario.name)
  }
}

async function expectFocusedRole(page, tagName, message) {
  const focusedTag = await page.evaluate(() => document.activeElement?.tagName || '')
  if (focusedTag.toUpperCase() !== tagName.toUpperCase()) {
    throw new Error(`${message}. Found: ${focusedTag || 'none'}`)
  }
}

async function readFocusedElement(page) {
  return page.evaluate(() => {
    const active = document.activeElement
    if (!active) {
      return { tag: '', name: '' }
    }

    const ariaLabel = active.getAttribute?.('aria-label')?.trim() || ''
    const text = (active.textContent || '').trim().replace(/\s+/g, ' ')
    return { tag: active.tagName, name: ariaLabel || text }
  })
}

async function expectFocusedLinkWithName(page, expectedName, message) {
  const focused = await readFocusedElement(page)
  if (focused.tag.toUpperCase() !== 'A') {
    throw new Error(`${message}. Found focused tag: ${focused.tag || 'none'}`)
  }

  if (!expectedName.test(focused.name)) {
    throw new Error(`${message}. Found focused link name: "${focused.name || 'unknown'}"`)
  }
}

async function tabUntilFocusedLink(page, expectedName, maxTabs, message) {
  for (let i = 0; i < maxTabs; i += 1) {
    await page.keyboard.press('Tab')
    const focused = await readFocusedElement(page)
    if (focused.tag.toUpperCase() === 'A' && expectedName.test(focused.name)) {
      return
    }
  }

  const focused = await readFocusedElement(page)
  throw new Error(`${message}. Found: ${focused.tag || 'none'} "${focused.name || ''}"`)
}

async function assertConsentBanner(page) {
  await page.getByRole('button', { name: /decline/i }).first().waitFor({ state: 'visible', timeout: 5000 })
  await page.getByRole('button', { name: /accept/i }).first().waitFor({ state: 'visible', timeout: 5000 })
}

async function assertFocusIndicator(page, selector, label) {
  const status = await page.evaluate((inputSelector) => {
    const element = document.querySelector(inputSelector)
    if (!(element instanceof HTMLElement)) {
      return { exists: false, visible: false, highlighted: false }
    }

    element.focus()
    const style = getComputedStyle(element)
    const outlineWidth = Number.parseFloat(style.outlineWidth || '0')
    const hasOutline = style.outlineStyle !== 'none' && outlineWidth > 0
    const hasShadow = style.boxShadow && style.boxShadow !== 'none'
    const visible = element.getClientRects().length > 0

    return { exists: true, visible, highlighted: hasOutline || hasShadow }
  }, selector)

  if (!status.exists) {
    throw new Error(`focus indicator: missing target ${label}`)
  }

  if (!status.visible) {
    throw new Error(`focus indicator: target not visible ${label}`)
  }

  if (!status.highlighted) {
    throw new Error(`focus indicator: no visible focus style on ${label}`)
  }
}

async function assertDesktopKeyboardAndFocus(context, baseUrl) {
  const page = await context.newPage()
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })

  await assertConsentBanner(page)

  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expectFocusedRole(page, 'A', 'desktop keyboard: expected focus to reach interactive controls')

  const useCasesButton = page.getByRole('button', { name: /^use cases$/i }).first()
  await useCasesButton.focus()
  await expectFocusedRole(page, 'BUTTON', 'desktop keyboard: expected Use Cases dropdown trigger to be focusable')
  await page.getByRole('link', { name: /^all use cases$/i }).first().waitFor({ state: 'visible', timeout: 5000 })
  await tabUntilFocusedLink(page, /^all use cases$/i, 4, 'desktop keyboard: expected Use Cases dropdown link to be keyboard reachable')

  const moreButton = page.getByRole('button', { name: /^more$/i }).first()
  await moreButton.focus()
  await expectFocusedRole(page, 'BUTTON', 'desktop keyboard: expected More dropdown trigger to be focusable')
  await page.getByRole('link', { name: /^blog$/i }).first().waitFor({ state: 'visible', timeout: 5000 })
  await tabUntilFocusedLink(page, /^blog$/i, 4, 'desktop keyboard: expected More dropdown link to be keyboard reachable')

  await assertFocusIndicator(page, 'a[href="/#problem"]', 'desktop primary nav link')
  await assertFocusIndicator(page, 'button[aria-haspopup="true"]', 'desktop dropdown trigger')
  await assertFocusIndicator(page, 'a[href^="/use-cases"]', 'desktop dropdown link')
}

async function assertMobileKeyboardAndFocus(context, baseUrl) {
  const page = await context.newPage()
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })

  await assertConsentBanner(page)

  const menuButton = page.getByRole('button', { name: /open navigation menu/i })
  await menuButton.focus()
  await expectFocusedRole(page, 'BUTTON', 'mobile keyboard: expected menu button to be focusable')
  await page.keyboard.press('Enter')

  const panel = page.locator('[data-visual-smoke="mobile-nav-panel"]')
  await panel.waitFor({ state: 'visible', timeout: 5000 })

  await page.keyboard.press('Tab')
  await expectFocusedLinkWithName(page, /^problem$/i, 'mobile keyboard: expected first menu item to be keyboard reachable')
  await tabUntilFocusedLink(page, /^blog$/i, 12, 'mobile keyboard: expected grouped More links to be keyboard reachable')
  await tabUntilFocusedLink(page, /^all use cases$/i, 12, 'mobile keyboard: expected grouped Use Cases links to be keyboard reachable')
  await tabUntilFocusedLink(page, /^get started free$/i, 20, 'mobile keyboard: expected mobile CTA to be keyboard reachable')

  await assertFocusIndicator(page, 'button[aria-label*="navigation menu"]', 'mobile menu button')
}

async function run() {
  await ensureOutExists()

  const runDir = path.join(artifactRoot, nowStamp())
  await mkdir(runDir, { recursive: true })

  const { server, port } = await startStaticServer()
  const baseUrl = `http://127.0.0.1:${port}`
  const browser = await chromium.launch({ headless: true })

  const report = {
    runDir,
    startedAt: new Date().toISOString(),
    scenarios: [],
    checks: [],
    failures: [],
  }

  try {
    for (const scenario of scenarios) {
      const context = await browser.newContext({ viewport: desktopViewport, deviceScaleFactor: 1 })
      try {
        await runScenario(context, baseUrl, scenario)
        report.scenarios.push({ name: scenario.name, route: scenario.route, status: 'pass' })
        process.stdout.write(`PASS route ${scenario.name}\n`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        report.scenarios.push({ name: scenario.name, route: scenario.route, status: 'fail', message })
        report.failures.push(message)
        process.stderr.write(`FAIL route ${scenario.name}: ${message}\n`)
      } finally {
        await context.close()
      }
    }

    const desktopContext = await browser.newContext({ viewport: desktopViewport, deviceScaleFactor: 1 })
    try {
      await assertDesktopKeyboardAndFocus(desktopContext, baseUrl)
      report.checks.push({ name: 'desktop-keyboard-and-focus', status: 'pass' })
      process.stdout.write('PASS keyboard desktop\n')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      report.failures.push(message)
      report.checks.push({ name: 'desktop-keyboard-and-focus', status: 'fail', message })
      process.stderr.write(`FAIL keyboard desktop: ${message}\n`)
    } finally {
      await desktopContext.close()
    }

    const mobileContext = await browser.newContext({ viewport: mobileViewport, deviceScaleFactor: 1 })
    try {
      await assertMobileKeyboardAndFocus(mobileContext, baseUrl)
      report.checks.push({ name: 'mobile-keyboard-and-focus', status: 'pass' })
      process.stdout.write('PASS keyboard mobile\n')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      report.failures.push(message)
      report.checks.push({ name: 'mobile-keyboard-and-focus', status: 'fail', message })
      process.stderr.write(`FAIL keyboard mobile: ${message}\n`)
    } finally {
      await mobileContext.close()
    }
  } finally {
    await browser.close()
    server.close()
    report.finishedAt = new Date().toISOString()
    await writeFile(path.join(runDir, 'report.json'), JSON.stringify(report, null, 2), 'utf8')
  }

  process.stdout.write(`\nAccessibility smoke artifacts: ${runDir}\n`)

  if (report.failures.length > 0) {
    process.stderr.write('\nAccessibility smoke failures:\n')
    for (const failure of report.failures) {
      process.stderr.write(`- ${failure}\n`)
    }
    process.exitCode = 1
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  run().catch((error) => {
    process.stderr.write(`Fatal accessibility smoke error: ${error instanceof Error ? error.message : String(error)}\n`)
    process.exit(1)
  })
}
