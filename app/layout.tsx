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

export const metadata: Metadata = {
  title: 'Eva Skin Caps — A Combinação Perfeita para sua Beleza e Saúde',
  description:
    'Eva Skin Caps com Ácido Hialurônico, Colágeno Hidrolisado e Trans-Resveratrol. 60 cápsulas de 500mg. Pele hidratada, firme e jovem de dentro para fora.',
  keywords:
    'eva skin caps, colágeno hidrolisado, ácido hialurônico, resveratrol, suplemento beleza, anti-envelhecimento',
  openGraph: {
    title: 'Eva Skin Caps — Beleza com Saúde',
    description: 'Colágeno Hidrolisado + Ácido Hialurônico + Trans-Resveratrol. A combinação perfeita.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Pré-resolve DNS + abre conexão TCP/TLS para o checkout Yampi
            antes do clique. Economiza 200-1500ms ao redirecionar. */}
        <link rel="dns-prefetch" href="https://pra-saude.pay.yampi.com.br" />
        <link rel="preconnect" href="https://pra-saude.pay.yampi.com.br" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.dooki.com.br" />
        <link rel="preconnect" href="https://api.dooki.com.br" crossOrigin="" />
      </head>
      <body className="bg-white text-gray-900 font-sans">{children}</body>
    </html>
  )
}
