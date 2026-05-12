import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

function readHomepageSource() {
  return [
    'app/page.tsx',
    'app/data/homepage.ts',
    'app/components/home/CtaSection.tsx',
    'app/components/home/Hero.tsx',
    'app/components/home/PricingSection.tsx',
    'app/components/home/ProductSurface.tsx',
    'app/demo/page.tsx',
  ]
    .map(readSource)
    .join('\n')
}

test('site config exposes a working app signup/sandbox destination instead of a mailto fallback', () => {
  const siteSource = readSource('app/site.ts')

  assert.match(
    siteSource,
    /signupUrl:\s*'https:\/\/app\.neutralai\.co\.uk\/auth\/signin\?intent=signup&plan=starter&src=website_start_free_trial&callbackUrl=%2Fchat'/
  )
  assert.doesNotMatch(siteSource, /signupUrl:\s*'mailto:/)
  assert.doesNotMatch(siteSource, /signupUrl:\s*'https:\/\/app\.neutralai\.co\.uk\/auth\/signup/)
})

test('navbar primary CTA invites users to get started free', () => {
  const navbarSource = readSource('app/components/Navbar.tsx')

  assert.match(navbarSource, /Get Started Free/)
  assert.doesNotMatch(navbarSource, />\s*Try Free\s*</)
})

test('homepage hero uses Try Free, Book Demo, and a demoted extension install link', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /href=\{siteConfig\.signupUrl\}[\s\S]{0,320}>\s*Try Free/)
  assert.match(homeSource, /href=\{siteConfig\.demoUrl\}[\s\S]{0,320}>\s*Book Demo/)
  assert.match(homeSource, /className="text-primary-light[^"]*"[\s\S]{0,80}>\s*Install browser extension/)
  assert.doesNotMatch(homeSource, /className="btn btn-cta[^"]*"[\s\S]{0,120}>\s*Install Extension/)
})

test('demo page is ready for a hosted video and keeps a live-demo fallback', () => {
  const demoSource = readSource('app/demo/page.tsx')
  const siteSource = readSource('app/site.ts')
  const sitemapSource = readSource('app/sitemap.ts')
  const footerSource = readSource('app/components/Footer.tsx')
  const videoPath = join(root, 'public/demo/neutralai-product-walkthrough.webm')
  const voiceoverPath = join(root, 'public/demo/neutralai-product-walkthrough-voiceover.mp3')
  const captionsPath = join(root, 'public/demo/neutralai-product-walkthrough.vtt')
  const posterPath = join(root, 'public/demo/neutralai-product-walkthrough-poster.png')

  assert.match(siteSource, /demoUrl:\s*'\/demo'/)
  assert.match(siteSource, /demoVideoEmbedUrl:\s*''/)
  assert.match(siteSource, /demoVideoSrc:\s*'\/demo\/neutralai-product-walkthrough\.webm'/)
  assert.match(siteSource, /demoVideoCaptionsSrc:\s*'\/demo\/neutralai-product-walkthrough\.vtt'/)
  assert.match(demoSource, /siteConfig\.demoVideoEmbedUrl/)
  assert.match(demoSource, /siteConfig\.demoVideoSrc/)
  assert.match(demoSource, /<video/)
  assert.match(demoSource, /<track/)
  assert.match(demoSource, /loading="lazy"/)
  assert.match(demoSource, /Book Live Demo/)
  assert.match(demoSource, /Try Playground/)
  assert.match(demoSource, /Explore the self-guided demo path/)
  assert.ok(existsSync(videoPath), 'demo video asset should exist')
  assert.ok(statSync(videoPath).size > 100_000, 'demo video asset should not be empty')
  assert.ok(existsSync(voiceoverPath), 'demo voiceover source should exist')
  assert.ok(existsSync(captionsPath), 'demo video captions should exist')
  assert.ok(existsSync(posterPath), 'demo video poster should exist')
  assert.doesNotMatch(demoSource, /final asset needed/)
  assert.doesNotMatch(demoSource, /Recording checklist/)
  assert.ok(sitemapSource.includes("'/demo'"))
  assert.match(footerSource, /Book Demo/)
})

test('extension-focused homepage card keeps Try Free primary and install secondary', () => {
  const homeSource = readHomepageSource()

  assert.match(
    homeSource,
    /Same tab\.[\s\S]*href=\{siteConfig\.signupUrl\}[\s\S]{0,320}>\s*Try Free/
  )
  assert.match(
    homeSource,
    /Same tab\.[\s\S]*href="\/install-extension" className="btn btn-secondary[^"]*"[\s\S]{0,120}>\s*Install Browser Extension/
  )
  assert.doesNotMatch(homeSource, /Plan Enterprise Rollout/)
})

