# Analytics Setup

NeutralAI website analytics must stay consent-gated. Do not add analytics cookies, tracking scripts, replay tools, or advertising pixels before the visitor accepts analytics.

## Providers

The website can send consent-gated events to Plausible and PostHog. Keep both providers disabled until their public environment variables are configured in the deployment environment.

### Plausible

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` defaults to `https://plausible.io/js/script.js`

If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is missing, the consent banner still records the visitor's choice locally, but no third-party analytics script is loaded.

### PostHog

- `NEXT_PUBLIC_POSTHOG_TOKEN`
- `NEXT_PUBLIC_POSTHOG_HOST` defaults to `https://us.i.posthog.com`

If `NEXT_PUBLIC_POSTHOG_TOKEN` is missing, no PostHog client is initialized and no PostHog events are queued. Choose the host that matches the PostHog project region or approved self-hosted endpoint before setting production variables.

## Consent Behaviour

- Analytics script loading is blocked until the visitor accepts analytics.
- Declining analytics stores only the consent choice.
- UTM attribution is persisted in `localStorage` only after analytics consent is accepted.
- CTA and playground events are ignored when analytics consent is not accepted.
- PostHog is dynamically initialized only after accepted analytics consent.
- PostHog autocapture and session recording are disabled; the site sends only explicit pageview, CTA, and playground events.

## Events

Use these names when creating Plausible goals or PostHog insights/funnels:

- `$pageview` for PostHog page views.
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

## PostHog Dashboard And Funnel Setup

Current status: repo wiring and setup specification are ready, but live dashboard/funnel links still require access to the approved PostHog workspace.

Record live links here after setup:

- PostHog project:
- Team dashboard:
- Landing page to conversion funnel:
- Product/docs route to conversion funnel:
- Playground engagement funnel:

Recommended dashboard cards:

- Traffic by page path from `$pageview`.
- CTA clicks by `placement`, `label`, and `destination`.
- Conversion-intent clicks where `destination` contains `/contact` or the app signup host.
- Playground engagement from `Playground Mask Submit`, `Playground Mask Button Click`, and `Playground Result Copy`.
- Campaign attribution by `utm_source`, `utm_medium`, `utm_campaign`, and `landing_page_path`.

Recommended funnels:

- Landing page: `$pageview` where `page_path` is `/` -> `CTA Click` where `placement` is `homepage_hero`, `homepage_product_surface`, or `homepage_final_cta` -> conversion-intent `CTA Click`.
- Demo flow: `$pageview` where `page_path` is `/demo` -> `CTA Click` where `placement` is `demo_hero` or `demo_bottom_cta` -> conversion-intent `CTA Click`.
- Playground flow: `$pageview` where `page_path` is `/playground` -> `Playground Mask Submit` or `Playground Mask Button Click` -> `CTA Click` where `placement` is `playground_bottom_cta` or `playground_hero`.
- Content/product exploration: `$pageview` where `page_path` starts with `/blog`, `/compare`, `/developers`, `/trust-center`, or `/use-cases` -> `CTA Click` -> conversion-intent `CTA Click`.

Post-deployment smoke checks:

- With no consent choice, confirm no PostHog requests are sent.
- After declining analytics, confirm no PostHog requests are sent.
- After accepting analytics, confirm `$pageview` and an explicit CTA event arrive with no prompt content or form field values.
