"use client";

import { Bar, BarChart, ResponsiveContainer, LabelList } from "recharts"
import { Users } from "lucide-react"
import type React from "react"

import axiosInstance from "@/helper/axios-instance"
import useAxios from "@/hooks/use-axios"
import Cookie from "js-cookie"

import Loading from "./loading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CountView {
  date: string;
  views: number;
}

interface Log {
  action: string;
  timestamp: string;
}

export default function Home() {
  const token = Cookie.get('access_token')

  const [dashboard, setDashboard, errorDashboard] = useAxios({
    axiosInstance, 
    method: 'get',
    url: `/api/v1/account/dashboard/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const [user, loadingUser, errorUser] = useAxios({ 
      axiosInstance,
      method: 'get',
      url: `/api/v1/account/me/`,
      othersConfig: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });

  if (setDashboard) {
    return <Loading />
  }

  if (errorDashboard) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
          <p className="text-red-500">Erro ao carregar os dados. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  const countViewsPerDate = dashboard?.count_views_per_date;

  const chartData: CountView[] = countViewsPerDate ? Object.entries(countViewsPerDate).map(([date, views]) => ({
    date,
    views: views as number
  })) : [];

  const logsList = dashboard?.logs?.slice(0, 5);

  return (
    <div className="flex flex-col flex-1 max-w-6xl mx-auto p-8 pt-6 gap-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.views ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Snaps Criados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.snaps_count}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Links Criados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.links_count}</div>
          </CardContent>
        </Card>
      </div>

      {user?.plan !== 'GRÁTIS' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visão geral</CardTitle>
            </CardHeader>
            <CardContent className="pl-2 flex items-center justify-center h-[350px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <Bar dataKey="views" fill="#facc15" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="date" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center text-lg">Sem dados disponíveis</p>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Interações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ul className="space-y-2">
                {logsList?.length ? (
                  logsList.map((log: Log, index: number) => (
                    <li key={index} className="text-gray-800">
                      <p>{log.action}</p>
                      <p className="text-sm text-gray-500">{log.timestamp}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">Sem registros disponíveis</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[200px]">
          <p className="text-gray-600 text-center text-lg">
            Métricas para análise não estão disponíveis para usuários do plano gratuito.
          </p>
        </div>
      )}
    </div>
  )
}
