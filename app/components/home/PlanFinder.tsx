'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { pricingPlans } from '../../data/homepage'
import { aiCreditExplanation, isValidPeople, maskingLimitsExplanation, recommendPlan, type Controls, type Workflow } from '../../lib/plan-finder'
import { contactLinks } from '../../site'

const workflows: { value: Workflow; title: string; detail: string }[] = [
  { value: 'evaluate', title: 'Try it first', detail: 'Explore masking before committing to a paid plan.' },
  { value: 'workspace', title: 'Use the app or browser extension', detail: 'Protect text in my own or my team’s day-to-day workflow.' },
  { value: 'api', title: 'Connect the masking API', detail: 'Build masking into my application and call my own AI provider.' },
]
const controlOptions: { value: Controls; title: string; detail: string }[] = [
  { value: 'personal', title: 'Personal use or a simple integration', detail: 'No shared audit history or reviewer workflow needed.' },
  { value: 'shared', title: 'Shared team history', detail: 'See team usage and audit activity in one workspace.' },
  { value: 'governed', title: 'Reviewer and policy controls', detail: 'Group work by matter and manage reviews, policies and reporting.' },
  { value: 'enterprise', title: 'SSO, integrations or private deployment', detail: 'Discuss requirements and a tailored rollout.' },
]
const gbp = (value: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }).format(value)
const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light'

