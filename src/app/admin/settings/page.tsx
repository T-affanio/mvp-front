"use client";

import { OpeningHoursEditor } from "@/admin/components/settings/OpeningHoursView";
import { StoreStatusCard } from "@/admin/components/settings/StoreStatusCard";
import { useStore } from "@/admin/hooks/settings/StoreSettingsContext";

export default function StoreSettingsPage() {
  const { data, loading, pause, resume, updateSettings } = useStore();

  if (loading) {
    return <p className="p-6 text-gray-500">Carregando…</p>;
  }

  if (!data) {
    return <p className="p-6 text-red-500">Erro ao carregar dados</p>;
  }

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Configurações da Loja
      </h1>

      <StoreStatusCard
        isOpen={data.isOpen}
        acceptOrders={data.acceptOrders}
        onPause={pause}
        onResume={resume}
      />

      {data.openingHours && (
        <OpeningHoursEditor
          value={data.openingHours}
          onChange={(hours) => updateSettings({ openingHours: hours })}
        />
      )}
    </div>
  );
}
