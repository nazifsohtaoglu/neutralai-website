import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const require = createRequire(import.meta.url)
// Execute the production selector and actual plan data, including local imports.
function loadTypeScript(relativePath) {
  const filename = path.resolve(relativePath)
  const source = readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } })
  const compiled = { exports: {} }
  vm.runInNewContext(outputText, {
    module: compiled, exports: compiled.exports, process: { env: {} },
    require: (name) => name.startsWith('.') ? loadTypeScript(path.resolve(path.dirname(filename), `${name}.ts`)) : require(name),
  }, { filename })
  return compiled.exports
}

const { recommendPlan, isValidPeople } = loadTypeScript('app/lib/plan-finder.ts')
const { pricingPlans, pricingFaqs } = loadTypeScript('app/data/homepage.ts')
const choose = (workflow, people, controls = 'personal') => recommendPlan({ workflow, people, controls }, pricingPlans)

test('individual workflows distinguish evaluation, hosted app and API-only access', () => {
  assert.equal(choose('evaluate', 1).name, 'Free')
  assert.equal(choose('workspace', 1).name, 'Starter')
  assert.equal(choose('api', 1).name, 'Developer')
  assert.equal(choose('workspace', 1).monthlyTotal, 29)
  assert.equal(choose('api', 1).monthlyTotal, 9)
})

test('workspace seats include extra charges and respect self-serve boundaries', () => {
  for (const [people, name, monthlyTotal, extraUsers] of [
    [2, 'Team', 99, 0], [5, 'Team', 99, 0], [6, 'Team', 114, 1], [15, 'Team', 249, 10],
    [16, 'Business', 299, 0], [20, 'Business', 299, 0], [21, 'Business', 311, 1],
    [50, 'Business', 659, 30], [51, 'Enterprise', null, 0],
  ]) {
    const result = choose('workspace', people)
    assert.equal(result.name, name, `${people} people`)
    assert.equal(result.monthlyTotal, monthlyTotal, `${people} people total`)
    assert.equal(result.extraUsers, extraUsers, `${people} extra users`)
  }
})

test('required controls override cheap evaluation/API suggestions', () => {
  for (const workflow of ['evaluate', 'workspace', 'api']) {
    assert.equal(choose(workflow, 1, 'shared').name, 'Team')
    assert.equal(choose(workflow, 1, 'governed').name, 'Business')
    assert.equal(choose(workflow, 1, 'enterprise').name, 'Enterprise')
    assert.equal(choose(workflow, 51, 'personal').name, 'Enterprise')
  }
})

test('invalid member counts do not produce a recommendation', () => {
  for (const people of [0, -1, 1.5, NaN, Infinity, 10001]) {
    assert.equal(isValidPeople(people), false)
    assert.equal(choose('workspace', people), null)
  }
})

test('calculations use current card prices, seat rates and caps', () => {
  const changed = pricingPlans.map((plan) => plan.name === 'Team' ? {
    ...plan, monthlyPrice: '£120', extraUserMonthlyGbp: 20, selfServeUserCap: 10,
  } : plan)
  const result = recommendPlan({ workflow: 'workspace', people: 6, controls: 'shared' }, changed)
  assert.equal(result.monthlyTotal, 140)
  assert.equal(recommendPlan({ workflow: 'workspace', people: 11, controls: 'shared' }, changed).name, 'Business')
  assert.equal(recommendPlan({ workflow: 'workspace', people: 1, controls: 'personal' }, []), null)
})

test('all recommendations resolve to existing checkout or sales handoffs', () => {
  for (const [workflow, people, controls] of [
    ['evaluate', 1, 'personal'], ['api', 1, 'personal'], ['workspace', 1, 'personal'],
    ['workspace', 6, 'shared'], ['workspace', 21, 'governed'], ['workspace', 51, 'enterprise'],
  ]) {
    const result = choose(workflow, people, controls)
    const plan = pricingPlans.find(({ name }) => name === result.name)
    const url = new URL(plan.href, 'https://www.neutralai.co.uk')
    if (result.name === 'Enterprise') assert.equal(url.searchParams.get('intent'), 'enterprise')
    else {
      assert.equal(url.hostname, 'app.neutralai.co.uk')
      assert.equal(url.searchParams.get('plan'), result.name.toLowerCase())
    }
  }
})

test('usage copy does not promise one document per request or a fixed number of AI messages', () => {
  const masking = pricingFaqs.find(({ question }) => question === 'What counts as a masking request?').answer
  assert.match(masking, /equivalents calculated from a token allowance/)
  assert.match(masking, /longer text can use it up in fewer submissions/)
  assert.match(masking, /not a guaranteed number of documents/)
  assert.doesNotMatch(masking, /Document uploads are counted per submission/)
  const ai = pricingFaqs.find(({ question }) => question === 'Is AI credit the same as masking allowance?').answer
  assert.match(ai, /does not buy a fixed number of messages/)
})
