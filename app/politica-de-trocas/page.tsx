import type { Metadata } from 'next'
import LegalLayout from '../_components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Trocas e Devoluções — Eva Skin Caps',
  description:
    'Política de Trocas, Devoluções e Reembolso da Eva Skin Caps. Direito de arrependimento de 7 dias conforme CDC.',
  alternates: { canonical: 'https://www.evaskincaps.com.br/politica-de-trocas' },
  robots: { index: true, follow: true },
}

export default function PoliticaDeTrocas() {
  return (
    <LegalLayout title="Política de Trocas e Devoluções" updatedAt="28 de maio de 2026">
      <p>
        Esta política descreve as condições para troca, devolução e reembolso de produtos adquiridos no site <a href="https://www.evaskincaps.com.br">www.evaskincaps.com.br</a>, mantido por <strong>PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA</strong> (CNPJ 43.892.071/0001-59), em conformidade com o Código de Defesa do Consumidor (Lei nº 8.078/1990).
      </p>

      <h2>1. Direito de arrependimento (7 dias)</h2>
      <p>Por se tratar de compra realizada fora do estabelecimento comercial (internet), você tem o <strong>direito de arrependimento de 7 dias corridos</strong>, contados a partir do recebimento do produto, conforme o <strong>Art. 49 do Código de Defesa do Consumidor</strong>.</p>
      <p>Nesse prazo, você pode desistir da compra sem precisar justificar o motivo.</p>

      <h2>2. Condições para devolução</h2>
      <p>Para que a devolução seja aceita, o produto deve atender a TODAS as seguintes condições:</p>
      <ul>
        <li>Estar dentro do prazo de 7 dias corridos após o recebimento.</li>
        <li>Estar com o <strong>lacre original intacto</strong> (frasco não aberto).</li>
        <li>Estar na embalagem original, sem sinais de uso ou danos.</li>
        <li>Acompanhar todos os itens recebidos (frasco, bula, eventuais bônus).</li>
      </ul>
      <p>Produtos com lacre rompido <strong>não podem ser devolvidos</strong> por razões de higiene e segurança alimentar, salvo no caso de defeito comprovado (item 4).</p>

      <h2>3. Como solicitar a devolução</h2>
      <ol>
        <li>Envie um e-mail para <a href="mailto:prasaudeecia@gmail.com">prasaudeecia@gmail.com</a> com o assunto &ldquo;<strong>Devolução — pedido nº [seu número]</strong>&rdquo;.</li>
        <li>Informe seu nome completo, CPF, número do pedido e o motivo (opcional).</li>
        <li>Aguarde nossa resposta em até 2 dias úteis com as instruções de postagem.</li>
        <li>Postar o produto nos Correios conforme orientação recebida.</li>
      </ol>

      <h2>4. Produto com defeito ou avaria no transporte</h2>
      <p>Se o produto chegar danificado, com lacre violado pela transportadora ou com defeito de fabricação, entre em contato em até 7 dias do recebimento <strong>antes de abrir o frasco</strong>, anexando fotos do produto e da embalagem. Faremos a troca ou reembolso integral, com frete por nossa conta.</p>

      <h2>5. Frete da devolução</h2>
      <ul>
        <li><strong>Arrependimento</strong> (compra correta, mudou de ideia): o frete de devolução é por conta do cliente.</li>
        <li><strong>Defeito ou avaria</strong>: frete de devolução pago pela PraSaúde, com etiqueta enviada por e-mail.</li>
      </ul>

      <h2>6. Reembolso</h2>
      <p>Após o recebimento e a conferência do produto devolvido (até 3 dias úteis), o reembolso será processado conforme a forma de pagamento original:</p>
      <ul>
        <li><strong>PIX</strong>: estorno em até 7 dias úteis na conta de origem.</li>
        <li><strong>Cartão de crédito</strong>: estorno na fatura em até 2 ciclos do cartão (prazo definido pela operadora).</li>
        <li><strong>Boleto</strong>: ressarcimento via PIX em conta de mesma titularidade, em até 7 dias úteis.</li>
      </ul>
      <p>O valor reembolsado corresponde ao valor pago pelo produto. O frete original (se cobrado) é reembolsado em caso de defeito; em caso de arrependimento, segue a regra geral do CDC.</p>

      <h2>7. Não aceitamos devolução nos seguintes casos</h2>
      <ul>
        <li>Produto com lacre rompido, exceto comprovação de defeito.</li>
        <li>Solicitação fora do prazo de 7 dias após o recebimento.</li>
        <li>Produto com sinais de uso, manchas, marcas ou avarias causadas pelo cliente.</li>
        <li>Reclamações de &ldquo;não fez efeito&rdquo; após uso do produto — suplementos alimentares dependem de continuidade de uso (mínimo 90 dias) e variam de organismo para organismo. A eficácia individual não constitui defeito.</li>
      </ul>

      <h2>8. Contato</h2>
      <p>
        <strong>PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA</strong><br />
        CNPJ: 43.892.071/0001-59<br />
        E-mail: <a href="mailto:prasaudeecia@gmail.com">prasaudeecia@gmail.com</a>
      </p>
    </LegalLayout>
  )
}
