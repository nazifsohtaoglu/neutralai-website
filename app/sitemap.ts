import type { MetadataRoute } from 'next'
import { siteConfig } from './site'
import { getAllPosts } from './blog/posts'

export const dynamic = 'force-static'

const routes = [
  '',
  '/about',
  '/blog',
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
  '/use-cases/finance',
  '/use-cases/healthcare',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: route === '/trust-center' || route === '/presidio-alternative' || route.startsWith('/insights/')
      ? '2026-05-08'
      : '2026-03-29',
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/presidio-alternative' ? 0.85 : 0.7,
  }))

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticRoutes, ...blogRoutes]
}
