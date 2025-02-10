import SideBar from "@/components/layout/Sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 pt-10 bg-gray-100">{children}</main>
    </div>
  );
}
