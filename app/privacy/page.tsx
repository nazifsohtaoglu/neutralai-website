'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Database, Share2, UserCheck, Mail } from 'lucide-react'
import BackButton from '../components/BackButton'

type PolicyContentItem =
  | { label: string; value: string }
  | { value: string }
  | { list: string[] }

type PolicySection = {
  icon: typeof Shield
  title: string
  content: PolicyContentItem[]
}

const sections: PolicySection[] = [
  {
    icon: Shield,
    title: '1. Data Controller',
    content: [
      { label: 'Company Name', value: 'NeutralAI Ltd.' },
      { label: 'Location', value: 'London, United Kingdom' },
      { label: 'Contact Email', value: 'privacy@neutralai.co.uk' }
    ]
  },
  {
    icon: Lock,
    title: '2. Our Zero-Retention Commitment',
    content: [
      { value: 'Unlike traditional data processing services, NeutralAI acts as a transient gateway. We do not store, log, or retain the content of the data (PII) processed through our neutralization engine. Once a request is neutralized and delivered back to the user or the target LLM, the data is permanently purged from our volatile memory.' }
    ]
  },
  {
    icon: Database,
    title: '3. Information We Collect',
    content: [
      { label: 'Account Information', value: 'Name, corporate email address, and billing information provided during registration.' },
      { label: 'Service Metadata', value: 'Non-identifiable technical data such as request timestamps, token counts, and latency metrics to monitor system health and billing accuracy.' },
      { label: 'Communication Data', value: 'Information provided when contacting our support or privacy teams.' }
    ]
  },
  {
    icon: Share2,
    title: '4. How We Use Your Data',
    content: [
      { value: 'The limited data we collect is used strictly to:' },
      { list: ['Operate and maintain the NeutralAI gateway.', 'Manage your account and process payments.', 'Prevent fraudulent activity and ensure system security.', 'Comply with legal obligations under UK GDPR and other applicable laws.'] }
    ]
  },
  {
    icon: UserCheck,
    title: '5. Data Sharing and Third Parties',
    content: [
      { value: 'NeutralAI does not sell, rent, or trade your data. We only share information with third-party service providers (such as AWS for cloud infrastructure) under the following conditions:' },
      { list: ['The data shared is limited to what is necessary for service operation.', 'Providers are contractually bound to maintain strict confidentiality and GDPR compliance.', 'We ensure that data remains within the geographic regions (e.g., UK/EU) specified in your service agreement.'] }
    ]
  },
  {
    icon: Mail,
    title: '6. Your Rights',
    content: [
      { value: 'Under UK GDPR, you have the right to access, rectify, or erase your account data. Since we do not retain the neutralized PII data, we cannot provide access to or delete past neutralized content as it no longer exists within our systems.' }
    ]
  }
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <BackButton />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              At NeutralAI Ltd., we operate with a "Security-First" mission. Our core technology is built on a Stateless Architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((item, j) => (
                    <div key={j}>
                      {'label' in item && (
                        <div className="flex gap-2">
                          <span className="text-slate-500 min-w-[140px]">{item.label}:</span>
                          <span className="text-slate-300">{item.value}</span>
                        </div>
                      )}
                      {'value' in item && !('label' in item) && (
                        <p className="text-slate-400">{item.value}</p>
                      )}
                      {'list' in item && (
                        <ul className="space-y-2 ml-4">
                          {item.list.map((listItem, k) => (
                            <li key={k} className="text-slate-400 flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Questions about our Privacy Policy?
            </h2>
            <p className="text-slate-400 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a 
              href="mailto:privacy@neutralai.co.uk" 
              className="btn btn-primary text-lg px-8 py-4 inline-flex"
            >
              <Mail className="w-5 h-5 mr-2" />
              privacy@neutralai.co.uk
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
