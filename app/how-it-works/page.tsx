'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeftRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Chrome,
  CircleSlash,
  Code2,
  Database,
  Eye,
  Fingerprint,
  Gauge,
  Languages,
  Lock,
  ScanSearch,
  ServerCog,
  ShieldCheck,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { contactLinks, siteConfig } from '../site'

const egressSteps = [
  {
    title: 'Detect',
    description:
      'The outgoing text is scanned for personal and sensitive values — names, emails, phone numbers, IDs, IBANs, card numbers, and more.',
  },
  {
    title: 'Decide',
    description:
      'A tenant-scoped policy decides what to do with each entity type: allow it, mask it, tokenize it reversibly, or block the request.',
  },
  {
    title: 'Neutralize',
    description:
      'Real values are replaced with safe placeholders or reversible tokens before the prompt ever leaves the trusted path.',
  },
  {
    title: 'Forward',
    description:
      'Only the neutralized prompt reaches the external model. The raw value never crosses the boundary.',
  },
] as const

const ingressSteps = [
  {
    title: 'Stream back',
    description:
      'The model answers token by token. Redaction is streaming-aware, so a value is resolved correctly even when it splits across two chunks.',
  },
  {
    title: 'Resolve',
    description:
      'Within a short, governed window, tokens resolve to their real values on the user’s side — so the answer reads as a complete, useful reply.',
  },
  {
    title: 'Record',
    description:
      'Every event is written to an audit trail as metadata about the decision — never the sensitive value itself.',
  },
] as const

const policyActions = [
  {
    icon: BadgeCheck,
    title: 'Allow',
    description:
      'Low-risk values pass through untouched when policy permits — for example a generic city name.',
  },
  {
    icon: Eye,
    title: 'Mask',
    description:
      'The value is irreversibly neutralized to a placeholder like [NAME]. Safest, and not reversible.',
  },
  {
    icon: Lock,
    title: 'Tokenize',
    description:
      'A reversible, encrypted, time-limited mapping. The answer re-opens to the real value on the user’s side.',
  },
  {
    icon: CircleSlash,
    title: 'Block',
    description:
      'For the highest-sensitivity cases, the request is stopped rather than allowed through. The fail-closed choice.',
  },
] as const

const retentionRows = [
  { data: 'Raw prompt', stored: false, note: 'Processed in memory, never persisted.' },
  { data: 'Masked prompt', stored: false, note: 'Exists only while the response streams.' },
  { data: 'Token ↔ value mapping', stored: 'temp', note: 'Encrypted with AES-256-GCM and time-limited.' },
  { data: 'Audit record', stored: true, note: 'Decision metadata — not the sensitive value.' },
  { data: 'Compliance export', stored: true, note: 'Written immutably for tamper-evident evidence.' },
] as const

const detectionLayers = [
  {
    icon: ScanSearch,
    title: 'Named-entity recognition',
    description:
      'A base recognition pass covers people, emails, phones, locations, IBANs, card numbers, IPs, and country-specific IDs such as TR_ID and UK_NHS.',
  },
  {
    icon: Fingerprint,
    title: 'Pattern + checksum validation',
    description:
      'Structural patterns catch formatting variants, and checksum maths on IBANs and ID numbers rules out random digit strings that only look sensitive.',
  },
  {
    icon: Gauge,
    title: 'Context gates',
    description:
      'Numeric, phone, reference, and person context gates lower false positives, so detection stays sharp without drowning the workflow in noise.',
  },
  {
    icon: ScanSearch,
    title: 'Semantic match',
    description:
      'A vector-similarity signal flags content that closely resembles sensitive data even when it doesn’t match a fixed pattern.',
  },
  {
    icon: Languages,
    title: 'Multilingual, including Turkish',
    description:
      'A dedicated Turkish-aware model corrects the name boundaries that English-only NER gets wrong — a half-redacted name is worse than a missed one.',
  },
  {
    icon: ShieldCheck,
    title: 'Whitelist + per-entity thresholds',
    description:
      'Manual and contextual allow-lists, plus a confidence threshold tuned per entity type, keep precision under your control.',
  },
] as const

