'use client'

import { motion } from 'framer-motion'
import { steps } from '../../data/homepage'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-background-secondary">
      <div className="container-custom">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96)),radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_26%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_24%)] p-6 shadow-[0_28px_70px_rgba(2,8,23,0.42)] md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">How It Works</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              Three steps. <span className="gradient-text-warm">One control layer.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-300">
              NeutralAI sits between the workflow and the model, intercepting traffic before raw sensitive values continue downstream.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-background/85 p-6"
              >
                <div className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600">
                  0{index + 1}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? 'bg-[rgba(249,115,22,0.14)]' : 'bg-primary/10'}`}>
                  <step.icon className={`h-6 w-6 ${index === 1 ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{step.description}</p>
                <div className={`mt-6 h-1 w-16 rounded-full ${index === 1 ? 'bg-[linear-gradient(90deg,#f97316,#fdba74)]' : 'bg-[linear-gradient(90deg,#22d3ee,#7dd3fc)]'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
