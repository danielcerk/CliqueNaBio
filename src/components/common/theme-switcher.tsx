'use client'

import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center w-full gap-3  ">
      <i className="fa-regular fa-sun bg-white p-3 text-black cursor-pointer" onClick={() => setTheme("light")}></i>
      <i className="fa-solid fa-moon bg-white text-black p-3 cursor-pointer" onClick={() => setTheme("dark")}></i>
    </div>
  );
}
