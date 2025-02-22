import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createSnap = async (
  api: AxiosInstance,
  snapData: { name: string; small_description?: string; image?: string }
) => {
  try {
    const token = Cookies.get("access_token"); // Obtém o token do cookie

    // Adicionando log para verificar os dados antes de enviar
    console.log("Dados que estão sendo enviados:", snapData);

    const response = await api.post("/api/v1/account/me/snap/", snapData, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Exibe os dados recebidos da resposta da API
    console.log("Dados recebidos da API:", response.data);

    // Garante que a resposta contenha um ID
    if (!response.data.id) {
      throw new Error("Resposta da API inválida: ID não encontrado.");
    }

    return response.data; // Retorna a resposta completa
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro na requisição:", error.response?.data || error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw error;
  }
};






