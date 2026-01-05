"use client";

import { useRecentOrders } from "@/admin/hooks/order/useRecentOrders";
import { Order } from "../../types/Orders";

type Props = {
  onNewOrder?: (order: Order) => void;
};

export default function RecentOrders({ onNewOrder }: Props) {
  const { orders, loading, highlightIds } = useRecentOrders(onNewOrder);

 if (loading) {
  return (
    <tbody>
      <tr>
        <td
          colSpan={999}
          className="p-6 text-center text-gray-400 text-sm"
        >
          Carregando pedidos...
        </td>
      </tr>
    </tbody>
  );
}


  const lastOrders = orders.slice(-5);
  const startNumber = orders.length - lastOrders.length;

if (lastOrders.length === 0) {
  return (
    <tbody>
      <tr>
        <td
          colSpan={6} // ajuste conforme número de colunas
          className="p-6 text-center text-gray-500 font-semibold"
        >
          Nenhum pedido hoje
        </td>
      </tr>
    </tbody>
  );
}

  return (
    <>      
      <tbody className="hidden md:table-row-group">
        {lastOrders.map((order, index) => {
          const netTotal = order.total - order.deliveryFee;
          const orderNumber = startNumber + index + 1;
          const highlight = highlightIds.includes(order.id);

          return (
            <tr
              key={order.id}
              className={`
                border-t transition cursor-pointer
                ${highlight ? "bg-green-50 animate-pulse" : "hover:bg-gray-50"}
              `}
            >
              <td className="p-3 text-sm  md:text-base font-semibold text-gray-600">
                {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td className="p-3 text-sm  font-semibold md:text-base  text-gray-700">
                #{orderNumber} {order.customerName}
              </td>

              <td className="p-3">
                <span className="bg-blue-100 text-blue-700  text-xs px-2 py-1 rounded font-medium ">
                  {order.status}
                </span>
              </td>

              <td className="p-3 md:text-base  text-sm font-semibold text-gray-700">
                R$ {order.total.toFixed(2)}
              </td>

              <td className="p-3 text-sm md:text-base  font-bold text-green-700">
                R$ {netTotal.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
