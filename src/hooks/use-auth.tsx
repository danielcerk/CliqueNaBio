import { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie'


interface TokenResponse {
  access: string;  // Token de acesso
  refresh: string; // Token de atualização
}

interface LoginError {
  detail?: string;
  [key: string]: string | undefined;
}

export const register = async (
    apiBase: AxiosInstance,
    name: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    terms_of_use_is_ready: boolean,
  ): Promise<TokenResponse> => {  
  try {
    const response = await apiBase.post<TokenResponse>(
      "api/v1/auth/register/",
      { name, first_name, last_name, email, password, terms_of_use_is_ready },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    
    Cookies.set("access_token", response.data.access);
    Cookies.set("refresh_token", response.data.refresh);

    apiBase.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

    return response.data;

  } catch (error: unknown) {

    if (error instanceof Error) {

      console.error("Erro ao criar conta:", error.message);
      
    } else {

      console.error("Um erro foi encontrado:", error);

    }

    throw error;

  }
  
}


export const login = async (
  apiBase: AxiosInstance, 
  email: string,
  password: string
): Promise<TokenResponse> => {

  try {
    const response = await apiBase.post<TokenResponse>('/api/v1/auth/token/', {
      email,
      password,
    });
    
    // Extraindo corretamente os tokens
    const { access, refresh } = response.data; 

    if (!access || !refresh) {
      throw new Error("A resposta do servidor não contém tokens válidos.");
    }

    // Salva os tokens nos cookies
    Cookies.set('access_token', access, { expires: 1, path: '/' });
    Cookies.set('refresh_token', refresh, { expires: 50, path: '/' });

    // Adiciona o token ao Axios
    apiBase.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    return response.data;

  } catch (error) {
    const axiosError = error as AxiosError<LoginError>;

    throw axiosError.response?.data || axiosError;
  }
};


export const logout = async (apiBase: AxiosInstance): Promise<void> => {

  try {

    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });

    delete apiBase.defaults.headers.common["Authorization"];

  } catch (error: unknown) {

    if (error instanceof Error) {

      throw error;

    } else {

      throw new Error('Erro desconhecido ao fazer logout');

    }
  }
};


export const updateUserPassword = async (
  apiBase: AxiosInstance,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const response = await apiBase.post(
      "/api/v1/auth/password/change/",
      { 
        current_password: currentPassword, 
        new_password: newPassword 
      }, // Enviando os dois campos corretamente
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

  } catch (error: unknown) {

    if (error instanceof AxiosError) {

      throw error.response?.data || error;

    } else {

      throw error;
    }

  }

};
