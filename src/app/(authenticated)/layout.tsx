'use client';
import { useEffect, useState } from "react";
import SideBar from "@/components/layout/Sidebar";
import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/components/common/theme-switcher";

//componente de wrapper para evitar renderização no servidor

function ClientOnly({ children }: { children: React.ReactNode }){
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted){
    return null;
  }

  return <>{children}</>
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
    <div className="flex">
      <ThemeProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem>
      
        <SideBar />
      <main className="flex-1 bg-gray-100">  
        <div className="fixed z-50 right-4 top-24">
          <ThemeSwitcher />
        </div>
        {children}
      </main>
      </ThemeProvider>
    </div>
    </ClientOnly>
  );
}
