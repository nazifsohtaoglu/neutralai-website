import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnalyticsProvider from './components/AnalyticsProvider'
import { siteConfig } from './site'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | AI Security Gateway`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'NeutralAI',
    'AI security gateway',
    'PII masking',
    'privacy gateway',
    'LLM security',
    'UK GDPR',
    'presidio alternative',
    'pii detection api',
    'ai compliance gateway',
    'llm data protection',
    'sensitive data masking for ai',
    'enterprise ai privacy',
    'ai data loss prevention',
    'pii redaction for llm',
    'gdpr compliant ai',
    'hipaa ai gateway',
    'ai privacy gateway',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} | AI Security Gateway`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} AI Security Gateway preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | AI Security Gateway`,
    description: siteConfig.description,
    images: ['/og-default.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: siteConfig.salesEmail,
            url: `${siteConfig.url}/contact`,
          },
          {
            '@type': 'ContactPoint',
            contactType: 'security',
            email: siteConfig.securityEmail,
            url: `${siteConfig.url}/security`,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteConfig.url}/#software`,
        name: `${siteConfig.name} Gateway`,
        applicationCategory: 'SecurityApplication',
        applicationSubCategory: 'AI compliance gateway',
        operatingSystem: 'Web',
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          category: 'SaaS',
          url: siteConfig.signupUrl,
        },
      },
    ],
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable} font-body bg-background text-slate-50 antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
      </body>
    </html>
  )
}
