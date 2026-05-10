import { siteConfig } from '../site'

export type PricingCta = {
  href: string
  intent: string
  plan: string
  src: string
  mode?: 'self-serve' | 'contact-sales'
}

export type PricingTierId = 'free' | 'starter' | 'team' | 'business' | 'enterprise'

export type PricingTier = {
  tier_id: PricingTierId
  title: string
  order: number
  availability: 'public'
  description: string
  cta_mode: 'self-serve' | 'contact-sales'
  cta: {
    action: string
    href: string
    intent: string
    plan: string
    src: string
  }
  billing: {
    checkout_plan: string | null
    checkout_supported: boolean
    stripe_price_id: string | null
    extra_masking_pack_gbp_per_10k: number | null
    monthly_price_gbp: number | null
    annual_discount_percent: number
    annual_monthly_equivalent_gbp: number | null
    annual_billed_upfront_gbp: number | null
    currency: 'GBP'
    masking_requests_monthly: number | null
    managed_ai_credit_gbp: number | null
    managed_ai_credit_note: string
    ai_billing_mode: string
    provider_strategy: string
  }
}

export type PublicPricingCatalog = {
  catalog_id: string
  catalog_version: string
  generated_at: string
  owner: 'gateway'
  commercial_terms: {
    currency: 'GBP'
    annual_discount_percent: number
    model_spend_policy: string
  }
  pricing_fingerprint_sha256: string
  cta_matrix: Record<string, PricingCta>
  tiers: PricingTier[]
}

const authBase = `${siteConfig.appBaseUrl}/auth/signin`
const contactSalesUrl = `${siteConfig.wwwUrl}/contact-sales`

function handoff(plan: string, src: string, callbackUrl = '/billing') {
  const query = new URLSearchParams({
    intent: 'signup',
    plan,
    src,
    callbackUrl,
  })
  return `${authBase}?${query.toString()}`
}

const managedCreditNote =
  'Managed AI credits are for evaluation and capped managed usage, not unlimited model spend.'

const baseBilling = {
  annual_discount_percent: 20,
  currency: 'GBP',
  managed_ai_credit_note: managedCreditNote,
  extra_masking_pack_gbp_per_10k: null,
  stripe_price_id: null,
} as const

