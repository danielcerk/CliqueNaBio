'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

import axiosInstance from '@/helper/axios-instance';
import { logout } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';

export default function SideBar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const router = useRouter();
  const pathname = usePathname() || 'Home'; 

  // Carregar o link ativo do localStorage ao montar o componente
  useEffect(() => {
    handleLinkClick(pathname)
    const savedActiveLink = localStorage.getItem("activeLink");

    console.log(pathname)
    console.log(savedActiveLink)

    if (savedActiveLink === pathname) {
      setActiveLink(savedActiveLink);
      console.log(savedActiveLink + "--" + pathname)
    }
  }, [pathname]);

  // Alternar visibilidade do menu lateral
  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  // Lidar com clique em links do menu
  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    localStorage.setItem("activeLink", href);
  };




  const handleLogout = async ()=>{
    setLoading(true);
    try {
      const response = await logout(axiosInstance);
      console.log('Logout bem-sucedido:', response);
      
      // Redirecionamento após login bem-sucedido
      router.push('/');
    } catch (error) {
      console.error('Erro no logout:', error);
      setError('Error. Tente novamente.')
    } finally {
      // Certifique-se de que o estado de carregamento seja desmarcado
      setLoading(false);
    }
  }

  return (
    <div id="body-pd" className={`absolute ${isNavbarVisible ? "body-pd" : ""}`}>
      {/* Header */}
      <header className={`header ${isNavbarVisible ? "body-pd" : ""}`} id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <i className={`bx ${isNavbarVisible ? "bx-x" : "bx-menu"}`} id="header-toggle"></i>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`l-navbar bg-gray-950 ${isNavbarVisible ? "show" : ""}`}
        id="nav-bar"
      >
        <nav className="nav">
          <div>
            <Link href="/" className="nav_logo text-yellow-400 py-10 border-b-2">
                  <i className='fa-solid fa-hand-point-up'></i>
                  <span className="nav_name font-semibold ">CliqueNaBio</span>
            </Link>
            <div className="nav_list">
              {[
                { href: "/Home", icon: "fa-solid fa-gauge", name: "Painel" },
                { href: "/View", icon: "fa-solid fa-eye", name: "Visualizar"},
                { href: "/Create", icon: "fa-solid fa-circle-plus", name: "Criar" },
                { href: "/Account", icon: "fas fa-user", name: "Perfil" },
                { href: "logout", icon: "fas fa-right-from-bracket", name: "Sair" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav_link ${activeLink === link.href ? "active" : ""}`}
                  onClick={(e) =>{
                    if(link.href === 'logout' ){
                      e.preventDefault();
                      handleLogout();
                    }else{
                      handleLinkClick(link.href)
                    }
                  
                  } }
                >
                  <i className={link.icon}></i>
                  <span className="nav_name">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
