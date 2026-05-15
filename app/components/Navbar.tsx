'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { homeSections, siteConfig } from '../site'

const primaryNavLinks = [
  { name: 'Problem', href: homeSections.problem },
  { name: 'How It Works', href: homeSections.howItWorks },
  { name: 'Why Trust Us', href: homeSections.trust },
  { name: 'Compare', href: homeSections.compare },
  { name: 'Pricing', href: homeSections.pricing },
  { name: 'Playground', href: '/playground' },
  { name: 'Developers', href: '/developers' },
]

const secondaryNavLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Trust Center', href: '/trust-center' },
  { name: 'About', href: '/about' },
] as const

const useCaseLinks = [
  { name: 'All Use Cases', href: '/use-cases' },
  { name: 'Finance', href: '/use-cases/financial-services' },
  { name: 'Healthcare', href: '/use-cases/healthcare' },
  { name: 'Legal', href: '/use-cases/legal' },
] as const

type DropdownLink = {
  name: string
  href: string
}

function DesktopDropdown({ label, links }: { label: string; links: readonly DropdownLink[] }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap text-sm text-slate-300 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 2xl:text-base"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-background-secondary/95 p-2 opacity-0 shadow-[0_20px_60px_rgba(2,6,23,0.5)] backdrop-blur transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-primary focus-visible:bg-white/[0.06] focus-visible:text-primary focus-visible:outline-none"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-4'}`}
      data-visual-smoke="navbar-root"
    >
      <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between gap-5 px-6 lg:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2">
          <Image src="/logo-sm.webp" alt="NeutralAI" width={40} height={40} className="w-10 h-10 rounded-lg" priority />
          <span className="whitespace-nowrap font-heading text-xl font-bold">NeutralAI</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex 2xl:gap-6">
          {primaryNavLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="whitespace-nowrap text-sm text-slate-300 transition-colors hover:text-primary 2xl:text-base"
            >
              {link.name}
            </Link>
          ))}
          <DesktopDropdown label="Use Cases" links={useCaseLinks} />
          <DesktopDropdown label="More" links={secondaryNavLinks} />
        </div>

        <div className="hidden flex-shrink-0 items-center gap-4 xl:flex">
          <Link href="/contact" className="whitespace-nowrap text-sm text-slate-300 transition-colors hover:text-white 2xl:text-base">
            Contact
          </Link>
          <Link
            href={siteConfig.signupUrl}
            className="btn btn-cta whitespace-nowrap px-5 py-3 text-sm 2xl:text-base"
            data-analytics-event="CTA Click"
            data-analytics-label="Get Started Free"
            data-analytics-placement="navbar_desktop"
          >
            Get Started Free
          </Link>
        </div>

        <button 
          className="xl:hidden text-slate-300"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden absolute top-full left-0 right-0 max-h-[calc(100vh-72px)] overflow-y-auto glass border-t border-border p-4"
          data-visual-smoke="mobile-nav-panel"
        >
          {primaryNavLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="block py-3 text-slate-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">More</div>
          {secondaryNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-3 text-slate-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Use Cases</div>
          {useCaseLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-3 text-slate-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block py-3 text-slate-300 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href={siteConfig.signupUrl}
            className="btn btn-cta w-full mt-4"
            onClick={() => setIsOpen(false)}
            data-analytics-event="CTA Click"
            data-analytics-label="Get Started Free"
            data-analytics-placement="navbar_mobile"
          >
            Get Started Free
          </Link>
        </motion.div>
      )}
    </nav>
  )
}
