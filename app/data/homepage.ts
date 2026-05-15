import {
  AlertTriangle,
  Building2,
  ClipboardCheck,
  FileText,
  Gauge,
  Globe,
  Landmark,
  KeyRound,
  Scale,
  Languages,
  Lock,
  Network,
  Stethoscope,
  ScanSearch,
  Server,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import { contactLinks, siteConfig } from '../site'

type Card = {
  icon: LucideIcon
  title: string
  description: string
}

export const importanceCards: Card[] = [
  {
    icon: AlertTriangle,
    title: 'Sensitive data leaves first',
    description:
      'Names, emails, claim references, transcripts, and internal context often leave the boundary before policy is applied.',
  },
  {
    icon: Gauge,
    title: 'Security becomes the blocker',
    description:
      'Without a visible control point, legal and security teams have no safe way to say yes.',
  },
  {
    icon: Lock,
    title: 'Shadow AI becomes normal',
    description:
      'When approved workflows lag behind demand, people improvise with unmanaged tools and risk compounds fast.',
  },
] as const

export const steps = [
  {
    icon: Network,
    title: 'Intercept',
    description: 'Traffic hits NeutralAI before it reaches the external model.',
  },
  {
    icon: KeyRound,
    title: 'Neutralize',
    description: 'Sensitive values become safer tokens or sanitized references.',
  },
  {
    icon: ShieldCheck,
    title: 'Forward',
    description: 'Only the cleaned request continues downstream.',
  },
] as const

export const trustCards: Card[] = [
  {
    icon: ShieldCheck,
    title: 'Compliance evidence automation',
    description: 'NeutralAI gives teams a control point that can produce audit-ready proof instead of leaving AI usage invisible.',
  },
  {
    icon: KeyRound,
    title: 'Reversible vault tokenization',
    description: 'Sensitive values can be replaced with encrypted tokens before model egress, then restored only through governed paths.',
  },
  {
    icon: Building2,
    title: 'Managed now, private cloud/on-prem planning',
    description: 'Teams can start with managed SaaS and move toward stricter deployment models as governance demands increase.',
  },
] as const

export const pricingPlans = [
  {
    name: 'Free',
    eyebrow: 'Sandbox',
    summary: 'Free sandbox access for teams validating the masking flow.',
    monthlyPrice: '£0',
    annualPrice: '£0',
    priceNote: 'per month',
    usage: '1,000 masking requests per month',
    managedAiCredit: '£1 managed AI trial credit',
    modelUsage: 'Managed sandbox only',
    features: [
      'Browser extension and chat workflow access',
      'Sandbox signup into the app',
      'Core masking behaviour preview',
      'Cheap model allowlist with hard caps',
    ],
    href: siteConfig.signupUrl,
    cta: 'Start Free',
    featured: false,
  },
  {
    name: 'Starter',
    eyebrow: 'Start controlled',
    summary: 'Low-friction paid plan for founders and small regulated teams.',
    monthlyPrice: '£29',
    annualPrice: '£23.20',
    annualBilled: '£278.40 billed yearly',
    priceNote: 'per month',
    usage: '10K masking requests per month',
    managedAiCredit: '£3 managed AI credit',
    modelUsage: 'Managed evaluation only',
    features: [
      '10K monthly masking requests',
      'Basic API key management',
      'Browser extension and app workflows',
      'Managed AI limited to cheap models',
      '20% annual billing discount',
    ],
    href: 'https://app.neutralai.co.uk/auth/signin?intent=signup&plan=starter&src=website_get_started&callbackUrl=%2Fbilling',
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Team',
    eyebrow: 'Most popular',
    summary: 'Team plan for real usage with audit history and BYOK guidance.',
    monthlyPrice: '£99',
    annualPrice: '£79.20',
    annualBilled: '£950.40 billed yearly',
    priceNote: 'per month',
    usage: '100K masking requests per month',
    managedAiCredit: '£10 managed AI credit',
    modelUsage: 'BYOK recommended',
    features: [
      '100K monthly masking requests',
      'Team usage and audit history',
      'BYOK handoff for production AI spend',
      'Top-up path for managed AI credits',
      '20% annual billing discount',
    ],
    href: 'https://app.neutralai.co.uk/auth/signin?intent=signup&plan=team&src=website_get_started&callbackUrl=%2Fbilling',
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Business',
    eyebrow: 'Scale safely',
    summary: 'Higher-volume governance plan for teams ready to run provider spend through BYOK.',
    monthlyPrice: '£299',
    annualPrice: '£239.20',
    annualBilled: '£2,870.40 billed yearly',
    priceNote: 'per month',
    usage: '500K masking requests per month',
    managedAiCredit: '£25 managed AI credit',
    modelUsage: 'BYOK or customer provider expected',
    features: [
      '500K monthly masking requests',
      'BYOK support for model routing',
      'Policy controls and evidence exports',
      'Full API key lifecycle controls',
      '20% annual billing discount',
    ],
    href: 'https://app.neutralai.co.uk/auth/signin?intent=signup&plan=business&src=website_get_started&callbackUrl=%2Fbilling',
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Enterprise',
    eyebrow: 'Governed rollout',
    summary: 'Dedicated enterprise onboarding with commercial review.',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    priceNote: 'commercial review and rollout planning',
    usage: 'Custom masking volume',
    managedAiCredit: 'Customer-owned model spend',
    modelUsage: 'BYOK, private endpoint, or on-prem',
    features: [
      'Custom commercial agreement',
      'Required SSO and SIEM export posture',
      'Managed browser extension rollout',
      'Private cloud or on-prem planning',
    ],
    href: contactLinks.enterprise,
    cta: 'Talk to Sales',
    featured: false,
  },
] as const

export const primaryPricingPlans = pricingPlans.filter((plan) => ['Free', 'Starter', 'Team'].includes(plan.name))
export const advancedPricingPlans = pricingPlans.filter((plan) => ['Business', 'Enterprise'].includes(plan.name))

export const pricingFaqs = [
  {
    question: 'Why show pricing before a sales call?',
    answer:
      'Security buyers still want a fast commercial read. Public pricing makes the self-serve path clear before procurement or security review begins.',
  },
  {
    question: 'What does Starter include?',
    answer:
      'Starter includes NeutralAI masking usage, basic controls, and a small managed AI credit for evaluation. It is not an unlimited model-usage bundle.',
  },
  {
    question: 'What happens when managed AI credit runs out?',
    answer:
      'Managed generation pauses until the team connects BYOK, moves to a customer-owned provider, or buys prepaid managed AI credit. Masking usage is tracked separately.',
  },
  {
    question: 'When should a team move from Business to Enterprise?',
    answer:
      'Enterprise is the right fit when rollout requires managed extension deployment, required SSO posture, SIEM export, private endpoint routing, on-prem deployment, or custom commercial review.',
  },
] as const

export const pricingFaqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
} as const

