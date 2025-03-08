"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axiosInstance from "@/helper/axios-instance";
import Image from "next/image";
import LoadingSkeleton from "./loading-skeleton";
import { AlertModal } from "@/components/common/AlertModal";
import ContributorsSkeleton from "./contributors-skeleton";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface AppStatusData {
  status_app: boolean;
  status_db: boolean;
  count_user_per_date: { [key: string]: number };
  count_links_per_date: { [key: string]: number };
  count_snaps_per_date: { [key: string]: number };
  count_users: number;
  contribuitors: { [key: string]: string };
}

function StatusPage() {
  const [data, setData] = useState<AppStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingContributors, setLoadingContributors] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  useEffect(() => {
    document.title = "CliqueNaBio | Status";

    axiosInstance
      .get("/api/v1/status/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => showAlert('error', `Erro ao buscar dados: ${error}`))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (data?.contribuitors) {
      setLoadingContributors(false);
    }
  }, [data]);

  if (loading) return <LoadingSkeleton />;
  if (!data) return <p className="text-center text-red-500">Erro ao carregar os dados.</p>;

  const formatChartData = (rawData: { [key: string]: number }) => {
    const allDates = Object.keys(rawData);

    if (allDates.length === 0) {
      return {
        labels: ["Sem dados"],
        datasets: [{ label: "Quantidade", data: [0], backgroundColor: "rgba(54, 162, 235, 0.6)" }],
      };
    }

    const sortedDates = allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const dataValues = sortedDates.map((date) => rawData[date] || 0);
    
    return {
      labels: sortedDates,
      datasets: [{ label: "Quantidade", data: dataValues, backgroundColor: "rgba(54, 162, 235, 0.6)" }],
    };
  };

  return (
    <div className="w-full dark:bg-gray-900">
      <div className="mx-auto max-w-7xl my-8 p-4 pt-36">
        <h1 className="text-3xl text-gray-800 dark:text-gray-200 font-bold text-center mb-8">Status do Aplicativo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className={`p-4 rounded-lg ${data.status_app ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            Status do App: {data.status_app ? "Online" : "Offline"}
          </div>
          <div className={`p-4 rounded-lg ${data.status_db ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            Status do Banco de Dados: {data.status_db ? "Online" : "Offline"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:text-gray-700 p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-4">Usuários por Data</h5>
            <Bar data={formatChartData(data.count_user_per_date)} />
          </div>
          {data.count_links_per_date && (
            <div className="bg-white dark:text-gray-700 p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-semibold mb-4">Links por Data</h5>
              <Bar data={formatChartData(data.count_links_per_date)} />
            </div>
          )}
          {data.count_snaps_per_date && (
            <div className="bg-white dark:text-gray-700 p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-semibold mb-4">Snaps por Data</h5>
              <Bar data={formatChartData(data.count_snaps_per_date)} />
            </div>
          )}
        </div>

        {loadingContributors ? (
          <ContributorsSkeleton />
        ) : (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Contribuidores</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(data.contribuitors).map(([username, avatarUrl]) => (
                <div className="text-center" key={username}>
                  <Image src={avatarUrl} alt={username} width={80} height={80} className="rounded-full mx-auto" />
                  <p className="mt-2 text-lg font-medium">{username}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(StatusPage), { ssr: false });
