import { api } from "../../shared/api/api";
import { DeliveryArea } from "../types/Delivery";

export const DeliveryService = {
  list: async (): Promise<DeliveryArea[]> =>
    (await api.get("/delivery-area")).data,

  create: async (data: Partial<DeliveryArea>) =>
    api.post("/delivery-area", data),

  update: async (id: string, data: Partial<DeliveryArea>) =>
    api.put(`/delivery-area/${id}`, data),

  delete: async (id: string) => api.delete(`/delivery-area/${id}`),
};



export async function getDeliveryAreas(neighborhood: string) {
  const { data } = await api.get("/delivery-area", {
    params: { neighborhood },
  });

  return Array.isArray(data) ? (data as DeliveryArea[]) : [];
}
