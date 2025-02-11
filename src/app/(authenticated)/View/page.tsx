
"use client"

import { useState } from "react"
import MobileScreen from "./dynamic-mobile-screen"

interface ContentItem {
  id: string
  type: "link" | "photo" | "text"
  content: string
  url?: string
}

interface BioData {
  name: string
  username: string
  bio: string
  profilePicture: string
  content: ContentItem[]
  location: string
}

export default function View() {
  // const [bioData, setBioData] = useState<BioData>({
  //   name: "Thiago Bonitão",
  //   username: "O brabo",
  //   bio: "Aquele que diz manjar, mas não manja",
  //   profilePicture: "/cartoon.png",
  //   content: [],
  //   location: "Serrinha-BA",
  // })

  const [bioData] = useState<BioData>({
    name: "Thiago Bonitão",
    username: "O brabo",
    bio: "Aquele que diz manjar, mas não manja",
    profilePicture: "/cartoon.png",
    content: [],
    location: "Serrinha-BA",
  })


  return (
    <div className="flex flex-col lg:flex-row">

      <div className="mx-auto">
        <MobileScreen bioData={bioData} />
      </div>
    </div>
  )
}


