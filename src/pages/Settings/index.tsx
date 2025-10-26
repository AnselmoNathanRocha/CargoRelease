import { Settings as SettingsIcon } from "lucide-react";
import { HeaderPage } from "@/components/HeaderPage";
import { SettingsSidebar } from "./components/SettingsSidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Settings() {
  const location = useLocation();
  const isRootSettings = location.pathname === "/settings" || location.pathname === "/settings/";

  if (isRootSettings) {
    return <Navigate to="/settings/responsaveis" replace />;
  }

  return (
    <div className="size-full bg-gray-50">
      <HeaderPage
        icon={SettingsIcon}
        title="Configurações do Sistema"
        description="Gerencie responsáveis e configurações de segurança"
      />

      <div className="h-[calc(100%-124px)] flex flex-col sm:flex-row">
        <SettingsSidebar />
        
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
