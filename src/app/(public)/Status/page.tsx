'use client'

import React, { useEffect, useState } from "react";
import axiosInstance from "@/helper/axios-instance";
import Image from "next/image";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Loading from "./loading";

// Registrar os componentes necessários para o Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface AppStatusData {
  status_app: boolean;
  status_db: boolean;
  count_user_per_date: { [key: string]: number };
  count_communities_per_date: { [key: string]: number };
  count_reclamations_per_date: { [key: string]: number };
  count_questions_per_date: { [key: string]: number };
  count_response_per_date: { [key: string]: number };
  contribuitors: { [key: string]: string };
}

export default function Status() {
  useEffect(() => {
    document.title = 'CliqueNaBio | Status';
  }, []);

  const [data, setData] = useState<AppStatusData | null>(null);

  useEffect(() => {
    // Obter os dados da API
    axiosInstance
      .get("/api/v1/status/") // Altere para a URL real da sua API
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  if (!data) {
    return <Loading></Loading>
  }

  // Preparar dados para os gráficos
  const formatChartData = (rawData: { [key: string]: number }) => {
    const labels = Object.keys(rawData);
    const values = Object.values(rawData);

    return {
      labels,
      datasets: [
        {
          label: "Quantidade",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const userChartData = formatChartData(data.count_user_per_date);
  const communityChartData = formatChartData(data.count_communities_per_date);
  const reclamationsChartData = formatChartData(data.count_reclamations_per_date);
  const questionsChartData = formatChartData(data.count_questions_per_date);
  const responsesChartData = formatChartData(data.count_response_per_date);

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Status do Aplicativo</h1>

      {/* Status geral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className={`p-4 rounded-lg ${
            data.status_app ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          Status do App: {data.status_app ? "Online" : "Offline"}
        </div>
        <div
          className={`p-4 rounded-lg ${
            data.status_db ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          Status do Banco de Dados: {data.status_db ? "Online" : "Offline"}
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4">Usuários por Data</h5>
          <Bar data={userChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4">Comunidades por Data</h5>
          <Line data={communityChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4">Reclamações por Data</h5>
          <Bar data={reclamationsChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4">Perguntas por Data</h5>
          <Line data={questionsChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4">Respostas por Data</h5>
          <Bar data={responsesChartData} />
        </div>
      </div>

      {/* Contribuidores */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Contribuidores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(data.contribuitors).map(([username, avatarUrl]) => (
            <div className="text-center" key={username}>
              <Image
                src={avatarUrl}
                alt={username}
                width={80}
                height={80}
                className="rounded-full mx-auto"
              />
              <p className="mt-2 text-lg font-medium">{username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}