import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createLink = async (
  api: AxiosInstance,
  linkData: {
    url: string;
    title: string;
    social_network: string;
    username: string;
    is_profile_link?: boolean;
  }
) => {
  try {
    const token = Cookies.get("access_token");

    const payload = {
      ...linkData,
      is_profile_link: linkData.is_profile_link || false, 
    };

    const response = await api.post("/api/v1/account/me/link/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
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

