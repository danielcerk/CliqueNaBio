
import axios from "axios";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

let refresh = false;

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api-cliquenabio.vercel.app/'
    : 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000
})


axiosInstance.interceptors.response.use(
  resp => resp,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !refresh) {
      refresh = true;
      const refreshToken = Cookie.get('refresh_token');

      try {
        const response = await axiosInstance.post('/api/v1/auth/token/refresh/', {
          refresh: refreshToken
        });

        if (response.status === 200) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          Cookies.set('access_token', response.data.access);
          Cookies.set('refresh_token', response.data.refresh);

          // Reset da flag antes de reenviar a requisição
          refresh = false;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {

        refresh = false;
        return Promise.reject(refreshError);
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);

export default axiosInstance