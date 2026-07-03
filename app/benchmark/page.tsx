import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  FlaskConical,
  Minus,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { benchmarkProof } from '../data/homepage'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'PII Detection Benchmark — Dated, Citable Accuracy Stats',
  description:
    'NeutralAI PII detection benchmark: 99.8% public overall F1, 98.4% holdout F1, 92.7% PERSON-holdout F1. Dated, vendor-published, reproducible methodology, per-entity results, and a Presidio-vanilla comparison.',
  keywords: [
    'pii detection benchmark',
    'pii accuracy benchmark',
    'presidio vs neutralai',
    'ai compliance gateway benchmark',
    'pii detection f1 score',
  ],
  alternates: {
    canonical: '/benchmark',
  },
  openGraph: {
    title: 'NeutralAI PII Detection Benchmark',
    description:
      '99.8% public overall F1, 98.4% holdout F1, 92.7% PERSON-holdout F1 — dated, vendor-published, reproducible methodology with per-entity results.',
    url: `${siteConfig.url}/benchmark`,
  },
}

// Source of truth: nazifsohtaoglu/neutralai-gateway benchmark artifacts listed in website issue #16.
// Same numbers as app/data/homepage.ts benchmarkProof and app/presidio-alternative/page.tsx.
const lastVerified = 'July 2026'
const generatedAt = '2026-05-08'

// Static, developer-authored content only (no user/request input) — mirrors the
// JSON-LD pattern already used in app/layout.tsx, app/page.tsx, and app/presidio-alternative/page.tsx.
const quotableStats = [
  {
    value: benchmarkProof.publicOverallF1,
    label: 'public overall F1',
    sentence: `NeutralAI measured a ${benchmarkProof.publicOverallF1} overall F1 score on its public PII detection benchmark, last verified ${lastVerified}.`,
  },
  {
    value: benchmarkProof.holdoutOverallF1,
    label: 'holdout overall F1',
    sentence: `On a holdout sample not used for tuning, NeutralAI measured a ${benchmarkProof.holdoutOverallF1} overall F1 score, last verified ${lastVerified}.`,
  },
  {
    value: benchmarkProof.personHoldoutF1,
    label: 'PERSON-entity holdout F1',
    sentence: `For the PERSON entity type specifically, NeutralAI measured a ${benchmarkProof.personHoldoutF1} F1 score on holdout data, last verified ${lastVerified}.`,
  },
  {
    value: '57.5%',
    label: 'vanilla Presidio overall F1 (same test set)',
    sentence: `On the same benchmark set, an uncalibrated vanilla Microsoft Presidio baseline scored 57.5% overall F1, versus ${benchmarkProof.publicOverallF1} for NeutralAI, last verified ${lastVerified}.`,
  },
] as const

const comparisonRows = [
  {
    product: 'NeutralAI',
    score: '99.8%',
    status: 'measured',
    note: 'Public overall F1 on the NeutralAI PII benchmark set.',
  },
  {
    product: 'Presidio (vanilla, uncalibrated)',
    score: '57.5%',
    status: 'measured',
    note: 'Same benchmark set and scorer, open-source baseline with no product-layer calibration.',
  },
  {
    product: 'OpenAI Privacy Filter',
    score: null,
    status: 'pending',
    note: 'Head-to-head evaluation in progress. No score is published yet — this row will be updated once results exist.',
  },
] as const

const entityResults = [
  {
    entity: 'Overall (all entity types)',
    metric: 'Public overall F1',
    score: benchmarkProof.publicOverallF1,
  },
  {
    entity: 'Overall (all entity types)',
    metric: 'Holdout overall F1',
    score: benchmarkProof.holdoutOverallF1,
  },
  {
    entity: 'PERSON',
    metric: 'Holdout F1',
    score: benchmarkProof.personHoldoutF1,
  },
] as const

const ukPackEntities = [
  'Companies House number',
  'HMRC UTR',
  'Court references',
  'SRA ID',
  'Land Registry title number',
  'DVLA licence number',
] as const

const changelog = [
  {
    date: `${lastVerified}`,
    entry: 'Initial publication of the standalone benchmark page.',
  },
] as const

