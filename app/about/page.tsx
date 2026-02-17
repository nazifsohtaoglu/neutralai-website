'use client'

import { motion } from 'framer-motion'
import { Shield, Globe, Users, Award, MapPin, Heart, Lock, Lightbulb, Zap } from 'lucide-react'
import BackButton from '../components/BackButton'

const values = [
  {
    icon: Heart,
    title: 'Integrity First',
    description: 'Taking the Captain\'s mindset to code—we operate with transparency and an uncompromising commitment to security.'
  },
  {
    icon: Lock,
    title: 'Stateless by Design',
    description: 'We believe you cannot lose what you do not hold. Our architecture is built on the principle of zero data retention.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Through Safety',
    description: 'We view security not as a barrier, but as the primary enabler of technological advancement.'
  },
  {
    icon: Zap,
    title: 'Precision Engineering',
    description: 'Every line of code is optimized for minimal latency and maximum protection.'
  }
]

const team = [
  { role: 'Founder & CEO', initials: 'NR', name: 'Founder' },
  { role: 'Senior Cloud Architect', initials: 'MS', name: 'Cloud Lead' },
  { role: 'Security Strategist', initials: 'JK', name: 'Security' },
  { role: 'Lead Engineer', initials: 'AL', name: 'Engineering' }
]

export default function AboutPage() {
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
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">NeutralAI</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Empowering Innovation, Guaranteed Privacy. We are building the secure frontier for AI in the enterprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Born from <span className="gradient-text">Necessity</span>
              </h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  NeutralAI was founded in response to a critical tipping point in the digital era: the alarming rise of AI data leaks. As Generative AI integrated into the workplace, a dangerous gap emerged between productivity and privacy.
                </p>
                <p>
                  Observing how sensitive corporate data was being exposed to public LLMs, our founder—a former Captain with a decade of high-stakes operational experience—realized that a "ban" wasn't the answer, but a secure frontier was.
                </p>
                <p>
                  NeutralAI was built to be that frontier, ensuring that innovation never comes at the cost of integrity.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <div className="relative card p-8 border-animate">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-1">The Problem</h4>
                      <p className="text-slate-400 text-sm">AI data leaks threaten enterprise security and customer privacy worldwide.</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-border" />
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-1">Our Response</h4>
                      <p className="text-slate-400 text-sm">A secure gateway that protects data without compromising AI capabilities.</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-border" />
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-success/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-accent-success" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-1">The Solution</h4>
                      <p className="text-slate-400 text-sm">Local deployment ensures data never leaves your infrastructure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="section bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Empowering Innovation, Guaranteed Privacy
            </p>
            <div className="card p-8 text-left">
              <p className="text-slate-400 leading-relaxed">
                Our mission is to unblock AI productivity for the world's most regulated industries. We aim to eliminate the "AI Friction" by providing a seamless neutralization layer that allows organizations to harness the full power of Large Language Models (LLMs) without ever compromising the sanctity of their sensitive data.
              </p>
              <p className="text-slate-400 leading-relaxed mt-4">
                We don't just secure data; we enable progress.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Team</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Expertly Led, Mission-Driven
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {member.initials}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-slate-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-slate-400 max-w-2xl mx-auto">
              Founded and led by a Senior Cloud Architect with over 15 years of combined experience in military leadership and large-scale AWS ecosystems. We are a lean, high-impact team of cybersecurity experts, data scientists, and cloud engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">NeutralAI Code</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our Core Values
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-slate-400 text-sm">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Location Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                A <span className="gradient-text">Global Bridge</span>
              </h2>
            </div>
            
            <div className="card p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-2">UK-Based Enterprise</h3>
                  <p className="text-slate-400">
                    Strategically headquartered in London, the heart of global fintech and legal-tech regulation.
                  </p>
                </div>
              </div>
              
              <p className="text-slate-400">
                While our roots and regulatory focus are firmly planted in the UK and Turkey, our infrastructure is designed for global scalability, serving enterprises across borders that demand the highest standards of GDPR and international data compliance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your AI?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Join the enterprises that trust NeutralAI to protect their most sensitive data.
            </p>
            <a href="/#pricing" className="btn btn-cta text-lg px-8 py-4">
              Get Started
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
