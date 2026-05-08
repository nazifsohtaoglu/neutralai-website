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
