"use client";

import { useState, useEffect } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import { useParams } from "next/navigation"; 
import { nanoid } from "nanoid";

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
  name: string;
  biografy: string;
  image: string;
  content: ContentItem[];
  form_contact: boolean;
  copyright: boolean;
}

export default function ViewBio() {
  const { slug } = useParams();
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setError("Slug não encontrado na URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Define um User-Agent customizado para evitar bloqueios
        const headers = {
          "User-Agent": navigator.userAgent.includes("Instagram") 
            ? "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            : navigator.userAgent,
        };

        const response = await axiosInstance.get(`/api/v1/profile/${slug}/`, { headers });
        const profileData = response.data;

        const links = profileData.links.map((link: any) => ({
          id: nanoid(),
          type: "link" as const,
          content: link.url || "",
          url: link.url || "",
          owner: link.owner || "",
          title: link.title || "",
          og_image: link.og_image || "",
          is_profile_link: link.is_profile_link || false,
          social_network: link.social_network || "",
          username: link.username || "",
          icon: link.icon || "",
          created_at: link.created_at || "",
          updated_at: link.updated_at || "",
        }));

        const snaps = profileData.snaps.map((snap: any) => ({
          id: nanoid(),
          type: "photo" as const,
          content: snap.name || "",
          url: snap.image || "",
          small_description: snap.small_description || "",
          updated_at: snap.updated_at || snap.created_at || "",
        }));

        setBioData({
          name: profileData.name,
          biografy: profileData.biografy,
          image: profileData.image,
          content: [...links, ...snaps],
          form_contact: profileData.form_contact,
          copyright: profileData.copyright,
        });
      } catch (err) {
        
          let errorMessage = "Erro ao carregar dados.";
        
          if (axios.isAxiosError(err)) {
              // Se o erro for do Axios, você pode acessar suas propriedades
              errorMessage += ` ${err.response?.data?.message || err.message}`;
          } else if (err instanceof Error) {
              // Se for um erro padrão, você pode acessar a mensagem
              errorMessage += ` ${err.message}`;
          } else {
              // Para outros tipos de erros desconhecidos
              errorMessage += " Erro desconhecido.";
          }
        
          setError(errorMessage); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:mx-auto">
        {bioData && <MobileScreen bioData={bioData} />}
      </div>
    </div>
  );
}
