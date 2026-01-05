"use client";

import { useCart } from "../../context/cartContext";
import { ShoppingBag } from "lucide-react";

export function CartBar() {
  const { items, total, openCart } = useCart();

  if (items.length === 0) return null;

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-40
        bg-[#E10600]
        px-4 py-3
        shadow-[0_-4px_12px_rgba(0,0,0,0.25)]
      "
    >
      <button
        onClick={openCart}
        className="
          w-full flex items-center justify-between
          text-white
          active:scale-[0.98] transition
        "
      >
        {/* ESQUERDA */}
        <div className="flex items-center gap-3">
          <div
            className="
              w-9 h-9 rounded-full
              bg-white text-[#E10600]
              flex items-center justify-center
              font-bold text-sm
            "
          >
            {totalItems}
          </div>

          <span className="text-base font-semibold">
            Ver carrinho
          </span>
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-wide">
            R$ {total.toFixed(2)}
          </span>

          <ShoppingBag className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
}
