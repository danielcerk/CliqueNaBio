'use client'

import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import axios, { AxiosInstance } from 'axios';
import Cookie from "js-cookie"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { AlertModal } from '@/components/common/AlertModal';
import LoadingSkeleton from "./loading-skeleton";
import Link from "next/link";
import { createLink } from "@/hooks/use-links";

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
import { Textarea } from "@/components/ui/textarea"


interface User {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  biografy?: string;
}

interface FormData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  biografy?: string;
}


export default function EditAccount() {
  const token = Cookie.get('access_token');
  const router = useRouter();

  const [user, loadingUser, errorUser] = useAxios<User | null>({
    axiosInstance,
    method: 'get',
    url: '/api/v1/account/me/',
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    password: '',
    biografy: user?.biografy || '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | "info">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        first_name: user.first_name ,
        last_name: user.last_name ,
        email: user.email ,
        password: '',
        biografy: user.biografy ,
      });
    }

  }, [user]);

  const handleDelete = async () => {
    try {
      if (!token) {
        showAlert('error', 'Token não encontrado.');
        return;
      }
      
      await axiosInstance.delete("/api/v1/account/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Remover todos os cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        Cookie.remove(name.trim());
      });
  
      router.push("/");
      showAlert('success', 'Conta excluída com sucesso.');
    } catch (error) {
      showAlert('error', 'Erro ao excluir a conta');
    }
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showAlert("error", "O nome e o e-mail não podem estar em branco.");
      return;
    }
    const data = {
      name: formData.name,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      biografy: formData.biografy || '',
    };
  
    try {
      if (user) {
        await axiosInstance.put("/api/v1/account/me/", data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        showAlert("success", "Dados atualizados com sucesso.");
      }
    } catch (error) {
      showAlert("error", "Erro ao atualizar os dados.");
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserPassword(axiosInstance, newPassword);
      showAlert("success", "Senha alterada com sucesso!");
      router.push("/Home");
    } catch (error) {
      if (error instanceof Error) {
        showAlert("error", "Erro ao atualizar a senha: " + error.message);
      } else {
        showAlert("error", "Erro desconhecido");
      }
    } finally {
      setIsSaving(false);
    }
  };


  const updateUserPassword = async (axiosInstance: AxiosInstance, newPassword: string) => {
    const controller = new AbortController();
  
    try {
      await axiosInstance.put("/api/v1/account/me/", {
        password: newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal, // Adiciona suporte para cancelamento
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        showAlert('error', 'Requisição cancelada pelo usuário');
      } else {
        showAlert('error', 'Erro ao atualizar a senha');
      }
    }
  };


  
    // Definição dos valores pré-definidos para as redes sociais
    const socialNetworks = {
      Facebook: "Facebook",
      Instagram: "Instagram",
      Twitter: "Twitter",
      LinkedIn: "Linkedin",
      TikTok: "Globe",
      YouTube: "Youtube",
      Figma: "Figma",
      Dribbble: "Dribbble",
      Medium: "Globe",
      Behance: "Globe",
      Twitch: "Twitch",
      Reddit: "Globe",
      Bluesky: "Globe",
      GitHub: "Github",
      Pinterest: "Pinterest", // Adicione o Pinterest aqui
    };


    const [url, setUrl] = useState("");
    const [username, setUsername] = useState("");
    const [socialNetwork, setSocialNetwork] = useState(""); 

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
        // Dados do link
      const linkData = {
        url,
        title: socialNetworks[socialNetwork as keyof typeof socialNetworks], 
        social_network: socialNetwork,
        username,
        is_profile_link: true, // Definido como true para todos os links criados
      };


      try {
        const response = await axiosInstance.get("/api/v1/account/me/link/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const existingLinks = response.data.results || response.data;
        const linkExists = existingLinks?.some(
          (link: any ) =>
            link.social_network === socialNetwork && link.url === url
        );

        if (linkExists) {
          showAlert("info", "Esse link de rede social já foi criado.");
          return;
        }

        await createLink(axiosInstance, linkData);
        showAlert('success', 'Link criado com sucesso!');

        setUrl("");
        setUsername("");
        setSocialNetwork("");
      } catch (error) {
        showAlert('error', 'Erro ao criar o link.');
      }
    };
  

  

  if (loadingUser) {
    return <LoadingSkeleton/>;
  }

  if (errorUser) {
    showAlert('error', 'Erro ao carregar os dados do usuário. Tente novamente mais tarde.');
  }

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen items-center p-4">
      <div className="w-[400px] mt-3 mb-5">
        <Link
          href="/account"
          className="p-3 rounded-xl w-fit bg-gray-900 hover:bg-gray-900/75 transition-all duration-500 text-white flex items-center"
        >
          <i className="fa-solid fa-reply"></i>
        </Link>
      </div>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="social_media">Redes Sociais</TabsTrigger>
          <TabsTrigger value="password">Senha</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardDescription>Faça alterações em sua conta aqui. Clique em salvar quando terminar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col gap-3">
              <form onSubmit={handleAccountSubmit} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <Label htmlFor="first_name">Nome</Label>
                  <Input
                    className="text-gray-800"
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last_name">Sobrenome</Label>
                  <Input
                    className="text-gray-800"
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Nome de usuário </Label>
                  <Input
                    className="text-gray-800"
                    type="text"
                    id="username"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="text-gray-800"
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="biografy">Sua Bio</Label>
                  <Textarea
                    className="text-gray-800 h-32"
                    id="biografy"
                    value={formData.biografy || ''}
                    onChange={(e) => setFormData({ ...formData, biografy: e.target.value })}
                  />
                </div>

                <CardFooter className="mt-2 flex justify-between align-middle space-x-1 p-0">
                  <Button type="submit">Salvar alterações</Button>
                  <Button variant="destructive" onClick={handleDelete}>Excluir Conta</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social_media">
          <Card>
            <CardHeader>
              <CardDescription>Inclua e altere suas Redes Sociais aqui.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <Label htmlFor="socialNetwork">Rede Social:</Label>
                  <select
                    id="socialNetwork"
                    value={socialNetwork}
                    onChange={(e) => setSocialNetwork(e.target.value)}
                    className="text-gray-800 p-2"
                  >
                    {Object.entries(socialNetworks).map(([key, value]) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="url">URL:</Label>
                  <Input
                    className="text-gray-800"
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Nome</Label>
                  <Input
                    className="text-gray-800"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit">Criar Link</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardDescription>Altere sua senha aqui. Depois de salvar, todos vocês serão desconectados.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handlePasswordSubmit}>
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

                <CardFooter className="mt-4 p-0">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Alterando..." : "Alterar senha"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}