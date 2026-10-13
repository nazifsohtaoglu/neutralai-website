import { aiCreditExplanation, maskingExplanation, maskingLimitsExplanation } from '../../lib/plan-finder'

export default function PricingUsageGuide() {
  return (
    <details id="pricing-usage-guide" className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/15 bg-background-secondary p-5 text-sm text-slate-300">
      <summary className="cursor-pointer font-semibold text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light">
        What do masking requests and AI credits mean?
      </summary>
      <div className="mt-4 space-y-4 leading-6">
        <p>{maskingExplanation}</p>
        <p><strong className="text-slate-100">Example:</strong> Submitting a short email for masking is one request, even if it contains several names and phone numbers. Sending a revised version is another request.</p>
        <p>{maskingLimitsExplanation}</p>
        <p><strong className="text-slate-100">AI credit:</strong> {aiCreditExplanation}</p>
      </div>
    </details>
  )
}
