"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"
import {  MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, hoverColor: "hover:text-pink-500" },
  { href: "https://facebook.com", icon: Facebook, hoverColor: "hover:text-blue-600" },
  { href: "https://twitter.com", icon: Twitter, hoverColor: "hover:text-blue-400" },
  { href: "https://linkedin.com", icon: Linkedin, hoverColor: "hover:text-blue-700" },
  { href: "https://youtube.com", icon: Youtube, hoverColor: "hover:text-red-600" },
]

interface ContentItem {
  id: string
  type: "link" | "photo" | "text"
  content: string
  url?: string
}

interface BioData {
  name: string
  biografy: string
  image: string
  content: ContentItem[]
  location: string
}

interface MobileScreenProps {
  bioData: BioData
}

const MobileScreen: React.FC<MobileScreenProps> = ({ bioData }) => {
  console.log("MobileScreen rendering with data:", bioData) // Add this line for debugging

  return (
    <div className="lg:max-w-6xl mx-auto lg:flex justify-around min-h-screen p-4">
      <Card className="relative min-w-full lg:min-w-[500px] min-h-[640px] bg-white  rounded-3xl overflow-hidden">
        <header className="bg-gray-800 p-4 text-white text-center">
          <h1 className="font-bold text-xl">Sua Bio</h1>
        </header>

        <ScrollArea className="h-[calc(100%-4rem)] p-4">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mt-5">
              <AvatarImage src={bioData.image} alt={bioData.name} />
              <AvatarFallback>{bioData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="mt-4 font-medium">{bioData.name}</p>
            <p className="mt-2 text-gray-700 text-sm max-w-[400px] mx-auto">{bioData.biografy}</p>
            {bioData.location && (
            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{bioData.location}</span>
            </div>
          )}
          </div>
          
          <section className="flex items-center justify-center gap-6 p-6 rounded-lg ">
            {socialLinks.map(({ href, icon: Icon, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={`Visit our ${Icon.name} page`}
              >
                <Icon
                  className={`w-7 h-7 text-gray-600 ${hoverColor} transition-all duration-300 transform group-hover:scale-110`}
                />
              </a>
            ))}
          </section>

          <div className="mt-10 space-y-4 ">
            {bioData.content.map((item) => (
              <div key={item.id} className="border-b pb-4">
           
              {item.type === "link" && (
                  <div className="w-full ">
                    <Link href={item.url || ""} target="_blank" className="flex flex-col items-center gap-2">
                      {/* Placeholder para o iframe */}
                      <div className="w-full h-64 border rounded bg-gray-200 flex items-center justify-center shadow-md">
                        <span className="text-gray-500">Visualização não disponível</span>
                      </div>

                      {/* Ícone e nome da plataforma */}
                      {item.url?.includes("instagram.com") ? (
                        <div className="flex items-center gap-2 mt-3">
                          <Image
                            src="https://i.pinimg.com/236x/ae/a3/35/aea335fd233887bd3057d9a01b111828.jpg"
                            alt="Instagram"
                            className="w-5 h-5 rounded-xl object-cover"
                            width={24} height={24}
                          />
                          <span className="text-gray-700">Instagram</span>
                        </div>
                      ) : item.url?.includes("facebook.com") ? (
                        <div className="flex items-center gap-2 mt-3">
                          <Image
                            src="https://i.pinimg.com/236x/25/ea/59/25ea5941311b06c6cec08f99bf5d72a5.jpg"
                            alt="Facebook"
                            className="w-5 h-5 rounded-xl object-cover"
                            width={24} height={24}
                          />
                          <span className="text-gray-700">Facebook</span>
                        </div>
                      ) : item.url?.includes("twitter.com") ? (
                        <div className="flex items-center gap-2 mt-3">
                          <Image
                            src="/caminho/para/twitter-placeholder.jpg"
                            alt="Twitter"
                            className="w-5 h-5 rounded-xl object-cover"
                            width={24} height={24}
                          />
                          <span className="text-gray-700">Twitter</span>
                        </div>
                      ) : item.url?.includes("youtube.com") ? (
                        <div className="flex items-center gap-2 mt-3">
                          <Image
                            src="https://i.pinimg.com/236x/ca/d6/03/cad6039c053896e2719e664ff6b16705.jpg"
                            alt="Youtube"
                            className="w-5 h-5 rounded-xl object-cover"
                            width={24} height={24}
                          />
                          <span className="text-gray-700">Youtube</span>
                        </div>
                      ) : item.url?.includes("linkedin.com") ? (
                        <div className="flex items-center gap-2 mt-3">
                          <Image
                            src="/caminho/para/linkedin-placeholder.jpg"
                            alt="LinkedIn"
                            className="w-5 h-5 rounded-xl object-cover"
                            width={24} height={24}
                          />
                          <span className="text-gray-700">LinkedIn</span>
                        </div>
                      ) : null}
                    </Link>
                  </div>
                )}

              

              
                {item.type === "photo" && (
                  <div className="relative w-full h-48">
                    <Image
                      src={item.content || "/placeholder.svg"}
                      alt="User uploaded image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                )}
                {item.type === "text" && <p className="text-sm">{item.content}</p>}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}

export default MobileScreen

