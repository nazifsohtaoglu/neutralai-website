'use client'

import { motion } from 'framer-motion'
import { importanceCards } from '../../data/homepage'

export default function WhyItMatters() {
  return (
    <section id="problem" className="section">
      <div className="container-custom">
        <div className="accent-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Why It Matters</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                AI usage grows faster than <span className="gradient-text-warm">approval paths.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                The real problem is not just privacy. It is losing the ability to approve AI usage with confidence before shadow workflows become normal.
              </p>
              <div className="mt-6 inline-flex rounded-full border border-accent-cta/20 bg-[rgba(249,115,22,0.12)] px-4 py-2 text-sm text-[#fdba74]">
                NeutralAI creates the yes-path, not just another warning.
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
              {importanceCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`accent-card rounded-[24px] p-6 ${index === 1 ? 'border-accent-cta/25 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.94))]' : ''} ${index === 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <card.icon className={`h-6 w-6 ${index === 1 ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
