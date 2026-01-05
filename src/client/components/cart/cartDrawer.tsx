"use client";

import { X } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { useCartDrawer } from "@/client/hooks/useCartDrawer";
import { CartItemRow } from "./cartItemRow";
import { CheckoutForm } from "../checkout/checkoutForm";

export function CartDrawer() {
  const { isOpen, closeCart, items, total, updateQuantity, removeItem } =
    useCart();

  const { isCheckout, goToCheckout, goToCart } = useCartDrawer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* DRAWER */}
      <aside
        className="
          absolute right-0 top-0 h-full w-full max-w-md
          bg-white flex flex-col
          animate-slide-in
        "
      >
        {/* HEADER */}
        <header className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-black">
            {isCheckout ? "Finalizar pedido" : "Seu pedido"}
          </h2>

          <button
            onClick={() => {
              goToCart();
              closeCart();
            }}
            className="
              w-9 h-9 rounded-full
              flex items-center justify-center
              text-[#B00E0E]
              active:bg-red-50 transition
            "
          >
            <X />
          </button>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {!isCheckout ? (
            items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <p className="text-gray-500 text-sm">
                  Seu carrinho está vazio 😕
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Adicione produtos para continuar
                </p>
              </div>
            ) : (
              items.map(item => (
                <CartItemRow
                  key={`${item.id}-${item.variationId}`}
                  item={item}
                  onIncrease={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  onDecrease={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))
            )
          ) : (
            <CheckoutForm
              onBack={goToCart}
              onSuccess={() => {
                goToCart();
                closeCart();
              }}
            />
          )}
        </main>

        {/* FOOTER */}
        {!isCheckout && items.length > 0 && (
          <footer className="border-t p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-semibold text-black">
                Total
              </span>

              <span className="text-xl font-bold text-black">
                R$ {total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={goToCheckout}
              className="
                w-full py-4 rounded-2xl
                bg-[#E10600] text-white
                text-base font-bold
                active:scale-95 transition
              "
            >
              Continuar
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
