import type { Metadata } from 'next'
import UseCasePage from '../UseCasePage'
import { financeUseCase } from '../content'
import { siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'AI Data Protection for Financial Services',
  description:
    'See how NeutralAI helps financial services teams mask IBANs, card data, customer names, and claim references before AI prompts reach model providers.',
  alternates: {
    canonical: '/use-cases/finance',
  },
  openGraph: {
    title: 'AI Data Protection for Financial Services',
    description:
      'Mask customer and payment identifiers before financial services prompts reach external AI providers.',
    url: `${siteConfig.url}/use-cases/finance`,
  },
}

export default function FinanceUseCasePage() {
  return <UseCasePage content={financeUseCase} />
}