const faqs = [
  {
    question: 'How is it measured?',
    answer:
      'The headline numbers are span-level F1 scores computed against a labeled benchmark set of prompt-style text, comparing detected PII spans to ground-truth annotations. Overall F1 covers all supported entity types combined; holdout F1 is measured on a sample not used for tuning the detectors.',
  },
  {
    question: 'Is this independently validated?',
    answer:
      'No. This is a vendor-published product benchmark, not an independent or third-party audit. NeutralAI generated and scored the benchmark itself. The methodology is documented and the comparison against a vanilla Presidio baseline uses the same test set and scorer so the delta is at least internally consistent.',
  },
  {
    question: 'Can I reproduce it?',
    answer:
      'The benchmark scope, entity definitions, and scoring approach are documented, and the Presidio-vanilla comparison is reproducible against the open-source library as a baseline. Full dataset artifacts are not published publicly to avoid leaking a labeled eval set, but methodology detail is available on request through a security or partnership review.',
  },
  {
    question: 'How often is this updated?',
    answer:
      'This page carries a "Last verified" dateline and a changelog. Numbers are refreshed when the underlying gateway benchmark is re-run against a new model or detector release, not on a fixed calendar schedule.',
  },
] as const

const datasetStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'NeutralAI PII Detection Benchmark',
  description:
    'A vendor-published benchmark measuring PII detection accuracy (span-level F1) across supported entity types, including a holdout split and a PERSON-entity holdout split, with a comparison against a vanilla Microsoft Presidio baseline.',
  url: `${siteConfig.url}/benchmark`,
  dateModified: generatedAt,
  creator: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  license: 'https://neutralai.co.uk/terms',
  measurementTechnique: 'Span-level F1 scoring against labeled PII benchmark data',
  variableMeasured: ['Overall F1', 'Holdout F1', 'PERSON-entity holdout F1'],
} as const

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
} as const

