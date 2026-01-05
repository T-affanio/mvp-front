"use client";

import { createContext, useContext } from "react";
import { useStoreSettings } from "./useStoreSettings";
import { StoreSettings } from "@/admin/types/settings";

type StoreContextType = {
  data: StoreSettings | null;
  loading: boolean;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  updateSettings: (payload: Partial<StoreSettings>) => Promise<void>;
};

const StoreSettingsContext = createContext<StoreContextType | null>(null);

export function StoreSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useStoreSettings();

  return (
    <StoreSettingsContext.Provider value={store}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreSettingsContext);
  if (!ctx) {
    throw new Error("useStore deve estar dentro de StoreSettingsProvider");
  }
  return ctx;
}
