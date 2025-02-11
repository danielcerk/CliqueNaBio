import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'; // Tipos do Axios
import { useEffect, useState } from "react";

// Tipagem genérica para os dados retornados
type ConfigRequest<T = unknown> = {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete'; 
  url: string;
  othersConfig?: AxiosRequestConfig; // Configurações extras (headers, params, etc.)
  responseType?: T;
};

export default function useAxios<T = unknown>(configRequest: ConfigRequest<T>) {
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
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.error('Erro na resposta:', err.response);
          setError(err.response?.data?.message || 'Erro ao processar a resposta da API.');
        } else if (err instanceof Error) {
          console.error('Erro desconhecido:', err.message);
          setError(err.message);
        } else {
          console.error('Erro inesperado');
          setError('Erro inesperado.');
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 

    return () => {
      controller.abort(); // Aborta a requisição ao desmontar o componente
    };
  }, [axiosInstance, method, url, othersConfig]); // Dependências para atualizar corretamente

  return [data, loading, error] as const; // Retorna como uma tupla para maior clareza
}
