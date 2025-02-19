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
  small_description?: string
  updated_at?: string
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

          <div className="mt-10">

          <div className="columns-1 gap-6">
            {bioData.content.map((item) => (
              <div key={item.id} className=" overflow-hidden flex flex-col items-center">
                {item.type === "link" && (
                  <div className="w-full max-w-[90%] mt-5 py-2 transition-transform transform hover:scale-105">
                    <Link
                      href={item.url || ""}
                      target="_blank"
                      className="flex flex-col items-center gap-2 w-full h-full justify-center "
                    >
                      <div className="w-full h-8 border rounded bg-gray-200 flex items-center justify-center shadow">
                        <span className="text-gray-500 text-sm">Visualização não disponível</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
        
                          {item.url?.includes("instagram.com") && (
                            <div className="flex items-center gap-2">
                              <Image
                                src="https://i.pinimg.com/236x/ae/a3/35/aea335fd233887bd3057d9a01b111828.jpg"
                                alt="Instagram"
                                className="w-8 h-8 rounded-xl object-cover"
                                width={32}
                                height={32}
                              />
                              <span className="text-gray-700 text-sm">Instagram</span>
                            </div>
                          )}

                          {item.url?.includes("facebook.com") && (
                            <div className="flex items-center gap-2">
                              <Image
                                src="https://i.pinimg.com/236x/25/ea/59/25ea5941311b06c6cec08f99bf5d72a5.jpg"
                                alt="Facebook"
                                className="w-8 h-8 rounded-xl object-cover"
                                width={32}
                                height={32}
                              />
                              <span className="text-gray-700 text-sm">Facebook</span>
                            </div>
                          )}

                          {item.url?.includes("twitter.com") && (
                            <div className="flex items-center gap-2">
                              <Image
                                src="/caminho/para/twitter-placeholder.jpg"
                                alt="Twitter"
                                className="w-8 h-8 rounded-xl object-cover"
                                width={32}
                                height={32}
                              />
                              <span className="text-gray-700 text-sm">Twitter</span>
                            </div>
                          )}

                          {item.url?.includes("youtube.com") && (
                            <div className="flex items-center gap-2">
                              <Image
                                src="https://i.pinimg.com/236x/ca/d6/03/cad6039c053896e2719e664ff6b16705.jpg"
                                alt="Youtube"
                                className="w-8 h-8 rounded-xl object-cover"
                                width={32}
                                height={32}
                              />
                              <span className="text-gray-700 text-sm">Youtube</span>
                            </div>
                          )}

                          {item.url?.includes("linkedin.com") && (
                            <div className="flex items-center gap-2">
                              <Image
                                src="/caminho/para/linkedin-placeholder.jpg"
                                alt="LinkedIn"
                                className="w-8 h-8 rounded-xl object-cover"
                                width={32}
                                height={32}
                              />
                              <span className="text-gray-700 text-sm">LinkedIn</span>
                            </div>
                          )}
                      </div>
                    </Link>
                  </div>
                )}

                {item.type === "photo" && item.url && (
                  <div className="w-full rounded-xl max-w-[90%]">
                    <div className="relative mt-5 w-full aspect-square rounded-lg overflow-hidden transition-transform transform hover:scale-90 cursor-pointer">
                      <Image
                        src={item.url}
                        alt={item.content}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-800 font-medium">{item.content}</p>
                      {item.small_description && (
                        <p className="text-gray-600 text-sm">{item.small_description}</p>
                      )}
                      {item.updated_at && (
                        <p className="text-gray-500 text-end text-xs">{new Date(item.updated_at).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                )}

                {item.type === "text" && (
                  <p className="text-sm bg-gray-100 p-4 rounded-lg shadow-inner w-full text-center">{item.content}</p>
                )}
              </div>
            ))}
          </div>


          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}

export default MobileScreen

