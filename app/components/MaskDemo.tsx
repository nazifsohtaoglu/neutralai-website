import { ArrowRight } from 'lucide-react'

// "Evidence as decoration": the product's core transformation rendered as a
// visual object. Static markup — no runtime cost, safe for static export.
export default function MaskDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/25 bg-[#050b18]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">prompt → model</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent-success">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-success" aria-hidden="true" />
          masked before send
        </span>
      </div>
      <div className="grid gap-0 font-mono text-[13px] leading-6 md:grid-cols-[1fr_auto_1fr]">
        <div className="px-4 py-4 text-slate-300">
          <span className="block text-[11px] uppercase tracking-[0.14em] text-slate-500">You type</span>
          <p className="mt-2">
            Advise <mark className="rounded bg-white/10 px-1 py-0.5 text-white">Sarah Thompson</mark>, NI{' '}
            <mark className="rounded bg-white/10 px-1 py-0.5 text-white">AB123456C</mark>, on the settlement offer.
          </p>
        </div>
        <div className="hidden items-center px-1 md:flex" aria-hidden="true">
          <ArrowRight className="h-4 w-4 text-primary-light" />
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-slate-300 md:border-l md:border-t-0">
          <span className="block text-[11px] uppercase tracking-[0.14em] text-slate-500">The model receives</span>
          <p className="mt-2">
            Advise <mark className="rounded bg-primary/15 px-1 py-0.5 font-semibold text-primary-light">&lt;PERSON_7K9X&gt;</mark>,
            NI <mark className="rounded bg-primary/15 px-1 py-0.5 font-semibold text-primary-light">&lt;NI_8W1R&gt;</mark>, on
            the settlement offer.
          </p>
        </div>
      </div>
    </div>
  )
}
