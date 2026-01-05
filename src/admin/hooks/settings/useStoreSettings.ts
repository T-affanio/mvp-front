import {
  getSettings,
  pauseStore,
  resumeStore,
  updateSettings as updateSettingsService,
} from "@/admin/services/storeSettings";
import { StoreSettings } from "@/admin/types/settings";
import { UpdateStoreSettingsPayload } from "@/admin/types/storeSettings";
import { useEffect, useState, useRef } from "react";

export function useStoreSettings() {
  const [data, setData] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function load() {
    const settings = await getSettings();
    setData(settings);
    setLoading(false);
  }

 async function updateSettings(payload: UpdateStoreSettingsPayload) {
  const updated = await updateSettingsService(payload);
  setData(updated);
}

  async function pause() {
    const updated = await pauseStore();
    setData(updated);
  }

  async function resume() {
    const updated = await resumeStore();
    setData(updated);
  }

  useEffect(() => {
    load();

    // 🔁 atualiza automaticamente a cada 30s
    intervalRef.current = setInterval(() => {
      load();
    }, 30_000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    updateSettings,
    pause,
    resume,
  };
}
