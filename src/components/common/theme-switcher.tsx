'use client'

import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  const pathname = usePathname();

  // Verifica se a rota é /<qualquer-coisa>
  const isSlugRoute = pathname && pathname.startsWith('/@');

  // Se for rota de slug, não renderiza o componente
  if (isSlugRoute) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full gap-3  ">
      <i className="fa-regular fa-sun bg-white rounded-full p-3 text-black cursor-pointer shadow-lg" onClick={() => setTheme("light")}></i>
      <i className="fa-solid fa-moon bg-white rounded-full text-black p-3 cursor-pointer shadow-lg" onClick={() => setTheme("dark")}></i>
    </div>
  );
}
