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


const MobileScreen: React.FC<MobileScreenProps> = ({ bioData }) => {

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

  const [imageLoaded, setImageLoaded] = useState(true);

  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };


  return (
    <div className="lg:max-w-5xl mx-auto lg:flex justify-around">
      <Card className="relative min-w-full lg:min-w-[500px] min-h-screen bg-white dark:bg-black mb-5 rounded-3xl overflow-hidden">

        <div className="p-4 gap-5 lg:flex items-start w-[100%]">
          <div className="bg-white dark:bg-gray-900 p-2 py-20 rounded-xl lg:min-w-[40%] ">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mt-5 shadow">
                <AvatarImage src={bioData.image} alt={bioData.name} />
                <AvatarFallback>{bioData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="mt-4 font-medium capitalize">{bioData.name}</p>
              <p className="mt-2 text-gray-700 text-sm max-w-[400px] mx-auto dark:text-gray-200">{bioData.biografy}</p>
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

          {/* <hr /> */}
          <div className="mt-5 w-full">

          <div className="container gap-4 w-full h-full mx-auto">
            {bioData.content
              .sort((a, b) => {
                const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
                const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
                return dateB.getTime() - dateA.getTime();
              })
              .map((item, index) => {
                const isImage = item.icon; 
      
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current[index] = el;
                      }
                    }}
                    className={`overflow-hidden flex flex-col items-center ${
                      item.type === "link" && isImage === "/icons/image.ico" && screenWidth < 1024
                        ? "col-span-full full-column "
                        : extendedItems.has(item.id) && screenWidth < 1024// Verifica se o item deve se estender
                        ? "col-span-full full-column"
                        : "break-inside-avoid"
                    }`}
                  >
                      {item.type === "link" && !item.is_profile_link && (
                        <Link
                        href={item.url || ""}
                        target="_blank" className={`w-full mt-4 cursor-pointer  transition-transform transform hover:scale-95  ${
                          item.type === "link" && isImage === "/icons/image.ico" 
                            ? "py-0 max-w-[95%] " 
                            : "py-4 max-w-[90%] "
                        }` }>
                          {item.og_image && (
                            <Image
                              src={item.og_image}
                              layout="fill"
                              objectFit="cover"
                              alt={`Imagem de Capa do Link de ${item.url} na CliqueNaBio`}
                              className={`w-full h-40 object-cover rounded-lg ${ isImage === "/icons/image.ico" ? " opacity-0" : "opacity-100"}`}
                            />
                            
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
                                  : "bg-gray-400 text-white "
                              }`}
                            >
                              {isImageUrl(item.url || "") ? (
                                <Image
                                  src={item.url || ""}
                                  alt={item.content}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-lg opacity-50"
                                  onLoadingComplete={() => setImageLoaded(true)}
                                  onError={() => setImageLoaded(false)}
                                />
                              ) : null}

                              <div className={`flex items-start  ${
                                item.type === "link" && isImage === "/icons/image.ico" 
                                  ? "flex-row justify-between" 
                                  : "flex-col justify-end"
                                }`}>
                                <span
                                  className="z-10 text-lg font-semibold capitalize inline-block whitespace-wrap"
                                  style={{ minWidth: "50%" }}
                                >
                                  {item.title}
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
                                        onLoadingComplete={() => setImageLoaded(false)}
                                        onError={() => setImageLoaded(true)}
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
                        <div className="w-full  bg-white mt-5 transition-transform transform hover:scale-90 cursor-pointer">
                          <Image
                            src={item.url}
                            alt="Imagem de Capa na CliqueNaBio"
                            width={800}
                            height={600}
                            objectFit="cover"
                          />

                        </div>
                      )}

                      {item.type === "text" && (
                        <p className="text-sm bg-gray-100 p-4 rounded-lg shadow-inner w-full text-center">
                          {item.content}
                        </p>
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
    </div>
  )
}

export default MobileScreen

