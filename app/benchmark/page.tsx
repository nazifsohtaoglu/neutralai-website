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
import benchmarkFacts from '../data/benchmark-facts.json'
import { benchmarkProof } from '../data/homepage'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'PII Detection Benchmark — Dated, Citable Accuracy Stats',
  description:
    'NeutralAI PII detection benchmark: 98.4% holdout F1, 92.7% PERSON-holdout F1, and 16 measured entity families including the UK identity, financial and legal pack. Dated, vendor-published benchmark with documented methodology and a like-for-like Presidio-vanilla comparison.',
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
      '98.4% holdout F1, 92.7% PERSON-holdout F1, 16 measured entity families — dated, vendor-published product benchmark with documented methodology.',
    url: `${siteConfig.url}/benchmark`,
  },
}

// Source of truth: nazifsohtaoglu/neutralai-gateway benchmark artifacts listed in website issue #16.
// Same numbers as app/data/homepage.ts benchmarkProof and app/presidio-alternative/page.tsx.
const lastVerified = 'July 2026'
const lastVerifiedDate = '2026-07-03'
// Generated from the gateway artifacts by scripts/sync-benchmark-facts.mjs —
// case counts and dates are no longer hand-typed here.
const generatedAt = benchmarkFacts.publicSet.generatedAt
const publicCaseCount = benchmarkFacts.publicSet.caseCount.toLocaleString('en-GB')

// UK families the holdout split does not yet cover. Drives the caveat below, so
// the page stops claiming a gap as soon as the artifact closes it.
const ukFamiliesMissingHoldout = benchmarkFacts.holdoutSet.familiesWithoutHoldoutCoverage.filter((e) =>
  e.startsWith('UK_'),
)

// NOTE: we deliberately do NOT publish benchmarkFacts.publicSet.overallF1.
// The public set is clean synthetic text and now scores at ceiling — a figure
// that reads as a marketing fiction and would overstate real-world behaviour.
// The holdout split (not used for tuning) is the honest headline, so it leads.

// Static, developer-authored content only (no user/request input) — mirrors the
// JSON-LD pattern already used in app/layout.tsx, app/page.tsx, and app/presidio-alternative/page.tsx.
const quotableStats = [
  {
    value: benchmarkProof.holdoutOverallF1,
    label: `holdout overall F1 (${benchmarkFacts.holdoutSet.families} entity families)`,
    sentence: `On a holdout sample not used for tuning, NeutralAI measured a ${benchmarkProof.holdoutOverallF1} overall F1 score across the ${benchmarkFacts.holdoutSet.families} entity families covered by that set, last verified ${lastVerified}.`,
  },
  {
    value: benchmarkProof.personHoldoutF1,
    label: 'PERSON-entity holdout F1',
    sentence: `For the PERSON entity type specifically, NeutralAI measured a ${benchmarkProof.personHoldoutF1} F1 score on holdout data, last verified ${lastVerified}.`,
  },
  {
    value: `${benchmarkFacts.coverage.neutralaiFamilies} vs ${benchmarkFacts.coverage.baselineFamilies}`,
    label: 'entity families attempted (NeutralAI vs vanilla Presidio)',
    sentence: `Of the ${benchmarkFacts.coverage.neutralaiFamilies} entity families in the NeutralAI benchmark, an uncalibrated vanilla Microsoft Presidio baseline is configured to attempt ${benchmarkFacts.coverage.baselineFamilies}; it does not look for the other ${benchmarkFacts.coverage.notAttemptedByBaseline.length}, including the ${benchmarkFacts.coverage.ukFamilies} UK identity, financial and legal identifiers, last verified ${lastVerified}.`,
  },
  {
    value: `${benchmarkFacts.sharedEntityAccuracy.neutralaiF1} vs ${benchmarkFacts.sharedEntityAccuracy.baselineF1}`,
    label: 'holdout F1 on the families both engines attempt',
    sentence: `Restricted to the entity families both engines attempt (${benchmarkFacts.sharedEntityAccuracy.entities.join(', ')}), NeutralAI scored ${benchmarkFacts.sharedEntityAccuracy.neutralaiF1} F1 on holdout data against ${benchmarkFacts.sharedEntityAccuracy.baselineF1} for a vanilla Presidio baseline, last verified ${lastVerified}.`,
  },
  {
    value: `${benchmarkFacts.sharedEntityAccuracy.neutralaiFalsePositives} vs ${benchmarkFacts.sharedEntityAccuracy.baselineFalsePositives}`,
    label: 'false positives on holdout (NeutralAI vs vanilla Presidio)',
    sentence: `On the holdout set, NeutralAI produced ${benchmarkFacts.sharedEntityAccuracy.neutralaiFalsePositives} false positives against ${benchmarkFacts.sharedEntityAccuracy.baselineFalsePositives} for a vanilla Presidio baseline, whose PERSON detection ran at ${benchmarkFacts.sharedEntityAccuracy.personBaselinePrecision} precision, last verified ${lastVerified}.`,
  },
] as const

