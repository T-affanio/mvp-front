"use client";

import { useEffect, useMemo, useState } from "react";
import { getDeliveryAreas } from "@/admin/services/delivery.service";
import { createOrder } from "@/admin/services/order.service";
import { useCart } from "../context/cartContext";

type PaymentMethod = "CASH" | "PIX" | "CARD";
type DeliveryType = "DELIVERY" | "PICKUP";

const DELIVERY_AREA_ERROR =
  "Esse bairro ainda não está na rota do HoodFood 😕 " +
  "Mas fica tranquilo! Em breve nossos entregadores também chegam aí. " +
  "Por enquanto, você pode escolher a retirada no local 💛";

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function useCheckout(onSuccess: () => void) {
  const { items, total: subtotal, clearCart } = useCart();

  // 📌 dados do cliente
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // 📌 entrega
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("DELIVERY");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  // 📌 pagamento
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  // 📌 estado geral
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🚚 cálculo de frete
  useEffect(() => {
    async function calculateDeliveryFee() {
      if (deliveryType !== "DELIVERY") {
        setDeliveryFee(0);
        setError(null);
        return;
      }

      if (!neighborhood.trim()) {
        setDeliveryFee(0);
        return;
      }

      try {
        const areas = await getDeliveryAreas(neighborhood);
        const input = normalize(neighborhood);

        const area = areas.find((a) => normalize(a.name) === input);

        if (!area) {
          setDeliveryFee(0);
          setError(DELIVERY_AREA_ERROR);
          return;
        }

        setDeliveryFee(area.fee);
        setError(null);
      } catch {
        setDeliveryFee(0);
        setError(DELIVERY_AREA_ERROR);
      }
    }

    calculateDeliveryFee();
  }, [neighborhood, deliveryType]);

  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  async function submit() {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        customerName,
        customerPhone,
        deliveryType,
        paymentMethod,

        address: deliveryType === "DELIVERY" ? address : undefined,
        neighborhood: deliveryType === "DELIVERY" ? neighborhood : undefined,

        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      console.log("PAYLOAD ENVIADO 👉", payload);

      const { whatsappMessage } = await createOrder(payload);

      window.open(
        `https://wa.me/5541999999999?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );

      setSuccess(true);

      setTimeout(() => {
        clearCart();
        onSuccess();
      }, 1200);
    } catch (err: any) {
      console.error("STATUS:", err?.response?.status);
      console.error("DATA:", err?.response?.data);
      setError("Erro ao enviar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    customerName.trim() &&
    customerPhone.trim() &&
    items.length > 0 &&
    (deliveryType === "PICKUP" ||
      (address.trim() && neighborhood.trim() && !error));

  return {
    // state
    customerName,
    customerPhone,
    address,
    neighborhood,
    deliveryType,
    paymentMethod,
    deliveryFee,
    subtotal,
    total,
    loading,
    success,
    error,
    canSubmit,

    // actions
    setCustomerName,
    setCustomerPhone,
    setAddress,
    setNeighborhood,
    setDeliveryType,
    setPaymentMethod,
    submit,
  };
}
