import { StoreSettings } from "../types/settings";
import { api } from "../../shared/api/api";
import { UpdateStoreSettingsPayload } from "../types/storeSettings";

export async function getSettings(): Promise<StoreSettings> {
  const { data } = await api.get<StoreSettings>("/settings");
  return data;
}

export async function updateSettings(
  payload: UpdateStoreSettingsPayload
): Promise<StoreSettings> {
  const { data } = await api.put<StoreSettings>("/settings", payload);
  return data;
}
export async function pauseStore(): Promise<StoreSettings> {
  const { data } = await api.patch<StoreSettings>("/settings/pause");
  return data;
}

export async function resumeStore(): Promise<StoreSettings> {
  const { data } = await api.patch<StoreSettings>("/settings/resume");
  return data;
}
