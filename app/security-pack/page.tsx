import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  FileText,
  KeyRound,
  Lock,
  ShieldCheck,
  Activity,
} from 'lucide-react'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'NeutralAI Security Pack',
  description: 'NeutralAI security summary: encryption posture, SOC2 readiness status, common questionnaire answers, and compliance evidence for enterprise review.',
  robots: { index: false, follow: false },
}

const encryptionControls = [
  { label: 'Vault encryption', value: 'AES-256-GCM with per-tenant key derivation' },
  { label: 'Transport', value: 'TLS 1.2+ enforced; HSTS preload on production domains' },
  { label: 'Key management', value: 'Tenant BYOK supported; legacy key rotation supported via VAULT_LEGACY_ENCRYPTION_KEYS' },
  { label: 'Token TTL', value: 'Default 15 minutes; configurable per tenant policy' },
  { label: 'Secrets at rest', value: 'Validated at boot; plaintext-placeholder secrets rejected in production' },
] as const

const soc2Controls = [
  { domain: 'Security (CC)', status: 'Mapped', note: 'Access control, encryption, incident response, change management' },
  { domain: 'Availability (A)', status: 'Mapped', note: 'Health checks, readiness endpoints, rollback procedures, latency evidence' },
  { domain: 'Confidentiality (C)', status: 'Mapped', note: 'Data minimisation, masked-only egress, zero-retention operating pattern' },
  { domain: 'Processing Integrity (PI)', status: 'Partial', note: 'PII detection accuracy benchmarked; holdout guardrail in place' },
  { domain: 'Privacy (P)', status: 'Partial', note: 'GDPR data-subject workflow in design; DPA template available on request' },
] as const

const qaAnswers = [
  {
    q: 'Do you have a SOC 2 certification?',
    a: 'No formal audit has completed. SOC 2 controls are mapped across Security, Availability, and Confidentiality. The readiness report is available for enterprise review under NDA.',
  },
  {
    q: 'Where is customer data stored and processed?',
    a: 'Production runs on Hetzner Cloud (EU). Prompt data is masked before any egress to external LLM providers. Vault tokens are encrypted at rest with AES-256-GCM. Retention defaults to session scope unless tenants configure longer periods.',
  },
  {
    q: 'What PII is logged?',
    a: 'Audit events log event type, tenant, timestamp, and masked identifiers — never raw PII. PII masking is enforced before audit write. SIEM-ready event structure is available.',
  },
  {
    q: 'Do you support BYOK (Bring Your Own Key)?',
    a: 'Yes. Growth and Enterprise plans support BYOK for LLM provider API keys (OpenAI, Anthropic, Azure OpenAI, Gemini). Vault encryption keys can be rotated without downtime.',
  },
  {
    q: 'What happens if the gateway is unavailable?',
    a: 'Fail-closed is the default: if PII detection fails at boot, the service does not start. If the gateway becomes unavailable mid-session, the browser extension enters a documented fail mode (block / local_mask / allow, configurable per tenant policy).',
  },
  {
    q: 'Is multi-tenancy enforced at the data layer?',
    a: 'Yes. Every database row carrying sensitive data has a tenant_id foreign key. Vault tokens are tenant-scoped. API keys are tenant-bound. SSO configs are tenant-isolated with DNS TXT domain verification.',
  },
  {
    q: 'Do you have a penetration testing programme?',
    a: 'A pen-test readiness assessment has been completed internally. Third-party external pen test is on the roadmap before enterprise GA. Results will be shared under NDA upon request.',
  },
  {
    q: 'What is your incident response SLA?',
    a: 'Initial acknowledgement within 4 business hours for P0 security incidents. Escalation, containment, post-incident review, and customer communication workflows are documented in the internal runbook.',
  },
] as const

