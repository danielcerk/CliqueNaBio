import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Progress } from "@/components/ui/progress";

// Carregamento dinâmico de componentes
const NoSSRBanner = dynamic(() => import('@/app/(public)/landing/Banner'), { ssr: false });
const NoSSRScreenPhone = dynamic(() => import('@/app/(public)/landing/ScreenPhone'), { ssr: false });
const NoSSRContent = dynamic(() => import('@/app/(public)/landing/Content'), { ssr: false });
const NoSSRFAQ = dynamic(() => import('@/app/(public)/landing/FAQ'), { ssr: false });

export default function LandingPage() {
  const [progress, setProgress] = useState(0); // Inicialize com 0

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = Math.min((scrollPosition / pageHeight) * 100, 100); // Limita a 100%

      setProgress(progressValue); // Atualiza o progresso conforme a rolagem
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000, // Tempo da animação
        once: true, // A animação acontece uma vez
      });
    }
  }, []);

  return (
    <div>
      <div className="bg-[#F8F8F8] h-fit">
        <NoSSRBanner />
      </div>
      <NoSSRScreenPhone />
      <NoSSRContent />
      <div className="bg-gray-900">
        <NoSSRFAQ />
      </div>

      {/* Progress bar fixada sobre a página */}
      <Progress
        value={progress}
        className="w-[60%] fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-gray-200"
        style={{ height: "6px" }} // Ajuste a altura da barra
      />
    </div>
  );
}