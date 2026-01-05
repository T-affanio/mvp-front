type Props = {
  isOpen: boolean;
  acceptOrders: boolean;
  onPause: () => void;
  onResume: () => void;
};

export function StoreStatusCard({
  isOpen,
  acceptOrders,
  onPause,
  onResume,
}: Props) {
  const status = !isOpen
    ? {
        label: "Fechada (fora do horário)",
        color: "bg-red-100 text-red-700",
      }
    : acceptOrders
    ? {
        label: "Aberta · Aceitando pedidos",
        color: "bg-green-100 text-green-700",
      }
    : {
        label: "Pausada pelo administrador",
        color: "bg-yellow-100 text-yellow-700",
      };

  return (
    <div className="rounded-xl border bg-white p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-900">
          Status da Loja
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium  ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPause}
          disabled={!isOpen || !acceptOrders}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white disabled:opacity-50  cursor-pointer"
        >
          Pausar pedidos
        </button>

        <button
          onClick={onResume}
          disabled={!isOpen || acceptOrders}
          className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50  cursor-pointer"
        >
          Retomar pedidos
        </button>
      </div>
    </div>
  );
}
