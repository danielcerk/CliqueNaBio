'use client'

import Link from "next/link";

interface FooterProps {
  openModal: () => void; // Define a tipagem da função recebida
}

export default function Footer({ openModal }: FooterProps){
  const currentYear = new Date().getFullYear();
  return (
<footer className="bg-gray-100 rounded-xl shadow dark:bg-gray-900 m-4">
  <div className="w-full max-w-6xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <Link
        href="/"
        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
      >
        <h1 className='font-semibold text-3xl text-gray-950 p-1'>
          CliqueNaBio <i className="fa-solid fa-hand-point-up"></i>
        </h1>

      </Link>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li>
          <Link href="/#FAQ" className="hover:underline me-4 md:me-6">
            Perguntas
          </Link>
        </li>
        <li>
          <Link href="/Terms/PrivacyPolicy" className="hover:underline me-4 md:me-6">
            Política de Privacidade
          </Link>
        </li>
        <li>
          <Link href="/Terms/TermsOfUse" className="hover:underline me-4 md:me-6">
            Termos de Uso
          </Link>
        </li>
        <li>
          <button onClick={openModal} className="hover:underline">
            Contato
          </button>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />


    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © {currentYear}{" "}
      <Link href="https://flowbite.com/" className="hover:underline">
        CliqueNaBio
      </Link>
      . Todos os direitos reservados.
    </span>

  </div>
</footer>

  );
}
