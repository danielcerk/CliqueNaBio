"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

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
    <div className="fixed w-full z-50 bg-white shadow-md">
      <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center text-gray-900 hover:text-gray-800 transition duration-300">
                <h1 className={`font-semibold transition-all duration-300 ${scrolling === 0 ? "text-3xl" : "text-xl"}`}>
                  CliqueNaBio
                </h1>
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/#price" className="py-2 px-3 text-gray-700 hover:text-gray-900">
                Preços
              </Link>
              <Link href="/#FAQ" className="py-2 px-3 text-gray-700 hover:text-gray-900">
                Sobre
              </Link>
              {isAuthenticated ? (
                <Link
                  href="/Home"
                  className="py-2 px-4 font-medium bg-light-yellow text-gray-900 rounded-xl transition-all hover:bg-yellow-300"
                >
                  Seu Painel <i className="fa-solid fa-chart-line"></i>
                </Link>
              ) : (
                <button
                  className="py-2 px-4 font-medium bg-light-yellow text-gray-900 rounded-xl transition-all hover:bg-yellow-300"
                  onClick={openModalLogin}
                >
                  Entrar <i className="fa-solid fa-door-open"></i>
                </button>
              )}
            </div>

            {/* Botão de menu hambúrguer */}
            <button onClick={toggleMenu} className="md:hidden text-gray-900 focus:outline-none">
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
            <Link href="/#price" className="py-2 px-3 text-gray-700 hover:text-gray-900">
              Preços
            </Link>
            <Link href="/#FAQ" className="py-2 px-3 text-gray-700 hover:text-gray-900">
              Sobre
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
