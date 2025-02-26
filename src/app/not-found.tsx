import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function notFound(){
  return (
    <Card className="w-full flex flex-col justify-center items-center h-screen text-center">
      <CardHeader>
        <CardTitle className="text-9xl text-red-600 font-bold">404</CardTitle>
        <h2 className="text-2xl mb-4 font-semibold">Página Não Encontrada</h2>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        <p className="text-gray-500 mb-4 px-2">
          A página que você está procurando não existe ou foi movida.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-950">
        <i className="fa-solid fa-rotate-left"></i> Retornar ao Início
        </Link>
      </CardFooter>
    </Card>
  );
  
}