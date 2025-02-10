"use client"


import Link from "next/link";

export default function TermsOfUse() {


  return (
    <>
      <div className="container mx-auto max-w-6xl  my-14 px-4">
        <h1 className="text-center text-2xl font-bold mb-4">
          Termos de Uso - CliqueNaBio
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Última atualização: 28 de Dezembro de 2024
        </p>
    
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Introdução */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">1. Introdução</h2>
            <p>
              Bem-vindo ao CliqueNaBio, um serviço que permite criar páginas personalizadas de links para compartilhar em perfis de redes sociais. Ao utilizar a plataforma, você concorda com os termos descritos abaixo. Leia atentamente.
            </p>
          </section>
    
          {/* Uso da Plataforma */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">2. Uso da Plataforma</h2>
            <p>
              O CliqueNaBio permite que você crie uma página de links para destacar suas redes sociais, produtos ou qualquer outra informação relevante. Ao usar a plataforma, você deve respeitar as leis aplicáveis, evitando qualquer conteúdo ofensivo, discriminatório ou que infrinja direitos de terceiros.
            </p>
          </section>
    
          {/* Conteúdo Gerado pelo Usuário */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">3. Conteúdo Gerado pelo Usuário</h2>
            <p>
              Ao utilizar o CliqueNaBio, você declara que possui os direitos necessários para publicar os conteúdos (links, textos, imagens, etc.) em sua página. Não é permitido publicar materiais protegidos por direitos autorais sem a devida autorização.
            </p>
            <p>
              Caso o conteúdo publicado infrinja nossas políticas, ele poderá ser removido, e sua conta estará sujeita a penalidades, incluindo a suspensão ou exclusão da plataforma.
            </p>
          </section>
    
          {/* Moderação de Conteúdo */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">4. Moderação de Conteúdo</h2>
            <p>
              Para garantir um ambiente seguro e respeitoso, o CliqueNaBio realiza a moderação de conteúdos. Reservamo-nos o direito de remover conteúdos que violem estes Termos de Uso ou nossas Diretrizes de Comunidade.
            </p>
          </section>
    
          {/* Privacidade */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">5. Privacidade</h2>
            <p>
              Sua privacidade é importante para nós. Coletamos e processamos suas informações pessoais conforme descrito em nossa{" "}
              <a className="text-blue-500 hover:underline" href="/politica-de-privacidade">
                Política de Privacidade
              </a>. Ao usar a plataforma, você concorda com o uso de seus dados conforme descrito nela.
            </p>
          </section>
    
          {/* Responsabilidades do Usuário */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">6. Responsabilidades do Usuário</h2>
            <p>
              Você é responsável pelas informações e conteúdos que publica em sua página no CliqueNaBio. Ao utilizar a plataforma, você concorda em:
            </p>
            <ul className="list-disc pl-6">
              <li>Não publicar conteúdo ofensivo, discriminatório ou ilegal.</li>
              <li>Respeitar os direitos autorais e de propriedade intelectual de terceiros.</li>
              <li>Seguir as Diretrizes de Comunidade do CliqueNaBio.</li>
            </ul>
          </section>
    
          {/* Alterações nos Termos */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">7. Alterações nos Termos</h2>
            <p>
              O CliqueNaBio pode atualizar estes Termos de Uso a qualquer momento, conforme necessário para refletir mudanças na plataforma ou requisitos legais. Notificaremos você sobre quaisquer alterações significativas por meio de nossa plataforma ou pelo seu e-mail cadastrado.
            </p>
          </section>
    
          {/* Contato */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">8. Contato</h2>
            <p>
              Caso tenha dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco pelo e-mail:{" "}
              <Link className="text-blue-500 hover:underline" href="mailto:suporte@cliquenabio.com">
                suporte@cliquenabio.com
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  
  );
}
