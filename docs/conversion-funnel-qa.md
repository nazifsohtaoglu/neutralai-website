# Conversion Funnel QA Matrix

Ticket: [#76](https://github.com/nazifsohtaoglu/neutralai-website/issues/76)  
Last reviewed: 2026-05-16

This runbook defines the canonical conversion funnel paths for launch readiness checks.

Assumption: Individual assignee names and private dashboard URLs stay in private ops systems. This file tracks owner roles, public destinations, and smoke outcomes only.

## Canonical CTA Paths

| Funnel path | Owner role | Expected destination | Analytics event | Smoke result |
| --- | --- | --- | --- | --- |
| Homepage hero -> Try Free | Growth Engineering + Product | `siteConfig.signupUrl` (`intent=signup`, `plan=free`, `src=website_start_free_trial`) | `CTA Click` (`placement=homepage_hero`, `label=Try Free`) | Repo-verified (2026-05-16) |
| Navbar desktop/mobile -> Get Started Free | Growth Engineering | `siteConfig.signupUrl` (`intent=signup`, `plan=free`, `src=website_start_free_trial`) | `CTA Click` (`placement=navbar_desktop` / `navbar_mobile`, `label=Get Started Free`) | Repo-verified (2026-05-16) |
| Homepage pricing -> Starter/Team/Business get started | Growth Engineering + Product Analytics | App signin URLs with `src=website_get_started`, `website_get_team`, `website_get_business` | `CTA Click` (`placement=homepage_pricing_primary` / `homepage_pricing_advanced`) | Repo-verified (2026-05-16) |
| Homepage -> Book Demo | Growth Engineering + RevOps | `/demo` (then CTA handoff to `/contact?intent=demo`) | `CTA Click` (`placement=homepage_hero`, `label=Book Demo`) | Repo-verified (2026-05-16) |
| Contact intent -> Demo | Revenue Operations + Growth Engineering | HubSpot demo form (`NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID`) or contact fallback | HubSpot `lead_source=website_demo_request` | Pending production execution evidence |
| Contact intent -> Enterprise | Revenue Operations + Growth Engineering | HubSpot enterprise form (`NEXT_PUBLIC_HUBSPOT_ENTERPRISE_FORM_ID`) or contact fallback | HubSpot `lead_source=website_enterprise_enquiry` | Pending production execution evidence |
| Contact intent -> Security review | Revenue Operations + Growth Engineering | HubSpot security-review form (`NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID`) or contact fallback | HubSpot `lead_source=website_security_review` | Pending production execution evidence |
| Demo page -> Book Live Demo / Talk to Sales | Growth Engineering + RevOps | `/contact?intent=demo` and `/contact?intent=enterprise` | `CTA Click` (`placement=demo_hero` / `demo_bottom_cta`) | Repo-verified (2026-05-16) |
| Playground -> Try Free / Book Demo | Growth Engineering + Product Analytics | `siteConfig.signupUrl` and `/contact?intent=demo` | `CTA Click` (`placement=playground_hero` / `playground_bottom_cta`) | Repo-verified (2026-05-16) |
| Homepage + install page -> Install extension / support | Growth Engineering + Support Engineering | `/install-extension` and `/support/browser-extension` (plus store links) | `CTA Click` (`placement=homepage_hero`, `homepage_product_surface`, `install_extension_options`) | Repo-verified (2026-05-16) |

## Repo Smoke Commands

Run from repository root:

1. `npm run test:content`
2. `npm run build`
3. `npm run test:visual-smoke`

Interpretation:

- `test:content` catches broken destination URLs, missing analytics metadata, and copy regressions for key conversion paths.
- `test:visual-smoke` catches route-level rendering regressions on launch-critical pages (`/`, `/demo`, `/playground`, `/contact`, `/install-extension`).
- HubSpot pipeline routing validation remains owned by RevOps + Growth Engineering in production using `docs/hubspot-production-verification.md`.

## Launch Closure Criteria For #76

Issue [#76](https://github.com/nazifsohtaoglu/neutralai-website/issues/76) can move to `Closed` when:

1. The matrix above remains accurate in repo tests and docs.
2. Production HubSpot checks are recorded in `docs/hubspot-production-verification.md`.
3. PostHog funnel/dashboard links are recorded in `docs/analytics-setup.md`.
4. No broken conversion destination is present in `npm run test:content`.
