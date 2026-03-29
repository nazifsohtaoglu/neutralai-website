'use client'

import { motion } from 'framer-motion'
import { FileText, Shield, AlertTriangle, Ban, Scale, Flag, Globe } from 'lucide-react'
import BackButton from '../components/BackButton'

type TermsContentItem =
  | { label: string; value: string }
  | { value: string }
  | { list: string[] }

type TermsSection = {
  icon: typeof FileText
  title: string
  content: TermsContentItem[]
}

const sections: TermsSection[] = [
  {
    icon: FileText,
    title: '1. Service Description',
    content: [
      { value: 'NeutralAI provides a specialized security gateway designed to identify and neutralize Personally Identifiable Information (PII) and sensitive data within Generative AI workflows (the "Service"). Our Service acts as a stateless intermediary layer that processes data in real-time to enhance privacy compliance before data is transmitted to third-party Large Language Models (LLMs).' }
    ]
  },
  {
    icon: Shield,
    title: '2. Use of Service',
    content: [
      { label: 'Eligibility', value: 'You must have the legal authority to bind your organization to these Terms.' },
      { label: 'Account Responsibility', value: 'You are responsible for maintaining the security of your API keys and account credentials.' },
      { label: 'Compliance', value: 'You agree to use the Service in compliance with all applicable laws, including but not limited to the UK GDPR and international data protection regulations.' }
    ]
  },
  {
    icon: AlertTriangle,
    title: '3. Limitations and Restrictions',
    content: [
      { value: 'To ensure the integrity and availability of the Service, users shall not:' },
      { list: [
        'Reverse Engineer: Attempt to derive the source code or underlying algorithms of the neutralization engine.',
        'Misuse: Use the Service to intentionally bypass security controls or conduct illegal activities.',
        'Prohibited Content: Submit data that contains malware, viruses, or any harmful computer code.',
        'Fair Use: Exceed the rate limits or throughput capacities defined in your specific subscription plan. NeutralAI reserves the right to throttle or suspend service if usage patterns threaten system stability.'
      ] }
    ]
  },
  {
    icon: Ban,
    title: '4. Limitation of Liability',
    content: [
      { label: '"As-Is" Basis', value: 'The Service is provided on an "as-is" and "as-available" basis. While NeutralAI utilizes advanced algorithms for data neutralization, no automated system is 100% infallible.' },
      { label: 'Disclaimer', value: 'NeutralAI Ltd. shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, data breaches occurring at the end-user or third-party LLM level, or business interruptions.' },
      { label: 'Third-Party Models', value: 'NeutralAI is a security layer. We are not responsible for the outputs, accuracy, or availability of third-party AI models (e.g., OpenAI, Anthropic, Google Gemini) to which the neutralized data is sent.' },
      { label: 'Maximum Liability', value: 'To the maximum extent permitted by law, our total liability for any claim arising out of these Terms shall not exceed the amount paid by you for the Service during the twelve (12) months preceding the claim.' }
    ]
  },
  {
    icon: Flag,
    title: '5. Termination',
    content: [
      { value: 'We reserve the right to suspend or terminate access to the Service for any breach of these Terms, non-payment of fees, or if required by law.' }
    ]
  },
  {
    icon: Globe,
    title: '6. Governing Law',
    content: [
      { value: 'These Terms are governed by and construed in accordance with the laws of England and Wales.' }
    ]
  }
]

export default function TermsPage() {
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
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Welcome to NeutralAI. These Terms of Service govern your access to and use of our services.
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
                        <div className="mb-4">
                          <span className="text-slate-500 font-medium">{item.label}: </span>
                          <span className="text-slate-300">{item.value}</span>
                        </div>
                      )}
                      {'value' in item && !('label' in item) && (
                        <p className="text-slate-400">{item.value}</p>
                      )}
                      {'list' in item && (
                        <ul className="space-y-2 ml-4 mt-4">
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

      {/* Last Updated */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="card p-8">
              <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-slate-400">
                By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-slate-500 text-sm mt-6">
                Last updated: February 2026
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
