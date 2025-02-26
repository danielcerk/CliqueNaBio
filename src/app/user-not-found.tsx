import Link from "next/link"
import { UserX } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md text-center border-none shadow-none">
        <CardHeader>
          <div className="flex justify-center">
            <div className="rounded-full bg-muted p-3">
              <UserX className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="mt-4 text-4xl text-red-600 capitalize">Usuário não encontrado.</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p className="text-gray-500 mb-4 px-2">
          O usuário que você procura não existe ou pode ter sido removido.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-950">
            <i className="fa-solid fa-rotate-left"></i> Retornar ao Início
            </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
