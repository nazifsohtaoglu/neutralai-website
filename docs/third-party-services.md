# Third-Party Services Register

Use this file as the canonical register for website-related third-party services. Track account ownership, setup status, public environment variables, and dashboard links here before adding another external script, SDK, form, pixel, or store dependency.

Do not commit secret values, private API keys, webhook secrets, OAuth client secrets, billing details, or personal account credentials. Store those in the approved password manager and deployment environment.

## Tracking Rules

- Every third-party service needs an owner, setup status, and tracking issue or PR.
- Create company/workspace accounts with a shared business identity, not a developer's personal account, unless the service forces an individual owner.
- Enable 2FA and record recovery ownership outside the repo.
- Keep production and staging projects separate when the service supports it.
- Add environment variable names here, but never their values.
- Keep dashboard, funnel, form, or store listing links in this file after they exist.
- Do not add non-essential tracking until analytics consent, privacy copy, and ownership are approved.

## Current Services

| Service | Purpose | Account / Workspace Status | Required Config | Tracking |
| --- | --- | --- | --- | --- |
| PostHog | Consent-gated product analytics dashboards, funnels, CTA and playground events. | Needs approved workspace/project, region, owner, dashboard links, and deployment env values. | `NEXT_PUBLIC_POSTHOG_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST` | Issue #61, PR #63, `docs/analytics-setup.md` |
| Plausible | Consent-gated lightweight website analytics and goals. | Needs confirmed site/workspace, dashboard owner, domain, and goal/funnel links. | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, optional `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` | WEB-107 open question, `docs/analytics-setup.md` |
| HubSpot | Contact, demo, enterprise, and security-review lead forms and CRM routing. | Needs live portal, region, form IDs, contact properties, routing, notifications, and confirmation emails. | `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, `NEXT_PUBLIC_HUBSPOT_REGION`, `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID`, `NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID`, `NEXT_PUBLIC_HUBSPOT_ENTERPRISE_FORM_ID`, `NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID` | WEB-106 open question, `docs/hubspot-crm-setup.md` |
| Slack | Internal lead notifications from HubSpot or another approved automation layer. | Needs approved workspace/channel and integration owner before webhook or app setup. | Do not expose webhook URLs in the repo. | Tracked through HubSpot setup until a separate automation ticket exists. |
| Cloudflare | Security headers, possible Cloudflare analytics endpoint allowance, and deployment/network posture if used by hosting. | Needs confirmed account/project ownership if Cloudflare is the production edge or analytics provider. | Public CSP currently allows `cloudflareinsights.com`; no repo secret should be committed. | Add a dedicated infra issue if Cloudflare ownership is not already documented. |
| Chrome Web Store | NeutralAI Interceptor listing and install route. | Listing URL exists; account ownership and release process should be confirmed outside this website repo. | `siteConfig.chromeExtensionUrl` | Extension release/support workflow. |
| Microsoft Edge Add-ons | NeutralAI Interceptor Edge listing and install route. | Listing URL exists; Partner Center ownership and release process should be confirmed outside this website repo. | `siteConfig.edgeExtensionUrl` | Extension release/support workflow. |
| Google Fonts | Public font stylesheet loaded by the site CSP. | No product account normally required. Review if privacy policy changes require self-hosting fonts. | CSP allows `fonts.googleapis.com` and `fonts.gstatic.com`. | Dependency/privacy review. |
| GitHub | Source control, issues, PRs, CI, and repository automation. | Active repository exists. Use GitHub issues/PRs as the operational tracker for setup work. | Repository secrets must stay in GitHub/deployment settings, not the repo. | This repo and PRs/issues. |

## Missing Account Setup Checklist

Use this checklist when a service moves from planned to active:

- Company account or workspace created/selected.
- Admin owner and backup owner assigned.
- 2FA/recovery ownership confirmed.
- Production and staging projects separated or explicitly deemed unnecessary.
- Public environment variables added to deployment settings.
- Secret values stored outside the repo.
- Consent/privacy impact reviewed.
- Dashboard/form/funnel/listing links added below.
- Smoke test result recorded in the linked PR or issue.

## Live Links

Fill these in after account setup. Leave blank until the link exists.

| Service | Production Link | Staging / Test Link | Owner |
| --- | --- | --- | --- |
| PostHog project |  |  |  |
| PostHog team dashboard |  |  |  |
| PostHog landing page funnel |  |  |  |
| PostHog product/docs funnel |  |  |  |
| PostHog playground funnel |  |  |  |
| Plausible site dashboard |  |  |  |
| HubSpot portal |  |  |  |
| HubSpot contact form |  |  |  |
| HubSpot demo form |  |  |  |
| HubSpot enterprise form |  |  |  |
| HubSpot security-review form |  |  |  |
| Slack lead notification channel |  |  |  |
| Cloudflare project |  |  |  |
| Chrome Web Store listing | https://chromewebstore.google.com/detail/neutralai-interceptor/gpdjigfhopjabaodmnombeoldieoobnh |  |  |
| Microsoft Edge Add-ons listing | https://microsoftedge.microsoft.com/addons/detail/neutralai-interceptor/agdhbinchoiapijeicfgdmkoekolefkg |  |  |

