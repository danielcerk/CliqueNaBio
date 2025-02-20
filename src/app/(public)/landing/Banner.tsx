// import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import BouncingBalls from "./BoucingBall";

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
    <div
    className={`transition-all duration-500 relative ${
      scrolling > 0 ? "bg-yellow-400" : "bg-gray-900"
    }`}
    style={{
      position: 'relative',
      zIndex: 0
    }}
  >
    <div
      style={{
        backgroundImage: "url('/bg-02.png')",
        backgroundRepeat: "no-repeat",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'background-image 0.5s ease-in-out, opacity 0.5s ease-in-out',
        opacity: scrolling > 0 ? 1 : 0.2,
        zIndex: -1
      }}
    />
      <div
        className={`min-h-screen h-full relative py-10 flex flex-col-reverse lg:flex-row gap-5 lg:gap-0 justify-center transition-all duration-500 ${
          scrolling > 0 ? "animate-banner" : "animate-banner-off"
        }`}
       >

        
        <BouncingBalls/>
       
        <div className="w-full">
          <div className=" max-w-2xl mx-auto px-4 h-full flex flex-col text-center justify-center items-center">
            <h1 className="text-5xl text-yellow-500 lg:text-7xl font-extrabold mb-5 uppercase" data-aos="zoom-in">
              Um Link na bio cheio de memória e experiência
            </h1>
            <p className="text-xl max-w-xl mx-auto mb-5 text-white" data-aos="zoom-in">
              Personalize, acompanhe e expanda sua presença online.
            </p>
            <br />
            <Link href="/register" className=" bg-blue-500 cursor-pointer text-white w-fit hover:text-black font-semibold text-xl px-8 py-5 rounded-xl uppercase transition-all duration-500 hover:bg-yellow-400 hover:transition-all hover:duration-500" data-aos="zoom-in">
              Comece grátis
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
