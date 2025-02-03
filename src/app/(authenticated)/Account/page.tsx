'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, LinkIcon, Twitter, Share } from "lucide-react"


import Link from "next/link"
import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import Cookie from "js-cookie"

import Loading from "./loading"



export default function Account() {

   // Recupera o token do localStorage
   const token = Cookie.get('access_token');


   const [user, loadingUser, errorUser] = useAxios({ 
    axiosInstance,  // Sua instância do axios
    method: 'get',
    url: `/api/v1/account`,
    othersConfig: {  // Passando os cabeçalhos aqui
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  console.log(user)
 
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


  return (

  <div className="min-h-screen bg-gray-100 flex justify-center p-4">
    <Card className="w-full max-w-xl h-fit">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
          <AvatarImage src={user?.data?.avatar ?? "/placeholder.svg?height=128&width=128"} alt="Alex Johnson" />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <CardTitle className="text-2xl sm:text-3xl">{user?.name} </CardTitle>
          <CardDescription className="text-lg">{user?.email}</CardDescription>
          <CardDescription className="text-lg">{user?.phone}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {user?.biografy}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-stretch sm:items-center justify-between">
        <Button className="flex-1 sm:flex-initial btn-hover">
          <Share className="mr-2 h-4 w-4" /> Compartilhar
        </Button>
        <Link href={'EditAccount'}>
          <Button className="flex-1 sm:flex-initial bg-light-yellow btn-hover text-gray-950 hover:bg-yellow-400 hover:text-black">
            Gerenciamento <i className="fa-solid fa-user-gear"></i>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
  );
}
