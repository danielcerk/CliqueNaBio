"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Image from "next/image";

type HeaderProps = {
  openModalLogin: () => void;
};

const Header = ({ openModalLogin }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const hasToken = Cookie.get("access_token");
    setIsAuthenticated(!!hasToken);
  }, []);

  return (
    <div className={`fixed w-full z-50 shadow-md transition-all duration-300 ${scrolling === 0 ? "bg-gray-950" : "bg-white"}`}>
      <nav className="">
        <div className=" mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center gap-1  transition duration-300">
              <Image src="/icons/image.ico"
              alt="Logo clique na bio"
              className={`transition-all duration-300 ${scrolling === 0 ? "w-[45px] h-[45px]" : "w-[55px] h-[55px]"}`}
              width={50}
              height={50}></Image>
                <h1 className={`font-semibold transition-all duration-300 ${scrolling === 0 ? "text-3xl text-white hover:text-yellow-200" : "text-xl text-gray-700"}`}>
                  liqueNaBio
                </h1>
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-4" >
              <Link href="/#price" className={`py-2 px-3 transition-all duration-300 ${scrolling === 0 ? "text-white" : "text-gray-700 hover:text-gray-900"}`}>
                Preços
              </Link>
              <Link href="/#FAQ" className={`py-2 px-3 transition-all duration-300 ${scrolling === 0 ? "text-white" : "text-gray-700 hover:text-gray-900"}`}>
                Sobre
              </Link>
              {isAuthenticated ? (
                <Link
                  href="/home"
                  className="py-2 px-4 font-medium bg-yellow-400 text-black rounded-xl transition-all hover:bg-yellow-300"
                >
                  Seu Painel <i className="fa-solid fa-chart-line"></i>
                </Link>
              ) : (
                <button
                  className="py-2 px-4 font-medium bg-yellow-400 text-gray-900 rounded-xl transition-all hover:bg-yellow-300"
                  onClick={openModalLogin}
                >
                  Quero criar <i className="fa-solid fa-door-open"></i>
                </button>
              )}
            </div>

            {/* Botão de menu hambúrguer */}
            <button onClick={toggleMenu} className={`md:hidden  focus:outline-none transition-all duration-300 ${scrolling === 0 ? "text-white" : "text-gray-900"}`}>
              {isMenuOpen ? (
                <i className="fa-solid fa-times text-2xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-2xl"></i>
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden absolute w-full bg-gray-200 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="flex flex-col items-center py-2">
            <Link href="/#price" className="py-3 px-3 text-gray-700 hover:text-gray-900">
              Preços
            </Link>
            <Link href="/#FAQ" className="py-3 px-3 text-gray-700 hover:text-gray-900">
              Sobre
            </Link>
            <button className="py-3 w-[90%] text-gray-700 hover:text-gray-900 bg-yellow-400" onClick={openModalLogin}>
              Acessar
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
