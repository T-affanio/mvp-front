export type PeriodMode = "quick" | "day" | "range";

export type QuickPeriod = "today" | "week" | "month";

export type PeriodConfig =
  | { mode: "quick"; value: QuickPeriod }
  | { mode: "day"; date: string } // YYYY-MM-DD
  | { mode: "range"; from: string; to: string };

export type Order = {
  id: string;
  total: number;
  deliveryFee: number;
  createdAt: string;
  status: "PENDING" | "CONFIRMED" | "FINISHED" | "CANCELED";
};
