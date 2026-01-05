"use client";

import { useEffect, useState } from "react";
import { PeriodConfig } from "@/admin/types/Finance";
import { Order } from "@/admin/types/Orders";
import { filterOrders } from "@/admin/utils/Finance/filter";
import { FinanceService } from "@/admin/services/finance.servie";

export function useFinance(period: PeriodConfig) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await FinanceService.listOrders();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = filterOrders(orders, period);

  const count = filtered.length;
  const gross = filtered.reduce((s, o) => s + o.total, 0);
  const liquid = filtered.reduce(
    (s, o) => s + (o.total - o.deliveryFee),
    0
  );

  return {
    loading,
    orders: filtered,
    count,
    gross,
    liquid,
    ticket: count ? liquid / count : 0,
  };
}
