import React, { useState, useEffect } from "react";

interface Theme {
  background_color?: string; // Permite undefined
  foreground_color?: string; // Permite undefined
  font_family?: string; // Permite undefined
}

interface ThemeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTheme?: Theme; // Tema inicial (opcional)
  onSave: (theme: Theme) => void;
}

const ThemeEditorModal: React.FC<ThemeEditorModalProps> = ({
  isOpen,
  onClose,
  initialTheme,
  onSave,
}) => {
  // Estado para armazenar as edições do tema
  const [editedTheme, setEditedTheme] = useState<Theme>({
    background_color: '#ffffff', // Valor padrão
    foreground_color: '#000000', // Valor padrão
    font_family: 'Arial, sans-serif', // Valor padrão
  });

  // Atualiza o estado `editedTheme` quando `initialTheme` muda
  useEffect(() => {
    if (initialTheme) {
      setEditedTheme({
        background_color: initialTheme.background_color || '#ffffff', // Valor padrão
        foreground_color: initialTheme.foreground_color || '#000000', // Valor padrão
        font_family: initialTheme.font_family || 'Arial, sans-serif', // Valor padrão
      });
    }
  }, [initialTheme]);

  // Função para lidar com a mudança nos campos do tema
  const handleChange = (field: keyof Theme, value: string) => {
    setEditedTheme((prevTheme) => ({
      ...prevTheme,
      [field]: value,
    }));
  };

  // Função para salvar o tema editado
  const handleSave = () => {
    onSave(editedTheme); // Chama a função onSave passada via props
    onClose(); // Fecha o modal após salvar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Tema</h2>
        <div className="space-y-4">
          {/* Campo para editar a cor de fundo */}
          <div>
            <label className="block text-sm font-medium">Cor de Fundo:</label>
            <input
              type="color"
              value={editedTheme.background_color || '#ffffff'} // Valor padrão
              onChange={(e) => handleChange("background_color", e.target.value)}
              className="w-full"
            />
          </div>
          {/* Campo para editar a cor do texto */}
          <div>
            <label className="block text-sm font-medium">Cor do Texto:</label>
            <input
              type="color"
              value={editedTheme.foreground_color || '#000000'} // Valor padrão
              onChange={(e) => handleChange("foreground_color", e.target.value)}
              className="w-full"
            />
          </div>
          {/* Campo para editar a fonte */}
          <div>
            <label className="block text-sm font-medium">Fonte:</label>
            <select
              value={editedTheme.font_family || 'Arial, sans-serif'} // Valor padrão
              onChange={(e) => handleChange("font_family", e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Courier New, monospace">Courier New</option>
            </select>
          </div>
        </div>
        {/* Botões de ação */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditorModal;