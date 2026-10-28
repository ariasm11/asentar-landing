import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

// Open to every crawler, AI search bots included, so the site can be indexed and cited.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
