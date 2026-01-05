"use client";

import { useOrders } from "@/admin/hooks/order/useOrders";
import { Order, OrderStatus } from "@/admin/types/Orders";
import { useState } from "react";
import OrderRow from "./OrderRow";
import OrderDrawer from "./OrderDrawer";

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function OrdersTable({
  status,
}: {
  status: OrderStatus | "ALL";
}) {
  const [selectedDate, setSelectedDate] = useState(todayKey());

  const [selected, setSelected] = useState<{
    order: Order;
    orderNumber: number;
  } | null>(null);

  const { orders, highlightIds, fetchOrders } = useOrders(status, selectedDate);

  return (
    <>
      <div className="mb-9 flex items-center gap-3 pt-4">
        <label className="text-sm text-black">Data:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-1.5 text-md text-black/50 cursor-pointer"
        />
      </div>

      <table className="w-full text-md">
        <tbody>
          <tr className="border-b border-[#989595] text-[#313131]">
            <th className="text-left p-3">Horário</th>
            <th className="text-left p-3">Pedido</th>
            <th className="text-left p-3">Situação</th>
            <th className="text-left p-3">Total</th>
            <th className="text-left p-3">Total líquido</th>
          </tr>

          {orders.map((order, index) => (
            <OrderRow
              key={order.id}
              order={order}
              orderNumber={index + 1}
              highlight={highlightIds.includes(order.id)}
              onClick={() =>
                setSelected({
                  order,
                  orderNumber: index + 1,
                })
              }
            />
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-400">
                Nenhum pedido encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selected && (
        <OrderDrawer
          order={selected.order}
          orderNumber={selected.orderNumber}
          onClose={() => setSelected(null)}
          onUpdated={fetchOrders}
        />
      )}
    </>
  );
}
