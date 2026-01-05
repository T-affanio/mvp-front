import { Order } from "@/admin/types/Orders";
import { toDateKey } from "./date";

export function filterTodayOrders(orders: Order[]) {
  const today = toDateKey(new Date());
  return orders.filter(o => toDateKey(o.createdAt) === today);
}

export function sortByDateAsc(orders: Order[]) {
  return [...orders].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  );
}
