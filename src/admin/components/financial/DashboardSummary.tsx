"use client";

export function DashboardSummary({
  orders,
  revenueLiquid,
  revenueGross,
  ticketAverage,
}: {
  orders: number;
  revenueLiquid: number;
  revenueGross: number;
  ticketAverage: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 rounded-xl border bg-gray-50 overflow-hidden">
      <MainCard orders={orders} revenue={revenueLiquid} />

      <InfoCard
        title="Ticket médio"
        value={`R$ ${ticketAverage.toFixed(2)}`}
      />

      <InfoCard
        title="Receita bruta"
        value={`R$ ${revenueGross.toFixed(2)}`}
      />

      <InfoCard
        title="Taxa de entrega"
        value={`R$ ${(revenueGross - revenueLiquid).toFixed(2)}`}
      />
    </div>
  );
}

function MainCard({ orders, revenue }: any) {
  return (
    <div className="bg-emerald-500 text-white p-6">
      <p className="text-xs uppercase opacity-80">
        Pedidos concluídos
      </p>
      <p className="text-4xl font-semibold">{orders}</p>

      <p className="mt-4 text-xs uppercase opacity-80">
        Receita líquida
      </p>
      <p className="text-2xl font-semibold">
        R$ {revenue.toFixed(2)}
      </p>
    </div>
  );
}

function InfoCard({ title, value }: any) {
  return (
    <div className="p-6 border-t md:border-t-0 md:border-l">
      <p className="text-xs uppercase text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-black">{value}</p>
    </div>
  );
}
