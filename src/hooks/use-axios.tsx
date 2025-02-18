import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { useEffect, useState, useMemo } from "react";

type ConfigRequest<T = unknown> = {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete'; 
  url: string | null;
  othersConfig?: AxiosRequestConfig;
  responseType?: T;
};

export default function useAxios<T = unknown>(configRequest: ConfigRequest<T>) {
  const { axiosInstance, method, url, othersConfig = {} } = configRequest;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedOthersConfig = useMemo(() => othersConfig, [JSON.stringify(othersConfig)]);

  const [data, setData] = useState<T | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (!url) { 
        setError('URL não fornecida.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axiosInstance[method](url, {
          ...memoizedOthersConfig,
          signal: controller.signal,
        });
        setData(response.data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.code === 'ERR_CANCELED') {
            // A requisição foi abortada, podemos ignorar esse erro
            return;
          }
          console.error('Erro na resposta:', err.response);
          const errorMessage = err.response && err.response.data
          ? (typeof err.response.data === 'string'
              ? err.response.data
              : JSON.stringify(err.response.data))
          : err.message;
          setError(errorMessage || 'Erro ao processar a resposta da API.');
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
      controller.abort();
    };
  }, [axiosInstance, method, url, memoizedOthersConfig]); // Use memoizedOthersConfig here

  return [data, loading, error] as const;
}