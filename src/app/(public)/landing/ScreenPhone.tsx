import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

export default function ScreenPhone() {
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



  <div className={`transition-all duration-500 max-h-[450px] relative ${
      scrolling > 0 ? "bg-yellow-400" : "bg-[#F8F8F8]"
    }`}>
      {/* <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" 
        autoPlay 
        loop 
        muted
        playsInline // Melhor para dispositivos móveis
      >
        <source src="/videos/banner.mp4" type="video/mp4" />
        Seu navegador não suporta o formato de vídeo.
      </video> */}
      
      <div className={`flex flex-col lg:flex-row gap-5 lg:gap-0 justify-center items-center max-w-6xl mx-auto text-left transition-all duration-500 ${
        scrolling > 0 ? "animate-screen-phone" : "animate-screen-phone-off"
      }`}>
        <h2 className="text-5xl uppercase lg:w-1/3 mx-auto font-extrabold mb-5 p-4">
          Deixe o link na bio a sua cara, conecte, compartilhe e analise.
        </h2>
        <div className="lg:w-2/3 flex justify-center">
          <Image
            src={"/hero-app-screens-800.png"}
            alt="Link na bio de usuários feito com o CliqueNaBio"
            className="w-full max-w-md"
            width={400}
            height={250}
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
      </div>
    </div>
    

);
}
