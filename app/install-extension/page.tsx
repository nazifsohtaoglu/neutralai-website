import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Chrome, Download, ExternalLink, ShieldCheck } from 'lucide-react'
import { extensionLinks, siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'Install Browser Extension',
  description:
    'Install NeutralAI Interceptor for Chrome or Edge, or start an enterprise rollout for managed browser deployments.',
  alternates: {
    canonical: '/install-extension',
  },
}

const installOptions = [
  {
    title: 'Install for Chrome',
    description:
      'Use this route for Chrome Web Store rollout once the public listing is approved. Until then, we will route pilots through direct support.',
    href: siteConfig.chromeExtensionUrl || extensionLinks.supportMailto,
    label: siteConfig.chromeExtensionUrl ? 'Open Chrome listing' : 'Request Chrome pilot access',
    external: true,
    icon: Chrome,
  },
  {
    title: 'Install for Edge',
    description:
      'Use this route for Microsoft Edge Add-ons rollout. If the public listing is not yet live, we will guide pilot installs directly.',
    href: siteConfig.edgeExtensionUrl || extensionLinks.supportMailto,
    label: siteConfig.edgeExtensionUrl ? 'Open Edge listing' : 'Request Edge pilot access',
    external: true,
    icon: Download,
  },
  {
    title: 'Enterprise rollout',
    description:
      'For managed deployments, we provide force-install and managed policy guidance for Chrome Enterprise and Microsoft Edge.',
    href: extensionLinks.support,
    label: 'Review enterprise rollout guidance',
    external: false,
    icon: BriefcaseBusiness,
  },
] as const

const signInSteps = [
  extensionLinks.signIn,
  extensionLinks.session,
  extensionLinks.authContext,
] as const

export default function InstallExtensionPage() {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">NeutralAI Interceptor</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              Install the browser extension without guessing the rollout path
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              NeutralAI Interceptor masks sensitive prompt data before it leaves supported AI web applications. This page is the public install reference for pilots, browser store review, and managed enterprise rollout.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {installOptions.map((option) => {
              const Icon = option.icon
              const content = (
                <div className="card h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mt-5 font-heading text-2xl font-semibold">{option.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{option.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-light">
                    <span>{option.label}</span>
                    {option.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </div>
                </div>
              )

              if (option.external) {
                return (
                  <a key={option.title} href={option.href} target="_blank" rel="noreferrer" className="block">
                    {content}
                  </a>
                )
              }

              return (
                <Link key={option.title} href={option.href} className="block">
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Self-serve sign-in</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">How unmanaged installs authenticate</h2>
              <p className="mt-4 text-slate-400">
                The extension uses the NeutralAI app domain for sign-in, session checks, and short-lived auth context retrieval. During store review or pilot onboarding, these public URLs should be reachable and documented.
              </p>
              <ul className="mt-6 space-y-4">
                {signInSteps.map((step) => (
                  <li key={step} className="rounded-2xl border border-border bg-background px-4 py-4 text-sm text-slate-300">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">What the extension does</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Single-purpose behaviour</h2>
              <p className="mt-4 text-slate-400">
                NeutralAI Interceptor helps users mask sensitive prompt data before it is submitted from supported AI web applications. It is designed to run on supported AI hosts, call the NeutralAI API boundary, and avoid remotely hosted executable code.
              </p>
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-slate-200">
                <ShieldCheck className="mb-3 h-5 w-5 text-primary-light" />
                Need a managed rollout instead of a self-serve pilot? Use the enterprise route from the support page and we will help with policy-based deployment.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
