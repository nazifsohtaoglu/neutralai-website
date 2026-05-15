import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { evaluationStories, socialProofIndustrySlides, socialProofMetrics } from '../../data/homepage'
import SectionIntro from './SectionIntro'

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="section">
      <div className="container-custom">
        <SectionIntro
          eyebrow="Social Proof"
          title="Proof buyers can verify."
          description="Evidence for regulated teams: supported industries, public benchmark scope, measured gateway overhead, and evaluation patterns without invented customer claims."
        />

        <div className="mt-10">
          <div className="flex flex-wrap gap-2">
            {socialProofIndustrySlides.map((industry) => (
              <span
                key={industry.title}
                className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-primary-light"
              >
                {industry.title}
              </span>
            ))}
          </div>

          <div className="industry-slider-shell mt-4 rounded-[24px] p-3 md:p-4">
            <div className="industry-slider-track">
              {[...socialProofIndustrySlides, ...socialProofIndustrySlides].map((slide, index) => (
                <article key={`${slide.title}-${index}`} className="industry-slide-card">
                  <div className="relative overflow-hidden rounded-[16px]">
                    <Image
                      src={slide.image}
                      alt={`${slide.title} usage with NeutralAI prompt masking and policy controls`}
                      width={700}
                      height={420}
                      className="h-[210px] w-full object-cover md:h-[250px]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-heading text-xl font-semibold text-white">{slide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{slide.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="proof-ledger rounded-[28px] p-6 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Proof-backed metrics</p>
            <h3 className="mt-4 font-heading text-3xl font-semibold text-white">Concrete signals buyers can verify.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              These numbers come from product surfaces, benchmark artifacts, and documented website claims. Production usage counts and customer outcomes are published only when an approved source exists.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/15">
              <div className="proof-ledger-head grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                <span>Signal</span>
                <span>Why it matters</span>
              </div>
              <div className="divide-y divide-white/10">
                {socialProofMetrics.map((metric) => (
                  <div key={metric.label} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-4 py-4">
                    <p className="font-heading text-2xl font-semibold text-white">{metric.value}</p>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-light">{metric.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{metric.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {evaluationStories.map((story) => (
              <article key={story.label} className="proof-pattern-card rounded-[28px] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#fdba74]">{story.label}</p>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-white">{story.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{story.body}</p>
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <span>{story.outcome}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
