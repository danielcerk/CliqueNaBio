'use client'

// Importando a função register
import { register } from '@/hooks/use-auth';
import axiosInstance from '@/helper/axios-instance';
// import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertModal } from '@/components/common/AlertModal';
import Login from '../login/Login';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    terms_of_use_is_ready: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"success" | "error" | "info">("success")
  const [modalMessage, setModalMessage] = useState("")
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  const openModalLogin = () => setIsModalOpenLogin(true);
  const closeModalLogin = () => setIsModalOpenLogin(false);

  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setModalType(type)
    setModalMessage(message)
    setIsModalOpen(true)
  }

  // Função para capturar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: `${formData.first_name} ${formData.last_name}`, 
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      terms_of_use_is_ready: formData.terms_of_use_is_ready
    };

    try {
      setLoading(true); 

      await register(axiosInstance, data.name, 
        data.first_name, data.last_name, data.email, data.password, data.terms_of_use_is_ready);

      setSuccessMessage('Conta criada com sucesso');
      showAlert("success", "Sucesso! Conta criada com sucesso!")

      router.push('/home');
    } catch (error) {

      if (error instanceof Error) {
        console.error('Erro ao criar conta:', error);
        setError('Erro ao criar conta');
        showAlert("error", "Erro ao criar conta!")
      } else {
        console.error('Erro desconhecido', error);
        setError('Erro desconhecido');
        showAlert("error", "Erro desconhecido!")
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full mx-auto relative">
      <div className="absolute h-full w-full -z-20 bg-white"></div>
      <div className="absolute h-full w-full -z-10 opacity-20"></div>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center lg:items-start lg:flex-row lg:justify-between min-h-screen">
        <div className="rounded-xl flex p-10 mt-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cadastre-se agora</h2>
            <p className="text-lg text-gray-800 mb-6">
              E tenha sua página de links personalizada em poucos minutos!
            </p>
            <Image src={"/cartoon.png"}
            alt="image"
            className="w-full max-w-md rounded-xl"
            width={400}
            height={250}></Image>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className="max-w-[450px] bg-gray-100 w-full h-fit rounded-xl p-10 lg:mt-10">
            <form onSubmit={handleSubmit} className="w-full">
              <span className="w-full block mb-5 font-bold text-xl text-gray-900 leading-[1.2]">
                Crie sua conta
              </span>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

              <div className="w-full flex flex-col items-center mt-3">
                <div className="relative w-full">
                  <input
                    className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-white rounded-[10px]"
                    type="text"
                    name="first_name"
                    placeholder="Nome"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full">
                  <input
                    className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-white rounded-[10px]"
                    type="text"
                    name="last_name"
                    placeholder="Sobrenome"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative w-full">
                  <input
                    className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-white rounded-[10px]"
                    type="email"
                    name="email"
                    placeholder="email@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative w-full flex items-center mt-3">
                  <input
                    className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-white rounded-[10px]"
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-x-4 sm:col-span-2">
                <label htmlFor="terms_of_use_is_ready" className="text-sm text-gray-600">
                  Declaro que li e aceito os <a href="#" className="font-semibold text-yellow-600">termos de uso</a>.
                </label>
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    id="terms_of_use_is_ready"
                    name="terms_of_use_is_ready"
                    checked={formData.terms_of_use_is_ready}
                    onChange={handleChange}
                    className="h-4 w-4"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-yellow-400 rounded-[10px] text-[1rem] text-gray-900 hover:scale-105 transition-all leading-[1.2] duration-500 relative z-1 font-bold"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </div>

            </form>
          </div>
          
          <div className="w-full text-center mt-5">
            <button onClick={openModalLogin}>
              <span className="block text-gray-950">Já tem uma <b className='text-yellow-500'>conta?</b></span>
            </button>
          </div>
            
          {/*<div className="flex flex-col items-center gap-5 my-5">
          <span className="">ou</span>
              <Link href="#" className="hover:scale-105 transition-all leading-[1.2] duration-500">
                <span className="text-[1.125rem] leading-[1.2] flex justify-center items-center p-4 h-[70px] rounded-[10px] shadow-md transition-all duration-500 relative bg-white text-[#555555] z-1 mb-5">
                  <Image
                    src="/icons/icon-google.png"
                    alt="Login no CliqueNaBio usando o Google"
                    width={24}
                    height={24}
                    className="mr-[15px] pb-[3px]"
                  />
                  Google
                </span>
              </Link>
          </div>*/}
        </div>
      </div>

      
      {/* Modal de Login */}
      {isModalOpenLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          id="login"
        >
          <div
            className="rounded-xl bg-gray-950 shadow-lg w-full max-w-md text-end"
            data-aos="zoom-in"
          >
            <i
              onClick={closeModalLogin}
              className="fa-solid fa-xmark cursor-pointer text-3xl text-white p-3"
            ></i>
            <Login />
          </div>
        </div>
      )}

       <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
