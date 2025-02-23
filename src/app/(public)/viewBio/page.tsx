"use client";

import { useState, useEffect } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import { useParams } from "next/navigation"; // Importe useParams para pegar o slug da URL
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

interface SnapItem {
  id: string;
  name: string;
  small_description: string;
  image: string;
  created_at: string;
  updated_at: string;
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
  const { slug } = useParams(); // Pegue o slug da URL
  const [bioData, setBioData] = useState<BioData>({
    name: "",
    biografy: "",
    image: "",
    content: [],
    form_contact: false,
    copyright: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Verifique se o slug está presente
        if (!slug) {
          throw new Error("Slug não encontrado na URL.");
        }

  
        // Busca os dados públicos do perfil
        const profileResponse = await axiosInstance.get(`/api/v1/profile/${slug}/`);
        const profileData = profileResponse.data;
  
        // Mapeia os links e snaps para o formato esperado
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
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Execute o efeito sempre que o slug mudar

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados.</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:mx-auto">
        <MobileScreen bioData={bioData} />
      </div>
    </div>
  );
}