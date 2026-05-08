'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Database,
  ExternalLink,
  FileText,
  KeyRound,
  Lock,
  Network,
  Scale,
  ServerCog,
  Shield,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { contactLinks, siteConfig } from '../site'

const securitySections = [
  {
    icon: Shield,
    title: 'Gateway boundary',
    description:
      'NeutralAI is positioned as a security boundary between customer applications and external model providers so policy can be applied before data leaves the trusted path.',
  },
  {
    icon: ServerCog,
    title: 'Operational checks',
    description:
      'The live runtime exposes health and readiness endpoints to support smoke tests, deployment checks, and simple launch monitoring.',
  },
  {
    icon: Lock,
    title: 'Data handling posture',
    description:
      'The product story emphasizes transient processing and policy-aware handling instead of broad retention claims that would be hard to support operationally.',
  },
  {
    icon: Database,
    title: 'Production hardening',
    description:
      'Immutable compliance storage and stricter enforcement controls remain part of the production readiness path and are called out explicitly in launch messaging.',
  },
] as const

const readinessItems = [
  'Public endpoints are live behind TLS on api.neutralai.co.uk.',
  'Docker-based deployment and reverse proxy setup are already in place.',
  'The current public website describes production controls without implying unsupported certification status.',
  'Production go-live discussions should include the immutable storage roadmap and security review scope.',
] as const

const securitySpecs = [
  {
    icon: Lock,
    title: 'Encryption and token vault',
    description:
      'Sensitive values can be replaced with reversible tokens backed by an AES-256-GCM vault, then restored only through governed paths.',
  },
  {
    icon: Network,
    title: 'Detection pipeline',
    description:
      'Detection combines Presidio NER, pattern matching, semantic validation with Qdrant, and configurable confidence thresholds.',
  },
  {
    icon: FileText,
    title: 'Entity coverage',
    description:
      'Coverage includes EMAIL, PHONE, PERSON, CREDIT_CARD, IBAN, SSN, TR_ID, UK_NHS, IP_ADDRESS, and tenant-specific rules.',
  },
  {
    icon: KeyRound,
    title: 'Governed restore path',
    description:
      'Reversible masking is separated from normal model traffic so restored values can remain behind explicit authorization and audit controls.',
  },
] as const

const architectureSteps = [
  'Client app or browser extension',
  'NeutralAI policy and masking gateway',
  'Sanitized request to external LLM provider',
] as const

export default function SecurityPage() {
  return (
    <main className="min-h-screen pt-24">
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
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Security Overview</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              Launch trust starts with an accurate posture
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              This page summarizes the current public security story for NeutralAI: what is live, what is suitable for evaluation, and what is still part of the production-hardening path.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2">
            {securitySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mt-5 font-heading text-2xl font-semibold">{section.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{section.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96)),radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_24%)] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Technical controls</p>
                <h2 className="mt-4 font-heading text-3xl font-bold">Mask first, then route the sanitized request</h2>
                <p className="mt-4 text-slate-400">
                  NeutralAI adds a policy gateway before external model providers so sensitive values can be detected, tokenized, and audited before prompt egress.
                </p>

                <div className="mt-6 grid gap-3">
                  {architectureSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 font-mono text-sm text-primary-light">
                        0{index + 1}
                      </div>
                      <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-slate-200">
                        {step}
                      </div>
                      {index < architectureSteps.length - 1 ? <ArrowRight className="hidden h-5 w-5 text-primary-light sm:block" /> : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {securitySpecs.map((spec) => (
                  <div key={spec.title} className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                    <spec.icon className="h-5 w-5 text-primary-light" />
                    <h3 className="mt-4 font-heading text-xl font-semibold">{spec.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{spec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Readiness snapshot</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Current public position</h2>
              <ul className="mt-6 space-y-4">
                {readinessItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="card p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Useful links</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Validate or get in touch</h2>
              <div className="mt-6 space-y-4">
                <a
                  href={siteConfig.apiHealthUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4 text-slate-200 transition-colors hover:border-primary"
                >
                  <span>Public health endpoint</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </a>
                <a
                  href={siteConfig.apiReadyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4 text-slate-200 transition-colors hover:border-primary"
                >
                  <span>Public readiness endpoint</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </a>
                <a
                  href={`${siteConfig.url}${siteConfig.securityTxtPath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4 text-slate-200 transition-colors hover:border-primary"
                >
                  <span>Public security.txt</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </a>
                <a
                  href={contactLinks.securityMailto}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4 text-slate-200 transition-colors hover:border-primary"
                >
                  <span>Security mailbox</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </a>
              </div>
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-slate-200">
                <Scale className="mb-3 h-5 w-5 text-primary-light" />
                Production discussions should include the immutable storage milestone and any customer-specific evidence requirements.
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
