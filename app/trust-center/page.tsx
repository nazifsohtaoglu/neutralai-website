import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  ClipboardCheck,
  DatabaseZap,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Siren,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { contactLinks, siteConfig } from '../site'

// Source of truth: neutralai-gateway#750, documents/business/templates/trust_center_content_source_2026q2.md
export const metadata: Metadata = {
  title: 'Trust Center',
  description:
    'NeutralAI security, SOC2 readiness, data minimization, audit evidence, and enterprise compliance posture.',
  alternates: {
    canonical: '/trust-center',
  },
}

const posture = [
  {
    label: 'SOC2 readiness',
    value: 'In progress',
    detail: 'Mapped to Security, Availability, and Confidentiality. This is not a certification claim.',
  },
  {
    label: 'Runtime',
    value: 'Live',
    detail: 'Public gateway endpoints are available behind TLS for launch and customer evaluation.',
  },
  {
    label: 'Evidence',
    value: 'Prepared',
    detail: 'Readiness report and questionnaire prefill are available for enterprise review under NDA.',
  },
] as const

const controls = [
  {
    icon: ShieldCheck,
    title: 'Policy boundary',
    body: 'NeutralAI sits before external AI providers so sensitive prompt data can be inspected, masked, and governed before egress.',
  },
  {
    icon: DatabaseZap,
    title: 'Data minimization',
    body: 'The product is designed around masking, tokenization, and zero-retention operating patterns rather than broad prompt storage.',
  },
  {
    icon: LockKeyhole,
    title: 'Encrypted tokenization',
    body: 'Vault payloads use encrypted tokenization with tenant-bound context for governed restore paths.',
  },
  {
    icon: ClipboardCheck,
    title: 'Audit evidence',
    body: 'Control events, benchmark artifacts, readiness reports, and evidence manifests support security review conversations.',
  },
  {
    icon: Activity,
    title: 'Availability posture',
    body: 'Health checks, readiness endpoints, rollback procedures, and measured latency evidence are part of the operating model.',
  },
  {
    icon: Siren,
    title: 'Incident response',
    body: 'Escalation, containment, post-incident review, and customer communication workflows are documented.',
  },
] as const

const evidence = [
  'SOC2 readiness report for enterprise security review',
  'Security questionnaire prefill for common procurement questions',
  'PII detection benchmark narrative and holdout benchmark guardrails',
  'Latency benchmark summary that separates NeutralAI overhead from model generation',
  'Pen-test readiness and remediation SLA tracker',
  'Compliance evidence cadence and monthly package automation',
] as const

const caveats = [
  'NeutralAI has not completed a formal SOC2 audit.',
  'Detailed evidence is shared through Security and Legal review, usually under NDA.',
  'Public claims are intentionally narrower than internal readiness artifacts.',
] as const

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(249,115,22,0.13),transparent_24%)]" />

        <div className="container-custom relative z-10">
          <BackButton />

          <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Trust Center</p>
              <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[0.98] md:text-6xl">
                Evidence for teams that need AI security to be provable.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                NeutralAI combines a policy boundary, encrypted tokenization, audit evidence, and deployment choices for regulated teams adopting AI.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={contactLinks.securityReview} className="btn btn-cta">
                  Request security review
                </a>
                <Link href="/security" className="btn btn-secondary">
                  Security overview
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-primary/25 bg-background-secondary/70 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Current posture</p>
                  <p className="mt-1 font-heading text-2xl font-semibold">Readiness, not theater</p>
                </div>
                <FileCheck2 className="h-8 w-8 text-primary-light" />
              </div>
              <div className="mt-4 space-y-3">
                {posture.map((item) => (
                  <div key={item.label} className="rounded-md border border-border/80 bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
                        {item.value}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Control Areas</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Security, availability, and confidentiality controls.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {controls.map((control) => (
              <div key={control.title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <control.icon className="h-5 w-5 text-primary-light" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">{control.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{control.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Enterprise Evidence</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Ready for security review.</h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                The public site keeps claims conservative. For procurement and security teams, NeutralAI can provide structured readiness materials through the review process.
              </p>
            </div>

            <div className="grid gap-3">
              {evidence.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-border bg-background px-4 py-3">
                  <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-[#fdba74]" />
                  <span className="text-sm leading-6 text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="rounded-lg border border-[#fdba74]/25 bg-[#fdba74]/10 p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Claim Boundary</p>
            <h2 className="mt-3 font-heading text-2xl font-bold md:text-3xl">SOC2 readiness is in progress.</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {caveats.map((item) => (
                <p key={item} className="text-sm leading-6 text-slate-200">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-6 rounded-lg border border-border bg-background p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Next step</p>
              <h2 className="mt-3 font-heading text-3xl font-bold">Need the evidence pack?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Send the security context you need reviewed. We will route questionnaire, readiness, and compliance evidence requests through the right owner.
              </p>
            </div>
            <a href={contactLinks.securityReview} className="btn btn-cta justify-center">
              Contact NeutralAI
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
