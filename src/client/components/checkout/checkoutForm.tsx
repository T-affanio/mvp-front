"use client";

import { useCheckout } from "@/client/hooks/useCheckout";

type Props = {
  onSuccess: () => void;
  onBack: () => void;
};

export function CheckoutForm({ onSuccess, onBack }: Props) {
  const checkout = useCheckout(onSuccess);

  if (checkout.success) {
    return (
      <div className="p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-600">
          Pedido enviado com sucesso ✅
        </h2>
        <p className="text-black text-sm">
          Abrimos o WhatsApp para você confirmar com a loja.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* VOLTAR */}
      <button
        onClick={onBack}
        className="text-lg font-semibold text-black"
      >
        ← Voltar
      </button>

      {/* DADOS DO CLIENTE */}
      <div className="space-y-3">
        <h3 className="font-semibold text-black">
          Seus dados
        </h3>

        <input
          placeholder="Seu nome"
          value={checkout.customerName}
          onChange={e => checkout.setCustomerName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
        />

        <input
          placeholder="Telefone"
          value={checkout.customerPhone}
          onChange={e => checkout.setCustomerPhone(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
        />
      </div>

      {/* ENTREGA */}
      <div className="space-y-3">
        <h3 className="font-semibold text-black">
          Entrega
        </h3>

        <select
          value={checkout.deliveryType}
          onChange={e =>
            checkout.setDeliveryType(e.target.value as any)
          }
          className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
        >
          <option value="DELIVERY">Entrega</option>
          <option value="PICKUP">Retirada no local</option>
        </select>

        {checkout.deliveryType === "DELIVERY" && (
          <>
            <input
              placeholder="Endereço"
              value={checkout.address}
              onChange={e => checkout.setAddress(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
            />

            <input
              placeholder="Bairro"
              value={checkout.neighborhood}
              onChange={e =>
                checkout.setNeighborhood(e.target.value)
              }
              className={`w-full px-4 py-3 rounded-xl text-black border ${
                checkout.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </>
        )}
      </div>

      {/* PAGAMENTO */}
      <div className="space-y-3">
        <h3 className="font-semibold text-black">
          Pagamento
        </h3>

        <select
          value={checkout.paymentMethod}
          onChange={e =>
            checkout.setPaymentMethod(e.target.value as any)
          }
          className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
        >
          <option value="CASH">Dinheiro</option>
          <option value="PIX">PIX</option>
          <option value="CARD">Cartão</option>
        </select>
      </div>

      {/* RESUMO */}
      <div className="border rounded-xl p-4 space-y-3 text-black">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>R$ {checkout.subtotal.toFixed(2)}</span>
        </div>

        {checkout.deliveryType === "DELIVERY" && (
          <div className="flex justify-between text-sm">
            <span>Frete</span>
            <span>R$ {checkout.deliveryFee.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t pt-3">
          <span>Total</span>
          <span>R$ {checkout.total.toFixed(2)}</span>
        </div>
      </div>

      {/* ERRO */}
      {checkout.error && (
        <p className="text-sm text-red-600 font-semibold">
          {checkout.error}
        </p>
      )}

      {/* CTA */}
      <button
        disabled={!checkout.canSubmit || checkout.loading}
        onClick={checkout.submit}
        className="
          w-full bg-[#E10600] text-white py-4 rounded-2xl
          font-bold text-lg
          disabled:opacity-50 active:scale-95 transition
        "
      >
        {checkout.loading ? "Enviando..." : "Confirmar pedido"}
      </button>
    </div>
  );
}
