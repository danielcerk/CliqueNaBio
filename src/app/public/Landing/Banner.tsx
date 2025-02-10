import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Banner() {
  const [scrolling, setScrolling] = useState(0);

  // Ativar AOS e verificar se está no cliente
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // As animações ocorrem uma vez por scroll
    });
  }, []);

  // Detectar o scroll da página
  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolling === 0) {
      AOS.refresh();
    }
  }, [scrolling]);

  return (
    <div className={`transition-all duration-500 pt-20 min-h-[600px] relative ${
      scrolling > 0 ? "bg-yellow-400" : ""
    }`} >
      <div
        className={`py-10 flex flex-col-reverse lg:flex-row gap-5 lg:gap-0 justify-center transition-all duration-500 ${
          scrolling > 0 ? "animate-banner" : "animate-banner-off"
        }`}
      >
        <Image
          src={"/flat-devices-mockup-removebg-preview.png"}
          alt="Imagem de aparelhos utilizando o aplicativo da CliqueNaBio: app para criação e personalização de link na bio"
          className="w-full max-w-md rounded-xl"
          width={600}
          height={450}
          data-aos="fade-dissipate"
        />
        <div className="w-full">
          <div className="text-left max-w-2xl mx-auto px-4 h-full flex flex-col  justify-center">
            <h1 className="text-4xl text-yellow-500 lg:text-6xl font-extrabold mb-5" data-aos="zoom-in">
              Um Link na bio cheio de memória e experiência
            </h1>
            <p className="text-xl max-w-3xl mx-auto font-semibold mb-5" data-aos="zoom-in">
              Transforme sua bio em uma vitrine interativa de memórias e conquistas. Personalize, acompanhe o engajamento e expanda sua presença online.
            </p>
            <br />
            <Link href="/user/register" className=" bg-gray-900 cursor-pointer text-white w-fit hover:bg-yellow-400 hover:text-black font-semibold text-xl px-4 py-2 rounded-xl uppercase animate-pulsar transition-all duration-500" data-aos="zoom-in">
              Comece grátis <i className="fa-solid fa-right-long hidden"></i>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