test('final CTA keeps Try Free as the primary action and sales as secondary', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /function CtaSection\(\)[\s\S]*href=\{siteConfig\.signupUrl\}[\s\S]{0,320}>\s*Try Free/)
  assert.match(homeSource, /function CtaSection\(\)[\s\S]*href=\{contactLinks\.enterprise\}[\s\S]{0,320}>\s*Talk to Sales/)
})

test('public positioning avoids beta and pilot language', () => {
  const publicPositioningSources = [
    'app/page.tsx',
    'app/data/homepage.ts',
    'app/components/home/CtaSection.tsx',
    'app/components/home/Hero.tsx',
    'app/components/home/PricingSection.tsx',
    'app/components/home/ProductSurface.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'app/components/Footer.tsx',
  ]

  for (const path of publicPositioningSources) {
    const source = readSource(path)

    assert.doesNotMatch(source, /\b(beta|pilot|pilots)\b/i, `${path} should not use beta or pilot language`)
  }
})

test('homepage uses confident availability and deployment framing', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /AI Security Gateway - Now Available/)
  assert.doesNotMatch(homeSource, /Engagement Paths/)
  assert.doesNotMatch(homeSource, /guided rollout phase/i)
})

test('homepage pricing shows approved GBP pricing and self-serve handoff URLs', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /eyebrow="Pricing"/)
  assert.doesNotMatch(homeSource, /Engagement Paths/)
  assert.match(homeSource, /name: 'Free'/)
  assert.match(homeSource, /monthlyPrice: '£0'/)
  assert.match(homeSource, /usage: '1,000 masking requests per month'/)
  assert.match(homeSource, /name: 'Starter'/)
  assert.match(homeSource, /monthlyPrice: '£29'/)
  assert.match(homeSource, /usage: '10K masking requests per month'/)
  assert.match(homeSource, /managedAiCredit: '£3 managed AI credit'/)
  assert.match(homeSource, /name: 'Team'/)
  assert.match(homeSource, /monthlyPrice: '£99'/)
  assert.match(homeSource, /usage: '100K masking requests per month'/)
  assert.match(homeSource, /managedAiCredit: '£10 managed AI credit'/)
  assert.match(homeSource, /name: 'Business'/)
  assert.match(homeSource, /monthlyPrice: '£299'/)
  assert.match(homeSource, /usage: '500K masking requests per month'/)
  assert.match(homeSource, /managedAiCredit: '£25 managed AI credit'/)
  assert.match(homeSource, /name: 'Enterprise'/)
  assert.match(homeSource, /monthlyPrice: 'Custom'/)
  assert.match(homeSource, />GBP</)
  assert.match(homeSource, /website_get_started/)
  assert.match(homeSource, /href: contactLinks\.enterprise/)
  assert.doesNotMatch(homeSource, /\$499/)
  assert.doesNotMatch(homeSource, />USD</)
  assert.doesNotMatch(homeSource, /monthlyPrice: '£249'/)
  assert.doesNotMatch(homeSource, /monthlyPrice: '£749'/)
})

test('homepage pricing includes annual billing context and buyer FAQ copy', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /Annual billing saves 20%/)
  assert.match(homeSource, /Plans include masking requests/)
  assert.match(homeSource, /Production model usage can run through BYOK/)
  assert.match(homeSource, /FAQ/)
  assert.match(homeSource, /Why show pricing before a sales call\?/)
  assert.match(homeSource, /What happens when managed AI credit runs out\?/)
  assert.match(homeSource, /When should a team move from Business to Enterprise\?/)
})

test('homepage pricing keeps primary plan cards scannable on desktop', () => {
  const homeSource = readHomepageSource()

  assert.match(homeSource, /primaryPricingPlans/)
  assert.match(homeSource, /advancedPricingPlans/)
  assert.match(homeSource, /Advanced controls/)
  assert.match(homeSource, /Business and Enterprise add governed rollout features/)
  assert.match(
    homeSource,
    /advancedPricingPlans\.map[\s\S]*annualBilling && 'annualBilled' in plan \? plan\.annualBilled : plan\.priceNote/
  )
  assert.match(homeSource, /Policy controls and evidence exports/)
  assert.match(homeSource, /Full API key lifecycle controls/)
  assert.match(homeSource, /Required SSO and SIEM export posture/)
  assert.match(homeSource, /Managed browser extension rollout/)
  assert.match(homeSource, /plan\.features\.map\(\(feature\)/)
  assert.match(homeSource, /lg:grid-cols-3/)
  assert.doesNotMatch(homeSource, /xl:grid-cols-5/)
})
