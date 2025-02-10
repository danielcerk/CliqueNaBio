'use client';

import React, { useEffect } from 'react';
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import Cookie from "js-cookie";
import { FaCheckCircle } from 'react-icons/fa';

const PricingTable = () => {
  const token = Cookie.get('access_token');

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
    script.onload = () => console.log('Stripe Pricing Table script carregado');
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

  // Verificar o valor de user.plan no console para entender o que está sendo retornado
  useEffect(() => {
    console.log('Plano do usuário:', user?.plan);
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Seu plano</h2>

      {/* Exibindo o plano do usuário */}
      {user ? (
        <>

          {/* Planos e suas vantagens */}
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
                    pricing-table-id="prctbl_1QjUuDRtCzJ3GhkZGdANyUQd"
                    publishable-key="pk_test_51Pk3r3RtCzJ3GhkZLAt3ExMMW58j7x7GGZcBFftxpwjBjPk7oUW7PY8IhVjHd4xzfdcoSke8vCchWjrMJj7gJB3200594SyOXM"
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
                  <a href="https://billing.stripe.com/p/login/test_28oaFvb7maFhg1O5kk" target="_blank" className="text-blue-500 hover:underline">
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
                  <a href="https://billing.stripe.com/p/login/test_28oaFvb7maFhg1O5kk" target="_blank" className="text-blue-500 hover:underline">
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
  );
};

export default PricingTable;
