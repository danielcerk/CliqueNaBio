import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  // Removida a regra de redirecionamento problemática
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: 'res.cloudinary.com',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'abs.twimg.com',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'static.cdninstagram.com',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.rareblocks.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.amazon.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "x.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.instagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.xx.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "br.pinterest.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"]
  },
};

export default nextConfig;