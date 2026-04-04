import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, Link2, Lock, Shield } from 'lucide-react'
import { extensionLinks, siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Public privacy policy for NeutralAI Interceptor, covering supported hosts, sign-in flow, API flow, and metadata-only telemetry posture.',
  alternates: {
    canonical: '/privacy',
  },
}

const supportedHosts = [
  'chatgpt.com',
  'claude.ai',
  'gemini.google.com',
  'perplexity.ai',
  'copilot.microsoft.com',
  'chat.deepseek.com',
] as const

const authEndpoints = [
  extensionLinks.signIn,
  extensionLinks.session,
  extensionLinks.authContext,
] as const

const apiEndpoints = [
  extensionLinks.mask,
  extensionLinks.remoteConfig,
  extensionLinks.telemetry,
] as const

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">NeutralAI Interceptor</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              Browser extension privacy policy
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              This privacy page exists for browser store review and public reference. It explains how NeutralAI Interceptor operates on supported AI web apps, what service endpoints it contacts, and what telemetry posture the product is designed to maintain.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold">Supported AI hosts only</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                NeutralAI Interceptor is intended to run only on supported AI web applications where prompt masking is applied before submission. It does not request broad host access across arbitrary browsing activity.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {supportedHosts.map((host) => (
                  <li key={host} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-slate-300">
                    {host}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold">Telemetry and prompt handling</h2>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-400">
                <p>
                  NeutralAI’s extension telemetry is intended to be metadata-only so service health, retry behaviour, and policy refresh state can be observed without treating prompt content as analytics payload.
                </p>
                <p>
                  Prompt or message body storage is not the intended telemetry behaviour. Browser store reviewers and customers should evaluate the extension in the context of the dedicated masking flow rather than as a prompt-capture product.
                </p>
                <p>
                  For support, install guidance, or review notes, use the linked support and install pages below.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 text-sm">
                <Link href={extensionLinks.support} className="text-primary-light hover:text-primary">
                  Browser extension support page
                </Link>
                <Link href={extensionLinks.install} className="text-primary-light hover:text-primary">
                  Install page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold">Auth flow endpoints</h2>
              <ul className="mt-6 space-y-4">
                {authEndpoints.map((endpoint) => (
                  <li key={endpoint} className="rounded-2xl border border-border bg-background px-4 py-4 text-sm text-slate-300">
                    {endpoint}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold">API flow endpoints</h2>
              <ul className="mt-6 space-y-4">
                {apiEndpoints.map((endpoint) => (
                  <li key={endpoint} className="rounded-2xl border border-border bg-background px-4 py-4 text-sm text-slate-300">
                    {endpoint}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-400">
                The masking API boundary currently runs at {siteConfig.apiBaseUrl}. Public health and readiness endpoints are available separately at the same domain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
