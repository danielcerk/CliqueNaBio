// Função para criar um novo Snap
export const createSnap = async (snapData: { name: string, small_description?: string, image?: string }) => {
  const response = await fetch(`/api/v1/account/me/snap/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(snapData)
  });

  if (!response.ok) {
      throw new Error('Erro ao criar snap');
  }

  return response.json();
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
