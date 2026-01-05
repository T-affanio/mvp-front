"use client";

import { useState } from "react";
import { useCart } from "@/client/context/cartContext";
import { Product, ProductVariation } from "@/client/types/product";
import { applyPromotion } from "@/client/utils/applyPromotion";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProductVariation | null>(null);

  const hasPromotion = Boolean(product.promotion);
  const hasVariations = (product.variations?.length ?? 0) > 0;

  const basePrice = hasVariations
    ? Math.min(...product.variations!.map(v => v.price))
    : product.price;

  function addSimpleProduct() {
    const price = applyPromotion(product.price, product.promotion);

    addItem({
      id: product.id,
      variationId: "default",
      name: product.name,
      price,
      imageUrl: product.images?.[0]?.url,
    });
  }

  function addVariationProduct() {
    if (!selected) return;

    const price = applyPromotion(selected.price, product.promotion);

    addItem({
      id: product.id,
      variationId: selected.id,
      name: `${product.name} • ${selected.name}`,
      price,
      imageUrl: product.images?.[0]?.url,
    });

    setSelected(null);
    setOpen(false);
  }

  return (
    <div className="border-b border-gray-200">
      {/* CARD PRINCIPAL */}
      <div
        onClick={() => hasVariations && setOpen(prev => !prev)}
        className={`
          relative flex gap-4 p-4 transition
          ${hasVariations ? "cursor-pointer active:bg-gray-50" : ""}
        `}
      >
        {hasPromotion && (
          <span className="absolute top-3 left-3 bg-[#E10600] text-white text-[11px] font-bold px-2 py-1 rounded-md">
            PROMO
          </span>
        )}

        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-24 h-24 rounded-2xl object-cover shrink-0"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-black leading-tight">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description}
              </p>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-black">
              {hasVariations
                ? `A partir de R$ ${basePrice.toFixed(2)}`
                : `R$ ${applyPromotion(
                    product.price,
                    product.promotion
                  ).toFixed(2)}`}
            </span>

            {!hasVariations && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  addSimpleProduct();
                }}
                className="
                  w-10 h-10 rounded-full bg-[#E10600] text-white
                  flex items-center justify-center text-xl font-bold
                  active:scale-90 transition shadow
                "
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VARIAÇÕES */}
      {hasVariations && open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Escolha uma opção
          </p>

          {product.variations!.map(variation => {
            const finalPrice = applyPromotion(
              variation.price,
              product.promotion
            );

            const isSelected = selected?.id === variation.id;

            return (
              <button
                key={variation.id}
                onClick={() => setSelected(variation)}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3 rounded-xl border
                  transition active:scale-[0.98]
                  ${
                    isSelected
                      ? "border-[#E10600] bg-red-50 text-black"
                      : "border-gray-200 bg-white text-black"
                  }
                `}
              >
                <span className="text-sm font-medium">
                  {variation.name}
                </span>

                <span className="font-bold">
                  R$ {finalPrice.toFixed(2)}
                </span>
              </button>
            );
          })}

          {selected && (
            <button
              onClick={addVariationProduct}
              className="
                w-full mt-3 py-4 rounded-2xl
                bg-[#E10600] text-white font-bold text-base
                active:scale-95 transition
              "
            >
              Adicionar • R${" "}
              {applyPromotion(
                selected.price,
                product.promotion
              ).toFixed(2)}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