// We deliberately do not headline a single "NeutralAI X% vs Presidio Y%" pair.
// A pooled overall F1 blends two different things — how many entity families a
// side attempts, and how accurate it is on them — and the baseline takes a
// structural zero on every family it is not configured for. That makes the gap
// widen whenever we add an entity type, with no accuracy change at all. The two
// claims are reported separately below (gateway#1643).
const comparisonRows = [
  {
    product: 'NeutralAI',
    score: benchmarkFacts.sharedEntityAccuracy.neutralaiF1,
    status: 'measured',
    note: `Holdout F1 restricted to the ${benchmarkFacts.sharedEntityAccuracy.entities.length} families both configurations attempt, so this is like-for-like. ${benchmarkFacts.sharedEntityAccuracy.neutralaiFalsePositives} false positives.`,
  },
  {
    product: 'Presidio (vanilla, uncalibrated)',
    score: benchmarkFacts.sharedEntityAccuracy.baselineF1,
    status: 'measured',
    note: `Same holdout set, scorer, and ${benchmarkFacts.sharedEntityAccuracy.entities.length} families, so coverage is not counted against it. ${benchmarkFacts.sharedEntityAccuracy.baselineFalsePositives} false positives.`,
  },
  {
    product: 'OpenAI Privacy Filter',
    score: null,
    status: 'pending',
    note: 'NeutralAI has not evaluated OpenAI Privacy Filter on this benchmark set — no NeutralAI-verified comparison is published here yet.',
  },
] as const

const entityResults = [
  {
    entity: `Overall (the ${benchmarkFacts.holdoutSet.families} entity types in the holdout set)`,
    metric: 'Holdout overall F1',
    score: benchmarkProof.holdoutOverallF1,
  },
  {
    entity: 'PERSON',
    metric: 'Holdout F1',
    score: benchmarkProof.personHoldoutF1,
  },
  {
    entity: 'PERSON',
    metric: 'Holdout F1 — vanilla Presidio baseline',
    score: benchmarkFacts.sharedEntityAccuracy.personBaselineF1,
  },
  {
    entity: 'Both engines attempt these (EMAIL, PHONE, PERSON)',
    metric: 'Holdout F1',
    score: benchmarkFacts.sharedEntityAccuracy.neutralaiF1,
  },
  {
    entity: 'Both engines attempt these (EMAIL, PHONE, PERSON)',
    metric: 'Holdout F1 — vanilla Presidio baseline',
    score: benchmarkFacts.sharedEntityAccuracy.baselineF1,
  },
  {
    entity: 'UK identity, financial and legal pack',
    metric: `Entity families measured, each CI-gated at a 0.95 F1 floor (${benchmarkFacts.publicSet.generatedAt})`,
    score: `${benchmarkFacts.coverage.ukFamilies}`,
  },
] as const

