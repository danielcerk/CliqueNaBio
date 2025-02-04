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

        <div className="relative isolate bg-[#F8F8F8] px-6 py-14 lg:px-8 rounded" id="price">
          <div className="max-w-6xl mx-auto">
            <div className=" max-w-4xl mx-auto">
              <h2 className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 uppercase  text-center" data-aos="fade-up">
                Escolha o plano certo para você
              </h2>
            </div>
            <p className="mt-6 max-w-2xl mx-auto text-pretty text-lg font-medium text-gray-600 sm:text-xl/8  text-center" data-aos="fade-up">
              Escolha um plano acessível repleto de recursos incríveis para envolver seu público, criar lealdade dos clientes e impulsionar vendas.
            </p>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
              {/* Planos */}
              <div className="rounded-3xl rounded-t-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none" data-aos="fade-up">
                <h3 id="tier-hobby" className="text-base/7 font-semibold text-yellow-600">Plano Gratuito</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">$0</span>
                  <span className="text-base text-gray-500">/mês</span>
                </p>
                <p className="mt-6 text-base/7 text-gray-600">Comece a criar sua página com nosso plano gratuito, ideal para quem está começando a divulgar seu trabalho.</p>
                <a href="#" aria-describedby="tier-hobby" className="mt-8 block rounded-xl px-3.5 py-2.5 text-center text-sm font-semibold text-black ring-1 ring-inset ring-gray-900/25 hover:ring-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 sm:mt-10 btn-hover bg-yellow-400">Comece agora</a>
              </div>

              <div className="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10" data-aos="fade-up">
                <h3 id="tier-enterprise" className="text-base/7 font-semibold text-yellow-400">Plano Premium</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-white">$5.99</span>
                  <span className="text-base text-gray-400">/mês</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
                              <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                </svg>
                                Templates avançados
                              </li>
                              <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                </svg>
                                Análises avançadas
                              </li>
                              <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                </svg>
                                Personalização total
                              </li>
                              <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                </svg>
                                Suporte prioritário
                              </li>
                              <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                </svg>
                                URL personalizada
                              </li>
                              <li className="flex gap-x-3">
                                <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                </svg>
                                Acesso a recursos extras
                              </li>
                </ul>
                <a href="#" aria-describedby="tier-enterprise" className="mt-8 block rounded-xl px-3.5 py-2.5 text-center text-sm font-semibold text-yellow-600 ring-1 ring-inset ring-yellow-200 hover:ring-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 sm:mt-10 btn-hover hover:bg-yellow-400 hover:text-black">Comece agora</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}