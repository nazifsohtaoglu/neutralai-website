'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { pricingFaqs } from '../../data/homepage'

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-[20px] border border-white/10 bg-background/75">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      >
        <span className="font-heading text-base font-semibold text-slate-100">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-6 text-slate-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingFaq() {
  return (
    <div className="mt-10">
      <h3 className="font-heading text-2xl font-semibold">Frequently asked questions</h3>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {pricingFaqs.map((item) => (
          <FaqAccordionItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  )
}
