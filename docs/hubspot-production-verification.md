# HubSpot Production Lead Capture Verification

Use this runbook to verify website lead capture and routing for production launch readiness without storing secrets in-repo.

Assumption: Individual names, private app credentials, and sensitive HubSpot workspace metadata are stored in an access-controlled private ops system, while this file tracks non-secret launch evidence.

## Current Gate Status

- Launch state: `NO-GO` until production HubSpot smoke evidence is recorded for all three intents (`demo`, `enterprise`, `security-review`).
- Current blocker: Production portal/form access and execution evidence are owned outside this repository.
- Tracking source of truth: issue [#70](https://github.com/nazifsohtaoglu/neutralai-website/issues/70) and `docs/ai/LAUNCH_READINESS_LEDGER.md`.

## Ownership And Non-Secret Links

| Area | Owner role | Non-secret reference link | Status |
| --- | --- | --- | --- |
| HubSpot portal + form admin | Revenue Operations | `https://app.hubspot.com/forms/<portal-id>` | Pending confirmation |
| Contact intent workflow | Revenue Operations | `https://app.hubspot.com/workflows/<portal-id>/contact` | Pending confirmation |
| Demo intent workflow | Growth Engineering | `https://app.hubspot.com/workflows/<portal-id>/demo` | Pending confirmation |
| Enterprise intent workflow | Growth Engineering | `https://app.hubspot.com/workflows/<portal-id>/enterprise` | Pending confirmation |
| Security-review intent workflow | Security + Growth Engineering | `https://app.hubspot.com/workflows/<portal-id>/security-review` | Pending confirmation |
| Notification routing | Revenue Operations | `https://app.hubspot.com/settings/<portal-id>/notifications` | Pending confirmation |
| Confirmation emails | Revenue Operations | `https://app.hubspot.com/marketing-email/<portal-id>` | Pending confirmation |
| CRM pipeline and stage mapping | Revenue Operations | `https://app.hubspot.com/contacts/<portal-id>/objects/0-3/views/all/list` | Pending confirmation |

## Runtime Configuration Snapshot (Non-Secret)

Record values from the deployed environment where only public variables are used:

- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`: `TODO`
- `NEXT_PUBLIC_HUBSPOT_REGION`: `TODO` (expected `eu1` unless HubSpot account requires another region)
- `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID`: `TODO`
- `NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID`: `TODO`
- `NEXT_PUBLIC_HUBSPOT_ENTERPRISE_FORM_ID`: `TODO`
- `NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID`: `TODO`

## Intent Routing Matrix

| Website intent | Route to test | Expected HubSpot form ID source | Expected `website_intent` | Expected `lead_source` |
| --- | --- | --- | --- | --- |
| Contact/Demo | `/contact?intent=demo` | `NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID` or contact fallback | `demo` | `website_demo_request` |
| Enterprise | `/contact?intent=enterprise` | `NEXT_PUBLIC_HUBSPOT_ENTERPRISE_FORM_ID` or contact fallback | `enterprise` | `website_enterprise_enquiry` |
| Security review | `/contact?intent=security-review` | `NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID` or contact fallback | `security-review` | `website_security_review` |

## Manual Smoke Steps

1. Open `/contact?intent=demo`, `/contact?intent=enterprise`, and `/contact?intent=security-review` on the deployed site.
2. Submit a controlled test lead for each intent (use known test mailbox/domain).
3. Confirm one record per submission appears in HubSpot with expected intent + source fields.
4. Confirm hidden attribution fields populate: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `referrer_host`, `landing_page_path`, `website_page_url`.
5. Confirm routing behavior:
   - Notification reaches the intended owner/channel.
   - Confirmation email sends for demo, enterprise, and security-review flows.
   - CRM pipeline/stage placement matches the agreed lifecycle mapping.
6. Confirm analytics guardrail:
   - No prompt text or free-form form body content is copied into analytics events.
   - `npm run test:content` passes before and after smoke verification updates.

## Fallback Route Validation

1. Validate missing-config state in a non-production environment by either:
   - clearing `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, or
   - clearing both the selected intent form ID and `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID` fallback for that route.
2. Confirm fallback copy appears: "The CRM form is not configured in this environment yet."
3. Validate script-failure state by blocking `https://js.hsforms.net/forms/embed/v2.js` in browser devtools or network tooling.
4. Confirm fallback copy appears: "The CRM form could not load in this browser."
5. Confirm fallback still presents `mailto:sales@neutralai.co.uk`.

## Verification Log

| Date (UTC) | Environment | Tester role | Demo intent | Enterprise intent | Security-review intent | Notification routing | Confirmation emails | Pipeline/stage | Fallback route | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-05-15 | Pending | Revenue Operations + Growth Engineering | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Runbook added in repo; execution evidence not yet recorded. |
| 2026-05-17 | Local repo checks | Growth Engineering (repo) | Pending (external portal access required) | Pending (external portal access required) | Pending (external portal access required) | Pending (external portal access required) | Pending (external portal access required) | Pending (external portal access required) | Partial (static coverage only; browser validation still required) | `npm run build` passed; `node --test tests/content/contact-form.test.mjs tests/content/hubspot-verification-docs.test.mjs tests/content/analytics.test.mjs` passed. Missing-config and script-blocked fallback behavior still need browser verification on a deployed or local runtime. |
