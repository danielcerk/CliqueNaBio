"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

import { Users } from "lucide-react";
import { useEffect } from 'react';
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import { useState } from 'react';
import Cookie from "js-cookie";
import LoadingSkeleton from "./loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertModal } from '@/components/common/AlertModal';

interface Dashboard {
  count_views_per_date: Record<string, number>;
  views: number;
  links_count: number;
  snaps_count: number;
  traffic_origin: Record<string, number>;
  locations: Record<string, number>;
  devices: Record<string, number>;
}

interface User {
  name?: string;
  email?: string;
  phone?: string;
  biografy?: string;
  image?: string;
  plan?: string,
  showProfileForm?: boolean;
}

export default function Home() {
  const token = Cookie.get('access_token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const [dashboard, loadingDashboard, errorDashboard] = useAxios<Dashboard>({
    axiosInstance,
    method: 'get',
    url: `/api/v1/account/dashboard/`,
    othersConfig: { headers: { Authorization: `Bearer ${token}` } }
  });

  const [user, loadingUser, errorUser] = useAxios<User>({ 
    axiosInstance,
    method: 'get',
    url: `/api/v1/account/me/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

    useEffect(() => {
    if (errorDashboard) {
      showAlert('error', 'Erro ao carregar os dados. Tente novamente mais tarde.');
    }
  }, [errorDashboard]);

  useEffect(() => {
    if (errorUser) {
      showAlert('error', 'Erro ao carregar informações do usuário.');
    }
  }, [errorUser]);

  if (loadingDashboard || loadingUser) return <LoadingSkeleton />;
  if (!dashboard || !user) return null;
  

  const formatChartData = (data: Record<string, number>) => 
    Object.entries(data).map(([key, value]) => ({ key, value }));

  return (

    <div className="flex flex-col max-w-6xl mx-auto p-8 pt-6 gap-5 min-h-screen">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader><CardTitle>Visitas totais</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{dashboard?.views ?? 0}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Snaps Criados</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{dashboard?.snaps_count}</div></CardContent></Card>
        <Card><CardHeader className='flex-row items-center gap-2'><CardTitle>Links Criados</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{dashboard?.links_count}</div></CardContent></Card>
      </div>

      {user?.plan !== 'GRÁTIS' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {['Visitas por Data', 'Origem do Tráfego', 'Localização dos usuários', 'Navegadores dos usuários'].map((title, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={formatChartData(
                      dashboard?.[
                        title === 'Visitas por Data'
                          ? 'count_views_per_date'
                          : title === 'Origem do Tráfego'
                          ? 'traffic_origin'
                          : title === 'Localização dos usuários'
                          ? 'locations'
                          : 'devices'
                      ] || {}
                    )}
                  >
                    <XAxis dataKey="key" tick={{ fontSize: 12 }} />
                    <Bar dataKey="value" fill="#facc15" radius={[4, 4, 0, 0]} maxBarSize={65}>
                      <LabelList dataKey="value" position="center" />
                    </Bar>
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[200px]">
          <p className="text-gray-600 text-center text-lg">
            Métricas para análise não estão disponíveis para usuários do plano gratuito.
          </p>
        </div>
      )}

    <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}