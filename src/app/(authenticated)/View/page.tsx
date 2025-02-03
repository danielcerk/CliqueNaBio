"use client"

import { useState } from "react"
import BioEditor from "@/app/(authenticated)/Create/page"
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
  const [bioData, setBioData] = useState<BioData>({
    name: "",
    username: "",
    bio: "",
    profilePicture: "https://via.placeholder.com/150",
    content: [],
    location: "",
  })

  // const handleSave = (data: BioData) => {
  //   console.log("Saving data:", data)
  //   setBioData(data)
  // }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* <div className="lg:w-2/3">
        <BioEditor onSave={handleSave} initialData={bioData} />
      </div> */}
      <div className="mx-auto">
        <MobileScreen bioData={bioData} />
      </div>
    </div>
  )
}

