"use client";

import { getCategories } from "@/admin/services/product-categories.service";
import { Category } from "@/admin/types/product";
import { useEffect, useState } from "react";


export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  return {
    categories,
    setCategories,
    creating,
    setCreating,
    loading,
  };
}
