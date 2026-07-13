import { pricingFaqStructuredData } from '../data/homepage'
import { siteConfig } from '../site'
import PricingSection from '../components/home/PricingSection'
import CtaSection from '../components/home/CtaSection'

// pricingFaqStructuredData is a fully static typed const — no user input, no XSS risk.
// JSON.stringify on a typed const is the Next.js-recommended pattern for JSON-LD (see app/page.tsx).

export default function PricingPage() {
  return (
    <main>
      {/* pricingFaqStructuredData is a fully static typed const — no user input. Same pattern as homepage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqStructuredData) }}
      />
      {/* Top spacer to clear fixed navbar */}
      <div className="pt-24" />
      <PricingSection />
      <CtaSection />
    </main>
  )
}
