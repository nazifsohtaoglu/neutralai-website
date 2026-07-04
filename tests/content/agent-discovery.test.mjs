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

test('site-wide headers advertise agent discovery resources', () => {
  const headers = readSource('public/_headers')

  assert.match(headers, /Link: <\/llms\.txt>; rel="alternate"; type="text\/plain"/)
  assert.match(headers, /Link: <\/\.well-known\/api-catalog>; rel="api-catalog"; type="application\/linkset\+json"/)
  assert.match(headers, /Link: <\/\.well-known\/agent-skills\/index\.json>; rel="service-desc"; type="application\/json"/)
  assert.match(headers, /Link: <\/\.well-known\/auth\.md>; rel="help"; type="text\/markdown"/)
  assert.match(headers, /Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference/)
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
