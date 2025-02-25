"use client";

import { useState, useEffect, useCallback } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import { useParams } from "next/navigation"; // Importe useParams para pegar o slug da URL
import { nanoid } from "nanoid";
import { AlertModal } from '@/components/common/AlertModal';
import UserNotFound from "@/app/user-not-found";
import LoadingSkeleton from "./loading-skeleton";
// import { Metadata } from "next";

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


// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   try {
//     const response = await axiosInstance.get(`/api/v1/profile/${params.slug}/`);
//     const profile = response.data;

//     return {
//       title: `${profile.name} | Perfil Público`,
//       description: profile.biografy,
//       openGraph: {
//         title: `${profile.name} | Perfil Público`,
//         description: profile.biografy,
//         images: [{ url: profile.image }],
//       },
//     };
//   } catch (error) {
//     return {
//       title: "Usuário não encontrado",
//       description: "O perfil solicitado não foi encontrado.",
//     };
//   }
// }

export default function ViewBio() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Função para mostrar o alerta
  const showAlert = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  }, []);

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
          showAlert('error', 'Usuário não encontrado na URL!');
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
  }, [slug]);



  return (
    <>
      {loading ? (
          <div className="flex flex-col lg:flex-row">
          <div className="lg:mx-auto">
            <LoadingSkeleton />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          {error ? (
             <UserNotFound></UserNotFound>
          ) : (
            <div className="lg:mx-auto">
              <MobileScreen bioData={bioData} />
            </div>
          )}
          <AlertModal
            type={modalType}
            message={modalMessage}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}