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

import { MobileScreenProps} from "../../../lib/types"



const MobileScreen: React.FC<MobileScreenProps> = ({ bioData}) => {

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


  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  console.log(bioData.theme)


  return (
    <div className="lg:max-w-[90%] w-full lg:flex lg:justify-around rounded-xl"  >
      <Card className="relative max-w-full min-h-screen rounded-xl pb-10 overflow-hidden border-none shadow-none" style={{
      backgroundColor: bioData.theme[0]?.background_color || 'white',
      color: bioData.theme[0]?.foreground_color || 'black',
      fontFamily: bioData.theme[0]?.font_family || 'Arial, sans-serif',
    }}>

      <div className="px-4 gap-5 max-w-xl lg:flex items-start mx-auto lg:mx-0 lg:max-w-[100%] lg:min-w-[1000px] h-full">
        <div className=" pb-3 rounded-xl w-full  relative max-w-[500px]" style={{ 
          boxShadow: `0 10px 15px -3px ${bioData.theme[0]?.foreground_color || '#000000'}33, 0 4px 6px -2px ${bioData.theme[0]?.foreground_color || '#000000'}1a`
          }}>

              <div className="absolute w-full h-[30%] rounded-t overflow-hidden ">
                <div className="w-full h-full cursor-pointer">
                  <Image
                    src={bioData.banner || '/bg-01.jpg'}
                    alt={`Imagem de fundo`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="text-center z-50">
                <Avatar className="w-32 h-32 mx-auto mt-10 shadow">
                  <AvatarImage src={bioData.image} alt={bioData.name} style={{ objectFit: 'cover' }}/>
                  <AvatarFallback>{bioData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="mt-4 font-bold capitalize ">{bioData.name}</p>
                <p className="mt-2  text-sm max-w-[400px] mx-auto ">{bioData.biografy}</p>
              </div>
              
              <section className="flex items-center justify-center gap-6 p-6 rounded-lg">
              {bioData.content.map((item) =>
                item.type === "link" && item.is_profile_link ? (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-black/10 backdrop-blur-sm
                      group transition duration-300 hover:scale-110"
                  >
                    {(() => {
                      const Icon = getSocialIcon(item.title || item.social_network || "");
                      const socialKey = Object.keys(socialColors).find((key) =>
                        item.title?.toLowerCase().includes(key.toLowerCase())
                      ) as SocialIconKey | undefined;

                      const colorClass = socialKey ? socialColors[socialKey] : "text-gray-600";
                      
                      return (
                        <Icon
                          className={`w-6 h-6 ${colorClass}
                            drop-shadow-[0_1px_1px_rgba(0,0,0,0)]
                            group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0)]
                            transition-all duration-300`}
                        />
                      );
                    })()}
                  </a>
                ) : null
              )}
            </section>
        </div>

        <div className="mt-5 lg:mt-0 w-full max-w-[1000px]">

        <div className="container-content gap-4 w-full h-full mx-auto">
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
                    item.type === "link" &&  !isImage  && screenWidth < 1024
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
                        item.type === "link" && item.og_image === isImage 
                          ? "py-0 max-w-[95%] " 
                          : "py-4 max-w-[90%] "
                      }` }>
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
                                : "bg-gray-400 text-white "
                            }`}
                          >

                            <div className={`flex items-start flex-wrap ${
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

                </div>
                );
            })}
          </div>
          
          { bioData?.copyright ? ( 
            <footer className="text-center p-4 mt-6">
              <p className="text-gray-600 font-medium">
                Feito com ❤️ por <span className="font-bold">
                  <a target="_blank" href="https://cliquenabio.com.br/">CliqueNaBio</a></span>
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

