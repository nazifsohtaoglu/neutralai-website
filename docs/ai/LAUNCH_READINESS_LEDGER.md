# Launch Readiness Dependency Ledger

This ledger tracks launch-critical dependencies so no blocker remains as unowned free text.

Use this file for go/no-go readiness. Keep `docs/ai/OPEN_QUESTIONS.md` for non-launch unknowns.

Assumption: Individual owner names and account emails stay in `docs/local/third-party-services.local.md`, while this file tracks owner roles and issue-level status.

## Go/No-Go Rule

- Public launch is `NO-GO` until every row marked `Pre-launch` is either `Closed` or has an approved exception with owner and date.
- Rows marked `Post-launch` can remain open if the current website copy does not overclaim missing proof.

## Dependencies

| Dependency | Owner role | Tracking | Required for launch | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Pricing and catalog parity between website and live app/gateway | Product + Gateway Engineering | [#69](https://github.com/nazifsohtaoglu/neutralai-website/issues/69), [gateway#777](https://github.com/nazifsohtaoglu/neutralai-gateway/issues/777) | Pre-launch | Open (external dependency) | Website now reflects GBP packaging, but live gateway catalog still exposes older USD plan values. |
| Public claims evidence and approval (GDPR, regulated sectors, retention/deployment claims) | Product Marketing + Compliance | [#73](https://github.com/nazifsohtaoglu/neutralai-website/issues/73) | Pre-launch | Open | Claim registry must map each public claim to verifiable evidence or remove claim language. |
| HubSpot production forms, routing, and lead ownership | Revenue Operations + Growth Engineering | [#70](https://github.com/nazifsohtaoglu/neutralai-website/issues/70) | Pre-launch | Open | Portal/form IDs, routing, notifications, and ownership must be verified end-to-end in production. |
| PostHog production dashboards and funnel ownership | Product Analytics | [#61](https://github.com/nazifsohtaoglu/neutralai-website/issues/61) | Pre-launch | Open | Dashboards, owners, and final URLs are required for launch reporting. |
| Cross-CTA conversion funnel QA (signup/demo/contact/playground/extension) | Growth Engineering + QA | [#76](https://github.com/nazifsohtaoglu/neutralai-website/issues/76) | Pre-launch | Open | Prevents launch with broken or untracked conversion paths. |
| Static hosting/export runbook ownership (redirects, headers, sitemap, output) | Platform/Infra | [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78) | Pre-launch | Open | Deployment mode and operational ownership must be explicit for repeatable releases. |
| Production dependency audit advisories | Engineering | [#79](https://github.com/nazifsohtaoglu/neutralai-website/issues/79) | Pre-launch | Open | Moderate advisory triage/resolution must be tracked before launch sign-off. |
| Approved customer proof or anonymized case-study framework | Product Marketing | [#77](https://github.com/nazifsohtaoglu/neutralai-website/issues/77) | Post-launch | Open | Pre-launch copy should avoid unsupported social-proof claims until evidence is approved. |
| SEO keyword source of truth and performance loop | Content + Growth | [#80](https://github.com/nazifsohtaoglu/neutralai-website/issues/80) | Post-launch | Open | Needed for ongoing content optimization, not a hard launch gate. |

## Operating Notes

- For service-account details (workspace links, named owners, registered emails), update `docs/local/third-party-services.local.md`.
- If a dependency cannot be closed pre-launch, record an explicit exception with owner, rationale, and target date in the linked issue.
