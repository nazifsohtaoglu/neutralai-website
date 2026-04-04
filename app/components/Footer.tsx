'use client'

import Link from 'next/link'
import { contactLinks, homeSections, siteConfig } from '../site'

const productLinks = [
  { label: 'Problem', href: homeSections.problem },
  { label: 'How It Works', href: homeSections.howItWorks },
  { label: 'Why Trust Us', href: homeSections.trust },
  { label: 'Pricing', href: homeSections.pricing },
] as const

const launchLinks = [
  { label: 'API Health', href: siteConfig.apiHealthUrl },
  { label: 'Readiness Check', href: siteConfig.apiReadyUrl },
  { label: 'Install Extension', href: '/install-extension' },
  { label: 'Extension Support', href: '/support/browser-extension' },
  { label: 'Security Overview', href: '/security' },
  { label: 'Beta Access', href: contactLinks.betaAccessMailto },
] as const

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'About', href: '/about' },
] as const

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')

  if (isExternal) {
    return (
      <a
        href={href}
        className="hover:text-primary transition-colors"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className="hover:text-primary transition-colors">
      {label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))] mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="NeutralAI" className="w-10 h-10 rounded-lg" />
              <span className="font-heading font-bold text-xl">NeutralAI</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              A security gateway for teams that need AI productivity without exposing regulated or sensitive data.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
              <span className="h-2 w-2 rounded-full bg-accent-success animate-pulse" />
              Public beta with live health endpoints
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-400">
              <a href={contactLinks.betaAccessMailto} className="block hover:text-primary transition-colors">
                {siteConfig.contactEmail}
              </a>
              <a href={contactLinks.supportMailto} className="block hover:text-primary transition-colors">
                {siteConfig.supportEmail}
              </a>
              <a href={contactLinks.securityMailto} className="block hover:text-primary transition-colors">
                {siteConfig.securityEmail}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Launch</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {launchLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NeutralAI Ltd. Built for compliant AI adoption.
          </p>
          <div className="flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:gap-6">
            <a href={contactLinks.betaAccessMailto} className="hover:text-primary transition-colors">
              {siteConfig.contactEmail}
            </a>
            <a href={contactLinks.privacyMailto} className="hover:text-primary transition-colors">
              {siteConfig.privacyEmail}
            </a>
            <a href={contactLinks.securityMailto} className="hover:text-primary transition-colors">
              {siteConfig.securityEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
