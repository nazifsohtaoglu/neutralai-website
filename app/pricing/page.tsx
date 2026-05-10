import type { Metadata } from 'next'
import PricingClient from './PricingClient'
import { getPublicPricingCatalog } from './publicCatalog'
import { siteConfig } from '../site'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Compare NeutralAI Free, Starter, Team, Business, and Enterprise plans with GBP pricing, masking quotas, managed AI credits, and BYOK guidance.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'NeutralAI Pricing',
    description:
      'Public GBP pricing for NeutralAI masking requests, managed AI credits, and BYOK/customer provider routing.',
    url: `${siteConfig.url}/pricing`,
  },
}

export default async function PricingPage() {
  const catalog = await getPublicPricingCatalog()

  return <PricingClient catalog={catalog} />
}
