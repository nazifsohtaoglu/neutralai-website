# AGENTS.md

Short repository guide for Codex. Longer working context lives under `docs/ai/`.

## Read First on Every Task

1. `docs/ai/PROJECT_MAP.md`
2. If the task is risky, `docs/ai/RISK_REGISTER.md`
3. If flows or integrations matter, `docs/ai/FLOWS.md`
4. For test selection, `docs/ai/TESTING_AND_COMMANDS.md`
5. For ticket handling, `docs/ai/TICKET_WORKFLOW.md`
6. For PR rules, `docs/ai/PR_RULES.md`
7. For unresolved context, `docs/ai/OPEN_QUESTIONS.md`

## Repository Rules

- Before changing production code, read the existing local pattern for the relevant area.
- Do not write secret, token, private key, credential, webhook secret, or client secret values into docs, tests, logs, or PR text.
- If you make an assumption, label it explicitly with `Assumption:`.
- Add unknown or unclear points to `docs/ai/OPEN_QUESTIONS.md`.
- Do not revert unrelated user changes.
- Keep changes small and focused.
- If a public claim, metric, benchmark, pricing point, UI element, or copy choice seems weak, confusing, risky, or unlikely to add value, say so proactively before or while implementing it. Do not wait for the user to challenge it.
- For blog visuals, do not default to generic diagrams, stock-like screenshots, or literal decorative images. First define the article's visual story and art-direction prompt, then generate or source a professional editorial hero that supports the product narrative. Prefer scenes, metaphors, and product-motion storytelling over labels and boxes.
- When creating PRs, open ready-for-review PRs unless the user explicitly asks for draft. Do not prefix PR titles with `codex`.
- When a ticket implementation is complete and local checks pass, commit, push, and open a ready-for-review PR proactively unless the user explicitly asks to keep the work local or skip PR creation.

## Common Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:content
npm run audit:prod
```

`npm run dev` starts the local Next.js server on `http://localhost:3200`.

## High-Level Architecture

- Next.js App Router site for the NeutralAI marketing/product website.
- Root layout: `app/layout.tsx`.
- Homepage: `app/page.tsx`.
- Route segments such as About, Privacy, and Terms live under `app/*/page.tsx`.
- Shared components live under `app/components/`.
- Global styles live in `app/globals.css`.
- Product messaging is about NeutralAI Gateway: a PII gateway for regulated UK industries that masks sensitive data before it reaches LLMs.

## Change Workflow

1. Run `git status --short` and preserve existing user changes.
2. If the user asks for the next ticket, run `scripts/codex-next-ticket.sh` before manually selecting an issue.
3. Classify the ticket using `docs/ai/TICKET_WORKFLOW.md`.
4. Read the relevant architecture/risk docs.
5. Make the smallest focused change.
6. Run targeted checks from `docs/ai/TESTING_AND_COMMANDS.md`.
7. Run `scripts/codex-security-pre-review.sh` and address blocking findings before PR review.
8. Commit, push, and open a ready-for-review PR when changes are ready, unless the user explicitly asks not to.
9. Summarize changed files, validation, risks, PR link, and follow-ups.

## AI Repo Map Files

- `docs/ai/PROJECT_MAP.md`: directories, entry points, runtime/framework map.
- `docs/ai/ARCHITECTURE.md`: layers, route surface, content model, invariants.
- `docs/ai/DEPENDENCY_GRAPH.md`: important dependencies and Mermaid graphs.
- `docs/ai/FLOWS.md`: critical runtime/editorial flows.
- `docs/ai/TESTING_AND_COMMANDS.md`: commands and test decision table.
- `docs/ai/RISK_REGISTER.md`: sensitive-area checklist.
- `docs/ai/OPEN_QUESTIONS.md`: unresolved questions.
- `docs/ai/TICKET_WORKFLOW.md`: ticket triage and execution workflow.
- `docs/ai/PR_RULES.md`: PR title/body/validation rules.
