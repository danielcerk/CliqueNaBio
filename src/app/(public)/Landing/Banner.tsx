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
    <div className={`transition-all duration-500 pt-20  relative ${
      scrolling > 0 ? "bg-yellow-400" : ""
    }`}>
      <div
        className={`py-10 flex flex-col-reverse lg:flex-row gap-5 lg:gap-0 justify-center transition-all duration-500 ${
          scrolling > 0 ? "animate-banner" : "animate-banner-off"
        }`}
      >
        <Image
          src={"/garotaNoCelular.png"}
          alt="image"
          className="w-full max-w-md rounded-xl"
          width={400}
          height={250}
          data-aos="fade-dissipate"
        />
        <div className="w-full">
          <div className="text-center max-w-3xl mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl text-yellow-500 lg:text-6xl uppercase font-extrabold mb-5" data-aos="zoom-in">
              Transforme seus links em oportunidades.
            </h1>
            <p className="text-2xl uppercase max-w-3xl mx-auto font-semibold mb-5" data-aos="zoom-in">
              Crie páginas de links personalizadas, acompanhe o engajamento e aumente seus resultados.
            </p>
            <br />
            <Link href="/User/Register" className=" bg-gray-900 cursor-pointer text-white w-fit  hover:bg-yellow-400 hover:text-black font-semibold text-xl px-4 py-2 rounded-xl uppercase animate-pulsar transition-all duration-500" data-aos="zoom-in">
              Comece grátis <i className="fa-solid fa-right-long hidden"></i>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
