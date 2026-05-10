import type { Metadata } from 'next'
import UseCasePage from '../UseCasePage'
import { healthcareUseCase } from '../content'
import { siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'PHI-Aware AI Data Protection for Healthcare',
  description:
    'See how NeutralAI supports PHI-aware masking, minimum-necessary AI workflows, audit evidence, and BAA review conversations for healthcare deployments.',
  alternates: {
    canonical: '/use-cases/healthcare',
  },
  openGraph: {
    title: 'PHI-Aware AI Data Protection for Healthcare',
    description:
      'Mask patient identifiers before healthcare prompts reach external AI providers, with BAA review support for eligible deployments.',
    url: `${siteConfig.url}/use-cases/healthcare`,
  },
}

export default function HealthcareUseCasePage() {
  return <UseCasePage content={healthcareUseCase} />
}
