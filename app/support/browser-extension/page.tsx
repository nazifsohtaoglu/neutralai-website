import type { Metadata } from 'next'
import Link from 'next/link'
import { AppWindow, ExternalLink, HardDrive, LockKeyhole, MonitorSmartphone, Radio, Shield } from 'lucide-react'
import { extensionLinks, siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'Browser Extension Support',
  description:
    'Public support reference for NeutralAI Interceptor, including permission rationale, host permission scope, sign-in flow, and enterprise rollout guidance.',
  alternates: {
    canonical: '/support/browser-extension',
  },
}

const permissionExplanations = [
  {
    permission: 'storage',
    icon: HardDrive,
    explanation:
      'Used to store extension settings, managed policy values, cached auth state, and a bounded retry buffer for telemetry delivery.',
  },
  {
    permission: 'activeTab',
    icon: MonitorSmartphone,
    explanation:
      'Used to scope extension interaction to the active supported AI tab when the user opens the popup, instead of requesting broad access to all browsing activity.',
  },
  {
    permission: 'scripting',
    icon: Shield,
    explanation:
      'Used to run the extension’s packaged content-script logic on supported AI web apps so sensitive prompt content can be detected and masked before submission.',
  },
  {
    permission: 'alarms',
    icon: Radio,
    explanation:
      'Used to schedule lightweight background tasks such as remote configuration refresh and telemetry retry or flush without constant background polling.',
  },
  {
    permission: 'tabs',
    icon: AppWindow,
    explanation:
      'Used to open the NeutralAI sign-in page when an unmanaged user chooses to authenticate from the extension popup.',
  },
] as const

const integrationEndpoints = [
  extensionLinks.signIn,
  extensionLinks.session,
  extensionLinks.authContext,
  extensionLinks.mask,
  extensionLinks.remoteConfig,
  extensionLinks.telemetry,
] as const

export default function BrowserExtensionSupportPage() {
  return (
    <main className="min-h-screen pt-28">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Browser extension support</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              Public support reference for NeutralAI Interceptor
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              This is the canonical support page for browser store review, self-serve installs, and enterprise rollout conversations. It explains the extension’s limited purpose, requested permissions, and the NeutralAI-owned app and API surfaces it interacts with.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Requested permissions</p>
              <div className="mt-6 space-y-5">
                {permissionExplanations.map((item) => (
                  <div key={item.permission} className="rounded-2xl border border-border bg-background px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="font-heading text-xl font-semibold">{item.permission}</h2>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-8">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Support contact</p>
                <h2 className="mt-4 font-heading text-3xl font-bold">Need help or a review response?</h2>
                <a href={extensionLinks.supportMailto} className="mt-6 inline-flex items-center gap-2 text-lg text-primary-light hover:text-primary">
                  {siteConfig.supportEmail}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400">
                  <Link href={extensionLinks.install} className="hover:text-primary-light">
                    Install page
                  </Link>
                  <Link href={extensionLinks.privacy} className="hover:text-primary-light">
                    Privacy page
                  </Link>
                  <a href={siteConfig.securityTxtPath} className="hover:text-primary-light">
                    /.well-known/security.txt
                  </a>
                </div>
              </div>

              <div className="card p-8">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Review notes</p>
                <div className="mt-4 space-y-4 text-sm leading-6 text-slate-400">
                  <p>
                    Host permissions are limited to supported AI web applications where prompt masking runs, plus NeutralAI-owned app and API domains used for session detection, auth context, masking, remote configuration, and telemetry.
                  </p>
                  <p>
                    The extension does not use remotely hosted executable code. All executable logic is packaged in the extension bundle. Network requests are only made to NeutralAI APIs for session detection, auth context, masking, remote configuration, and telemetry.
                  </p>
                  <p>
                    Self-serve users authenticate through the NeutralAI app sign-in path, while enterprise customers can deploy managed policies and force-install the extension through browser management tooling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Self-serve auth flow</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Public app and API endpoints</h2>
              <ul className="mt-6 space-y-4">
                {integrationEndpoints.map((endpoint) => (
                  <li key={endpoint} className="rounded-2xl border border-border bg-background px-4 py-4 text-sm text-slate-300">
                    {endpoint}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Enterprise rollout</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Policy-managed deployment</h2>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-400">
                <p>
                  Enterprise customers can deploy NeutralAI Interceptor with managed browser policies so the extension is force-installed, pinned, and locked to organization-controlled NeutralAI endpoints.
                </p>
                <p>
                  That rollout path is separate from self-serve sign-in and is the recommended approach for regulated teams or centrally managed browser fleets.
                </p>
              </div>
              <Link
                href={extensionLinks.install}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-medium text-primary-light transition-colors hover:bg-primary/20"
              >
                Review install options
                <LockKeyhole className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
