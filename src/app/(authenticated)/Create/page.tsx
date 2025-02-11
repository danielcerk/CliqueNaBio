"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";

interface ContentItem {
  id: string;
  type: "link" | "photo" | "text";
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


interface BioEditorProps {
  onSave: (data: BioData) => void;
  initialData?: BioData;
}

const BioEditor: React.FC<BioEditorProps> = ({ onSave, initialData }) => {
  const [bioData, setBioData] = useState<BioData>(
    initialData || {
      name: "ggg",
      username: "ggggggg",
      bio: "gggggggg",
      profilePicture: "ggggggg",
      content: [
        {
          id: "1",
          type: "text",
          content: "Exemplo de conteúdo",
        },
      ],
      location: "gggggggggg",
    }
  );
  // const addContent = (type: "link" | "photo" | "text") => {
  //   const newContent: ContentItem = { id: Date.now().toString(), type, content: "", url: "" };
  //   setBioData((prev) => ({ ...prev, content: [...prev.content, newContent] }));
  // };

  const addContent = (type: "link" | "photo" | "text") => {
    const newContent: ContentItem = {
      id: Date.now().toString(),
      type,
      content: "",
      ...(type !== "text" && { url: "" }), 
    };
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

  // const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event.target) {
  //         updateContent(id, event.target.result as string);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateContent(id, event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  

  const handleSave = () => {
    onSave(bioData);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Editor de Bio</h2>

      {/* Ações para Adicionar Conteúdo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button onClick={() => addContent("link")} className="flex items-center gap-2">
          <Globe className="w-5 h-5" /> Adicionar Link
        </Button>
        <Button onClick={() => addContent("photo")} className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" /> Adicionar Foto
        </Button>
      </div>

      {/* Exibição do Conteúdo Adicionado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bioData.content.map((item) => (
          <Card key={item.id} className="p-4 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center gap-4">
              {item.type === "link" && (
                <>
                  <Globe className="w-8 h-8 text-gray-500" />
                  <Input
                    type="url"
                    className="w-full"
                    placeholder="https://exemplo.com"
                    value={item.url}
                    onChange={(e) => updateContent(item.id, item.content, e.target.value)}
                  />
                </>
              )}

              {/* {item.type === "photo" && (
                <>
                  {item.content ? (
                    <Image src={item.content} alt="Uploaded" width={100} height={100} className="rounded-md" />
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
                    onChange={(e) => handlePhotoUpload(item.id, e)}
                  />
                </>
              )} */}

              {item.type === "photo" && (
                <>
                  {item.content ? (
                    <Image src={item.content} alt="Uploaded" width={100} height={100} className="rounded-md" />
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
                    onChange={(e) => handlePhotoUpload(item.id, e)}
                  />
                </>
              )}


              {/* Botão de Remover */}
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

      <div className="mt-10 text-center">
        <Button onClick={handleSave} className="px-6 py-3 text-lg">
          Salvar Bio
        </Button>
      </div>
    </div>
  );
};

export default BioEditor;
