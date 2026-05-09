import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read NeutralAI terms for the AI security gateway, browser extension support surfaces, PII masking service use, compliance responsibilities, and service limits.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
