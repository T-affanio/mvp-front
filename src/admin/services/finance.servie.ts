import { api } from "../../shared/api/api";
import { Order } from "../types/Orders";

export const FinanceService = {
  async listOrders(): Promise<Order[]> {
    const res = await api.get<Order[]>("/orders");

    // 👉 só pedidos concluídos
    return res.data.filter((o) => o.status === "FINISHED");
  },
};
