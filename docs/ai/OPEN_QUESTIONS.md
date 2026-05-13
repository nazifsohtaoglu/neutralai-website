# Open Questions

Use this file for unknowns. Do not guess silently.

## Product / Marketing

- What is the canonical primary CTA: trial, demo, contact, waitlist, or install extension?
- What exact `src` value should website signup handoffs use for homepage "Try Free" CTAs: `website_start_free_trial`, `website_try_free`, or another analytics-owned value?
- WEB-02 website pricing now follows the user-confirmed GBP packaging direction (£0 Free, £29 Starter, £99 Team, £299 Business, Enterprise Custom) and separates masking requests from managed AI credits/BYOK. Gateway issue https://github.com/nazifsohtaoglu/neutralai-gateway/issues/777 tracks the required backend/catalog support; the live gateway public catalog and BUS-008 contract still expose USD/Pro/$499 until that is implemented.
- Which claims are approved for public use around GDPR, UK regulated industries, zero retention, and on-prem deployment?
- Are there real customers, pilots, certifications, or benchmarks that can be referenced publicly?
- What is the preferred ICP for the website copy: legal, finance, healthcare, insurance, SaaS support, or broader regulated teams?
- WEB-103 asks for at least 3 articles targeting keywords with search volume >100/mo, but this repo has no approved SEO data source or keyword-volume export. Which SEO tool/export should be treated as the canonical volume source?
- WEB-104 now has a local Playwright-generated demo video, captions, and poster. If marketing wants external hosting, what hosted URL should replace the local asset? Browser extension or admin dashboard footage still needs explicit approval before it is shown publicly.
- WEB-105 needs approved real customer outcomes, testimonials, usage counts, or anonymized case-study evidence before the homepage should call anything a customer case study or show social-proof usage numbers.
- WEB-106 needs the live HubSpot portal ID, region, form IDs, contact property names, notification workflow, confirmation email workflow, and Slack routing configured outside the repo before production leads can be verified end-to-end.
- WEB-106 asks for HubSpot tracking script attribution, but global visitor tracking should wait for approved cookie consent/analytics ownership so the website does not add non-essential tracking before consent.
- WEB-107 needs a confirmed Plausible workspace/domain, dashboard owner, and approved goal/funnel definitions before production analytics can be verified beyond the website consent-gated wiring.
- WEB-61 needs the approved PostHog workspace/project, project region/host, dashboard owner, and final dashboard/funnel URLs before production analytics can be marked fully complete beyond consent-gated website wiring.
- Third-party service ownership is now tracked in `docs/third-party-services.md`; missing owners, account URLs, and production/staging links should be filled there as accounts are created or confirmed.
- WEB-09 should switch the Developers SDK cards to public registry install commands only after the gateway BUS-012 SDK publication checks confirm `neutralai-sdk` and `neutralai-node-sdk` are live.

## Architecture / Deployment

- Is the website deployed as a static export from `out/`, as a Next server app, or through another platform?
- Should generated `out/` assets be committed or treated as build output only?
- Should Playwright artifacts be ignored/cleaned, or are they used as review evidence?

## Testing / CI

- Should content tests cover every public route or only the homepage?
- Should a Playwright visual smoke script be added to `package.json`?
- Should `next build` be treated as the canonical typecheck, or should a separate TypeScript check be added?
- Should gateway add a documented, non-secret live document redaction smoke script for internal canary tenants so website proof claims can be refreshed without ad hoc SSH commands?
