import type { Metadata } from 'next'
import Link from 'next/link'
import LegalLayout from '../_components/LegalLayout'

export const metadata: Metadata = {
  title: 'Termos de Uso — Eva Skin Caps',
  description:
    'Termos e Condições de Uso do site Eva Skin Caps, mantido por PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA.',
  alternates: { canonical: 'https://www.evaskincaps.com.br/termos-de-uso' },
  robots: { index: true, follow: true },
}

export default function TermosDeUso() {
  return (
    <LegalLayout title="Termos de Uso" updatedAt="28 de maio de 2026">
      <p>
        Estes Termos de Uso regulam o acesso e o uso do site <a href="https://www.evaskincaps.com.br">www.evaskincaps.com.br</a> e a compra do produto <strong>Eva Skin Caps</strong>, oferecido pela <strong>PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA</strong> (CNPJ 43.892.071/0001-59). Ao utilizar o site ou efetuar uma compra, você concorda integralmente com estas condições.
      </p>

      <h2>1. Sobre o produto</h2>
      <p>Eva Skin Caps é um suplemento alimentar em cápsulas, contendo Colágeno Hidrolisado, Ácido Hialurônico e Trans-Resveratrol, devidamente <strong>regularizado na ANVISA</strong> conforme legislação aplicável a suplementos alimentares.</p>
      <p>O produto <strong>não substitui</strong> uma alimentação variada e equilibrada nem dispensa orientação médica ou nutricional. Não é recomendado para gestantes, lactantes, menores de 18 anos ou pessoas com restrições específicas sem consulta a profissional de saúde.</p>

      <h2>2. Cadastro e veracidade das informações</h2>
      <p>Ao realizar uma compra, você se compromete a fornecer informações verdadeiras, precisas e atualizadas. Endereço, nome, CPF e dados de contato incorretos podem inviabilizar a entrega e isentam a PraSaúde de responsabilidade por extravio.</p>

      <h2>3. Preços e formas de pagamento</h2>
      <p>Os preços exibidos no site estão em Reais (R$) e podem ser alterados sem aviso prévio, sendo respeitado o valor vigente no momento da finalização da compra. Aceitamos: PIX, cartão de crédito (parcelado em até 6x sem juros, conforme regras do checkout) e boleto bancário.</p>
      <p>Pedidos via boleto só são confirmados após a compensação. Pedidos via PIX e cartão são confirmados em minutos. Pedidos não pagos são cancelados automaticamente.</p>

      <h2>4. Entrega e prazos</h2>
      <p>Oferecemos <strong>frete grátis para todo o Brasil</strong>. O prazo de entrega varia conforme a região, sendo informado durante o checkout. A postagem é feita em até 2 dias úteis após a confirmação do pagamento. Atrasos de transportadora estão fora do nosso controle, mas faremos o acompanhamento sempre que solicitado.</p>

      <h2>5. Trocas e devoluções</h2>
      <p>O cliente possui o direito de arrependimento previsto no Art. 49 do Código de Defesa do Consumidor: <strong>7 dias corridos</strong> a contar do recebimento do produto. As regras detalhadas estão na <Link href="/politica-de-trocas">Política de Trocas e Devoluções</Link>.</p>

      <h2>6. Propriedade intelectual</h2>
      <p>Todos os conteúdos do site — textos, imagens, logotipos, design, código, materiais bônus (incluindo o guia em PDF) — são protegidos por direitos autorais e pertencem à PraSaúde ou aos respectivos licenciantes. É proibida a reprodução, redistribuição ou uso comercial sem autorização expressa por escrito.</p>

      <h2>7. Limitação de responsabilidade</h2>
      <p>O conteúdo informativo do site e dos materiais bônus tem caráter <strong>educativo</strong> e não substitui consulta médica. A PraSaúde não se responsabiliza por uso indevido do produto, reações individuais ou interações medicamentosas que poderiam ter sido evitadas com avaliação profissional prévia.</p>
      <p>A PraSaúde adota medidas razoáveis para manter o site no ar e seguro, mas não garante disponibilidade ininterrupta nem se responsabiliza por danos indiretos decorrentes de eventual indisponibilidade.</p>

      <h2>8. Comunicação</h2>
      <p>Ao informar e-mail e telefone no checkout, você autoriza o recebimento de comunicações relacionadas ao pedido (confirmação, rastreio, entrega) e ao produto adquirido (incluindo o guia bônus em PDF). Comunicações de marketing podem ser canceladas a qualquer momento.</p>

      <h2>9. Alterações nestes Termos</h2>
      <p>Estes Termos podem ser revisados periodicamente. A versão vigente é sempre a publicada nesta página, com a data de atualização no topo. O uso continuado do site após alterações implica aceitação dos novos termos.</p>

      <h2>10. Lei aplicável e foro</h2>
      <p>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro do domicílio do consumidor para dirimir eventuais controvérsias, na forma do Código de Defesa do Consumidor.</p>

      <h2>11. Contato</h2>
      <p>
        <strong>PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA</strong><br />
        CNPJ: 43.892.071/0001-59<br />
        E-mail: <a href="mailto:prasaudeecia@gmail.com">prasaudeecia@gmail.com</a>
      </p>
    </LegalLayout>
  )
}
