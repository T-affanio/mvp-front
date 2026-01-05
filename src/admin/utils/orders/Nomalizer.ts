import { Order } from "@/admin/types/Orders";

export function normalizeOrder(order: any): Order {
  let address;

  if (order.deliveryType === "DELIVERY" && order.address) {
    const match = order.address.match(/^(.*?)(\d+)?$/);
    address = {
      street: match?.[1]?.trim() ?? order.address,
      number: match?.[2] ?? "",
      neighborhood: order.neighborhood ?? "",
    };
  }

  return {
    ...order,
    total: Number(order.total),
    deliveryFee: Number(order.deliveryFee ?? 0),
    address,
  };
}
