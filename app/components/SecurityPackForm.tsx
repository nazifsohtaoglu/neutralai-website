'use client'

import { FormEvent, useRef, useState } from 'react'
import { CheckCircle2, Download, Loader2 } from 'lucide-react'
import { siteConfig } from '../site'
import { getLeadAttribution, trackAnalyticsEvent } from '../lib/analytics'
import { getReferralSnapshot, referralSnapshotToFieldMap } from '../lib/referral'

const GOOGLE_SHEETS_EXEC_PATH_REGEX = /^\/macros\/s\/[a-z0-9_-]+\/exec\/?$/i

function resolveEndpoint(raw: string): string | null {
  if (!raw) return null
  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'script.google.com') return null
    if (parsed.username || parsed.password || parsed.search || parsed.hash) return null
    if (!GOOGLE_SHEETS_EXEC_PATH_REGEX.test(parsed.pathname)) return null
    return parsed.toString()
  } catch {
    return null
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function SecurityPackForm() {
  const endpoint = resolveEndpoint(siteConfig.leadCapture.googleSheetsEndpoint)
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const formStartedRef = useRef(false)

  function handleFormFocus() {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      trackAnalyticsEvent('form_started', { form_id: 'security_pack' })
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-accent-success/30 bg-accent-success/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-accent-success" />
        <p className="mt-3 text-base font-semibold text-white">Security pack ready</p>
        <p className="mt-1 text-sm text-slate-300">
          Download the summary below. Our security team will follow up by email with detailed evidence and questionnaire prefill.
        </p>
        <a
          href="/security-pack"
          className="btn btn-cta mt-5 inline-flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download className="h-4 w-4" />
          Open security summary
        </a>
      </div>
    )
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (honeypot.trim()) return

    if (!name.trim() || !email.trim() || !company.trim()) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return

    setStatus('submitting')

    const payload: Record<string, string> = {
      full_name: name.trim(),
      email: email.trim(),
      company_name: company.trim(),
      company_website: '',
      website_intent: 'website_security_pack_download',
      lead_source: 'trust_center_security_pack',
      message: 'Security pack download request',
      website_page_url: typeof window !== 'undefined' ? window.location.href : '',
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

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          setStatus('error')
          trackAnalyticsEvent('form_error', { form_id: 'security_pack' })
          return
        }
      }
      trackAnalyticsEvent('lead_submitted', { form_id: 'security_pack' })
      trackAnalyticsEvent('security_pack_downloaded', { form_id: 'security_pack' })
      setStatus('success')
    } catch {
      setStatus('error')
      trackAnalyticsEvent('form_error', { form_id: 'security_pack' })
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none text-sm'

  return (
    <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="grid gap-4">
      <input
        name="company_website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Full name</span>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="sr-only">Work email</span>
          <input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Company</span>
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className={inputClass}
          autoComplete="organization"
        />
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-400">Something went wrong — please try again or email {siteConfig.securityEmail}.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn btn-cta flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Preparing pack…
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Get security pack
          </>
        )}
      </button>
    </form>
  )
}
