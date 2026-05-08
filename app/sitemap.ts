import type { MetadataRoute } from 'next'
import { siteConfig } from './site'

export const dynamic = 'force-static'

const routes = [
  '',
  '/about',
  '/compare',
  '/contact',
  '/install-extension',
  '/privacy',
  '/security',
  '/support/browser-extension',
  '/terms',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: '2026-03-29',
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
