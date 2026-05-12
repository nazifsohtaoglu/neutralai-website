import { ArrowRight } from 'lucide-react'
import { contactLinks, siteConfig } from '../../site'

export default function CtaSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-52 w-52 rounded-full bg-[rgba(249,115,22,0.14)] blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_22%)] px-6 py-10 text-center shadow-[0_32px_80px_rgba(2,8,23,0.5)] md:px-10 md:py-12">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Final CTA</p>
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
            Put the <span className="gradient-text-warm">control layer</span> in place before the rollout gets messy
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-300">
            NeutralAI is for teams that already know AI usage is happening and want a credible way to reduce prompt risk without slowing everyone down.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={siteConfig.signupUrl}
              className="btn btn-cta w-full px-8 py-4 text-lg sm:w-auto"
              data-analytics-event="CTA Click"
              data-analytics-label="Try Free"
              data-analytics-placement="homepage_final_cta"
            >
              Try Free
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={contactLinks.enterprise}
              className="btn btn-secondary w-full px-8 py-4 text-lg sm:w-auto"
              data-analytics-event="CTA Click"
              data-analytics-label="Talk to Sales"
              data-analytics-placement="homepage_final_cta"
            >
              Talk to Sales
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Need a security or commercial conversation first?{' '}
            <a
              href={contactLinks.enterprise}
              className="text-primary-light hover:text-primary"
              data-analytics-event="CTA Click"
              data-analytics-label="Contact NeutralAI"
              data-analytics-placement="homepage_final_cta"
            >
              Contact NeutralAI
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