export default function SecurityPackPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container-custom relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <ShieldCheck className="h-3.5 w-3.5" />
            Security pack — not for public distribution
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold md:text-6xl">
            NeutralAI Security Summary
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Prepared for enterprise security review. This document covers encryption posture, SOC 2 control mapping, common procurement questionnaire answers, and evidence availability. For detailed artefacts or NDA-scoped review, contact{' '}
            <a href={`mailto:${siteConfig.securityEmail}`} className="text-primary-light hover:text-primary">
              {siteConfig.securityEmail}
            </a>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom space-y-12">

          {/* Encryption posture */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <KeyRound className="h-5 w-5 text-primary-light" />
              <h2 className="font-heading text-2xl font-bold">Encryption posture</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              {encryptionControls.map((row, i) => (
                <div key={row.label} className={`grid md:grid-cols-[1fr_2fr] gap-2 px-5 py-4 text-sm ${i < encryptionControls.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className="font-medium text-white">{row.label}</span>
                  <span className="text-slate-300">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SOC 2 readiness */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-primary-light" />
              <h2 className="font-heading text-2xl font-bold">SOC 2 readiness</h2>
            </div>
            <p className="mb-5 text-sm text-slate-400">
              No formal audit has completed. Controls are mapped; this is a readiness summary, not a certification claim.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              {soc2Controls.map((row, i) => (
                <div key={row.domain} className={`grid md:grid-cols-[1fr_auto_2fr] gap-3 items-center px-5 py-4 text-sm ${i < soc2Controls.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className="font-medium text-white">{row.domain}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold w-fit ${row.status === 'Mapped' ? 'bg-accent-success/15 text-accent-success border border-accent-success/25' : 'bg-[#fdba74]/10 text-[#fdba74] border border-[#fdba74]/25'}`}>
                    {row.status}
                  </span>
                  <span className="text-slate-300">{row.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Access controls */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Lock className="h-5 w-5 text-primary-light" />
              <h2 className="font-heading text-2xl font-bold">Access controls</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'SSO / SAML 2.0 via BoxyHQ Jackson (enterprise plan)',
                'MFA enforced at the identity-provider layer for SSO tenants',
                'JWT-based session tokens; no long-lived session cookies',
                'DNS TXT domain verification before SSO activation',
                'Per-tenant API key lifecycle; nai_-prefixed keys rate-limited by tenant',
                'Admin RBAC: Owner / Admin / Member roles with scoped endpoints',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-light" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Activity className="h-5 w-5 text-primary-light" />
              <h2 className="font-heading text-2xl font-bold">Availability posture</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Health endpoint', value: 'GET /health — checked by load balancer and uptime monitor' },
                { label: 'Readiness endpoint', value: 'GET /ready — checks DB, Redis, and Qdrant connectivity' },
                { label: 'Fail-closed default', value: 'Service refuses to start if secrets fail boot validation' },
                { label: 'Extension fail mode', value: 'block / local_mask / allow — configurable per tenant policy' },
                { label: 'Database backup', value: 'Daily encrypted pg_dump offsite (Hetzner Storage Box)' },
                { label: 'Rollback', value: 'Alembic down-revision available; deployment rollback documented in SOP' },
              ].map((row) => (
                <div key={row.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                  <span className="font-medium text-white">{row.label}: </span>
                  <span className="text-slate-300">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Questionnaire prefill */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="h-5 w-5 text-primary-light" />
              <h2 className="font-heading text-2xl font-bold">Common questionnaire answers</h2>
            </div>
            <div className="space-y-4">
              {qaAnswers.map((item) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5">
                  <p className="font-medium text-white">{item.q}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="rounded-2xl border border-primary/20 bg-primary/10 px-6 py-8 text-center">
            <p className="text-sm text-slate-300">
              Need detailed artefacts, the full readiness report, or help completing a security questionnaire?
            </p>
            <a
              href={`mailto:${siteConfig.securityEmail}?subject=Security%20review%20request`}
              className="btn btn-cta mt-4 inline-flex"
            >
              Contact security team
            </a>
            <div className="mt-5">
              <Link href="/trust-center" className="text-sm text-primary-light hover:text-primary">
                ← Back to trust center
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
