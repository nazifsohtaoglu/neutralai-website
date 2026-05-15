import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="container-custom py-20 md:py-24">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-background-secondary/70 p-8 text-center md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">Page not found</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            The page you requested is unavailable or has moved. You can continue from the homepage or
            browse the use cases.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn btn-cta px-8 py-4">
              Go to Homepage
            </Link>
            <Link href="/use-cases" className="btn btn-secondary px-8 py-4">
              Explore Use Cases
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
