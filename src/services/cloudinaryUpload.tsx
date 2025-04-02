import axios from "axios";
import crypto from "crypto";

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string, timestamp: number) => {
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const getPublicIdFromUrl = (url: string) => {
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};


export const cloudinaryUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "Temporario"
  );

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME não definido.");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return response.data.secure_url;
};



export const deleteImageFromCloudinary = async (imageUrl: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

  // Verificar se as variáveis de ambiente estão definidas
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Variáveis de ambiente do Cloudinary não estão definidas.");
  }

  // Extrair o publicId da URL da imagem
  const publicId = getPublicIdFromUrl(imageUrl);
  if (!publicId) {
    throw new Error("Não foi possível extrair o publicId da URL da imagem.");
  }

  // Gerar o timestamp e a assinatura
  const timestamp = new Date().getTime();
  const signature = generateSHA1(generateSignature(publicId, apiSecret, timestamp));

  // URL da API do Cloudinary para deletar a imagem
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao deletar a imagem:", error);
    throw error;
  }
};