import Link from "next/link";

export default function notFound(){
  return (
    <div className="container flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-9xl text-red-600 font-bold">404</h1>
      <h2 className="text-2xl mb-4 font-semibold">Página Não Encontrada</h2>
      <p className="text-gray-500 mb-4">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-950">
      <i className="fa-solid fa-rotate-left"></i> Retornar ao Início
      </Link>
    </div>
  );
  
}