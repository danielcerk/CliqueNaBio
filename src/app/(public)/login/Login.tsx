import { login } from '@/services/auth/auth';
import axiosInstance from '@/helper/axios-instance';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertModal } from '@/components/common/AlertModal';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';
import Loading from './loading';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Função para mostrar o alerta
  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login(axiosInstance, email, password);
      showAlert('success', 'Login bem-sucedido!');
      router.push('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Email ou senha inválidos. Tente novamente.');
      showAlert('error', 'Erro! Senha ou email incorretos');

      Cookies.remove('access_token');
      Cookies.remove('refresh_token');

      delete axiosInstance.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };


  
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      (async () => {
        try {
          const response = await axiosInstance.get(`/api/v1/auth/google/callback/?code=${code}`, {
            headers: { 'Content-Type': 'application/json' },
          });

          const jwtData = response.data;

          if (jwtData.access && jwtData.refresh) {

            Cookie.set('access_token', jwtData.access, { expires: 1, secure: true });
            Cookie.set('refresh_token', jwtData.refresh, { expires: 7, secure: true });

            showAlert('success', 'Login com Google bem-sucedido!');
            router.push('/home');

          } else {
            showAlert('error', 'Erro ao receber tokens');
          }

        } catch (err) {
          showAlert('error', 'Erro ao autenticar com Google');
        }
      })();
    }
  }, [searchParams, router]);

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-wrap justify-center items-center bg-center bg-cover bg-no-repeat">
        <div className="max-w-[500px] w-full bg-gray-950 rounded-xl px-10">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(); 
            }}
          >
            <span className="w-full text-center block mb-5 font-bold text-xl text-yellow-400 leading-[1.2]">
              Conecte sua conta
            </span>

            {error && (
              <div className="w-full bg-red-500 text-white text-center p-2 rounded-md mb-4">
                {error}
              </div>
            )}

            <div className="w-full relative flex items-center mt-3">
              <span className="absolute left-4 top-4 text-gray-400">
                <i className="fas fa-credit-card"></i>
              </span>
              <input
                className="w-full bg-transparent text-[18px] text-gray-200 leading-[1.2] outline-none pl-12 pr-4 py-4 mb-5 bg-[#f7f7f7] rounded-[10px]"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu Email é necessário"
                required
              />
            </div>

            <div className="w-full relative flex items-center mt-3">
              <span className="absolute left-4 top-4 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
              <input
                className="w-full bg-transparent text-[18px] text-gray-200 leading-[1.2] outline-none pl-12 pr-4 py-4 mb-5 bg-[#f7f7f7] rounded-[10px]"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua Senha é necessária"
                required
              />
            </div>

            <div className="w-full flex justify-center items-center mt-4">
              <button
                type="submit"
                className="w-full p-3 bg-yellow-400 rounded-[10px] text-[1rem] text-gray-950 hover:scale-105 transition-all leading-[1.2] duration-500 relative z-1 font-bold"
                disabled={loading}
              >
                {loading ? "Carregando..." : 'Entrar'}
              </button>
            </div>

            {/* Links para cadastro e login com Google */}
            <div className="w-full text-center mt-5">
            <Link href="/register">
              <span className="block text-lg font-semibold text-yellow-500 hover:text-yellow-400 transition duration-300">
              <i className="fa-regular fa-circle-right"></i> Cadastre-se
              </span>
              <Image
                src="/icons/image.ico"
                alt="Icon CliqueNaBio"
                width={30}
                height={30}
                quality={100}  // Qualidade máxima
                className="rounded-3xl mx-auto py-5"
                style={{ objectFit: 'cover' }}
              />
            </Link>

              {/*<span className="mt-3 text-white">ou</span>
              <div className="flex justify-center gap-5 my-5">
                <Link href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URI}&prompt=consent&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`} className="hover:scale-105 transition-all leading-[1.2] duration-500">
                  <span className="text-[1.125rem] leading-[1.2] flex justify-center items-center p-4 h-[70px] rounded-[10px] shadow-md transition-all duration-500 relative bg-white text-[#555555] z-1 mb-5">
                    <Image
                      src="/icons/icon-google.png"
                      alt="Login no CliqueNaBio usando o Google"
                      width={24}
                      height={24}
                      className="mr-[15px] pb-[3px]"
                    />
                    Login com Google
                  </span>
                </Link>
              </div>*/}
            </div>
          </form>
        </div>
      </div>

      {/* Modal de alerta */}
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}