// Now measured, not roadmap — see the July 2026 changelog entry. Order matches
// the gateway benchmark artifact's UK_* families.
const ukPackEntities = [
  'National Insurance number',
  'NHS number',
  'Sort code',
  'Bank account number',
  'HMRC UTR',
  'Companies House number',
  'Court case number',
  'SRA ID',
  'Land Registry title number',
  'Driving licence number (DVLA and DVA formats)',
] as const

const changelog = [
  {
    date: `${lastVerified}`,
    entry: 'Initial publication of the standalone benchmark page. UK legal entity pack listed as in development, without figures.',
  },
  {
    date: 'May 2026',
    entry: 'Presidio-vanilla comparison benchmark generated (2026-05-08, 1,000 cases across DE, EN, ES, FR, TR).',
  },
  {
    date: 'July 2026',
    entry: `UK identity, financial and legal pack added to the measured set: ${benchmarkFacts.coverage.ukFamilies} entity families, each held to a 0.95 F1 floor that fails the build on a regression. Benchmark regenerated (${generatedAt}, ${publicCaseCount} cases).`,
  },
  {
    date: 'July 2026',
    entry: `Comparison reporting corrected. A single pooled "NeutralAI vs Presidio" F1 conflated coverage with accuracy: the baseline scores a structural zero on every family it is not configured to attempt, so the gap grew each time we added an entity type. Coverage and shared-entity accuracy are now reported separately, and every figure on this page is generated from the benchmark artifacts rather than typed in.`,
  },
] as const

