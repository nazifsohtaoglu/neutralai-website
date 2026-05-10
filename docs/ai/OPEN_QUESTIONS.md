# Open Questions

Use this file for unknowns. Do not guess silently.

## Product / Marketing

- What is the canonical primary CTA: trial, demo, contact, waitlist, or install extension?
- What exact `src` value should website signup handoffs use for homepage "Try Free" CTAs: `website_start_free_trial`, `website_try_free`, or another analytics-owned value?
- WEB-02 website pricing now follows the user-confirmed GBP packaging direction (£0 Free, £29 Starter, £99 Team, £299 Business, Enterprise Custom) and separates masking requests from managed AI credits/BYOK. Gateway issue https://github.com/nazifsohtaoglu/neutralai-gateway/issues/777 tracks the required backend/catalog support; the live gateway public catalog and BUS-008 contract still expose USD/Pro/$499 until that is implemented.
- Which claims are approved for public use around GDPR, UK regulated industries, zero retention, and on-prem deployment?
- Are there real customers, pilots, certifications, or benchmarks that can be referenced publicly?
- What is the preferred ICP for the website copy: legal, finance, healthcare, insurance, SaaS support, or broader regulated teams?

## Architecture / Deployment

- Is the website deployed as a static export from `out/`, as a Next server app, or through another platform?
- Should generated `out/` assets be committed or treated as build output only?
- Should Playwright artifacts be ignored/cleaned, or are they used as review evidence?

## Testing / CI

- Should content tests cover every public route or only the homepage?
- Should a Playwright visual smoke script be added to `package.json`?
- Should `next build` be treated as the canonical typecheck, or should a separate TypeScript check be added?
- Should gateway add a documented, non-secret live document redaction smoke script for internal canary tenants so website proof claims can be refreshed without ad hoc SSH commands?
