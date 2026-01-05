import { api } from "../../shared/api/api";
import { Promotion } from "../hooks/useActivePromotion";

export async function getActivePromotions(): Promise<Promotion[]> {
  const { data } = await api.get("/promotions/active");
  return data ?? [];
}
