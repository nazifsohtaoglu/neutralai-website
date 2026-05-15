import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('analytics script is consent-gated and env configured', () => {
  const layoutSource = readSource('app/layout.tsx')
  const siteSource = readSource('app/site.ts')
  const providerSource = readSource('app/components/AnalyticsProvider.tsx')
  const analyticsSource = readSource('app/lib/analytics.ts')

  assert.match(layoutSource, /<AnalyticsProvider \/>/)
  assert.match(siteSource, /NEXT_PUBLIC_PLAUSIBLE_DOMAIN/)
  assert.match(siteSource, /NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL/)
  assert.match(siteSource, /NEXT_PUBLIC_POSTHOG_TOKEN/)
  assert.match(siteSource, /NEXT_PUBLIC_POSTHOG_HOST/)
  assert.match(providerSource, /consent === 'accepted'/)
  assert.match(providerSource, /<Script/)
  assert.match(providerSource, /data-domain=\{siteConfig\.analytics\.plausibleDomain\}/)
  assert.match(providerSource, /No analytics runs until you accept/)
  assert.match(analyticsSource, /ANALYTICS_CONSENT_KEY/)
  assert.match(analyticsSource, /hasAnalyticsConsent\(\)/)
  assert.match(analyticsSource, /initializePostHog/)
  assert.match(analyticsSource, /posthog-js\/dist\/module\.no-external/)
  assert.match(analyticsSource, /disable_session_recording: true/)
  assert.match(analyticsSource, /autocapture: false/)
})

test('conversion tracking captures CTA clicks and playground events without prompt content', () => {
  const providerSource = readSource('app/components/AnalyticsProvider.tsx')
  const heroSource = readSource('app/components/home/Hero.tsx')
  const ctaSource = readSource('app/components/home/CtaSection.tsx')
  const navbarSource = readSource('app/components/Navbar.tsx')
  const demoSource = readSource('app/demo/page.tsx')
  const playgroundSource = readSource('app/playground/page.tsx')

  assert.match(providerSource, /\[data-analytics-event\]/)
  assert.match(providerSource, /dataset\.analyticsEvent/)
  assert.match(heroSource, /data-analytics-label="Try Free"/)
  assert.match(heroSource, /data-analytics-label="Book Demo"/)
  assert.match(ctaSource, /data-analytics-label="Talk to Sales"/)
  assert.match(navbarSource, /data-analytics-label="Get Started Free"/)
  assert.match(demoSource, /data-analytics-placement="demo_hero"/)
  assert.match(playgroundSource, /trackAnalyticsEvent\('Playground Mask Submit'/)
  assert.match(playgroundSource, /trackAnalyticsEvent\('Playground Result Copy'/)
  assert.match(playgroundSource, /prompt_length: prompt\.length/)
  assert.doesNotMatch(playgroundSource, /trackAnalyticsEvent\([^)]*prompt[,}]/)
})

test('posthog dashboard and funnel setup is documented', () => {
  const analyticsDocs = readSource('docs/analytics-setup.md')
  const headersSource = readSource('public/_headers')
  const openQuestions = readSource('docs/ai/OPEN_QUESTIONS.md')
  const launchLedger = readSource('docs/ai/LAUNCH_READINESS_LEDGER.md')

  assert.match(analyticsDocs, /PostHog Dashboard And Funnel Setup/)
  assert.match(analyticsDocs, /Team dashboard:/)
  assert.match(analyticsDocs, /Landing page to conversion funnel:/)
  assert.match(analyticsDocs, /Product\/docs route to conversion funnel:/)
  assert.match(analyticsDocs, /Playground engagement funnel:/)
  assert.match(analyticsDocs, /no prompt content or form field values/)
  assert.match(headersSource, /https:\/\/us\.i\.posthog\.com/)
  assert.match(headersSource, /https:\/\/eu\.i\.posthog\.com/)
  assert.match(openQuestions, /Launch blockers are tracked in `docs\/ai\/LAUNCH_READINESS_LEDGER\.md`\./)
  assert.match(launchLedger, /PostHog production dashboards and funnel ownership/)
  assert.match(launchLedger, /\[#61\]\(https:\/\/github\.com\/nazifsohtaoglu\/neutralai-website\/issues\/61\)/)
})

test('utm attribution persists after consent and can enrich HubSpot leads', () => {
  const analyticsSource = readSource('app/lib/analytics.ts')
  const hubspotSource = readSource('app/components/HubSpotLeadForm.tsx')
  const analyticsDocs = readSource('docs/analytics-setup.md')
  const hubspotDocs = readSource('docs/hubspot-crm-setup.md')
  const launchLedger = readSource('docs/ai/LAUNCH_READINESS_LEDGER.md')

  for (const field of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer_host', 'landing_page_path']) {
    assert.match(analyticsSource, new RegExp(field))
    assert.match(analyticsDocs, new RegExp(field))
    assert.match(hubspotDocs, new RegExp(field))
  }

  assert.match(analyticsSource, /ANALYTICS_ATTRIBUTION_KEY/)
  assert.match(analyticsSource, /captureAttribution/)
  assert.match(analyticsSource, /function mergeAttribution/)
  assert.match(analyticsSource, /stored\.landing_page_path/)
  assert.match(hubspotSource, /getLeadAttribution/)
  assert.match(hubspotSource, /Object\.entries\(getLeadAttribution\(\)\)/)
  assert.match(launchLedger, /HubSpot production forms, routing, and lead ownership/)
  assert.match(launchLedger, /\[#70\]\(https:\/\/github\.com\/nazifsohtaoglu\/neutralai-website\/issues\/70\)/)
})
