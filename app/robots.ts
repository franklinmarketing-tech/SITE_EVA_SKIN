import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Bloqueia indexação de assets internos do Next
        disallow: ['/_next/', '/api/'],
      },
    ],
    sitemap: 'https://www.evaskincaps.com.br/sitemap.xml',
    host: 'https://www.evaskincaps.com.br',
  }
}
