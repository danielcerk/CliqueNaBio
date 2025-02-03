import { AxiosInstance, AxiosRequestConfig } from 'axios'; // Tipos do Axios
import { useEffect, useState } from "react";

// Tipagem genérica para os dados retornados
type ConfigRequest<T = any> = {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete'; 
  url: string;
  othersConfig?: AxiosRequestConfig; // Configurações extras (headers, params, etc.)
};

export default function useAxios<T = any>(configRequest: ConfigRequest<T>) {
  const { axiosInstance, method, url, othersConfig = {} } = configRequest;
  const [data, setData] = useState<T | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Controlador para abortar a requisição se necessário

    const fetchData = async () => {
      try {
        // Faz a requisição com o método e configurações fornecidas
        const response = await axiosInstance[method](url, {
          ...othersConfig,
          signal: controller.signal, // Inclui o sinal do controlador
        });
        setData(response.data); // Atualiza os dados com a resposta da API
        setError(null); // Reseta o erro se a requisição for bem-sucedida
      } catch (err: any) {
        if (err.name === 'CanceledError') {
          console.warn('Requisição cancelada:', err.message);
          return; // Ignora o erro de requisição cancelada
        }
        if (err.response) {
          console.error('Erro na resposta:', err.response);
          setError(err.response.data.message || 'Erro ao processar a resposta da API.');
        } else if (err.request) {
          console.error('Erro na requisição:', err.request);
          setError('Erro de comunicação com o servidor. Verifique sua conexão.');
        } else {
          console.error('Erro desconhecido:', err.message);
          setError('Ocorreu um erro inesperado.');
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 

    return () => {
      controller.abort(); // Aborta a requisição ao desmontar o componente
    };
  }, []); // Dependências para atualizar corretamente

  return [data, loading, error] as const; // Retorna como uma tupla para maior clareza
}
