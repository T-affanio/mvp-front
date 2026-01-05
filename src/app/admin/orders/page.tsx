"use client";

import OrdersTable from "@/admin/components/orders/OrdersTable";
import { useState } from "react";

export type OrderStatus = "PENDING" | "CONFIRMED" | "FINISHED" | "CANCELED";

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");

  const tabs: { id: OrderStatus | "ALL"; label: string }[] = [
    { id: "ALL", label: "Todos" },
    { id: "CONFIRMED", label: "Em aberto" },
    { id: "FINISHED", label: "Concluídos" },
    { id: "CANCELED", label: "Cancelados" },
  ];

  return (
    <div className="px-6 ">
      <h2 className="text-4xl font-semibold mb-4 text-black">Pedidos</h2>

      <div className="flex gap-6  border-b border-[#989595] text-md pt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatus(tab.id)}
            className={`pb-2 font-semibold cursor-pointer transition-colors  ${
              status === tab.id
                ? "text-[#B00E0E] border-b-2 border-[#B00E0E] scale-110"
                : "text-[#6C6B6B] hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <OrdersTable status={status} />
    </div>
  );
}
