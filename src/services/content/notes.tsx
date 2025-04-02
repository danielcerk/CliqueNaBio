import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createNote = async (
  api: AxiosInstance,
  text: string
) => {
  try {
    const token = Cookies.get("access_token");
    
    const response = await api.post(
      "/api/v1/account/me/note/",
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data.id) {
      throw new Error("Resposta da API inválida");
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro na requisição:", error.response?.data || error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw error;
  }
};

// Adicione esta função para atualizar notas
export const updateNote = async (
  api: AxiosInstance,
  text: string,
  id: string) => {
  try {
    const token = Cookies.get("access_token");
    const response = await api.put(`/api/v1/account/me/note/${id}/`, 
      {text},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Adicione esta função para deletar notas
export const deleteNote = async (
  api: AxiosInstance,
  id: string) => {
  try {
    const token = Cookies.get("access_token");
    await api.delete(`/api/v1/account/me/note/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

