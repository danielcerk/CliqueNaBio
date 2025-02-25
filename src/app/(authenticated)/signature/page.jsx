'use client';

import React, { useEffect } from 'react';
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import Cookie from "js-cookie";
import { FaCheckCircle } from 'react-icons/fa';
import LoadingSkeleton from "./loading"
import { AlertModal } from '@/components/common/AlertModal';

const PricingTable = () => {
  const token = Cookie.get('access_token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Função para mostrar o alerta
  const showAlert = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };
  

  const [user, loadingUser, errorUser] = useAxios({
    axiosInstance,
    method: 'get',
    url: '/api/v1/account/me/',
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });



  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    script.onload = () => null;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Função para renderizar os recursos de cada plano
  const renderPlanFeatures = (plan) => {
    const features = {
      'GRÁTIS': [
        'Limite de 3 links',
        'Limite de 10 snaps',
        'Acesso básico',
      ],
      'Conexão': [
        'Limite de 6 links',
        'Limite de 50 snaps',
        'Analytics',
        'Formulário de Contato',
        'Sem marca d\'água CliqueNaBio',
        'Suporte 24/7',
      ],
      'Influência': [
        'Sem limite de links',
        'Sem limite de snaps',
        'Acesso a recursos extras',
        'Tudo do plano Conexão',
      ],
    };

    if (!features[plan]) return null;

    return features[plan].map((feature, index) => (
      <div key={index} className="flex items-center space-x-2">
        <FaCheckCircle className="text-green-500" />
        <span>{feature}</span>
      </div>
    ));
  };


  useEffect(() => {

  }, [user]);


  if (loadingUser) {
    return <LoadingSkeleton />
  }

  if (errorUser) {showAlert('error', 'Erro ao carregar os dados. Tente novamente mais tarde.');}

  return (

    <div className='min-h-screen'>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg ">

        <h2 className="text-2xl font-semibold mb-6">Seu plano</h2>

        {/* Exibindo o plano do usuário */}
        {user ? (

          <>

            {/* Planos e suas vantagens  */}
            <div className="space-y-6">
              {user.plan === 'GRÁTIS' && (
                <div className="p-4 border rounded-md bg-gray-100">
                  <h4 className="text-lg font-semibold mb-2">Plano Básico</h4>
                  <p className="text-sm text-gray-700 mb-4">Ideal para quem deseja experimentar e dar os primeiros passos na criação de um perfil interativo.</p>
                  <div className="space-y-2">
                    {renderPlanFeatures('GRÁTIS')}
                  </div>
                  <div className="mt-4">
                    <stripe-pricing-table
                      pricing-table-id={process.env.NEXT_PUBLIC_PRICING_TABLE_ID}
                      publishable-key={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}
                    ></stripe-pricing-table>
                  </div>
                </div>
              )}

              {user.plan === 'CONEXÃO' && (
                <div className="p-4 border rounded-md bg-blue-100">
                  <h4 className="text-lg font-semibold mb-2">Plano Conexão</h4>
                  <p className="text-sm text-gray-700 mb-4">Ideal para criadores de conteúdo e pequenas empresas que desejam um perfil mais dinâmico e atrativo.</p>
                  <div className="space-y-2">
                    {renderPlanFeatures('Conexão')}
                  </div>
                  <div className="mt-4">
                    <a href={process.env.NEXT_PUBLIC_LINK_CUSTOMER_PORTAL} target="_blank" className="text-blue-500 hover:underline">
                      Acesse o portal para alterar seu plano ou cancelar sua assinatura
                    </a>
                  </div>
                </div>
              )}

              {user.plan === 'INFLUÊNCIA' && (
                <div className="p-4 border rounded-md bg-yellow-100">
                  <h4 className="text-lg font-semibold mb-2">Plano Influência</h4>
                  <p className="text-sm text-gray-700 mb-4">Ideal para negócios e influenciadores que querem profissionalizar sua presença digital.</p>
                  <div className="space-y-2">
                    {renderPlanFeatures('Influência')}
                  </div>
                  <div className="mt-4">
                    <a href={process.env.NEXT_PUBLIC_LINK_CUSTOMER_PORTAL} target="_blank" className="text-blue-500 hover:underline">
                      Acesse o portal para alterar seu plano ou cancelar sua assinatura
                    </a>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <h3 className="text-lg text-gray-500">Carregando informações do plano...</h3>
        )}
      </div>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PricingTable;
