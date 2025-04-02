"use client"

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ImageIcon, Trash2, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Cookie from "js-cookie";
import LoadingSkeleton from "./loading-skeleton";
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import { cloudinaryUpload } from "@/services/cloudinaryUpload";
import { deleteImageFromCloudinary } from "@/services/cloudinaryUpload";
import { createSnap } from "@/services/content/snaps";
import { nanoid } from "nanoid";
import { AlertModal } from '@/components/common/AlertModal';
import { AddContentModal } from "./AddContentModal";
import { EditContentModal } from "./EditContentModal";
import AlertDecisionModal from "@/components/common/AlertDecisionModal";
import { ContentItem, BioData, UserData, SnapItem, LinkItem, NoteItem} from "../../../lib/types"
import { createNote, updateNote, deleteNote } from "@/services/content/notes";
import {createLink } from "@/services/content/links"



const BioEditor = () => {
  const token = Cookie.get("access_token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Estados para o modal de criação de conteúdo
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [contentType, setContentType] = useState<"link" | "photo" | "note">("link");

  const [isEditContentModalOpen, setIsEditContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<ContentItem | null>(null);


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
    id:'',
    name: "",         
    biografy: "",     
    image: "",        
    content: [],      
    form_contact: false,  
    copyright: false,
    theme: [] 
  });

  const [planLimits, setPlanLimits] = useState({ maxLinks: 0, maxSnaps: 0 });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingSave, setLoadingSave] = useState<string | null>(null); 
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string | number; type: "link" | "photo" | "note" } | null>(null);

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

  const fetchContent = useCallback(async () => {
    try {
        setLoading(true);
        const userResponse = await axiosInstance.get("/api/v1/account/me/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userResponse.data;
        const [linkResponse, snapResponse, noteResponse] = await Promise.all([
            axiosInstance.get("/api/v1/account/me/link/", {
                headers: { Authorization: `Bearer ${token}` },
            }),
            axiosInstance.get("/api/v1/account/me/snap/", {
                headers: { Authorization: `Bearer ${token}` },
            }),
            axiosInstance.get("/api/v1/account/me/note/", {
                headers: { Authorization: `Bearer ${token}` },
            })
        ]);

        const links = linkResponse.data.map((link: LinkItem) => ({
            id: link?.id,
            type: "link",
            content: link?.url || "",
            url: link?.url || "",
            og_image: link?.og_image,
            title: link?.title || "",
            is_profile_link: link?.is_profile_link || false,
            created: true,
        }));

        const snaps = snapResponse.data.map((snap: SnapItem) => ({
            id: snap?.id,
            type: "photo",
            content: snap?.image || "",
            url: snap?.image || "",
            name: snap?.name || "",
            small_description: snap?.small_description || "",
            created: true,
        }));

        const notes = noteResponse.data.map((note: NoteItem)=> ({
          id: note?.id,
          type: "note",
          content: note?.text || "",
          created_at: note?.created_at || new Date().toISOString(),
          updated_at: note?.updated_at || new Date().toISOString(),
          created: true,
        }))

        setBioData({
          id:'',
          name: "",         
          biografy: "",     
          image: "",        
          content: [...links, ...snaps, ...notes],   
          form_contact: false,  
          copyright: false,  
          theme: []
        });
    } catch (err) {
        setError(true);
    } finally {
        setLoading(false);
    }
  }, [token]);

  useEffect(() => {
      fetchContent();
  }, [fetchContent]);


  const addContent = (type: "link" | "photo" | "note") => {
    const linksCount = bioData.content.filter((item) => item.type === "link").length;
    const snapsCount = bioData.content.filter((item) => item.type === "photo").length;
  
    if ((type === "link" && linksCount >= planLimits.maxLinks) || (type === "photo" && snapsCount >= planLimits.maxSnaps)) {
      setShowErrorModal(true);
      return;
    }
  
    setContentType(type);
    setIsAddContentModalOpen(true);
  };

  const handleSaveNewContent = async (data: { 
    url?: string; 
    title?: string; 
    name?: string; 
    small_description?: string; 
    image?: string, 
    text?: string 
  }) => {
    const newContent: ContentItem = {
      id: generateUniqueId(),
      type: contentType,
      content: contentType === "link" ? data.url || "" : 
              contentType === "photo" ? data.image || "" : 
              data.text || "",
      url: data.url,
      name: data.name,
      title: data.title,
      small_description: data.small_description,
      created: false,
    };
  
    // Adiciona o novo item ao estado
    setBioData((prev) => ({ ...prev, content: [...prev.content, newContent] }));
  
    try {
      if (contentType === "note") {
        if (!data.text) {
          throw new Error("Texto da nota não pode estar vazio");
        }
        await createNote(axiosInstance, data.text);
        await fetchContent(); // Atualiza a lista após criação
      } else {
        await saveContent(newContent);
      }
      showAlert('success', 'Item criado com sucesso!');
    } catch (error) {
      // Remove o item se a criação falhar
      setBioData(prev => ({
        ...prev,
        content: prev.content.filter(item => item.id !== newContent.id)
      }));
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar item. Tente novamente.';
      showAlert('error', errorMessage);
    } finally {
      setIsAddContentModalOpen(false);
    }
  };

  const handleEditContent = (item: ContentItem) => {
    setContentToEdit(item);
    setIsEditContentModalOpen(true);
  };

  const handleSaveEditedContent = async (data: { url?: string; title?: string; name?: string; small_description?: string; image?: string, 
    text?: string; }) => {
    if (!contentToEdit) return;

    const updatedContent = {
      ...contentToEdit,
      url: data.url || contentToEdit.url,
      title: data.title || contentToEdit.title,
      name: data.name || contentToEdit.name,
      small_description: data.small_description || contentToEdit.small_description,
      content: contentType === "photo" ? data.image || contentToEdit.content :
      contentType === "note" ? data.text || contentToEdit.content :
      contentToEdit.content,
    };

    setBioData((prev) => ({
      ...prev,
      content: prev.content.map((item) =>
        item.id === contentToEdit.id ? updatedContent : item
      ),
    }));

    try {
      if (contentToEdit.type === "note" && data.text) {
        await updateNote(axiosInstance, data.text, contentToEdit.id.toString());
        await fetchContent(); 
      } else {
        await updateItem(updatedContent);
      }
      showAlert('success', 'Item atualizado com sucesso!');
    } catch (error) {
      showAlert('error', 'Erro ao atualizar item. Tente novamente.');
    }
  
    setIsEditContentModalOpen(false);
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
          is_profile_link: false
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
          is_profile_link: false
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


  const deleteItem = async (id: string | number, type: "link" | "photo" | "note") => {
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
      }else if (type === "note") {
        await deleteNote(axiosInstance, numericId);
      }

      setBioData((prev) => ({
        ...prev,
        content: prev.content.filter((item) => item.id !== id),
      }));

      showAlert('success', 'Item excluído com sucesso!');
    } catch (error) {
      showAlert('error', 'Erro ao excluir conteúdo. Tente novamente.');
    } finally {
      setIsDecisionModalOpen(false); // Fecha o modal após a exclusão
    }
  };

  const handleDeleteConfirmation = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id, itemToDelete.type);
    }
  };



  if (loadingUser) {
    return <LoadingSkeleton />;
  }

  if (errorUser) {showAlert('error', 'Erro ao carregar os dados do Usuário. Tente novamente mais tarde.');}

  return (
    <div className="dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen ">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 dark:text-white">Editor de Bio</h2>

        <div className="flex flex-wrap gap-4 mb-8 w-full justify-center">
          <Button onClick={() => addContent("link")} className="flex items-center p-5 gap-2 hover:scale-105 transition-all duration-300 font-bold dark:bg-yellow-400">
            <Globe className="w-5 h-5" /> Adicionar Link
          </Button>
          <Button onClick={() => addContent("photo")} className="flex items-center p-5 gap-2 hover:scale-105 transition-all duration-300 font-bold dark:bg-blue-400">
            <ImageIcon className="w-5 h-5" /> Adicionar Foto
          </Button>
          <Button onClick={() => addContent("note")} className="flex items-center p-5 gap-2 hover:scale-105 transition-all duration-300 font-bold dark:bg-green-400">
            <ImageIcon className="w-5 h-5" /> Adicionar Texto
          </Button>
        </div>

        <div className="flex flex-col-reverse">
          {/* Itens Criados (Renderizados) */}
          <div>
            <h2 className="text-lg text-gray-700 font-medium mb-4 dark:text-gray-100">Meu Conteúdo</h2>
            <div className="md:columns-3 gap-6">
              {bioData.content
                .filter((item) => item && item.id && item.created && (item.type !== "link" || !item.is_profile_link))
                .map((item) => (
                  <Card key={item.id} className="px-2 py-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit card-content mx-auto">
                    <CardContent className="flex flex-col items-center gap-4">
                      {item.type === "link" && (
                        <>
                          
                          {item.og_image ? ( // Exibe a imagem de pré-visualização
                            <div className="">
                              <Image src={item.og_image} alt="Preview"
                                width={100}
                                height={100}
                                className="rounded-md object-cover w-full"
                                unoptimized/>
                            </div>
                          ) : <Globe className="w-8 h-8 text-gray-500" />}
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
                              className="rounded-md object-cover w-full"
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
                            className="hidden "
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(item.id, e)}
                            required
                          />
                        </>
                      )}
                     {item.type === "note" && (
                        <div className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                            {item.content}
                          </p>
                          {item.created_at && (
                            <p className="text-xs text-gray-500 mt-2">
                              Criado em: {new Date(item.created_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full dark:bg-green-600"
                        onClick={() => handleEditContent(item)}
                        disabled={loadingSave === item.id}
                      >
                        <Save className="w-4 h-4" /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full flex items-center gap-2"
                        onClick={() => {
                          setItemToDelete({ id: item.id, type: item.type }); // Armazena o item a ser excluído
                          setIsDecisionModalOpen(true); // Abre o modal de decisão
                        }}
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

      {contentToEdit && (
        <EditContentModal
          isOpen={isEditContentModalOpen}
          onClose={() => setIsEditContentModalOpen(false)}
          type={contentToEdit.type}
          content={{
            url: contentToEdit.url,
            title: contentToEdit.title,
            name: contentToEdit.name,
            small_description: contentToEdit.small_description,
            image: contentToEdit.content,
          }}
          onSave={handleSaveEditedContent}
        />
      )}

        <AddContentModal
          isOpen={isAddContentModalOpen}
          onClose={() => setIsAddContentModalOpen(false)}
          type={contentType}
          onSave={handleSaveNewContent}
        />

        <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <AlertDecisionModal
          isOpen={isDecisionModalOpen}
          message="Tem certeza que deseja excluir este item?"
          onConfirm={handleDeleteConfirmation} // Função que será chamada ao confirmar
          onCancel={() => setIsDecisionModalOpen(false)} // Fecha o modal ao cancelar
        />
      </div>
    </div>
  );
};

export default BioEditor;

