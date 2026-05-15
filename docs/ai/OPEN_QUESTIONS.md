# Open Questions

Use this file for unknowns. Do not guess silently.

## Launch Readiness Dependencies

- Launch blockers are tracked in `docs/ai/LAUNCH_READINESS_LEDGER.md`.
- Rule: do not leave launch-critical blockers as unowned free-text questions in this file.

## Product / Marketing

- What is the canonical primary CTA: trial, demo, contact, waitlist, or install extension?
- What exact `src` value should website signup handoffs use for homepage "Try Free" CTAs: `website_start_free_trial`, `website_try_free`, or another analytics-owned value?
- What is the preferred ICP for the website copy: legal, finance, healthcare, insurance, SaaS support, or broader regulated teams?
- Resolved on 2026-05-15 in `docs/customer-proof-framework.md`: approved proof types, wording guardrails, and publication gates for customer evidence are now documented; public site posture remains conservative until assets are approved.
- WEB-104 now has a local Playwright-generated demo video, captions, and poster. If marketing wants external hosting, what hosted URL should replace the local asset? Browser extension or admin dashboard footage still needs explicit approval before it is shown publicly.
- WEB-09 should switch the Developers SDK cards to public registry install commands only after the gateway BUS-012 SDK publication checks confirm `neutralai-sdk` and `neutralai-node-sdk` are live.

## Architecture / Deployment

- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: website delivery is documented as static export output from `out/`, served behind Cloudflare edge.
- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: `/use-cases/finance` remains a static alias page that canonicalizes to `/use-cases/financial-services` instead of runtime-only redirect APIs.
- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: generated `out/` is build-only output and should not be committed.
- Repository-vs-private-ops source-of-truth split is documented in `docs/deployment-static-runbook.md`, but launch-blocking owner/on-call mapping for host-level redirect/header configuration remains open under Platform/Infra in issue [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78) and `docs/ai/LAUNCH_READINESS_LEDGER.md`.
- Should Playwright artifacts be ignored/cleaned, or are they used as review evidence?

## Testing / CI

- Should content tests cover every public route or only the homepage?
- Should a Playwright visual smoke script be added to `package.json`?
- Should `next build` be treated as the canonical typecheck, or should a separate TypeScript check be added?
- Should gateway add a documented, non-secret live document redaction smoke script for internal canary tenants so website proof claims can be refreshed without ad hoc SSH commands?
