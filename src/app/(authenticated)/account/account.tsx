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
import { User, Profile, FormEmail, LinkItem} from "../../../lib/types"

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

  const [userData, loadingUser, errorUser] = useAxios<User>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [profileData, loadingProfile, errorProfile] = useAxios<Profile>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/profile/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });


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

  const [links, loadingLinks, errorLinks] = useAxios<LinkItem>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/link/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const filteredLinks = Array.isArray(links) ? links.filter((link) => link.is_profile_link) : [];

  const [profile, setProfile] = useState<Profile | null>(profileData || null)
  const [user, setUser] = useState<User | null>(userData || null);
  const [showForm, setShowForm] = useState<boolean>(formEmail?.is_activate || false);


  useEffect(() => {
    if (userData && profileData) {
      setUser({ ...userData, slug: profileData.slug });
      setProfile({...profileData})
    }
    if (formEmail) setShowForm(formEmail.is_activate);
  }, [userData, profileData, formEmail]);

  const usrName = user?.name || "";
  const usrNameFirst2Letters = usrName.substring(0, 2);


  const fileInputRefAvatar = useRef<HTMLInputElement | null>(null);
  const fileInputRefBanner = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRefAvatar.current?.click();
  };
  
  const handleBannerClick = () => {
    fileInputRefBanner.current?.click();
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
      
      showAlert('success', 'Sua foto foi atualizada com sucesso!');
    } catch (error) {
      showAlert('error', 'Erro ao enviar Imagem!');
    }
  };

  const handleImageBannerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("banner_upload", file);
  
    try {
      const response = await axiosInstance.put("/api/v1/account/me/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      setProfile((prevProfile: Profile | null) =>
        prevProfile
          ? { ...prevProfile, banner: response.data.banner }
          : { banner: response.data.banner }
      );

      showAlert('success', 'Banner atualizado com sucesso!');
    } catch (error) {
      showAlert('error', 'Erro ao enviar Imagem do Banner!');
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

      setShowForm(newValue);
    } catch (error) {
      showAlert('error', 'Erro ao atualizar visibilidade!');
    }
  };


  const generatePublicLink = () => {
    if (!user?.slug) {
      showAlert('error', 'Slug não encontrado. Por favor, defina um slug em seu perfil.');
      return null;
    }

    const URL = process.env.NODE_ENV === 'production' 
      ? 'https://cliquenabio.com.br/' 
      : 'http://localhost:3000/';

    return `${URL}@${user.slug}`;
  };

  const handleShare = () => {
    const publicLink = generatePublicLink();
    if (!publicLink) return;

    navigator.clipboard.writeText(publicLink)
      .then(() => showAlert('success', 'Link copiado para a área de transferência!'))
      .catch(() => showAlert('error', 'Erro ao copiar o link.'));
  };

  if (loadingUser || loadingProfile || loadingLinks) {
    return <LoadingSkeleton/>;
  }

  if (errorUser || errorProfile || errorLinks) { 
    showAlert('error', 'Erro ao carregar os dados. Tente novamente mais tarde.');
  }

  return (
    <>    
    <div className="min-h-screen flex justify-center p-4  pt-10 dark:bg-gray-900">
      <Card className="w-full max-w-xl h-fit">
        <div className="relative overflow-hidden">
      
          <div className="absolute w-full h-[50%] rounded-t overflow-hidden">

            <div className="w-full h-full cursor-pointer" onClick={handleBannerClick}>
              <Image
                src={profile?.banner?.trim() ? profile.banner : "/bg-01.jpg"}
                alt={`Imagem de fundo`}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <input
              type="file"
              ref={fileInputRefBanner}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageBannerChange}
            />
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4 p-5">
            <div className="mt-16 sm:mt-0">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage
                  src={user?.image?.trim() ? user.image : "/placeholder.svg?height=128&width=128"}
                  alt={`Foto de perfil de ${user?.name}`}
                  style={{ objectFit: 'cover' }}
                />
                <AvatarFallback>{usrNameFirst2Letters}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRefAvatar}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center sm:text-left z-50 ">
              <CardTitle className="text-2xl capitalize font-semibold">{user?.name}</CardTitle>
              <CardDescription className="text-lg">{user?.email}</CardDescription>
            </div>
          </div>
        </div>
        <CardContent className="pb-1 mt-5 ">
          <p className="font-semibold text-xl">Biografia:</p>
          <p className="text-muted-foreground mt-3 capitalize">{user?.biografy}</p>
        </CardContent>

        {user?.plan !== 'GRÁTIS' && (
          <CardContent className="mt-5" >
         <div className="flex items-center gap-4">
          <label className="text-lg font-medium dark:text-gray-300 flex items-center gap-2">
            <span className="max-w-[200px] py-1 text-sm">
            Habilitar formulário de contato no perfil
            </span>
            <div className="relative w-10">
            <input
              type="checkbox"
              checked={showForm}
              onChange={handleCheckboxChange}
              className="checkbox bg-red-400 rounded-full  appearance-none checked:bg-green-500 transition-all duration-300 cursor-pointer "
            />
            <i
              className={`fa-solid ${showForm ? 'fa-toggle-on' : 'fa-toggle-off'} absolute left-2 h-full w-full text-white text-xl transition-all duration-300 cursor-pointer`}
            ></i>
          </div>
          </label>
        </div>
          </CardContent>
        )}
        <CardContent className="mt-5" >
          <span className="max-w-[200px] py-1 text-sm">
                Suas Redes:
          </span>

          <div className="py-4 flex flex-wrap gap-4">
        
            {filteredLinks && filteredLinks.length > 0 ? (
              filteredLinks.map((link) => {
                const socialNetworkName = link.social_network === "Twitter" ? "X" : link.social_network;
                const icon = link.social_network === "Twitter" ? "/icons/x.svg" : link.icon;

                return (
                  <div key={link.url} className="p-4  text-gray-700 flex justify-center hover:text-white bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:transition-all hover:duration-300 hover:bg-black rounded-lg shadow-sm">
                    <Link href={link.url} target="_blank" className="flex items-center justify-center">
                      <Image
                        src={icon}
                        alt={`Ícone da rede social ${socialNetworkName}`}
                        className="w-6 h-6 rounded-full"
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
                <p className="text-muted-foreground">Nenhum link de perfil cadastrado.</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-stretch sm:items-center justify-between">
          <Button className="flex-1 sm:flex-initial btn-hover" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" /> Compartilhar
          </Button>
          <Link href={"edit-account"}>
            <Button className="flex-1 sm:flex-initial bg-yellow-400 btn-hover text-gray-950 hover:bg-yellow-400 hover:text-black">
              Gerenciamento <i className="fa-solid fa-user-gear"></i>
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    </>
  );
}