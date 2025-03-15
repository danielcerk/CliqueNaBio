"use client";

import { useState, useEffect, useCallback } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import { useParams } from "next/navigation"; 
import { nanoid } from "nanoid";
import { AlertModal } from '@/components/common/AlertModal';
import UserNotFound from "@/app/user-not-found";
import LoadingSkeleton from "./loading-skeleton";
import ThemeProvider from "@/providers/theme-provider";
import ThemeSwitcher from "@/components/common/theme-switcher";
// import { Metadata } from "next";

import axios from 'axios';


import { BioData} from "../../../lib/types"

export default function ViewBio() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
  const [modalMessage, setModalMessage] = useState('');

  // Função para mostrar o alerta
  const showAlert = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  }, []);

  const { slug } = useParams(); // Pegue o slug da URL
  const [bioData, setBioData] = useState<BioData>({
    id: 0,
    name: "",
    biografy: "",
    image: "",
    banner: "",
    content: [],
    form_contact: false,
    copyright: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setError("Slug não encontrado na URL.");
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
  
        if (!slug) {
          showAlert('error', 'Usuário não encontrado na URL!');
        }
  
        const profileResponse = await axiosInstance.get(`/api/v1/profile/${slug}/`);
        const profileData = profileResponse.data;
  
        const links = profileData.links.map((link: any) => ({
          id: nanoid(),
          type: "link" as const,
          content: link.url || "",
          url: link.url || "",
          owner: link.owner || "",
          title: link.title || "",
          og_image: link.og_image || "",
          is_profile_link: link.is_profile_link || false,
          social_network: link.social_network || "",
          username: link.username || "",
          icon: link.icon || "",
          created_at: link.created_at || "",
          updated_at: link.updated_at || "",
        }));
  
        const snaps = profileData.snaps.map((snap: any) => ({
          id: nanoid(),
          type: "photo" as const,
          content: snap.name || "",
          url: snap.image || "",
          small_description: snap.small_description || "",
          updated_at: snap.updated_at || snap.created_at || "",
        }));
  
        setBioData({
          id: profileData.id,
          name: profileData.name,
          biografy: profileData.biografy,
          image: profileData.image,
          banner: profileData.banner,
          content: [...links, ...snaps],
          form_contact: profileData.form_contact,
          copyright: profileData.copyright,
        });
      } catch (err) {
        let errorMessage = "Erro ao carregar dados.";
  
        if (axios.isAxiosError(err)) {
          errorMessage += ` ${err.response?.data?.message || err.message}`;
        } else if (err instanceof Error) {
          errorMessage += ` ${err.message}`;
        } else {
          errorMessage += " Erro desconhecido.";
        }
  
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [slug, showAlert]);

  return (
    <>
      {loading ? (
          <div className="flex flex-col lg:flex-row">
          <div className="mx-auto">
            <LoadingSkeleton />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          {error ? (
             <UserNotFound></UserNotFound>
          ) : (
            <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem>
              <div className="w-full bg-gray-100 dark:bg-gray-900 py-5 ">
                <div className="fixed z-50 right-4 top-24">
                  <ThemeSwitcher />
                </div>
                <div className="w-full flex justify-center">
                <MobileScreen bioData={bioData} />
                </div>
              </div>
           </ThemeProvider>
          )}
          <AlertModal
            type={modalType}
            message={modalMessage}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </>

  );
}
