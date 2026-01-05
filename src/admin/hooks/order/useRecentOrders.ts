"use client";

import { getOrders } from "@/admin/services/order.service";
import { Order } from "@/admin/types/Orders";
import { filterTodayOrders, sortByDateAsc } from "@/admin/utils/orders/orders";
import { playSound } from "@/admin/utils/orders/sound";
import { useEffect, useRef, useState } from "react";

export function useRecentOrders(
  onNewOrder?: (order: Order) => void
) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightIds, setHighlightIds] = useState<string[]>([]);

  const previousIds = useRef<Set<string>>(new Set());
  const isFirstLoad = useRef(true);

  async function loadOrders() {
    try {
      const data = await getOrders();
      const todayOrders = filterTodayOrders(data);

      const newOrders = todayOrders.filter(
        o => !previousIds.current.has(o.id)
      );

      if (!isFirstLoad.current && newOrders.length > 0) {
        playSound("/sounds/new-order.mp3");
        onNewOrder?.(newOrders[0]);
        setHighlightIds(newOrders.map(o => o.id));
        setTimeout(() => setHighlightIds([]), 4000);
      }

      previousIds.current = new Set(todayOrders.map(o => o.id));
      setOrders(sortByDateAsc(todayOrders));
      isFirstLoad.current = false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return { orders, loading, highlightIds };
}
