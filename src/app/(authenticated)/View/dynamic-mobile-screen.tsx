"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Globe, MapPin } from "lucide-react"
import Image from "next/image"

interface ContentItem {
  id: string
  type: "link" | "photo" | "text"
  content: string
  url?: string
}

interface BioData {
  name: string
  username: string
  biografy: string
  profilePicture: string
  content: ContentItem[]
  location: string
}

interface MobileScreenProps {
  bioData: BioData
}

const MobileScreen: React.FC<MobileScreenProps> = ({ bioData }) => {
  console.log("MobileScreen rendering with data:", bioData) // Add this line for debugging

  return (
    <div className="max-w-6xl mx-auto flex justify-around items-center min-h-screen p-4">
      <Card className="relative w-[360px] h-[640px] bg-white border-8 border-gray-300 rounded-3xl overflow-hidden">
        <header className="bg-gray-800 p-4 text-white text-center">
          <h1 className="font-bold text-xl">Your Bio</h1>
        </header>

        <ScrollArea className="h-[calc(100%-4rem)] p-4">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={bioData.profilePicture} alt={bioData.name} />
              <AvatarFallback>{bioData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold">{bioData.name}</h2>
            <p className="text-sm text-gray-500">{bioData.username}</p>
            <p className="mt-2 text-sm">{bioData.biografy}</p>
          </div>

          <div className="mt-4 space-y-4">
            {bioData.content.map((item) => (
              <div key={item.id} className="border-b pb-4">
                {item.type === "link" && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>{item.url}</span>
                    </a>
                  </Button>
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

          {bioData.location && (
            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{bioData.location}</span>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  )
}

export default MobileScreen

