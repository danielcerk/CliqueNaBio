import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "another-domain.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.rareblocks.xyz",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "br.pinterest.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'reqres.in',
        pathname: "/**"
      }
    ],
  },
};

export default nextConfig;
