import { Order } from "@/admin/types/Orders";
import { PeriodConfig } from "@/admin/types/Finance";

export function filterOrders(
  orders: Order[],
  period: PeriodConfig
) {
  const now = new Date();

  return orders.filter((order) => {
    const date = new Date(order.createdAt);

    if (period.mode === "quick") {
      if (period.value === "today") {
        return date.toDateString() === now.toDateString();
      }

      if (period.value === "week") {
        return (
          now.getTime() - date.getTime() <=
          7 * 24 * 60 * 60 * 1000
        );
      }

      if (period.value === "month") {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }
    }

    if (period.mode === "day") {
      return (
        date.toISOString().slice(0, 10) ===
        period.date
      );
    }

    if (period.mode === "range") {
      const from = new Date(period.from);
      const to = new Date(period.to);
      return date >= from && date <= to;
    }

    return true;
  });
}
