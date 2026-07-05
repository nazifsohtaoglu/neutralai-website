import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

function readJson(path) {
  return JSON.parse(readSource(path))
}

async function loadMiddleware() {
  const source = readSource('functions/_middleware.js')
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`

  return import(moduleUrl)
}

function createContext(path, accept = 'text/markdown') {
  let nextCalls = 0

  return {
    get nextCalls() {
      return nextCalls
    },
    request: new Request(`https://neutralai.co.uk${path}`, {
      headers: {
        Accept: accept,
      },
    }),
    next() {
      nextCalls += 1
      return new Response('next')
    },
  }
}

test('site-wide headers advertise agent discovery resources', () => {
  const headers = readSource('public/_headers')

  assert.match(headers, /Link: <\/llms\.txt>; rel="alternate"; type="text\/plain"/)
  assert.match(headers, /Link: <\/\.well-known\/api-catalog>; rel="api-catalog"; type="application\/linkset\+json"/)
  assert.match(headers, /Link: <\/\.well-known\/agent-skills\/index\.json>; rel="service-desc"; type="application\/json"/)
  assert.match(headers, /Link: <\/\.well-known\/auth\.md>; rel="help"; type="text\/markdown"/)
  assert.match(headers, /Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference/)
})

test('robots file exposes content signals for crawler policy discovery', () => {
  const robots = readSource('public/robots.txt')

  assert.match(robots, /User-agent: \*/)
  assert.match(robots, /Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference/)
  assert.match(robots, /Allow: \//)
  assert.match(robots, /Sitemap: https:\/\/neutralai\.co\.uk\/sitemap\.xml/)
})

test('markdown negotiation fallback serves only explicit agent markdown requests', () => {
  const middleware = readSource('functions/_middleware.js')

  assert.match(middleware, /Accept/)
  assert.match(middleware, /text\/markdown/)
  assert.match(middleware, /Cache-Control': 'no-store'/)
  assert.match(middleware, /Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"/)
  assert.match(middleware, /Content-Type': 'text\/markdown; charset=utf-8'/)
  assert.match(middleware, /Permissions-Policy/)
  assert.match(middleware, /Referrer-Policy/)
  assert.match(middleware, /Strict-Transport-Security/)
  assert.match(middleware, /Vary: 'Accept'/)
  assert.match(middleware, /X-Content-Type-Options/)
  assert.match(middleware, /X-Frame-Options/)
  assert.match(middleware, /Content-Signal': CONTENT_SIGNAL/)
  assert.match(middleware, /context\.next\(\)/)
  assert.doesNotMatch(middleware, /static\.cloudflareinsights\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|us\.i\.posthog\.com|eu\.i\.posthog\.com|script\.google\.com|script\.googleusercontent\.com/)
  assert.doesNotMatch(middleware, /mcp\/server-card|webmcp|a2a|x402|oauth-authorization-server/i)
})

test('markdown negotiation fallback only handles the homepage when markdown is acceptable', async () => {
  const { onRequest } = await loadMiddleware()
  const homepageContext = createContext('/')
  const homepageResponse = await onRequest(homepageContext)

  assert.equal(homepageContext.nextCalls, 0)
  assert.equal(homepageResponse.headers.get('Cache-Control'), 'no-store')
  assert.equal(homepageResponse.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(
    homepageResponse.headers.get('Content-Security-Policy'),
    "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
  )
  assert.equal(homepageResponse.headers.get('Vary'), 'Accept')
  assert.equal(homepageResponse.headers.get('X-Content-Type-Options'), 'nosniff')
  assert.match(await homepageResponse.text(), /^# NeutralAI/)

  const pricingContext = createContext('/pricing/')
  const pricingResponse = await onRequest(pricingContext)

  assert.equal(pricingContext.nextCalls, 1)
  assert.equal(await pricingResponse.text(), 'next')

  const rejectedMarkdownContext = createContext('/', 'text/html, text/markdown;q=0')
  const rejectedMarkdownResponse = await onRequest(rejectedMarkdownContext)

  assert.equal(rejectedMarkdownContext.nextCalls, 1)
  assert.equal(await rejectedMarkdownResponse.text(), 'next')
})

test('api catalog is a linkset with public API and website discovery links', () => {
  const catalog = readJson('public/.well-known/api-catalog')

  assert.ok(Array.isArray(catalog.linkset))
  assert.equal(catalog.linkset[0].anchor, 'https://api.neutralai.co.uk')
  assert.match(JSON.stringify(catalog), /https:\/\/neutralai\.co\.uk\/developers/)
  assert.match(JSON.stringify(catalog), /https:\/\/api\.neutralai\.co\.uk\/health/)
  assert.match(JSON.stringify(catalog), /https:\/\/neutralai\.co\.uk\/\.well-known\/auth\.md/)
  assert.doesNotMatch(JSON.stringify(catalog), /https:\/\/api\.neutralai\.co\.uk\/ready/)
  assert.doesNotMatch(JSON.stringify(catalog), /https:\/\/api\.neutralai\.co\.uk\/docs/)
})

test('agent skills index points agents to truthful public content resources', () => {
  const index = readJson('public/.well-known/agent-skills/index.json')

  assert.equal(index.publisher.name, 'NeutralAI')
  assert.equal(index.version, '0.2.0')
  assert.equal(index.skills[0].id, 'neutralai-public-content')
  assert.match(index.skills[0].url, /\/\.well-known\/agent-skills\/neutralai-public-content\/SKILL\.md$/)
  assert.ok(index.resources.some((resource) => resource.id === 'llms'))
  assert.ok(index.resources.some((resource) => resource.id === 'sitemap'))
  assert.ok(index.resources.some((resource) => resource.id === 'api-catalog'))
})

test('agent auth document does not claim unsupported OAuth provider behavior', () => {
  const auth = readSource('public/.well-known/auth.md')

  assert.match(auth, /NeutralAI public website content is available without authentication/)
  assert.match(auth, /x-api-key: nai_live_your_key/)
  assert.match(auth, /does not publish this marketing website as an OAuth or OIDC provider/)
  assert.doesNotMatch(auth, /api\.neutralai\.co\.uk\/docs/)
})

test('agent discovery avoids unsupported protocol and operational metadata claims', () => {
  const discoveryFiles = [
    readSource('functions/_middleware.js'),
    readSource('public/.well-known/api-catalog'),
    readSource('public/.well-known/auth.md'),
    readSource('public/.well-known/agent-skills/index.json'),
    readSource('public/.well-known/agent-skills/neutralai-public-content/SKILL.md'),
    readSource('public/llms.txt'),
  ].join('\n')

  assert.doesNotMatch(discoveryFiles, /api\.neutralai\.co\.uk\/ready/)
  assert.doesNotMatch(discoveryFiles, /api\.neutralai\.co\.uk\/docs/)
  assert.doesNotMatch(discoveryFiles, /mcp\/server-card|webmcp|a2a|x402|oauth-authorization-server/i)
})

test('ticket workflow requires an independent red-team review before PR', () => {
  const ticketWorkflow = readSource('docs/ai/TICKET_WORKFLOW.md')
  const prRules = readSource('docs/ai/PR_RULES.md')
  const redTeamPrompt = readSource('.codex/workflows/post-ticket-red-team-check.md')

  assert.match(ticketWorkflow, /independent red-team review/)
  assert.match(ticketWorkflow, /\.codex\/workflows\/post-ticket-red-team-check\.md/)
  assert.match(prRules, /Run an independent red-team review/)
  assert.match(redTeamPrompt, /Think adversarially/)
  assert.match(redTeamPrompt, /Public claim overstatement/)
})

test('agent readiness runbook keeps draft DNS-AID guidance limited to owned public discovery', () => {
  const runbook = readSource('docs/agent-readiness-runbook.md')

  assert.match(runbook, /_index\._agents\.neutralai\.co\.uk/)
  assert.match(runbook, /SVCB 1 neutralai\.co\.uk\. alpn="h2"/)
  assert.match(runbook, /TYPE64/)
  assert.match(runbook, /content_converter/)
  assert.match(runbook, /Do not publish claims for MCP, WebMCP, A2A, OAuth, OIDC, or commerce protocols/)
})
