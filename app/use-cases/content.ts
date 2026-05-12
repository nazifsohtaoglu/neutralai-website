import {
  BriefcaseBusiness,
  ClipboardCheck,
  FileSearch,
  HeartPulse,
  Landmark,
  LockKeyhole,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import type { UseCasePageContent } from './UseCasePage'

type Faq = UseCasePageContent['faq']

function faqStructuredData(faq: Faq): UseCasePageContent['faqStructuredData'] {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

const financeFaq = [
  {
    question: 'How does NeutralAI protect financial AI workflows?',
    answer:
      'NeutralAI detects and masks customer identifiers, payment details, account references, and claim context before prompts are routed to external AI providers.',
  },
  {
    question: 'Does NeutralAI make an FCA or PRA approval claim?',
    answer:
      'No. NeutralAI provides a gateway boundary, masking policy, and audit evidence that can support financial services review conversations, but it does not guarantee regulatory approval.',
  },
  {
    question: 'Can financial teams keep enough context for useful AI output?',
    answer:
      'Yes. The gateway can replace sensitive values with placeholders or governed tokens while preserving the surrounding business context needed for summaries, triage, and review.',
  },
]

const healthcareFaq = [
  {
    question: 'How does NeutralAI handle healthcare AI prompts?',
    answer:
      'NeutralAI can mask PHI-style identifiers such as patient names, contact details, NHS numbers, medical record references, member IDs, and device identifiers before AI processing.',
  },
  {
    question: 'Is NeutralAI making a blanket HIPAA compliance claim?',
    answer:
      'No. Healthcare deployments depend on the customer workflow, deployment model, contractual terms, and BAA review. This page describes PHI-aware controls without presenting legal advice.',
  },
  {
    question: 'What healthcare workflows are a good fit?',
    answer:
      'Clinical note summarization, patient support triage, operational ticket analysis, and internal assistant workflows are common starting points when they mix useful context with patient identifiers.',
  },
]

const legalFaq = [
  {
    question: 'How does NeutralAI support legal document review AI?',
    answer:
      'NeutralAI masks client names, matter references, contact details, and privileged context indicators before prompts or document excerpts are sent to AI providers.',
  },
  {
    question: 'Does NeutralAI guarantee privilege protection?',
    answer:
      'No. NeutralAI is a technical control that can reduce exposure and produce audit evidence, but privilege, confidentiality, and professional duties require legal and operational review.',
  },
  {
    question: 'Which legal workflows can start with a gateway pattern?',
    answer:
      'Contract review, matter summarization, discovery triage, client support drafting, and internal knowledge workflows are practical candidates for controlled AI adoption.',
  },
]

export const financeUseCase: UseCasePageContent = {
  eyebrow: 'Finance use case',
  title: 'Use AI on financial workflows without exposing customer data.',
  description:
    'NeutralAI helps financial services teams mask customer names, account identifiers, payment details, and claim references before prompts reach AI providers.',
  primaryCta: 'See financial AI protection',
  secondaryCta: 'Try a masking demo',
  proofLabel: 'Regulated workflow',
  proofTitle: 'Built for teams facing FCA, PRA, PCI-DSS, and GDPR review pressure.',
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
  complianceMapping: [
    {
      label: 'FCA and PRA review',
      body: 'Show where AI prompt traffic is controlled, which values are masked, and what audit-safe metadata proves the control ran.',
    },
    {
      label: 'PCI-DSS scoping',
      body: 'Reduce unnecessary exposure of card-like values and payment details before staff or product workflows use AI assistance.',
    },
    {
      label: 'GDPR data minimisation',
      body: 'Route only the information needed for the AI task while masking direct identifiers before provider egress.',
    },
  ],
  faq: financeFaq,
  faqStructuredData: faqStructuredData(financeFaq),
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
    'NeutralAI supports regulated AI adoption workflows, but this page is not legal advice and does not claim automatic FCA, PRA, PCI-DSS, or GDPR approval for any customer deployment.',
}

export const healthcareUseCase: UseCasePageContent = {
  eyebrow: 'Healthcare use case',
  title: 'Protect PHI before healthcare prompts reach AI providers.',
  description:
    'NeutralAI helps healthcare and healthtech teams mask patient names, NHS numbers, medical record references, health plan/member IDs, device identifiers, and contact details before AI processing.',
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
      body: 'Identify patient names, contact data, NHS numbers, medical record references, health plan/member IDs, device or UDI-style identifiers, and other sensitive values in prompts.',
    },
    {
      title: 'Apply minimum-necessary masking',
      body: 'Preserve useful clinical or operational context while removing direct identifiers before prompts are routed onward.',
    },
    {
      title: 'Prepare for compliance review',
      body: 'Use audit-safe metadata, breach workflow support, and evidence pack materials under review/NDA to support healthcare security and BAA conversations.',
    },
  ],
  entities: ['PERSON', 'EMAIL', 'PHONE', 'UK_NHS', 'MRN', 'HEALTH_PLAN_ID', 'DEVICE_UDI', 'DATE_TIME'],
  complianceMapping: [
    {
      label: 'HIPAA review support',
      body: 'Support BAA and security review conversations with PHI-aware masking, deployment-model discussion, and evidence that avoids raw patient identifiers.',
    },
    {
      label: 'Minimum necessary',
      body: 'Keep the useful clinical or operational prompt context while removing direct identifiers before model routing.',
    },
    {
      label: 'Operational audit',
      body: 'Record policy events and findings in a way that helps review teams without turning reports into another PHI store.',
    },
  ],
  faq: healthcareFaq,
  faqStructuredData: faqStructuredData(healthcareFaq),
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

export const legalUseCase: UseCasePageContent = {
  eyebrow: 'Legal use case',
  title: 'Use AI for legal work without exposing client or matter data.',
  description:
    'NeutralAI helps legal teams mask client names, matter identifiers, contact details, privileged context, and document-review excerpts before prompts reach AI providers.',
  primaryCta: 'Discuss legal AI controls',
  secondaryCta: 'Try a legal masking demo',
  proofLabel: 'Matter confidentiality',
  proofTitle: 'Designed for client privilege, document review AI, and matter confidentiality conversations.',
  proofBody:
    'Legal buyers need a practical boundary before document review, drafting, and matter-summary prompts leave approved workflows. NeutralAI gives teams a place to mask identifiers and preserve evidence for review.',
  painPoints: [
    'Contract, discovery, and matter summaries can include client names, counterparties, case facts, and privileged context.',
    'Fee earners and operations teams may test AI tools before information governance has approved a safe path.',
    'Risk reviewers need proof of prompt controls without copying confidential matter data into reports.',
  ],
  workflow: [
    {
      title: 'Detect client and matter signals',
      body: 'Find names, email addresses, phone numbers, matter IDs, document references, and privilege-sensitive context before AI egress.',
    },
    {
      title: 'Mask excerpts before model routing',
      body: 'Send sanitized contract, discovery, or support text onward while preserving the legal task and separating raw values from model traffic.',
    },
    {
      title: 'Evidence the approved route',
      body: 'Use audit-safe metadata and masked examples to support information governance, procurement, and client assurance conversations.',
    },
  ],
  entities: ['PERSON', 'EMAIL', 'PHONE', 'CLIENT_NAME', 'MATTER_ID', 'DOCUMENT_ID', 'PRIVILEGED_CONTEXT'],
  complianceMapping: [
    {
      label: 'Client confidentiality',
      body: 'Reduce exposure of client and matter identifiers before legal teams use AI for drafting, review, or summarization.',
    },
    {
      label: 'Privilege review',
      body: 'Create a technical checkpoint that supports privilege-aware workflows without claiming the tool decides legal privilege.',
    },
    {
      label: 'Information governance',
      body: 'Give risk, procurement, and client-facing teams evidence that approved AI paths run through masking and policy controls.',
    },
  ],
  faq: legalFaq,
  faqStructuredData: faqStructuredData(legalFaq),
  trustSignals: [
    {
      icon: Scale,
      title: 'Legal-specific workflows',
      body: 'NeutralAI frames AI use around contract review, discovery triage, matter summaries, and client-support drafting.',
    },
    {
      icon: FileSearch,
      title: 'Document review boundary',
      body: 'Sensitive excerpts can be masked before they leave approved document or browser workflows for model processing.',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Client assurance posture',
      body: 'Audit-safe evidence helps firms explain the control boundary without publishing raw matter details.',
    },
  ],
  disclaimer:
    'NeutralAI is not legal advice and does not guarantee privilege protection. Client confidentiality, professional duties, and deployment terms require legal and operational review.',
}

export const useCases = [
  {
    title: 'Financial services',
    href: '/use-cases/financial-services',
    summary: 'Mask customer, payment, account, and claim identifiers before AI prompt egress.',
    content: financeUseCase,
  },
  {
    title: 'Healthcare',
    href: '/use-cases/healthcare',
    summary: 'Protect PHI-style identifiers before clinical, support, or operational prompts reach AI providers.',
    content: healthcareUseCase,
  },
  {
    title: 'Legal',
    href: '/use-cases/legal',
    summary: 'Keep client, matter, and document-review context under a controlled AI gateway path.',
    content: legalUseCase,
  },
] as const
