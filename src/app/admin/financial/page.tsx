"use client";

import { useState } from "react";
import { PeriodFilter } from "@/admin/components/financial/PeriodFilter";
import { DashboardSummary } from "@/admin/components/financial/DashboardSummary";
import { RevenueBarChart } from "@/admin/components/financial/RevenueBarChart";
import { PeriodConfig } from "@/admin/types/Finance";
import { useFinance } from "@/admin/hooks/finace/useFinance";

export default function FinanceiroPage() {
  const [period, setPeriod] = useState<PeriodConfig>({
    mode: "quick",
    value: "today",
  });

  const finance = useFinance(period);

  return (
    <div className="px-6 space-y-6">
      <h2 className="text-4xl font-semibold text-black">Financeiro</h2>

      <PeriodFilter value={period} onChange={setPeriod} />

      <DashboardSummary
        orders={finance.count}
        revenueLiquid={finance.liquid}
        revenueGross={finance.gross}
        ticketAverage={finance.ticket}
      />

      <RevenueBarChart orders={finance.orders} />
    </div>
  );
}
