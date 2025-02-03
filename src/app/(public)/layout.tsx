'use client'

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/common/Contact";
import Login from "./User/Login/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const [isModalOpenContact, setIsModalOpenContact] = useState<boolean>(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState<boolean>(false);
  
  
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }, []);
  
    const openModalContact = (): void => setIsModalOpenContact(true);
    const closeModalContact = (): void => setIsModalOpenContact(false);
    const openModalLogin = (): void => setIsModalOpenLogin(true);
    const closeModalLogin = (): void => setIsModalOpenLogin(false);
    return (
      <div className="flex flex-col">
        <Header openModalContact={openModalContact} openModalLogin={openModalLogin}/>
          <main className="mt-20 flex flex-col flex-1">{children}</main>
        <Footer openModal={openModalContact} />
        {/* Modal */}
            {isModalOpenContact && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" id="contact">
                <div className="bg-white p-3 rounded-xl shadow-lg w-full max-w-md text-end" data-aos="zoom-in">
                  <i onClick={closeModalContact} className="fa-solid fa-xmark cursor-pointer text-3xl"></i>
                  <Contact />
                </div>
              </div>
            )}
    
            {isModalOpenLogin && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" id="login">
                <div className="rounded-xl bg-gray-950 shadow-lg w-full max-w-md text-end " data-aos="zoom-in">
                  <i onClick={closeModalLogin} className="fa-solid fa-xmark cursor-pointer text-3xl text-white p-3"></i>
                  <Login />
                </div>
              </div>
            )}
      </div>
  );
}
