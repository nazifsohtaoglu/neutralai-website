import type { MetadataRoute } from 'next'
import { siteConfig } from './site'

export const dynamic = 'force-static'

const routes = [
  '',
  '/about',
  '/blog',
  '/blog/why-pii-masking-matters-for-enterprise-ai-adoption',
  '/compare',
  '/contact',
  '/insights/presidio-alone-regulated-industries',
  '/install-extension',
  '/playground',
  '/presidio-alternative',
  '/privacy',
  '/security',
  '/support/browser-extension',
  '/terms',
  '/trust-center',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: route.startsWith('/blog')
      ? '2026-05-09'
      : route === '/trust-center' || route === '/presidio-alternative' || route.startsWith('/insights/')
      ? '2026-05-08'
      : '2026-03-29',
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/presidio-alternative' ? 0.85 : 0.7,
  }))
}
