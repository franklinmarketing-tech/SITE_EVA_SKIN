'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const YAMPI_BASE = 'https://pra-saude.pay.yampi.com.br/r/DH6V3EFXVZ'
const LINK_1 = `${YAMPI_BASE}?quantity=1`
const LINK_2 = `${YAMPI_BASE}?quantity=2`
const LINK_3 = `${YAMPI_BASE}?quantity=3`

const pad = (n: number) => String(n).padStart(2, '0')

function useCountdown(h = 1, m = 47, s = 22) {
  const [time, setTime] = useState({ h, m, s })
  useEffect(() => {
    const t = setInterval(() => {
      setTime(p => {
        let { h, m, s } = p
        if (--s < 0) { s = 59; if (--m < 0) { m = 59; if (--h < 0) h = 1 } }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function MagBtn({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.2}px)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <a ref={ref} href={href} onMouseMove={move} onMouseLeave={leave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}>
      {children}
    </a>
  )
}

function ProductImg({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false)
  if (err) return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <span className="text-8xl drop-shadow-2xl">💊</span>
      <span className="text-purple-300 font-bold text-sm tracking-wider">Eva Skin Caps</span>
    </div>
  )
  return (
    <Image src={src} alt={alt} fill
      className="object-contain drop-shadow-[0_0_60px_rgba(139,92,246,.6)]"
      onError={() => setErr(true)}
      sizes="(max-width:768px) 280px, 500px"
      priority
    />
  )
}

function Counter({ end, suffix = '', label = '' }: { end: number; suffix?: string; label?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let start = 0; const step = end / 80
      const t = setInterval(() => { start += step; if (start >= end) { setVal(end); clearInterval(t) } else setVal(Math.floor(start)) }, 16)
      obs.disconnect()
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl lg:text-4xl font-black text-white">{val.toLocaleString('pt-BR')}{suffix}</div>
      {label && <div className="text-gray-400 text-xs mt-1">{label}</div>}
    </div>
  )
}

function PhotoCard({ img, fallback, overlay, icon, stat, title, sub, delay = 0 }: {
  img: string; fallback: string; overlay: string; icon: string; stat: string; title: string; sub: string; delay?: number
}) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <div className={`photo-card reveal reveal-delay-${delay} relative aspect-[3/4] rounded-3xl overflow-hidden group`}>
      {!imgErr ? (
        <img src={img} alt={title} onError={() => setImgErr(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallback}`} />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      <div className="absolute inset-0 flex flex-col justify-between p-7 z-10">
        <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          {icon}
        </div>
        <div>
          <div className="inline-block bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-white/20 shadow">{stat}</div>
          <h3 className="text-white text-2xl font-black leading-tight mb-2 drop-shadow-lg">{title}</h3>
          <p className="text-white/80 text-sm leading-relaxed drop-shadow">{sub}</p>
        </div>
      </div>
      <div className="photo-overlay absolute inset-0 flex items-end justify-center pb-8 z-20">
        <span className="text-white text-sm font-bold border border-white/50 px-5 py-2.5 rounded-full backdrop-blur-md bg-white/15 shadow-lg">Ver resultado →</span>
      </div>
    </div>
  )
}

const Chk = ({ sm }: { sm?: boolean }) => (
  <span className={`inline-flex items-center justify-center rounded-full bg-purple-500 flex-shrink-0 ${sm ? 'w-4 h-4' : 'w-5 h-5'}`}>
    <svg className={`text-white ${sm ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
)

const Stars = () => (
  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}</div>
)

const kits = [
  { id: 1, qty: 1, badge: '', badgeCls: '', from: 127, price: 97, pix: 87.30, per: 97, inst: '3x de R$ 32,33', disc: '24%', days: 30, link: LINK_1, img: '/images/produto-hero.png' },
  { id: 2, qty: 2, badge: '⭐ Mais Vendido', badgeCls: 'from-purple-600 to-violet-500', from: 254, price: 177, pix: 159.30, per: 88.50, inst: '6x de R$ 29,50', disc: '30%', days: 60, link: LINK_2, img: '/images/produto-2.png' },
  { id: 3, qty: 3, badge: '🔥 Melhor Preço', badgeCls: 'from-amber-500 to-orange-500', from: 381, price: 237, pix: 213.30, per: 79.00, inst: '6x de R$ 39,50', disc: '38%', days: 90, link: LINK_3, img: '/images/produto-3.png' },
]

const ingr = [
  {
    icon: '🦴', name: 'Colágeno Hidrolisado', grad: 'from-purple-600 to-indigo-700',
    tag: 'Articulações & Estrutura',
    desc: 'Proteína estrutural que reveste e lubrifica as articulações, auxilia na redução do desconforto articular e contribui para a manutenção de cartilagens, ossos e músculos.',
    items: ['Alívio de desconforto articular', 'Apoia a manutenção das cartilagens', 'Contribui para a saúde óssea', 'Auxilia no ganho de massa muscular', 'Saúde cardiovascular', 'Suporte para articulações e ossos'],
  },
  {
    icon: '💧', name: 'Ácido Hialurônico', grad: 'from-violet-600 to-purple-700',
    tag: 'Lubrificação & Hidratação',
    desc: 'Lubrifica as articulações como um amortecedor natural e preenche células da pele, reduzindo rugas e mantendo hidratação profunda.',
    items: ['Lubrifica articulações', 'Reduz rigidez matinal', 'Rejuvenescimento da pele', 'Hidratação profunda', 'Reduz rugas e linhas finas', 'Saúde dos olhos'],
  },
  {
    icon: '🍇', name: 'Trans-Resveratrol', grad: 'from-fuchsia-600 to-purple-700',
    tag: 'Antioxidante & Proteção',
    desc: 'Potente antioxidante que auxilia na resposta inflamatória das articulações, contribui para a saúde cardiovascular e apoia a proteção contra o envelhecimento celular.',
    items: ['Auxilia no equilíbrio inflamatório', 'Combate estresse oxidativo', 'Anti-envelhecimento celular', 'Contribui para equilíbrio do colesterol', 'Apoia memória e foco', 'Proteção cardiovascular'],
  },
]

const photos = [
  { img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop', fallback: 'from-blue-950 to-purple-900', overlay: 'bg-gradient-to-t from-blue-950/95 via-blue-900/50 to-black/10', icon: '🏃‍♀️', stat: '80% das clientes relatam', title: 'Articulações Livres', sub: 'Mais liberdade de movimento com uso contínuo', delay: 1 },
  { img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop', fallback: 'from-rose-950 to-purple-900', overlay: 'bg-gradient-to-t from-rose-950/95 via-rose-900/50 to-black/10', icon: '✨', stat: '2x mais hidratação', title: 'Pele Radiante', sub: 'Hidratada, firme e luminosa', delay: 2 },
  { img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&auto=format&fit=crop', fallback: 'from-indigo-950 to-violet-900', overlay: 'bg-gradient-to-t from-indigo-950/95 via-indigo-900/50 to-black/10', icon: '🦴', stat: '+40% resistência', title: 'Ossos e Músculos', sub: 'Estrutura fortalecida por dentro', delay: 3 },
  { img: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=600&q=80&auto=format&fit=crop', fallback: 'from-emerald-950 to-teal-900', overlay: 'bg-gradient-to-t from-emerald-950/95 via-emerald-900/50 to-black/10', icon: '⏳', stat: '10 anos mais jovem', title: 'Anti-Envelhecimento', sub: 'Rugas e linhas visivelmente reduzidas', delay: 1 },
  { img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop', fallback: 'from-amber-950 to-orange-900', overlay: 'bg-gradient-to-t from-amber-950/95 via-amber-900/50 to-black/10', icon: '💅', stat: '3x mais forte', title: 'Cabelos & Unhas', sub: 'Crescimento saudável e anti-quebra', delay: 2 },
  { img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80&auto=format&fit=crop', fallback: 'from-purple-950 to-fuchsia-900', overlay: 'bg-gradient-to-t from-purple-950/95 via-purple-900/50 to-black/10', icon: '❤️', stat: 'Colesterol equilibrado', title: 'Saúde Cardiovascular', sub: 'Coração protegido pelo Resveratrol', delay: 3 },
]

const baItems = [
  { before: 'Acorda com dor', after: 'Acorda com leveza' },
  { before: 'Rigidez nas articulações', after: 'Movimento fluido' },
  { before: 'Pele ressecada e opaca', after: 'Pele hidratada e jovem' },
  { before: 'Cabelos e unhas fracos', after: 'Cabelos fortes e brilhantes' },
  { before: 'Articulações com estalos', after: 'Articulações lubrificadas' },
]

const testimonials = [
  { name: 'Maria T.', age: 58, city: 'Curitiba, PR', tag: 'articulação', text: 'Tinha tanta dor no joelho que mal conseguia descer escadas. Após 45 dias tomando Eva Skin, a melhora foi surpreendente. Hoje faço caminhada toda manhã sem sentir dor alguma. Recomendo de olhos fechados!' },
  { name: 'Sandra M.', age: 52, city: 'São Paulo, SP', tag: 'articulação', text: 'Meu reumatologista ficou impressionado com minha melhora. Tenho artrose no joelho há anos e a dor reduziu quase 80% em 3 meses. Eva Skin Caps é o único produto que realmente funcionou para mim.' },
  { name: 'Roberta C.', age: 61, city: 'Rio de Janeiro, RJ', tag: 'articulação', text: 'Acordava travada todos os dias, levava 20 minutos para conseguir sair da cama. Com Eva Skin isso acabou. Não tenho mais dor matinal e consegui voltar a praticar hidroginástica!' },
  { name: 'Ana P.', age: 49, city: 'Belo Horizonte, MG', tag: 'articulação', text: 'Artrose no quadril me limitava muito. Com 4 meses de Eva Skin estou sem dor para fazer tudo que gosto: dançar, caminhar, brincar com os netos. Qualidade de vida de volta!' },
  { name: 'Luciana F.', age: 55, city: 'Porto Alegre, RS', tag: 'beleza', text: 'Além da articulação melhorar (o que já era incrível), minha pele ficou 10 anos mais jovem. As pessoas ficam perguntando o que fiz. O segredo é Eva Skin Caps!' },
  { name: 'Carla B.', age: 47, city: 'Brasília, DF', tag: 'beleza', text: 'Em 45 dias minha dor articular reduziu muito e minha pele ficou hidratada como nunca. Meu cabelo e unhas também ficaram muito mais fortes. Produto completo e que realmente entrega o que promete!' },
]

const faqs = [
  { q: 'Quanto tempo para aliviar as dores nas articulações?', a: 'A maioria das clientes relata melhora significativa nas dores articulares entre 30 e 45 dias de uso contínuo. Para resultados completos e duradouros, recomendamos 90 dias de uso.' },
  { q: 'Quantas cápsulas tomar por dia?', a: '2 cápsulas de 500mg por dia, preferencialmente com as refeições (almoço ou jantar) para melhor absorção dos nutrientes.' },
  { q: 'Pode ser usado junto com outros medicamentos?', a: 'Em geral sim, mas recomendamos consultar seu médico, especialmente se faz uso de anticoagulantes ou medicamentos para artrite.' },
  { q: 'Pode ajudar com desconfortos em articulações, ossos e cartilagens?', a: 'O Colágeno Hidrolisado e o Ácido Hialurônico são amplamente estudados por sua contribuição para a saúde articular, auxiliando na lubrificação e na manutenção das cartilagens. Consulte seu médico para orientação específica sobre seu caso.' },
  { q: 'Tem garantia de devolução?', a: 'Garantia total de 30 dias. Se não ficar satisfeita por qualquer motivo, devolvemos 100% do dinheiro sem burocracia e sem perguntas.' },
  { q: 'Qual o prazo de entrega?', a: '5 a 15 dias úteis. Após confirmação do pagamento, enviamos em até 24 horas para todo o Brasil.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos PIX (com desconto especial), cartão de crédito em até 6x sem juros e boleto bancário.' },
]

export default function Page() {
  useReveal()
  const [kit, setKit] = useState(kits[1])
  const [faq, setFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const time = useCountdown()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes glow-pulse{0%,100%{opacity:.3}50%{opacity:.7}}
        @keyframes orbit{from{transform:rotateX(65deg) rotateZ(0deg)}to{transform:rotateX(65deg) rotateZ(360deg)}}
        @keyframes orbit-reverse{from{transform:rotateX(65deg) rotateZ(0deg)}to{transform:rotateX(65deg) rotateZ(-360deg)}}
        @keyframes orbit-tilt{from{transform:rotateX(40deg) rotateY(20deg) rotateZ(0deg)}to{transform:rotateX(40deg) rotateY(20deg) rotateZ(360deg)}}
        @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes particle-float{0%,100%{transform:translateY(0) scale(1);opacity:.6}50%{transform:translateY(-20px) scale(1.3);opacity:1}}
        @keyframes fade-up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes noise-move{0%{transform:translate(0,0)}25%{transform:translate(-2%,-1%)}50%{transform:translate(1%,2%)}75%{transform:translate(-1%,1%)}100%{transform:translate(0,0)}}
        @keyframes glow-ring-anim{0%,100%{box-shadow:0 0 40px 10px rgba(139,92,246,.2)}50%{box-shadow:0 0 80px 20px rgba(139,92,246,.5)}}

        .float{animation:float 4.5s ease-in-out infinite}
        .glow-ring-anim{animation:glow-ring-anim 2.5s ease-in-out infinite}
        .shimmer-text{background:linear-gradient(90deg,#c4b5fd 0%,#fff 40%,#c4b5fd 60%,#fff 80%,#c4b5fd);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        .shimmer-text-dark{background:linear-gradient(90deg,#7c3aed 0%,#a78bfa 40%,#7c3aed 60%,#a78bfa 80%,#7c3aed);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        .ticker-wrap{display:flex;animation:ticker 28s linear infinite}
        .hero-dots{background-image:radial-gradient(circle,rgba(139,92,246,.2) 1px,transparent 1px);background-size:30px 30px}
        .hero-noise::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:1;animation:noise-move 8s steps(2) infinite}

        .orbit-container{perspective:800px;transform-style:preserve-3d}
        .ring{position:absolute;border-radius:50%;border:1px solid rgba(139,92,246,.3);transform-style:preserve-3d}
        .ring-1{inset:-20px;animation:orbit 8s linear infinite}
        .ring-2{inset:-45px;border-color:rgba(167,139,250,.2);animation:orbit-reverse 12s linear infinite}
        .ring-3{inset:-70px;border-color:rgba(109,40,217,.15);animation:orbit-tilt 16s linear infinite}

        .card-hover{transition:all .4s cubic-bezier(.34,1.56,.64,1)}
        .card-hover:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 30px 60px -10px rgba(124,58,237,.3)}
        .photo-card{transition:all .5s ease;cursor:default}
        .photo-card:hover{transform:scale(1.04) translateY(-6px);box-shadow:0 40px 80px -20px rgba(0,0,0,.5)}
        .photo-overlay{opacity:0;transition:opacity .4s ease}
        .photo-card:hover .photo-overlay{opacity:1}
        .btn-mag{transition:transform .25s ease,box-shadow .25s ease}
        .btn-mag:hover{box-shadow:0 24px 60px rgba(124,58,237,.5);transform:translateY(-4px)}
        .btn-white-hover:hover{box-shadow:0 24px 60px rgba(255,255,255,.18);transform:translateY(-4px)}
        @keyframes pulse-ring{0%,100%{box-shadow:0 0 0 3px rgba(139,92,246,.9),0 0 0 6px rgba(139,92,246,.35),0 0 60px 8px rgba(124,58,237,.4),0 30px 70px -10px rgba(124,58,237,.5)}50%{box-shadow:0 0 0 3px rgba(167,139,250,1),0 0 0 8px rgba(139,92,246,.5),0 0 90px 16px rgba(167,139,250,.5),0 30px 70px -10px rgba(124,58,237,.6)}}
        @keyframes kcard-bg-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .kcard{transition:all .35s cubic-bezier(.34,1.56,.64,1);border:2px solid rgba(255,255,255,.07);background:rgba(255,255,255,.04)}
        .kcard:hover{border-color:rgba(139,92,246,.6)!important;box-shadow:0 0 0 1px rgba(139,92,246,.25),0 28px 56px -8px rgba(124,58,237,.28);transform:translateY(-8px) scale(1.01)}
        .kcard-on{border-color:#8b5cf6!important;background:linear-gradient(145deg,rgba(109,40,217,.18),rgba(139,92,246,.12),rgba(76,29,149,.2))!important;animation:pulse-ring 2.4s ease-in-out infinite;transform:translateY(-6px) scale(1.03)!important}
        .kcard-on:hover{transform:translateY(-10px) scale(1.04)!important}
        .kcard-img-glow-purple{background:radial-gradient(ellipse 70% 55% at 50% 60%,rgba(139,92,246,.55) 0%,rgba(109,40,217,.2) 50%,transparent 80%)}
        .kcard-img-glow-violet{background:radial-gradient(ellipse 70% 55% at 50% 60%,rgba(167,139,250,.6) 0%,rgba(139,92,246,.25) 50%,transparent 80%)}
        .kcard-img-glow-amber{background:radial-gradient(ellipse 70% 55% at 50% 60%,rgba(251,191,36,.5) 0%,rgba(245,158,11,.2) 50%,transparent 80%)}
        .kcard-check{width:26px;height:26px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 14px rgba(139,92,246,.8)}
        .buybox-shine::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 20% 0%,rgba(255,255,255,.13),transparent 60%),radial-gradient(ellipse 40% 60% at 80% 100%,rgba(167,139,250,.15),transparent 60%);pointer-events:none}
        .savings-chip{background:linear-gradient(90deg,rgba(34,197,94,.15),rgba(16,185,129,.1));border:1px solid rgba(34,197,94,.3);color:#4ade80}
        .ingr-card{transition:all .4s ease}
        .ingr-card:hover{transform:translateY(-8px) scale(1.01);box-shadow:0 25px 50px rgba(124,58,237,.2)}
        .ingr-card:hover .ingr-icon-wrap{transform:scale(1.15) rotate(-6deg)}
        .ingr-icon-wrap{transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
        .pain-item{transition:all .3s ease}
        .pain-item:hover{transform:translateX(6px) scale(1.01);background:rgba(239,68,68,.08)!important}
        .benefit-row:hover .b-icon{transform:scale(1.3) rotate(-8deg)}
        .b-icon{transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
        .faq-item{transition:border-color .2s}
        .faq-item:hover{border-color:rgba(139,92,246,.3)}
        .sticky-cta{transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
        .nav-link{position:relative;transition:color .2s}
        .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:linear-gradient(90deg,#8b5cf6,#a78bfa);transition:width .3s ease}
        .nav-link:hover::after{width:100%}

        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-delay-1{transition-delay:.1s}
        .reveal-delay-2{transition-delay:.2s}
        .reveal-delay-3{transition-delay:.3s}
        .reveal-delay-4{transition-delay:.4s}

        .particle{position:absolute;border-radius:50%;background:rgba(139,92,246,.5)}
        .p1{width:6px;height:6px;top:15%;left:10%;animation:particle-float 3s ease-in-out infinite}
        .p2{width:4px;height:4px;top:25%;right:12%;animation:particle-float 4s ease-in-out infinite .5s}
        .p3{width:8px;height:8px;bottom:30%;left:8%;animation:particle-float 3.5s ease-in-out infinite 1s}
        .p4{width:3px;height:3px;bottom:20%;right:15%;animation:particle-float 5s ease-in-out infinite .2s}
        .p5{width:5px;height:5px;top:60%;left:5%;animation:particle-float 4.5s ease-in-out infinite .7s}
        .p6{width:4px;height:4px;top:40%;right:6%;animation:particle-float 3.8s ease-in-out infinite 1.5s}

        .ba-before{background:linear-gradient(135deg,rgba(239,68,68,.12),rgba(185,28,28,.08));border:1px solid rgba(239,68,68,.2)}
        .ba-after{background:linear-gradient(135deg,rgba(34,197,94,.12),rgba(21,128,57,.08));border:1px solid rgba(34,197,94,.2)}
        .glass{background:rgba(255,255,255,.04);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08)}
        .section-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.4),transparent)}
        .fade-up-1{animation:fade-up .7s .1s ease-out both}
        .fade-up-2{animation:fade-up .7s .25s ease-out both}
        .fade-up-3{animation:fade-up .7s .4s ease-out both}
        .fade-up-4{animation:fade-up .7s .55s ease-out both}
      `}</style>

      {/* ── STICKY MOBILE CTA ── */}
      <div className={`sticky-cta fixed bottom-0 left-0 right-0 z-50 lg:hidden ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ background: 'linear-gradient(135deg,#4c1d95,#7c3aed)', borderTop: '1px solid rgba(255,255,255,.12)', boxShadow: '0 -8px 32px rgba(109,40,217,.4)' }}>
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-purple-300 text-[10px] font-semibold uppercase tracking-wider">Kit selecionado</p>
            <p className="text-white font-black text-sm leading-tight">{kit.qty} {kit.qty === 1 ? 'Frasco' : 'Frascos'} — <span className="text-green-300">R$ {kit.price},00</span></p>
          </div>
          <a href={kit.link}
            className="flex-shrink-0 bg-white text-purple-700 font-black px-5 py-3 rounded-xl text-sm shadow-xl active:scale-95 transition-transform">
            COMPRAR AGORA →
          </a>
        </div>
      </div>

      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* TOP TICKER */}
        <div className="bg-purple-950 text-purple-200 py-2 overflow-hidden text-xs font-medium">
          <div className="ticker-wrap whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex gap-10 pr-10">
                <span>🚚 Frete Grátis acima de R$200</span>
                <span>🔒 Pagamento 100% Seguro</span>
                <span>🛡️ Garantia de 30 dias</span>
                <span>⭐ 50.800 compras esse mês</span>
                <span>💳 Parcelamos em até 6x sem juros</span>
                <span>🚚 Envio em até 24 horas</span>
              </span>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-gray-950/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl shadow-lg shadow-purple-900/50 flex items-center justify-center">
                <span className="text-white font-black text-lg">E</span>
              </div>
              <div>
                <span className="font-black text-white text-xl tracking-tight">Eva</span>
                <span className="font-black text-purple-400 text-xl tracking-tight">Skin</span>
                <span className="ml-1 text-[10px] font-bold text-purple-500 tracking-[.2em] uppercase align-super">caps</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-400">
              {[['#dores', 'Dores'], ['#ingredientes', 'Ingredientes'], ['#beneficios', 'Benefícios'], ['#kits', 'Preços'], ['#depoimentos', 'Depoimentos'], ['#faq', 'FAQ']].map(([h, l]) => (
                <a key={h} href={h} className="nav-link hover:text-white transition-colors">{l}</a>
              ))}
            </nav>

            <MagBtn href={kit.link}
              className="btn-mag bg-gradient-to-r from-purple-600 to-violet-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-900/40">
              Comprar Agora →
            </MagBtn>
          </div>
        </header>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden hero-noise" style={{ background: '#08080f' }}>
          <div className="absolute inset-0 hero-dots pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(139,92,246,.25),transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(167,139,250,.15),transparent 70%)' }} />

          <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center relative z-10">

            {/* LEFT — COPY */}
            <div className="order-2 lg:order-1">
              <div className="fade-up-1 inline-flex items-center gap-2 border border-purple-700/50 bg-purple-950/60 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                ✨ Mais de 50.800 mulheres já transformaram sua qualidade de vida
              </div>

              <h1 className="fade-up-2 text-5xl lg:text-[3.8rem] font-black leading-[1.05] mb-6 text-white">
                Livre-se das dores.<br />
                <span className="shimmer-text italic">Mova-se com liberdade.</span>
              </h1>

              <p className="fade-up-3 text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Eva Skin Caps combina <strong className="text-white">3 ativos científicos</strong> que auxiliam na saúde das articulações, contribuem para o alívio de desconfortos e apóiam a renovação da pele — tudo em uma única cápsula diária.
              </p>

              {/* Price block */}
              <div className="fade-up-3 glass rounded-2xl p-5 mb-6 max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 line-through">De R$ 127,00</span>
                  <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-black px-2.5 py-1 rounded-full">24% OFF</span>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-5xl font-black text-white leading-none">R$ 97</span>
                  <span className="text-purple-400 font-bold text-xl mb-1">,00</span>
                </div>
                <p className="text-xs text-gray-500">3x de R$ 32,33 sem juros &nbsp;|&nbsp; PIX: <strong className="text-gray-200">R$ 87,30</strong></p>
              </div>

              <div className="fade-up-4 flex flex-col sm:flex-row gap-3 mb-5">
                <MagBtn href={LINK_1}
                  className="btn-mag flex-1 text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-2xl text-base font-black shadow-xl shadow-purple-900/50">
                  QUERO ALIVIAR MINHA DOR →
                </MagBtn>
                <a href="#kits"
                  className="flex-1 text-center border border-white/10 text-gray-300 px-8 py-4 rounded-2xl text-base font-bold hover:border-purple-500/50 hover:text-white transition-all">
                  Ver Kits com Desconto
                </a>
              </div>

              {/* Social proof */}
              <div className="fade-up-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['M', 'S', 'R', 'A', 'L'].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-950 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: `hsl(${270 + i * 15},70%,45%)` }}>
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                    <span className="text-gray-400 text-xs ml-1">4.9/5</span>
                  </div>
                  <p className="text-gray-400 text-xs">Junte-se a 50.800+ mulheres transformadas</p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-4 text-xs text-gray-600">
                <span>🔒 SSL Seguro</span><span>🛡️ 30 dias garantia</span><span>🚚 Envio em 24h</span>
              </div>
            </div>

            {/* RIGHT — PRODUTO */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-72 h-[420px] lg:w-[400px] lg:h-[520px] orbit-container">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full blur-3xl pointer-events-none glow-ring-anim"
                  style={{ background: 'radial-gradient(circle,rgba(139,92,246,.35),transparent 65%)' }} />

                {/* Orbit rings */}
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />

                {/* Particles */}
                <div className="particle p1" /><div className="particle p2" />
                <div className="particle p3" /><div className="particle p4" />
                <div className="particle p5" /><div className="particle p6" />

                {/* Product image */}
                <div className="relative w-full h-full float z-10">
                  <ProductImg src="/images/produto-hero.png" alt="Eva Skin Caps 1 frasco" />
                </div>

                {/* Floating badges */}
                <div className="absolute top-6 -left-6 lg:-left-10 z-20 glass rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 card-hover cursor-default">
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-base">🦴</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 leading-none">Ingrediente</p>
                    <p className="font-bold text-white text-sm leading-tight">Colágeno</p>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-6 lg:-right-10 z-20 -translate-y-1/2 glass rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 card-hover cursor-default">
                  <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-base">💧</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 leading-none">Ingrediente</p>
                    <p className="font-bold text-white text-sm leading-tight">Ác. Hialurônico</p>
                  </div>
                </div>

                <div className="absolute bottom-16 -left-6 lg:-left-10 z-20 glass rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 card-hover cursor-default">
                  <div className="w-9 h-9 bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-base">🍇</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 leading-none">Ingrediente</p>
                    <p className="font-bold text-white text-sm leading-tight">Resveratrol</p>
                  </div>
                </div>

                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xl shadow-purple-900/50 whitespace-nowrap">
                  🛡️ Garantia Incondicional 30 dias
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MARQUEE
        ══════════════════════════════════════ */}
        <section className="py-5 overflow-hidden" style={{ background: '#1e0a3c' }}>
          <div className="ticker-wrap whitespace-nowrap text-sm font-semibold text-purple-200">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex gap-10 pr-10">
                <span>✓ Alívio de dores articulares</span>
                <span className="text-purple-500">•</span>
                <span>✓ Pele hidratada e jovem</span>
                <span className="text-purple-500">•</span>
                <span>✓ Articulações lubrificadas</span>
                <span className="text-purple-500">•</span>
                <span>✓ Cabelos e unhas fortes</span>
                <span className="text-purple-500">•</span>
                <span>✓ Anti-envelhecimento</span>
                <span className="text-purple-500">•</span>
                <span>✓ Colesterol equilibrado</span>
                <span className="text-purple-500">•</span>
                <span>✓ Memória e foco</span>
                <span className="text-purple-500">•</span>
                <span>✓ Saúde cardiovascular</span>
                <span className="text-purple-500">•</span>
              </span>
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ background: '#0a0a14' }} className="py-10 px-4 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <Counter end={50800} suffix="+" label="Clientes Satisfeitas" />
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-white">4.9</div>
                <div className="flex justify-center gap-0.5 my-1">{[...Array(5)].map((_,i)=><span key={i} className="text-amber-400 text-sm">★</span>)}</div>
                <div className="text-gray-500 text-xs">Avaliação média</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-white">24h</div>
                <div className="text-gray-400 text-xs mt-1">Envio após confirmação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-white">30d</div>
                <div className="text-gray-400 text-xs mt-1">Garantia incondicional</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-5 border-t border-white/5">
              {['🔒 Pagamento Seguro SSL', '📦 Embalagem discreta', '🇧🇷 Produto brasileiro', '✅ Registrado ANVISA', '💳 6x sem juros'].map(t => (
                <span key={t} className="text-gray-600 text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ══════════════════════════════════════
            SEÇÃO DOR
        ══════════════════════════════════════ */}
        <section id="dores" className="py-24 px-4" style={{ background: '#0f0918' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 reveal">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(239,68,68,.12)', color: '#f87171', border: '1px solid rgba(239,68,68,.25)' }}>
                Isso está roubando sua qualidade de vida
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                Essas dores são{' '}
                <span className="text-red-400 italic">mais comuns do que parecem</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Milhões de mulheres sofrem caladas achando que é inevitável. <strong className="text-white">Não é — existe solução.</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {[
                { icon: '😣', text: 'Dor ao levantar da cama toda manhã' },
                { icon: '🦵', text: 'Joelhos que doem nas escadas' },
                { icon: '🌅', text: 'Rigidez matinal que dura horas' },
                { icon: '🔊', text: 'Estalos e inchaço nas articulações' },
                { icon: '🚫', text: 'Dificuldade em agachar ou ajoelhar' },
                { icon: '😔', text: 'Dores que impedem o que você ama' },
              ].map((p, i) => (
                <div key={i} className="pain-item reveal flex items-center gap-4 p-5 rounded-2xl cursor-default" style={{ background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.14)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl flex-shrink-0" style={{ background: 'rgba(239,68,68,.1)' }}>{p.icon}</div>
                  <span className="font-semibold text-gray-300">❌ &nbsp;{p.text}</span>
                </div>
              ))}
            </div>

            <div className="reveal relative rounded-3xl p-10 lg:p-14 overflow-hidden text-center" style={{ background: 'linear-gradient(135deg,#1e0a3c,#0f0a1a)', border: '1px solid rgba(139,92,246,.15)' }}>
              <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(139,92,246,.18),transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(167,139,250,.1),transparent 70%)' }} />
              <div className="relative">
                <span className="inline-block bg-green-500/15 text-green-400 border border-green-500/25 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  ✅ A ciência tem a resposta
                </span>
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Seus ossos e articulações precisam de nutrição —{' '}
                  <span className="shimmer-text italic">Eva Skin entrega</span>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  Com <strong className="text-white">3 ativos de comprovação científica</strong> na dose ideal, Eva Skin nutre, lubrifica e fortalece suas articulações de dentro para fora.
                </p>
                <MagBtn href="#ingredientes" className="btn-mag inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-900/50">
                  Ver os ingredientes →
                </MagBtn>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            INGREDIENTES
        ══════════════════════════════════════ */}
        <section id="ingredientes" className="py-24 px-4" style={{ background: '#080811' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">Fórmula Científica Premium</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
                3 Ingredientes.{' '}
                <span className="shimmer-text italic">Uma Fórmula Revolucionária.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ingr.map((ing, i) => (
                <div key={ing.name} className={`ingr-card reveal reveal-delay-${i + 1} glass rounded-3xl p-8 cursor-default`}>
                  <div className={`ingr-icon-wrap w-16 h-16 bg-gradient-to-br ${ing.grad} rounded-2xl flex items-center justify-center mb-5 shadow-lg text-3xl`}>
                    {ing.icon}
                  </div>
                  <div className="inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    {ing.tag}
                  </div>
                  <h3 className="font-black text-xl text-white mb-3">{ing.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{ing.desc}</p>
                  <ul className="space-y-2">
                    {ing.items.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                        <Chk sm /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BENEFÍCIOS — PHOTO CARDS
        ══════════════════════════════════════ */}
        <section id="beneficios" className="py-24 px-4" style={{ background: '#07070d' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">Transformação real</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
                O que Eva Skin transforma{' '}
                <span className="shimmer-text italic">na sua vida</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {photos.map((p, i) => (
                <PhotoCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA INTERMEDIÁRIO
        ══════════════════════════════════════ */}
        <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg,#3b0764 0%,#5b21b6 50%,#3b0764 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-purple-200 font-semibold mb-3 text-sm uppercase tracking-widest">Pronta para dar o primeiro passo?</p>
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
              Mais de 50.800 mulheres já recuperaram{' '}
              <span className="text-purple-200 italic">a liberdade de se mover</span>
            </h3>
            <MagBtn href="#kits"
              className="btn-white-hover inline-block bg-white text-purple-700 px-12 py-4 rounded-2xl text-lg font-black shadow-2xl">
              ESCOLHER MEU KIT COM DESCONTO →
            </MagBtn>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ANTES / DEPOIS
        ══════════════════════════════════════ */}
        <section className="py-24 px-4" style={{ background: '#08080f' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">Transformação Real</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mt-3">
                A diferença que Eva Skin{' '}
                <span className="shimmer-text italic">faz na prática</span>
              </h2>
            </div>

            <div className="relative reveal">
              {/* Center divider arrow */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full items-center justify-center shadow-2xl shadow-purple-900/60 border-4 border-gray-950">
                <span className="text-white font-black text-xl">→</span>
              </div>

              <div className="grid md:grid-cols-2 gap-1">
                {/* ANTES */}
                <div className="ba-before rounded-3xl md:rounded-r-none p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-500/25 rounded-2xl flex items-center justify-center border border-red-500/20">
                      <span className="text-red-400 font-black text-lg">✗</span>
                    </div>
                    <div>
                      <p className="text-red-400 font-black text-xl uppercase tracking-wide">Sem Eva Skin</p>
                      <p className="text-red-700 text-xs font-medium">Vida limitada pela dor</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {baItems.map((b, i) => (
                      <li key={i} className="flex items-center gap-3 py-2 border-b border-red-900/20 last:border-0">
                        <span className="w-6 h-6 bg-red-900/40 border border-red-800/30 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-red-500">✗</span>
                        <span className="font-medium text-red-300 text-sm">{b.before}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DEPOIS */}
                <div className="ba-after rounded-3xl md:rounded-l-none p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500/25 rounded-2xl flex items-center justify-center border border-green-500/20">
                      <span className="text-green-400 font-black text-lg">✓</span>
                    </div>
                    <div>
                      <p className="text-green-400 font-black text-xl uppercase tracking-wide">Com Eva Skin</p>
                      <p className="text-green-700 text-xs font-medium">Liberdade de se mover</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {baItems.map((b, i) => (
                      <li key={i} className="flex items-center gap-3 py-2 border-b border-green-900/20 last:border-0">
                        <span className="w-6 h-6 bg-green-900/40 border border-green-800/30 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-green-400">✓</span>
                        <span className="font-semibold text-green-300 text-sm">{b.after}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            COMO USAR
        ══════════════════════════════════════ */}
        <section className="py-24 px-4" style={{ background: '#1e0a3c' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <span className="text-purple-300 font-bold text-sm uppercase tracking-widest">Simples e Eficaz</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
                Como usar o Eva Skin Caps
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: '01', icon: '💊', title: 'Tome 2 cápsulas', desc: 'Dosagem diária ideal para apoiar seus resultados de forma consistente.' },
                { n: '02', icon: '🍽️', title: 'Com as refeições', desc: 'Tome junto ao almoço ou jantar para melhor absorção dos ativos.' },
                { n: '03', icon: '📅', title: 'Use por 90 dias', desc: 'O ciclo completo potencializa os resultados progressivos do tratamento.' },
              ].map((s, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} glass rounded-3xl p-8 text-center`}>
                  <div className="text-5xl mb-4">{s.icon}</div>
                  <div className="text-5xl font-black text-purple-500/30 mb-2">{s.n}</div>
                  <h3 className="font-black text-xl text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            KIT SELECTOR
        ══════════════════════════════════════ */}
        <section id="kits" className="relative py-28 px-4 overflow-hidden" style={{ background: '#07070f' }}>
          {/* Section background glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(109,40,217,.18) 0%,transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%,rgba(76,29,149,.12) 0%,transparent 70%)' }} />

          <div className="relative max-w-5xl mx-auto">

            {/* Countdown bar */}
            <div className="flex justify-center mb-12 reveal">
              <div className="flex items-center gap-3 px-7 py-3.5 rounded-2xl" style={{ background: 'rgba(127,29,29,.45)', border: '1px solid rgba(220,38,38,.3)', backdropFilter: 'blur(12px)' }}>
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-red-300 text-sm font-bold tracking-wide">Oferta expira em:</span>
                <div className="flex items-center gap-1 ml-1">
                  {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="tabular-nums font-black text-xl text-red-100 min-w-[2.6rem] text-center px-2.5 py-1 rounded-lg" style={{ background: 'rgba(185,28,28,.5)' }}>{v}</span>
                      {i < 2 && <span className="text-red-500 font-black text-lg leading-none -mt-0.5">:</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-14 reveal">
              <p className="text-purple-400 text-xs font-black uppercase tracking-[.25em] mb-4">Escolha seu tratamento</p>
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-5 leading-[1.05] tracking-tight">
                Escolha seu{' '}
                <span className="shimmer-text italic">Kit Eva Skin</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Quanto mais frascos, maior o desconto —<br className="hidden sm:block" /> e melhores e mais duradouros os resultados.
              </p>
              <p className="mt-4 text-amber-400 text-sm font-bold tracking-wide">
                ⚠️ Oferta válida enquanto durar o estoque — preços sujeitos a alteração sem aviso prévio.
              </p>
            </div>

            {/* Kit cards grid */}
            <div className="grid md:grid-cols-3 gap-5 mb-10 items-stretch">
              {kits.map(k => {
                const isOn = kit.id === k.id
                const glowCls = k.id === 1 ? 'kcard-img-glow-purple' : k.id === 2 ? 'kcard-img-glow-violet' : 'kcard-img-glow-amber'
                const savings = k.from - k.price
                return (
                  <button key={k.id} onClick={() => setKit(k)}
                    className={`kcard relative rounded-3xl text-center cursor-pointer flex flex-col ${isOn ? 'kcard-on' : ''}`}
                    style={{ padding: '0 0 28px 0' }}>

                    {/* Badge row — always occupies space to keep cards aligned */}
                    <div className="h-8 flex items-center justify-center mt-5 mb-2 px-6">
                      {k.badge && (
                        <span className={`bg-gradient-to-r ${k.badgeCls} text-white text-[11px] font-black px-5 py-1.5 rounded-full shadow-lg tracking-wide whitespace-nowrap`}
                          style={{ boxShadow: k.id === 2 ? '0 0 20px rgba(139,92,246,.6)' : '0 0 20px rgba(245,158,11,.5)' }}>
                          {k.badge}
                        </span>
                      )}
                    </div>

                    {/* Check badge */}
                    {isOn && (
                      <div className="kcard-check absolute top-4 right-4">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    {/* Image area — large */}
                    <div className="relative mx-auto w-full px-6" style={{ height: '256px' }}>
                      {/* Dramatic glow halo behind product */}
                      <div className={`absolute inset-x-6 bottom-0 top-4 rounded-2xl ${glowCls}`}
                        style={{ filter: 'blur(28px)', opacity: isOn ? 1 : 0.6, transition: 'opacity .35s ease' }} />
                      {/* Animated float on selection */}
                      <div className={`relative w-full h-full ${isOn ? 'float' : ''}`}>
                        <ProductImg src={k.img} alt={`Kit ${k.qty} frasco(s) Eva Skin Caps`} />
                      </div>
                    </div>

                    {/* Qty + days */}
                    <div className="mt-5 px-6">
                      <p className="font-black text-white text-xl tracking-tight">
                        {k.qty} {k.qty === 1 ? 'Frasco' : 'Frascos'}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5 mb-4">{k.days} dias de tratamento</p>
                    </div>

                    {/* Divider */}
                    <div className="mx-6 mb-4" style={{ height: '1px', background: 'rgba(255,255,255,.07)' }} />

                    {/* Pricing block */}
                    <div className="px-6 flex flex-col items-center gap-1">
                      {/* Discount badge */}
                      <span className="inline-block text-[11px] font-black px-3.5 py-1 rounded-full mb-1"
                        style={{ background: 'rgba(139,92,246,.2)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,.35)' }}>
                        {k.disc} OFF
                      </span>

                      {/* Crossed original price */}
                      <p className="text-gray-600 text-sm line-through">De R$ {k.from},00</p>

                      {/* Main price */}
                      <p className="text-4xl font-black text-white leading-none mt-1">R$ {k.price}<span className="text-xl font-bold">,00</span></p>

                      {/* Installments */}
                      <p className="text-gray-500 text-xs mt-1">{k.inst} sem juros</p>

                      {/* PIX price */}
                      <p className="text-green-400 text-sm font-black mt-1.5">
                        PIX: R$ {k.pix.toFixed(2).replace('.', ',')}
                      </p>

                      {/* Per bottle */}
                      <p className="text-gray-600 text-[11px]">= R$ {k.per.toFixed(2).replace('.', ',')}/frasco</p>

                      {/* Savings chip */}
                      <span className="savings-chip inline-block text-[11px] font-bold px-3 py-1 rounded-full mt-2">
                        Economia de R$ {savings},00
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ── BUY BOX ── */}
            <div className="relative rounded-3xl overflow-hidden reveal buybox-shine"
              style={{ background: 'linear-gradient(145deg,#5b21b6,#7c3aed 40%,#4c1d95 80%,#3b0764)' }}>

              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-[.04] pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

              <div className="relative px-8 py-10 lg:px-14 lg:py-12">
                {/* Top row: kit summary + kit image */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                  {/* Small kit image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle,rgba(167,139,250,.5),transparent 70%)', filter: 'blur(10px)' }} />
                    <div className="relative w-full h-full">
                      <ProductImg src={kit.img} alt={`${kit.qty} frasco(s)`} />
                    </div>
                  </div>

                  {/* Summary text */}
                  <div className="text-center sm:text-left">
                    <p className="text-purple-200 text-sm font-semibold mb-0.5">Kit selecionado</p>
                    <p className="text-white font-black text-xl leading-tight">
                      {kit.qty} {kit.qty === 1 ? 'Frasco' : 'Frascos'} — {kit.days} dias de tratamento
                    </p>
                    <p className="text-purple-300 text-sm mt-0.5">Economia de R$ {kit.from - kit.price},00 ({kit.disc} OFF)</p>
                  </div>
                </div>

                {/* Price center */}
                <div className="text-center mb-8">
                  <p className="text-purple-300 text-sm mb-1 line-through opacity-70">De R$ {kit.from},00</p>
                  <p className="text-6xl font-black text-white leading-none tracking-tight">
                    R$ {kit.price}<span className="text-3xl font-bold">,00</span>
                  </p>
                  <p className="text-purple-300 text-sm mt-2">
                    {kit.inst} sem juros &nbsp;·&nbsp;{' '}
                    <strong className="text-green-300">PIX: R$ {kit.pix.toFixed(2).replace('.', ',')}</strong>
                  </p>
                </div>

                {/* CTA button */}
                <div className="flex justify-center mb-8">
                  <MagBtn href={kit.link}
                    className="btn-white-hover inline-block bg-white text-purple-700 px-12 py-5 rounded-2xl text-xl font-black shadow-2xl tracking-tight">
                    GARANTIR MEU DESCONTO →
                  </MagBtn>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-purple-300 text-xs">
                  {[
                    { icon: '🔒', text: 'SSL Seguro' },
                    { icon: '💳', text: 'PIX · Cartão · Boleto' },
                    { icon: '🛡️', text: 'Garantia 30 dias' },
                    { icon: '🚚', text: 'Frete Grátis +R$200' },
                    { icon: '⚡', text: 'Envio em 24h' },
                  ].map(({ icon, text }) => (
                    <span key={text} className="flex items-center gap-1.5 font-semibold">
                      <span>{icon}</span>
                      <span>{text}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            DEPOIMENTOS
        ══════════════════════════════════════ */}
        <section id="depoimentos" className="py-24 px-4" style={{ background: '#fafafa' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">Histórias Reais</span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-3 leading-tight">
                O que nossas clientes{' '}
                <span className="shimmer-text-dark italic">estão dizendo</span>
              </h2>
              <p className="text-gray-500 mt-4 text-lg">Resultados reais de clientes verificadas</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-2 transition-all duration-400 cursor-default`}>
                  <div className="flex items-center justify-between mb-4">
                    <Stars />
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      t.tag === 'articulação'
                        ? 'bg-red-50 text-red-600 border-red-100'
                        : 'bg-purple-50 text-purple-600 border-purple-100'
                    }`}>
                      {t.tag === 'articulação' ? '🦴 Articulação' : '✨ Beleza'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md shadow-purple-200">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}, {t.age} anos</p>
                      <p className="text-gray-400 text-xs">{t.city}</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 border border-green-100 px-2 py-1 rounded-full">
                      <span>✓</span> Verificada
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-14 reveal">
              <MagBtn href="#kits" className="btn-mag inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-12 py-4 rounded-2xl font-black text-base shadow-lg shadow-purple-900/30">
                QUERO ESSES RESULTADOS TAMBÉM →
              </MagBtn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section id="faq" className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 reveal">
              <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">Tire suas dúvidas</span>
              <h2 className="text-4xl font-black text-gray-900 mt-3">
                Perguntas{' '}
                <span className="shimmer-text-dark italic">Frequentes</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="faq-item border border-gray-100 rounded-2xl overflow-hidden shadow-sm reveal" style={{ boxShadow: faq === i ? '0 0 0 2px rgba(139,92,246,.2)' : '' }}>
                  <button onClick={() => setFaq(faq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left gap-4 transition-colors"
                    style={{ background: faq === i ? 'rgba(139,92,246,.04)' : '' }}>
                    <div className="flex items-center gap-4">
                      <span className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0">{i + 1}</span>
                      <span className="font-bold text-gray-900">{f.q}</span>
                    </div>
                    <span className={`w-8 h-8 bg-purple-100 text-purple-500 font-black text-xl flex-shrink-0 transition-transform duration-300 rounded-full flex items-center justify-center ${faq === i ? 'rotate-45 bg-purple-600 text-white' : ''}`}>+</span>
                  </button>
                  {faq === i && (
                    <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-purple-50 pt-4 pl-[4.5rem]">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12 reveal">
              <p className="text-gray-500 text-sm mb-5">Ainda tem dúvidas? Estamos aqui para ajudar.</p>
              <MagBtn href="#kits" className="btn-mag inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-10 py-4 rounded-2xl font-black text-base shadow-lg shadow-purple-900/30">
                GARANTIR MEU EVA SKIN CAPS →
              </MagBtn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════ */}
        <section className="relative py-28 px-4 overflow-hidden hero-noise" style={{ background: '#08080f' }}>
          <div className="absolute inset-0 hero-dots pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(139,92,246,.25),transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(167,139,250,.15),transparent 70%)' }} />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="reveal inline-block text-purple-400 font-bold text-sm uppercase tracking-widest mb-5">Sua saúde não pode esperar</span>
            <h2 className="reveal text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              Volte a se mover{' '}
              <span className="shimmer-text italic">com liberdade</span>
            </h2>
            <p className="reveal text-gray-300 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Mais de 50.000 mulheres já recuperaram a liberdade de se mover — dançar, caminhar, brincar com os netos. Sua vez chegou.
            </p>

            {/* Kit mini-summary */}
            <div className="reveal inline-flex items-center gap-4 glass rounded-2xl px-6 py-4 mb-8">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image src={kit.img} alt="Eva Skin" fill className="object-contain drop-shadow-lg" sizes="56px" />
              </div>
              <div className="text-left">
                <p className="text-purple-300 text-xs font-semibold">{kit.qty} {kit.qty === 1 ? 'Frasco' : 'Frascos'} · {kit.days} dias</p>
                <p className="text-white font-black text-2xl leading-none">R$ {kit.price},<span className="text-lg">00</span></p>
                <p className="text-green-400 text-xs font-bold">PIX: R$ {kit.pix.toFixed(2).replace('.',',')} · {kit.disc} OFF</p>
              </div>
            </div>

            <div className="reveal flex flex-col gap-3 items-center mb-8">
              <MagBtn href={kit.link}
                className="btn-mag bg-gradient-to-r from-purple-600 to-violet-600 text-white px-14 py-5 rounded-2xl text-xl font-black shadow-2xl shadow-purple-900/60 w-full sm:w-auto text-center">
                GARANTIR MEU KIT AGORA →
              </MagBtn>
              <a href="#kits" className="text-gray-500 text-xs hover:text-gray-300 transition-colors underline underline-offset-2">
                Ver todos os kits e preços
              </a>
            </div>

            <div className="reveal flex flex-wrap items-center justify-center gap-5 text-gray-600 text-xs">
              {['🔒 SSL Seguro', '🚚 Envio 24h', '🛡️ 30 dias garantia', '💳 6x sem juros', '📦 Embalagem discreta'].map(t => (
                <span key={t} className="flex items-center gap-1">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="bg-black pt-16 pb-10 px-4 text-gray-600">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 bg-purple-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-black">E</span>
                  </div>
                  <span className="font-black text-white text-xl">Eva<span className="text-purple-500">Skin</span></span>
                  <span className="text-purple-600 text-[10px] font-bold tracking-[.2em] uppercase">caps</span>
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  Suplemento alimentar premium com Colágeno Hidrolisado, Ácido Hialurônico e Trans-Resveratrol — formulado para articulações saudáveis e beleza de dentro para fora.
                </p>
                <p className="text-sm text-gray-700">www.prasaude.com.br/eva-skin</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wide">Navegação</h4>
                <ul className="space-y-2.5 text-sm">
                  {[['#dores', 'Dores & Articulações'], ['#ingredientes', 'Ingredientes'], ['#beneficios', 'Benefícios'], ['#kits', 'Kits & Preços'], ['#depoimentos', 'Depoimentos'], ['#faq', 'FAQ']].map(([h, l]) => (
                    <li key={h}><a href={h} className="hover:text-purple-400 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wide">Aviso Legal</h4>
                <p className="text-sm leading-relaxed text-gray-700 mb-4">
                  Suplemento alimentar — não substitui tratamento médico. Não indicado para gestantes, lactantes e menores de 18 anos. Consulte seu médico.
                </p>
                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Pagamentos</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['💳 PIX', '💳 Cartão 6x', '💳 Boleto'].map(p => (
                    <span key={p} className="border border-gray-800 px-2.5 py-1 rounded-md">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700">
              <p>© 2026 Eva Skin Caps · PraSaúde · Todos os direitos reservados.</p>
              <p>CNPJ: 00.000.000/0001-00 · Produto registrado na ANVISA</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
