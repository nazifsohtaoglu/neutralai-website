import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileText,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import RoiCalculator from './RoiCalculator'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'Presidio Alternative for Regulated AI Teams',
  description:
    'Compare NeutralAI with building directly on Microsoft Presidio. See PII masking for LLM accuracy, compliance gateway features, TCO, and a build-vs-buy ROI calculator.',
  keywords: [
    'presidio alternative',
    'pii masking for llm',
    'ai compliance gateway',
    'Microsoft Presidio alternative',
    'PII redaction for AI',
  ],
  alternates: {
    canonical: '/presidio-alternative',
  },
  openGraph: {
    title: 'Presidio Alternative for Regulated AI Teams',
    description:
      'Presidio is a strong foundation. NeutralAI adds the policy, vault, audit, tenant, browser, and deployment layers around it.',
    url: `${siteConfig.url}/presidio-alternative`,
  },
}

const benchmark = {
  generatedAt: '2026-05-08',
  caseCount: 1000,
  languages: ['DE', 'EN', 'ES', 'FR', 'TR'],
  // Source of truth: nazifsohtaoglu/neutralai-gateway benchmark artifacts listed in website issue #16.
  neutralaiF1: '99.8%',
  presidioF1: '57.5%',
  neutralaiRecall: '98.4%',
  presidioRecall: '40.3%',
  exactMatch: '98.4%',
} as const

const appBenchmarkUrl = `${siteConfig.appBaseUrl}/pii-benchmark`
const latencyBenchmarkUrl = `${siteConfig.appBaseUrl}/latency-benchmark`

const comparisonRows = [
  {
    capability: 'PII detection and anonymization',
    presidio: 'Strong open-source analyzer and anonymizer building blocks for text, images, and structured data.',
    neutralai: 'Uses proven detection foundations, then adds product calibration, policy enforcement, and gateway controls.',
  },
  {
    capability: 'Vault and reversible tokenization',
    presidio: 'Possible to build, but your team owns key handling, token lifecycle, storage, and restore paths.',
    neutralai: 'Encrypted vault workflows, token boundaries, TTL controls, and product-level restore behavior are part of the platform.',
  },
  {
    capability: 'Audit evidence',
    presidio: 'You design the logging model, redaction policy, admin visibility, and evidence exports.',
    neutralai: 'Audit-friendly events, compliance reports, benchmark artifacts, and operational proof are product surfaces.',
  },
  {
    capability: 'Multi-tenant rollout',
    presidio: 'You own tenant isolation, API keys, rate limits, policy scoping, and admin roles.',
    neutralai: 'Tenant-aware controls, billing posture, API key lifecycle, admin surfaces, and rollout boundaries are built in.',
  },
  {
    capability: 'Enterprise access controls',
    presidio: 'SSO, MFA, BYOK posture, SIEM export, and procurement evidence are separate engineering projects.',
    neutralai: 'SSO/MFA posture, BYOK-oriented deployment choices, SIEM-ready evidence, and security review assets are part of the product story.',
  },
  {
    capability: 'Browser extension',
    presidio: 'You build, submit, support, and monitor browser-specific enforcement yourself.',
    neutralai: 'Chrome and Edge extension enforcement is a first-class user path with visible shield status and quota behavior.',
  },
] as const

const proofCards = [
  {
    label: 'NeutralAI overall F1',
    value: benchmark.neutralaiF1,
    tone: 'primary',
  },
  {
    label: 'Presidio-vanilla overall F1',
    value: benchmark.presidioF1,
    tone: 'muted',
  },
  {
    label: 'NeutralAI exact-match accuracy',
    value: benchmark.exactMatch,
    tone: 'primary',
  },
] as const

function MetricBar({ label, neutralai, presidio }: { label: string; neutralai: string; presidio: string }) {
  const neutralaiWidth = Number(neutralai.replace('%', ''))
  const presidioWidth = Number(presidio.replace('%', ''))

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-white">{label}</span>
        <span className="text-slate-400">NeutralAI {neutralai} / Presidio {presidio}</span>
      </div>
      <div className="mt-3 grid gap-2">
        <div className="h-3 rounded-full bg-white/10">
          <div className="h-3 rounded-full bg-primary" style={{ width: `${Math.min(100, neutralaiWidth)}%` }} />
        </div>
        <div className="h-3 rounded-full bg-white/10">
          <div className="h-3 rounded-full bg-slate-500" style={{ width: `${Math.min(100, presidioWidth)}%` }} />
        </div>
      </div>
    </div>
  )
}

