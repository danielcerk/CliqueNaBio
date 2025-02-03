import "../assets/styles/globals.css";
import "../assets/styles/variables.css";

import React from "react";

export const metadata = {
  title: "CliqueNaBio | Seus links, sua identidade digital",
  description: "",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="pt-br">
      <head>
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
      </head>
      <body>
        <main>
            {children}
        </main>

      </body>
    </html>
  );
}
