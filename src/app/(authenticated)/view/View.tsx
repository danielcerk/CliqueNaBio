"use client";

import { JSX } from "react";
import { useState, useEffect } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import { nanoid } from "nanoid";
import Cookie from "js-cookie";
import LoadingSkeleton from "./loading-skeleton";
import { AlertModal } from '@/components/common/AlertModal';

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

const View = (): JSX.Element | null =>{
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
  const [publicLink, setPublicLink] = useState(""); // Estado para armazenar o link público

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Função para mostrar o alerta
  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Busca os dados do usuário autenticado
        const token = Cookie.get("access_token");
        if (!token) showAlert('error', 'Token não encontrado');

        const userResponse = await axiosInstance.get("/api/v1/account/me/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userResponse.data;

        // Verifica se o slug está presente nos dados do usuário
        if (userData.slug) {
          const URL = process.env.NODE_ENV === 'production' 
            ? 'https://cliquenabio.vercel.app/' 
            : 'http://localhost:3000/';

          // Gera o link público com base no slug
          const link = `${URL}profile/${userData.slug}`;
          setPublicLink(link);

        } else {
          showAlert('error', 'Slug não encontrado nos dados do usuário.')
        }

        // Busca os links e snaps do usuário
        const [linkResponse, snapResponse] = await Promise.all([
          axiosInstance.get("/api/v1/account/me/link/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/api/v1/account/me/snap/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const links = linkResponse.data.results.map((link: any) => ({
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

        const snaps = snapResponse.data.results.map((snap: SnapItem) => ({
          id: nanoid(),
          type: "photo" as const,
          content: snap.name || "",
          url: snap.image || "",
          small_description: snap.small_description || "",
          updated_at: snap.updated_at || snap.created_at || "",
        }));

        setBioData({
          name: userData.name,
          biografy: userData.biografy,
          image: userData.image,
          content: [...links, ...snaps],
          form_contact: userData.form_contact,
          copyright: userData.copyright,
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => {
    if (error) {
      showAlert('error', 'Erro ao carregar dados.');
    }
  }, [error]);
  
  // Função para copiar o link público
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink)
      .then(() => showAlert('success', 'Link copiado para a área de transferência!'))
      .catch(() => showAlert('error', 'Erro ao copiar o link.'));
  };

  if (loading) return <LoadingSkeleton></LoadingSkeleton>;
  if (error) return null; 



  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mx-auto">

        {publicLink && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Seu link público:</p>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={publicLink}
                readOnly
                className="flex-1 p-2 border text-gray-700 border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>
        )}

        <MobileScreen bioData={bioData} />
      </div>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}



export default View;