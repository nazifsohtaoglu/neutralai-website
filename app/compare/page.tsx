import benchmarkFacts from '../data/benchmark-facts.json'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  KeyRound,
  Lock,
  Minus,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'NeutralAI vs Presidio vs Private AI vs Nightfall — PII Detection Comparison',
  description:
    'Compare NeutralAI against Presidio, Private AI, and Nightfall on PII detection accuracy, operational model, and compliance fit for regulated AI workflows.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'NeutralAI vs Presidio vs Private AI vs Nightfall',
    description:
      'PII detection benchmark evidence, capability comparison, and buyer questions to ask before choosing a vendor.',
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

// Numbers sourced directly from the NeutralAI 2026 benchmark post:
// /blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026
// Nightfall figures from their public marketing documentation (90–95% precision out of the box; 95% accuracy claim for AI-based detectors).
// Private AI figures: vendor-published narrative (precision/recall/F1 on ~45k-word dataset) — no single headline number cited in public sources.
const detectionRows = [
  {
    metric: 'Entity families attempted',
    neutralai: `${benchmarkFacts.coverage.neutralaiFamilies}, including the UK identity, financial and legal pack`,
    presidio: `${benchmarkFacts.coverage.baselineFamilies} of those ${benchmarkFacts.coverage.neutralaiFamilies} in a vanilla configuration`,
    privateAi: 'Reported separately per entity — no single headline number in public sources',
    nightfall: 'Not published as F1',
    source: 'NeutralAI 2026 benchmark; Presidio docs',
  },
  {
    metric: 'Holdout F1 — entity families both engines attempt',
    neutralai: benchmarkFacts.sharedEntityAccuracy.neutralaiF1,
    presidio: benchmarkFacts.sharedEntityAccuracy.baselineF1,
    privateAi: '—',
    nightfall: '—',
    source: 'NeutralAI 2026 benchmark (holdout split)',
  },
  {
    metric: 'PERSON entity holdout F1',
    neutralai: benchmarkFacts.holdoutSet.personF1,
    presidio: benchmarkFacts.sharedEntityAccuracy.personBaselineF1,
    privateAi: '—',
    nightfall: '—',
    source: 'NeutralAI 2026 benchmark (holdout split)',
  },
  {
    metric: 'Vendor precision claim (out of the box)',
    neutralai: 'See holdout F1 above',
    presidio: 'Community-dependent; no official claim',
    privateAi: 'Precision + recall published for ~45k-word dataset',
    nightfall: '90–95% precision (vendor claim)',
    source: 'Public vendor documentation',
  },
  {
    metric: 'Methodology reproducibility',
    neutralai: 'Public; entity scope + scorer documented',
    presidio: 'Open-source; reproducible by design',
    privateAi: 'Vendor-published narrative benchmark',
    nightfall: 'Marketing site claims; full methodology not public',
    source: 'NeutralAI benchmark; vendor docs',
  },
  {
    metric: 'Reversible masking (vault)',
    neutralai: 'AES-256-GCM encrypted token vault',
    presidio: 'Not included — requires bespoke build',
    privateAi: 'Available in paid tiers',
    nightfall: 'Redaction focused; vault model differs',
    source: 'Product documentation',
  },
  {
    metric: 'Gateway / proxy model',
    neutralai: 'Yes — sits before LLM provider',
    presidio: 'Library only — proxy requires custom build',
    privateAi: 'API service',
    nightfall: 'DLP / CASB model, not a prompt proxy',
    source: 'Product documentation',
  },
  {
    metric: 'Browser extension',
    neutralai: 'Chrome + Edge (store-published)',
    presidio: 'Not included',
    privateAi: 'Not included',
    nightfall: 'Limited; DLP focus',
    source: 'Product documentation',
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
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">
              NeutralAI vs Presidio vs Private AI vs Nightfall
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              More than a PII detector. A control layer your buyers can approve.
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-400">
              Open-source detection is a useful ingredient. Regulated AI adoption needs the rest of the operating model:
              vaulting, policy enforcement, browser coverage, telemetry, and evidence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={siteConfig.signupUrl}
                className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto"
                data-analytics-event="cta_click"
                data-analytics-label="Try Free"
                data-analytics-placement="compare_hero"
              >
                Try Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto"
                data-analytics-event="cta_click"
                data-analytics-label="Talk to Sales"
                data-analytics-placement="compare_hero"
              >
                Talk to Sales
              </Link>
              <Link href="/how-it-works" className="text-primary-light transition hover:text-primary">
                How it works
              </Link>
              <Link href="/presidio-alternative" className="text-primary-light transition hover:text-primary">
                Presidio alternative
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

      {/* ── Detection accuracy section ── */}
      <section className="section bg-background-secondary" id="detection-accuracy">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Detection Accuracy</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              NeutralAI vs Presidio vs Private AI vs Nightfall
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The table below uses publicly available vendor evidence. NeutralAI figures come from our{' '}
              <Link
                href="/blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026"
                className="font-semibold text-primary-light hover:text-primary"
              >
                2026 benchmark post
              </Link>
              . Competitor figures are sourced from their own public documentation — different datasets and metrics mean
              numbers are <em>not</em> directly comparable.{' '}
              <Link
                href="/blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026"
                className="font-semibold text-primary-light hover:text-primary"
              >
                Read the full benchmark analysis →
              </Link>
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[28px] border border-white/10 bg-background/80">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <th className="px-5 py-4 text-left">Metric</th>
                  <th className="px-5 py-4 text-left text-primary-light">NeutralAI</th>
                  <th className="px-5 py-4 text-left">Presidio (OSS)</th>
                  <th className="px-5 py-4 text-left">Private AI</th>
                  <th className="px-5 py-4 text-left">Nightfall</th>
                </tr>
              </thead>
              <tbody>
                {detectionRows.map((row, i) => (
                  <tr
                    key={row.metric}
                    className={`border-b border-white/10 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                  >
                    <td className="px-5 py-4 font-medium text-slate-200">{row.metric}</td>
                    <td className="px-5 py-4 font-semibold text-primary-light">{row.neutralai}</td>
                    <td className="px-5 py-4 text-slate-400">{row.presidio}</td>
                    <td className="px-5 py-4 text-slate-400">{row.privateAi}</td>
                    <td className="px-5 py-4 text-slate-400">{row.nightfall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            <Minus className="mr-1 inline h-3 w-3" />
            &mdash; = not published in comparable form. Precision and F1 are different metrics; a precision claim is not
            equivalent to an F1 score. See the{' '}
            <Link
              href="/blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026"
              className="text-slate-400 underline hover:text-slate-200"
            >
              benchmark post
            </Link>{' '}
            for methodology context.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/benchmark"
              className="btn btn-cta inline-flex items-center gap-2 px-6 py-3 text-sm"
              data-analytics-event="cta_click"
              data-analytics-label="See Full Benchmark"
              data-analytics-placement="compare_detection"
            >
              See the full benchmark page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026"
              className="btn btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
              data-analytics-event="cta_click"
              data-analytics-label="Read Benchmark Post"
              data-analytics-placement="compare_detection"
            >
              Read the full 2026 benchmark
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-primary-light transition hover:text-primary"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Build vs Buy feature comparison ── */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Build vs Buy</p>
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
            <Link href="/presidio-alternative" className="ml-2 font-semibold text-primary-light hover:text-primary">
              See the Presidio-specific build-vs-buy analysis.
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
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
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Plan Enterprise Rollout
              </Link>
              <Link
                href="/blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026"
                className="text-sm text-primary-light transition hover:text-primary"
              >
                Read the benchmark →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