const deploymentShapes = [
  {
    icon: ServerCog,
    title: 'SaaS (cloud)',
    description: 'The fastest path from pilot to production, with tenant-scoped isolation.',
  },
  {
    icon: Building2,
    title: 'On-prem / VPC',
    description: 'Data never leaves your network. Egress is deny-by-default, installed via Docker or Helm.',
  },
  {
    icon: Chrome,
    title: 'Browser extension',
    description: 'Masking happens locally, at the employee’s point of use, with managed rollout and policy sync.',
  },
  {
    icon: Code2,
    title: 'SDK (Python / Node)',
    description: 'Mask, unmask, and stream embedded directly inside your own product.',
  },
] as const

const limits = [
  'NeutralAI secures system-to-system data flow. If someone moves data by screenshot or manual copy-paste, that is a separate DLP concern.',
  'We don’t claim “zero risk” or “guaranteed compliance.” We reduce exposure measurably and produce evidence you can show.',
  'Reversible tokenization is a deliberate trade: it keeps answers useful, and the mapping is encrypted and short-lived rather than kept forever.',
] as const

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">{children}</p>
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.14),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <SectionEyebrow>How It Works</SectionEyebrow>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              A control layer between your team and the <span className="gradient-text-warm">model</span>
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              NeutralAI detects and neutralizes sensitive values on the way out, resolves them safely on the way back, and
              leaves an auditable record of every event — so people can keep using AI without their data leaving with the prompt.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={contactLinks.demo} className="btn btn-cta px-6 py-3">
                See a demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-slate-200 transition-colors hover:border-primary"
              >
                <BookOpen className="h-4 w-4 text-primary-light" />
                Read the engineering deep-dives
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The shield + before/after */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>The idea</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              A transparent shield, not a switch
            </h2>
            <p className="mt-5 text-lg text-slate-300">
              Banning AI kills productivity and pushes usage underground. Instead, NeutralAI sits in the path like a sheet of
              glass: outgoing text passes through and its sensitive parts are neutralized; the returning answer is re-opened on
              the user’s side. Raw data never reaches the external model.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] p-6 md:p-8"
          >
            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-background/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">What the employee writes</p>
                <p className="mt-3 text-slate-200">
                  “Draft a petition for our client <span className="rounded bg-rose-500/15 px-1.5 py-0.5 text-rose-200">Ahmet Yıldız</span>{' '}
                  (ID: <span className="rounded bg-rose-500/15 px-1.5 py-0.5 text-rose-200">12345678901</span>,{' '}
                  <span className="rounded bg-rose-500/15 px-1.5 py-0.5 text-rose-200">ahmet@firm.com</span>).”
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ArrowLeftRight className="h-5 w-5 text-primary-light" />
              </div>
              <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-light">What the model sees</p>
                <p className="mt-3 text-slate-200">
                  “Draft a petition for our client <span className="rounded bg-primary/20 px-1.5 py-0.5 text-primary-light">[NAME]</span>{' '}
                  (ID: <span className="rounded bg-primary/20 px-1.5 py-0.5 text-primary-light">[ID_NUMBER]</span>,{' '}
                  <span className="rounded bg-primary/20 px-1.5 py-0.5 text-primary-light">[EMAIL]</span>).”
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              The external model never sees the real name, ID, or email — and the employee still gets a complete, meaningful answer.
              In a permitted scenario, the placeholders re-open to the real values on the user’s side.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two directions */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>The flow</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Two directions, one boundary</h2>
            <p className="mt-5 text-lg text-slate-300">
              Every prompt makes a round trip. NeutralAI neutralizes on the way out and resolves on the way back.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary-light" />
                </div>
                <h3 className="font-heading text-2xl font-semibold">Outbound — request to the model</h3>
              </div>
              <ol className="mt-6 space-y-5">
                {egressSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 font-mono text-xs text-primary-light">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="font-heading text-lg font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="card p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(249,115,22,0.14)]">
                  <ArrowRight className="h-5 w-5 rotate-180 text-[#fdba74]" />
                </div>
                <h3 className="font-heading text-2xl font-semibold">Inbound — answer to the user</h3>
              </div>
              <ol className="mt-6 space-y-5">
                {ingressSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#f97316]/30 bg-[rgba(249,115,22,0.12)] font-mono text-xs text-[#fdba74]">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="font-heading text-lg font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Policy actions */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Policy</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Detection decides; policy acts</h2>
            <p className="mt-5 text-lg text-slate-300">
              Finding an entity isn’t enough — what happens to it is rule-driven, per tenant, per entity type.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {policyActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <action.icon className="h-6 w-6 text-primary-light" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">{action.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{action.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
            A policy simulation shows what would change in a given text — a “what would this rule do?” diff — before a rule goes live.
          </p>
        </div>
      </section>

      {/* Retention */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionEyebrow>Retention</SectionEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">What’s stored, and what isn’t</h2>
              <p className="mt-5 text-lg text-slate-300">
                The design invariant: raw sensitive data is only ever seen at the engine boundary, and it cannot be written to
                storage, logs, or telemetry. That rule is enforced in code, not just promised in a policy.
              </p>
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-slate-200">
                <Database className="mb-3 h-5 w-5 text-primary-light" />
                Audit and compliance records describe the decision, not the data — so you can prove what happened without keeping the
                sensitive value around.
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-white/10">
              {retentionRows.map((row) => (
                <div
                  key={row.data}
                  className="grid grid-cols-[1.1fr_auto] items-center gap-3 border-b border-white/10 bg-background/60 px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_auto_1.4fr]"
                >
                  <span className="font-medium text-slate-200">{row.data}</span>
                  <span
                    className={`justify-self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      row.stored === true
                        ? 'bg-emerald-500/15 text-emerald-200'
                        : row.stored === 'temp'
                          ? 'bg-amber-500/15 text-amber-200'
                          : 'bg-rose-500/15 text-rose-200'
                    }`}
                  >
                    {row.stored === true ? 'Stored' : row.stored === 'temp' ? 'Temporary' : 'Not stored'}
                  </span>
                  <span className="col-span-2 text-sm leading-6 text-slate-400 sm:col-span-1">{row.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detection pipeline */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Detection</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Not one model — a calibrated pipeline</h2>
            <p className="mt-5 text-lg text-slate-300">
              Aggressive detection floods the workflow with noise; weak detection leaks. Accuracy comes from layering signals and
              tuning the gates between them.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detectionLayers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <layer.icon className="h-6 w-6 text-primary-light" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{layer.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment shapes */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Deployment</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">One engine, four ways to run it</h2>
            <p className="mt-5 text-lg text-slate-300">
              The same detection and policy core, delivered wherever your isolation requirements need it to live.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deploymentShapes.map((shape, index) => (
              <motion.div
                key={shape.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <shape.icon className="h-6 w-6 text-primary-light" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">{shape.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{shape.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest limits */}
      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] p-7 md:p-9">
            <SectionEyebrow>Honest limits</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold">What it does not solve</h2>
            <ul className="mt-6 space-y-4">
              {limits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Go deeper</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              See it run, or read how it’s <span className="gradient-text-warm">built</span>
            </h2>
            <p className="mt-5 text-lg text-slate-300">
              The engineering blog series breaks down the hard parts — streaming redaction, multilingual NER, the encrypted vault,
              the tamper-evident audit ledger — straight from the code.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={contactLinks.demo} className="btn btn-cta px-6 py-3">
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-slate-200 transition-colors hover:border-primary"
              >
                <BookOpen className="h-4 w-4 text-primary-light" />
                Read the deep-dives
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-slate-200 transition-colors hover:border-primary"
              >
                <Code2 className="h-4 w-4 text-primary-light" />
                Build with the SDK
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
