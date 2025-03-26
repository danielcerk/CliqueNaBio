"use client"


import Link from "next/link";

export default function TermsOfUse() {


  return (
    <div className="dark:bg-gray-900 pt-36">
      <div className="mx-auto max-w-6xl my-14 px-4">
        <h1 className="text-center text-2xl font-bold mb-4">
          Termos de Uso - CliqueNaBio
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Última atualização: 03 de Março de 2025
        </p>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          {/* Introdução */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">1. Introdução</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Bem-vindo ao CliqueNaBio, o CliqueNaBio é uma plataforma onde você pode ter, gerenciar e 
              personalizar seu link na bio, nesse link na bio, você pode adicionar, editar ou excluir 
              links e snaps ( fotos de momentos, experiências, trabalhos) em forma de mosaico, e depois, 
              compartilhar para seus amigos e familiares . 
            </p>
          </section>

          {/* Uso da Plataforma */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">2. Uso da Plataforma</h2>
            <p className="text-gray-700 dark:text-gray-300">
              O CliqueNaBio permite que você crie uma página de links para destacar suas redes sociais, 
              produtos ou qualquer outra informação relevante. Ao usar a plataforma, você deve respeitar 
              as leis aplicáveis, evitando qualquer conteúdo ofensivo, discriminatório ou que infrinja 
              direitos de terceiros.
            </p>
          </section>

          {/* Conteúdo Gerado pelo Usuário */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">3. Conteúdo Gerado pelo Usuário</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Ao utilizar o CliqueNaBio, você declara que possui os direitos necessários para publicar os 
              conteúdos (links, textos, imagens, etc.) em sua página. Não é permitido publicar 
              materiais protegidos por direitos autorais sem a devida autorização.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Caso o conteúdo publicado infrinja nossas políticas, ele poderá ser removido, e sua conta 
              estará sujeita a penalidades, incluindo a suspensão ou exclusão da plataforma.
            </p>
          </section>

          {/* Moderação de Conteúdo */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">4. Moderação de Conteúdo</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Para garantir um ambiente seguro e respeitoso, o CliqueNaBio realiza a moderação de conteúdos. 
              Reservamo-nos o direito de remover conteúdos que violem estes Termos de Uso. Se identificar algo inadequado, 
              você pode denunciá-lo por esse <a className="text-blue-500 dark:text-blue-400 hover:underline" href="mailto:suporteconstsoft@gmail.com">email</a>
            </p>
          </section>

          {/* Privacidade */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">5. Privacidade</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Sua privacidade é importante para nós. Coletamos e processamos suas informações pessoais conforme descrito em nossa{" "}
              <Link className="text-blue-500 dark:text-blue-400 hover:underline" href="/privacy-policy">
                Política de Privacidade
              </Link>. Ao usar a plataforma, você concorda com o uso de seus dados conforme descrito nela.
            </p>
          </section>

          {/* Responsabilidades do Usuário */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">6. Responsabilidades do Usuário</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Você é responsável pelas informações e conteúdos que publica em sua página no CliqueNaBio. Ao utilizar a plataforma, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Não publicar conteúdo ofensivo, discriminatório ou ilegal.</li>
              <li>Respeitar os direitos autorais e de propriedade intelectual de terceiros.</li>
              <li>Seguir as Diretrizes de Comunidade do CliqueNaBio.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">7. Pagamentos e assinaturas</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Alguns recursos do CliqueNaBio podem estar disponíveis apenas 
              por meio de planos pagos ou assinaturas. Ao adquirir um plano pago, você concorda com os seguintes termos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Os valores e as condições de pagamento estão descritos na plataforma e podem ser atualizados periodicamente.</li>
              <li>Os pagamentos são processados por provedores de serviço terceirizados, sendo sua responsabilidade 
                garantir que as informações de pagamento estejam corretas.
              </li>
              <li>Assinaturas recorrentes serão cobradas automaticamente, salvo cancelamento antes da renovação.</li>
              <li>Reembolsos não serão concedidos, exceto nos casos exigidos pela lei.</li>
            </ul>
          </section>

          {/* Alterações nos Termos */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">7. Alterações nos Termos</h2>
            <p className="text-gray-700 dark:text-gray-300">
              O CliqueNaBio pode atualizar estes Termos de Uso a qualquer momento, conforme necessário para refletir mudanças na plataforma ou requisitos legais. Notificaremos você sobre quaisquer alterações significativas por meio de nossa plataforma ou pelo seu e-mail cadastrado.
            </p>
          </section>

          {/* Contato */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">8. Contato</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Caso tenha dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco pelo e-mail:{" "}
              <a className="text-blue-500 dark:text-blue-400 hover:underline" href="mailto:suporteconstsoft@gmail.com">
                suporteconstsoft@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>

  
  );
}
