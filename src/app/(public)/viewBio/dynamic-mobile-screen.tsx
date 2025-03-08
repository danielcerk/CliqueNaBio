"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Facebook, Instagram, Linkedin, Youtube, Globe, 
  Github, Twitch, Figma, Dribbble
} from "lucide-react";
import { 
  FaTiktok, 
  FaMedium, 
  FaBehance, 
  FaReddit, 
  FaPinterest,
  FaTwitter// Ícone do X (Twitter) do FontAwesome
} from "react-icons/fa"; // Ícones do FontAwesome
import { SiBluesky } from "react-icons/si"; // Ícone do Bluesky (Simple Icons)

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import type { LucideProps } from 'lucide-react';
import { Button } from "@/components/ui/button";

import axiosInstance from "@/helper/axios-instance";

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  X: FaTwitter, // Substituído por X
  LinkedIn: Linkedin,
  TikTok: FaTiktok, 
  YouTube: Youtube,
  Figma: Figma,
  Dribbble: Dribbble,
  Medium: FaMedium, 
  Behance: FaBehance,
  Twitch: Twitch,
  Reddit: FaReddit, 
  Bluesky: SiBluesky, 
  GitHub: Github,
  Pinterest: FaPinterest, 
};


const socialColors: Record<SocialIconKey, string> = {
  Facebook: "text-blue-600", // Azul do Facebook
  Instagram: "text-pink-500", // Rosa do Instagram
  X: "text-blue-400", // Azul claro do X (antigo Twitter)
  LinkedIn: "text-blue-700", // Azul escuro do LinkedIn
  TikTok: "text-black", // Preto do TikTok
  YouTube: "text-red-600", // Vermelho do YouTube
  Figma: "text-purple-600", // Roxo do Figma
  Dribbble: "text-pink-600", // Rosa do Dribbble
  Medium: "text-green-600", // Verde do Medium
  Behance: "text-blue-800", // Azul escuro do Behance
  Twitch: "text-purple-500", // Roxo do Twitch
  Reddit: "text-orange-500", // Laranja do Reddit
  Bluesky: "text-sky-500", // Azul claro do Bluesky
  GitHub: "text-gray-800", // Cinza escuro do GitHub
  Pinterest: "text-red-800", // Vermelho escuro do Pinterest
};


type SocialIconKey = keyof typeof socialIcons;

const getSocialIcon = (title: string): React.ComponentType<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> => {
  const socialIconKey = Object.keys(socialIcons).find((key) => 
    title.toLowerCase().includes(key.toLowerCase())
  ) as SocialIconKey | undefined;

  return socialIconKey ? socialIcons[socialIconKey] : Globe;
};


interface ContentItem {
  id: string;
  type: "link" | "photo" | "text";
  content: string;
  name: string;
  small_description: string;
  image: string;
  url?: string;
  owner?: string;
  title?: string;
  og_image?: string;
  is_profile_link?: boolean;
  social_network?: string;
  username?: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}


interface BioData {
  id: number,
  name: string
  biografy: string
  image: string
  content: ContentItem[]
  form_contact: boolean
  copyright: boolean
}

interface MobileScreenProps {
  bioData: BioData
}

type PhotoModalData = {
  url: string;
  title?: string;
  description?: string;
};



