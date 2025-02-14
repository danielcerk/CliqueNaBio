import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createLink = async (api: AxiosInstance, linkData: { url: string; social_network: string; username: string; create_by: string }) => {
  try {
    const token = Cookies.get("access_token"); // Obtém o token do cookie

    // Adicionando log para verificar os dados antes de enviar
    console.log("Dados que estão sendo enviados:", linkData);

    const response = await api.post("/api/v1/account/me/link/", linkData, {
      headers: {
        Authorization: `Bearer ${token}`,
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
}













// Função para obter todos os Links de um usuário
export const getLinks = async (accountId: number) => {

  const token = Cookies.get("access_token"); // Obtém o token do cookie

  const response = await fetch(`/api/v1/account/me/link/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
  });

  if (!response.ok) {
      throw new Error('Erro ao obter links');
  }

  return response.json();
}







// Função para atualizar um Link
async function updateLink(accountId: number, linkId: number, linkData: { url?: string, social_network?: string, username?: string }) {
  const response = await fetch(`/api/v1/account/${accountId}/link/${linkId}/`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(linkData)
  });

  if (!response.ok) {
      throw new Error('Erro ao atualizar link');
  }

  return response.json();
}

// Função para excluir um Link
async function deleteLink(accountId: number, linkId: number) {
  const response = await fetch(`/api/v1/account/${accountId}/link/${linkId}/`, {
      method: 'DELETE',
      headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }
  });

  if (!response.ok) {
      throw new Error('Erro ao excluir link');
  }

  return response.json();
}
