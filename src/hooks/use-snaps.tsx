import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const createSnap = async ( api: AxiosInstance, snapData: { name: string, small_description?: string, image?: string }) => {

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























// Função para obter todos os Snaps de um usuário
async function getSnaps(accountId: number) {
  const response = await fetch(`/api/v1/account/${accountId}/snap/`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }
  });

  if (!response.ok) {
      throw new Error('Erro ao obter snaps');
  }

  return response.json();
}

// Função para atualizar um Snap
async function updateSnap(accountId: number, snapId: number, snapData: { name?: string, small_description?: string, image?: string }) {
  const response = await fetch(`/api/v1/account/${accountId}/snap/${snapId}/`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(snapData)
  });

  if (!response.ok) {
      throw new Error('Erro ao atualizar snap');
  }

  return response.json();
}

// Função para excluir um Snap
async function deleteSnap(accountId: number, snapId: number) {
  const response = await fetch(`/api/v1/account/${accountId}/snap/${snapId}/`, {
      method: 'DELETE',
      headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }
  });

  if (!response.ok) {
      throw new Error('Erro ao excluir snap');
  }

  return response.json();
}
