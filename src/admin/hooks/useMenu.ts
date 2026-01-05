"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { getProducts } from "../services/product-categories.service";

export function useMenu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { products, loading };
}
