import type { Metadata } from "next";
import { LegalSidebar } from "./legal-sidebar";

export const metadata: Metadata = {
  title: "Termos & Políticas | 250K Consultoria Agrícola",
  description:
    "Política de privacidade, política de cookies, termos de uso e informações sobre LGPD da 250K Consultoria Agrícola.",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Cabeçalho */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">Termos & Políticas</h1>
        <p className="text-muted-foreground">Última atualização: junho de 2025</p>
      </div>

      <div className="flex gap-12">
        <LegalSidebar />

        {/* Conteúdo */}
        <main className="min-w-0 flex-1 space-y-20 text-sm leading-relaxed text-muted-foreground">

          {/* ─── POLÍTICA DE PRIVACIDADE ─── */}
          <section id="privacidade" className="scroll-mt-28 space-y-6">
            <h2 className="text-2xl font-bold text-primary">1. Política de Privacidade</h2>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary">1.1 Quem somos</h3>
              <p>
                A <strong className="text-primary">250K Consultoria Agrícola Ltda.</strong>, inscrita no CNPJ
                60.534.750/0001-75, com sede na R. das Leucenas, 74 — Setor Comercial, Sinop/MT, CEP
                78550-132, é a controladora dos dados pessoais coletados por meio deste site e de seus
                serviços de consultoria agronômica.
              </p>

              <h3 className="font-semibold text-primary">1.2 Dados que coletamos</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Identificação:</strong> nome completo, CPF/CNPJ, razão social da propriedade rural.</li>
                <li><strong>Contato:</strong> e-mail, telefone/WhatsApp, endereço da fazenda.</li>
                <li><strong>Dados da propriedade:</strong> área plantada, culturas (soja e milho), histórico de produtividade e informações de solo fornecidas para fins de diagnóstico agronômico.</li>
                <li><strong>Navegação:</strong> endereço IP, tipo de dispositivo, páginas visitadas, tempo de sessão e dados de desempenho coletados por ferramentas analíticas.</li>
              </ul>

              <h3 className="font-semibold text-primary">1.3 Como utilizamos os dados</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Prestação dos serviços de consultoria, diagnóstico de solo, recomendação agronômica e gestão de compras de insumos.</li>
                <li>Comunicação sobre novidades, relatórios de safra e materiais educativos da 250K Academy.</li>
                <li>Melhoria contínua dos produtos: PD-K, Field-K, Finance-K, Solo Chec-K e Certifica-K.</li>
                <li>Cumprimento de obrigações legais e regulatórias.</li>
              </ul>

              <h3 className="font-semibold text-primary">1.4 Compartilhamento</h3>
              <p>
                Seus dados não são vendidos. Podemos compartilhá-los com parceiros de pesquisa, laboratórios
                de análise de solo e fornecedores de tecnologia estritamente necessários à execução dos
                serviços, sempre sob acordos de confidencialidade compatíveis com a LGPD.
              </p>

              <h3 className="font-semibold text-primary">1.5 Retenção</h3>
              <p>
                Dados de clientes ativos são mantidos enquanto durar o contrato e pelo prazo legal aplicável
                (em geral, 5 anos após o encerramento da relação comercial). Dados de visitantes do site são
                anonimizados em até 26 meses.
              </p>

              <h3 className="font-semibold text-primary">1.6 Segurança</h3>
              <p>
                Adotamos criptografia em trânsito (TLS), controle de acesso por perfil e auditorias
                periódicas para proteger as informações contra acesso não autorizado, perda ou destruição.
              </p>

              <h3 className="font-semibold text-primary">1.7 Contato</h3>
              <p>
                Dúvidas sobre privacidade:{" "}
                <a href="mailto:marketing@250k.org" className="text-primary hover:text-brand-orange underline underline-offset-2 transition-colors">
                  marketing@250k.org
                </a>
              </p>
            </div>
          </section>

          <hr className="border-border" />

          {/* ─── POLÍTICA DE COOKIES ─── */}
          <section id="cookies" className="scroll-mt-28 space-y-6">
            <h2 className="text-2xl font-bold text-primary">2. Política de Cookies</h2>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary">2.1 O que são cookies</h3>
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um
                site. Eles nos ajudam a oferecer uma navegação mais fluida, analisar o desempenho das páginas
                e personalizar conteúdo.
              </p>

              <h3 className="font-semibold text-primary">2.2 Tipos de cookies que usamos</h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full border-collapse text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-primary">Tipo</th>
                      <th className="py-3 px-4 text-left font-semibold text-primary">Finalidade</th>
                      <th className="py-3 px-4 text-left font-semibold text-primary">Duração</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 px-4 font-medium text-primary">Essenciais</td>
                      <td className="py-3 px-4">Manutenção de sessão, autenticação e segurança. Não podem ser desativados.</td>
                      <td className="py-3 px-4 whitespace-nowrap">Sessão</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-primary">Analíticos</td>
                      <td className="py-3 px-4">Mensuração de tráfego, páginas mais acessadas e origem dos visitantes.</td>
                      <td className="py-3 px-4 whitespace-nowrap">Até 26 meses</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-primary">Funcionais</td>
                      <td className="py-3 px-4">Preferências de tema e configurações de exibição.</td>
                      <td className="py-3 px-4 whitespace-nowrap">12 meses</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-primary">Marketing</td>
                      <td className="py-3 px-4">Exibição de conteúdo relevante em plataformas parceiras.</td>
                      <td className="py-3 px-4 whitespace-nowrap">Até 90 dias</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-primary">2.3 Como gerenciar</h3>
              <p>
                Você pode desativar cookies não essenciais a qualquer momento nas configurações do seu
                navegador. Observe que a desativação de cookies funcionais pode limitar algumas
                funcionalidades do site.
              </p>
            </div>
          </section>

          <hr className="border-border" />

          {/* ─── TERMOS DE USO ─── */}
          <section id="termos" className="scroll-mt-28 space-y-6">
            <h2 className="text-2xl font-bold text-primary">3. Termos de Uso</h2>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary">3.1 Aceitação</h3>
              <p>
                Ao acessar e utilizar o site <strong className="text-primary">250k.com.br</strong> ou qualquer
                de nossos serviços digitais, você declara ter lido, compreendido e concordado com estes
                Termos de Uso.
              </p>

              <h3 className="font-semibold text-primary">3.2 Serviços</h3>
              <p>
                A 250K oferece consultoria agronômica, diagnóstico de solo, planejamento de safra,
                inteligência de compras de insumos e acesso a conteúdos educacionais por meio dos produtos
                PD-K, Field-K, Finance-K, Solo Chec-K, Certifica-K e 250K Academy.
              </p>

              <h3 className="font-semibold text-primary">3.3 Uso permitido</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Acesso pessoal e não comercial às páginas públicas do site.</li>
                <li>Preenchimento do questionário diagnóstico para fins de consulta.</li>
                <li>Download de materiais disponibilizados expressamente para isso.</li>
              </ul>

              <h3 className="font-semibold text-primary">3.4 Uso proibido</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Reproduzir, redistribuir ou comercializar conteúdos sem autorização prévia e por escrito.</li>
                <li>Utilizar técnicas de raspagem de dados (scraping), bots ou automações não autorizadas.</li>
                <li>Tentar comprometer a segurança, disponibilidade ou integridade do site.</li>
              </ul>

              <h3 className="font-semibold text-primary">3.5 Propriedade intelectual</h3>
              <p>
                Todo o conteúdo do site — textos, imagens, logotipos, metodologias, dados de pesquisa e
                software — é de titularidade exclusiva da 250K Consultoria Agrícola Ltda. ou licenciado por
                terceiros, e protegido pela Lei 9.610/98 (Lei de Direitos Autorais).
              </p>

              <h3 className="font-semibold text-primary">3.6 Limitação de responsabilidade</h3>
              <p>
                As recomendações agronômicas geradas pela 250K são baseadas em dados científicos e de campo,
                mas resultados produtivos dependem de fatores climáticos, operacionais e de gestão da
                propriedade fora do nosso controle.
              </p>

              <h3 className="font-semibold text-primary">3.7 Modificações</h3>
              <p>
                Reservamo-nos o direito de alterar estes Termos a qualquer momento. Mudanças relevantes
                serão comunicadas por e-mail ou por aviso em destaque no site com antecedência mínima de 10
                dias.
              </p>

              <h3 className="font-semibold text-primary">3.8 Foro</h3>
              <p>
                Fica eleito o foro da comarca de Sinop/MT para dirimir quaisquer controvérsias decorrentes
                destes Termos, com renúncia a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>
          </section>

          <hr className="border-border" />

          {/* ─── LGPD ─── */}
          <section id="lgpd" className="scroll-mt-28 space-y-6">
            <h2 className="text-2xl font-bold text-primary">4. LGPD</h2>

            <div className="space-y-4">
              <p>
                A 250K está comprometida com o cumprimento da{" "}
                <strong className="text-primary">Lei nº 13.709/2018 (LGPD)</strong>, que regula o tratamento
                de dados pessoais no Brasil.
              </p>

              <h3 className="font-semibold text-primary">4.1 Bases legais</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Consentimento</strong> — para envio de comunicações de marketing e uso de cookies não essenciais.</li>
                <li><strong>Execução de contrato</strong> — para prestação dos serviços de consultoria contratados.</li>
                <li><strong>Legítimo interesse</strong> — para melhoria dos serviços e segurança da plataforma.</li>
                <li><strong>Obrigação legal</strong> — para cumprimento de exigências fiscais e regulatórias.</li>
              </ul>

              <h3 className="font-semibold text-primary">4.2 Seus direitos</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Confirmar a existência de tratamento dos seus dados.</li>
                <li>Acessar os dados que temos sobre você.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                <li>Solicitar a portabilidade dos seus dados para outro fornecedor.</li>
                <li>Revogar o consentimento a qualquer momento, sem prejuízo das operações já realizadas.</li>
                <li>Solicitar informações sobre o compartilhamento dos seus dados.</li>
              </ul>

              <h3 className="font-semibold text-primary">4.3 Encarregado de Dados (DPO)</h3>
              <p>
                O Encarregado de Proteção de Dados pode ser contactado pelo e-mail{" "}
                <a href="mailto:marketing@250k.org" className="text-primary hover:text-brand-orange underline underline-offset-2 transition-colors">
                  marketing@250k.org
                </a>{" "}
                com o assunto <em>&ldquo;LGPD — Solicitação&rdquo;</em>. Responderemos em até 15 dias úteis.
              </p>

              <h3 className="font-semibold text-primary">4.4 Transferência internacional</h3>
              <p>
                Alguns serviços utilizados (como infraestrutura em nuvem e ferramentas de análise) podem
                envolver transferência de dados para servidores fora do Brasil. Nesses casos, garantimos que
                os destinos oferecem nível de proteção adequado conforme Art. 33 da LGPD.
              </p>

              <h3 className="font-semibold text-primary">4.5 Incidentes de segurança</h3>
              <p>
                Em caso de incidente que possa acarretar risco ou dano relevante, notificaremos a ANPD e os
                titulares afetados nos prazos previstos na regulamentação vigente.
              </p>

              <h3 className="font-semibold text-primary">4.6 Autoridade supervisora</h3>
              <p>
                Você tem o direito de peticionar à{" "}
                <strong className="text-primary">Autoridade Nacional de Proteção de Dados (ANPD)</strong>:{" "}
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-brand-orange underline underline-offset-2 transition-colors"
                >
                  www.gov.br/anpd
                </a>
                .
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-border text-xs text-muted-foreground">
            <p>
              250K Consultoria Agrícola Ltda. — CNPJ 60.534.750/0001-75 —{" "}
              <a href="mailto:marketing@250k.org" className="hover:text-primary transition-colors">
                marketing@250k.org
              </a>
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
