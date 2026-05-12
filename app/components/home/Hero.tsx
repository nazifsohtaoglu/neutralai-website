import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '../../site'
import { complianceProofs, trustBadges } from '../../data/homepage'
import ProductVisual from './ProductVisual'

function ProofCard({ proof }: { proof: (typeof complianceProofs)[number] }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <proof.icon className="h-5 w-5 text-primary-light" />
      <p className="mt-3 break-words text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
        {proof.label}
      </p>
      <p className="mt-1 break-words font-heading text-base font-semibold text-slate-100 sm:text-lg">{proof.value}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />

      <div className="container-custom relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.84fr_1.16fr] xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary-light">
              <span className="h-2 w-2 rounded-full bg-accent-success animate-pulse" />
              AI Security Gateway - Now Available
            </div>

            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight md:text-6xl xl:text-7xl">
              Mask sensitive prompt data <span className="gradient-text-warm">before it leaves AI apps.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
              NeutralAI adds a compliance-first control layer for browser AI and app traffic, with masking, encrypted tokenization, and audit-ready proof for regulated teams.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={siteConfig.signupUrl} className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Try Free
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href={siteConfig.demoUrl} className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Book Demo
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="/install-extension" className="text-primary-light transition-colors hover:text-primary">
                Install browser extension
              </a>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <a
                href={siteConfig.apiHealthUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-slate-200"
              >
                View live API health
              </a>
            </div>

            <div className="mt-10 space-y-3">
              {[
                'Stops raw PII and business identifiers before they reach external models',
                'Generates compliance evidence for AI usage instead of relying on manual screenshots',
                'Supports browser extension, managed gateway, private cloud, and on-prem rollout paths',
                'Helps legal and security approve AI adoption without blocking everyday workflows',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:hidden">
              {complianceProofs.map((proof) => (
                <ProofCard key={proof.label} proof={proof} />
              ))}
            </div>
          </div>

          <div className="lg:-mt-3 xl:-mt-4">
            <ProductVisual />
            <div className="mt-4 hidden gap-3 lg:grid lg:grid-cols-3">
              {complianceProofs.map((proof) => (
                <ProofCard key={proof.label} proof={proof} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-custom relative z-10 mt-12">
        <div className="marquee rounded-full border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="marquee-track gap-3">
            {[...trustBadges, ...trustBadges].map((badge, index) => (
              <span
                key={`${badge}-${index}`}
                className="inline-flex whitespace-nowrap rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-light"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
