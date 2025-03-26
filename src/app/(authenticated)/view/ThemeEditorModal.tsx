"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Theme {
  background_color?: string
  foreground_color?: string
  font_family?: string
}

interface ThemeEditorModalProps {
  isOpen: boolean
  onClose: () => void
  initialTheme?: Theme
  onSave: (theme: Theme) => void
}

// Temas predefinidos
const predefinedThemes = [
  { name: "Claro", background_color: "#ffffff", foreground_color: "#000000", font_family: "Arial, sans-serif" },
  { name: "Escuro", background_color: "#121212", foreground_color: "#ffffff", font_family: "Arial, sans-serif" },
  { name: "Azul", background_color: "#e6f2ff", foreground_color: "#0047ab", font_family: "Georgia, serif" },
  { name: "Verde", background_color: "#e6ffe6", foreground_color: "#006400", font_family: "Arial, sans-serif" },
  { name: "Amarelo", background_color: "#ffffcc", foreground_color: "#8B4513", font_family: "Courier New, monospace" },
  { name: "Roxo", background_color: "#f2e6ff", foreground_color: "#4b0082", font_family: "Georgia, serif" },
  { name: "Vermelho", background_color: "#ffe6e6", foreground_color: "#8b0000", font_family: "Arial, sans-serif" },
  { name: "Cinza", background_color: "#f0f0f0", foreground_color: "#333333", font_family: "Courier New, monospace" },
  { name: "Laranja", background_color: "#fff2e6", foreground_color: "#d2691e", font_family: "Georgia, serif" },
  { name: "Turquesa", background_color: "#e6ffff", foreground_color: "#008080", font_family: "Arial, sans-serif" },
  { name: "Rosa", background_color: "#ffe6f2", foreground_color: "#c71585", font_family: "Courier New, monospace" },
  { name: "Marrom", background_color: "#f5f5dc", foreground_color: "#8b4513", font_family: "Georgia, serif" },
]

const ThemeEditorModal: React.FC<ThemeEditorModalProps> = ({ isOpen, onClose, initialTheme, onSave }) => {
  // Estado para armazenar as edições do tema
  const [editedTheme, setEditedTheme] = useState<Theme>({
    background_color: "#ffffff",
    foreground_color: "#000000",
    font_family: "Arial, sans-serif",
  })

  // Estado para rastrear o tema selecionado
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(null)

  // Atualiza o estado `editedTheme` quando `initialTheme` muda
  useEffect(() => {
    if (initialTheme) {
      setEditedTheme({
        background_color: initialTheme.background_color || "#ffffff",
        foreground_color: initialTheme.foreground_color || "#000000",
        font_family: initialTheme.font_family || "Arial, sans-serif",
      })

      // Tenta encontrar se o tema inicial corresponde a algum tema predefinido
      const matchingThemeIndex = predefinedThemes.findIndex(
        (theme) =>
          theme.background_color === initialTheme.background_color &&
          theme.foreground_color === initialTheme.foreground_color &&
          theme.font_family === initialTheme.font_family,
      )

      setSelectedThemeIndex(matchingThemeIndex !== -1 ? matchingThemeIndex : null)
    }
  }, [initialTheme])

  // Função para lidar com a mudança nos campos do tema
  const handleChange = (field: keyof Theme, value: string) => {
    setEditedTheme((prevTheme) => ({
      ...prevTheme,
      [field]: value,
    }))

    // Quando o usuário faz uma alteração manual, desmarca qualquer tema predefinido selecionado
    setSelectedThemeIndex(null)
  }

  // Função para selecionar um tema predefinido
  const selectPredefinedTheme = (index: number) => {
    setEditedTheme(predefinedThemes[index])
    setSelectedThemeIndex(index)
  }

  // Função para salvar o tema editado
  const handleSave = () => {
    onSave(editedTheme)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Editar Tema</h2>

        {/* Seção de temas predefinidos */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Temas Predefinidos</h3>
          <div className="grid grid-cols-4 gap-2">
            {predefinedThemes.map((theme, index) => (
              <div
                key={index}
                onClick={() => selectPredefinedTheme(index)}
                className={`
                  cursor-pointer p-1 rounded-md transition-all
                  ${selectedThemeIndex === index ? "ring-2 ring-yellow-500 scale-105" : "hover:scale-105"}
                `}
              >
                <div
                  className="w-full aspect-square rounded-md flex items-center justify-center"
                  style={{
                    backgroundColor: theme.background_color,
                    color: theme.foreground_color,
                    fontFamily: theme.font_family,
                  }}
                >
                  <span className="text-xs font-bold">Aa</span>
                </div>
                <p className="text-xs text-center mt-1">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="text-md font-medium mb-2">Personalização Manual</h3>
        </div>

        <div className="space-y-4">
          {/* Campo para editar a cor de fundo */}
          <div>
            <label className="block text-sm font-medium">Cor de Fundo:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={editedTheme.background_color || "#fff"}
                onChange={(e) => handleChange("background_color", e.target.value)}
                className="w-10 h-10"
              />
              <input
                type="text"
                value={editedTheme.background_color || "#fff"}
                onChange={(e) => handleChange("background_color", e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                style={{
                  color: "#000", // Cor do texto
                  backgroundColor: "#fff" // Cor de fundo (opcional)
                }}
              />
            </div>
          </div>

          {/* Campo para editar a cor do texto */}
          <div>
            <label className="block text-sm font-medium">Cor do Texto:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={editedTheme.foreground_color || "#000000"}
                onChange={(e) => handleChange("foreground_color", e.target.value)}
                className="w-10 h-10"
              />
              <input
                type="text"
                value={editedTheme.foreground_color || "#000000"}
                onChange={(e) => handleChange("foreground_color", e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                style={{
                  color: "#000", // Cor do texto
                  backgroundColor: "#fff" // Cor de fundo (opcional)
                }}
              />
            </div>
          </div>

          {/* Campo para editar a fonte */}
          <div>
            <label className="block text-sm font-medium">Fonte:</label>
            <select
              value={editedTheme.font_family || "Arial, sans-serif"}
              onChange={(e) => handleChange("font_family", e.target.value)}
              className="w-full p-2 border rounded-lg"
              style={{
                color: "#000", // Cor do texto
                backgroundColor: "#fff" // Cor de fundo (opcional)
              }}
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Courier New, monospace">Courier New</option>
            </select>
          </div>

          {/* Visualização do tema */}
          <div className="mt-4 border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Visualização:</h4>
            <div
              className="p-4 rounded-md"
              style={{
                backgroundColor: editedTheme.background_color,
                color: editedTheme.foreground_color,
                fontFamily: editedTheme.font_family,
              }}
            >
              <p className="font-bold">Título de exemplo</p>
              <p>Este é um texto de exemplo para visualizar o tema.</p>
            </div>
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
  )
}

export default ThemeEditorModal

