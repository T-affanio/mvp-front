export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DaySchedule = {
  enabled: boolean;
  open?: string;
  close?: string;
};

export type OpeningHours = Record<DayKey, DaySchedule>;

export type StoreSettings = {
  id: string;
  storeName: string; // 👈 importante

  isOpen: boolean;
  acceptOrders: boolean;
  openingHours: OpeningHours;
};

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Seg",
  tuesday: "Ter",
  wednesday: "Qua",
  thursday: "Qui",
  friday: "Sex",
  saturday: "Sáb",
  sunday: "Dom",
};
