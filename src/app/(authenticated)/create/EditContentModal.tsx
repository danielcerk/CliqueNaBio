"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ImageIcon } from "lucide-react";
import { cloudinaryUpload } from "@/hooks/cloudinaryUpload";
import { AlertModal } from '@/components/common/AlertModal';

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "link" | "photo" | "text";
  content: {
    url?: string;
    title?: string;
    name?: string;
    small_description?: string;
    image?: string;
    text?: string;
  };
  onSave: (data: { 
    url?: string; 
    title?: string; 
    name?: string; 
    small_description?: string; 
    image?: string;
    text?: string;
  }) => Promise<void>;
}

export const EditContentModal = ({ isOpen, onClose, type, content, onSave }: EditContentModalProps) => {
  const [url, setUrl] = useState(content.url || "");
  const [title, setTitle] = useState(content.title || "");
  const [name, setName] = useState(content.name || "");
  const [smallDescription, setSmallDescription] = useState(content.small_description || "");
  const [text, setText] = useState(content.text || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await cloudinaryUpload(file);
      return imageUrl;
    } catch (error) {
      throw new Error("Erro ao fazer upload da imagem.");
    }
  };

  const handleSave = async () => {
    if (type === "photo" && !imageFile && !content.image) {
      showAlert('error', 'Por favor, selecione uma imagem antes de salvar.');
      return;
    }

    if (type === "text" && !text.trim()) {
      showAlert('error', 'Por favor, digite algum texto para a nota.');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = content.image || "";
      if (type === "photo" && imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      await onSave({
        url,
        title,
        name,
        small_description: smallDescription,
        image: imageUrl,
        text: type === "text" ? text : undefined,
      });

      onClose();
    } catch (error) {
      console.error(error);
      showAlert('error', 'Erro ao salvar as alterações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-96 dark:border dark:border-yellow-400 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          Editar {type === "link" ? "Link" : type === "photo" ? "Publicação" : "Nota"}
        </h3>

        {type === "link" ? (
          <>
            <Input
              type="url"
              placeholder="https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mb-4 text-gray-700 dark:bg-gray-200"
            />
            <Input
              type="text"
              placeholder="Título do Link"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 text-gray-700 dark:bg-gray-200"
            />
          </>
        ) : type === "photo" ? (
          <>
            <div className="mb-4">
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="rounded-md object-cover w-full"
                  />
                ) : content.image ? (
                  <img
                    src={content.image}
                    alt="Preview"
                    className="rounded-md object-cover w-full"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-gray-500" />
                    <span className="text-gray-600 text-sm">Enviar uma imagem</span>
                  </>
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <Input
              type="text"
              placeholder="Título da publicação"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 text-gray-700 dark:bg-gray-200"
            />
            <textarea
              placeholder="Descrição pequena da publicação"
              value={smallDescription}
              onChange={(e) => setSmallDescription(e.target.value)}
              className="mb-4 p-2 w-full border rounded text-gray-700 dark:bg-gray-200"
              rows={4}
            />
          </>
        ) : (
          <div className="mt-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
              rows={6}
              placeholder="Digite seu texto aqui..."
            />
          </div>
        )}

        <AlertModal 
          type={modalType} 
          message={modalMessage} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="dark:bg-red-900 font-bold"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading} 
            className="dark:bg-green-600 dark:text-white font-bold"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
};