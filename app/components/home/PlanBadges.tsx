import { KeyRound, ShieldCheck } from 'lucide-react'

const BYOK_PLANS = ['Business', 'Enterprise'] as const
const SSO_PLANS = ['Enterprise'] as const
const SSO_ROADMAP_PLANS = ['Business'] as const

export default function PlanBadges({ planName }: { planName: string }) {
  const hasByok = (BYOK_PLANS as readonly string[]).includes(planName)
  const hasSso = (SSO_PLANS as readonly string[]).includes(planName)
  const hasSsoRoadmap = (SSO_ROADMAP_PLANS as readonly string[]).includes(planName)

  if (!hasByok && !hasSso && !hasSsoRoadmap) return null

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {hasByok && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
          <KeyRound className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
          BYOK available
        </span>
      )}
      {hasSso && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-300">
          <ShieldCheck className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
          SSO required
        </span>
      )}
      {hasSsoRoadmap && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-400/[0.07] px-3 py-1 text-xs font-medium text-violet-300/70">
          <ShieldCheck className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
          SSO export path
        </span>
      )}
    </div>
  )
}
