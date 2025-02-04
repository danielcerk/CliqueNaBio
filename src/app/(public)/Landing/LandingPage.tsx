
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import FAQ from "@/app/(public)/Landing/FAQ";
import ContentLanding from "@/app/(public)/Landing/ContentLanding";

const NoSSRBanner = dynamic(() => import('@/app/(public)/Landing/Banner'), { ssr: false });

import { Progress } from "@/components/ui/progress"
import ScreenPhone from "@/app/(public)/Landing/ScreenPhone";

export default function LandingPage() {

  const [progress, setProgress] = useState(0); // Inicialize com 0
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = (scrollPosition / pageHeight) * 100;

      setScrollY(scrollPosition);
      setProgress(progressValue); // Atualiza o progresso conforme a rolagem
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Apenas no início

  useEffect(() => {
    AOS.init({
      duration: 1000, // Tempo da animação
      once: true, // A animação acontece uma vez
    });
  }, []);

  return (
    <div>
      <div className="bg-[#F8F8F8] h-fit">
        <NoSSRBanner />
      </div>
      <ScreenPhone></ScreenPhone>

      <ContentLanding />
      <div className="bg-gray-900">
        <FAQ />
      </div>

      {/* Progress bar fixada sobre a página */}
      <Progress
        value={progress}
        className="w-[60%] fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50" 
      />
    </div>
  );
}
