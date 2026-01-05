"use client";

import { useRecentOrders } from "@/admin/hooks/order/useRecentOrders";
import { Order } from "../../types/Orders";

type Props = {
  onNewOrder?: (order: Order) => void;
};

export function RecentOrdersMobile({ onNewOrder }: Props) {
  const { orders, loading, highlightIds } = useRecentOrders(onNewOrder);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm md:hidden">
        Carregando pedidos...
      </div>
    );
  }

  const lastOrders = orders.slice(-5);
  const startNumber = orders.length - lastOrders.length;

  if (lastOrders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 font-semibold md:hidden">
        Nenhum pedido hoje
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-4 px-1">
      {lastOrders.map((order, index) => {
        const netTotal = order.total - order.deliveryFee;
        const orderNumber = startNumber + index + 1;
        const highlight = highlightIds.includes(order.id);

        return (
          <div
            key={order.id}
            className={`
              rounded-2xl border
              p-4 bg-white
              shadow-sm
              transition
              ${
                highlight
                  ? "border-green-400 bg-green-50 animate-pulse"
                  : "border-gray-200"
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  #{orderNumber} {order.customerName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                {order.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-semibold text-gray-900">
                  R$ {order.total.toFixed(2)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-gray-500">Líquido</p>
                <p className="font-bold text-green-700">
                  R$ {netTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
