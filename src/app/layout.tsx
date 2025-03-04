import "../assets/styles/globals.css";
import "../assets/styles/variables.css";

import React from "react";
import Script from 'next/script';

import { Poppins, DM_Serif_Text } from "next/font/google";


// Importando fontes via next/font/google para melhor performance
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "CliqueNaBio | Guarde memórias e experiências em um link na bio",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" type="image/x-icon" href="/icons/image.ico" />
        <meta name="description" content="CliqueNaBio é uma plataforma poderosa que permite criar links personalizados, estéticos e otimizados para suas redes sociais, ajudando você a destacar seus momentos e experiências.
        Com o CliqueNaBio, você deixa seu espaço a sua cara, totalmente personalizado e de graça!" />
        <meta name="keywords" content="CliqueNaBio, cliquenabio, Cliquenabio, link na bio, Linktree, linktree,
        compartilhar momentos, postar fotos, catálogo profissional, catálogo para freelancer" />
        <meta name="author" content="CliqueNaBio" />
        <meta property="og:title" content="CliqueNaBio | Guarde memórias e experiências em um link na bio" />
        <meta property="og:description" content="CliqueNaBio é um espaço completo para tornar seus momentos e experiências mais aesthetics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cliquenabio.vercel.app" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <Script type="application/ld+json" id="json-ld">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "CliqueNaBio",
            "url": "https://cliquenabio.vercel.app/",
            "description": "CliqueNaBio é uma plataforma poderosa que permite criar links personalizados, estéticos e otimizados para suas redes sociais, ajudando você a destacar seus momentos e experiências.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "softwareVersion": "1.0",
            "creator": {
              "@type": "Organization",
              "name": "CliqueNaBio",
              "url": "https://cliquenabio.vercel.app/"
            },
            "offers": {
              "@type": "Offer",
              "price": "Sob Consulta",
              "priceCurrency": "BRL",
              "availability": "https://schema.org/InStock"
            }
          })}
        </Script>

        {/* Script do Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N7VDCH1XYJ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N7VDCH1XYJ');
          `}
        </Script>
      </head>

      <body className={`${poppins.className} ${dmSerif.className}`}>
      
       
        <main className="bg-white">
            {children}
        </main>

      </body>
    </html>
  );
}
