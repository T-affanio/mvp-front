"use client";

import { useUpdateOrderStatus } from "@/admin/hooks/order/useUpdateOrderStatus";
import { Order } from "@/admin/types/Orders";

type Props = {
  order: Order;
  onClose: () => void;
  onUpdated: () => void;
};

export function StatusOrder({ order, onClose, onUpdated }: Props) {
  const { update, loading, error } = useUpdateOrderStatus(order.id, () => {
    onClose();
    onUpdated();
  });

  return (
    <div className="mt-4 space-y-2 text-xs ">
      {error && (
        <p className="text-red-500 text-center text-xs">{error}</p>
      )}

      <button
        onClick={() => update("CONFIRMED")}
        disabled={loading}
        className="w-full bg-yellow-500 text-white py-2 rounded cursor-pointer"
      >
        🍳 Em preparo
      </button>

      <button
        onClick={() => update("FINISHED")}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded cursor-pointer"
      >
        ✅ Pedido pronto
      </button>

      <button
        onClick={() => update("CANCELED")}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded cursor-pointer"
      >
        ❌ Cancelar
      </button>
    </div>
  );
}
