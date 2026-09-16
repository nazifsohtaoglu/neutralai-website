# Open Questions

Use this file for unknowns. Do not guess silently.

## Launch Readiness Dependencies

- Launch blockers are tracked in `docs/ai/LAUNCH_READINESS_LEDGER.md`.
- Rule: do not leave launch-critical blockers as unowned free-text questions in this file.

## Product / Marketing

- Resolved on 2026-05-16 in ticket [#76](https://github.com/nazifsohtaoglu/neutralai-website/issues/76): canonical conversion paths, owner roles, destination expectations, analytics signals, and smoke status are now tracked in `docs/conversion-funnel-qa.md` (including signup handoff params `website_start_free_trial`, `website_get_started`, `website_get_team`, `website_get_business`).
- What is the preferred ICP for the website copy: legal, finance, healthcare, insurance, SaaS support, or broader regulated teams?
- Resolved on 2026-05-15 in `docs/customer-proof-framework.md`: approved proof types, wording guardrails, and publication gates for customer evidence are now documented; public site posture remains conservative until assets are approved.
- WEB-104 now has a local Playwright-generated demo video, captions, and poster. If marketing wants external hosting, what hosted URL should replace the local asset? Browser extension or admin dashboard footage still needs explicit approval before it is shown publicly.
- WEB-09 should switch the Developers SDK cards to public registry install commands only after the gateway BUS-012 SDK publication checks confirm `neutralai-sdk` and `neutralai-node-sdk` are live.

## Architecture / Deployment

- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: website delivery is documented as static export output from `out/`, served behind Cloudflare edge.
- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: `/use-cases/finance` remains a static alias page that canonicalizes to `/use-cases/financial-services` instead of runtime-only redirect APIs.
- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: generated `out/` is build-only output and should not be committed.
- Resolved on 2026-05-15 in `docs/deployment-static-runbook.md`: owner/on-call assignment requirements for host-level redirect/header configuration are now captured as explicit closure checklist items, while the actual private-ops assignment execution remains tracked under Platform/Infra in issue [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78) and `docs/ai/LAUNCH_READINESS_LEDGER.md`.
- Should Playwright artifacts be ignored/cleaned, or are they used as review evidence?
- For Agent-Ready follow-up after issue #153: should NeutralAI publish a real MCP server card, WebMCP surface, OAuth/OIDC metadata, DNS-AID records, or agentic commerce protocol metadata? Do not add those discovery claims until the owning service and production endpoint exist.

## Testing / CI

- Should content tests cover every public route or only the homepage?
- Should a Playwright visual smoke script be added to `package.json`?
- Should `next build` be treated as the canonical typecheck, or should a separate TypeScript check be added?
- Should gateway add a documented, non-secret live document redaction smoke script for internal canary tenants so website proof claims can be refreshed without ad hoc SSH commands?

## Website consistency review — 2026-09-15

- Owner: Platform/Infra. Confirm the current managed processing/storage region and subprocessors before restoring a named public region claim. Older copy conflicts between Hetzner EU and London/Frankfurt. Public copy now requests deployment-specific confirmation.
- Owner: Product/Billing. Confirm provider BYOK entitlement against the current backend plan catalogue before publishing a consolidated plan matrix; legacy Growth references removed from review pages. Vault key custody is a separate capability.
- Owner: Product/Marketing. Confirm the commercial launch flag and supported private-deployment offer before changing the conditional pricing notice or general availability badge. This PR does not change release flags.

## Lead delivery acceptance — 2026-09-16

- A controlled contact submission was stored exactly once in Sheets while the browser showed an error. The lost response cause remains unverified. JSON acknowledgement validation prevents false success but does not fix this delivery-confirmation failure. Do not auto-retry POSTs or interpret unreadable responses as successful writes.
- Verify notification delivery independently: deployed handlers contain no email call and the owner-visible project trigger list is empty; separate Sheets rules or another account's triggers have not been audited.
