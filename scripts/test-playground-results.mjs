// Browser regression checks against the static build, with no real API calls.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const out = path.resolve('out')
const browser = await chromium.launch({ headless: true })
const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
let passed = 0
async function scenario(name, response, run) {
  const context = await browser.newContext()
  let apiCalls = 0
  await context.route('**/*', async route => {
    const url = new URL(route.request().url())
    if (url.hostname === 'api.neutralai.co.uk') {
      apiCalls++
      await response(route)
      return
    }
    if (url.hostname !== 'neutralai.test') { await route.abort(); return }
    const file = path.resolve(out, '.' + decodeURIComponent(url.pathname) + (url.pathname.endsWith('/') ? 'index.html' : ''))
    if (!file.startsWith(out + path.sep)) { await route.abort(); return }
    try { await route.fulfill({ body: await readFile(file), contentType: types[path.extname(file)] ?? 'application/octet-stream' }) }
    catch { await route.fulfill({ status: 404, body: '' }) }
  })
  try {
    const page = await context.newPage()
    await page.goto('http://neutralai.test/playground/')
    await page.getByRole('textbox', { name: 'Raw prompt' }).waitFor()
    await run(page, () => apiCalls)
    console.log(`PASS ${name}`)
    passed++
  } finally { await context.close() }
}
const json = body => route => route.fulfill({ json: body })
async function submit(page) {
  await page.getByRole('textbox', { name: 'Raw prompt' }).fill('Contact Example Person at example@fictional.example about a fictional case.')
  await page.getByRole('button', { name: 'Mask prompt', exact: true }).click()
}
try {
  await scenario('sample stays local and has no invented confidence percentages', json({}), async (page, calls) => {
    await page.getByRole('button', { name: 'Finance review', exact: true }).click()
    await page.getByRole('button', { name: 'Mask prompt', exact: true }).click()
    await page.getByRole('status').filter({ hasText: 'Sample preview ready' }).waitFor()
    assert.equal(calls(), 0)
    assert.doesNotMatch(await page.locator('main').innerText(), /\b(?:99|96|94|93|90|87|86)%/)
  })
  await scenario('live output never borrows local findings', json({ masked_text: 'SERVER_RESULT' }), async (page, calls) => {
    await submit(page)
    await page.getByRole('status').filter({ hasText: 'Masked by live API' }).waitFor()
    assert.equal(calls(), 1)
    assert.ok(await page.getByText('SERVER_RESULT', { exact: true }).isVisible())
    assert.ok(await page.getByText('Details unavailable', { exact: true }).isVisible())
    assert.equal(await page.getByText(/preview matches$/).count(), 0)
  })
  for (const [name, reply] of [['HTTP failure', route => route.fulfill({ status: 503, body: '' })], ['malformed response', json({ masked_text: 42 })], ['missing result', json({})]]) {
    await scenario(name + ' is explicitly a local fallback', reply, async page => {
      await submit(page)
      await page.getByRole('status').filter({ hasText: 'Live service unavailable' }).waitFor()
      assert.equal(await page.getByText('Live API', { exact: true }).count(), 0)
    })
  }
  await scenario('empty API text remains a live result', json({ masked_text: '' }), async page => {
    await submit(page)
    await page.getByRole('status').filter({ hasText: 'Masked by live API' }).waitFor()
    assert.ok(await page.getByText('Details unavailable', { exact: true }).isVisible())
  })
  let release
  let markReceived
  const received = new Promise(resolve => { markReceived = resolve })
  const pending = new Promise(resolve => { release = resolve })
  await scenario('editing input discards an in-flight response', async route => { markReceived(); await pending; await route.fulfill({ json: { masked_text: 'STALE_RESULT' } }) }, async (page, calls) => {
    await submit(page)
    await received
    await page.getByRole('textbox', { name: 'Raw prompt' }).fill('Changed fictional input')
    const responseReceived = page.waitForResponse(response => response.url().includes('/v1/shield/mask'))
    release()
    const response = await responseReceived
    await response.finished()
    // Let the fetch continuation and React render finish after network delivery.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    assert.equal(calls(), 1)
    assert.equal(await page.getByText('STALE_RESULT', { exact: true }).count(), 0)
    assert.equal(await page.getByRole('status').innerText(), 'Ready to mask')
  })
  console.log(`${passed} browser regression checks passed`)
} finally { await browser.close() }
