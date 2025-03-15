import React, { useState, useEffect } from "react";
import axiosInstance from "@/helper/axios-instance";

interface Theme {
  id: number;
  name: string;
  background_color: string;
  foreground_color: string;
  font_family: string;
}

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: Theme) => void;
}

const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose, onSelectTheme }) => {
  const [themes, setThemes] = useState<Theme[]>([]); // Inicialize como um array vazio
  const [loading, setLoading] = useState(true);

  // Busca os temas disponíveis ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      const fetchThemes = async () => {
        try {
          const response = await axiosInstance.get("/api/v1/themes/"); // Rota para buscar temas
          // Garanta que a resposta seja um array
          const themesData = Array.isArray(response.data) ? response.data : [];
          setThemes(themesData);

          console.log(response.data)
        } catch (error) {
          console.error("Erro ao buscar temas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchThemes();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Selecionar Tema</h2>
        {loading ? (
          <p>Carregando temas...</p>
        ) : (
          <div className="space-y-4">
            {themes.length > 0 ? (
              themes.map((theme) => (
                <div
                  key={theme.id}
                  className="p-4 border border-gray-300 rounded-lg cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    onSelectTheme(theme);
                    onClose();
                  }}
                >
                  <h3 className="font-semibold">{theme.name}</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.background_color }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.foreground_color }}
                    ></div>
                    <span>{theme.font_family}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum tema disponível.</p>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ThemeSelectorModal;