import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

const source = readFileSync(new URL('../../app/lib/lead-response.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { requireLeadAcceptance } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const leadNotAcceptedError = { message: 'lead_not_accepted' }

test('explicit acknowledgement accepts a successfully stored lead', async () => {
  await requireLeadAcceptance(Response.json({ ok: true }))
})

for (const body of [{ ok: false }, {}, { ok: 'true' }, null, true, []]) {
  test(`HTTP 200 with ${JSON.stringify(body)} cannot confirm a lead`, async () => {
    await assert.rejects(requireLeadAcceptance(Response.json(body)), leadNotAcceptedError)
  })
}

test('Apps Script HTML error and empty responses cannot confirm a lead', async () => {
  await assert.rejects(requireLeadAcceptance(new Response('<html>Script error</html>')), leadNotAcceptedError)
  await assert.rejects(requireLeadAcceptance(new Response(null, { status: 204 })), leadNotAcceptedError)
})

test('failed HTTP status cannot confirm a lead even with a true body', async () => {
  await assert.rejects(requireLeadAcceptance(Response.json({ ok: true }, { status: 500 })), leadNotAcceptedError)
})

test('a lost response body is not interpreted as successful delivery', async () => {
  await assert.rejects(
    requireLeadAcceptance({ ok: true, json: async () => { throw new TypeError('Network error') } }),
    leadNotAcceptedError,
  )
})
