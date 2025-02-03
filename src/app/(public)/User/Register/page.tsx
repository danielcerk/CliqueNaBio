'use client'

// Importando a função register
import { register } from '@/hooks/use-auth';
import axiosInstance from '@/helper/axios-instance';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

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

    // Validar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    // Preparando os dados para o registro
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);  // Definindo o estado de carregamento
      // Chama a função register com os dados
      const response = await register(axiosInstance, data.name, data.email, data.password);
      console.log('Registro bem-sucedido:', response);
      // Se o registro for bem-sucedido
      setSuccessMessage('Conta criada com sucesso');

      router.push('/');
    } catch (error) {
      // Lida com erros
      if (error instanceof Error) {
        console.error('Erro ao criar conta:', error.message);
        setError('Erro ao criar conta');
      } else {
        console.error('Erro desconhecido', error);
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);  // Finaliza o carregamento
    }
  };

  return (
    <div className="w-full mx-auto relative">
      <div className="absolute h-full w-full -z-20 bg-white"></div>
      <div className="absolute h-full w-full -z-10 opacity-20" style={{ backgroundImage: 'url("/register-image.webp")' }}></div>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center lg:items-start lg:flex-row lg:justify-between min-h-screen">
        <div className="rounded-xl flex p-10 mt-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cadastre-se agora</h2>
            <p className="text-lg text-gray-800 mb-6">
              E tenha sua página de links personalizada em poucos minutos!
            </p>
          </div>
        </div>

        <div className="max-w-[450px] bg-white w-full h-fit rounded-xl p-10 my-10">
          <form onSubmit={handleSubmit} className="w-full">
            <span className="w-full block mb-5 font-bold text-xl text-gray-900 leading-[1.2]">
              Crie sua conta
            </span>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

            <div className="w-full flex flex-col items-center mt-3">
              <div className="relative w-full">
                <input
                  className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-gray-100 rounded-[10px]"
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="relative w-full">
                <input
                  className="w-full text-[18px] text-gray-400 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-gray-100 rounded-[10px]"
                  type="text"
                  name="surname"
                  placeholder="Sobrenome"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div className="relative w-full">
                <input
                  className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-gray-100 rounded-[10px]"
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
                  className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-gray-100 rounded-[10px]"
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative w-full flex items-center mt-3">
                <input
                  className="w-full text-[18px] text-gray-800 py-3 leading-[1.2] outline-none pl-4 pr-4 mb-5 bg-gray-100 rounded-[10px]"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repita sua senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:col-span-2">
              <label htmlFor="agree" className="text-sm text-gray-600">
                Declaro que li e aceito os <a href="#" className="font-semibold text-yellow-600">termos de uso</a>.
              </label>
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-4">
              <button
                type="submit"
                className="w-full p-3 bg-light-yellow rounded-[10px] text-[1rem] text-gray-900 hover:scale-105 transition-all leading-[1.2] duration-[0.4s] relative z-1 font-bold"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>

            <div className="w-full text-center mt-5">
              <Link href="/login">
                <span className="block text-gray-950">Já tem uma <b className='text-yellow-500'>conta?</b></span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