const MobileScreen: React.FC<MobileScreenProps> = ({ bioData }) => {

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [emailContact, setEmailContact] = useState<string>("");
  const [contentContact, setContentContact] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoModalData | null>(null);

  const [extendedItems, setExtendedItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const checkHorizontalDistance = (
    element1: HTMLElement | null,
    element2: HTMLElement | null,
    distanceThreshold: number = 150
  ): boolean => {
    if (!element1 || !element2) return false;

    // Calcula a distância horizontal entre os elementos
    const horizontalDistance = Math.abs(
      element1.getBoundingClientRect().right - element2.getBoundingClientRect().left
    );

    return horizontalDistance <= distanceThreshold;
  };

  const SendMessageForm = async (emailContact: string, contentContact: string): Promise<any> => {
    try {
      const response = await axiosInstance.post(`/api/v1/account/${bioData.id}/send-email/`, {
        email: emailContact,
        content: contentContact,
      });
  
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw error;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoading(true);

    try {
      await SendMessageForm(emailContact, contentContact);
      alert("Mensagem enviada com sucesso!");
      setIsFormModalOpen(false);

    } catch (error) {

      console.error(error);
      alert("Erro ao enviar mensagem.");

    } finally {

      setLoading(false);

    }

    setEmailContact("");
    setContentContact("");
    setIsFormModalOpen(false)

  };

  useEffect(() => {
    const updateExtendedItems = () => {
      const newExtendedItems = new Set<string>();
  
      // Verifica o primeiro item
      const firstElement = itemRefs.current[0];
      if (firstElement && itemRefs.current.length > 1) {
        const secondElement = itemRefs.current[1];
        const isFirstCloseToSecond = checkHorizontalDistance(firstElement, secondElement, 150);
  
        // Se o primeiro item não estiver próximo do segundo, ele está sozinho
        if (!isFirstCloseToSecond) {
          newExtendedItems.add(bioData.content[0].id);
        }
      }
  
      // Verifica o último item
      const lastElement = itemRefs.current[itemRefs.current.length - 1];
      if (lastElement && itemRefs.current.length > 1) {
        const secondLastElement = itemRefs.current[itemRefs.current.length - 2];
        const isLastCloseToSecondLast = checkHorizontalDistance(secondLastElement, lastElement, 150);
  
        // Se o último item não estiver próximo do penúltimo, ele está sozinho
        if (!isLastCloseToSecondLast) {
          newExtendedItems.add(bioData.content[bioData.content.length - 1].id);
        }
      }
  
      setExtendedItems(newExtendedItems);
    };
  
    updateExtendedItems();
  }, [bioData, screenWidth]); 

   useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  


  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    if (bioData) {
      document.title = `CliqueNaBio | @${bioData.name}` || "Meu App";
      if (bioData.image) {
        const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
        if (favicon) {
          favicon.href = bioData.image;
        } else {
          const newFavicon = document.createElement("link");
          newFavicon.rel = "icon";
          newFavicon.href = bioData.image;
          document.head.appendChild(newFavicon);
        }
      }
    }
  }, [bioData]);
  

  return (
    <div className="lg:max-w-[90%] w-full lg:flex lg:justify-around rounded-xl">
      <Card className="relative min-w-full min-h-screen bg-white dark:bg-black rounded-xl pb-10 overflow-hidden">

        <div className="p-4 gap-5 lg:flex items-start w-[100%] h-full">
          <div className="bg-white p-2 dark:bg-gray-900 py-20 rounded-xl lg:min-w-[40%] ">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mt-5 shadow">
                <AvatarImage src={bioData.image} alt={bioData.name} />
                <AvatarFallback>@{bioData.name}</AvatarFallback>
              </Avatar>
              <p className="mt-4 font-medium capitalize">@{bioData.name}</p>
              <p className="mt-2 text-gray-700 text-sm max-w-[400px] dark:text-gray-200 mx-auto mb-2">{bioData.biografy}</p>

              {bioData.form_contact === true ? (
               
              <Button
                variant="outline"
                onClick={() => setIsFormModalOpen(true)}
                className="text-sm dark:text-yellow-400 font-bold"
              >
                 Entrar em Contato
              </Button>) : null }
            </div>
            
            <section className="flex items-center justify-center gap-6 p-6 rounded-lg">
              {bioData.content.map((item) =>
                item.type === "link" && item.is_profile_link ? (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition duration-300 ease-in-out transform hover:scale-110"
                  >
                    {(() => {
                  
                      const Icon = getSocialIcon(item.title || item.social_network ||  "");
                      const socialKey = Object.keys(socialColors).find((key) =>
                        item.title?.toLowerCase().includes(key.toLowerCase())
                      ) as SocialIconKey | undefined;

                      // Define a cor padrão como cinza se a rede social não for encontrada
                      const colorClass = socialKey ? socialColors[socialKey] : "text-gray-600";

                      return (
                        <Icon
                          className={`w-6 h-6 ${colorClass} group-hover:opacity-80 transition-colors duration-300`}
                        />
                      );
                    })()}
                  </a>
                ) : null
              )}
            </section>
          </div>

          <div className="mt-5 w-full">

          <div className="container gap-4 w-full h-full mx-auto">
            {bioData.content
              .sort((a, b) => {
                const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
                const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
                return dateB.getTime() - dateA.getTime();
              })
              .map((item, index) => {
                const isImage = "https://online.stl.tech/cdn/shop/products/image_9_80239d75-941f-42bc-b028-9c895b8a7e10.png"; 
                return (
                  <div
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[index] = el;
                    }
                  }}
                  className={`overflow-hidden flex flex-col items-center ${
                    item.type === "link" && !isImage && screenWidth < 1024
                      ? "col-span-full full-column"
                      : extendedItems.has(item.id) && screenWidth < 1024 // Verifica se o item deve se estender
                      ? "col-span-full full-column"
                      : "break-inside-avoid"
                    }`}
                  >
                      {item.type === "link" && !item.is_profile_link && (
                        <Link
                        href={item.url || ""}
                        target="_blank" className={`w-full mt-4 cursor-pointer  transition-transform transform hover:scale-95  ${
                          item.type === "link" && item.og_image === isImage  
                            ? "py-0 max-w-[95%] " 
                            : "py-4 max-w-[90%] "
                        }`}>
                        {item.og_image && (
                            <Image
                              src={item.og_image}
                              layout="fill"
                              objectFit="cover"
                              alt={`Imagem de Capa do Link de ${item.url} na CliqueNaBio`}
                              className={`w-full h-40 object-cover rounded-lg ${ item.og_image === isImage ? " opacity-0" : "opacity-100"}`}
                            />
                            
                          )}
                          {/* Fundo gradiente se a imagem não carregar */}
                          {item.og_image === isImage && (
                            <div
                              className={`absolute inset-0  rounded-lg ${
                                item.url?.includes("instagram.com")
                                  ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white"
                                  : item.url?.includes("facebook.com")
                                  ? "bg-[#1877F2] text-white"
                                  : item.url?.includes("x.com")
                                  ? "bg-[#14171A] text-white"
                                  : item.url?.includes("youtube.com")
                                  ? "bg-[#B31217] text-white"
                                  : item.url?.includes("linkedin.com")
                                  ? "bg-[#0A66C2] text-white"
                                  : "bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500"
                              }`}
                            ></div>
                          )}
                          <div className="absolute inset-0 bg-black opacity-35 rounded-lg"></div>
                          <div
                            className="flex flex-col items-center gap-2 w-full h-full justify-center"
                          >
                            <div
                              className={`w-full rounded-lg p-5 shadow ${
                                item.url?.includes("instagram.com")
                                  ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white"
                                  : item.url?.includes("facebook.com")
                                  ? "bg-[#1877F2] text-white"
                                  : item.url?.includes("x.com")
                                  ? "bg-[#14171A] text-white"
                                  : item.url?.includes("youtube.com")
                                  ? "bg-[#B31217] text-white"
                                  : item.url?.includes("linkedin.com")
                                  ? "bg-[#0A66C2] text-white"
                                  : "bg-gray-400 text-white"
                              }`}
                            >

                              <div className={`flex items-start flex-wrap  ${
                                item.type === "link" && item.og_image === isImage 
                                  ? "flex-row justify-between" 
                                  : "flex-col justify-end"
                                }`}>
                              <span
                                className="z-10 text-lg font-semibold capitalize inline-block"
                                style={{ maxWidth: "100%" }} // Defina um maxWidth para limitar o espaço
                                title={item.title} // Exibe o texto completo ao passar o mouse
                              >
                                <p className="line-clamp">{item.title}</p>
                              </span>
                                {isImageUrl(item.url || "") ? null : (
                                  <div className="flex flex-col items-center gap-2">
                                    {item.icon && (
                                      <Image
                                        src={item.icon || ""}
                                        alt={item.social_network || ""}
                                        className="w-6 h-6 rounded-xl object-cover z-10"
                                        width={32}
                                        height={32}
                                        objectFit="cover"
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}

                      {item.type === "photo" && item.url && isImageUrl(item.url) && (
                        <div className="w-full mt-4 bg-white transition-transform transform hover:scale-90 cursor-pointer"
                        onClick={() => {
                          setSelectedPhoto({
                            url: item.url || "", // URL da imagem
                            title: item.content, // Título da imagem
                            description: item.small_description, // Descrição da imagem
                          });
                          setIsPhotoModalOpen(true);
                        }}>
                        <Image
                          src={item.url}
                          alt="Imagem de Capa na CliqueNaBio"
                          width={800}
                          height={600}
                          objectFit="cover"
                        />
                        </div>
                      )}

                  </div>
                 );
              })}
            </div>

            { bioData?.copyright ? ( 
              <footer className="text-center p-4 mt-6">
                <p className="text-gray-600 font-medium">
                  Feito com ❤️ por <span className="font-bold">
                    <a target="_blank" href="https://cliquenabio.vercel.app/">CliqueNaBio</a></span>
                </p>
              </footer> ) : null
            }

          </div>
        </div>
      </Card>

      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Entre em Contato</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full dark:bg-gray-200 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem</label>
                <textarea
                  className="mt-1 block w-full text-black px-3 dark:bg-gray-200 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  value={contentContact}
                  onChange={(e) => setContentContact(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 font-bold transition-colors"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 dark:bg-green-600 text-white rounded-lg dark:hover:bg-green-700 font-bold transition-colors"
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isPhotoModalOpen && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedPhoto.title || "Foto"}</h2>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="text-gray-700 hover:text-gray-700 ml-auto text-2xl dark:text-white"
              >
                &times;
              </button>
            </div>
            <div className="relative w-full h-[60vh] rounded-lg">
            
              <Image
                src={selectedPhoto.url}
                alt="Imagem Expandida"
                layout="fill"
                objectFit="contain"
                quality={100}
                priority
                className="rounded-lg"
              />
            </div>
            {selectedPhoto.description && (
              <p className="mt-4 text-gray-700 dark:text-gray-200 text-sm">{selectedPhoto.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileScreen

