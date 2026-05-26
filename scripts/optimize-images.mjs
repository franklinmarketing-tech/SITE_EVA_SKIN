import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const IMAGES_DIR = './public/images'
const PUBLIC_DIR = './public'

async function optimize(input, output, opts = {}) {
  const { width = 1200, quality = 82, format = 'webp' } = opts
  const before = (await stat(input)).size
  await sharp(input)
    .resize(width, null, { withoutEnlargement: true, fit: 'inside' })
    .toFormat(format, { quality, effort: 6 })
    .toFile(output)
  const after = (await stat(output)).size
  const pct = ((1 - after / before) * 100).toFixed(1)
  console.log(`✓ ${path.basename(input)} → ${path.basename(output)}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (-${pct}%)`)
}

console.log('🖼️  Otimizando imagens...\n')

// Produto hero (acima da dobra — qualidade MÁXIMA pra nitidez perfeita)
await optimize(`${IMAGES_DIR}/produto-hero.png`, `${IMAGES_DIR}/produto-hero.webp`, { width: 1400, quality: 98 })

// Imagens dos kits (qualidade alta)
await optimize(`${IMAGES_DIR}/produto-1.png`, `${IMAGES_DIR}/produto-1.webp`, { width: 1000, quality: 96 })
await optimize(`${IMAGES_DIR}/produto-2.png`, `${IMAGES_DIR}/produto-2.webp`, { width: 1000, quality: 96 })
await optimize(`${IMAGES_DIR}/produto-3.png`, `${IMAGES_DIR}/produto-3.webp`, { width: 1000, quality: 96 })

// Imagens do bônus PDF (não-críticas, baixa prioridade)
await optimize(`${PUBLIC_DIR}/bonus-banner-1200x630.png`, `${PUBLIC_DIR}/bonus-banner-1200x630.webp`, { width: 1200, quality: 82 })
await optimize(`${PUBLIC_DIR}/bonus-square-800x800.png`, `${PUBLIC_DIR}/bonus-square-800x800.webp`, { width: 800, quality: 82 })
await optimize(`${PUBLIC_DIR}/bonus-cover-800x1131.png`, `${PUBLIC_DIR}/bonus-cover-800x1131.webp`, { width: 800, quality: 82 })

console.log('\n✅ Otimização concluída!')
