"use client";

import { Order } from "@/admin/types/Orders";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function RevenueBarChart({
  orders,
}: {
  orders: Order[];
}) {
  const map: Record<string, number> = {};

  orders.forEach((o) => {
    const day = new Date(o.createdAt).toLocaleDateString(
      "pt-BR",
      { day: "2-digit", month: "2-digit" }
    );

    const value = o.total - o.deliveryFee;
    map[day] = (map[day] || 0) + value;
  });

  const data = Object.entries(map).map(
    ([date, value]) => ({ date, value })
  );

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-600">
        Nenhum pedido concluído no período
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border">
      <h3 className="font-semibold mb-4 text-black">
        Receita líquida por dia
      </h3>

      <div className="h-[300]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
