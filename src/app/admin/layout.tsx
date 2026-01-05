import { SideBar } from "@/admin/components/adminHome/Side-Bar";
import { RequireAuth } from "@/shared/auth/RequireAuth";
import { StoreSettingsProvider } from "@/admin/hooks/settings/StoreSettingsContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <StoreSettingsProvider>
        <div className="flex h-screen overflow-hidden">
          <SideBar />

          <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </StoreSettingsProvider>
    </RequireAuth>
  );
}
