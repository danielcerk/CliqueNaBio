"use client";

import { JSX } from "react";
import { useState, useEffect } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import { nanoid } from "nanoid";
import Cookie from "js-cookie";
import LoadingSkeleton from "./loading-skeleton";
import { AlertModal } from '@/components/common/AlertModal';
import { BioData, SnapItem, NoteItem} from "../../../lib/types"
import ThemeEditorModal from './ThemeEditorModal';
import { Button } from "@/components/ui/button";

interface Theme {
  background_color?: string; 
  foreground_color?: string; 
  font_family?: string; 
}

const View = (): JSX.Element | null =>{
  const [bioData, setBioData] = useState<BioData>({
    id:'',
    name: "",         
    biografy: "",     
    image: "",  
    banner: "",      
    content: [],      
    form_contact: false,  
    copyright: false,    
    theme: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [publicLink, setPublicLink] = useState(""); // Estado para armazenar o link público

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false); 

 
  const [currentTheme, setCurrentTheme] = useState<Theme>({
    background_color: "#ffffff",
    foreground_color: "#000000",
    font_family: "Arial, sans-serif",
  })


  // Função para mostrar o alerta
  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleSaveTheme = async (editedTheme: Theme) => {
    try {
      const token = Cookie.get("access_token"); // Recupera o token do cookie
      if (!token) {
        showAlert('error', 'Token não encontrado. Faça login novamente.');
        return;
      }
  
      // Envia as alterações para o backend com o token no cabeçalho
      await axiosInstance.put("/api/v1/account/theme/", {
        background_color: editedTheme.background_color,
        foreground_color: editedTheme.foreground_color,
        font_family: editedTheme.font_family,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });
  
      // Atualiza o tema no bioData
      setBioData((prevData) => ({
        ...prevData,
        theme: [editedTheme],
      }));

      setCurrentTheme(editedTheme)
  
      showAlert('success', 'Tema atualizado com sucesso!');
    } catch (error) {
      if (error) {
        showAlert('error', 'Sessão expirada. Faça login novamente.');
      } else {
        console.error("Erro ao atualizar tema:", error);
        showAlert('error', 'Erro ao atualizar tema.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = Cookie.get("access_token");
        if (!token) showAlert('error', 'Token não encontrado');

        const userResponse = await axiosInstance.get("/api/v1/account/me/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userResponse.data;


        if (userData.slug) {
          const URL = process.env.NODE_ENV === 'production' 
            ? 'https://cliquenabio.com.br/' 
            : 'http://localhost:3000/';

          const link = `${URL}@${userData.slug}`;
          setPublicLink(link);

        } else {
          showAlert('error', 'Slug não encontrado nos dados do usuário.')
        }

        // Busca os links e snaps do usuário
        const [linkResponse, snapResponse, themeResponse, noteResponse] = await Promise.all([
          axiosInstance.get("/api/v1/account/me/link/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/api/v1/account/me/snap/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/api/v1/account/theme/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/api/v1/account/me/note/", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const links = linkResponse.data.map((link: any) => ({
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

        const snaps = snapResponse.data.map((snap: SnapItem) => ({
          id: nanoid(),
          type: "photo" as const,
          content: snap.name || "",
          url: snap.image || "",
          small_description: snap.small_description || "",
          updated_at: snap.updated_at || snap.created_at || "",
        }));

        const notes = noteResponse.data.map((note: NoteItem)=> ({
          id: note?.id,
          type: "note",
          content: note?.text || "",
          created_at: note?.created_at || new Date().toISOString(),
          updated_at: note?.updated_at || new Date().toISOString(),
          created: true,
        }))

        const themeData = themeResponse.data;

        setBioData({
          id: userData.id,
          name: userData.name,
          biografy: userData.biografy,
          image: userData.image,
          banner: userData.banner,
          content: [...links, ...snaps, ...notes],
          form_contact: userData.form_contact,
          copyright: userData.copyright,
          theme: [themeData], // Use o tema do backend, se existir
        });
        console.log("aqui")
        console.log(themeData)
        console.log("Não")

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
  
    <div className="flex flex-col lg:flex-row  pt-10" style={{
      backgroundColor: bioData.theme[0]?.background_color || 'white',
      color: bioData.theme[0]?.foreground_color || 'black',
      fontFamily: bioData.theme[0]?.font_family || 'Arial, sans-serif',
    }}>
      <div className="flex flex-col items-center w-full">

        {publicLink && (
          <div className="w-full lg:max-w-5xl">
            <div className="mt-4 p-4 rounded-lg max-w-3xl ">
              <p className="text-sm font-medium ">Seu link público:</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={publicLink}
                  readOnly
                  className="flex-1 p-2 bg-white border border-gray-500 text-black rounded-lg text-sm "
                />
                <Button
                  onClick={handleCopyLink}
                  className="p-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Copiar
                </Button>
              </div>

              <Button onClick={() => setIsThemeEditorOpen(true)} className="my-8 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
                Alterar tema
              </Button>
            </div>
          </div>
        )}

        <MobileScreen bioData={bioData} />
      </div>

      <ThemeEditorModal
        isOpen={isThemeEditorOpen}
        onClose={() => setIsThemeEditorOpen(false)}
        initialTheme={currentTheme}
        onSave={handleSaveTheme}
      />

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}



export default View;