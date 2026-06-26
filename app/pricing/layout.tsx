import type { Metadata } from 'next'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'Pricing — NeutralAI',
  description:
    'Simple, transparent pricing for regulated AI rollout. Free sandbox through Enterprise with BYOK, SSO, and SIEM export. No model-spend bundling — just NeutralAI masking and governance.',
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    title: 'Pricing — NeutralAI',
    description:
      'Simple, transparent pricing for regulated AI rollout. Free sandbox through Enterprise with BYOK, SSO, and SIEM export.',
    url: `${siteConfig.url}/pricing`,
    siteName: siteConfig.name,
    type: 'website',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
