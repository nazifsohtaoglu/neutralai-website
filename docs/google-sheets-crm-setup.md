# Google Sheets Lead Capture Setup

This website sends contact form submissions to a Google Sheets ingestion endpoint using public runtime configuration only. Do not commit service-account keys, Apps Script private tokens, webhook secrets, or mailbox credentials.

For production launch verification tracking, use `docs/google-sheets-production-verification.md`.

## Required Public Environment Variable

- `NEXT_PUBLIC_GOOGLE_SHEETS_LEAD_ENDPOINT` with the canonical deployed Google Apps Script web app URL in the form `https://script.google.com/macros/s/<deployment-id>/exec`

Because this value is public runtime config, do not paste:

- redirected `script.googleusercontent.com` URLs
- query-string auth tokens or opaque `user_content_key` values
- embedded credentials of any kind

## Required Lead Fields

The contact form submission payload should include:

- `full_name`
- `email`
- `company_name`
- `company_size`
- `message`
- `referral_source`
- `website_intent`
- `lead_source`
- `website_page_url`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer_host`
- `landing_page_path`
- `ref`
- `referral_code`
- `first_touch_at`
- `last_touch_at`
- `first_touch_path`
- `last_touch_path`
- `landing_page`
- `attribution_source`

The same transport applies to the contact form, trust-center security pack form, and compliance checklist form.

## Form Routing

- Demo requests use `/contact?intent=demo`.
- Enterprise and pricing enquiries use `/contact?intent=enterprise`.
- Security review requests use `/contact?intent=security-review`.

Successful submissions should redirect to `/contact/thanks/`.

## Operational Setup Outside The Repo

- Create the Google Sheet with columns matching required lead fields.
- Deploy a Google Apps Script web app that parses JSON from `e.postData.contents` and appends rows. The browser sends that JSON as `text/plain;charset=UTF-8` to avoid an unsupported CORS OPTIONS preflight; do not require an `application/json` request MIME type.
- Keep the response readable by the website origin. Do not use `mode: no-cors`: an opaque response cannot prove that the lead was accepted. Verify a real submission and its stored row before marking delivery ready.
- A successful write must return JSON `{ "ok": true }`. HTTP 200 alone is not acceptance: Apps Script may also return HTML error pages or `{ "ok": false }`. All three forms require the explicit JSON acknowledgement before success UI or conversion events. An unreadable response remains unconfirmed even if a row was stored; do not automatically retry a POST.
- Configure notifications from Sheets/Apps Script or the approved automation layer.
- Add global tracking only after cookie consent and analytics ownership are approved.
- Keep non-secret owner roles, endpoint references, and smoke-test status current in `docs/google-sheets-production-verification.md`.

## Internal notification worker

A separate, initially disabled Apps Script worker is versioned in `ops/lead-notifications/`. Follow [internal lead notifications](internal-lead-notifications.md) for authorization, baseline selection, activation, failure reconciliation and receipt acceptance. Website deployment alone does not activate it; the existing ingestion endpoint is unchanged.
