"use client";

import { usePrint } from "@/admin/hooks/order/usePrint";
import { Order } from "@/admin/types/Orders";
import { formatOrderNumber } from "@/admin/utils/orders/format";
import { getOrderPrintHtml } from "./OrderPrint";
import { StatusOrder } from "./StatusOrder";

type Props = {
  order: Order;
  orderNumber: number;
  onClose: () => void;
  onUpdated: () => void;
};

export default function OrderDrawer({
  order,
  orderNumber,
  onClose,
  onUpdated,
}: Props) {
  const visualOrderNumber = formatOrderNumber(orderNumber);

  const { print, printing } = usePrint();

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="w-[360] bg-white rounded-lg shadow-2xl p-5 font-mono text-black no-print">
        {/* CABEÇALHO */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-bold tracking-widest">HOODFOOD</h2>
          <p className="text-xs">Comanda #{visualOrderNumber}</p>
          <p className="text-xs">
            {new Date(order.createdAt).toLocaleString("pt-BR")}
          </p>
        </div>

        <hr className="my-2 border-dashed" />

        {/* STATUS */}
        <div className="flex justify-between text-xs mb-2">
          <span>
            {order.deliveryType === "DELIVERY" ? "🚚 DELIVERY" : "🏪 RETIRADA"}
          </span>
          <span className="font-bold">{order.status}</span>
        </div>

        {/* CLIENTE */}
        <p className="font-bold">Cliente</p>
        <p>{order.customerName}</p>

        {/* ENDEREÇO */}
        {order.deliveryType === "DELIVERY" && order.address && (
          <>
            <hr className="my-2 border-dashed" />
            <p className="font-bold">Endereço</p>
            <p>
              {order.address.street}, {order.address.number}
            </p>
            <p>{order.address.neighborhood}</p>
          </>
        )}

        <hr className="my-2 border-dashed" />

        {/* PAGAMENTO */}
        <p className="font-bold text-sm mb-1">Pagamento</p>

        <div className="flex justify-between text-sm">
          <span>Forma</span>
          <span>
            {order.paymentMethod === "CASH" && "💵 Dinheiro"}
            {order.paymentMethod === "PIX" && "📲 Pix"}
            {order.paymentMethod === "CARD" && "💳 Cartão"}
            {!order.paymentMethod && "-"}
          </span>
        </div>

        {order.paymentMethod === "CASH" &&
          typeof order.changeFor === "number" && (
            <div className="flex justify-between text-sm">
              <span>Troco para</span>
              <span>R$ {order.changeFor.toFixed(2)}</span>
            </div>
          )}

        <hr className="my-2 border-dashed" />

        {/* ITENS */}
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.productName}
            </span>
            <span>R$ {item.subtotal.toFixed(2)}</span>
          </div>
        ))}

        <hr className="my-2 border-dashed" />

        {/* TOTAL */}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>R$ {order.total.toFixed(2)}</span>
        </div>

        {/* AÇÕES */}
        <div className="mt-4 space-y-2 text-xs">
          <button
            onClick={() => print(getOrderPrintHtml(order, orderNumber))}
            disabled={printing}
            className="w-full bg-black text-white py-2 rounded cursor-pointer"
          >
            🖨️ Imprimir comanda
          </button>
        </div>

        {/* STATUS BUTTONS */}
        <StatusOrder
          order={order}
          onClose={onClose}
          onUpdated={onUpdated}
        />
        <button
            onClick={onClose}
            className="w-full text-center text-gray-500 cursor-pointer pt-3"
          >
            Fechar
          </button>
      </div>
      
    </div>
  );
}