export default function PresidioAlternativePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NeutralAI',
    applicationCategory: 'SecurityApplication',
    description:
      'NeutralAI is an AI compliance gateway for PII masking for LLM workflows, compared against building directly with Microsoft Presidio.',
    url: `${siteConfig.url}/presidio-alternative`,
    offers: {
      '@type': 'Offer',
      category: 'AI compliance gateway',
      url: siteConfig.signupUrl,
    },
  }

  return (
    <main className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_26%)]" />

        <div className="container-custom relative z-10 grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
              <ShieldCheck className="h-3.5 w-3.5" />
              Presidio alternative
            </div>
            <h1 className="mt-5 font-heading text-5xl font-bold md:text-7xl">
              Presidio is a library. NeutralAI is the compliance gateway around it.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Microsoft Presidio is a strong open-source foundation for PII detection and anonymization. The enterprise
              question is what happens after detection: vaulting, policy boundaries, audit evidence, tenant controls,
              SSO, browser enforcement, and maintenance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#roi-calculator" className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Calculate build vs buy
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href={appBenchmarkUrl} className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                View benchmark
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/12 bg-background/85 p-6 shadow-[0_24px_90px_rgba(2,6,23,0.45)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-light">Benchmark proof</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold">NeutralAI vs Presidio-vanilla</h2>
              </div>
              <span className="rounded-full border border-accent-success/25 bg-accent-success/10 px-3 py-1 text-xs font-semibold text-accent-success">
                {benchmark.caseCount} cases
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {proofCards.map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl border p-5 ${
                    card.tone === 'primary'
                      ? 'border-primary/20 bg-primary/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              <MetricBar label="Overall F1" neutralai={benchmark.neutralaiF1} presidio={benchmark.presidioF1} />
              <MetricBar label="Overall recall" neutralai={benchmark.neutralaiRecall} presidio={benchmark.presidioRecall} />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm leading-7 text-slate-300">
                Public benchmark generated on <span className="font-medium text-white">{benchmark.generatedAt}</span>.
                It covers {benchmark.languages.join(', ')} prompt samples and links back to the gateway-owned proof page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Feature comparison</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                What you still need to build around Presidio
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                Presidio gives teams an adaptable detection engine. Regulated AI teams also need the operational layer
                that makes masking enforceable, explainable, and supportable in production.
              </p>
            </div>
            <Link href="/insights/presidio-alone-regulated-industries" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary">
              Read the technical note
              <FileText className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-background/80">
            <div className="grid border-b border-white/10 bg-white/[0.04] text-sm font-semibold text-slate-200 md:grid-cols-[0.78fr_1fr_1fr]">
              <div className="px-5 py-4">Capability</div>
              <div className="px-5 py-4">Build with Presidio</div>
              <div className="px-5 py-4">Buy NeutralAI</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.capability} className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.78fr_1fr_1fr]">
                <div className="px-5 py-5 font-heading text-lg font-semibold text-white">{row.capability}</div>
                <div className="flex gap-3 px-5 py-5 text-sm leading-6 text-slate-400">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#fdba74]" />
                  <span>{row.presidio}</span>
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
            NeutralAI is not positioned as a from-scratch recognizer model. It uses proven open-source detection
            foundations and adds the gateway, policy, tokenization, audit, deployment, and UX layers regulated teams
            usually have to build themselves.
          </div>
        </div>
      </section>

      <RoiCalculator />

      <section className="section">
        <div className="container-custom">
          <div className="rounded-[32px] border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_24%)] px-6 py-10 md:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Customer-safe proof</p>
                <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                  Use the website for the sales story. Use the gateway for the proof source.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  The comparison page keeps SEO and buyer education on the marketing site, then links to gateway-owned
                  benchmark pages for reproducible accuracy and latency details.
                </p>
              </div>
              <div className="grid gap-3">
                <a href={appBenchmarkUrl} className="btn btn-cta justify-center px-8 py-4 text-base">
                  Open accuracy benchmark
                </a>
                <a href={latencyBenchmarkUrl} className="btn btn-secondary justify-center px-8 py-4 text-base">
                  Open latency benchmark
                </a>
                <Link href={siteConfig.signupUrl} className="btn btn-secondary justify-center px-8 py-4 text-base">
                  Try Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
