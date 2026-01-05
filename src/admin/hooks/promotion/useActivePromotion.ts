"use client";

import { useEffect, useState } from "react";
import {
  getActivePromotions,
  Promotion,
} from "@/admin/services/promotion.service";

export function useActivePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivePromotions()
      .then(setPromotions)
      .catch(err => {
        console.error("Erro ao buscar promoções", err);
        setPromotions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    promotions,
    loading,
  };
}
