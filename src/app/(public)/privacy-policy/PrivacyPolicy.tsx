"use client"


export default function PrivacyPolicy() {  

  return (  
  <div className="dark:bg-gray-900 pt-36">
    <div className="mx-auto mb-14 max-w-6xl px-4">
      <h1 className="text-center text-3xl font-semibold mb-6">Política de Privacidade - CliqueNaBio</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Última atualização: 28 de Janeiro de 2025
      </p>

      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-xl p-6">
        {/* Introdução */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">1. Introdução</h2>
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações ao usar a plataforma CliqueNaBio. Ao utilizar nossa plataforma, você concorda com a coleta e uso de informações de acordo com esta política.
          </p>
        </section>

        {/* Informações Coletadas */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">2. Informações Coletadas</h2>
          <p>
            Coletamos as seguintes informações ao utilizar nossa plataforma:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Informações de cadastro, como nome, e-mail e senha.</li>
            <li>Dados de uso, como interações nas páginas de links e personalizações feitas.</li>
            <li>Informações de pagamento (caso utilize planos pagos) e transações financeiras.</li>
          </ul>
        </section>

        {/* Uso das Informações */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">3. Uso das Informações</h2>
          <p>As informações coletadas são utilizadas para:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Personalizar sua experiência ao criar e gerenciar sua página de links.</li>
            <li>Garantir a segurança e integridade da plataforma CliqueNaBio.</li>
            <li>Enviar comunicações importantes, como atualizações de funcionalidades ou novos recursos.</li>
            <li>Processar pagamentos e garantir a continuidade do serviço em planos pagos.</li>
          </ul>
        </section>

        {/* Compartilhamento de Informações */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">4. Compartilhamento de Informações</h2>
          <p>Não compartilhamos suas informações com terceiros, exceto:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Quando exigido por lei ou autoridade judicial.</li>
            <li>Para proteger os direitos, propriedade ou segurança da CliqueNaBio, seus usuários ou o público.</li>
            <li>Para fornecer serviços relacionados, como integrações com plataformas de pagamento.</li>
          </ul>
        </section>

        {/* Segurança dos Dados */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">5. Segurança dos Dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou destruição. No entanto, nenhum sistema é 100% seguro, e não podemos garantir a segurança absoluta. Recomendamos que você utilize senhas fortes e faça logout de sua conta quando terminar de usar a plataforma.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">6. Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência na plataforma, lembrar suas preferências, autenticar você e analisar o desempenho da plataforma. Você pode gerenciar as configurações de cookies em seu navegador.
          </p>
        </section>

        {/* Alterações na Política */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">7. Alterações na Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças na plataforma, nossos serviços ou em conformidade com requisitos legais. Você será notificado sobre quaisquer alterações relevantes por meio de uma atualização visível na plataforma CliqueNaBio.
          </p>
        </section>

        {/* Contato */}
        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">8. Contato</h2>
          <p>
            Caso tenha dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail:
            <a href="mailto:support@clicanabio.com" className="text-blue-600 hover:underline"> support@clicanabio.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>


  
  );  
}  
