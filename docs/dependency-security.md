# Dependency Security Baseline

- Owner: Founders / Website Maintainer
- Review cadence: weekly review every Monday, plus every release PR
- Last updated: 2026-04-19

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

As of `2026-04-19`, the move to `Next.js 16.2.4` clears the previously observed production dependency advisories in `npm audit --omit=dev`. Future major upgrades should still be reviewed deliberately, because framework changes can affect static export, metadata routes, and lint/build conventions.
