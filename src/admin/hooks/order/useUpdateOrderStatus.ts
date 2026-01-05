"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/admin/services/order.service";
import { OrderStatus } from "@/admin/types/OrderStatus";

export function useUpdateOrderStatus(orderId: string, onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function update(status: OrderStatus) {
    try {
      setLoading(true);
      setError(null);

      await updateOrderStatus(orderId, status);

      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Erro ao atualizar pedido");
    } finally {
      setLoading(false);
    }
  }

  return {
    update,
    loading,
    error,
  };
}
