"use client"

import LandingPage from "@/app/public/Landing/LandingPage";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Detectar a URL atual
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import IconWhatsapp from "@/components/common/IconWhatsapp";
import Login from "@/app/public/User/Login/Login";


export default function Page() {


  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  const pathname = usePathname(); // Rota atual

  // Verifica se a rota é pública ou autenticada
  const isPublicRoute = pathname === "/" || pathname.includes("(public)");
  const isAuthenticatedRoute = pathname.includes("(authenticated)");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);


  const openModalLogin = () => setIsModalOpenLogin(true);
  const closeModalLogin = () => setIsModalOpenLogin(false);

  return (

    <div className="flex flex-col">
        {/* Renderiza o Header em rotas públicas ou na raiz */}
        {isPublicRoute && (
          <Header openModalLogin={openModalLogin} />
        )}

        {/* Renderiza o SideBar somente em rotas autenticadas */}
        {isAuthenticatedRoute && <SideBar />}


        <main className="flex flex-col flex-1 mt-10">
          <LandingPage></LandingPage>
        </main>


        {/* Botão do WhatsApp */}
     
        <div className="relative">
          <IconWhatsapp />
        </div>



        {/* Modal de Login */}
        {isModalOpenLogin && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            id="login"
          >
            <div
              className="rounded-xl bg-gray-950 shadow-lg w-full max-w-md text-end"
              data-aos="zoom-in"
            >
              <i
                onClick={closeModalLogin}
                className="fa-solid fa-xmark cursor-pointer text-3xl text-white p-3"
              ></i>
              <Login />
            </div>
          </div>
        )}

        <Footer/>
      </div>

  );
}
