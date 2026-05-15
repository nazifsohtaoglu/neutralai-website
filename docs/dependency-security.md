# Dependency Security Baseline

- Owner: Founders / Website Maintainer
- Review cadence: weekly review every Monday, plus every release PR
- Last updated: 2026-05-15

## Current baseline

- `next` is pinned to the `16.2.x` stable line in `package.json`
- production dependency security checks run in `.github/workflows/dependency-security.yml`
- the workflow runs on:
  - pushes to `main`
  - pull requests to `main`
  - weekly schedule
  - manual dispatch

## Review policy

- `critical` production dependency findings are blocking
- `high` production dependency findings must be reviewed and triaged explicitly
- major-version upgrades require a separate compatibility review before rollout

## Current note

As of `2026-05-15`, `npm audit --omit=dev --audit-level=critical` is clean after forcing a safe `postcss` line via `package.json` overrides (`postcss@^8.5.14`) while remaining on `next@16.2.x`.

Next action:

- Keep the override in place until Next ships a stable release that resolves the transitive PostCSS advisory without overrides.
- Re-check with `npm run audit:prod`, `npm run lint`, and `npm run build` before removing the override.
