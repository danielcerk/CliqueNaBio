
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
  const [error, setError] = useState<AxiosError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (!url) { 
        // setError('URL não fornecida.');
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
          // Se for erro 401 e ainda não tentamos refazer a requisição
          if (err.response?.status === 401 && retryCount < 1) {
            setRetryCount(prev => prev + 1);
            // Aguarda um tempo para o interceptor fazer o refresh do token
            await new Promise(resolve => setTimeout(resolve, 300));
            return fetchData(); // Tenta novamente
          }
  
          setError(err);
        } else if (err instanceof Error) {
          setError(new AxiosError(err.message)); // Convertendo para AxiosError
        } else {
          setError(new AxiosError('Erro inesperado.')); // Convertendo para AxiosError
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 

    return () => {
      controller.abort();
    };
  }, [axiosInstance, method, url, memoizedOthersConfig, retryCount]); // Use memoizedOthersConfig here

  return [data, loading, error] as const;

}


