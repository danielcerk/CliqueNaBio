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
  url?: string;
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
  location: string;
}

export default function View() {
  const token = Cookie.get("access_token");
  const [bioData, setBioData] = useState<BioData>({
    name: "",
    biografy: "",
    image: "",
    content: [],
    location: "",
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
          location: userData.location || "Serrinha-BA",
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



// "use client"

// import { useState, useEffect } from "react"
// import MobileScreen from "./dynamic-mobile-screen"
// import axiosInstance from "@/helper/axios-instance"
// import useAxios from "@/hooks/use-axios"
// import Cookie from "js-cookie"
// import { nanoid } from "nanoid"; // Importe nanoid para gerar chaves únicas

// interface ContentItem {
//   id: string
//   type: "link" | "photo" | "text"
//   content: string
//   url?: string 
// }

// interface ApiResponse {
//   results: ContentItem[];
// }

// interface SnapItem {
//   id: string;
//   name: string;
//   small_description: string;
//   image: string;
//   created_at: string;
//   updated_at: string;
// }

// interface SnapApiResponse {
//   results: SnapItem[];
// }


// interface BioData {
//   name: string
//   biografy: string
//   image: string
//   content: ContentItem[]
//   location: string
// }

// interface UserData {
//   name: string
//   biografy: string
//   image: string
//   location: string
// }

// export default function View() {
//   const token = Cookie.get("access_token")

//   const [userData, loadingUser, errorUser] = useAxios<UserData>({
//     axiosInstance,
//     method: "get",
//     url: `/api/v1/account/me/`,
//     othersConfig: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   })

//   const [linkData, loadingLink, errorLink] = useAxios<ApiResponse>({
//     axiosInstance,
//     method: "get",
//     url: userData ? `/api/v1/account/me/link/` : null, // Use null para pular a requisição
//     othersConfig: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });

//   const [snapData, loadingSnap, errorSnap] = useAxios<SnapApiResponse>({
//     axiosInstance,
//     method: "get",
//     url: userData ? `/api/v1/account/me/snap/` : null, // Use null para pular a requisição
//     othersConfig: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });

//   const [bioData, setBioData] = useState<BioData>({
//     name: "",
//     biografy: "",
//     image: "",
//     content: [],
//     location: "",
//   })

//   useEffect(() => {
//     if (userData) {
//       setBioData((prev) => ({
//         ...prev,
//         name: userData.name || "",
//         biografy: userData?.biografy || "",
//         image: userData?.image || "",
//         location: userData.location || "Serrinha-BA",
//       }))
//     }
//   }, [userData])

//   useEffect(() => {
//     if (snapData && Array.isArray(snapData.results)) {
//       console.log("Snaps carregados:", snapData.results);
//       setBioData((prev) => ({
//         ...prev,
//         content: [
//           ...prev.content,
//           ...snapData.results.map((snap) => ({
//             id: nanoid(), 
//             type: "photo" as const, 
//             content: snap.name || "", 
//             small_description: snap.small_description || "",
//             updated_at: snap.updated_at || snap.created_at || "",
//             url: snap.image || "", 
//           })),
//         ],
//       }));
//     } else if (snapData === null) {
//       console.log("Requisição de Snaps ignorada (userData não disponível).");
//     } else {
//       console.error("Erro na resposta da API de Snaps: resposta inválida", snapData);
//     }
//   }, [snapData]);


  
//   useEffect(() => {
//     if (linkData && Array.isArray(linkData.results)) {
//       console.log("Links carregados:", linkData.results);
//       setBioData((prev) => ({
//         ...prev,
//         content: linkData.results.map((link) => ({
//           id: nanoid(), 
//           type: "link",
//           content: link.url || "", 
//           url: link.url || "", 
//         })),
//       }));
//     } else if (linkData === null) {
//       console.log("Requisição de links ignorada (userData não disponível).");
//     } else {
//       console.error("Erro na resposta da API de links: resposta inválida", linkData);
//     }
//   }, [linkData]);

//   if (loadingUser || loadingLink || loadingSnap) {
//     return <div>Carregando...</div>;
//   }
  
//   if (errorUser || errorLink || errorSnap) {
//     return <div>Erro ao carregar dados</div>;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row">
//       <div className="lg:mx-auto">
//         <MobileScreen bioData={bioData} />
//       </div>
//     </div>
//   )
// }