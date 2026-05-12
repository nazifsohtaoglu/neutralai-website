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
  assert.match(providerSource, /consent === 'accepted'/)
  assert.match(providerSource, /<Script/)
  assert.match(providerSource, /data-domain=\{siteConfig\.analytics\.plausibleDomain\}/)
  assert.match(providerSource, /No analytics runs until you accept/)
  assert.match(analyticsSource, /ANALYTICS_CONSENT_KEY/)
  assert.match(analyticsSource, /hasAnalyticsConsent\(\)/)
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

test('utm attribution persists after consent and can enrich HubSpot leads', () => {
  const analyticsSource = readSource('app/lib/analytics.ts')
  const hubspotSource = readSource('app/components/HubSpotLeadForm.tsx')
  const analyticsDocs = readSource('docs/analytics-setup.md')
  const hubspotDocs = readSource('docs/hubspot-crm-setup.md')
  const openQuestions = readSource('docs/ai/OPEN_QUESTIONS.md')

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
  assert.match(openQuestions, /WEB-107 needs a confirmed Plausible workspace/)
})
