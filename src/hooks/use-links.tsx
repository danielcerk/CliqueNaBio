import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createLink = async (
  api: AxiosInstance,
  linkData: {
    url: string;
    title: string;
    social_network: string;
    username?: string;
    is_profile_link?: boolean; // Parâmetro opcional
  },
  isProfileLink: boolean = false // Valor padrão é false
) => {
  try {
    const token = Cookies.get("access_token");

    const payload = {
      ...linkData,
      is_profile_link: isProfileLink, // Usa o valor passado como argumento
    };

    const response = await api.post("/api/v1/account/me/link/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

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



export const updateLink = async (
  api: AxiosInstance,
  linkId: number,
  linkData: {
    url: string;
    title: string;
    social_network: string;
    username?: string;
    is_profile_link?: boolean;
  }
) => {
  try {
    const token = Cookies.get("access_token");

    const payload = {
      ...linkData,
      is_profile_link: true, // Força o is_profile_link como true
    };

    const response = await api.put(`/api/v1/account/me/link/${linkId}/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

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
// Função para deletar um link
export const deleteLink = async (
  api: AxiosInstance,
  linkId: number
) => {
  try {
    const token = Cookies.get("access_token");

    const response = await api.delete(`/api/v1/account/me/link/${linkId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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