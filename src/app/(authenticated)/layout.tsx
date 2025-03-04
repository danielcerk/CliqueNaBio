import SideBar from "@/components/layout/Sidebar";
import ThemeProvider from "@/providers/theme-provider";
import ThemeSwitcher from "@/components/common/theme-switcher";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