export const trustBadges = [
  'AES-256-GCM vault',
  'SOC2 readiness',
  'GDPR-aligned controls',
  'Cyber Essentials via review',
  '20+ PII entity types',
  '10-language benchmark',
] as const

export const technicalTrustDetails = [
  {
    icon: ScanSearch,
    title: 'Two-stage detection',
    detail: 'Presidio NER and pattern matching with semantic validation using Qdrant.',
  },
  {
    icon: Lock,
    title: 'Encrypted token vault',
    detail: 'AES-256-GCM-backed reversible tokenization for governed restore paths.',
  },
  {
    icon: FileText,
    title: 'Entity coverage',
    detail: 'EMAIL, PHONE_NUMBER, PERSON, CREDIT_CARD, IBAN, SSN, TR_ID_NUMBER, UK_NHS_NUMBER, and custom rules.',
  },
  {
    icon: Languages,
    title: 'Policy tuning',
    detail: 'Configurable confidence thresholds per entity type and multilingual detection coverage.',
  },
] as const

export const entityTypes = [
  'EMAIL',
  'PHONE_NUMBER',
  'PERSON',
  'CREDIT_CARD',
  'IBAN',
  'IP_ADDRESS',
  'SSN',
  'UK_NHS_NUMBER',
  'TR_ID_NUMBER',
  'TR_VAT_NUMBER',
  'Custom rules',
] as const

