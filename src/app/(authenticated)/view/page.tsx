"use client";

import { useState, useEffect } from "react";
import MobileScreen from "./dynamic-mobile-screen";
import axiosInstance from "@/helper/axios-instance";
import Cookie from "js-cookie";
import { nanoid } from "nanoid";

interface ContentItem {
  id: string;
  type: "link" | "photo" | "text";
  content: string;
  name: string;
  small_description: string;
  image: string;
  url?: string;
  owner?: string;
  title?: string;
  social_network?: string;
  username?: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}


interface ApiResponse {
  results: ContentItem[];
}

interface SnapItem {
  id: string;
  name: string;
  small_description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface SnapApiResponse {
  results: SnapItem[];
}

interface BioData {
  name: string;
  biografy: string;
  image: string;
  content: ContentItem[];
}

export default function View() {
  const token = Cookie.get("access_token");
  const [bioData, setBioData] = useState<BioData>({
    name: "",
    biografy: "",
    image: "",
    content: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await axiosInstance.get("/api/v1/account/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userResponse.data;
        const [linkResponse, snapResponse] = await Promise.all([
          axiosInstance.get("/api/v1/account/me/link/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/api/v1/account/me/snap/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const links = linkResponse.data.results.map((link: any) => ({
          id: nanoid(),
          type: "link" as const,
          content: link.url || "",
          url: link.url || "",
          owner: link.owner || "",
          title: link.title || "",
          social_network: link.social_network || "",
          username: link.username || "",
          icon: link.icon || "",
          created_at: link.created_at || "",
          updated_at: link.updated_at || "",
        }));

        const snaps = snapResponse.data.results.map((snap: SnapItem) => ({
          id: nanoid(),
          type: "photo" as const,
          content: snap.name || "",
          url: snap.image || "",
          small_description: snap.small_description || "",
          updated_at: snap.updated_at || snap.created_at || "",
        }));

        setBioData({
          name: userData.name,
          biografy: userData.biografy,
          image: userData.image,
          content: [...links, ...snaps],
        });
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados.</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:mx-auto">
        <MobileScreen bioData={bioData} />
      </div>
    </div>
  );
}