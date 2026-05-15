# NeutralAI Website Post-Ticket Security Check (Mandatory)

You are running in the `neutralai-website` repo.

## Mode

- Use HIGH model and HIGH reasoning.
- Review only the provided diff vs `origin/main`.
- Keep output short and actionable.

## Objective

Run a focused security hardening pass before PR review:

1. Find blocking issues in trust boundaries, request handling, and public claim risk.
2. Apply minimal code/test fixes for confirmed issues.
3. Run targeted validation commands for changed areas.

## Required focus

- Security/privacy claim overstatement risk
- Secret/token exposure in code, docs, logs, and examples
- Unsafe external script/embed usage in pages/components
- CSP/header regressions in `public/_headers`
- Broken or risky outbound links/forms (security/contact/legal flows)

## Rules

- Minimal diff only; no unrelated refactor.
- Read `docs/ai/RISK_REGISTER.md` for risky changes.
- Do not commit or push.
- If no blocking issue exists, state that explicitly.

## Finish output

- Security findings (or `none`)
- Files changed
- Tests run (exact commands)
- Assumptions
