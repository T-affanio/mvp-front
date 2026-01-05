"use client";

import { useState } from "react";
import { PencilLineIcon, ChevronDown } from "lucide-react";
import { useProducts } from "@/admin/hooks/Products-Categories/useProducts";
import { useActivePromotions } from "@/admin/hooks/promotion/useActivePromotion";

type Props = {
  categoryId: string | "all";
};

export default function MenuList({ categoryId }: Props) {
  const { products, loading } = useProducts();
  const { promotions } = useActivePromotions();
  const [openProductId, setOpenProductId] = useState<string | null>(null);

  function hasPromotion(productId: string) {
    return promotions.some(p =>
      p.products?.some(pp => pp.product.id === productId)
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-sm text-black/60">
        Carregando…
      </div>
    );
  }

  const filtered =
    categoryId === "all"
      ? products
      : products.filter(p => p.categoryId === categoryId);

  return (
    <div className="w-full">
      {filtered.map(product => {
        const promo = hasPromotion(product.id);
        const isOpen = openProductId === product.id;

        return (
          <div
            key={product.id}
            className="border-b border-[#989595]"
          >
            {/* LINHA PRINCIPAL */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() =>
                setOpenProductId(isOpen ? null : product.id)
              }
            >
              {/* ESQUERDA */}
              <div className="flex items-center gap-4 pb-3">
                {/* IMAGEM */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0">
                  {product.images?.[0]?.url && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* TEXTO */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-black">
                      {product.name}
                    </h3>

                    {promo && (
                      <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-full">
                        Promoção
                      </span>
                    )}
                  </div>

                  {product.description && (
                    <p className="text-xs text-black mt-0.5 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <p className="text-sm text-black mt-1">
                    A partir de
                    <span className="font-semibold ml-1">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* DIREITA */}
              <div className="flex items-center gap-4 text-black">
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                <PencilLineIcon
                  size={18}
                  className="opacity-60 hover:opacity-100 transition"
                />
              </div>
            </div>

            {/* VARIAÇÕES — PARTE INOVADA */}
            {isOpen && (
              <div className="pb-3 px-3 space-y-2">
                {product.variations.map(variation => (
                  <div
                    key={variation.id}
                    className="flex items-center justify-between border border-[#989595] rounded-lg px-3 py-2 hover:border-black transition"
                  >
                    <span className="text-sm text-black capitalize">
                      {variation.name}
                    </span>

                    <span className="text-sm font-semibold text-black">
                      R$ {Number(variation.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
