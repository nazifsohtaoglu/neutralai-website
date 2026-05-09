import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About NeutralAI',
  description:
    'Learn how NeutralAI builds an AI security gateway for regulated teams that need PII masking, policy boundaries, and evidence for safer AI adoption.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
