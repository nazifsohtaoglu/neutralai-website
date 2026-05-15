# PR Rules

## Default Behavior

- Open ready-for-review PRs unless the user explicitly asks for draft.
- Do not prefix PR titles with `codex`.
- Keep PRs focused on one coherent website change.
- Do not include secret values, tokens, private keys, or credentials.

## PR Title

Use an outcome-oriented title:

- `Improve homepage primary CTA clarity`
- `Fix mobile navbar spacing`
- `Add content test for demo CTA`

Avoid:

- `[codex] updates`
- `misc changes`
- `fix stuff`

## PR Body Template

```markdown
## Problem

What visitor, content, or maintenance problem does this solve?

## What Changed

- Change 1
- Change 2

## Validation

- [ ] Command/check and result
- [ ] Manual browser check, if applicable

## Risks / Follow-ups

- Risk or follow-up
```

## Before Opening a PR

- Run `git status --short`.
- Review the diff.
- Confirm no unrelated user changes were included.
- Run targeted verification from `docs/ai/TESTING_AND_COMMANDS.md`.
- Run `./scripts/codex-security-pre-review.sh` and resolve blocking findings.
- Mention tests that were not run and why.
