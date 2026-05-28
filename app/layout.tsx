import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['700', '800', '900'],
})

const SITE_URL = 'https://www.evaskincaps.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Eva Skin Caps — Colágeno, Ácido Hialurônico e Resveratrol | Frete Grátis',
  description:
    'Eva Skin Caps reúne Colágeno Hidrolisado, Ácido Hialurônico e Trans-Resveratrol em uma única cápsula. Apoia articulações, pele, cabelos e bem-estar. 60 cápsulas. Frete grátis Brasil.',
  keywords: [
    'eva skin caps',
    'colágeno hidrolisado',
    'ácido hialurônico',
    'trans resveratrol',
    'suplemento beleza',
    'articulações',
    'pele radiante',
    'prasaude',
    'anti-envelhecimento',
    'colágeno para pele',
  ],
  authors: [{ name: 'PraSaúde' }],
  creator: 'PraSaúde',
  publisher: 'PraSaúde',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Eva Skin Caps',
    title: 'Eva Skin Caps — Beleza, Articulações & Bem-Estar',
    description:
      'A combinação perfeita: Colágeno Hidrolisado + Ácido Hialurônico + Trans-Resveratrol. 60 cápsulas. Frete grátis para todo o Brasil. Notificado ANVISA.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eva Skin Caps — Suplemento de Beleza e Bem-Estar',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eva Skin Caps — Beleza, Articulações & Bem-Estar',
    description:
      'Colágeno Hidrolisado + Ácido Hialurônico + Trans-Resveratrol. Frete grátis Brasil.',
    images: ['/og-image.png'],
  },
  category: 'Saúde e Bem-Estar',
  icons: {
    icon: '/logo-eva-favicon.png',
    apple: '/logo-eva-favicon.png',
  },
}

/* Schema.org Product — rich snippets no Google (preço, avaliação, estoque na busca) */
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Eva Skin Caps',
  description:
    'Suplemento alimentar com Colágeno Hidrolisado, Ácido Hialurônico e Trans-Resveratrol em 60 cápsulas de 500mg. Apoia articulações, pele, cabelos e bem-estar.',
  image: [
    `${SITE_URL}/images/produto-hero.webp`,
    `${SITE_URL}/images/produto-2.webp`,
    `${SITE_URL}/images/produto-3.webp`,
  ],
  brand: { '@type': 'Brand', name: 'PraSaúde' },
  manufacturer: { '@type': 'Organization', name: 'PraSaúde' },
  category: 'Suplemento Alimentar',
  sku: 'EVA-SKIN-CAPS-60',
  offers: [
    {
      '@type': 'Offer',
      url: `${SITE_URL}#kits`,
      name: 'Kit 1 frasco',
      price: '127.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2026-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'BRL' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'BR' },
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}#kits`,
      name: 'Kit 2 frascos (20% OFF)',
      price: '194.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2026-12-31',
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}#kits`,
      name: 'Kit 3 frascos (30% OFF)',
      price: '261.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2026-12-31',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '50',
    reviewCount: '50',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PraSaúde',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-eva-square.png`,
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Schema.org JSON-LD para rich snippets no Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Pré-resolve DNS + abre conexão TCP/TLS para o checkout custom (GoCache BR).
            Economiza 200-1500ms ao redirecionar. */}
        <link rel="dns-prefetch" href="https://seguro.evaskincaps.com.br" />
        <link rel="preconnect" href="https://seguro.evaskincaps.com.br" crossOrigin="" />

        {/* Preload do hero — começa o download antes do HTML parse */}
        <link rel="preload" as="image" href="/images/produto-hero.webp" fetchPriority="high" />

        {/* DNS prefetch para Unsplash (fotos dos benefícios) */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="bg-white text-gray-900 font-sans">{children}</body>
    </html>
  )
}
