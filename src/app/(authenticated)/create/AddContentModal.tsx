import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ImageIcon } from "lucide-react";
import { cloudinaryUpload } from "@/hooks/cloudinaryUpload";
import { AlertModal } from '@/components/common/AlertModal';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "link" | "photo";
  onSave: (data: { url?: string; title?: string; name?: string; small_description?: string; image?: string }) => Promise<void>;
}

export const AddContentModal = ({ isOpen, onClose, type, onSave }: AddContentModalProps) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');
  
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [contentType, setContentType] = useState<"link" | "photo">("link");
  
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

    if (type === "photo" && !imageFile) {
      showAlert('error','Por favor, selecione uma imagem antes de salvar.');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (type === "photo" && imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      // Chama a função onSave passada como prop
      await onSave({
        url,
        title,
        name,
        small_description: smallDescription,
        image: imageUrl,
      });

      onClose(); // Fecha o modal após salvar
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-96 dark:border dark:border-yellow-400 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Adicionar {type === "link" ? "Link" : "Snap"}</h3>
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
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
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
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <Input
              type="text"
              placeholder="Nome do Snap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 text-gray-700 dark:bg-gray-200"
            />
             <textarea
              placeholder="Descrição pequena do Snap"
              value={smallDescription}
              onChange={(e) => setSmallDescription(e.target.value)}
              className="mb-4 p-2 w-full border rounded text-gray-700 dark:bg-gray-200"
              rows={4} // Define o número de linhas visíveis
              />
          
          </>
        )}

        <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="dark:bg-red-900 font-bold">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading} className="dark:bg-green-600 dark:text-white font-bold">
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
};



