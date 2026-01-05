import { Order } from "@/admin/types/Orders";
import OrderStatus from "./OrderStatus";


export default function OrderRow({
  order,
  orderNumber,
  highlight,
  onClick,
}: {
  order: Order;
  orderNumber: number;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-[#989595] cursor-pointer hover:bg-[#D8D8D8] ${
        highlight ? "bg-yellow-100" : ""
      }`}
    >
      <td className="p-3 font-semibold text-[#636363]">
        {new Date(order.createdAt).toLocaleTimeString(
          "pt-BR",
          { hour: "2-digit", minute: "2-digit" }
        )}
      </td>

      <td className="p-3 font-semibold text-[#636363]">
        #{orderNumber.toString().padStart(3, "0")} •{" "}
        {order.customerName}
      </td>

      <td className="p-3 text-[#636363]">
        <OrderStatus status={order.status} />
      </td>

      <td className="p-3 font-semibold text-[#636363]">
        R$ {order.total.toFixed(2)}
      </td>

      <td className="p-3 font-semibold text-green-600">
        R$ {(order.total - order.deliveryFee).toFixed(2)}
      </td>
    </tr>
  );
}