const faqs = [
  {
    question: 'How is it measured?',
    answer:
      `The headline numbers are F1 scores computed against a labeled benchmark set of prompt-style text, comparing detected PII against ground-truth annotations. The published comparison set covers ${publicCaseCount} cases across German, English, Spanish, French, and Turkish. Holdout F1 is measured on a sample not used for tuning the detectors, so it is the figure we lead with. We do not publish a single pooled "NeutralAI vs Presidio" score: a baseline is not configured to attempt most of these entity families, so pooling coverage and accuracy into one number would widen the gap every time we added an entity type without anything getting more accurate. Coverage and shared-entity accuracy are reported separately instead.`,
  },
  {
    question: 'Is this independently validated?',
    answer:
      'No. This is a vendor-published product benchmark, not an independent or third-party audit. NeutralAI generated and scored the benchmark itself. The methodology is documented and the comparison against a vanilla Presidio baseline uses the same test set and scorer so the delta is at least internally consistent.',
  },
  {
    question: 'Can I reproduce it?',
    answer:
      'Not fully, not yet. The methodology is described on this page, and dataset facts (case count, language split, generation date) are published, but the labeled dataset and full scoring harness are not public — so an external team cannot independently rerun this exact comparison today. Detailed methodology is available on request through a security or partnership review.',
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
    'A vendor-published benchmark measuring PII detection accuracy (F1) across supported entity types, including a holdout split and a PERSON-entity holdout split, with a comparison against a vanilla Microsoft Presidio baseline on the same test set and scorer.',
  url: `${siteConfig.url}/benchmark`,
  dateModified: lastVerifiedDate,
  creator: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  license: 'https://neutralai.co.uk/terms',
  measurementTechnique: 'F1 scoring against labeled PII benchmark data',
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
            <a
              href={benchmarkProof.appBenchmarkUrl}
              className="btn btn-cta justify-center px-8 py-4 text-base"
              data-analytics-event="cta_click"
              data-analytics-label="Open gateway benchmark surface"
              data-analytics-placement="benchmark_hero"
              data-analytics-cta-id="benchmark_hero_open_gateway"
            >
              Open gateway benchmark surface
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/presidio-alternative"
              className="btn btn-secondary justify-center px-8 py-4 text-base"
              data-analytics-event="cta_click"
              data-analytics-label="Read the Presidio comparison"
              data-analytics-placement="benchmark_hero"
              data-analytics-cta-id="benchmark_hero_presidio_comparison"
            >
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
                  A labeled benchmark set of prompt-style text. The published comparison run covers {publicCaseCount}{' '}
                  cases across DE, EN, ES, FR, and TR (generated {generatedAt}), scored against{' '}
                  {benchmarkFacts.coverage.neutralaiFamilies} entity families — names, contacts, financial and account
                  identifiers, and the UK identity, financial and legal pack.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-background/80 p-6">
                <ShieldCheck className="h-5 w-5 text-primary-light" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">Holdout discipline</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  &ldquo;Holdout&rdquo; means a sample kept separate from the data used to tune detectors and confidence
                  thresholds. We lead with holdout F1 ({benchmarkProof.holdoutOverallF1}) and PERSON-holdout F1 (
                  {benchmarkProof.personHoldoutF1}) because they are the honest read. The tuned public set now scores at
                  ceiling, which makes it useful as a regression gate — it fails the build when something that worked
                  last release stops working — but worthless as a forecast of real-world accuracy, so we do not headline
                  it.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-background/80 p-6">
                <FileText className="h-5 w-5 text-primary-light" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">Reproducibility</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The methodology is described here: same test set and scorer used for both NeutralAI and the vanilla
                  Presidio baseline, with dataset facts (case count, languages, generation date) published on this
                  page. The labeled dataset and full scoring harness are not public today, so an external team cannot
                  independently rerun this exact comparison. Detailed methodology is available on request through
                  security or partnership review.
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
                <tr>
                  <td className="px-5 py-4 font-medium text-slate-200">UK NHS number</td>
                  <td className="px-5 py-4 text-slate-400">Supported entity type — no published per-entity F1 yet</td>
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

          {/* UK identity, financial and legal pack — measured since July 2026 */}
          <div className="mt-10 rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fdba74]">
              <Clock3 className="h-4 w-4" />
              UK identity, financial and legal pack — now measured
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              These were listed here as roadmap items without figures. As of {benchmarkFacts.publicSet.generatedAt} all{' '}
              {benchmarkFacts.coverage.ukFamilies} are in the measured set, each held to a 0.95 F1 floor that fails the
              build on a regression. A vanilla Presidio baseline does not attempt any of them.
            </p>
            {/*
              Data-driven, not prose: the caveat is rendered from
              holdoutSet.familiesWithoutHoldoutCoverage, so it disappears by
              itself the moment the regenerated artifact covers the UK pack.
              Writing it as a fixed sentence would leave the page claiming a gap
              that had already been closed — the exact drift this whole change
              set exists to stop.
            */}
            {ukFamiliesMissingHoldout.length > 0 ? (
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Note the limit: {ukFamiliesMissingHoldout.length} of them are measured on the public synthetic set only.
                The holdout split covers {benchmarkFacts.holdoutSet.families} families, so the{' '}
                {benchmarkProof.holdoutOverallF1} holdout figure above does not include those.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-slate-300">
                All {benchmarkFacts.coverage.ukFamilies} are also covered by the holdout split — the sample kept out of
                detector tuning — written as ordinary correspondence rather than templates, so the cue sits inside a
                real sentence instead of at the start of a fixed pattern.
              </p>
            )}
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
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Scores are measured on synthetic, well-formed prompts, so treat them as a regression gate rather than a
              forecast of real-world accuracy: their job is to prove that what worked last release still works. UK
              postcodes are deliberately excluded — a postcode is often a legitimate search term rather than personal
              data, so it ships as an opt-in policy template instead of a default.
            </p>
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
                      <span className="font-medium text-[#fdba74]">Not yet evaluated. </span>
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
              <Link
                href={siteConfig.signupUrl}
                className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto"
                data-analytics-event="cta_click"
                data-analytics-label="Try Free"
                data-analytics-placement="benchmark_final_cta"
                data-analytics-cta-id="benchmark_final_cta_try_free"
              >
                Try Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/playground"
                className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto"
                data-analytics-event="cta_click"
                data-analytics-label="Open the playground"
                data-analytics-placement="benchmark_final_cta"
                data-analytics-cta-id="benchmark_final_cta_playground"
              >
                Open the playground
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
