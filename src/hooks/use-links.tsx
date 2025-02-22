import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createLink = async (
  api: AxiosInstance,
  linkData: {
    url: string;
    title: string;
    social_network: string;
    username: string;
    is_profile_link?: boolean; // Atributo opcional
  }
) => {
  try {
    const token = Cookies.get("access_token"); // Obtém o token do cookie

    // Adicionando log para verificar os dados antes de enviar
    console.log("Dados que estão sendo enviados:", linkData);

    // Definindo valores padrão para atributos opcionais
    const payload = {
      ...linkData,
      is_profile_link: linkData.is_profile_link || false, // Valor padrão caso não seja fornecido
    };

    const response = await api.post("/api/v1/account/me/link/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    // Exibe os dados recebidos da resposta da API
    console.log("Dados recebidos da API:", response.data);

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

