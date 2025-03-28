import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Share2 } from "lucide-react"

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



  <div className={`transition-all duration-500 max-h-[550px] relative ${
      scrolling > 0 ? "bg-yellow-400" : "bg-[#F8F8F8]"
    }`}>
      
      <div className={`flex flex-col lg:flex-row gap-5 lg:gap-0 justify-center items-center max-w-6xl mx-auto text-left transition-all duration-500 ${
        scrolling > 0 ? "animate-screen-phone" : "animate-screen-phone-off"
      }`}>

        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 uppercase relative  lg:w-1/3 mx-auto p-4">
          <div className="inline-flex  items-center rounded-lg bg-muted px-3 py-1 text-sm">
            <Share2 className="mr-1 h-4 w-4" />
            <span>Identidade Digital</span>
          </div>
          <span className="relative mt-4 inline-block">
          Deixe o link na bio a sua cara, conecte, compartilhe e analise.
          </span>
        </h2>
        <div className="lg:w-2/3 flex flex-col items-end">
          <Image
            src={"/iphones_mostrando_links_na_bio_feitos_com_cliquenabio.png"}
            alt="Identidade digital"
            className="w-full max-w-md"
            width={400}
            height={250}
            data-aos="fade-up"
            data-aos-duration="1000"
          />
          <p className="lg:w-2/3 text-center px-5 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Conecte-se com o mundo digital de forma segura e simples. Nossa plataforma permite que você compartilhe
            suas credenciais digitais quando e com quem quiser.
          </p>
        </div>
      </div>
    </div>
    

);
}
