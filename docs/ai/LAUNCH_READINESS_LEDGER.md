# Launch Readiness Dependency Ledger

This ledger tracks launch-critical dependencies so no blocker remains as unowned free text.

Use this file for go/no-go readiness. Keep `docs/ai/OPEN_QUESTIONS.md` for non-launch unknowns.

Assumption: Individual owner names, account emails, and admin workspace URLs are maintained in an access-controlled private ops system outside this repository, while this file tracks owner roles and issue-level status.

## Go/No-Go Rule

- Public launch is `NO-GO` until every row marked `Pre-launch` is either `Closed` or has an approved exception with owner and date.
- Rows marked `Post-launch` can remain open if the current website copy does not overclaim missing proof.

## Dependencies

| Dependency | Owner role | Tracking | Required for launch | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Pricing and catalog parity between website and live app/gateway | Product + Gateway Engineering | [#69](https://github.com/nazifsohtaoglu/neutralai-website/issues/69), [gateway#777](https://github.com/nazifsohtaoglu/neutralai-gateway/issues/777) | Pre-launch | Open (external verification pending) | 2026-05-15: website signup CTA plan/src params were updated in ticket [#69](https://github.com/nazifsohtaoglu/neutralai-website/issues/69); live gateway/catalog parity still needs external verification before this dependency can be closed. |
| Public claims evidence and approval (GDPR, regulated sectors, retention/deployment claims) | Product Marketing + Compliance | [#73](https://github.com/nazifsohtaoglu/neutralai-website/issues/73) | Pre-launch | Open | Claim registry must map each public claim to verifiable evidence or remove claim language. |
| HubSpot production forms, routing, and lead ownership | Revenue Operations + Growth Engineering | [#70](https://github.com/nazifsohtaoglu/neutralai-website/issues/70), `docs/hubspot-production-verification.md` | Pre-launch | Open | 2026-05-15: verification runbook and non-secret ownership/link matrix added; production execution evidence is still pending. |
| PostHog production dashboards and funnel ownership | Product Analytics | [#61](https://github.com/nazifsohtaoglu/neutralai-website/issues/61) | Pre-launch | Open | Dashboards, owners, and final URLs are required for launch reporting. |
| Plausible production ownership decision (active ownership vs formal retirement) | Product Analytics | [#87](https://github.com/nazifsohtaoglu/neutralai-website/issues/87) | Pre-launch | Closed | Decision recorded on 2026-05-15: Plausible retired for launch, website analytics runs PostHog-only, and launch docs/runtime wiring were updated to remove ambiguous Plausible dependency. |
| Cross-CTA conversion funnel QA (signup/demo/contact/playground/extension) | Growth Engineering + QA | [#76](https://github.com/nazifsohtaoglu/neutralai-website/issues/76) | Pre-launch | Open | Prevents launch with broken or untracked conversion paths. |
| Static hosting/export runbook ownership (redirects, headers, sitemap, output) | Platform/Infra | [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78), `docs/deployment-static-runbook.md` | Pre-launch | Open | Runbook now documents static export behavior, smoke checks, and rollback baseline; private ops owner/on-call mapping for host-level config still needs explicit assignment. |
| Production dependency audit advisories | Engineering | [#79](https://github.com/nazifsohtaoglu/neutralai-website/issues/79) | Pre-launch | Open (mitigated in-repo) | 2026-05-15: repo mitigation applied with `postcss` override (`^8.5.14`), and `npm run audit:prod`, `npm run lint`, `npm run build` passed; keep issue open until upstream Next transitive advisory path is explicitly cleared. |
| Approved customer proof or anonymized case-study framework | Product Marketing | [#77](https://github.com/nazifsohtaoglu/neutralai-website/issues/77), `docs/customer-proof-framework.md` | Post-launch | Closed | 2026-05-15: customer proof framework and wording guardrails are published; website remains on conservative posture until approved assets clear legal/compliance gates. |
| SEO keyword source of truth and performance loop | Content + Growth | [#80](https://github.com/nazifsohtaoglu/neutralai-website/issues/80) | Post-launch | Closed | Canonical source stack, keyword map, and review cadence are documented in `docs/seo-keyword-performance-loop.md`. |

## Operating Notes

- Do not store service-account emails, private admin links, or owner contact details in repository-tracked files.
- Keep sensitive operator/account metadata in an approved private system (password manager, private ops docs, or equivalent access-controlled store).
- If a dependency cannot be closed pre-launch, record an explicit exception with owner, rationale, and target date in the linked issue.
