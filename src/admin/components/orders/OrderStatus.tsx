export default function OrderStatus({
  status,
}: {
  status: string;
}) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-200 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-700",
    FINISHED: "bg-green-500 text-white",
    CANCELED: "bg-red-200 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${map[status]}`}
    >
      {status}
    </span>
  );
}
