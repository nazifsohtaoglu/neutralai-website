# Analytics Setup

NeutralAI website analytics must stay consent-gated. Do not add analytics cookies, tracking scripts, replay tools, or advertising pixels before the visitor accepts analytics.

## Provider

The website is wired for Plausible through public environment variables:

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` defaults to `https://plausible.io/js/script.js`

If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is missing, the consent banner still records the visitor's choice locally, but no third-party analytics script is loaded.

## Consent Behaviour

- Analytics script loading is blocked until the visitor accepts analytics.
- Declining analytics stores only the consent choice.
- UTM attribution is persisted in `localStorage` only after analytics consent is accepted.
- CTA and playground events are ignored when analytics consent is not accepted.

## Events

Use these names when creating Plausible goals/funnels:

- `CTA Click`
- `Playground Mask Submit`
- `Playground Mask Button Click`
- `Playground Result Copy`

Recommended funnel views:

- Homepage -> pricing anchor -> signup handoff.
- Homepage -> playground -> signup handoff.
- Homepage/demo/blog -> contact intent page.

## Attribution

After consent, the website stores and attaches:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer_host`
- `landing_page_path`

HubSpot forms also attempt to pass these values as hidden fields when the matching HubSpot properties exist.

## Dashboard Setup Outside The Repo

- Create or confirm the Plausible site.
- Add the production domain to `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- Create goals for CTA clicks and playground interactions.
- Build the three recommended funnels.
- Confirm dashboard access for the team.
- Run one consent-accepted smoke test and one consent-declined smoke test after deployment.
