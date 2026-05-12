import { CheckCircle2 } from 'lucide-react'
import { evaluationStories, socialProofIndustries, socialProofMetrics } from '../../data/homepage'
import SectionIntro from './SectionIntro'

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="section bg-background-secondary">
      <div className="container-custom">
        <SectionIntro
          eyebrow="Social Proof"
          title="Proof buyers can verify."
          description="Evidence for regulated teams: supported industries, public benchmark scope, measured gateway overhead, and evaluation patterns without invented customer claims."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {socialProofIndustries.map((industry) => (
            <article key={industry.title} className="rounded-[22px] border border-white/10 bg-background p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
                <industry.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold text-white">{industry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{industry.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] p-6 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Proof-backed metrics</p>
            <h3 className="mt-4 font-heading text-3xl font-semibold text-white">Concrete signals buyers can verify.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              These numbers come from product surfaces, benchmark artifacts, and documented website claims. Production usage counts and customer outcomes are published only when an approved source exists.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {socialProofMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-heading text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-light">{metric.label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {evaluationStories.map((story) => (
              <article key={story.label} className="rounded-[28px] border border-white/10 bg-background p-6">
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
