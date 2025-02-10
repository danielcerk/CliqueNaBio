import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from "react";

export default function ContentLanding() {
  const [scrolling, setScrolling] = useState(0);
  const [componentPosition, setComponentPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Atualiza a posição inicial do componente
    if (contentRef.current) {
      const position = contentRef.current.getBoundingClientRect().top + window.scrollY;
      setComponentPosition(position);
    }
  }, []);

  // Detectar o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolling(scrollPosition);
      
      // Calcular a posição do componente ContentLanding, apenas se necessário
      if (contentRef.current) {
        const componentPosition = contentRef.current.getBoundingClientRect().top + scrollPosition;
        setComponentPosition(componentPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Este useEffect pode ser desnecessário dependendo do comportamento desejado com o AOS
  useEffect(() => {
    if (scrolling === 0) {
      AOS.refresh();
    }
  }, [scrolling]);

  return (
    <div>
      <div>
        <section 
          className={`isolate bg-yellow-400 overflow-hidden px-6 py-24 lg:px-8 rounded transition-all duration-500 ${
            scrolling > componentPosition - 300 ? "animate-content " : "animate-content-off"
          }`} ref={contentRef} >
          <div className=" inset-0 -z-10 opacity-30"></div>
          <div className="mx-auto max-w-6xl text-center">
            <h2
              className="text-5xl font-semibold text-gray-900 mb-6 uppercase"
              data-aos="fade-up" // Exemplo de animação
            >
              Conquiste Resultados!
            </h2>

            <p
              className="text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
              data-aos="fade-up" // Outra animação
            >
              Chega de ser invisível com um layout sem personalidade. É hora de dar destaque ao seu trabalho!
            </p>

            <div className=" mt-10">
              <div className="flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 items-center gap-8 mb-6">
                  <div className="flex flex-col  items-center w-fit p-6 bg-[#F8F8F8] shadow-lg rounded-xl"
                    data-aos="flip-left" // Exemplo de animação com flip
                  >
                    <div className="mb-4 text-gray-900 bg-light-yellow w-fit p-3 rounded-full">
                      <i className="fas fa-clock fa-2x"></i>
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                      Fácil de usar
                    </h4>
                    <p className="text-gray-700">
                      Crie sua página em menos de 5 minutos. A experiência é rápida e sem complicações.
                    </p>
                  </div>

                  <div
                    className="flex flex-col items-center w-fit p-6 bg-[#F8F8F8] shadow-lg rounded-xl"
                    data-aos="flip-left"
                  >
                    <div className="mb-4 text-gray-900 bg-light-yellow w-fit p-3 rounded-full">
                      <i className="fas fa-chart-bar fa-2x"></i>
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                      Análises detalhadas
                    </h4>
                    <p className="text-gray-700">
                      Saiba quais links trazem mais resultados com relatórios claros e completos.
                    </p>
                  </div>

                  <div
                    className="flex flex-col items-center w-fit p-6 bg-[#F8F8F8] shadow-lg rounded-xl"
                    data-aos="flip-left"
                  >
                    <div className="mb-4 text-gray-900 bg-light-yellow p-3 w-fit rounded-full">
                      <i className="fas fa-cogs fa-2x"></i>
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                      Designs personalizáveis
                    </h4>
                    <p className="text-gray-700">
                      Personalize sua página do seu jeito, com opções de design que refletem sua marca.
                    </p>
                  </div>

                  <div
                    className="flex flex-col items-center w-fit p-6 bg-[#F8F8F8] shadow-lg rounded-xl"
                    data-aos="flip-left"
                  >
                    <div className="mb-4 text-gray-900 bg-light-yellow p-3 w-fit rounded-full">
                      <i className="fas fa-mobile-alt fa-2x"></i>
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                      100% responsivo
                    </h4>
                    <p className="text-gray-700">
                      Funciona perfeitamente em qualquer dispositivo, garantindo uma experiência fluída para seus usuários.
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex mt-10 justify-center items-center hover:rotate-6 transition-all duration-500 cursor-pointer">
                <Image
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                  alt="Link na bio"
                  className="w-full max-w-md"
                  width={400}
                  height={250}
                  data-aos="zoom-in" // Exemplo de zoom ao rolar
                />
              </div>
            </div>
          </div>
        </section>

        <div>
          <section className="px-6 py-24 bg-gray-100 text-center" data-aos="fade-up">
            <h2 className="text-4xl font-semibold text-gray-900">Gerencie tudo no Dashboard</h2>
            <p className="text-lg text-gray-700 mt-4">Acompanhe métricas de visualizações e interações no seu dashboard.</p>
            <div className="mt-8 flex justify-center">
              <Image src="https://placehold.co/600x400.png" alt="Dashboard interativo do CliqueNaBio" width={600} height={400} />
            </div>
          </section>
          <section className="px-6 py-24 bg-white text-center" data-aos="fade-up">
            <h2 className="text-4xl font-semibold text-gray-900">Adicione Snaps e Links na Bio</h2>
            <p className="text-lg text-gray-700 mt-4">Crie um link dinâmico e interativo em poucos cliques.</p>
            <div className="mt-8 flex justify-center">
              <Image src="https://placehold.co/400x600.png" alt="Snaps e links adicionados na CliqueNaBio" width={300} height={600} />
            </div>
          </section>
          <section className="px-6 py-24 bg-gray-100 text-center" data-aos="fade-up">
            <h2 className="text-4xl font-semibold text-gray-900">Modelo de Links na Bio</h2>
            <div className="mt-8 flex justify-center">
              <Image src="https://placehold.co/800x400.png" alt="Modelos de Link Na Bios feitos com o CliqueNaBio" width={900} height={400} />
            </div>
            <div className="mt-8">
              <a href="/user/register" className="inline-block px-8 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Quero um link na bio Grátis
              </a>
            </div>
          </section>
        </div>

        <div className="relative isolate bg-[#F8F8F8] px-6 py-14 lg:px-8 rounded" id="price"> 
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 uppercase" data-aos="fade-up">
                Escolha o plano certo para você
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg font-medium text-gray-600 sm:text-xl/8" data-aos="fade-up">
                Escolha um plano acessível repleto de recursos incríveis para envolver seu público, criar lealdade dos clientes e impulsionar vendas.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3" data-aos="fade-up">
              {/* Plano Básico */}
              <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-900/10 text-center">
                <h3 className="text-base font-semibold text-yellow-600">Plano Básico</h3>
                <p className="mt-4 text-5xl font-semibold text-gray-900">R$0</p>
                <p className="text-base text-gray-500">/mês</p>
                <p className="mt-6 text-gray-600">Ideal para quem deseja experimentar e dar os primeiros passos na criação de um perfil interativo.</p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Limite de 3 links
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Limite de 10 snaps
                  </li>
                </ul>
                <a href="#" className="mt-8 block rounded-xl px-3.5 py-2.5 bg-yellow-400 text-black font-semibold ring-1 ring-inset ring-gray-900/25 hover:ring-yellow-300">Comece agora</a>
              </div>

              {/* Plano Conexão */}
              <div className="rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 text-center text-white">
                <h3 className="text-base font-semibold text-yellow-400">Plano Conexão</h3>
                <p className="mt-4 text-5xl font-semibold">R$8.99</p>
                <p className="text-base text-gray-400">/mês</p>
                <p className="mt-6 text-gray-600">Ideal para criadores de conteúdo e pequenas empresas que desejam um perfil mais dinâmico e atrativo.</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-300">
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Limite de 6 links
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Limite de 50 snaps
                  </li>
                  {/*<li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Templates para Personalização
                  </li>*/}
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Analytics
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Formulário de Contato
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Sem Marca d&apos;água CliqueNaBio
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Suporte 24/7
                  </li>
                </ul>
                <a href="#" className="mt-8 block rounded-xl px-3.5 py-2.5 bg-yellow-400 text-black font-semibold ring-1 ring-inset ring-yellow-200 hover:ring-yellow-300">Comece agora</a>
              </div>

              {/* Plano Influência */}
              <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-900/10 text-center">
                <h3 className="text-base font-semibold text-yellow-600">Plano Influência</h3>
                <p className="mt-4 text-5xl font-semibold text-gray-900">R$14.99</p>
                <p className="text-base text-gray-500">/mês</p>
                <p className="mt-6 text-gray-600">Ideal para negócios e influenciadores que querem profissionalizar sua presença digital.</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Tudo do Plano Conexão
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Sem Limite de links
                  </li>
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Sem Limite de Snaps
                  </li>
                  {/*<li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> URL personalizada
                  </li>*/}
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Acesso a recursos extras
                  </li>
                </ul>
                <a href="#" className="mt-8 block rounded-xl px-3.5 py-2.5 bg-yellow-400 text-black font-semibold ring-1 ring-inset ring-gray-900/25 hover:ring-yellow-300">Comece agora</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}