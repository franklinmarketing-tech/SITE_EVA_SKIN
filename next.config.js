/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimização automática de imagens via Vercel:
  // converte para WebP/AVIF, gera responsive sizes, e cacheia no edge.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Aceita até 7 dias de cache no edge antes de revalidar
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  // Comprime HTML, CSS, JS automaticamente
  compress: true,
  // Remove headers desnecessários
  poweredByHeader: false,
  // React Strict Mode pra catch de bugs em dev
  reactStrictMode: true,
}

module.exports = nextConfig
