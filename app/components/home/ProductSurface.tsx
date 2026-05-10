'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Monitor } from 'lucide-react'
import { siteConfig } from '../../site'
import { deploymentCards } from '../../data/homepage'

export default function ProductSurface() {
  return (
    <section className="section bg-background-secondary">
      <div className="container-custom">
        <div className="accent-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Adoption Without Friction</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Secure AI usage <span className="gradient-text-warm">without changing habits</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                NeutralAI works best when adoption does not require a behaviour reset. Teams keep familiar browser-based AI tools while NeutralAI adds prompt protection, auth context, and policy support in the background.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  'No retraining project just to start using AI more safely',
                  'No forced portal switch for teams already working in browser-based tools',
                  'A better rollout story because security arrives without workflow drag',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="accent-card rounded-[28px] p-5 md:p-6">
              <div className="flex items-center gap-2 text-xs text-primary-light">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-cta" />
                Browser extension
              </div>

              <div className="mt-4">
                <h3 className="font-heading text-2xl font-semibold text-slate-50">
                  Same tab. <span className="gradient-text-warm">Same prompt box.</span> Protected underneath.
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  NeutralAI can protect browser-based AI usage in the flow people already know, which is exactly why adoption can move faster.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href={siteConfig.signupUrl} className="btn btn-cta w-full sm:w-auto">
                    Try Free
                  </a>
                  <a href="/install-extension" className="btn btn-secondary w-full sm:w-auto">
                    Install Browser Extension
                  </a>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-background/85 p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="ml-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-primary-light">
                    Extension active
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-primary/15 bg-background-secondary/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-light">User Experience</p>
                  <p className="mt-3 text-lg text-slate-100">People keep the workflow. NeutralAI adds the protection layer.</p>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-primary/15 bg-background-secondary/70 p-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-primary-light" />
                      <p className="text-xs uppercase tracking-[0.2em] text-primary-light">What Users Feel</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      No workflow disruption, no extra friction, and no new daily habit to learn.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-accent-cta/20 bg-[rgba(249,115,22,0.08)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#fdba74]">What Security Gets</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      A real control point over browser-based AI usage instead of hoping people self-police prompts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Deployment Options</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              One product, <span className="gradient-text-warm">multiple deployment paths</span>
            </h2>
            <p className="mt-5 text-lg text-slate-400">
              NeutralAI is not a single hosting story. Teams can choose the operating model that fits their risk posture, infrastructure constraints, and rollout speed.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {deploymentCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="accent-card rounded-[24px] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <card.icon className="h-6 w-6 text-primary-light" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                    NeutralAI
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm font-medium text-[#fdba74]">{card.audience}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
