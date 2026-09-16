import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import ts from 'typescript'

const realRequire = createRequire(import.meta.url)
const endpoint = 'https://script.google.com/macros/s/test-deployment/exec'
const files = ['app/components/GoogleSheetsLeadForm.tsx', 'app/components/SecurityPackForm.tsx', 'app/compliance/ChecklistLeadForm.tsx']

// Run the actual component submit handlers, replacing only environment boundaries.
function renderForm(file, responseFactory, configured = true) {
  const events = [], states = [], redirects = [], requests = []
  const contact = file.includes('GoogleSheets')
  const inputs = contact ? ['idle', {
    full_name: 'QA', email: 'qa@example.test', company_name: 'QA company', company_size: '1-10',
    compliance_requirement: 'Other', message: 'Synthetic test', referral_source: '',
    website_intent: 'demo', lead_source: 'website_demo_request', company_website: '',
  }, {}, {}] : ['idle', 'QA', 'qa@example.test', 'QA company', ...(file.includes('Checklist') ? ['Engineer'] : []), '']
  let stateIndex = 0
  const hooks = {
    ...realRequire('react'),
    useState: () => {
      const index = stateIndex++
      return [inputs[index], value => { if (index === 0) states.push(value) }]
    },
    useRef: value => ({ current: value }),
    useMemo: fn => fn(),
  }
  function load(path) {
    const compiledModule = { exports: {} }
    const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    })
    const require = name => {
      if (name === 'react') return hooks
      if (name === '../site') return { siteConfig: { salesEmail: 'sales@example.test', leadCapture: { googleSheetsEndpoint: configured ? endpoint : '' } } }
      if (name === '../lib/analytics') return { getLeadAttribution: () => ({}), trackAnalyticsEvent: event => events.push(event) }
      if (name === '../lib/referral') return { getReferralSnapshot: () => null, referralSnapshotToFieldMap: () => ({}) }
      if (name === '../lib/lead-response') return load('app/lib/lead-response.ts')
      return realRequire(name)
    }
    vm.runInNewContext(outputText, {
      module: compiledModule, exports: compiledModule.exports, require, URL,
      fetch: async (...args) => { requests.push(args); return responseFactory() },
      window: { location: { href: 'https://example.test/contact/', assign: value => redirects.push(value) } },
    }, { filename: path })
    return compiledModule.exports
  }
  const rendered = load(file).default({ intent: 'demo', leadSource: 'website_demo_request' })
  return { rendered, events, states, redirects, requests }
}

for (const file of files) {
  for (const [label, factory] of [
    ['negative acknowledgement', () => Response.json({ ok: false })],
    ['HTML error', () => new Response('<html>Error</html>')],
    ['network rejection', () => { throw new TypeError('Network error') }],
  ]) {
    test(`${file}: ${label} produces no conversion or success`, async () => {
      const flow = renderForm(file, factory)
      await flow.rendered.props.onSubmit({ preventDefault() {} })
      assert.equal(flow.requests.length, 1)
      assert.deepEqual(flow.redirects, [])
      assert.ok(!flow.states.includes('success'))
      assert.deepEqual(flow.events, ['form_error'])
    })
  }
  test(`${file}: explicit acceptance completes the normal flow`, async () => {
    const flow = renderForm(file, () => Response.json({ ok: true }))
    await flow.rendered.props.onSubmit({ preventDefault() {} })
    assert.equal(flow.requests.length, 1)
    assert.ok(flow.events.includes('lead_submitted'))
    assert.ok(flow.states.includes('success') || flow.redirects.includes('/contact/thanks/'))
  })
  test(`${file}: missing endpoint never reports a lead`, async () => {
    const flow = renderForm(file, () => { throw new Error('Must not fetch') }, false)
    if (flow.rendered.props.onSubmit) await flow.rendered.props.onSubmit({ preventDefault() {} })
    assert.equal(flow.requests.length, 0)
    assert.ok(!flow.events.includes('lead_submitted'))
    assert.ok(!flow.states.includes('success'))
    assert.deepEqual(flow.redirects, [])
  })
}
