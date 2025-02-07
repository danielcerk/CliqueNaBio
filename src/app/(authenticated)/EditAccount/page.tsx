'use client'

import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import Cookie from "js-cookie"

import Loading from "../Account/loading"
import Link from "next/link"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export default function Account() {
   // Recupera o token do localStorage
   const token = Cookie.get('access_token');

   // Fazendo a requisição de um único usuário com o token de autorização
   const [user, loadingUser, errorUser] = useAxios({ 
    axiosInstance,  // Sua instância do axios
    method: 'get',
    url: '/api/v1/account/me/',
    othersConfig: {  // Passando os cabeçalhos aqui
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
 
  if (loadingUser) {
    return(
      <Loading></Loading>
    )
  }

  if (errorUser) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
          <p className="text-red-500">Erro ao carregar os dados. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }


  return  (

    <div className="bg-gray-100 flex flex-col min-h-screen items-center p-4">

    <div className="w-[400px] mt-3 mb-5 ">
      <Link
        href="/Account"
        className="p-3 rounded-xl w-fit bg-gray-900 hover:bg-gray-900/75 transition-all duration-500 text-white flex items-center"
      >
        <i className="fa-solid fa-reply"></i>
      </Link>
    </div>

    <Tabs defaultValue="account" className="w-[400px]">
    
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="password">Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardDescription>    
                Faça alterações em sua conta aqui. Clique em salvar quando terminar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="first_name">Nome</Label>
              <Input className="text-gray-800" id="first_name" defaultValue={user?.first_name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last_name">Sobrenome</Label>
              <Input className="text-gray-800" id="last_name" defaultValue={user?.last_name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input className="text-gray-800" type="text" id="username" defaultValue={user?.name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input className="text-gray-800" type="text" id="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Telefone</Label>
              <Input className="text-gray-800" type="text" id="phone" defaultValue={user?.phone} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar alterações</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardDescription>
              Altere sua senha aqui. Depois de salvar, todos vocês serão desconectados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Senha atual</Label>
              <Input className="text-gray-800" id="current" type="password" value={user?.password}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Nova senha</Label>
              <Input className="text-gray-800" id="new" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirmar senha</Label>
              <Input className="text-gray-800" id="confirm" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar senha</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
 
    </div>
  );
}
