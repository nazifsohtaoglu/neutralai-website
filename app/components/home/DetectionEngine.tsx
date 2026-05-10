import { KeyRound, Languages, Network, ScanSearch } from 'lucide-react'
import { detectionStages, entityTypes, languageCoverage, maskingModes, technicalTrustDetails } from '../../data/homepage'

export default function DetectionEngine() {
  return (
    <section id="detection-engine" className="section">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.97)),radial-gradient(circle_at_14%_12%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_88%_18%,rgba(249,115,22,0.16),transparent_24%)] p-6 shadow-[0_28px_76px_rgba(2,8,23,0.46)] md:p-8">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Detection Engine</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                The technical detail buyers ask for, <span className="gradient-text-warm">without the wall of docs.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                NeutralAI combines real-time recognizers, semantic validation, tenant rules, and masking mode controls so security teams can understand what happens before prompt egress.
              </p>

              <div className="mt-8 grid gap-4">
                {detectionStages.map((stage, index) => (
                  <div
                    key={stage.title}
                    className={`relative overflow-hidden rounded-[24px] border p-5 ${
                      stage.accent === 'orange'
                        ? 'border-accent-cta/25 bg-[rgba(249,115,22,0.08)]'
                        : 'border-primary/20 bg-primary/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                        stage.accent === 'orange' ? 'bg-[rgba(249,115,22,0.14)]' : 'bg-primary/10'
                      }`}>
                        {index === 0 ? (
                          <ScanSearch className={`h-6 w-6 ${stage.accent === 'orange' ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                        ) : (
                          <Network className={`h-6 w-6 ${stage.accent === 'orange' ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-mono text-xs uppercase tracking-[0.24em] ${stage.accent === 'orange' ? 'text-[#fdba74]' : 'text-primary-light'}`}>
                          {stage.eyebrow}
                        </p>
                        <h3 className="mt-2 font-heading text-xl font-semibold text-slate-50">{stage.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{stage.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[26px] border border-white/10 bg-background/80 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-light">Entity Types Grid</p>
                    <h3 className="mt-2 font-heading text-2xl font-semibold">Visible coverage for common PII classes</h3>
                  </div>
                  <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary-light">
                    tenant rules
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {entityTypes.map((entity) => (
                    <div
                      key={entity}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-200"
                    >
                      {entity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[26px] border border-white/10 bg-background/80 p-5">
                  <Languages className="h-6 w-6 text-primary-light" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-primary-light">Benchmark Coverage</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {languageCoverage.map((language) => (
                      <div key={language.code} className="flex min-h-14 flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2">
                        <span className="font-mono text-xs text-primary-light">{language.code}</span>
                        <span className="mt-1 text-xs text-slate-200">{language.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-slate-400">
                    Current multilingual benchmark scope covers 10 target languages; additional packs should be promoted after approved benchmark releases.
                  </p>
                </div>

                <div className="rounded-[26px] border border-accent-cta/20 bg-[rgba(249,115,22,0.08)] p-5">
                  <KeyRound className="h-6 w-6 text-[#fdba74]" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[#fdba74]">Masking Modes</p>
                  <div className="mt-4 space-y-3">
                    {maskingModes.map((mode) => (
                      <div key={mode.mode} className="rounded-2xl border border-white/10 bg-background/80 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-heading text-base font-semibold text-slate-100">{mode.mode}</p>
                          <code className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-primary-light">
                            {mode.sample}
                          </code>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{mode.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {technicalTrustDetails.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <item.icon className="h-5 w-5 text-primary-light" />
                    <h4 className="mt-3 font-heading text-lg font-semibold text-slate-100">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