export default function PlanFinder() {
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [people, setPeople] = useState('')
  const [controls, setControls] = useState<Controls | null>(null)
  const validPeople = isValidPeople(Number(people))
  const recommendation = workflow && controls && validPeople
    ? recommendPlan({ workflow, people: Number(people), controls }, pricingPlans)
    : null
  const plan = recommendation && pricingPlans.find((candidate) => candidate.name === recommendation.name)
  const canContinue = step === 0 ? workflow !== null : step === 1 ? validPeople : controls !== null
  const title = step === 0 ? 'How will you use NeutralAI?' : step === 1 ? 'How many people need access?' : step === 2 ? 'Which controls do you need?' : 'Your starting recommendation'

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  useEffect(() => {
    if (open) {
      heading.current?.focus({ preventScroll: true })
      if (dialog.current) dialog.current.scrollTop = 0
    }
  }, [open, step])

  function start() {
    setStep(0)
    setWorkflow(null)
    setPeople('')
    setControls(null)
    dialog.current?.showModal()
    setOpen(true)
  }

  return (
    <>
      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-4 border-l-2 border-primary-light bg-background-secondary px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading text-xl font-semibold text-slate-50">Not sure where to start?</h3>
          <p className="mt-1 text-sm text-slate-300">Three questions. A plan with its costs and limits explained.</p>
        </div>
        <button ref={trigger} type="button" onClick={start} aria-haspopup="dialog" className={`btn btn-cta shrink-0 ${focusClass}`}>
          Find my plan <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="plan-finder-title"
        aria-describedby="plan-finder-description"
        onClose={() => { setOpen(false); trigger.current?.focus() }}
        className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-600 bg-background-secondary p-0 text-slate-100 shadow-2xl backdrop:bg-black/75"
      >
        <div className="p-5 sm:p-8">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background-secondary pb-2">
            <p className="text-sm text-primary-light">{step < 3 ? `Question ${step + 1} of 3` : 'Plan and usage summary'}</p>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close plan finder" className={`rounded-lg p-2 text-slate-300 hover:bg-white/10 ${focusClass}`}>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <h2 ref={heading} tabIndex={-1} id="plan-finder-title" className="mt-4 font-heading text-2xl font-semibold leading-tight outline-none sm:text-3xl">{title}</h2>
          <p id="plan-finder-description" className="mt-3 text-sm leading-6 text-slate-300">
            {step === 1 ? 'Count people who will sign in to your NeutralAI workspace, not the end users of an app you are building.' : 'Answers stay in this window. No email address is needed.'}
          </p>

          {step === 0 || step === 2 ? (
            <fieldset className="mt-6 space-y-3">
              <legend className="sr-only">{title}</legend>
              {(step === 0 ? workflows : controlOptions).map((option) => (
                <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-600 p-4 hover:border-primary-light has-[:checked]:border-primary-light has-[:checked]:bg-primary/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-light">
                  <input type="radio" name={`plan-finder-step-${step}`} value={option.value} checked={(step === 0 ? workflow : controls) === option.value} onChange={() => step === 0 ? setWorkflow(option.value as Workflow) : setControls(option.value as Controls)} className="mt-1 h-4 w-4 shrink-0 accent-cyan-400" />
                  <span><span className="block font-medium">{option.title}</span><span className="mt-1 block text-sm leading-5 text-slate-300">{option.detail}</span></span>
                </label>
              ))}
            </fieldset>
          ) : step === 1 ? (
            <div className="mt-6">
              <label htmlFor="plan-finder-people" className="block font-medium">People in your workspace</label>
              <input id="plan-finder-people" type="number" min={1} max={10000} step={1} inputMode="numeric" value={people} onChange={(event) => setPeople(event.target.value)} aria-describedby="plan-finder-people-hint" aria-invalid={people !== '' && !validPeople} className={`mt-3 w-full rounded-xl border border-slate-500 bg-background p-4 text-lg ${focusClass}`} />
              <p id="plan-finder-people-hint" className="mt-3 text-sm text-slate-300">Enter a whole number from 1 to 10,000. Extra users, where available, are included in your price estimate.</p>
            </div>
          ) : plan && recommendation ? (
            <div className="mt-6 space-y-5" data-testid="plan-finder-result">
              <div className="border-l-2 border-primary-light pl-4">
                <h3 className="font-heading text-3xl font-semibold">{plan.name}</h3>
                <p className="mt-1 font-medium text-primary-light">For {Number(people).toLocaleString('en-GB')} workspace {Number(people) === 1 ? 'user' : 'users'}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{recommendation.reason}</p>
              </div>
              <dl className="divide-y divide-slate-700 text-sm">
                <div className="flex flex-wrap justify-between gap-2 py-3"><dt>{plan.name} base plan{plan.includedUsers != null ? ` (${plan.includedUsers} ${plan.includedUsers === 1 ? 'user' : 'users'} included)` : ''}</dt><dd>{recommendation.basePrice == null ? 'Custom quote' : `${gbp(recommendation.basePrice)} / month`}</dd></div>
                {recommendation.extraUsers > 0 && plan.extraUserMonthlyGbp != null && <div className="flex flex-wrap justify-between gap-2 py-3 text-slate-300"><dt>{recommendation.extraUsers} extra {recommendation.extraUsers === 1 ? 'user' : 'users'} × {gbp(plan.extraUserMonthlyGbp)}</dt><dd>{gbp(recommendation.extraUsers * plan.extraUserMonthlyGbp)} / month</dd></div>}
                <div className="flex flex-wrap justify-between gap-2 py-3"><dt>Estimated total for {Number(people).toLocaleString('en-GB')} {Number(people) === 1 ? 'user' : 'users'}</dt><dd className="font-semibold text-slate-50">{recommendation.monthlyTotal === null ? 'Custom quote' : `${gbp(recommendation.monthlyTotal)} / month, excluding VAT`}</dd></div>
                <div className="py-3"><dt className="font-medium text-slate-50">Published masking allowance</dt><dd className="mt-1 text-slate-300">{plan.usage}{(plan.name === 'Free' || plan.name === 'Developer') ? ' (request equivalents; text-volume limits apply)' : plan.name !== 'Enterprise' ? '. Text-volume limits also apply.' : ''}</dd></div>
                <div className="py-3"><dt className="font-medium text-slate-50">Included AI credit</dt><dd className="mt-1 text-slate-300">{plan.name === 'Developer' ? 'None — pay your AI provider directly' : plan.managedAiCredit}</dd></div>
              </dl>
              {recommendation.extraUsers > 0 && <p className="text-sm leading-6 text-slate-300">This estimate includes the listed extra-user rates. Confirm extra-user setup and final charges in Billing before purchasing.</p>}
              <p className="text-sm leading-6 text-slate-300">{plan.name === 'Developer' ? 'This plan includes the masking API, not the hosted chat or browser extension.' : plan.name === 'Enterprise' ? 'Confirm features, usage allowances and pricing in your commercial quote.' : 'Included AI credit is limited evaluation spend. Ongoing model usage is separate from the monthly plan price; review your plan’s provider options before purchasing.'}</p>
              <details className="rounded-xl border border-slate-600 p-4 text-sm leading-6 text-slate-300">
                <summary className={`cursor-pointer font-medium text-slate-100 ${focusClass}`}>What does this allowance mean?</summary>
                <p className="mt-3">One text submission for masking is one request, even if several names are found. Sending revised text is another request.</p>
                <p className="mt-3">{maskingLimitsExplanation}</p>
                <p className="mt-3">{aiCreditExplanation}</p>
              </details>
              <p className="text-sm leading-6 text-slate-300">This recommendation uses your workflow, team size and controls. For long documents, high volume or a specific AI model, <a href={contactLinks.demo} className={`text-primary-light underline underline-offset-4 ${focusClass}`}>check usage requirements with us</a>.</p>
              <a href={plan.href} className={`btn btn-cta w-full ${focusClass}`} data-analytics-event="pricing_plan_click" data-analytics-label={`${plan.name} plan finder`} data-analytics-placement="pricing_plan_finder" data-analytics-plan={plan.name.toLowerCase()} data-analytics-cta-id="pricing_plan_finder_continue">
                {plan.name === 'Enterprise' ? 'Discuss Enterprise' : plan.name === 'Free' ? 'Start free' : `Continue with ${plan.name}`}
              </a>
            </div>
          ) : <p className="mt-6">We could not match a plan. Go back to review your answers, or <a href={contactLinks.demo} className="text-primary-light underline">contact us</a>.</p>}

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-700 pt-5">
            {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className={`flex items-center gap-2 rounded-lg px-2 py-3 text-sm ${focusClass}`}><ArrowLeft className="h-4 w-4" aria-hidden="true" />{step === 3 ? 'Edit answers' : 'Back'}</button> : <span className="text-sm text-slate-400">Choose one option</span>}
            {step < 3 && <button type="button" disabled={!canContinue} onClick={() => setStep(step + 1)} className={`btn btn-secondary disabled:cursor-not-allowed disabled:opacity-40 ${focusClass}`}>{step === 2 ? 'See my recommendation' : 'Next'}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></button>}
          </div>
        </div>
      </dialog>
    </>
  )
}
