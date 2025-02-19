"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ImageIcon, Trash2, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Cookie from "js-cookie";
import Loading from "./loading";
import axiosInstance from "@/helper/axios-instance";
import useAxios from "@/hooks/use-axios";
import { cloudinaryUpload } from "@/hooks/cloudinaryUpload";
import { createLink } from "@/hooks/use-links";
import { createSnap } from "@/hooks/use-snaps";

interface ContentItem {
  id: string;
  type: "link" | "photo";
  content: string;
  url?: string;
  name?: string;
  small_description?: string;
}

interface BioData {
  name: string;
  username: string;
  bio: string;
  profilePicture: string;
  content: ContentItem[];
  location: string;
}

interface UserData {
  id: string;
  plan?: "GRÁTIS" | "CONEXÃO" | "INFLUÊNCIA";
  name?: string;
}

interface LinkData {
  url: string;
  social_network: string;
  username: string;
}

const BioEditor = () => {
  const token = Cookie.get("access_token");

  const [userData, loadingUser, errorUser] = useAxios<UserData | null>({
    axiosInstance,
    method: "get",
    url: `/api/v1/account/me/`,
    othersConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const username = userData?.name || '';

  const [bioData, setBioData] = useState<BioData>({
    name: "",
    username: "",
    bio: "",
    profilePicture: "",
    content: [],
    location: "",
  });

  const [planLimits, setPlanLimits] = useState({ maxLinks: 0, maxSnaps: 0 });
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (userData && typeof userData === "object" && "plan" in userData) {
      const plan = userData.plan ?? "GRÁTIS";
      const limits = {
        GRÁTIS: { maxLinks: 3, maxSnaps: 10 },
        CONEXÃO: { maxLinks: 6, maxSnaps: 50 },
        INFLUÊNCIA: { maxLinks: Infinity, maxSnaps: Infinity },
      };
      setPlanLimits(limits[plan] || limits['GRÁTIS']);
    }
  }, [userData]);

  const addContent = (type: "link" | "photo") => {
    const linksCount = bioData.content.filter((item) => item.type === "link").length;
    const snapsCount = bioData.content.filter((item) => item.type === "photo").length;

    if ((type === "link" && linksCount >= planLimits.maxLinks) || (type === "photo" && snapsCount >= planLimits.maxSnaps)) {
      setShowErrorModal(true);
      return;
    }

    const newContent: ContentItem = { id: Date.now().toString(), type, content: "" };
    setBioData((prev) => ({ ...prev, content: [...prev.content, newContent] }));
  };

  const updateContent = (id: string, content: string, url?: string, name?: string, small_description?: string) => {
    setBioData((prev) => ({
      ...prev,
      content: prev.content.map((item) =>
        item.id === id ? { ...item, content, url: url || item.url, name: name || item.name, small_description: small_description || item.small_description } : item
      ),
    }));
  };

  const removeContent = (id: string) => {
    setBioData((prev) => ({
      ...prev,
      content: prev.content.filter((item) => item.id !== id),
    }));
  };

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      try {
        const imageUrl = await cloudinaryUpload(file);
        updateContent(id, imageUrl);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        alert("Erro ao fazer upload da imagem. Tente novamente.");
      }
    }
  };

  const [loadingSave, setLoadingSave] = useState(false);

  const saveContent = async (item: ContentItem) => {
    setLoadingSave(true);
    try {
      if (item.type === "link") {
        const linkData = {
          url: item.url || "",
          social_network: "",
          username: username,
        };

        if (!isValidUrl(linkData.url)) {
          console.error("URL inválido:", linkData.url);
          alert("Por favor, insira um URL válido.");
          return;
        }

        console.log("Dados do link que serão enviados:", linkData);
        await createLink(axiosInstance, linkData);
      } else if (item.type === "photo") {
        const snapData = {
          name: item.name || "My Snap",
          small_description: item.small_description || "",
          image: item.content || item.url || "",
        };

        await createSnap(axiosInstance, snapData);
      }
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
    } finally {
      setLoadingSave(false);
    }
  };

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  if (loadingUser) {
    return <Loading />;
  }

  if (errorUser) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
          <p className="text-red-500">Erro ao carregar os dados. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Editor de Bio</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button onClick={() => addContent("link")} className="flex items-center gap-2">
          <Globe className="w-5 h-5" /> Adicionar Link
        </Button>
        <Button onClick={() => addContent("photo")} className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" /> Adicionar Snap
        </Button>
      </div>

      <div className="columns-3 gap-6">
        {bioData.content.map((item) => (
          <Card key={item.id} className="p-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit card-content">
            <CardContent className="flex flex-col items-center gap-4">
              {item.type === "link" && (
                <>
                  <Globe className="w-8 h-8 text-gray-500" />
                  <Input
                    type="url"
                    className="w-full text-gray-500"
                    placeholder="https://exemplo.com"
                    value={item.url || ""}
                    onChange={(e) => updateContent(item.id, item.content, e.target.value)}
                    required
                  />
                </>
              )}

              {item.type === "photo" && (
                <>
                  {item.content ? (
                    <Image
                      key={item.id}
                      src={item.content}
                      alt="Uploaded"
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                      unoptimized
                    />
                  ) : (
                    <label htmlFor={`file-input-${item.id}`} className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="w-10 h-10 text-gray-500" />
                      <span className="text-gray-600 text-sm">Enviar uma imagem</span>
                    </label>
                  )}
                  <input
                    id={`file-input-${item.id}`}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(item.id, e)}
                    required
                  />
                  <Input
                    type="text"
                    className="w-full text-gray-500"
                    placeholder="Nome do Snap"
                    value={item.name || ""}
                    onChange={(e) => updateContent(item.id, item.content, item.url, e.target.value, item.small_description)}
                    required
                  />
                  <Input
                    type="text"
                    className="w-full text-gray-500"
                    placeholder="Descrição pequena do Snap"
                    value={item.small_description || ""}
                    onChange={(e) => updateContent(item.id, item.content, item.url, item.name, e.target.value)}
                    required
                  />
                  <Input
                    type="url"
                    className="w-full text-gray-500"
                    placeholder="Ou insira um link de imagem"
                    value={item.url || ""}
                    onChange={(e) => updateContent(item.id, item.content, e.target.value, item.name, item.small_description)}
                  />
                </>
              )}

              <Button variant="secondary" size="sm" onClick={() => saveContent(item)}>
                <Save className="w-4 h-4" /> {loadingSave ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => removeContent(item.id)}
              >
                <Trash2 className="w-4 h-4" />
                Remover
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-red-600">Limite atingido</h3>
            <p className="text-gray-700 mt-2">
              Você atingiu o limite do seu plano. Considere fazer um upgrade para adicionar mais itens.
            </p>
            <Button className="mt-4" onClick={() => setShowErrorModal(false)}>Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioEditor;


// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Globe, ImageIcon, Trash2, Save } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import Cookie from "js-cookie";
// import Loading from "./loading";
// import axiosInstance from "@/helper/axios-instance";
// import useAxios from "@/hooks/use-axios";
// import { cloudinaryUpload } from "@/hooks/cloudinaryUpload";
// // Supondo que você já tenha essas funções importadas
// import { createLink } from "@/hooks/use-links";
// import { createSnap } from "@/hooks/use-snaps";

// interface ContentItem {
//   id: string;
//   type: "link" | "photo";
//   content: string;
//   url?: string;
//   name?: string;
//   small_description?: string;
// }

// interface BioData {
//   name: string;
//   username: string;
//   bio: string;
//   profilePicture: string;
//   content: ContentItem[];
//   location: string;
// }

// interface UserData {
//   id: string;  // Adicionando id
//   plan?: "GRÁTIS" | "CONEXÃO" | "INFLUÊNCIA";
//   name?: string;
// }


// interface LinkData {
//   url: string;
//   social_network: string;
//   username: string;
// }



// const BioEditor = () => {
//   const token = Cookie.get("access_token");

//   const [userData, loadingUser, errorUser] = useAxios<UserData | null>({
//     axiosInstance,
//     method: "get",
//     url: `/api/v1/account/me/`,
//     othersConfig: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });

//   const username = userData?.name || '';

//   const [bioData, setBioData] = useState<BioData>({
//     name: "",
//     username: "",
//     bio: "",
//     profilePicture: "",
//     content: [],
//     location: "",
//   });

//   const [planLimits, setPlanLimits] = useState({ maxLinks: 0, maxSnaps: 0 });
//   const [showErrorModal, setShowErrorModal] = useState(false);


//     useEffect(() => {
//       if (userData && typeof userData === "object" && "plan" in userData) {
//         const plan = userData.plan ?? "GRÁTIS";
//         const limits = {
//           GRÁTIS: { maxLinks: 3, maxSnaps: 10 },
//           CONEXÃO: { maxLinks: 6, maxSnaps: 50 },
//           INFLUÊNCIA: { maxLinks: Infinity, maxSnaps: Infinity },
//         };
//         setPlanLimits(limits[plan] || limits['GRÁTIS']);
//       }
//     }, [userData]);
    
//   const addContent = (type: "link" | "photo") => {
//     const linksCount = bioData.content.filter((item) => item.type === "link").length;
//     const snapsCount = bioData.content.filter((item) => item.type === "photo").length;

//     // Verifica os limites antes de adicionar
//     if ((type === "link" && linksCount >= planLimits.maxLinks) || (type === "photo" && snapsCount >= planLimits.maxSnaps)) {
//       setShowErrorModal(true);
//       return;
//     }

//     const newContent: ContentItem = { id: Date.now().toString(), type, content: "" };
//     setBioData((prev) => ({ ...prev, content: [...prev.content, newContent] }));
//   };

//   const updateContent = (id: string, content: string, url?: string, name?: string, small_description?: string) => {
//     setBioData((prev) => ({
//       ...prev,
//       content: prev.content.map((item) =>
//         item.id === id ? { ...item, content, url: url || item.url, name: name || item.name, small_description: small_description || item.small_description } : item
//       ),
//     }));
//   };

//   const removeContent = (id: string) => {
//     setBioData((prev) => ({
//       ...prev,
//       content: prev.content.filter((item) => item.id !== id),
//     }));
//   };



//   const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
  
//       try {
//         const imageUrl = await cloudinaryUpload(file); // Faz o upload da imagem
//         updateContent(id, imageUrl); // Armazena a URL da imagem no estado
//       } catch (error) {
//         console.error("Erro ao fazer upload da imagem:", error);
//         alert("Erro ao fazer upload da imagem. Tente novamente.");
//       }
//     }
//   };
//   const [loadingSave, setLoadingSave] = useState(false);

//   const saveContent = async (item: ContentItem) => {
//     setLoadingSave(true); // Mostra um estado de carregamento
//     try {
//       if (item.type === "link") {
//         const linkData = {
//           url: item.url || "",
//           social_network: "Facebook",
//           username: username,
//         };
  
//         if (!isValidUrl(linkData.url)) {
//           console.error("URL inválido:", linkData.url);
//           alert("Por favor, insira um URL válido.");
//           return;
//         }
  
//         console.log("Dados do link que serão enviados:", linkData);
//         await createLink(axiosInstance, linkData);
//       } else if (item.type === "photo") {
//         const snapData = {
//           name: item.name || "My Snap",
//           small_description: item.small_description || "",
//           image: item.content || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", // Aqui, item.content deve ser a URL da imagem
//         };
  
//         await createSnap(axiosInstance, snapData);
//       }
//     } catch (error) {
//       console.error("Erro ao salvar conteúdo:", error);
//     } finally {
//       setLoadingSave(false);
//     }
//   };

//   function isValidUrl(url: string): boolean {
//     try {
//       new URL(url); 
//       return true; 
//     } catch (error) {
//       console.log(error)
//       return false; 
//     }
//   }
  

//   if (loadingUser) {
//     return <Loading />;
//   }

 
//   if (errorUser) {
//     return (
//       <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
//         <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
//           <p className="text-red-500">Erro ao carregar os dados. Tente novamente mais tarde.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Editor de Bio</h2>

//       {/* Ações para Adicionar Conteúdo */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <Button onClick={() => addContent("link")} className="flex items-center gap-2">
//           <Globe className="w-5 h-5" /> Adicionar Link
//         </Button>
//         <Button onClick={() => addContent("photo")} className="flex items-center gap-2">
//           <ImageIcon className="w-5 h-5" /> Adicionar Snap
//         </Button>
//       </div>

//       {/* Exibição do Conteúdo Adicionado */}
//       <div className="columns-3 gap-6">
//         {bioData.content.map((item) => (
//           <Card key={item.id} className="p-4 shadow-md hover:shadow-lg transition-shadow w-fit max-h-fit card-content">
//             <CardContent className="flex flex-col items-center gap-4">
//               {item.type === "link" && (
//                 <>
//                   <Globe className="w-8 h-8 text-gray-500" />
//                   <Input
//                     type="url"
//                     className="w-full text-gray-500"
//                     placeholder="https://exemplo.com"
//                     value={item.url || ""}
//                     onChange={(e) => updateContent(item.id, item.content, e.target.value)}
//                     required
//                   />
//                 </>
//               )}

//               {item.type === "photo" && (
//                 <>
//                   {item.content ? (
//                     <Image
//                       key={item.id}
//                       src={item.content} // URL da imagem
//                       alt="Uploaded"
//                       width={100}
//                       height={100}
//                       className="rounded-md object-cover"
//                       unoptimized
//                     />
//                   ) : (
//                     <label htmlFor={`file-input-${item.id}`} className="cursor-pointer flex flex-col items-center">
//                       <ImageIcon className="w-10 h-10 text-gray-500" />
//                       <span className="text-gray-600 text-sm">Enviar uma imagem</span>
//                     </label>
//                   )}
//                   <input
//                     id={`file-input-${item.id}`}
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={(e) => handlePhotoUpload(item.id, e)}
//                     required
//                   />
//                   <Input
//                     type="text"
//                     className="w-full text-gray-500"
//                     placeholder="Nome do Snap"
//                     value={item.name || ""}
//                     onChange={(e) => updateContent(item.id, item.content, item.url, e.target.value, item.small_description)}
//                     required
//                   />
//                   <Input
//                     type="text"
//                     className="w-full text-gray-500"
//                     placeholder="Descrição pequena do Snap"
//                     value={item.small_description || ""}
//                     onChange={(e) => updateContent(item.id, item.content, item.url, item.name, e.target.value)}
//                     required
//                   />
//                 </>
//               )}

//               <Button variant="secondary" size="sm" onClick={() => saveContent(item)}>
//                 <Save className="w-4 h-4" /> {loadingSave ? 'Salvando...' : 'Salvar'}
//               </Button>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 className="w-full flex items-center gap-2"
//                 onClick={() => removeContent(item.id)}
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Remover
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Modal de Erro */}
//       {showErrorModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h3 className="text-lg font-bold text-red-600">Limite atingido</h3>
//             <p className="text-gray-700 mt-2">
//               Você atingiu o limite do seu plano. Considere fazer um upgrade para adicionar mais itens.
//             </p>
//             <Button className="mt-4" onClick={() => setShowErrorModal(false)}>Fechar</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BioEditor;
