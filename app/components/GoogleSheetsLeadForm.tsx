'use client'

import { FormEvent, useMemo, useRef, useState } from 'react'
import { getLeadAttribution } from '../lib/analytics'
import { getReferralSnapshot, referralSnapshotToFieldMap } from '../lib/referral'
import { siteConfig } from '../site'

type SubmitStatus = 'idle' | 'submitting' | 'failed'

type FormState = {
  full_name: string
  email: string
  company_name: string
  company_size: string
  compliance_requirement: string
  message: string
  referral_source: string
  website_intent: string
  lead_source: string
  company_website: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

const COMPLIANCE_OPTIONS = [
  { value: '', label: 'Select compliance requirement' },
  { value: 'GDPR', label: 'GDPR — EU data protection' },
  { value: 'HIPAA', label: 'HIPAA — US healthcare' },
  { value: 'FCA', label: 'FCA / Financial services' },
  { value: 'SOC2', label: 'SOC 2 — security controls' },
  { value: 'Other', label: 'Other / Not sure yet' },
] as const

const GOOGLE_SHEETS_EXEC_PATH_REGEX = /^\/macros\/s\/[a-z0-9_-]+\/exec\/?$/i

function buildInitialState(intent: string, leadSource: string): FormState {
  return {
    full_name: '',
    email: '',
    company_name: '',
    company_size: '',
    compliance_requirement: '',
    message: '',
    referral_source: '',
    website_intent: intent,
    lead_source: leadSource,
    company_website: '',
  }
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function validateForm(state: FormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!state.full_name.trim()) {
    errors.full_name = 'Full name is required.'
  }

  if (!state.email.trim()) {
    errors.email = 'Work email is required.'
  } else if (!validateEmail(state.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!state.company_name.trim()) {
    errors.company_name = 'Company name is required.'
  }

  if (!state.company_size) {
    errors.company_size = 'Please select a company size.'
  }

  if (!state.compliance_requirement) {
    errors.compliance_requirement = 'Please select your main compliance requirement.'
  }

  if (!state.message.trim()) {
    errors.message = 'Please describe how we can help.'
  }

  return errors
}

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-400">
      {message}
    </p>
  )
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
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'script.google.com') {
      return null
    }

    if (parsed.username || parsed.password || parsed.search || parsed.hash) {
      return null
    }

    if (!GOOGLE_SHEETS_EXEC_PATH_REGEX.test(parsed.pathname)) {
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
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const formRef = useRef<HTMLFormElement>(null)

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

  function markTouched(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function getFieldError(field: keyof FormState): string | undefined {
    return touched[field] ? errors[field] : undefined
  }

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border ${
      getFieldError(field)
        ? 'border-red-500/70 focus:border-red-400'
        : 'border-white/10 focus:border-primary'
    } bg-background px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (state.company_website.trim()) {
      window.location.assign('/contact/thanks/')
      return
    }

    // Mark all required fields as touched and run full validation
    const requiredFields: Array<keyof FormState> = [
      'full_name', 'email', 'company_name', 'company_size', 'compliance_requirement', 'message',
    ]
    setTouched(Object.fromEntries(requiredFields.map((f) => [f, true])))

    const validationErrors = validateForm(state)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid field
      const firstKey = requiredFields.find((f) => validationErrors[f])
      if (firstKey) {
        const el = formRef.current?.querySelector<HTMLElement>(`[id="${firstKey}"]`)
        el?.focus()
      }
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
    <form ref={formRef} className="space-y-4" onSubmit={handleSubmit} noValidate aria-label="Contact request form">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Full name */}
        <div className="space-y-1 text-sm">
          <label htmlFor="full_name" className="text-slate-300">
            Full name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="full_name"
            type="text"
            value={state.full_name}
            onChange={(e) => setState((prev) => ({ ...prev, full_name: e.target.value }))}
            onBlur={() => { markTouched('full_name'); setErrors(validateForm(state)) }}
            className={inputClass('full_name')}
            autoComplete="name"
            maxLength={120}
            placeholder="Jane Smith"
            aria-required="true"
            aria-invalid={!!getFieldError('full_name')}
            aria-describedby={getFieldError('full_name') ? 'err-full_name' : undefined}
          />
          <FieldError id="err-full_name" message={getFieldError('full_name')} />
        </div>

        {/* Work email */}
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="text-slate-300">
            Work email <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
            onBlur={() => { markTouched('email'); setErrors(validateForm(state)) }}
            className={inputClass('email')}
            autoComplete="email"
            maxLength={180}
            placeholder="jane@company.com"
            aria-required="true"
            aria-invalid={!!getFieldError('email')}
            aria-describedby={getFieldError('email') ? 'err-email' : undefined}
          />
          <FieldError id="err-email" message={getFieldError('email')} />
        </div>

        {/* Company name */}
        <div className="space-y-1 text-sm">
          <label htmlFor="company_name" className="text-slate-300">
            Company name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="company_name"
            type="text"
            value={state.company_name}
            onChange={(e) => setState((prev) => ({ ...prev, company_name: e.target.value }))}
            onBlur={() => { markTouched('company_name'); setErrors(validateForm(state)) }}
            className={inputClass('company_name')}
            autoComplete="organization"
            maxLength={180}
            placeholder="Acme Corp"
            aria-required="true"
            aria-invalid={!!getFieldError('company_name')}
            aria-describedby={getFieldError('company_name') ? 'err-company_name' : undefined}
          />
          <FieldError id="err-company_name" message={getFieldError('company_name')} />
        </div>

        {/* Company size */}
        <div className="space-y-1 text-sm">
          <label htmlFor="company_size" className="text-slate-300">
            Company size <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <select
            id="company_size"
            value={state.company_size}
            onChange={(e) => setState((prev) => ({ ...prev, company_size: e.target.value }))}
            onBlur={() => { markTouched('company_size'); setErrors(validateForm(state)) }}
            className={inputClass('company_size')}
            aria-required="true"
            aria-invalid={!!getFieldError('company_size')}
            aria-describedby={getFieldError('company_size') ? 'err-company_size' : undefined}
          >
            <option value="" disabled>Select</option>
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1000</option>
            <option value="1000+">1000+</option>
          </select>
          <FieldError id="err-company_size" message={getFieldError('company_size')} />
        </div>
      </div>

      {/* Compliance requirement — full width */}
      <div className="space-y-1 text-sm">
        <label htmlFor="compliance_requirement" className="text-slate-300">
          Main compliance requirement{' '}
          <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <p id="compliance_requirement_hint" className="text-xs text-slate-500">
          Helps us route you to the right specialist and tailor the demo scope.
        </p>
        <select
          id="compliance_requirement"
          value={state.compliance_requirement}
          onChange={(e) => setState((prev) => ({ ...prev, compliance_requirement: e.target.value }))}
          onBlur={() => { markTouched('compliance_requirement'); setErrors(validateForm(state)) }}
          className={inputClass('compliance_requirement')}
          aria-required="true"
          aria-invalid={!!getFieldError('compliance_requirement')}
          aria-describedby={[
            'compliance_requirement_hint',
            getFieldError('compliance_requirement') ? 'err-compliance_requirement' : '',
          ].filter(Boolean).join(' ')}
        >
          {COMPLIANCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        <FieldError id="err-compliance_requirement" message={getFieldError('compliance_requirement')} />
      </div>

      {/* Message */}
      <div className="space-y-1 text-sm">
        <label htmlFor="message" className="text-slate-300">
          How can we help? <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          value={state.message}
          onChange={(e) => setState((prev) => ({ ...prev, message: e.target.value }))}
          onBlur={() => { markTouched('message'); setErrors(validateForm(state)) }}
          rows={5}
          maxLength={2000}
          className={inputClass('message')}
          placeholder="Share your AI workflow, data types, and deployment goals."
          aria-required="true"
          aria-invalid={!!getFieldError('message')}
          aria-describedby={getFieldError('message') ? 'err-message' : undefined}
        />
        <FieldError id="err-message" message={getFieldError('message')} />
      </div>

      {/* Referral source */}
      <div className="space-y-1 text-sm">
        <label htmlFor="referral_source" className="text-slate-300">
          Referral source{' '}
          <span className="text-slate-500 text-xs font-normal">(optional)</span>
        </label>
        <input
          id="referral_source"
          type="text"
          value={state.referral_source}
          onChange={(e) => setState((prev) => ({ ...prev, referral_source: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:border-primary focus:outline-none"
          maxLength={120}
          placeholder="How did you hear about us?"
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        value={state.company_website}
        onChange={(e) => setState((prev) => ({ ...prev, company_website: e.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <input type="hidden" name="website_intent" value={state.website_intent} />
      <input type="hidden" name="lead_source" value={state.lead_source} />
      <input type="hidden" name="compliance_requirement" value={state.compliance_requirement} />

      {status === 'failed' ? (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Form could not be submitted right now. Please try again or email {siteConfig.salesEmail}.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-cta w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitButtonLabel}
        </button>
        <p className="text-xs text-slate-500">
          We respond within 24 hours.
        </p>
      </div>
    </form>
  )
}
