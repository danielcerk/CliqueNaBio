import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { useEffect, useState, useMemo } from "react";

type ConfigRequest<T = unknown> = {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete'; 
  url: string;
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
      try {
        const response = await axiosInstance[method](url, {
          ...memoizedOthersConfig,
          signal: controller.signal,
        });
        setData(response.data);
        setError(null);
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
      controller.abort();
    };
  }, [axiosInstance, method, url, memoizedOthersConfig]); // Use memoizedOthersConfig here

  return [data, loading, error] as const;
}