"use client";
import { useEffect, useMemo, useState } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productservice";
import { useActivePromotions } from "./useActivePromotion";


export function useMenu() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState("all");

const { promotions } = useActivePromotions();

  useEffect(() => {
    async function load() {
      const [c, p] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      const hasPromotions = promotions.length > 0;

      setCategories(
        hasPromotions
          ? [{ id: "promo", name: "🔥 Promoções" }, ...c]
          : c
      );

      setProducts(p);
    }

    load();
  }, [promotions]);

  function getPromotion(productId: string) {
    return promotions.find((promo) =>
      promo.products.some((pp: any) => pp.product.id === productId)
    );
  }

  const filteredProducts = useMemo(() => {
    if (selected === "all") return products;

    if (selected === "promo") {
      return products.filter((p) => getPromotion(p.id));
    }

    return products.filter(
      (p: any) => p.category?.id === selected
    );
  }, [selected, products, promotions]);

  return {
    categories,
    selected,
    setSelected,
    products: filteredProducts,
    getPromotion,
  };
}
