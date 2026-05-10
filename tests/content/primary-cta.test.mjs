import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
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
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /href=\{siteConfig\.signupUrl\}[\s\S]{0,180}>\s*Try Free/)
  assert.match(homeSource, /href="\/contact"[\s\S]{0,180}>\s*Book Demo/)
  assert.match(homeSource, /className="text-primary-light[^"]*"[\s\S]{0,80}>\s*Install browser extension/)
  assert.doesNotMatch(homeSource, /className="btn btn-cta[^"]*"[\s\S]{0,120}>\s*Install Extension/)
})

test('extension-focused homepage card keeps Try Free primary and install secondary', () => {
  const homeSource = readSource('app/page.tsx')

  assert.match(
    homeSource,
    /Same tab\.[\s\S]*href=\{siteConfig\.signupUrl\}[\s\S]{0,180}>\s*Try Free/
  )
  assert.match(
    homeSource,
    /Same tab\.[\s\S]*href="\/install-extension" className="btn btn-secondary[^"]*"[\s\S]{0,120}>\s*Install Browser Extension/
  )
  assert.doesNotMatch(homeSource, /Plan Enterprise Rollout/)
})

test('final CTA keeps Try Free as the primary action and sales as secondary', () => {
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /function FinalCta\(\)[\s\S]*href=\{siteConfig\.signupUrl\}[\s\S]{0,180}>\s*Try Free/)
  assert.match(homeSource, /function FinalCta\(\)[\s\S]*href="\/contact"[\s\S]{0,180}>\s*Talk to Sales/)
})

test('public positioning avoids beta and pilot language', () => {
  const publicPositioningSources = [
    'app/page.tsx',
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
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /AI Security Gateway - Now Available/)
  assert.doesNotMatch(homeSource, /Engagement Paths/)
  assert.doesNotMatch(homeSource, /guided rollout phase/i)
})

test('homepage pricing is a short snapshot that points to detailed pricing', () => {
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /eyebrow="Pricing"/)
  assert.match(homeSource, /A quick pricing snapshot, not the full catalog/)
  assert.match(homeSource, /pricingSnapshots/)
  assert.match(homeSource, /Free or £29/)
  assert.match(homeSource, /£99 Team/)
  assert.match(homeSource, /£299\+/)
  assert.match(homeSource, /href="\/pricing"[\s\S]{0,120}>\s*View Detailed Pricing/)
  assert.match(homeSource, /href=\{siteConfig\.signupUrl\}[\s\S]{0,120}>\s*Start Free/)
  assert.doesNotMatch(homeSource, /const pricingPlans =/)
  assert.doesNotMatch(homeSource, /primaryPricingPlans/)
  assert.doesNotMatch(homeSource, /advancedPricingPlans/)
  assert.doesNotMatch(homeSource, /\$499/)
  assert.doesNotMatch(homeSource, />USD</)
  assert.doesNotMatch(homeSource, /monthlyPrice: '£249'/)
  assert.doesNotMatch(homeSource, /monthlyPrice: '£749'/)
})

test('homepage pricing keeps model-spend boundaries but leaves details to pricing page', () => {
  const homeSource = readSource('app/page.tsx')

  assert.match(homeSource, /Plans include masking requests/)
  assert.match(homeSource, /managed AI credits are deliberately small/i)
  assert.match(homeSource, /BYOK, customer provider accounts, or prepaid top-ups/)
  assert.doesNotMatch(homeSource, /Annual billing saves 20%/)
  assert.doesNotMatch(homeSource, /Tier comparison/)
  assert.doesNotMatch(homeSource, /Why show pricing before a sales call\?/)
})
