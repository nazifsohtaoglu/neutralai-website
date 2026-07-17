const comparisonTiers = ['Free', 'Developer', 'Starter', 'Team', 'Business', 'Enterprise'] as const

// Direct process.env reference so the price figures below drop out of the bundle
// entirely while pricing publication is gated (see app/data/homepage.ts).
const comparisonRows: ReadonlyArray<readonly [string, string, string, string, string, string, string]> =
  process.env.NEXT_PUBLIC_SHOW_PRICING === 'true'
    ? [
        ['Masking requests', '1k', '10K', '10K', '100K', '500K', 'Custom'],
        ['Managed AI credit', '£1 trial', 'Bring your own LLM', '£3', '£10', '£25', 'Custom'],
        ['Provider spend model', 'Managed sandbox', 'BYO LLM (shield-only)', 'Managed eval', 'BYOK recommended', 'BYOK expected', 'Customer-owned'],
        ['API key management', 'Basic', 'Shield API/SDK only', 'Basic', 'Team', 'Full lifecycle', 'Scoped controls'],
        ['SSO / SIEM path', 'No', 'No', 'No', 'Roadmap', 'Export path', 'Required'],
      ]
    : []

export default function PricingComparisonTable() {
  return (
    <>
      {/* Desktop: full comparison grid */}
      <div className="mt-8 hidden overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] lg:block">
        <div className="grid grid-cols-7 border-b border-white/10 text-sm text-slate-300">
          <div className="px-4 py-3 font-semibold text-slate-100">Capability</div>
          {comparisonTiers.map((tier) => (
            <div key={tier} className="px-4 py-3 font-semibold text-slate-100">{tier}</div>
          ))}
        </div>
        {comparisonRows.map(([label, ...values]) => (
          <div key={label} className="grid grid-cols-7 border-b border-white/10 text-sm text-slate-300 last:border-b-0">
            <div className="px-4 py-3 text-slate-100">{label}</div>
            {values.map((value, i) => (
              <div key={comparisonTiers[i]} className="px-4 py-3">{value}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile/tablet: one card per plan, listing all its capabilities — no horizontal scroll */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden">
        {comparisonTiers.map((tier, tierIdx) => (
          <div key={tier} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <h4 className="font-heading text-base font-semibold text-primary-light">{tier}</h4>
            <dl className="mt-3 space-y-2">
              {comparisonRows.map(([label, ...values]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                >
                  <dt className="text-sm text-slate-400">{label}</dt>
                  <dd className="text-right text-sm font-medium text-slate-200">{values[tierIdx]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  )
}
