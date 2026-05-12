import { pricingFaqStructuredData } from './data/homepage'
import CtaSection from './components/home/CtaSection'
import DetectionEngine from './components/home/DetectionEngine'
import Hero from './components/home/Hero'
import HowItWorks from './components/home/HowItWorks'
import PricingSection from './components/home/PricingSection'
import ProductSurface from './components/home/ProductSurface'
import SocialProofSection from './components/home/SocialProofSection'
import TrustSection from './components/home/TrustSection'
import UseCasesSection from './components/home/UseCasesSection'
import WhyItMatters from './components/home/WhyItMatters'

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqStructuredData) }}
      />
      <Hero />
      <SocialProofSection />
      <UseCasesSection />
      <ProductSurface />
      <WhyItMatters />
      <HowItWorks />
      <DetectionEngine />
      <TrustSection />
      <PricingSection />
      <CtaSection />
    </main>
  )
}
