import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Link2, Smartphone, ChevronRight, Star, Eye, Activity, Clock, BarChart2, Palette, Check  } from "lucide-react"
import Link from "next/link";

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
      <div className="bg-white">
        <section 
          className={`isolate bg-yellow-400 overflow-hidden px-6 py-24 lg:px-8 rounded transition-all duration-500 ${
            scrolling > componentPosition - 300 ? "animate-content " : "animate-content-off"
          }`} ref={contentRef} >
          <div className=" inset-0 -z-10 opacity-30 "></div>
          <div className="w-full bg-white py-24 rounded-xl">
            <div className="container mx-auto px-4 ">
              {/* Header */}
              <div className="text-center mb-16 relative">
                <div className="inline-block">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
                  <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 uppercase relative" data-aos="fade-up">
                    <span className="relative inline-block">
                      Conquiste
                      <div className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-400/30 -rotate-1 transform -skew-x-12"></div>
                    </span>{" "}
                    <span className="relative inline-block">
                      Resultados!
                      <div className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-400/30 rotate-1 transform skew-x-12"></div>
                    </span>
                  </h2>
                </div>

                <p className="text-xl text-gray-700 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                  Chega de ser invisível com um layout sem personalidade. É hora de dar destaque ao seu trabalho e conquistar
                  a atenção que você merece!
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
                {[
                  {
                    icon: Clock,
                    title: "Fácil de usar",
                    description: "Crie sua página em menos de 5 minutos. A experiência é rápida e sem complicações.",
                    color: "bg-amber-50",
                    iconBg: "bg-yellow-400",
                    delay: 0,
                  },
                  {
                    icon: BarChart2,
                    title: "Análises detalhadas",
                    description: "Saiba quais links trazem mais resultados com relatórios claros e completos.",
                    color: "bg-amber-50",
                    iconBg: "bg-yellow-400",
                    delay: 100,
                  },
                  {
                    icon: Palette,
                    title: "Designs personalizáveis",
                    description: "Personalize sua página do seu jeito, com opções de design que refletem sua marca.",
                    color: "bg-amber-50",
                    iconBg: "bg-yellow-400",
                    delay: 200,
                  },
                  {
                    icon: Smartphone,
                    title: "100% responsivo",
                    description:
                      "Funciona perfeitamente em qualquer dispositivo, garantindo uma experiência fluída para seus usuários.",
                    color: "bg-amber-50",
                    iconBg: "bg-yellow-400",
                    delay: 300,
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={feature.delay}
                  >
                    <div className={`absolute inset-0 ${feature.color} opacity-50`}></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>

                    <div className="relative p-8 flex flex-col h-full">
                      <div
                        className={`${feature.iconBg} text-black p-3 rounded-xl shadow-lg mb-6 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon size={28} />
                      </div>

                      <h4 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h4>

                      <p className="text-gray-700 mb-6">{feature.description}</p>

                      <div className="mt-auto">
                        <div className="flex items-center text-sm font-medium text-yellow-600 group-hover:text-yellow-700 transition-colors">
                          <span className="mr-2">Saiba mais</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image and CTA Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative mx-auto" data-aos="fade-right">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-3xl blur-xl transform -rotate-6"></div>
                  <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 p-1 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer">
                    <div className="bg-white p-2 rounded-[22px] overflow-hidden">
                      <Image
                        src="/celular_acessando_site_do_cliquenabio.png"
                        alt="Link na bio no celular"
                        width={500}
                        height={500}
                        className="w-full rounded-2xl"
                        data-aos="zoom-in"
                      />
                    </div>
                    <div className="absolute -top-6 -right-6 bg-white text-black font-bold rounded-full px-4 py-2 shadow-lg transform rotate-12">
                      Resultado garantido!
                    </div>
                  </div>
                </div>

                <div className="space-y-6" data-aos="fade-left">
                  <h3 className="text-4xl font-bold text-gray-900">
                    Por que escolher o <span className="text-yellow-500">CliqueNaBio</span>?
                  </h3>

                  <p className="text-xl text-gray-700">
                    Mais do que um simples link na bio, oferecemos uma solução completa para impulsionar sua presença digital
                    e aumentar seu engajamento.
                  </p>

                  <div className="space-y-4 mt-6">
                    {[
                      "Aumente suas conversões com links otimizados",
                      "Obtenha insights valiosos sobre seu público",
                      "Personalize completamente sua página",
                      "Integração com todas as redes sociais",
                      "Suporte técnico especializado",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-yellow-400 rounded-full p-1 mt-1">
                          <Check size={16} className="text-white" />
                        </div>
                        <p className="text-gray-800 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold px-8 py-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                      Comece agora mesmo
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <p className="text-sm text-gray-500 mt-3">Sem compromisso • Configuração em minutos • 100% Grátis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="w-full bg-gradient-to-b from-zinc-950 to-zinc-900 py-16 overflow-hidden">
          {/* Dashboard Section */}
          <section className="container mx-auto px-4 sm:px-6 py-20" data-aos="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics Avançado</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                    Gerencie tudo
                  </span>
                  <br />
                  no Dashboard
                </h2>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  Acompanhe métricas de visualizações e interações no seu dashboard personalizado em tempo real. Obtenha
                  insights valiosos sobre seu público.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/10">
                      <Eye className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span>Métricas em tempo real</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/10">
                      <Activity className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span>Análise de engajamento</span>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur p-2 rounded-3xl overflow-hidden">
                  <Image
                    src="/dashboard_cliquenabio.png"
                    alt="Dashboard interativo do CliqueNaBio"
                    width={1200}
                    height={800}
                    quality={100}
                    className="rounded-2xl w-full h-full shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-yellow-400/20"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black font-bold rounded-full px-4 py-2 shadow-lg">
                  100% Personalizável
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="container mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8"></div>
          </div>

          {/* Snaps and Links Section */}
          <section className="container mx-auto px-4 sm:px-6 py-20" data-aos="fade-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400 mb-4">
                <Link2 className="mr-2 h-4 w-4" />
                <span>Conteúdo Dinâmico</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                  Adicione Snaps e Links
                </span>
                <br />
                na Bio
              </h2>
              <p className="text-xl text-zinc-300 leading-relaxed">
                Crie um link dinâmico e interativo em poucos cliques. Personalize sua presença digital com uma interface
                intuitiva e poderosa.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur p-2 rounded-3xl overflow-hidden h-full">
                  <Image
                    src="/create.png"
                    alt="Interface de criação do CliqueNaBio - Desktop"
                    width={1200}
                    height={800}
                    quality={100}
                    className="rounded-2xl w-full h-full object-cover shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-yellow-400/20"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-yellow-400 font-medium">
                    Versão Desktop
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur p-2 rounded-3xl overflow-hidden h-full">
                  <Image
                    src="/create_mobile.png"
                    alt="Interface de criação do CliqueNaBio - Mobile"
                    width={1200}
                    height={800}
                    quality={100}
                    className="rounded-2xl w-full h-full object-cover shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-yellow-400/20"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-yellow-400 font-medium">
                    Versão Mobile
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Star,
                  title: "Personalização Total",
                  description: "Customize cores, fontes e estilos para combinar com sua marca",
                },
                {
                  icon: Eye,
                  title: "Atraia Mais Seguidores",
                  description: "Links organizados e profissionais aumentam seu engajamento",
                },
                {
                  icon: Activity,
                  title: "Atualizações em Tempo Real",
                  description: "Modifique seus links instantaneamente sem espera",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 backdrop-blur rounded-2xl p-6 border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/5"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400/10 mb-4">
                    <feature.icon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="container mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8"></div>
          </div>

          {/* Bio Link Models Section */}
          <section className="container mx-auto px-4 sm:px-6 py-20" data-aos="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur p-2 rounded-3xl overflow-hidden grid grid-cols-2 gap-2">
                  <div>
                    <Image
                      src="/neymar.png"
                      alt="Exemplo de Link na Bio - Desktop"
                      width={600}
                      height={800}
                      quality={100}
                      className="rounded-2xl w-full h-full object-cover shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-yellow-400/20"
                    />
                  </div>
                  <div>
                    <Image
                      src="/walterwhite.png"
                      alt="Exemplo de Link na Bio - Mobile"
                      width={600}
                      height={800}
                      quality={100}
                      className="rounded-2xl w-full h-full object-cover shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-yellow-400/20"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6 max-w-2xl">
                <div className="inline-flex items-center rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
                  <Smartphone className="mr-2 h-4 w-4" />
                  <span>Templates Profissionais</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                    Modelos de Links
                  </span>
                  <br />
                  na Bio
                </h2>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  Escolha entre diversos modelos profissionais para destacar seu conteúdo. Designs modernos que funcionam em
                  qualquer dispositivo.
                </p>

                <ul className="space-y-4 pt-4">
                  {[
                    "Templates responsivos para desktop e mobile",
                    "Designs modernos e profissionais",
                    "Personalização completa de cores e estilos",
                    "Otimizado para conversão e engajamento",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-zinc-300">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-3xl p-12 border border-zinc-700/50 text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent rounded-3xl"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Pronto para destacar sua presença digital?
                </h3>
                <p className="text-xl text-zinc-300 mb-8">
                  Junte-se a milhares de criadores que já estão usando o CliqueNaBio para impulsionar seu alcance online.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold px-10 py-7 rounded-full text-xl uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] group"
                >
                  <Link href="/Register" className="">
                    Crie agora<br/>
                    100% Grátis!
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <p className="text-zinc-400 mt-4">Sem cartão de crédito • Configuração em minutos • Suporte 24/7</p>
              </div>

              <div className="absolute -top-6 -right-6">
                <div className="bg-yellow-400 text-black font-bold rounded-full px-6 py-3 shadow-lg transform rotate-12">
                  100% Grátis!
                </div>
              </div>
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
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3 items-center" data-aos="fade-up">
              {/* Plano Básico */}
              <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-900/10 text-center h-fit">
                <h3 className="text-base font-semibold text-yellow-600">Plano Básico</h3>
                <p className="mt-4 text-5xl font-semibold text-gray-900">R$0</p>
                <p className="text-base text-gray-500">/mês</p>
                <p className="mt-6 text-gray-600">Ideal para quem deseja experimentar e dar os primeiros passos na criação de um perfil interativo.</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-500">
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Limite de 1 nota
                  </li>
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
                <Link href="/register" className="mt-8 block rounded-xl px-3.5 py-2.5 bg-yellow-400 text-black font-semibold ring-1 ring-inset ring-gray-900/25 hover:ring-yellow-300">Comece agora</Link>
              </div>

              {/* Plano Conexão */}
              <div className="rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 text-center text-white">
                <h3 className="text-base font-semibold text-yellow-400">Plano Conexão</h3>
                <p className="mt-4 text-5xl font-semibold">R$8.99</p>
                <p className="text-base text-gray-400">/mês</p>
                <p className="mt-6 text-gray-500">Ideal para criadores de conteúdo e pequenas empresas que desejam um perfil mais dinâmico e atrativo.</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-300">
                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Limite de 6 notas
                  </li>
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
                <Link href="/register" className="mt-8 block rounded-xl px-3.5 py-2.5 bg-yellow-400 text-black font-semibold ring-1 ring-inset ring-yellow-200 hover:ring-yellow-300">Testar por 7 dias grátis</Link>
              </div>

              {/* Plano Influência */}
              <div className="rounded-3xl bg-white p-8 ring-1 ring-gray-900/10 text-center h-fit">
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
                    </svg> Sem limite de notas
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

                  <li className="flex items-left gap-3 justify-left">
                    <svg className="h-6 w-5 flex-none text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg> Acesso a recursos extras
                  </li>
                </ul>
                <Link href="/register" className="mt-8 block rounded-xl px-3.5 py-2.5 bg-yellow-400 text-black font-semibold ring-1 ring-inset ring-gray-900/25 hover:ring-yellow-300">Testar por 7 dias grátis</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}