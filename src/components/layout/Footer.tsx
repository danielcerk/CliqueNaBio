'use client'

import Link from "next/link";

export default function Footer(){
  const currentYear = new Date().getFullYear();
  return (
<footer className="bg-gray-100 rounded-xl shadow  m-4">
  <div className="w-full mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <Link
        href="/"
        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
      >
        <h1 className='font-semibold text-3xl text-gray-950 p-1'>
          CliqueNaBio
        </h1>

      </Link>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li>
          <Link href="/#FAQ" className="hover:underline me-4 md:me-6">
            Perguntas
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy" className="hover:underline me-4 md:me-6">
            Política de Privacidade
          </Link>
        </li>
        <li>
          <Link href="/terms-of-use" className="hover:underline me-4 md:me-6">
            Termos de Uso
          </Link>
        </li>
        <li>
          <Link href="/status" className="hover:underline me-4 md:me-6">
            Status
          </Link>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />


    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
      Feito com ❤️ em Feira de Santana   <p>{currentYear}</p>
    </span>

  </div>
</footer>

  );
}

