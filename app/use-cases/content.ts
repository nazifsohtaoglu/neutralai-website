import { ClipboardCheck, HeartPulse, Landmark, LockKeyhole, Scale, ShieldCheck } from 'lucide-react'
import type { UseCasePageContent } from './UseCasePage'

export const financeUseCase: UseCasePageContent = {
  eyebrow: 'Finance use case',
  title: 'Use AI on financial workflows without exposing customer data.',
  description:
    'NeutralAI helps financial services teams mask customer names, account identifiers, payment details, and claim references before prompts reach AI providers.',
  primaryCta: 'See financial AI protection',
  secondaryCta: 'Try a masking demo',
  proofLabel: 'Regulated workflow',
  proofTitle: 'Built for teams facing FCA, PRA, and GDPR review pressure.',
  proofBody:
    'The value is not a generic detector. NeutralAI gives security and compliance reviewers a gateway boundary, policy controls, and audit evidence for AI-assisted workflows.',
  painPoints: [
    'Claims summaries can include names, policy numbers, phone numbers, and bank details.',
    'Shadow AI use can move regulated customer data into tools that procurement has not approved.',
    'Audit teams need evidence of what was masked, when, and through which workflow.',
  ],
  workflow: [
    {
      title: 'Detect financial identifiers',
      body: 'Find names, emails, phone numbers, IBANs, card-like values, claim references, and tenant-specific identifiers before prompt egress.',
    },
    {
      title: 'Mask or tokenize before routing',
      body: 'Send sanitized prompts onward while preserving enough context for useful AI assistance and governed audit review.',
    },
    {
      title: 'Keep evidence for approval conversations',
      body: 'Use policy events, health checks, and masked-output examples to support security, compliance, and procurement review.',
    },
  ],
  entities: ['PERSON', 'EMAIL', 'PHONE', 'IBAN', 'CREDIT_CARD', 'POLICY_ID', 'CLAIM_REF'],
  trustSignals: [
    {
      icon: Landmark,
      title: 'Financial services language',
      body: 'Pages and demos speak to claims, account servicing, customer support, and regulated AI review rather than generic productivity.',
    },
    {
      icon: Scale,
      title: 'Review-ready posture',
      body: 'NeutralAI frames controls in terms compliance teams can evaluate: gateway boundary, masking policy, and audit evidence.',
    },
    {
      icon: LockKeyhole,
      title: 'Reversible where governance allows',
      body: 'Sensitive values can become governed tokens so restore paths stay separate from normal model traffic.',
    },
  ],
  disclaimer:
    'NeutralAI supports regulated AI adoption workflows, but this page is not legal advice and does not claim automatic FCA, PRA, or GDPR approval for any customer deployment.',
}

export const healthcareUseCase: UseCasePageContent = {
  eyebrow: 'Healthcare use case',
  title: 'Protect PHI before healthcare prompts reach AI providers.',
  description:
    'NeutralAI helps healthcare and healthtech teams mask patient names, NHS numbers, medical record references, member IDs, and contact details before AI processing.',
  primaryCta: 'Discuss healthcare deployment',
  secondaryCta: 'Try a PHI demo',
  proofLabel: 'PHI-aware controls',
  proofTitle: 'Designed to support minimum-necessary AI workflows.',
  proofBody:
    'Healthcare buyers need careful language and careful controls. NeutralAI supports PHI-aware masking, audit-safe evidence, and BAA review conversations for eligible deployments.',
  painPoints: [
    'Clinical summaries and support tickets can contain PHI alongside useful operational context.',
    'Teams need AI assistance without sending patient identifiers to external model providers.',
    'Compliance reviewers need evidence without raw PHI appearing in standard reports.',
  ],
  workflow: [
    {
      title: 'Detect PHI-style identifiers',
      body: 'Identify patient names, contact data, NHS numbers, medical record references, health plan IDs, and other sensitive values in prompts.',
    },
    {
      title: 'Apply minimum-necessary masking',
      body: 'Preserve useful clinical or operational context while removing direct identifiers before prompts are routed onward.',
    },
    {
      title: 'Prepare for compliance review',
      body: 'Use audit-safe metadata and deployment review materials to support healthcare security and BAA conversations.',
    },
  ],
  entities: ['PERSON', 'EMAIL', 'PHONE', 'UK_NHS', 'MRN', 'HEALTH_PLAN_ID', 'DATE_TIME'],
  trustSignals: [
    {
      icon: HeartPulse,
      title: 'Healthcare-specific coverage',
      body: 'The page speaks to PHI, clinical note summarization, patient support, and minimum-necessary handling instead of broad security claims.',
    },
    {
      icon: ClipboardCheck,
      title: 'BAA review support',
      body: 'For eligible healthcare deployments, NeutralAI can support BAA review rather than implying a blanket signed agreement.',
    },
    {
      icon: ShieldCheck,
      title: 'Audit-safe evidence',
      body: 'Standard evidence should describe findings and policy events without leaking raw patient identifiers into reports.',
    },
  ],
  disclaimer:
    'NeutralAI is not presenting this page as legal advice or a blanket HIPAA compliance claim. BAA terms, deployment model, and customer obligations require review.',
}
