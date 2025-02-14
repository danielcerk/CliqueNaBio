"use client"

import { useState, useEffect } from "react"
import MobileScreen from "./dynamic-mobile-screen"
import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import Cookie from "js-cookie"
import { nanoid } from "nanoid"; // Importe nanoid para gerar chaves únicas

interface ContentItem {
  id: string
  type: "link" | "photo" | "text"
  content: string
  url?: string 
}

interface ApiResponse {
  results: ContentItem[];
}


interface BioData {
  name: string
  biografy: string
  profilePicture: string
  content: ContentItem[]
  location: string
}

interface UserData {
  name: string
  biografy: string
  profilePicture: string
  location: string
}

export default function View() {
  const token = Cookie.get("access_token")

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

  const [linkData, loadingLink, errorLink] = useAxios<ApiResponse>({
    axiosInstance,
    method: "get",
    url: userData ? `/api/v1/account/me/link/` : null, // Use null para pular a requisição
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [bioData, setBioData] = useState<BioData>({
    name: "",
    biografy: "",
    profilePicture: "",
    content: [],
    location: "",
  })

  useEffect(() => {
    if (userData) {
      setBioData((prev) => ({
        ...prev,
        name: userData.name || "",
        biografy: userData?.biografy || "",
        profilePicture: userData.profilePicture || "",
        location: userData.location || "Serrinha-BA",
      }))
    }
  }, [userData])

  useEffect(() => {
    if (linkData && Array.isArray(linkData.results)) {
      console.log("Links carregados:", linkData.results);
      setBioData((prev) => ({
        ...prev,
        content: linkData.results.map((link) => ({
          id: nanoid(), // Gera uma chave única
          type: "link",
          content: link.url || "", // Fornece um valor padrão se link.url for undefined
          url: link.url || "", // Fornece um valor padrão se link.url for undefined
        })),
      }));
    } else if (linkData === null) {
      console.log("Requisição de links ignorada (userData não disponível).");
    } else {
      console.error("Erro na resposta da API de links: resposta inválida", linkData);
    }
  }, [linkData]);

  if (loadingUser || loadingLink) {
    return <div>Carregando...</div>
  }

  if (errorUser || errorLink) {
    return <div>Erro ao carregar dados</div>
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mx-auto">
        <MobileScreen bioData={bioData} />
      </div>
    </div>
  )
}