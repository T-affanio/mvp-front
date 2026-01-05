"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getOrders } from "../../services/order.service";
import { Order } from "@/admin/types/Orders";
import { OrderStatus } from "@/admin/types/OrderStatus";

const STORAGE_KEY = "orders:lastKnownIds";

function toDateKey(date: string | Date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export function useOrders(status: OrderStatus | "ALL", selectedDate: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [highlightIds, setHighlightIds] = useState<string[]>([]);

  const previousIds = useRef<Set<string>>(new Set());
  const isFirstLoad = useRef(true);

  const playSound = () => {
    const audio = new Audio("/sounds/new-order.mp3");
    audio.volume = 0.8;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      previousIds.current = new Set(JSON.parse(stored));
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getOrders();

      const currentIds = new Set(data.map((o) => o.id));
      const newOrders = data.filter((o) => !previousIds.current.has(o.id));

      if (!isFirstLoad.current && newOrders.length > 0) {
        playSound();
        setHighlightIds(newOrders.map((o) => o.id));
        setTimeout(() => setHighlightIds([]), 4000);
      }

      previousIds.current = currentIds;
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...currentIds]));
      isFirstLoad.current = false;

      setOrders(data);
    } catch (err) {
      console.error("Erro ao carregar pedidos", err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  /* FILTRO STATUS */
  const statusFiltered =
    status === "ALL"
      ? orders
      : status === "CONFIRMED"
      ? orders.filter((o) => o.status === "PENDING" || o.status === "CONFIRMED")
      : orders.filter((o) => o.status === status);

  /* FILTRO DATA */
  const dailyOrders = statusFiltered.filter(
    (o) => toDateKey(o.createdAt) === selectedDate
  );

  const sortedOrders = [...dailyOrders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return {
    orders: sortedOrders,
    highlightIds,
    fetchOrders,
  };
}
