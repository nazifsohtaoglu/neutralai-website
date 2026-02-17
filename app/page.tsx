'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Brain, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  ChevronRight,
  Globe,
  Database,
  Eye,
  FileCheck,
  Clock,
  Star,
  Activity
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Real-time PII Detection',
    description: 'Detect and mask sensitive data in milliseconds before it reaches any AI model.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Recognition',
    description: 'Powered by Microsoft Presidio and advanced NLP for accurate entity recognition.'
  },
  {
    icon: Lock,
    title: 'Reversible Masking',
    description: 'Secure vault system allows authorized users to detokenize when needed.'
  },
  {
    icon: Database,
    title: 'Semantic Validation',
    description: 'Vector database integration catches context-sensitive data leaks.'
  },
  {
    icon: FileCheck,
    title: 'Audit & Compliance',
    description: 'Complete audit trails for GDPR, HIPAA, and SOC2 compliance.'
  },
  {
    icon: Zap,
    title: 'Low Latency',
    description: 'Sub-50ms processing time ensures seamless user experience.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Data Ingestion',
    description: 'User prompt enters the gateway with full metadata preservation.',
    icon: Database
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Microsoft Presidio + NLP engine scans for 15+ PII entity types.',
    icon: Brain
  },
  {
    number: '03',
    title: 'Smart Masking',
    description: 'Identified PII is replaced with secure tokens or custom masks.',
    icon: Shield
  },
  {
    number: '04',
    title: 'Safe Output',
    description: 'Clean prompt flows to AI models. Original data stays protected.',
    icon: Lock
  }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for startups and small teams',
    features: [
      '10,000 requests/month',
      '5 PII entity types',
      'Standard masking',
      'Email support',
      'Basic audit logs'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: '$299',
    period: '/month',
    description: 'For growing companies with compliance needs',
    features: [
      '100,000 requests/month',
      'All PII entity types',
      'Reversible masking',
      'Priority support',
      'Full audit logs',
      'Custom rules',
      'API access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited requests',
      'All features included',
      'Dedicated support',
      'On-premise deployment',
      'SLA guarantee',
      'Custom integrations',
      'Security review'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const stats = [
  { value: '15+', label: 'PII Entity Types' },
  { value: '99.9%', label: 'Detection Accuracy' },
  { value: '<50ms', label: 'Processing Time' },
  { value: '100K+', label: 'Requests Protected' }
]

const testimonials = [
  {
    quote: "NeutralAI saved us from a potential GDPR violation. Their real-time PII detection is remarkable.",
    author: "Sarah Chen",
    role: "CTO",
    company: "FinTech Global",
    avatar: "SC"
  },
  {
    quote: "Finally, we can use AI confidently knowing our customer data is fully protected.",
    author: "Michael Roberts",
    role: "CISO",
    company: "HealthSecure",
    avatar: "MR"
  },
  {
    quote: "The audit capabilities alone are worth the investment. Compliance has never been easier.",
    author: "Emma Williams",
    role: "Data Officer",
    company: "BankCorp",
    avatar: "EW"
  }
]

const logos = [
  'OpenAI', 'Anthropic', 'Google', 'Microsoft', 'AWS', 'Azure'
]

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary-light">Now in Public Beta</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Protect Your Data. <br />
            <span className="gradient-text">Empower Your AI.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Enterprise-grade PII protection for AI systems. Detect, mask, and control sensitive data before it reaches AI models.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#pricing" className="btn btn-cta text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <button className="btn btn-secondary text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary-light">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating cards - positioned outside content to prevent overlap */}
        <div className="absolute top-40 left-4 xl:left-0 hidden lg:block pointer-events-none">
          <div className="card p-4 w-56 -translate-x-full mr-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent-success/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent-success" />
              </div>
              <span className="font-medium text-sm">PII Detected</span>
            </div>
            <div className="text-xs text-slate-500">john@company.com → &lt;EMAIL_1&gt;</div>
          </div>
        </div>

        <div className="absolute top-56 right-4 xl:right-0 hidden lg:block pointer-events-none">
          <div className="card p-4 w-56 translate-x-full ml-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-sm">Data Secured</span>
            </div>
            <div className="text-xs text-slate-500">+12 items protected this session</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function Problem() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Your Sensitive Data is <span className="text-red-500">Leaking</span> to AI
          </h2>
          <p className="text-slate-400 text-lg">
            Every day, organizations unknowingly expose customer PII, financial data, and secrets to AI models. The risk is real and growing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-4xl font-heading font-bold text-red-500 mb-2">73%</div>
            <p className="text-slate-400">of companies using AI have experienced data leaks</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-4xl font-heading font-bold text-orange-500 mb-2">$4.5M</div>
            <p className="text-slate-400">average cost of a data breach in 2024</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-heading font-bold text-primary mb-2">280 days</div>
            <p className="text-slate-400">average time to detect and contain a breach</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="section relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              Built by Those Who <span className="gradient-text">Lived It</span>
            </h2>
            
            <div className="space-y-6 text-slate-400">
              <p>
                We founded NeutralAI after witnessing something troubling: organizations rushing to adopt AI while unknowingly exposing their most sensitive data.
              </p>
              <p>
                Our team has worked in cybersecurity for 15+ years. We've seen the aftermath of data breaches — careers ended, companies fined, trust destroyed.
              </p>
              <p>
                When AI exploded, we saw the same pattern repeating. Companies were so eager to leverage AI that they skipped the most critical step: protecting their data.
              </p>
              <p className="text-primary-light font-medium">
                That's why we built NeutralAI — to make AI safe for everyone.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-xs font-bold">
                    {['NR', 'MS', 'JK', 'AL'][i-1]}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-slate-300">Founded by security experts from</span>
                <span className="text-primary ml-1">Google, Microsoft, Palantir</span>
              </div>
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
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">The Problem</h4>
                    <p className="text-slate-400 text-sm">AI models memorize training data, including sensitive information.</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-border" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Our Solution</h4>
                    <p className="text-slate-400 text-sm">Real-time PII detection and masking before data reaches AI.</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-border" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-success/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-accent-success" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">The Result</h4>
                    <p className="text-slate-400 text-sm">Safe AI adoption with full compliance and audit capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-background-secondary relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Four simple steps to secure your AI deployments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="card p-6 h-full">
                <div className="text-6xl font-heading font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {step.description}
                </p>
              </div>
              
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-primary/50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Enterprise-Grade <span className="gradient-text">Features</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to secure AI deployments at scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section bg-background-secondary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
          {logos.map((logo, i) => (
            <div key={i} className="text-xl font-heading font-bold text-slate-500">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-lg">
            Start free, scale as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card p-6 relative ${plan.popular ? 'border-primary glow-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-background text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-heading font-semibold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#"
                className={`btn w-full ${plan.popular ? 'btn-cta' : 'btn-secondary'}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Ready to Secure Your AI?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join 100+ companies already protecting their data with NeutralAI. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="btn btn-cta text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/demo" className="btn btn-secondary text-lg px-8 py-4">
              Schedule Demo
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Story />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  )
}
