import { useMemo } from "react";
import { Order } from "../types/Orders";

export function useDashboardMetrics(orders: Order[]) {
  return useMemo(() => {
    const now = new Date();

    const isSameDay = (date: Date) =>
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const isSameMonth = (date: Date) =>
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const ordersToday = orders.filter((o) => isSameDay(new Date(o.createdAt)));

    const ordersMonth = orders.filter((o) =>
      isSameMonth(new Date(o.createdAt))
    );

    const revenueToday = ordersToday.reduce(
      (sum, o) => sum + (o.total - o.deliveryFee),
      0
    );
    const revenueMonth = ordersMonth.reduce(
      (sum, o) => sum + (o.total - o.deliveryFee),
      0
    );
    return {
      ordersTodayCount: ordersToday.length,
      ordersMonthCount: ordersMonth.length,
      revenueToday,
      revenueMonth,
    };
  }, [orders]);
}
