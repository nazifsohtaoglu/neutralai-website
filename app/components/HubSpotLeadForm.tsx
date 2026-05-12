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
  const instanceId = useId().replaceAll(':', '')
  const targetId = `hubspot-form-${instanceId}`
  const portalId = siteConfig.hubspot.portalId

  useEffect(() => {
    if (!scriptReady || !portalId || !formId || !window.hbspt?.forms) {
      return
    }

    const target = document.getElementById(targetId)

    if (!target) {
      return
    }

    target.innerHTML = ''

    window.hbspt.forms.create({
      region: siteConfig.hubspot.region,
      portalId,
      formId,
      target: `#${targetId}`,
      formInstanceId: instanceId,
      redirectUrl: `${siteConfig.url}/contact/thanks/`,
      onFormReady: (form) => {
        setHiddenField(form, 'website_intent', intent)
        setHiddenField(form, 'lead_source', leadSource)
        setHiddenField(form, 'website_page_url', window.location.href)
      },
    })
  }, [formId, instanceId, intent, leadSource, portalId, scriptReady, targetId])

  if (!portalId || !formId) {
    return (
      <div className="rounded-2xl border border-[#fdba74]/25 bg-[#fdba74]/10 p-5 text-sm leading-6 text-slate-200">
        The CRM form is not configured in this environment yet. Email{' '}
        <a href={`mailto:${siteConfig.salesEmail}`} className="text-primary-light transition-colors hover:text-primary">
          {siteConfig.salesEmail}
        </a>{' '}
        and include your company, use case, and preferred deployment path.
      </div>
    )
  }

  return (
    <>
      <Script
        id="hubspot-forms-v2"
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div id={targetId} data-hubspot-form={formId} />
    </>
  )
}
