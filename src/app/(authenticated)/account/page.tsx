"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Share } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import Cookie from "js-cookie";
import LoadingSkeleton from "./loading-skeleton";
import Image from "next/image";
import { AlertModal } from '@/components/common/AlertModal';

interface User {
  name?: string;
  email?: string;
  phone?: string;
  biografy?: string;
  image?: string;
  plan?: string,
  showProfileForm?: boolean;
}

interface FormEmail {
  is_activate: boolean;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Link[];
}

interface Link {
  owner: string;
  url: string;
  title: string;
  social_network: string;
  username: string;
  is_profile_link: boolean; 
  icon: string
}

export default function Account() {
  const token = Cookie.get("access_token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // Carregando dados do usuário
  const [userData, loadingUser, errorUser] = useAxios({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Carregando informações de formulário de email
  const [formEmail] = useAxios<FormEmail>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/form-email/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [links, loadingLinks, errorLinks] = useAxios<ApiResponse>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/link/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const filteredLinks = links?.results.filter((link) => link.is_profile_link);
  useEffect(()=>{
  }, [links])

  const [user, setUser] = useState<User | null>(userData || null);
  const [showForm, setShowForm] = useState<boolean>(formEmail?.is_activate || false);

  useEffect(() => {
    if (userData) setUser(userData);
    if (formEmail) setShowForm(formEmail.is_activate);

  }, [userData, formEmail]);

  const usrName = user?.name || "";
  const usrNameFirst2Letters = usrName.substring(0, 2);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image_upload", file);

    try {
      const response = await axiosInstance.put("/api/v1/account/me/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prevUser: User | null) =>
        prevUser
          ? { ...prevUser, image: response.data.image }
          : { image: response.data.image }
      );
    } catch (error) {
      showAlert('error', 'Erro ao enviar Imagem!');
    }
  };

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    try {
      await axiosInstance.put(
        "/api/v1/account/form-email/",
        { is_activate: newValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowForm(newValue); // Atualiza diretamente o estado showForm
    } catch (error) {
      showAlert('error', 'Erro ao atualizar visibilidade!');
    }
  };

  if (loadingUser) {
    return <LoadingSkeleton/>;
  }

  if (errorUser) { showAlert('error', 'Erro ao carregar os dados. Tente novamente mais tarde.');}

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <Card className="w-full max-w-xl h-fit">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            {/* Avatar clicável */}
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage
                src={user?.image?.trim() ? user.image : "/placeholder.svg?height=128&width=128"}
                alt={`Foto de perfil de ${user?.name}`}
              />
              <AvatarFallback>{usrNameFirst2Letters}</AvatarFallback>
            </Avatar>

            {/* Input de arquivo oculto */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl capitalize font-semibold">{user?.name}</CardTitle>
            <CardDescription className="text-lg">{user?.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-1">
          <p className="font-semibold text-xl">Biografia:</p>
          <p className="text-muted-foreground mt-3 capitalize">{user?.biografy}</p>
        </CardContent>
        { user?.plan !== 'GRÁTIS' ? ( 
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-muted-foreground">Tornar o formulário visível em seu perfil</label>
              <input
                type="checkbox"
                checked={showForm}
                onChange={handleCheckboxChange}
                className="checkbox"
              />
            </div>
          </CardContent> ) : null}

          <div className="p-4 flex flex-wrap gap-4">
            {filteredLinks && filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <div key={link.url} className="p-4 text-gray-700 hover:text-white bg-white transition-all duration-300 hover:transition-all hover:duration-300 hover:bg-black rounded-lg shadow-sm">
                  <Link href={link.url} target="_blank" className=" flex items-center gap-4">
                    <Image
                      src={link.icon}
                      alt={`Ícone da rede social ${link.social_network}`}
                      className="w-6 h-6 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div>
                      <p>
                        {link.title}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
                <p className="text-muted-foreground">Nenhum link de perfil cadastrado.</p>
              </div>
            )}
          </div>
        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-stretch sm:items-center justify-between">
          <Button className="flex-1 sm:flex-initial btn-hover">
            <Share className="mr-2 h-4 w-4" /> Compartilhar
          </Button>
          <Link href={"editAccount"}>
            <Button className="flex-1 sm:flex-initial bg-yellow-400 btn-hover text-gray-950 hover:bg-yellow-400 hover:text-black">
              Gerenciamento <i className="fa-solid fa-user-gear"></i>
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
