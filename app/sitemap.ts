import type { MetadataRoute } from 'next'
import { siteConfig } from './site'
import { getAllPosts } from './blog/posts'

export const dynamic = 'force-static'

const routes = [
  '',
  '/about',
  '/benchmark',
  '/pricing',
  '/blog',
  '/compare',
  // /compliance/checklist is intentionally absent: gated lead-magnet asset (noindex).
  '/compliance',
  '/compliance/uk-guidance-map',
  '/compliance/law-society-generative-ai',
  '/compliance/sra-ai-risk-outlook',
  '/compliance/bar-council-generative-ai',
  '/compliance/judiciary-ai-guidance',
  '/compliance/ico-generative-ai',
  '/compliance/data-use-and-access-act',
  '/compliance/fca-ai-approach',
  '/contact',
  '/demo',
  '/developers',
  '/insights/presidio-alone-regulated-industries',
  '/install-extension',
  '/playground',
  '/presidio-alternative',
  '/privacy',
  '/security',
  '/support/browser-extension',
  '/terms',
  '/trust-center',
  '/use-cases',
  '/use-cases/financial-services',
  '/use-cases/healthcare',
  '/use-cases/legal',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: route === '/benchmark'
      ? '2026-07-02'
      : route.startsWith('/compliance')
      ? '2026-07-17'
      : route.startsWith('/use-cases')
      ? '2026-05-12'
      : route === '/trust-center' || route === '/presidio-alternative' || route.startsWith('/insights/')
      ? '2026-05-08'
      : '2026-03-29',
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority:
      route === ''
        ? 1
        : route === '/presidio-alternative' || route === '/benchmark' || route === '/compliance'
        ? 0.85
        : 0.7,
  }))

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticRoutes, ...blogRoutes]
}
