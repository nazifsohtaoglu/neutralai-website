'use client'

import Script from 'next/script'
import { useEffect, useId, useState } from 'react'
import { siteConfig } from '../site'

type HubSpotFormApi = {
  forms?: {
    create: (options: {
      region: string
      portalId: string
      formId: string
      target: string
      formInstanceId: string
      redirectUrl?: string
      onFormReady?: (form: HTMLFormElement | JQueryLikeForm) => void
    }) => void
  }
}

type JQueryLikeForm = {
  0?: HTMLFormElement
}

declare global {
  interface Window {
    hbspt?: HubSpotFormApi
  }
}

function resolveFormElement(form: HTMLFormElement | JQueryLikeForm) {
  return form instanceof HTMLFormElement ? form : form[0]
}

function setHiddenField(form: HTMLFormElement | JQueryLikeForm, name: string, value: string) {
  const formElement = resolveFormElement(form)
  const input = formElement?.querySelector<HTMLInputElement>(`input[name="${name}"]`)

  if (input) {
    input.value = value
  }
}

function LeadCaptureFallback({ reason }: { reason: 'missing-config' | 'load-failed' }) {
  const message =
    reason === 'missing-config'
      ? 'The CRM form is not configured in this environment yet.'
      : 'The CRM form could not load in this browser.'

  return (
    <div className="rounded-2xl border border-[#fdba74]/25 bg-[#fdba74]/10 p-5 text-sm leading-6 text-slate-200">
      {message} Email{' '}
      <a href={`mailto:${siteConfig.salesEmail}`} className="text-primary-light transition-colors hover:text-primary">
        {siteConfig.salesEmail}
      </a>{' '}
      and include your company, use case, and preferred deployment path.
    </div>
  )
}

export default function HubSpotLeadForm({
  formId,
  intent,
  leadSource,
}: {
  formId: string
  intent: string
  leadSource: string
}) {
  const [scriptReady, setScriptReady] = useState(false)
  const [formReady, setFormReady] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const instanceId = useId().replaceAll(':', '')
  const targetId = `hubspot-form-${instanceId}`
  const portalId = siteConfig.hubspot.portalId

  useEffect(() => {
    if (!portalId || !formId || formReady) {
      return
    }

    const fallbackTimer = window.setTimeout(() => {
      setLoadFailed(true)
    }, 7000)

    return () => window.clearTimeout(fallbackTimer)
  }, [formId, formReady, portalId])

  useEffect(() => {
    if (!scriptReady || !portalId || !formId) {
      return
    }

    if (!window.hbspt?.forms) {
      window.setTimeout(() => setLoadFailed(true), 0)
      return
    }

    const target = document.getElementById(targetId)

    if (!target) {
      return
    }

    target.innerHTML = ''

    try {
      window.hbspt.forms.create({
        region: siteConfig.hubspot.region,
        portalId,
        formId,
        target: `#${targetId}`,
        formInstanceId: instanceId,
        redirectUrl: `${siteConfig.url}/contact/thanks/`,
        onFormReady: (form) => {
          setFormReady(true)
          setLoadFailed(false)
          setHiddenField(form, 'website_intent', intent)
          setHiddenField(form, 'lead_source', leadSource)
          setHiddenField(form, 'website_page_url', window.location.href)
        },
      })
    } catch {
      window.setTimeout(() => setLoadFailed(true), 0)
    }
  }, [formId, instanceId, intent, leadSource, portalId, scriptReady, targetId])

  if (!portalId || !formId) {
    return <LeadCaptureFallback reason="missing-config" />
  }

  return (
    <>
      <Script
        id="hubspot-forms-v2"
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
        onError={() => setLoadFailed(true)}
      />
      <div id={targetId} data-hubspot-form={formId} className={loadFailed ? 'hidden' : undefined} />
      {loadFailed ? (
        <LeadCaptureFallback reason="load-failed" />
      ) : !formReady ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-400" aria-live="polite">
          Loading secure CRM form...
        </div>
      ) : null}
    </>
  )
}
