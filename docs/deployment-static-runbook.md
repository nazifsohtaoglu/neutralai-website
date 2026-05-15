# Static Deployment Runbook

This runbook documents how the NeutralAI website is built, validated, and released as a static export.

## Scope

- Repository: `nazifsohtaoglu/neutralai-website`
- Ticket: [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78)
- Deployment class: static export output served behind Cloudflare edge.

Assumption: The production domain is edge-fronted by Cloudflare (`server: cloudflare` response headers observed on 2026-05-15), while provider project/account ownership metadata is stored in private ops systems, not in this repository.

## Source of Truth

- Static export mode is enabled in [next.config.js](../next.config.js) via `output: 'export'`.
- Trailing slash behavior is enabled in [next.config.js](../next.config.js) via `trailingSlash: true`.
- Security headers are defined in [public/_headers](../public/_headers).
- Sitemap generation is defined in [app/sitemap.ts](../app/sitemap.ts).
- Robots metadata is defined in [app/robots.ts](../app/robots.ts).
- Legacy finance alias behavior is defined in [app/use-cases/finance/page.tsx](../app/use-cases/finance/page.tsx).

## Build and Artifact Rules

1. Install dependencies:
   - `npm ci` for CI
   - `npm install` for local development
2. Produce static output:
   - `npm run build`
3. Build artifact:
   - Exported site is generated in `out/`.
4. Artifact policy:
   - `out/` is build-only and must not be committed (`out/` is ignored in `.gitignore`).

## Redirects and Route Alias Rules

1. Canonical domain redirect:
   - `https://www.neutralai.co.uk/` returns `301` to `https://neutralai.co.uk/` (verified 2026-05-15).
2. Trailing slash normalization:
   - Example: `/about` returns `308` to `/about/` (verified 2026-05-15).
3. Legacy path handling in static mode:
   - Avoid runtime-only Next.js redirect APIs for launch-critical aliases.
   - For `/use-cases/finance/`, use the static alias page pattern with:
     - canonical pointing to `/use-cases/financial-services/`
     - `noindex,follow` robots meta
     - visible user handoff CTA to the canonical route.

## Header and CSP Enforcement

1. Required headers are defined in [public/_headers](../public/_headers):
   - `Strict-Transport-Security`
   - `Content-Security-Policy`
   - `X-Content-Type-Options`
   - `X-Frame-Options`
   - `Referrer-Policy`
   - `Permissions-Policy`
2. Host-level verification command:
   - `curl -sSI https://neutralai.co.uk/`
3. Verification expectation:
   - Response headers must contain values aligned with `public/_headers`.
4. Current state:
   - Verified on 2026-05-15 that production responses include the expected header set and CSP policy.

## Sitemap and Robots Behavior

1. Verify sitemap:
   - `curl -sS https://neutralai.co.uk/sitemap.xml`
2. Verify robots:
   - `curl -sS https://neutralai.co.uk/robots.txt`
3. Expected:
   - `Sitemap: https://neutralai.co.uk/sitemap.xml` present.
   - Route URLs emitted by [app/sitemap.ts](../app/sitemap.ts) are present in sitemap output.
4. Note:
   - Production robots output currently includes Cloudflare Managed Content directives in addition to site-defined metadata.

## Deployment Smoke Checklist

Run from repository root before release:

1. `npm run lint`
2. `npm run test:content`
3. `npm run build`
4. `npm run test:visual-smoke`
5. `npm run test:a11y-smoke`
6. `./scripts/codex-security-pre-review.sh`

Then validate production/staging URL:

1. `curl -sSI https://neutralai.co.uk/` and confirm required headers/CSP.
2. `curl -sSI https://www.neutralai.co.uk/` and confirm canonical domain redirect.
3. `curl -sSI https://neutralai.co.uk/about` and confirm trailing slash behavior.
4. `curl -sSI https://neutralai.co.uk/use-cases/finance/` and confirm alias page remains reachable.
5. `curl -sS https://neutralai.co.uk/sitemap.xml` and verify launch-critical routes are present.
6. `curl -sS https://neutralai.co.uk/robots.txt` and confirm sitemap line and expected crawler policy.

## Rollback

1. Re-deploy the previous known-good static artifact via the hosting provider’s rollback mechanism.
2. Re-run the production URL smoke checks above.
3. If header/CSP regressions remain, re-apply host header configuration from `public/_headers` equivalent rules and redeploy.
4. Record the incident and rollback cause in issue [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78).

## Ownership and Ops Source of Truth

This repository is the source of truth for static behavior and verification commands. Private ops documentation is the source of truth for host-account execution details, explicit on-call mapping, and rollback operator access.

- Owner role: Platform/Infra
- Public tracking: [#78](https://github.com/nazifsohtaoglu/neutralai-website/issues/78) and `docs/ai/LAUNCH_READINESS_LEDGER.md`
- Private tracking expectation: maintain host-level redirect/header rule location (Cloudflare dashboard and/or IaC repository) and rollback on-call mapping in an access-controlled ops system.
