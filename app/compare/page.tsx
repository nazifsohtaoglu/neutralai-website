import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  Lock,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'Compare NeutralAI',
  description:
    'A feature-based comparison of NeutralAI against do-it-yourself PII masking for regulated AI workflows.',
  alternates: {
    canonical: '/compare',
  },
}

const comparisonRows = [
  {
    capability: 'Prompt PII detection',
    diy: 'Possible with open-source primitives, but calibration, testing, and maintenance stay with your team.',
    neutralai: 'Built into the gateway with entity coverage, policy controls, and benchmark evidence.',
  },
  {
    capability: 'Reversible tokenization',
    diy: 'Requires a secure vault, cryptography choices, authorization checks, and audit trails.',
    neutralai: 'Encrypted token vault designed for governed restore paths and compliance review.',
  },
  {
    capability: 'Compliance evidence',
    diy: 'Usually assembled manually from logs, screenshots, and after-the-fact explanations.',
    neutralai: 'Control events, health checks, and benchmark artifacts are designed to support audit conversations.',
  },
  {
    capability: 'Browser AI protection',
    diy: 'Needs extension engineering, store review, provider-specific DOM handling, and rollout support.',
    neutralai: 'Chrome and Edge extension paths are part of the product surface.',
  },
  {
    capability: 'Deployment model',
    diy: 'You own every production hardening and hosting decision.',
    neutralai: 'Managed SaaS, private cloud, and on-prem rollout paths are available for different risk postures.',
  },
] as const

const proofPoints = [
  {
    icon: ShieldCheck,
    title: 'Gateway boundary',
    body: 'NeutralAI sits before the model provider so policy can run before sensitive values leave the workflow.',
  },
  {
    icon: KeyRound,
    title: 'Token vault',
    body: 'Sensitive values can be transformed into governed references instead of being sent as raw text.',
  },
  {
    icon: ClipboardCheck,
    title: 'Audit story',
    body: 'Operational evidence and benchmark artifacts give buyers something concrete to review.',
  },
] as const

export default function ComparePage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <BackButton />

          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Build vs Buy</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              More than a PII detector. A control layer your buyers can approve.
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-400">
              Open-source detection is a useful ingredient. Regulated AI adoption needs the rest of the operating model:
              vaulting, policy enforcement, browser coverage, telemetry, and evidence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={siteConfig.signupUrl} className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Try Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.title} className="accent-card rounded-[24px] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <point.icon className="h-6 w-6 text-primary-light" />
                </div>
                <h2 className="mt-5 font-heading text-2xl font-semibold">{point.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Feature Comparison</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              The hard part is not masking once. It is making it safe to operate.
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-background/80">
            <div className="grid border-b border-white/10 bg-white/[0.04] text-sm font-semibold text-slate-200 md:grid-cols-[0.8fr_1fr_1fr]">
              <div className="px-5 py-4">Capability</div>
              <div className="px-5 py-4">DIY detector path</div>
              <div className="px-5 py-4">NeutralAI</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.capability} className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr]">
                <div className="px-5 py-5 font-heading text-lg font-semibold text-white">{row.capability}</div>
                <div className="flex gap-3 px-5 py-5 text-sm leading-6 text-slate-400">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#fdba74]" />
                  <span>{row.diy}</span>
                </div>
                <div className="flex gap-3 px-5 py-5 text-sm leading-6 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                  <span>{row.neutralai}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-primary/20 bg-primary/10 p-5 text-sm leading-7 text-slate-200">
            <BadgeCheck className="mb-3 h-5 w-5 text-primary-light" />
            NeutralAI uses proven detection primitives where they make sense, but the product value is the full compliance
            gateway around them: policy, vaulting, evidence, deployment, and browser coverage.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_22%)] px-6 py-10 text-center md:px-10">
            <Lock className="mx-auto h-9 w-9 text-primary-light" />
            <h2 className="mt-5 font-heading text-3xl font-bold md:text-5xl">Give security a reason to say yes.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Start with the managed product, then choose the deployment model that fits your governance needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={siteConfig.signupUrl} className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Try Free
              </Link>
              <Link href="/contact" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Plan Enterprise Rollout
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
