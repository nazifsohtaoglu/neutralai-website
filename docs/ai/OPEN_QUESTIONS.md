# Open Questions

Use this file for unknowns. Do not guess silently.

## Launch Readiness Dependencies

- Launch blockers are tracked in `docs/ai/LAUNCH_READINESS_LEDGER.md`.
- Rule: do not leave launch-critical blockers as unowned free-text questions in this file.

## Product / Marketing

- What is the canonical primary CTA: trial, demo, contact, waitlist, or install extension?
- What exact `src` value should website signup handoffs use for homepage "Try Free" CTAs: `website_start_free_trial`, `website_try_free`, or another analytics-owned value?
- What is the preferred ICP for the website copy: legal, finance, healthcare, insurance, SaaS support, or broader regulated teams?
- WEB-104 now has a local Playwright-generated demo video, captions, and poster. If marketing wants external hosting, what hosted URL should replace the local asset? Browser extension or admin dashboard footage still needs explicit approval before it is shown publicly.
- WEB-09 should switch the Developers SDK cards to public registry install commands only after the gateway BUS-012 SDK publication checks confirm `neutralai-sdk` and `neutralai-node-sdk` are live.

## Architecture / Deployment

- Is the website deployed as a static export from `out/`, as a Next server app, or through another platform?
- Assumption: Until hosting-level redirect support is confirmed, `/use-cases/finance` is implemented as a static fallback alias page that canonicalizes to `/use-cases/financial-services` instead of using App Router runtime redirects.
- Should generated `out/` assets be committed or treated as build output only?
- Should Playwright artifacts be ignored/cleaned, or are they used as review evidence?

## Testing / CI

- Should content tests cover every public route or only the homepage?
- Should a Playwright visual smoke script be added to `package.json`?
- Should `next build` be treated as the canonical typecheck, or should a separate TypeScript check be added?
- Should gateway add a documented, non-secret live document redaction smoke script for internal canary tenants so website proof claims can be refreshed without ad hoc SSH commands?