export const detectionStages = [
  {
    eyebrow: 'Stage 1',
    title: 'Presidio NER + Pattern Matching',
    description:
      'Real-time recognizers catch common personal, financial, regional, and network identifiers before the request moves downstream.',
    accent: 'cyan',
  },
  {
    eyebrow: 'Stage 2',
    title: 'Semantic Validation via Qdrant vector DB',
    description:
      'Context checks help reduce false positives before policy decisions, with confidence thresholds configurable per entity type.',
    accent: 'orange',
  },
] as const

export const languageCoverage = [
  { code: 'EN', label: 'English' },
  { code: 'TR', label: 'Turkish' },
  { code: 'DE', label: 'German' },
  { code: 'FR', label: 'French' },
  { code: 'ES', label: 'Spanish' },
  { code: 'IT', label: 'Italian' },
  { code: 'PT', label: 'Portuguese' },
  { code: 'AR', label: 'Arabic' },
  { code: 'NL', label: 'Dutch' },
  { code: 'PL', label: 'Polish' },
] as const

export const maskingModes = [
  {
    mode: 'Irreversible',
    sample: '<EMAIL>',
    detail: 'Sensitive value is removed from the prompt path.',
  },
  {
    mode: 'Reversible',
    sample: '<EMAIL_token_abc123>',
    detail: 'Token is stored in an encrypted vault and retrievable only with authorization.',
  },
] as const

export const complianceProofs = [
  {
    icon: ClipboardCheck,
    label: 'Auto evidence',
    value: 'SOC2 readiness / GDPR-aligned / Cyber Essentials via review',
  },
  {
    icon: Lock,
    label: 'Token vault',
    value: 'AES-256-GCM',
  },
  {
    icon: Timer,
    label: 'Measured overhead',
    value: '~41 ms',
  },
] as const

export const socialProofIndustries = [
  {
    icon: Landmark,
    title: 'Financial Services',
    body: 'Customer, payment, claim, and account context before model routing.',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    body: 'PHI-aware masking posture for healthcare and healthtech evaluations.',
  },
  {
    icon: Scale,
    title: 'Legal',
    body: 'Matter, client, and document-review prompts with clearer AI boundaries.',
  },
  {
    icon: Building2,
    title: 'Public Sector',
    body: 'Citizen-service and internal policy workflows where auditability matters.',
  },
] as const

export const socialProofIndustrySlides = [
  {
    title: 'Financial Services',
    image: '/industries/financial-services-usage.webp',
    caption: 'Protect customer, claim, and payment context before external model routing.',
  },
  {
    title: 'Healthcare',
    image: '/industries/healthcare-usage.webp',
    caption: 'Support PHI-aware masking workflows for healthcare and healthtech teams.',
  },
  {
    title: 'Legal',
    image: '/industries/legal-usage.webp',
    caption: 'Keep matter and client prompts inside clearer policy boundaries.',
  },
  {
    title: 'Public Sector',
    image: '/industries/public-sector-usage.webp',
    caption: 'Reduce citizen-service prompt risk while preserving auditability.',
  },
] as const

