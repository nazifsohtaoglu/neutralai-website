'use client'

import { FormEvent, useMemo, useState } from 'react'
import { getLeadAttribution } from '../lib/analytics'
import { getReferralSnapshot, referralSnapshotToFieldMap } from '../lib/referral'
import { siteConfig } from '../site'

type SubmitStatus = 'idle' | 'submitting' | 'failed'

type FormState = {
  full_name: string
  email: string
  company_name: string
  company_size: string
  message: string
  referral_source: string
  website_intent: string
  lead_source: string
  company_website: string
}

const allowedLeadCaptureHosts = new Set(['script.google.com', 'script.googleusercontent.com'])

function buildInitialState(intent: string, leadSource: string): FormState {
  return {
    full_name: '',
    email: '',
    company_name: '',
    company_size: '',
    message: '',
    referral_source: '',
    website_intent: intent,
    lead_source: leadSource,
    company_website: '',
  }
}

function MissingConfigNotice() {
  return (
    <div className="rounded-2xl border border-[#fdba74]/25 bg-[#fdba74]/10 p-5 text-sm leading-6 text-slate-200">
      Lead form endpoint is not configured in this environment yet. Email{' '}
      <a href={`mailto:${siteConfig.salesEmail}`} className="text-primary-light transition-colors hover:text-primary">
        {siteConfig.salesEmail}
      </a>{' '}
      and include your company, use case, and preferred deployment path.
    </div>
  )
}

function resolveLeadCaptureEndpoint(rawEndpoint: string) {
  if (!rawEndpoint) {
    return null
  }

  try {
    const parsed = new URL(rawEndpoint)
    if (parsed.protocol !== 'https:' || !allowedLeadCaptureHosts.has(parsed.hostname)) {
      return null
    }

    return parsed.toString()
  } catch {
    return null
  }
}

export default function GoogleSheetsLeadForm({ intent, leadSource }: { intent: string; leadSource: string }) {
  const endpoint = resolveLeadCaptureEndpoint(siteConfig.leadCapture.googleSheetsEndpoint)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [state, setState] = useState<FormState>(() => buildInitialState(intent, leadSource))

  const isSubmitting = status === 'submitting'

  const submitButtonLabel = useMemo(() => {
    if (status === 'submitting') {
      return 'Submitting...'
    }

    return 'Send Request'
  }, [status])

  if (!endpoint) {
    return <MissingConfigNotice />
  }

  const submissionEndpoint = endpoint

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (state.company_website.trim()) {
      window.location.assign('/contact/thanks/')
      return
    }

    setStatus('submitting')

    try {
      const payload: Record<string, string> = {
        ...state,
        website_page_url: window.location.href,
      }

      Object.entries(getLeadAttribution()).forEach(([key, value]) => {
        payload[key] = String(value)
      })

      const referralSnapshot = getReferralSnapshot()
      if (referralSnapshot) {
        Object.entries(referralSnapshotToFieldMap(referralSnapshot)).forEach(([key, value]) => {
          payload[key] = value
        })
      }

      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('submit_failed')
      }

      window.location.assign('/contact/thanks/')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Full name</span>
          <input
            required
            type="text"
            value={state.full_name}
            onChange={(event) => setState((prev) => ({ ...prev, full_name: event.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none"
            autoComplete="name"
            maxLength={120}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Work email</span>
          <input
            required
            type="email"
            value={state.email}
            onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none"
            autoComplete="email"
            maxLength={180}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Company name</span>
          <input
            required
            type="text"
            value={state.company_name}
            onChange={(event) => setState((prev) => ({ ...prev, company_name: event.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none"
            autoComplete="organization"
            maxLength={180}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Company size</span>
          <select
            required
            value={state.company_size}
            onChange={(event) => setState((prev) => ({ ...prev, company_size: event.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 focus:border-primary focus:outline-none"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-1000">201-1000</option>
            <option value="1000+">1000+</option>
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="text-slate-300">How can we help?</span>
        <textarea
          required
          value={state.message}
          onChange={(event) => setState((prev) => ({ ...prev, message: event.target.value }))}
          rows={5}
          maxLength={2000}
          className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none"
          placeholder="Share your AI workflow, data types, and deployment goals."
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="text-slate-300">Referral source (optional)</span>
        <input
          type="text"
          value={state.referral_source}
          onChange={(event) => setState((prev) => ({ ...prev, referral_source: event.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none"
          maxLength={120}
        />
      </label>

      <input
        type="text"
        value={state.company_website}
        onChange={(event) => setState((prev) => ({ ...prev, company_website: event.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <input type="hidden" name="website_intent" value={state.website_intent} />
      <input type="hidden" name="lead_source" value={state.lead_source} />

      {status === 'failed' ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Form could not be submitted right now. Please try again or email {siteConfig.salesEmail}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-cta w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitButtonLabel}
      </button>
    </form>
  )
}
