'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { contactLinks, siteConfig } from '../../site'
import { benchmarkProof, documentRedactionPoints, healthcareTrustPoints, trustCards } from '../../data/homepage'

export default function TrustSection() {
  return (
    <section id="trust" className="section">
      <div className="container-custom">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96)),radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(249,115,22,0.14),transparent_22%)] p-6 shadow-[0_28px_70px_rgba(2,8,23,0.42)] md:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Why Trust NeutralAI</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Proof your security team <span className="gradient-text-warm">can trust.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                NeutralAI goes beyond masking by combining policy enforcement, encrypted tokenization, audit-ready evidence, and deployment options built for regulated AI adoption.
              </p>
            </div>

            <div className="grid gap-4">
              {trustCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`rounded-[22px] border p-5 ${index === 1 ? 'border-accent-cta/25 bg-[rgba(249,115,22,0.08)]' : 'border-white/10 bg-background/80'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${index === 1 ? 'bg-[rgba(249,115,22,0.14)]' : 'bg-primary/10'}`}>
                      <card.icon className={`h-5 w-5 ${index === 1 ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div id="benchmark-proof" className="mt-10 scroll-mt-28 overflow-hidden rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(6,182,212,0.12),rgba(15,23,42,0.94)_42%,rgba(249,115,22,0.10))] p-6">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Benchmark proof</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold">Measured against a reproducible Presidio-vanilla baseline.</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                NeutralAI combines proven open-source detection primitives with multilingual calibration, masking, and enforcement layers. The gateway repo remains the measurement source of truth, while the website links buyers to the published methodology and benchmark surface.
              </p>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                Product benchmark, not a third-party independent evaluation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Public overall F1', benchmarkProof.publicOverallF1],
                ['Holdout overall F1', benchmarkProof.holdoutOverallF1],
                ['Holdout PERSON F1', benchmarkProof.personHoldoutF1],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-background/80 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={benchmarkProof.appBenchmarkUrl} className="btn btn-cta justify-center px-6 py-3 text-sm">
              Open benchmark
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/presidio-alternative" className="btn btn-secondary justify-center px-6 py-3 text-sm">
              Read Presidio comparison
            </a>
          </div>
        </div>

        <div id="healthcare-trust" className="mt-10 scroll-mt-28 overflow-hidden rounded-[28px] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(15,23,42,0.96)_46%,rgba(6,182,212,0.10))] p-6">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-300">Healthcare trust</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold">HIPAA-ready deployment support without blanket claims.</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                NeutralAI helps healthcare and healthtech teams protect PHI before prompts reach AI providers, with PHI-aware controls, audit evidence, and BAA review support for eligible deployments.
              </p>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                Not legal advice. BAA terms, deployment model, and customer obligations require review.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={contactLinks.securityReview} className="btn btn-cta justify-center px-6 py-3 text-sm">
                  Discuss healthcare deployment
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/use-cases/healthcare" className="btn btn-secondary justify-center px-6 py-3 text-sm">
                  View healthcare use case
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {healthcareTrustPoints.map((point) => (
                <div key={point.label} className="rounded-2xl border border-white/10 bg-background/80 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">{point.label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="document-redaction-proof" className="mt-10 scroll-mt-28 overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(15,23,42,0.96)_48%,rgba(148,163,184,0.10))] p-6">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200">Document proof</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold">Protect files before document content reaches AI workflows.</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                NeutralAI document handling extends PII protection beyond chat prompts, with document-aware extraction, redaction output, and audit-safe finding metadata for supported upload flows.
              </p>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                Supports simple text PDFs today. OCR-backed image detection depends on configured OCR runtime.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {documentRedactionPoints.map((point) => (
                <div key={point.label} className="rounded-2xl border border-white/10 bg-background/70 p-5">
                  <point.icon className="h-5 w-5 text-cyan-200" />
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">{point.label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-accent-cta/20 bg-[linear-gradient(180deg,rgba(249,115,22,0.08),rgba(15,23,42,0.92))] p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Operational Signals</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold">Live runtime. Measured product proof.</h3>
              <p className="mt-4 max-w-3xl text-slate-300">
                The public signal is simple: the runtime is live on <span className="text-primary-light">api.neutralai.co.uk</span>, the benchmark pages are published, and the gateway overhead is measured separately from model generation time.
              </p>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-slate-200">
                GET {siteConfig.apiHealthUrl.replace('https://', '')}
              </div>
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-slate-200">
                GET {siteConfig.apiReadyUrl.replace('https://', '')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
