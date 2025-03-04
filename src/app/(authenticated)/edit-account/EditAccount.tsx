'use client'

import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import axios, { AxiosInstance } from 'axios';
import Cookie from "js-cookie"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from 'next/navigation';
import { AlertModal } from '@/components/common/AlertModal';
import LoadingSkeleton from "./loading-skeleton";
import Link from "next/link";
import { createLink, updateLink, deleteLink } from "@/hooks/use-links";
import AlertDecisionModal from "@/components/common/AlertDecisionModal";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaGithub,
  FaPinterest,
  FaTwitch,
  FaGlobe,
} from 'react-icons/fa';

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

interface SocialLink {
  id: number;
  url: string;
  title: string;
  social_network: string;
  username: string;
}

export default function EditAccount() {
  const token = Cookie.get('access_token');
  const router = useRouter();

  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<number | null>(null); 


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
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

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
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: '',
        biografy: user.biografy,
      });
    }
  }, [user]);

  const fetchSocialLinks = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/account/me/link/", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const profileLinks = response.data.filter(
        (link: any) => link.is_profile_link === true
      );
      setSocialLinks(profileLinks);
    } catch (error) {
      showAlert('error', 'Erro ao carregar os links de redes sociais.');
    }
  }, [token]);
  
  useEffect(() => {
    fetchSocialLinks();
  }, [fetchSocialLinks]);
  

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
    } finally {
      setIsDecisionModalOpen(false); // Fecha o modal após a exclusão
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
        signal: controller.signal,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        showAlert('error', 'Requisição cancelada pelo usuário');
      } else {
        showAlert('error', 'Erro ao atualizar a senha');
      }
    }
  };

  const socialIcons = {
    Facebook: <FaFacebook className="w-5 h-5" />,
    Instagram: <FaInstagram className="w-5 h-5" />,
    X: <FaTwitter className="w-5 h-5" />, // Alterado de Twitter para X
    LinkedIn: <FaLinkedin className="w-5 h-5" />,
    YouTube: <FaYoutube className="w-5 h-5" />,
    TikTok: <FaTiktok className="w-5 h-5" />,
    GitHub: <FaGithub className="w-5 h-5" />,
    Pinterest: <FaPinterest className="w-5 h-5" />,
    Twitch: <FaTwitch className="w-5 h-5" />,
    Globe: <FaGlobe className="w-5 h-5" />, // Ícone padrão para redes não listadas
  } as const;

  const socialNetworks = {
    Facebook: "Facebook",
    Instagram: "Instagram",
    X: "X", // Alterado de Twitter para X
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
    Pinterest: "Pinterest",
  };

  const getSocialIcon = (socialNetwork: string) => {
    // Normaliza o nome da rede social
    if (socialNetwork.includes("YouTube")) {
      return socialIcons.YouTube;
    }
    return socialIcons[socialNetwork as keyof typeof socialIcons] || socialIcons.Globe;
  };

  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [socialNetwork, setSocialNetwork] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const linkData = {
      url,
      title: socialNetworks[socialNetwork as keyof typeof socialNetworks],
      social_network: socialNetwork,
      is_profile_link: true,
    };
  
    try {
      if (editingLink) {
        await updateLink(axiosInstance, editingLink.id, linkData);
        showAlert('success', 'Link atualizado com sucesso!');
        setEditingLink(null);
      } else {
        const response = await axiosInstance.get("/api/v1/account/me/link/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const existingLinks = response.data || response.data;
        const linkExists = existingLinks?.some(
          (link: any) =>
            link.social_network === socialNetwork && link.url === url
        );
  
        if (linkExists) {
          showAlert("info", "Esse link de rede social já foi criado.");
          return;
        }
  
        await createLink(axiosInstance, linkData, true)
        showAlert('success', 'Link criado com sucesso!');
      }
  
      setUrl("");
      setSocialNetwork("");
      fetchSocialLinks();
    } catch (error) {
      showAlert('error', 'Erro ao criar/atualizar o link.');
    }
  };

  const handleEditLink = (link: SocialLink) => {
    setEditingLink(link);
    setUrl(link.url);
    setSocialNetwork(link.social_network);
  };

 const handleDeleteLink = async (linkId: number) => {
  try {
    await deleteLink(axiosInstance, linkId);
    showAlert('success', 'Link deletado com sucesso!');
    fetchSocialLinks();
  } catch (error) {
    showAlert('error', 'Erro ao deletar o link.');
  } finally {
    setLinkToDelete(null); // Fecha o modal após a exclusão
  }
};


  if (loadingUser) {
    return <LoadingSkeleton />;
  }

  if (errorUser) {
    showAlert('error', 'Erro ao carregar os dados do usuário. Tente novamente mais tarde.');
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col min-h-screen items-center p-4 pt-10">
    <div className="w-[400px] mt-3 mb-5">
      <Link
        href="/account"
        className="p-3 rounded-xl w-fit bg-gray-900 dark:bg-gray-700 hover:bg-gray-900/75 dark:hover:bg-gray-600 transition-all duration-500 text-white flex items-center"
      >
        <i className="fa-solid fa-reply"></i>
      </Link>
    </div>
  
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3 ">
        <TabsTrigger value="account" className="text-gray-900 dark:text-white ">Conta</TabsTrigger>
        <TabsTrigger value="social_media" className="text-gray-900 dark:text-white">Redes Sociais</TabsTrigger>
        <TabsTrigger value="password" className="text-gray-900 dark:text-white">Senha</TabsTrigger>
      </TabsList>
  
      <TabsContent value="account">
        <Card className="bg-white dark:bg-black">
          <CardHeader>
            <CardDescription className="dark:text-gray-200">Faça alterações em sua conta aqui. Clique em salvar quando terminar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col gap-3">
            <form onSubmit={handleAccountSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <Label htmlFor="first_name" className="dark:text-gray-300">Nome</Label>
                <Input
                  className="text-gray-800 dark:bg-gray-200"
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="last_name" className="dark:text-gray-300">Sobrenome</Label>
                <Input
                  className="text-gray-800 dark:bg-gray-200"
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username" className="dark:text-gray-300">Nome de usuário </Label>
                <Input
                  className="text-gray-800 dark:bg-gray-200"
                  type="text"
                  id="username"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                <Input
                  className="text-gray-800 dark:bg-gray-200"
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="biografy" className="dark:text-gray-300">Sua Bio</Label>
                <Textarea
                  className="text-gray-800 dark:bg-gray-200 h-32"
                  id="biografy"
                  value={formData.biografy || ''}
                  onChange={(e) => setFormData({ ...formData, biografy: e.target.value })}
                />
              </div>
  
              <CardFooter className="mt-2 flex justify-between align-middle space-x-1 p-0">
                <Button type="submit" className="dark:bg-green-600 w-full dark:text-white">Salvar alterações</Button>
              </CardFooter>
            </form>
            <Button
              variant="destructive"
              onClick={() => setIsDecisionModalOpen(true)} // Abre o modal de decisão
            >
              Excluir Conta
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
  
      <TabsContent value="social_media">
        <Card className="bg-white dark:bg-black">
          <CardHeader>
            <CardDescription>Inclua e altere suas Redes Sociais aqui.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <Label htmlFor="socialNetwork" className="dark:text-gray-300">Rede Social:</Label>
                <select
                  id="socialNetwork"
                  value={socialNetwork}
                  onChange={(e) => setSocialNetwork(e.target.value)}
                  className="text-gray-800  p-2"
                >
                  {Object.entries(socialNetworks).map(([key, value]) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="url" className="dark:text-gray-300">URL:</Label>
                <Input
                  className="text-gray-800  dark:bg-gray-200"
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
  
              <Button type="submit" className="dark:bg-yellow-400 ">{editingLink ? "Atualizar Link" : "Criar Link"}</Button>
            </form>
  
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links Existentes</h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      {/* Ícone da rede social */}
                      <span className="text-gray-700 dark:text-gray-300">
                        {getSocialIcon(link.social_network)}
                      </span>
                      {/* Nome da rede social */}
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {link.title || link.social_network}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEditLink(link)}
                        className="text-sm"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => setLinkToDelete(link.id)} // Abre o modal de decisão
                        className="text-sm"
                      >
                        Deletar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
  
      <TabsContent value="password">
        <Card className="bg-white dark:bg-black">
          <CardHeader>
            <CardDescription className="dark:text-gray-200">Altere sua senha aqui. Depois de salvar, todos vocês serão desconectados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-1">
                <Label htmlFor="new" className="dark:text-gray-300">Nova senha</Label>
                <Input
                  className="text-gray-800 dark:bg-gray-200"
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
  
              <CardFooter className="mt-4 p-0">
                <Button type="submit" className="dark:bg-yellow-400 " disabled={isSaving}>
                  {isSaving ? "Alterando..." : "Alterar senha"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  
    <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <AlertDecisionModal
      isOpen={isDecisionModalOpen}
      message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      onConfirm={handleDelete} // Função que será chamada ao confirmar
      onCancel={() => setIsDecisionModalOpen(false)} // Fecha o modal ao cancelar
    />

    <AlertDecisionModal
      isOpen={linkToDelete !== null}
      message="Tem certeza que deseja excluir este link?"
      onConfirm={() => handleDeleteLink(linkToDelete!)} // Função que será chamada ao confirmar
      onCancel={() => setLinkToDelete(null)} // Fecha o modal ao cancelar
    />
  </div>
  
  );
}