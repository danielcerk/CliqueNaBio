"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Facebook, Instagram, Twitter, Linkedin, Youtube, Globe, 
  Github, Twitch, Figma, Dribbble
} from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { LucideProps } from 'lucide-react';

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  TikTok: Globe,
  YouTube: Youtube,
  Figma: Figma,
  Dribbble: Dribbble,
  Medium: Globe,
  Behance: Globe,
  Twitch: Twitch,
  Reddit: Globe,
  Bluesky: Globe,
  GitHub: Github,
  Pinterest: Globe,
};

const socialPatterns: Record<SocialIconKey, RegExp> = {
  Facebook: /facebook\.com\/(?:profile\.php\?id=)?([^\/?&]+)/,
  Instagram: /instagram\.com\/([^\/?&]+)/,
  Twitter: /twitter\.com\/([^\/?&]+)/,
  LinkedIn: /linkedin\.com\/in\/([^\/?&]+)/,
  TikTok: /tiktok\.com\/@([^\/?&]+)/,
  YouTube: /youtube\.com\/(?:user|channel)\/([^\/?&]+)/,
  Figma: /figma\.com\/([^\/?&]+)/,
  Dribbble: /dribbble\.com\/([^\/?&]+)/,
  Medium: /medium\.com\/@([^\/?&]+)/,
  Behance: /behance\.net\/([^\/?&]+)/,
  Twitch: /twitch\.tv\/([^\/?&]+)/,
  Reddit: /reddit\.com\/user\/([^\/?&]+)/,
  Bluesky: /bsky\.app\/profile\/([^\/?&]+)/,
  GitHub: /github\.com\/([^\/?&]+)/,
  Pinterest: /pinterest\.com\/([^\/?&]+)/,
};

const socialColors: Record<SocialIconKey, string> = {
  Facebook: "text-blue-600", // Azul do Facebook
  Instagram: "text-pink-500", // Rosa do Instagram
  Twitter: "text-blue-400", // Azul claro do Twitter (X)
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

const getSocialIcon = (url: string): React.ComponentType<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> => {
  for (const [name, pattern] of Object.entries(socialPatterns)) {
    if (pattern.test(url)) {
      return socialIcons[name as SocialIconKey] || Globe;
    }
  }
  return Globe;
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
  console.log("MobileScreen rendering with data:", bioData) // Add this line for debugging
  const [imageLoaded, setImageLoaded] = useState(true);

  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };


  return (
    <div className="lg:max-w-6xl mx-auto lg:flex justify-around">
      <Card className="relative min-w-full lg:min-w-[500px] min-h-screen rounded-none bg-white overflow-hidden">

        <ScrollArea className="h-[calc(100%-4rem)] p-4">
          <div className="bg-white p-2 py-20 rounded-xl">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mt-5 shadow">
                <AvatarImage src={bioData.image} alt={bioData.name} />
                <AvatarFallback>{bioData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="mt-4 font-medium capitalize">{bioData.name}</p>
              <p className="mt-2 text-gray-700 text-sm max-w-[400px] mx-auto">{bioData.biografy}</p>
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
                      const Icon = getSocialIcon(item.url || "");
                      const socialKey = Object.keys(socialPatterns).find((key) =>
                        socialPatterns[key as SocialIconKey].test(item.url || "")
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

          <hr />
          <div className="mt-5">

          <div className="columns-2 gap-0 max-w-[500px]">
            {bioData.content
              .sort((a, b) => {
                const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
                const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
                return dateB.getTime() - dateA.getTime();
              })
              .map((item) => {
                const isLarge = item.content.length > 100; // Exemplo: se o conteúdo for muito longo
                return (
                  <div
                    key={item.id}
                    className={`overflow-hidden flex flex-col items-center ${
                      isLarge ? "col-span-full" : "break-inside-avoid"
                    }`}
                  >
                      {item.type === "link" && !item.is_profile_link && (
                        <Link
                        href={item.url || ""}
                        target="_blank" className="w-full mt-5 cursor-pointer max-w-[90%] py-2 transition-transform transform hover:scale-105">
                          {item.og_image && (
                            <Image
                              src={item.og_image}
                              layout="fill"
                              objectFit="cover"
                              alt={`Imagem de Capa do Link de ${item.url} na CliqueNaBio`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          )}
                          <div
                            className="flex flex-col items-center gap-2 w-full h-full justify-center"
                          >
                            <div
                              className={`w-full border rounded p-5 shadow ${
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

                              <div className="flex flex-col items-start">
                                <span
                                  className="z-10 text-xl font-semibold capitalize inline-block whitespace-wrap"
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
                        <div className="w-full max-w-[90%] bg-white mt-5 transition-transform transform hover:scale-90 cursor-pointer">
                      <Image
                        src={item.url}
                        alt="Imagem de Capa na CliqueNaBio"
                        width={800}
                        height={600}
                        objectFit="cover"
                      />


                          {/* <div className="p-4">
                            <p className="text-gray-800 font-medium capitalize">{item.content}</p>
                            {item.small_description && (
                              <p className="text-gray-600 text-sm capitalize">{item.small_description}</p>
                            )}
                            {item.updated_at && (
                              <p className="text-gray-500 text-end text-xs">
                                Publicado: {new Date(item.updated_at).toLocaleDateString()}
                              </p>
                            )}
                          </div> */}
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
        </ScrollArea>
      </Card>
    </div>
  )
}

export default MobileScreen

