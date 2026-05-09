'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { homeSections, siteConfig } from '../site'

const navLinks = [
  { name: 'Problem', href: homeSections.problem },
  { name: 'How It Works', href: homeSections.howItWorks },
  { name: 'Why Trust Us', href: homeSections.trust },
  { name: 'Compare', href: homeSections.compare },
  { name: 'Playground', href: '/playground' },
  { name: 'Blog', href: '/blog' },
  { name: 'Trust Center', href: '/trust-center' },
  { name: 'Pricing', href: homeSections.pricing },
  { name: 'About', href: '/about' },
]

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-4'}`}>
      <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between gap-5 px-6 lg:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="NeutralAI" width={40} height={40} className="w-10 h-10 rounded-lg" />
          <span className="whitespace-nowrap font-heading text-xl font-bold">NeutralAI</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="whitespace-nowrap text-sm text-slate-300 transition-colors hover:text-primary 2xl:text-base"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden flex-shrink-0 items-center gap-4 xl:flex">
          <Link href="/contact" className="whitespace-nowrap text-sm text-slate-300 transition-colors hover:text-white 2xl:text-base">
            Contact
          </Link>
          <Link href={siteConfig.signupUrl} className="btn btn-cta whitespace-nowrap px-5 py-3 text-sm 2xl:text-base">
            Get Started Free
          </Link>
        </div>

        <button 
          className="xl:hidden text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden absolute top-full left-0 right-0 glass border-t border-border p-4"
        >
          {navLinks.map((link) => (
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
          >
            Get Started Free
          </Link>
        </motion.div>
      )}
    </nav>
  )
}
