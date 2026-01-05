"use client";

import { useEffect, useState } from "react";
import { getActivePromotions } from "../services/activePromotion";

export type Promotion = {
  id: string;
  discountType: "FIXED" | "PERCENT";
  discountValue: number;
  products: {
    product: {
      id: string;
    };
  }[];
};

export function useActivePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getActivePromotions();
        setPromotions(data);
      } catch (err) {
        console.error("Erro ao carregar promoções", err);
        setError("Erro ao carregar promoções");
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    promotions,
    loading,
    error,
  };
}
