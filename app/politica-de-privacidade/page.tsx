import type { Metadata } from 'next'
import LegalLayout from '../_components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Privacidade - Eva Skin Caps',
  description:
    'Política de Privacidade da PraSaúde Suplementação Alimentar LTDA para o site Eva Skin Caps, em conformidade com a LGPD (Lei 13.709/2018).',
  alternates: { canonical: 'https://www.evaskincaps.com.br/politica-de-privacidade' },
  robots: { index: true, follow: true },
}

export default function PoliticaDePrivacidade() {
  return (
    <LegalLayout title="Política de Privacidade" updatedAt="28 de maio de 2026">
      <p>
        Esta Política de Privacidade descreve como a <strong>PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA</strong> (&ldquo;PraSaúde&rdquo;, &ldquo;nós&rdquo;), inscrita no CNPJ <strong>43.892.071/0001-59</strong>, coleta, usa, armazena, compartilha e protege as informações pessoais dos visitantes e clientes do site <a href="https://www.evaskincaps.com.br">www.evaskincaps.com.br</a>, em conformidade com a Lei Geral de Proteção de Dados Pessoais, a LGPD (Lei nº 13.709/2018).
      </p>

      <h2>1. Dados que coletamos</h2>
      <ul>
        <li><strong>Dados de cadastro e compra</strong> (coletados no checkout): nome completo, CPF, e-mail, telefone/WhatsApp, endereço de entrega e dados de pagamento.</li>
        <li><strong>Dados de navegação</strong>: endereço IP, tipo de navegador, dispositivo, páginas visitadas, tempo de permanência, origem do acesso (cookies e tecnologias semelhantes).</li>
      </ul>

      <h2>2. Finalidades do tratamento</h2>
      <ul>
        <li>Processar pedidos, pagamentos, emissão de nota fiscal e envio dos produtos.</li>
        <li>Comunicar sobre o status da compra (confirmação, rastreio, entrega).</li>
        <li>Enviar conteúdo informativo relacionado ao produto adquirido (incluindo o guia bônus em PDF).</li>
        <li>Atendimento ao cliente, suporte e resolução de eventuais reclamações.</li>
        <li>Cumprir obrigações legais e regulatórias (fiscal, ANVISA, defesa do consumidor).</li>
        <li>Análise estatística de uso do site para melhorar a experiência.</li>
      </ul>

      <h2>3. Compartilhamento de dados</h2>
      <p>Compartilhamos seus dados apenas com terceiros estritamente necessários à prestação do serviço:</p>
      <ul>
        <li><strong>Yampi</strong>: plataforma de checkout e processamento de pagamento.</li>
        <li><strong>Operadoras de pagamento</strong> (cartões, PIX, boleto): para processar a transação.</li>
        <li><strong>Transportadoras</strong> (Correios e empresas privadas): para entrega do produto.</li>
        <li><strong>Autoridades públicas</strong>: quando exigido por lei ou decisão judicial.</li>
      </ul>
      <p>Não vendemos nem alugamos seus dados pessoais a terceiros para fins de marketing.</p>

      <h2>4. Cookies e tecnologias de rastreamento</h2>
      <p>Utilizamos cookies para manter o carrinho, identificar sessão, medir desempenho do site e, eventualmente, para fins de marketing (anúncios direcionados em plataformas como Meta e Google). Você pode desativar cookies no seu navegador, mas algumas funcionalidades podem ficar indisponíveis.</p>

      <h2>5. Armazenamento e segurança</h2>
      <p>Os dados são armazenados em servidores seguros no Brasil e/ou no exterior, com criptografia em trânsito (HTTPS/TLS) e controle de acesso restrito. Mantemos os dados pelo prazo necessário ao cumprimento das finalidades e das obrigações legais (em geral, 5 anos para fins fiscais).</p>

      <h2>6. Seus direitos como titular</h2>
      <p>A LGPD garante a você o direito de:</p>
      <ul>
        <li>Confirmar a existência de tratamento dos seus dados.</li>
        <li>Acessar, corrigir, atualizar ou eliminar dados desnecessários.</li>
        <li>Solicitar a portabilidade dos dados.</li>
        <li>Revogar o consentimento e se opor ao tratamento.</li>
        <li>Solicitar informações sobre compartilhamento dos seus dados.</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, envie um e-mail para <a href="mailto:prasaudeecia@gmail.com">prasaudeecia@gmail.com</a> identificando-se e indicando o pedido. Responderemos no prazo legal de até 15 dias.
      </p>

      <h2>7. Crianças e adolescentes</h2>
      <p>Este site e o produto Eva Skin Caps são destinados a maiores de 18 anos. Não coletamos intencionalmente dados de menores.</p>

      <h2>8. Alterações nesta Política</h2>
      <p>Esta Política pode ser atualizada periodicamente. A versão vigente é sempre a publicada nesta página, com a data de atualização indicada no topo.</p>

      <h2>9. Contato</h2>
      <p>
        <strong>PRA SAUDE SUPLEMENTAÇÃO ALIMENTAR LTDA</strong><br />
        CNPJ: 43.892.071/0001-59<br />
        E-mail: <a href="mailto:prasaudeecia@gmail.com">prasaudeecia@gmail.com</a>
      </p>
    </LegalLayout>
  )
}