// Fallback mirrors the gateway-owned public catalog contract for static/build resilience.
// Source of truth: neutralai-gateway GET /v1/billing/public-catalog.
export const fallbackPublicPricingCatalog: PublicPricingCatalog = {
  catalog_id: 'neutralai-public-pricing',
  catalog_version: '2026-Q1',
  generated_at: '2026-05-08T00:00:00Z',
  owner: 'gateway',
  commercial_terms: {
    currency: 'GBP',
    annual_discount_percent: 20,
    model_spend_policy:
      'Masking requests are included by plan. Production model/provider spend is customer-owned through BYOK/customer provider routing or prepaid managed AI top-ups.',
  },
  pricing_fingerprint_sha256: '0'.repeat(64),
  cta_matrix: {
    start_free_trial: {
      href: handoff('free', 'website_start_free_trial', '/chat'),
      intent: 'signup',
      plan: 'free',
      src: 'website_start_free_trial',
      mode: 'self-serve',
    },
    get_started: {
      href: handoff('starter', 'website_get_started'),
      intent: 'signup',
      plan: 'starter',
      src: 'website_get_started',
      mode: 'self-serve',
    },
    get_team: {
      href: handoff('team', 'website_get_team'),
      intent: 'signup',
      plan: 'team',
      src: 'website_get_team',
      mode: 'self-serve',
    },
    get_business: {
      href: handoff('business', 'website_get_business'),
      intent: 'signup',
      plan: 'business',
      src: 'website_get_business',
      mode: 'self-serve',
    },
    contact_sales: {
      href: contactSalesUrl,
      intent: 'sales',
      plan: 'enterprise',
      src: 'website_contact_sales',
      mode: 'contact-sales',
    },
  },
  tiers: [
    {
      tier_id: 'free',
      title: 'Free',
      order: 10,
      availability: 'public',
      description: 'Sandbox access for validating the masking flow.',
      cta_mode: 'self-serve',
      cta: {
        action: 'start_free_trial',
        href: handoff('free', 'website_start_free_trial', '/chat'),
        intent: 'signup',
        plan: 'free',
        src: 'website_start_free_trial',
      },
      billing: {
        ...baseBilling,
        checkout_plan: null,
        checkout_supported: false,
        monthly_price_gbp: 0,
        annual_monthly_equivalent_gbp: 0,
        annual_billed_upfront_gbp: 0,
        masking_requests_monthly: 1000,
        managed_ai_credit_gbp: 1,
        ai_billing_mode: 'managed_credit',
        provider_strategy: 'Managed sandbox only with cheap allowlisted models and hard caps.',
      },
    },
    {
      tier_id: 'starter',
      title: 'Starter',
      order: 20,
      availability: 'public',
      description: 'Low-friction paid plan for founders and small regulated teams.',
      cta_mode: 'self-serve',
      cta: {
        action: 'get_started',
        href: handoff('starter', 'website_get_started'),
        intent: 'signup',
        plan: 'starter',
        src: 'website_get_started',
      },
      billing: {
        ...baseBilling,
        checkout_plan: 'starter',
        checkout_supported: true,
        monthly_price_gbp: 29,
        annual_monthly_equivalent_gbp: 23.2,
        annual_billed_upfront_gbp: 278.4,
        masking_requests_monthly: 10000,
        managed_ai_credit_gbp: 3,
        ai_billing_mode: 'managed_credit',
        provider_strategy: 'Managed evaluation only; production model spend should move to BYOK or top-up.',
      },
    },
    {
      tier_id: 'team',
      title: 'Team',
      order: 30,
      availability: 'public',
      description: 'Team plan for real usage with audit history and BYOK guidance.',
      cta_mode: 'self-serve',
      cta: {
        action: 'get_team',
        href: handoff('team', 'website_get_team'),
        intent: 'signup',
        plan: 'team',
        src: 'website_get_team',
      },
      billing: {
        ...baseBilling,
        checkout_plan: 'team',
        checkout_supported: true,
        monthly_price_gbp: 99,
        annual_monthly_equivalent_gbp: 79.2,
        annual_billed_upfront_gbp: 950.4,
        masking_requests_monthly: 100000,
        managed_ai_credit_gbp: 10,
        ai_billing_mode: 'byok_recommended',
        provider_strategy: 'BYOK recommended; limited managed fallback is credit-capped.',
      },
    },
    {
      tier_id: 'business',
      title: 'Business',
      order: 40,
      availability: 'public',
      description: 'Higher-volume governance plan for teams ready to run provider spend through BYOK.',
      cta_mode: 'self-serve',
      cta: {
        action: 'get_business',
        href: handoff('business', 'website_get_business'),
        intent: 'signup',
        plan: 'business',
        src: 'website_get_business',
      },
      billing: {
        ...baseBilling,
        checkout_plan: 'business',
        checkout_supported: true,
        monthly_price_gbp: 299,
        annual_monthly_equivalent_gbp: 239.2,
        annual_billed_upfront_gbp: 2870.4,
        masking_requests_monthly: 500000,
        managed_ai_credit_gbp: 25,
        ai_billing_mode: 'byok_expected',
        provider_strategy: 'BYOK or customer provider account expected for production usage.',
      },
    },
    {
      tier_id: 'enterprise',
      title: 'Enterprise',
      order: 50,
      availability: 'public',
      description: 'Dedicated enterprise onboarding with commercial review.',
      cta_mode: 'contact-sales',
      cta: {
        action: 'contact_sales',
        href: contactSalesUrl,
        intent: 'sales',
        plan: 'enterprise',
        src: 'website_contact_sales',
      },
      billing: {
        ...baseBilling,
        checkout_plan: null,
        checkout_supported: false,
        monthly_price_gbp: null,
        annual_monthly_equivalent_gbp: null,
        annual_billed_upfront_gbp: null,
        masking_requests_monthly: null,
        managed_ai_credit_gbp: null,
        ai_billing_mode: 'customer_provider',
        provider_strategy: 'Customer-owned provider spend via BYOK, private endpoint, or on-prem deployment.',
      },
    },
  ],
}

export async function getPublicPricingCatalog(): Promise<PublicPricingCatalog> {
  try {
    const response = await fetch(`${siteConfig.apiBaseUrl}/v1/billing/public-catalog`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Pricing catalog fetch failed with HTTP ${response.status}`)
    }

    return (await response.json()) as PublicPricingCatalog
  } catch {
    return fallbackPublicPricingCatalog
  }
}
