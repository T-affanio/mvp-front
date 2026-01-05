"use client";

import { api } from "@/shared/api/api";
import { useEffect, useState } from "react";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { Order } from "@/admin/types/Orders";

export const DashboardSummary = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Erro ao carregar pedidos", err);
    }
  }

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 500);
    return () => clearInterval(interval);
  }, []);

  const { ordersTodayCount, revenueToday } = useDashboardMetrics(orders);

  return (
    <section className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 mt-6">
      <h2 className="text-lg sm:text-2xl font-semibold text-black mb-4 tracking-tight">
        Acompanhamento
      </h2>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 rounded-2xl border bg-gray-50 overflow-hidden">
        {/* PEDIDOS DO DIA */}
        <div className="bg-emerald-600 text-white px-5 py-6 flex flex-col justify-center md:flex-1">
          <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">
            pedidos do dia
          </p>

          <p className="text-4xl sm:text-4xl font-bold leading-none mt-2">
            {ordersTodayCount}
          </p>

          <p className="text-xs sm:text-sm opacity-80 mt-1">
            pedidos realizados
          </p>
        </div>

        {/* RECEITA DO DIA */}
        <SimpleCard
          title="Receita do dia"
          value={`R$ ${revenueToday.toFixed(2)}`}
          subtitle="Valor líquido"
        />
      </div>
    </section>
  );
};

function SimpleCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div
      className="
      px-5 py-6
      flex flex-col justify-center
      text-black
      border-t md:border-t-0 md:border-l
      md:flex-[1.2]
    "
    >
      <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500">
        {title}
      </p>

      <p className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900">
        {value}
      </p>

      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
