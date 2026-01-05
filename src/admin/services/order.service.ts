import { api } from "../../shared/api/api";
import { Order } from "../types/Orders";
import { OrderStatus } from "../types/OrderStatus";
import { normalizeOrder } from "../utils/orders/Nomalizer";
import { CreateOrderDTO } from "@/client/types/CreateOrderDTO";

export async function getOrders(): Promise<Order[]> {
  const { data } = await api.get("/orders");
  return data.map(normalizeOrder);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  await api.patch(`/orders/${orderId}/status`, { status });
}
export async function createOrder(payload: CreateOrderDTO) {
  const { data } = await api.post("/orders", payload);

  return data;
}
