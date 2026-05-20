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

## Form Routing

- Demo requests use `/contact?intent=demo`.
- Enterprise and pricing enquiries use `/contact?intent=enterprise`.
- Security review requests use `/contact?intent=security-review`.

Successful submissions should redirect to `/contact/thanks/`.

## Operational Setup Outside The Repo

- Create the Google Sheet with columns matching required lead fields.
- Deploy a Google Apps Script web app that accepts JSON POST and appends rows.
- Configure notifications from Sheets/Apps Script or the approved automation layer.
- Add global tracking only after cookie consent and analytics ownership are approved.
- Keep non-secret owner roles, endpoint references, and smoke-test status current in `docs/google-sheets-production-verification.md`.
