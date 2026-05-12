'use client'

import Link from 'next/link'
import Image from 'next/image'
import { contactLinks, homeSections, siteConfig } from '../site'

const productLinks = [
  { label: 'Problem', href: homeSections.problem },
  { label: 'How It Works', href: homeSections.howItWorks },
  { label: 'Why Trust Us', href: homeSections.trust },
  { label: 'Compare', href: homeSections.compare },
  { label: 'Playground', href: '/playground' },
  { label: 'Demo', href: siteConfig.demoUrl },
  { label: 'Finance Use Case', href: '/use-cases/finance' },
  { label: 'Healthcare Use Case', href: '/use-cases/healthcare' },
  { label: 'Blog', href: '/blog' },
  { label: 'Presidio Alternative', href: '/presidio-alternative' },
  { label: 'Pricing', href: homeSections.pricing },
] as const

const launchLinks = [
  { label: 'API Health', href: siteConfig.apiHealthUrl },
  { label: 'Readiness Check', href: siteConfig.apiReadyUrl },
  { label: 'Playground', href: '/playground' },
  { label: 'Try Free', href: siteConfig.signupUrl },
  { label: 'Book Demo', href: siteConfig.demoUrl },
  { label: 'Install Extension', href: '/install-extension' },
  { label: 'Extension Support', href: '/support/browser-extension' },
] as const

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'Trust Center', href: '/trust-center' },
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
    <footer className="relative mt-10 overflow-hidden border-t border-border/80 bg-background-secondary md:mt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_22%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_18%)]" />
      <div className="container-custom relative py-8 md:py-10">
        <div className="mb-6 grid gap-6 md:grid-cols-[1.15fr_repeat(3,minmax(0,1fr))]">
          <div>
            <Link href="/" className="mb-2 flex items-center gap-2">
              <Image src="/logo-sm.webp" alt="NeutralAI" width={40} height={40} className="w-10 h-10 rounded-lg" />
              <span className="font-heading font-bold text-xl">NeutralAI</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              A security gateway for teams that need AI productivity without exposing regulated or sensitive data.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] text-primary-light">
              <span className="h-2 w-2 rounded-full bg-accent-success animate-pulse" />
              Live and operational
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-heading font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-heading font-semibold">Launch</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {launchLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-heading font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/80 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NeutralAI Ltd. Built for security-conscious AI adoption.
          </p>
          <div className="flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-4">
            <a href={contactLinks.demoMailto} className="hover:text-primary transition-colors">
              {siteConfig.salesEmail}
            </a>
            <a href={contactLinks.supportMailto} className="hover:text-primary transition-colors">
              {siteConfig.supportEmail}
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
