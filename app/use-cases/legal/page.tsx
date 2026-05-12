import type { Metadata } from 'next'
import UseCasePage from '../UseCasePage'
import { legalUseCase } from '../content'
import { siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'AI Data Protection for Legal Teams',
  description:
    'See how NeutralAI helps legal teams mask client names, matter IDs, privileged context, and document review excerpts before AI prompts reach model providers.',
  alternates: {
    canonical: '/use-cases/legal',
  },
  openGraph: {
    title: 'AI Data Protection for Legal Teams',
    description:
      'Mask client, matter, and privileged context before legal AI workflows reach external model providers.',
    url: `${siteConfig.url}/use-cases/legal`,
  },
}

export default function LegalUseCasePage() {
  return <UseCasePage content={legalUseCase} />
}
