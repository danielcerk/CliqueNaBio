'use client'

import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import Cookie from "js-cookie"
import { useState, useEffect } from "react"
import { updateUserPassword } from "@/hooks/use-auth"
import { useRouter } from 'next/navigation';
import { AlertModal } from '@/components/common/AlertModal';
import Loading from "../Account/loading";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
  const token = Cookie.get('access_token');
  const router = useRouter();

  const [user, loadingUser, errorUser] = useAxios({ 
    axiosInstance,
    method: 'get',
    url: '/api/v1/account/me/',
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"success" | "error" | "info">("success")
  const [modalMessage, setModalMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false);
  
  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setModalType(type)
    setModalMessage(message)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showAlert("error", "As senhas não coincidem.");
      return;
    }

    if (!currentPassword) {
      showAlert("error", "Por favor, insira sua senha atual.");
      return;
    }
    

    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    setIsSaving(true);
    try {
      await updateUserPassword(axiosInstance, currentPassword, newPassword);
      
      showAlert("success", "Senha alterada com sucesso!")
      router.push('/Home');
    } catch (error) {
      if (error instanceof Error) {
        showAlert("error", 'Erro ao atualizar a senha:' + error.message)
      } else {
        showAlert("error", 'Erro desconhecido')
      }
    }
  };

  if (loadingUser) {
    return <Loading />;
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
                <Input
                  className="text-gray-800"
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Nova senha</Label>
                <Input
                  className="text-gray-800"
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm">Confirmar senha</Label>
                <Input
                  className="text-gray-800"
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? "Alterando..." : "Alterar senha"}
              </Button>
            </CardFooter>

          </Card>
        </TabsContent>
        <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Tabs>
    </div>
  );
}