export default function BenchmarkPage() {
  return (
    <main className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
              <FlaskConical className="h-3.5 w-3.5" />
              PII detection benchmark
            </div>
            <h1 className="mt-5 font-heading text-4xl font-bold md:text-6xl">
              Dated, citable PII-accuracy stats for NeutralAI.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              These are the exact numbers NeutralAI publishes for PII detection accuracy: what they measure, how they
              were produced, and how they compare to a Presidio-vanilla baseline. Vendor-published, not independently
              audited — methodology is documented below.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <CalendarClock className="h-4 w-4 text-primary-light" />
              Last verified: {lastVerified}
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quotableStats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] border border-white/10 bg-background/80 p-6">
                <p className="font-heading text-4xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{stat.sentence}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={benchmarkProof.appBenchmarkUrl} className="btn btn-cta justify-center px-8 py-4 text-base">
              Open gateway benchmark surface
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link href="/presidio-alternative" className="btn btn-secondary justify-center px-8 py-4 text-base">
              Read the Presidio comparison
            </Link>
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Methodology</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">How the numbers were produced.</h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-background/80 p-6">
                <ClipboardList className="h-5 w-5 text-primary-light" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">Dataset</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  A labeled benchmark set of prompt-style text spanning multiple languages, scored for span-level PII
                  detection against supported entity types (names, contacts, financial and account identifiers, and
                  region-specific IDs such as UK NHS numbers).
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-background/80 p-6">
                <ShieldCheck className="h-5 w-5 text-primary-light" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">Holdout discipline</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  &ldquo;Holdout&rdquo; means a sample kept separate from the data used to tune detectors and confidence
                  thresholds. Holdout F1 ({benchmarkProof.holdoutOverallF1}) and PERSON-holdout F1 (
                  {benchmarkProof.personHoldoutF1}) are reported separately from the public overall F1 (
                  {benchmarkProof.publicOverallF1}) so the gap between tuned and unseen performance is visible rather
                  than hidden.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-background/80 p-6">
                <FileText className="h-5 w-5 text-primary-light" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">Reproducibility</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The Presidio-vanilla comparison uses the same test set and scorer against the open-source library, so
                  that delta is reproducible by any team running Presidio directly. Full dataset artifacts are not
                  published to avoid leaking a labeled eval set; detailed methodology is available on request through
                  security review.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-primary/20 bg-primary/10 p-5 text-sm leading-7 text-slate-200">
              <BadgeCheck className="mb-3 h-5 w-5 text-primary-light" />
              This is a vendor-published product benchmark, not an independent or third-party audit. NeutralAI
              generated, ran, and scored this benchmark itself.
              <Link href="/presidio-alternative" className="ml-2 font-semibold text-primary-light hover:text-primary">
                See the full Presidio build-vs-buy comparison.
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Per-entity results ── */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Per-entity results</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">What granularity actually exists today.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
              NeutralAI currently publishes overall and PERSON-specific F1 scores. It does not yet publish a full
              per-entity-type accuracy breakdown (email, phone, card, IBAN, UK NHS number, etc.) — the table below is
              honest about that gap rather than inventing precision that has not been measured yet.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[28px] border border-white/10 bg-background/80">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <th className="px-5 py-4 text-left">Entity / scope</th>
                  <th className="px-5 py-4 text-left">Metric</th>
                  <th className="px-5 py-4 text-left text-primary-light">Score</th>
                </tr>
              </thead>
              <tbody>
                {entityResults.map((row, i) => (
                  <tr
                    key={`${row.entity}-${row.metric}`}
                    className={`border-b border-white/10 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                  >
                    <td className="px-5 py-4 font-medium text-slate-200">{row.entity}</td>
                    <td className="px-5 py-4 text-slate-400">{row.metric}</td>
                    <td className="px-5 py-4 font-semibold text-primary-light">{row.score}</td>
                  </tr>
                ))}
                <tr className="bg-white/[0.02]">
                  <td className="px-5 py-4 font-medium text-slate-200">UK NHS number</td>
                  <td className="px-5 py-4 text-slate-400">Supported entity type — no published per-entity F1 yet</td>
                  <td className="px-5 py-4 text-slate-500">
                    <Minus className="inline h-4 w-4" />
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-slate-200">UK National Insurance number</td>
                  <td className="px-5 py-4 text-slate-400">Not yet a documented benchmark entity type</td>
                  <td className="px-5 py-4 text-slate-500">
                    <Minus className="inline h-4 w-4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            <Minus className="mr-1 inline h-3 w-3" />
            &mdash; = not currently published as a standalone score. See{' '}
            <Link href="/how-it-works" className="text-slate-400 underline hover:text-slate-200">
              how entity coverage and confidence thresholds work
            </Link>{' '}
            for the supported entity list.
          </p>

          {/* In-development UK legal entity pack */}
          <div className="mt-10 rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fdba74]">
              <Clock3 className="h-4 w-4" />
              In development — UK legal entity pack
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The following UK legal-sector identifiers are on the entity-coverage roadmap. No accuracy numbers exist
              for them yet — results will be published here once benchmarked.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ukPackEntities.map((entity) => (
                <li
                  key={entity}
                  className="rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-slate-300"
                >
                  {entity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Comparison</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">NeutralAI vs Presidio vs OpenAI Privacy Filter.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
              Same benchmark set and scorer for the two measured rows. The OpenAI Privacy Filter row is left explicitly
              pending — no invented score, no placeholder zero.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-background/80">
            <div className="grid border-b border-white/10 bg-white/[0.04] text-sm font-semibold text-slate-200 md:grid-cols-[1fr_0.6fr_1.4fr]">
              <div className="px-5 py-4">Product</div>
              <div className="px-5 py-4">Overall F1</div>
              <div className="px-5 py-4">Status</div>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.product}
                className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[1fr_0.6fr_1.4fr]"
              >
                <div className="px-5 py-5 font-heading text-lg font-semibold text-white">{row.product}</div>
                <div className="px-5 py-5 text-sm">
                  {row.score ? (
                    <span className="font-semibold text-primary-light">{row.score}</span>
                  ) : (
                    <span className="text-slate-500">pending</span>
                  )}
                </div>
                <div className="flex gap-3 px-5 py-5 text-sm leading-6 text-slate-300">
                  {row.status === 'measured' ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#fdba74]" />
                  )}
                  <span>
                    {row.status === 'pending' ? (
                      <span className="font-medium text-[#fdba74]">Pending — head-to-head in progress. </span>
                    ) : null}
                    {row.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">FAQ</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Honest answers, no spin.</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-[22px] border border-white/10 bg-background/80 p-6">
                  <h3 className="font-heading text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Changelog ── */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Changelog</p>
            <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">Page history.</h2>
            <ul className="mt-6 space-y-3">
              {changelog.map((item) => (
                <li key={item.date} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500">{item.date}</span>
                  <span>&mdash; {item.entry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_24%)] px-6 py-10 text-center md:px-10">
            <h2 className="font-heading text-3xl font-bold md:text-5xl">Try the masking flow yourself.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              These numbers describe detection accuracy. The fastest way to see the product is to run a prompt through
              it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={siteConfig.signupUrl} className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Try Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/playground" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Open the playground
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
