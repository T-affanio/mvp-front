import { api } from "../../shared/api/api";

export type Promotion = {
  id: string;
  name: string;
  products?: {
    product: {
      id: string;
    };
  }[];
};

export async function getActivePromotions(): Promise<Promotion[]> {
  const { data } = await api.get<Promotion[]>("/promotions/active");
  return data ?? [];
}

export const PromotionApi = {
  list: async () => {
    const res = await api.get("/promotions");
    return res.data;
  },

  createProduct: async (data: {
    name: string;
    active: boolean;
    productIds: string[];
    discountType: "FIXED" | "PERCENT";
    discountValue: number;
  }) => {
    return api.post(`/promotions/product`, data);
  },

  update: async (
    id: string,
    data: {
      name: string;
      active: boolean;
      discountType: "FIXED" | "PERCENT";
      discountValue: number;
      productIds: string[];
    }
  ) => {
    return api.put(`/promotions/${id}`, data);
  },

  toggle: (id: string, active: boolean) =>
    api.patch(`/promotions/${id}/status`, { active }),

  delete: (id: string) =>
    api.delete(`/promotions/${id}`),
};
