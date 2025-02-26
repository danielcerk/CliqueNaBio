"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ImageIcon, Trash2, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Cookie from "js-cookie";
import LoadingSkeleton from "./loading-skeleton";
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import { cloudinaryUpload } from "@/hooks/cloudinaryUpload";
import { deleteImageFromCloudinary } from "@/hooks/cloudinaryUpload";
import { createLink } from "@/hooks/use-links";
import { createSnap } from "@/hooks/use-snaps";
import { nanoid } from "nanoid";
import { AlertModal } from '@/components/common/AlertModal';
import { AddContentModal } from "./AddContentModal";


interface ContentItem {
  id: string;
  type: "link" | "photo";
  content: string;
  url?: string;
  name?: string;
  title?: string;
  is_profile_link?: boolean;
  small_description?: string;
  created?: boolean;
}

interface BioData {
  content: ContentItem[];
}

interface UserData {
  id: string;
  plan?: "GRÁTIS" | "CONEXÃO" | "INFLUÊNCIA";
  name?: string;
}

interface SnapItem {
  id: string;
  name: string;
  small_description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface SnapApiResponse {
  results: SnapItem[];
}

const BioEditor = () => {
  const token = Cookie.get("access_token");

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Estados para o modal de criação de conteúdo
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [contentType, setContentType] = useState<"link" | "photo">("link");

  // Função para mostrar o alerta
  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const [userData, loadingUser, errorUser] = useAxios<UserData | null>({
    axiosInstance,
    method: "get",
    url: "/api/v1/account/me/",
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const username = userData?.name || "";

  const [bioData, setBioData] = useState<BioData>({
    content: [],
  });

  const [planLimits, setPlanLimits] = useState({ maxLinks: 0, maxSnaps: 0 });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingSave, setLoadingSave] = useState<string | null>(null); 

  const generateUniqueId = () => `${Date.now()}-${nanoid()}`;

  useEffect(() => {
    if (userData && typeof userData === "object" && "plan" in userData) {
      const plan = userData.plan ?? "GRÁTIS";
      const limits = {
        GRÁTIS: { maxLinks: 3, maxSnaps: 10 },
        CONEXÃO: { maxLinks: 6, maxSnaps: 50 },
        INFLUÊNCIA: { maxLinks: Infinity, maxSnaps: Infinity },
      };
      setPlanLimits(limits[plan] || limits["GRÁTIS"]);
    } else {
      setPlanLimits({ maxLinks: 3, maxSnaps: 10 }); // Define um valor padrão
    }
  }, [userData]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const userResponse = await axiosInstance.get("/api/v1/account/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const userData = userResponse.data;
      const [linkResponse, snapResponse] = await Promise.all([
        axiosInstance.get("/api/v1/account/me/link/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axiosInstance.get("/api/v1/account/me/snap/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
  
      const links = linkResponse.data.results.map((link: any) => ({
        id: link?.id, 
        type: "link",
        content: link?.url || "",
        url: link?.url || "",
        title: link?.title || "",
        is_profile_link: link?.is_profile_link || false,
        created: true,
      }));
  
      const snaps = snapResponse.data.results.map((snap: SnapItem) => ({
        id: snap?.id, 
        type: "photo",
        content: snap?.image || "",
        url: snap?.image || "",
        name: snap?.name || "",
        small_description: snap?.small_description || "",
        created: true,
      }));
  
      setBioData({
        content: [...links, ...snaps],
      });
    } catch (err) {

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [token]);

  const addContent = (type: "link" | "photo") => {
    const linksCount = bioData.content.filter((item) => item.type === "link").length;
    const snapsCount = bioData.content.filter((item) => item.type === "photo").length;
  
    if ((type === "link" && linksCount >= planLimits.maxLinks) || (type === "photo" && snapsCount >= planLimits.maxSnaps)) {
      setShowErrorModal(true);
      return;
    }
  
    setContentType(type);
    setIsAddContentModalOpen(true);
  };

  const handleSaveNewContent = async (data: { url?: string; title?: string; name?: string; small_description?: string; image?: string }) => {
    const newContent: ContentItem = {
      id: generateUniqueId(),
      type: contentType,
      content: contentType === "link" ? data.url || "" : data.image || "",
      url: data.url,
      name: data.name,
      title: data.title,
      small_description: data.small_description,
      created: false,
    };
  
    // Adiciona o novo item ao estado
    setBioData((prev) => ({ ...prev, content: [...prev.content, newContent] }));
  
    // Salva o conteúdo no backend
    await saveContent(newContent);
  
    setIsAddContentModalOpen(false);
  };

  const updateContent = (
    id: string,
    content: string,
    url?: string,
    name?: string,
    title?: string,
    small_description?: string
  ) => {
    setBioData((prev) => ({
      ...prev,
      content: prev.content.map((item) =>
        item.id === id
          ? {
              ...item,
              content,
              url: url !== undefined ? url : item.url, 
              name: name !== undefined ? name : item.name, 
              title: title !== undefined ? title : item.title, 
              small_description: small_description !== undefined ? small_description : item.small_description, 
            }
          : item
      ),
    }));
  };

  const removeContent = (id: string) => {
    setBioData((prev) => ({
      ...prev,
      content: prev.content.filter((item) => item.id !== id),
    }));
  };

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      try {
        const imageUrl = await cloudinaryUpload(file);
        updateContent(id, imageUrl);
      } catch (error) {
        showAlert('error', 'Erro ao fazer upload da imagem. Tente novamente.');
      }
    }
  };

  const saveContent = async (item: ContentItem) => {
    setLoadingSave(item.id); 
    try {
      if (item.type === "link") {
        const linkData = {
          url: item.url || "",
          title: item.title || "",
          social_network: "",
          username: username,
        };
  
        if (!isValidUrl(linkData.url)) {
          showAlert('error', 'Por favor, insira um URL válido.');
          return;
        }
  
        // Salva o link no backend
        await createLink(axiosInstance, linkData);
      } else if (item.type === "photo") {
        const snapData = {
          name: item.name || "My Snap",
          small_description: item.small_description || "",
          image: item.content || "",
        };
  
        // Salva o snap no backend
        await createSnap(axiosInstance, snapData);
      }
      await fetchContent(); 
    } catch (error) {
      showAlert('error', 'Erro ao salvar conteúdo. Tente novamente.');
    } finally {
      setLoadingSave(null);
    }
  };
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  

  const updateItem = async (item: ContentItem) => {
    setLoadingSave(item.id); 
    try {
      if (item.type === "link") {
        const linkData = {
          url: item.url || "",
          title: item.title || "",
          social_network: "",
          username: username,
        };
  
        if (!isValidUrl(linkData.url)) {
          showAlert('error', 'Por favor, insira um URL válido.');
          return;
        }
        const stringId = item.id.toString(); 
        const numericId = stringId.split("-")[0]; 
          await axiosInstance.put(`/api/v1/account/me/link/${numericId}/`, linkData, {
            headers: { Authorization: `Bearer ${token}` },
          });
      } else if (item.type === "photo") {
        const snapData = {
          name: item.name || "My Snap",
          small_description: item.small_description || "",
          image: item.content || "",
        };
  
        await axiosInstance.put(`/api/v1/account/me/snap/${item.id}/`, snapData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      showAlert('success', 'Item atualizado com sucesso!');
    } catch (error) {
      showAlert('error', 'Erro ao atualizar conteúdo. Tente novamente.');
    } finally {
      setLoadingSave(null); 
    }
  };


  const deleteItem = async (id: string | number, type: "link" | "photo") => {
    const stringId = id.toString();
    const numericId = stringId.split("-")[0];
    try {
      if (type === "link") {
        await axiosInstance.delete(`/api/v1/account/me/link/${numericId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "photo") {
        const snapToDelete = bioData.content.find((item) => item.id === id);
        if (snapToDelete?.content) {
          try {
            await deleteImageFromCloudinary(snapToDelete.content);
          } catch (error) {
            showAlert('error', 'Erro ao deletar a imagem. O snap foi removido, mas a imagem pode ainda estar no Cloudinary.');
          }
        }
        await axiosInstance.delete(`/api/v1/account/me/snap/${numericId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
  
      setBioData((prev) => ({
        ...prev,
        content: prev.content.filter((item) => item.id !== id),
      }));
  
      showAlert('success', 'Item excluído com sucesso!');
    } catch (error) {
      showAlert('error', 'Erro ao excluir conteúdo. Tente novamente.');
    }
  };



  if (loadingUser) {
    return <LoadingSkeleton />;
  }

  if (errorUser) {showAlert('error', 'Erro ao carregar os dados do Usuário. Tente novamente mais tarde.');}

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Editor de Bio</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button onClick={() => addContent("link")} className="flex items-center gap-2">
          <Globe className="w-5 h-5" /> Adicionar Link
        </Button>
        <Button onClick={() => addContent("photo")} className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" /> Adicionar Snap
        </Button>
      </div>

      <div className="flex flex-col-reverse">
        {/* Itens Criados (Renderizados) */}
        <div>
          <h2 className="text-lg text-gray-700 font-medium mb-4">Meu Conteúdo</h2>
          <div className="md:columns-3 gap-6">
            {bioData.content
              .filter((item) => item && item.id && item.created && (item.type !== "link" || !item.is_profile_link))
              .map((item) => (
                <Card key={item.id} className="p-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit card-content w-full">
                  <CardContent className="flex flex-col items-center gap-4">
                    {item.type === "link" && (
                      <>
                        <Globe className="w-8 h-8 text-gray-500" />
                        <Input
                          type="url"
                          className="w-full text-gray-500"
                          placeholder="https://exemplo.com"
                          value={item.url || ""}
                          onChange={(e) => updateContent(item.id, item.content, e.target.value)}
                          required
                        />
                        <Input
                          type="text"
                          className="w-full text-gray-500 mt-2"
                          placeholder="Título do Link"
                          value={item.title || ""}
                          onChange={(e) =>
                            updateContent(item.id, item.content, item.url, item.title, e.target.value)
                          }
                          required
                        />
                      </>
                    )}
                    {item.type === "photo" && (
                      <>
                        {item.content ? (
                          <Image
                            key={item.id}
                            src={item.content}
                            alt="Uploaded"
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                            unoptimized
                          />
                        ) : (
                          <label htmlFor={`file-input-${item.id}`} className="cursor-pointer flex flex-col items-center">
                            <ImageIcon className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-600 text-sm">Enviar uma imagem</span>
                          </label>
                        )}
                        <input
                          id={`file-input-${item.id}`}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(item.id, e)}
                          required
                        />
                        <Input
                          type="text"
                          className="w-full text-gray-500"
                          placeholder="Nome do Snap"
                          value={item.name || ""}
                          onChange={(e) =>
                            updateContent(item.id, item.content, item.url, e.target.value, item.small_description)
                          }
                          required
                        />
                        <Input
                          type="text"
                          className="w-full text-gray-500"
                          placeholder="Descrição pequena do Snap"
                          value={item.small_description || ""}
                          onChange={(e) =>
                            updateContent(item.id, item.content, item.url, item.name, item.small_description, e.target.value)
                          }
                          required
                        />
                      </>
                    )}

                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => item.created ? updateItem(item) : saveContent(item)}
                      disabled={loadingSave === item.id}
                    >
                      <Save className="w-4 h-4" /> {loadingSave === item.id ? "Salvando..." : "Salvar"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full flex items-center gap-2"
                      onClick={() => deleteItem(item.id, item.type)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remover
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-red-600">Limite atingido</h3>
            <p className="text-gray-700 mt-2">
              Você atingiu o limite do seu plano. Considere fazer um upgrade para adicionar mais itens.
            </p>
            <Button className="mt-4" onClick={() => setShowErrorModal(false)}>
              Fechar
            </Button>
          </div>
        </div>
      )}

      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
        type={contentType}
        onSave={handleSaveNewContent}
      />

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BioEditor;

