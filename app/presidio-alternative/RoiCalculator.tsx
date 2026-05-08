'use client'

import { useMemo, useState } from 'react'
import { Calculator, CheckCircle2 } from 'lucide-react'

const maintenanceItems = [
  'SpaCy and NLP model updates',
  'Recognizer tuning and regression packs',
  'Security patches and dependency drift',
  'Scaling, observability, and incident response',
  'Compliance evidence and customer questionnaires',
  'Browser store releases and extension support',
] as const

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)))
}

export default function RoiCalculator() {
  const [engineers, setEngineers] = useState(3)
  const [months, setMonths] = useState(9)
  const [monthlyCost, setMonthlyCost] = useState(18000)
  const [complianceHours, setComplianceHours] = useState(140)
  const [neutralaiMonthly, setNeutralaiMonthly] = useState(499)

  const roi = useMemo(() => {
    const engineeringCost = engineers * monthlyCost * months
    const platformCost = 2500 * months
    const complianceCost = complianceHours * 150
    const internalBuildCost = engineeringCost + platformCost + complianceCost
    const neutralaiCost = neutralaiMonthly * months
    return {
      engineeringCost,
      platformCost,
      complianceCost,
      internalBuildCost,
      neutralaiCost,
      estimatedSavings: internalBuildCost - neutralaiCost,
    }
  }, [complianceHours, engineers, monthlyCost, months, neutralaiMonthly])

  return (
    <section id="roi-calculator" className="section border-y border-border/80 bg-background-secondary">
      <div className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-success/25 bg-accent-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-success">
            <Calculator className="h-3.5 w-3.5" />
            Build vs buy ROI calculator
          </div>
          <h2 className="mt-5 font-heading text-3xl font-bold md:text-5xl">
            The hidden cost is not installing Presidio. It is productizing everything around it.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
            Use conservative assumptions to estimate the internal build path. This calculator keeps the model simple:
            engineering time, platform operations, and compliance evidence work.
          </p>

          <div className="mt-7 grid gap-3">
            {maintenanceItems.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-primary-light" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/12 bg-background/85 p-6 shadow-[0_24px_90px_rgba(2,6,23,0.45)]">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-white">Engineers assigned</span>
              <input
                type="range"
                min="1"
                max="8"
                value={engineers}
                onChange={(event) => setEngineers(Number(event.target.value))}
                className="mt-3 w-full accent-primary"
              />
              <span className="mt-1 block text-sm text-slate-300">{engineers} engineers</span>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-white">Build timeline</span>
              <input
                type="range"
                min="3"
                max="18"
                value={months}
                onChange={(event) => setMonths(Number(event.target.value))}
                className="mt-3 w-full accent-primary"
              />
              <span className="mt-1 block text-sm text-slate-300">{months} months</span>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-white">Loaded monthly cost per engineer</span>
              <input
                type="number"
                min="8000"
                step="1000"
                value={monthlyCost}
                onChange={(event) => setMonthlyCost(Number(event.target.value))}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-white">Compliance and review hours</span>
              <input
                type="number"
                min="0"
                step="10"
                value={complianceHours}
                onChange={(event) => setComplianceHours(Number(event.target.value))}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-white">NeutralAI monthly subscription assumption</span>
              <input
                type="number"
                min="0"
                step="100"
                value={neutralaiMonthly}
                onChange={(event) => setNeutralaiMonthly(Number(event.target.value))}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">DIY build</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatUsd(roi.internalBuildCost)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">NeutralAI</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatUsd(roi.neutralaiCost)}</p>
            </div>
            <div className="rounded-2xl border border-accent-success/25 bg-accent-success/10 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-accent-success">Estimated savings</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatUsd(roi.estimatedSavings)}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">
            <p>
              Breakdown: {formatUsd(roi.engineeringCost)} engineering, {formatUsd(roi.platformCost)} platform
              operations, and {formatUsd(roi.complianceCost)} compliance evidence work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
