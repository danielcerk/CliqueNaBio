"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, ImageIcon, Trash2, Save } from "lucide-react";
import Image from "next/image";

import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import Cookie from "js-cookie";

interface ContentItem {
  id: string;
  type: "link" | "photo";
  content: string;
  url?: string;
}

interface BioData {
  name: string;
  username: string;
  bio: string;
  profilePicture: string;
  content: ContentItem[];
  location: string;
}

interface UserData {
  plan?: "GRÁTIS" | "CONEXÃO" | "INFLUÊNCIA"; // Torna 'plan' opcional
}


const BioEditor = () => {
  const token = Cookie.get("access_token");

  // Requisição para obter dados do usuário e plano
  const [userData, loadingUser, errorUser] = useAxios<UserData>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }) ?? { plan: "GRÁTIS" }; // Garante um fallback
  

  const [bioData, setBioData] = useState<BioData>({
    name: "",
    username: "",
    bio: "",
    profilePicture: "",
    content: [],
    location: "",
  });

  const [planLimits, setPlanLimits] = useState({ maxLinks: 0, maxSnaps: 0 });
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (userData && typeof userData === "object" && "plan" in userData) {
      const plan = userData.plan ?? "GRÁTIS";
      const limits = {
        GRÁTIS: { maxLinks: 3, maxSnaps: 10 },
        CONEXÃO: { maxLinks: 6, maxSnaps: 50 },
        INFLUÊNCIA: { maxLinks: Infinity, maxSnaps: Infinity },
      };

      setPlanLimits(limits[plan] || limits['GRÁTIS']);
    }
  }, [userData]);

  const addContent = (type: "link" | "photo") => {
    const linksCount = bioData.content.filter((item) => item.type === "link").length;
    const snapsCount = bioData.content.filter((item) => item.type === "photo").length;

    // Verifica os limites antes de adicionar
    if ((type === "link" && linksCount >= planLimits.maxLinks) || (type === "photo" && snapsCount >= planLimits.maxSnaps)) {
      setShowErrorModal(true);
      return;
    }

    const newContent: ContentItem = { id: Date.now().toString(), type, content: "" };
    setBioData((prev) => ({ ...prev, content: [...prev.content, newContent] }));
  };

  const updateContent = (id: string, content: string, url?: string) => {
    setBioData((prev) => ({
      ...prev,
      content: prev.content.map((item) =>
        item.id === id ? { ...item, content, url: url || item.url } : item
      ),
    }));
  };

  const removeContent = (id: string) => {
    setBioData((prev) => ({
      ...prev,
      content: prev.content.filter((item) => item.id !== id),
    }));
  };

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          updateContent(id, event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const saveContent = (item: ContentItem) => {
    console.log("Salvando conteúdo:", item);
    // Aqui você pode implementar a lógica para enviar os dados para a API
  };

  
  // const saveContent = async (item: ContentItem) => {
  //   try {
  //     await axiosInstance.put("/api/v1/content/update", item, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Conteúdo salvo com sucesso!");
  //   } catch (error) {
  //     console.error("Erro ao salvar conteúdo:", error);
  //   }
  // };
  

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Editor de Bio</h2>

      {/* Ações para Adicionar Conteúdo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button onClick={() => addContent("link")} className="flex items-center gap-2">
          <Globe className="w-5 h-5" /> Adicionar Link
        </Button>
        <Button onClick={() => addContent("photo")} className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" /> Adicionar Snap
        </Button>
      </div>

      {/* Exibição do Conteúdo Adicionado */}
      <div className="columns-3 gap-6">
        {bioData.content.map((item) => (
          <Card key={item.id} className="p-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit card-content">
            <CardContent className="flex flex-col items-center gap-4 ">
              {item.type === "link" && (
                <>
                  <Globe className="w-8 h-8 text-gray-500" />
                  <Input
                    type="url"
                    className="w-full"
                    placeholder="https://exemplo.com"
                    value={item.url}
                    onChange={(e) => updateContent(item.id, item.content, e.target.value)}
                    required
                  />
                </>
              )}

              {item.type === "photo" && (
                <>
                  {item.content ? (
                    <Image
                      key={item.id} // Garante re-renderização ao mudar a imagem
                      src={item.content} // Base64 ou URL remota
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
                </>
              )}


              <Button variant="secondary" size="sm" onClick={() => saveContent(item)}>
                <Save className="w-4 h-4" /> Salvar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => removeContent(item.id)}
              >
                <Trash2 className="w-4 h-4" />
                Remover
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Erro */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-red-600">Limite atingido</h3>
            <p className="text-gray-700 mt-2">
              Você atingiu o limite do seu plano. Considere fazer um upgrade para adicionar mais itens.
            </p>
            <Button className="mt-4" onClick={() => setShowErrorModal(false)}>Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioEditor;