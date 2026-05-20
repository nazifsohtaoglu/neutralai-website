# Google Sheets Production Lead Capture Verification

Use this runbook to verify website lead capture and routing for production launch readiness without storing secrets in-repo.

Assumption: Individual names, private credentials, and sensitive workspace metadata are stored in an access-controlled private ops system, while this file tracks non-secret launch evidence.

## Ownership And Non-Secret Links

| Area | Owner role | Non-secret reference link | Status |
| --- | --- | --- | --- |
| Google Sheets admin | Revenue Operations | `https://docs.google.com/spreadsheets/d/<sheet-id>` | Pending confirmation |
| Endpoint owner | Growth Engineering | `https://script.google.com/home/projects/<project-id>` | Pending confirmation |
| Demo intent routing | Revenue Operations | `https://docs.google.com/spreadsheets/d/<sheet-id>#gid=<demo-tab>` | Pending confirmation |
| Enterprise intent routing | Revenue Operations | `https://docs.google.com/spreadsheets/d/<sheet-id>#gid=<enterprise-tab>` | Pending confirmation |
| Security-review intent routing | Security + Growth Engineering | `https://docs.google.com/spreadsheets/d/<sheet-id>#gid=<security-tab>` | Pending confirmation |
| Notification routing | Revenue Operations | `https://script.google.com/home/projects/<project-id>/triggers` | Pending confirmation |

## Runtime Configuration Snapshot (Non-Secret)

Record values from the deployed environment where only public variables are used:

- `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT`: `TODO` (expected canonical deployed `https://script.google.com/macros/s/<deployment-id>/exec` web app URL; do not use redirected `script.googleusercontent.com` URLs or query-token variants)

## Intent Routing Matrix

| Website intent | Route to test | Expected endpoint | Expected `website_intent` | Expected `lead_source` |
| --- | --- | --- | --- | --- |
| Contact/Demo | `/contact?intent=demo` | `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT` | `demo` | `website_demo_request` |
| Enterprise | `/contact?intent=enterprise` | `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT` | `enterprise` | `website_enterprise_enquiry` |
| Security review | `/contact?intent=security-review` | `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT` | `security-review` | `website_security_review` |

## Manual Smoke Steps

1. Open `/contact?intent=demo`, `/contact?intent=enterprise`, and `/contact?intent=security-review` on the deployed site.
2. Submit a controlled test lead for each intent (use known test mailbox/domain).
3. Confirm one row per submission appears in Google Sheets with expected intent + source fields.
4. Confirm attribution fields populate: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `referrer_host`, `landing_page_path`, `website_page_url`.
5. Confirm routing behavior:
   - Notification reaches the intended owner/channel.
   - Sheet tabs/views reflect expected ownership split.
6. Confirm analytics guardrail:
   - No prompt text or free-form form body content is copied into analytics events.
   - `npm run test:content` passes before and after smoke verification updates.

## Fallback Route Validation

1. Validate missing-config state in a non-production environment by clearing `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT`.
2. Confirm fallback copy appears: "Lead form endpoint is not configured in this environment yet."
3. Validate endpoint-failure state by forcing a non-2xx response.
4. Confirm failure copy appears: "Form could not be submitted right now."
5. Confirm fallback still presents `mailto:sales@neutralai.co.uk`.

## Verification Log

| Date (UTC) | Environment | Tester role | Demo intent | Enterprise intent | Security-review intent | Notification routing | Fallback route | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-05-19 | Pending | Revenue Operations + Growth Engineering | Pending | Pending | Pending | Pending | Pending | Runbook switched from HubSpot flow to Google Sheets endpoint flow. |
