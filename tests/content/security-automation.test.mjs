import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('security pre-review automation script exists and is executable', () => {
  const scriptPath = join(root, 'scripts/codex-security-pre-review.sh')
  const mode = statSync(scriptPath).mode

  assert.ok((mode & 0o100) !== 0, 'scripts/codex-security-pre-review.sh should be executable')
})

test('security pre-review script includes high-model guard and untracked diff coverage', () => {
  const source = readSource('scripts/codex-security-pre-review.sh')

  assert.match(source, /MODEL_HIGH="\$\{CODEX_MODEL_HIGH:-gpt-5\.5\}"/)
  assert.match(source, /MODEL_REASONING_HIGH="\$\{CODEX_MODEL_REASONING_HIGH:-high\}"/)
  assert.match(source, /git add -N --all/)
  assert.match(source, /git diff --no-color origin\/main/)
  assert.match(source, /post-ticket-security-check\.md/)
  assert.match(source, /Mandatory HIGH security pre-review/)
})

test('workflow and docs require security pre-review before PR review', () => {
  const workflow = readSource('.codex/workflows/post-ticket-security-check.md')
  const agents = readSource('AGENTS.md')
  const testing = readSource('docs/ai/TESTING_AND_COMMANDS.md')
  const prRules = readSource('docs/ai/PR_RULES.md')
  const ticketWorkflow = readSource('docs/ai/TICKET_WORKFLOW.md')
  const nextTicket = readSource('scripts/codex-next-ticket.sh')

  assert.match(workflow, /NeutralAI Website Post-Ticket Security Check/)
  assert.match(agents, /scripts\/codex-security-pre-review\.sh/)
  assert.match(testing, /Pre-review security gate/)
  assert.match(prRules, /codex-security-pre-review\.sh/)
  assert.match(ticketWorkflow, /security-pre-review\.sh/)
  assert.match(nextTicket, /NEXT_TICKET_PRE_REVIEW_SECURITY/)
})
