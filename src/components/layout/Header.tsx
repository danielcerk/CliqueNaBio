"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookie from "js-cookie"

type HeaderProps = {
  openModalLogin: () => void;
  openModalContact: () => void;
};


const Header = ({ openModalLogin, openModalContact }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Detectar o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY); // Atualiza a variável com o valor do scroll
    };

    window.addEventListener("scroll", handleScroll); // Adiciona o listener para o scroll

    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpa o listener ao desmontar o componente
    };
  }, []);

  useEffect(() => {
    const hasToken = Cookie.get('access_token');

    setIsAuthenticated(!!hasToken);
  }, []);

  return (
    <div className="fixed w-full z-50">
      <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* Logo e Links */}
            <div className="flex space-x-4">
              <div className='relative  rounded-full rounded-tl-md transition-all duration-300 max-h-[80px]'>

                <Link href="/" className="flex items-center py-5 px-2 text-gray-900 hover:text-gray-800 transition duration-300"
                >
                  <h1
                    className={`font-semibold text-3xl p-1 transition-all duration-300 ${
                      scrolling === 0 ? 'text-3xl' : 'text-xl'
                    }`}
                  >
                    CliqueNaBio <i className="fa-solid fa-hand-point-up"></i>
                  </h1>
                </Link>
              </div>

              {/* Links para Desktop */}
              <div className="hidden md:flex items-center space-x-1">
               <Link href="/#price" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Preços
               </Link>
               <Link href="/#FAQ" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Sobre
               </Link>
               {/* <Link href="" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Blog
               </Link> */}
               <button onClick={openModalContact} className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Contato
               </button>
               <Link href="" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Suporte
               </Link>
              </div>
            </div>

            {/* Ações (Login e Signup) */}
            <div className="hidden md:flex items-center space-x-1">
             {isAuthenticated ? (
                <Link
                  href="/Home"
                  className="py-2 px-4 btn-hover font-medium bg-light-yellow text-gray-900 rounded-xl"
                >
                  Seu Painel <i className="fa-solid fa-chart-line"></i>
                </Link>
              ) : (
                <button
                  className="py-2 px-4 btn-hover font-medium bg-light-yellow text-gray-900 rounded-xl"
                  onClick={openModalLogin}
                >
                  Entrar <i className="fa-solid fa-door-open"></i>
                </button>
              )}
            </div>

            {/* Botão de Menu Mobile */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="mobile-menu-button">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden transition-[max-height] duration-500 ease-in-out overflow-hidden`}
          style={{
            maxHeight: isMenuOpen ? "300px" : "0px",
          }}
        >
          <div className="flex justify-center items-center bg-gray-100">
            <Link href="/#price" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Preços
            </Link>
            <Link href="/#FAQ" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Sobre
            </Link>
            {/* <Link href="" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Blog
            </Link> */}
            <button onClick={openModalContact}  className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Contato
            </button>
            <Link href="" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Suporte
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header