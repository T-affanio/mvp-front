import { OpeningHours } from "./settings";

export type UpdateStoreSettingsPayload = {
  openingHours?: OpeningHours | null;
};
