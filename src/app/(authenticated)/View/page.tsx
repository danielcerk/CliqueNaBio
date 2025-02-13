"use client"

import { useState, useEffect } from "react"
import MobileScreen from "./dynamic-mobile-screen"
import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import Cookie from "js-cookie"

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

// Interface para userData
interface UserData {
  name: string
  username: string
  biografy: string
  profilePicture: string
  location: string
}

export default function View() {
  const token = Cookie.get("access_token")

  // Tipando o retorno do useAxys
  const [userData, loadingUser, errorUser] = useAxios<UserData>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const [bioData, setBioData] = useState<BioData>({
    name: "",
    username: "",
    biografy: "",
    profilePicture: "",
    content: [],
    location: "",
  })

  useEffect(() => {
    if (userData) {
      // Agora o TypeScript sabe que userData é do tipo UserData
      setBioData({
        name: userData.name || "",
        username: userData.username || "O brabo",
        biografy: userData?.biografy || "",
        profilePicture: userData.profilePicture || "",
        content: [],
        location: userData.location || "Serrinha-BA",
      })
    }
  }, [userData])

  if (loadingUser) {
    return <div>Carregando...</div>
  }

  if (errorUser) {
    return <div>Erro: {errorUser}</div>
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mx-auto">
        <MobileScreen bioData={bioData} />
      </div>
    </div>
  )
}