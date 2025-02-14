
'use client'

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Login from "./Login/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {


    const [isModalOpenLogin, setIsModalOpenLogin] = useState<boolean>(false);
  
  
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }, []);
  

    const openModalLogin = (): void => setIsModalOpenLogin(true);
    const closeModalLogin = (): void => setIsModalOpenLogin(false);
    return (
      <div className="flex flex-col">
        <Header openModalLogin={openModalLogin}/>
          <main className="mt-20 flex flex-col flex-1 min-h-screen">{children}</main>
        <Footer  />
        {/* Modal */}
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
