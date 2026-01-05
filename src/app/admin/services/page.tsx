"use client";

import { ServiceTab } from "@/admin/components/service-Adm/ServiceTab";

export default function ServiceAdminPage() {
  return (
    <div className="px-4 ">
      <h1 className="text-4xl font-semibold text-black mb-6">
        Painel de Serviços
      </h1>
      <ServiceTab />
    </div>
  );
}
