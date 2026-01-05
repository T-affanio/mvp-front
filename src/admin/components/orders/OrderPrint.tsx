import { Order } from "@/admin/types/Orders";
import { formatOrderNumber } from "@/admin/utils/orders/format";

export function getOrderPrintHtml(
  order: Order,
  orderNumber: number
) {
  return `
    <div style="width:80mm;padding:8px">
      <div style="text-align:center">
        <strong style="font-size:16px">HOODFOOD</strong><br/>
        Comanda de Pedido
      </div>

      <hr/>

      <div>Pedido: #${formatOrderNumber(orderNumber)}</div>
      <div>Data: ${new Date(order.createdAt).toLocaleString("pt-BR")}</div>
      <div>Status: ${order.status}</div>

      <hr/>

      <strong>Cliente</strong><br/>
      ${order.customerName}<br/>
      ${order.customerPhone ?? ""}

      ${
        order.address
          ? `
        <hr/>
        <strong>Endereço</strong><br/>
        ${order.address.street}, ${order.address.number}<br/>
        ${order.address.neighborhood}
      `
          : ""
      }

      <hr/>

      <strong>Itens</strong>
      ${order.items
        .map(
          item => `
        <div style="display:flex;justify-content:space-between">
          <span>${item.quantity}x ${item.productName}</span>
          <span>R$ ${item.subtotal.toFixed(2)}</span>
        </div>
      `
        )
        .join("")}

      <hr/>

      <div style="display:flex;justify-content:space-between">
        <span>Frete</span>
        <span>R$ ${order.deliveryFee.toFixed(2)}</span>
      </div>

      <div style="display:flex;justify-content:space-between;font-weight:bold">
        <span>TOTAL</span>
        <span>R$ ${order.total.toFixed(2)}</span>
      </div>

      <hr/>

      <div style="text-align:center">
        Obrigado pela preferência ❤️
      </div>
    </div>
  `;
}