export const socialProofMetrics = [
  {
    value: '20+',
    label: 'PII entity types',
    detail: 'Names, contacts, account identifiers, cards, IBANs, NHS-style IDs, and custom rules.',
  },
  {
    value: '10',
    label: 'benchmark languages',
    detail: 'Current multilingual benchmark scope across English, Turkish, German, French, Spanish, and more.',
  },
  {
    value: '99.8%',
    label: 'public overall F1',
    detail: 'Gateway-owned product benchmark, not a third-party independent evaluation.',
  },
  {
    value: '~41 ms',
    label: 'measured overhead',
    detail: 'NeutralAI gateway overhead measured separately from model generation time.',
  },
] as const

export const evaluationStories = [
  {
    label: 'Finance evaluation pattern',
    title: 'A regulated team wants AI summaries without leaking customer identifiers.',
    body: 'NeutralAI sits in front of prompt traffic, masks payment and contact details, and gives security reviewers evidence before wider rollout.',
    outcome: 'Buyer outcome: safer evaluation path before approving production AI workflows.',
  },
  {
    label: 'Healthcare evaluation pattern',
    title: 'A healthtech team needs useful AI output while reducing raw PHI exposure.',
    body: 'Prompts keep operational context while direct patient identifiers are tokenized or removed before external model routing.',
    outcome: 'Buyer outcome: clearer BAA and deployment review conversations without blanket compliance claims.',
  },
] as const

// Source of truth: nazifsohtaoglu/neutralai-gateway benchmark artifacts listed in website issue #16.
export const benchmarkProof = {
  publicOverallF1: '99.8%',
  holdoutOverallF1: '98.4%',
  personHoldoutF1: '92.7%',
  appBenchmarkUrl: `${siteConfig.appBaseUrl}/pii-benchmark`,
} as const

// Source of truth: nazifsohtaoglu/neutralai-gateway#779 healthcare pack artifacts.
export const healthcareTrustPoints = [
  {
    label: 'PHI-aware masking',
    body: 'Patient names, contact details, medical record numbers, health plan/member IDs, and device/UDI-style identifiers can be handled before model routing.',
  },
  {
    label: 'Minimum-necessary posture',
    body: 'Prompts keep useful clinical or operational context while direct identifiers are reduced before they leave the approved workflow.',
  },
  {
    label: 'Review-ready evidence',
    body: 'Audit metadata, breach workflow support, and an evidence pack are available under review/NDA without putting raw PHI into standard reports.',
  },
  {
    label: 'BAA review support',
    body: 'BAA review is available for eligible healthcare deployments, with final terms and deployment responsibilities reviewed commercially.',
  },
] as const

// Source of truth: nazifsohtaoglu/neutralai-gateway#782 document redaction artifacts.
export const documentRedactionPoints = [
  {
    icon: FileText,
    label: 'PDF redaction',
    body: 'Supports simple text PDFs today and returns generated PDF output with visual blackout marks.',
  },
  {
    icon: ScanSearch,
    label: 'Office and images',
    body: 'Extracts Office document text and supports OCR-backed image detection when OCR is configured.',
  },
  {
    icon: ClipboardCheck,
    label: 'Audit-safe metadata',
    body: 'Records file hash, page count, finding counts, and approximate locations without raw sensitive text in standard logs.',
  },
] as const

type DeploymentCard = {
  icon: LucideIcon
  title: string
  audience: string
  description: string
}

export const deploymentCards: DeploymentCard[] = [
  {
    icon: Globe,
    title: 'SaaS',
    audience: 'Fastest path for teams that want managed rollout',
    description:
      'Use NeutralAI as a managed service when you want speed, lower operational overhead, and a simpler path into protected AI usage.',
  },
  {
    icon: Building2,
    title: 'Private Cloud',
    audience: 'For teams that need stronger environment control',
    description:
      'Run NeutralAI in a customer-controlled cloud environment when governance, network boundaries, or data posture require more separation.',
  },
  {
    icon: Server,
    title: 'On-Prem',
    audience: 'For regulated deployments with strict infrastructure requirements',
    description:
      'Deploy NeutralAI inside your own infrastructure when policy, compliance, or customer obligations demand the highest level of control.',
  },
] as const
