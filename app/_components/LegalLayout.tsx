import Link from 'next/link'
import type { ReactNode } from 'react'

export default function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string
  updatedAt: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-gradient-to-r from-purple-700 to-violet-600 text-white py-5">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold opacity-90 hover:opacity-100">← Voltar ao site</Link>
          <span className="text-xs uppercase tracking-widest opacity-80">Eva Skin Caps</span>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-10 legal-page">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: {updatedAt}</p>
        <div className="space-y-5 text-[15px] leading-relaxed text-gray-700">
          {children}
        </div>
      </article>

      <footer className="border-t border-gray-200 mt-10 py-6 text-center text-xs text-gray-500 px-6">
        © 2026 Eva Skin Caps · PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA · CNPJ 43.892.071/0001-59
      </footer>
    </main>
  )
}
