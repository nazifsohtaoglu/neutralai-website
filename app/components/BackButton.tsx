'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ href = '/', text = 'Back to Home' }: { href?: string, text?: string }) {
  return (
    <Link 
      href={href}
      className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{text}</span>
    </Link>
  )
}
